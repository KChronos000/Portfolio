import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

// --- Types Definition (แนะนำให้แยกไฟล์ในอนาคต) ---
export type ProjectCategory = "Web App" | "Design" | "Game" | "Certificate";

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  otherImages?: string[];
  category: ProjectCategory;
  tags: string[];
  demoUrl?: string | null;
  githubUrl?: string | null;
  date: string;
  issuer?: string;
  fullDescription?: string;
  features?: string[];
  details?: string[];
  technologies?: string[];
  order_index?: number;
};

const jsonPath = path.join(process.cwd(), 'src', 'app', 'assets', 'Projects', 'projects.json');
const uploadDir = path.join(process.cwd(), 'public', 'Pictures');

// --- Helper Functions ---

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

// ฟังก์ชันสำหรับ Parse JSON ที่ปลอดภัย ป้องกัน App ค้างถ้าส่งค่ามาผิด
function safeParseJSON<T>(data: string | null, fallback: T): T {
  if (!data) return fallback;
  try {
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

async function saveFile(file: unknown): Promise<string> {
  // ตรวจสอบว่าเป็น File Object จริงหรือไม่
  if (!file || !(file instanceof File)) {
    return typeof file === 'string' ? file : "";
  }
  
  const buffer = Buffer.from(await file.arrayBuffer());
  // ล้างชื่อไฟล์ให้ไม่มีช่องว่างและอักขระพิเศษ
  const safeName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
  const fileName = `${Date.now()}-${safeName}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(filePath, buffer);
  
  return `/Pictures/${fileName}`;
}

async function readProjects(): Promise<Project[]> {
  try {
    const fileContents = await fs.readFile(jsonPath, 'utf8');
    return JSON.parse(fileContents) as Project[];
  } catch (error) {
    console.error("Read Error:", error);
    return [];
  }
}

// --- Route Handlers ---

export async function GET() {
  const projects = await readProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const projects = await readProjects();

    const idRaw = formData.get('id');
    const id = idRaw ? parseInt(idRaw as string, 10) : null;
    
    // การจัดการรูปภาพหลัก
    const imageFile = formData.get('mainImageFile');
    let imagePath = (formData.get('image') as string) || ""; 
    if (imageFile instanceof File) {
      imagePath = await saveFile(imageFile);
    }

    // การจัดการรูปภาพประกอบ
    const otherImageFiles = formData.getAll('otherImageFiles');
    let otherImagesPaths: string[] = [];
    
    if (otherImageFiles.length > 0 && otherImageFiles[0] instanceof File) {
      for (const file of otherImageFiles) {
        const p = await saveFile(file);
        if (p) otherImagesPaths.push(p);
      }
    } else {
      otherImagesPaths = safeParseJSON(formData.get('otherImages') as string, []);
    }

    // สร้าง Object ข้อมูลใหม่
    const projectData: Project = {
      id: 0, // จะระบุอีกครั้งตอนหา Index
      title: (formData.get('title') as string) || "",
      image: imagePath,
      otherImages: otherImagesPaths,
      category: (formData.get('category') as ProjectCategory) || "Web App",
      description: (formData.get('description') as string) || "",
      fullDescription: (formData.get('fullDescription') as string) || "",
      tags: safeParseJSON(formData.get('tags') as string, []),
      features: safeParseJSON(formData.get('features') as string, []),
      technologies: safeParseJSON(formData.get('technologies') as string, []),
      demoUrl: (formData.get('demoUrl') as string) || null,
      githubUrl: (formData.get('githubUrl') as string) || null,
      date: (formData.get('date') as string) || new Date().toISOString().split('T')[0],
      issuer: (formData.get('issuer') as string) || undefined,
      order_index: idRaw ? undefined : projects.length // ถ้าเป็นโปรเจกต์ใหม่ ให้ต่อท้าย
    };

    const index = projects.findIndex((p) => p.id === id);
    
    if (index !== -1 && id !== null) {
      // แก้ไขข้อมูลเดิม (รักษา order_index เดิมไว้)
      projects[index] = { ...projects[index], ...projectData, id: id };
    } else {
      // เพิ่มข้อมูลใหม่
      const maxId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) : 0;
      projects.push({ ...projectData, id: maxId + 1 });
    }

    await fs.writeFile(jsonPath, JSON.stringify(projects, null, 2), 'utf8');
    return NextResponse.json({ message: 'Success' });

  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const projects = await readProjects();
    const projectToDelete = projects.find((p) => p.id === id);

    if (!projectToDelete) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const deleteFile = async (imgUrl: string) => {
      if (imgUrl && imgUrl.startsWith('/Pictures/')) {
        const fullPath = path.join(process.cwd(), 'public', imgUrl);
        try {
          await fs.access(fullPath);
          await fs.unlink(fullPath);
        } catch {
            console.warn(`File not found or cannot delete: ${imgUrl}`);
        }
      }
    };

    // ลบไฟล์ภาพออกจาก Server
    await deleteFile(projectToDelete.image);
    if (projectToDelete.otherImages) {
      for (const img of projectToDelete.otherImages) {
        await deleteFile(img);
      }
    }

    const updatedProjects = projects.filter((p) => p.id !== id);
    await fs.writeFile(jsonPath, JSON.stringify(updatedProjects, null, 2), 'utf8');

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}