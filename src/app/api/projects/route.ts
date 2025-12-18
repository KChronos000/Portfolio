import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

// --- Types Definition ---
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
};

const jsonPath = path.join(process.cwd(), 'src', 'app', 'assets', 'Projects', 'projects.json');
const uploadDir = path.join(process.cwd(), 'public', 'Pictures');

// --- Helper Functions ---

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Unknown error";
} 

async function saveFile(file: File | string | null): Promise<string> {
    if (!file) return "";
    if (typeof file === 'string') return file; 
    
    // ตรวจสอบว่าเป็น File object จริงๆ (แก้จุดแดงที่ .name)
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
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
        // แก้จุดแดง parseInt โดยการ cast เป็น string และตรวจสอบ null
        const id = idRaw ? parseInt(idRaw as string) : null;
        
        const imageFile = formData.get('mainImageFile') as File | null;
        let imagePath = (formData.get('image') as string) || ""; 
        
        if (imageFile && typeof imageFile !== 'string') {
            imagePath = await saveFile(imageFile);
        }

        const otherImageFiles = formData.getAll('otherImageFiles');
        let otherImagesPaths: string[] = [];
        
        // เช็คให้ชัวร์ว่าเป็น File หรือไม่
        if (otherImageFiles.length > 0 && otherImageFiles[0] instanceof File) {
            for (const file of otherImageFiles) {
                const p = await saveFile(file as File);
                if (p) otherImagesPaths.push(p);
            }
        } else {
            const otherImagesRaw = formData.get('otherImages') as string;
            otherImagesPaths = JSON.parse(otherImagesRaw || "[]");
        }

        const projectData: Project = {
            id: id ?? 0, // ใช้ ?? แทน || เพื่อความปลอดภัยกับเลข 0
            title: (formData.get('title') as string) || "",
            image: imagePath,
            otherImages: otherImagesPaths,
            category: (formData.get('category') as ProjectCategory) || "Web App",
            description: (formData.get('description') as string) || "",
            fullDescription: (formData.get('fullDescription') as string) || "",
            tags: JSON.parse((formData.get('tags') as string) || "[]"),
            features: JSON.parse((formData.get('features') as string) || "[]"),
            technologies: JSON.parse((formData.get('technologies') as string) || "[]"),
            demoUrl: (formData.get('demoUrl') as string) || null,
            githubUrl: (formData.get('githubUrl') as string) || null,
            date: (formData.get('date') as string) || new Date().toISOString().split('T')[0],
            issuer: (formData.get('issuer') as string) || undefined
        };

        const index = projects.findIndex((p: Project) => p.id === id);
        
        if (index !== -1 && id !== null) {
            projects[index] = { ...projectData, id: id };
        } else {
            // แก้จุดแดง map โดยระบุ Type และเช็คค่าว่าง
            const maxId = projects.length > 0 ? Math.max(...projects.map((p: Project) => p.id)) : 0;
            const newId = maxId + 1;
            projects.push({ ...projectData, id: newId });
        }

        await fs.writeFile(jsonPath, JSON.stringify(projects, null, 2), 'utf8');
        return NextResponse.json({ message: 'Success' });

    } catch (error: unknown) {
        console.error("POST Error:", error);
        return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
    }

}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();
        const projects = await readProjects();
        const projectToDelete = projects.find((p: Project) => p.id === id);

        if (!projectToDelete) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        const deleteFile = async (imagePath: string) => {
            if (imagePath && imagePath.startsWith('/Pictures/')) {
                const fullPath = path.join(process.cwd(), 'public', imagePath);
                try {
                    await fs.access(fullPath); // เช็คว่าไฟล์มีจริงไหมก่อนลบ
                    await fs.unlink(fullPath);
                } catch (e: unknown) {
                    console.warn("Delete file failed:", getErrorMessage(e));
                }
            }
        };

        await deleteFile(projectToDelete.image);
        if (projectToDelete.otherImages) {
            for (const img of projectToDelete.otherImages) {
                await deleteFile(img);
            }
        }

        const updatedProjects = projects.filter((p: Project) => p.id !== id);
        await fs.writeFile(jsonPath, JSON.stringify(updatedProjects, null, 2), 'utf8');

        return NextResponse.json({ message: 'Success' });
    } catch (error: unknown) {
        return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
}

} 