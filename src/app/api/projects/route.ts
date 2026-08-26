import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/libary/supabase';
import cloudinary from '@/libary/cloudinary';
import { verifySessionToken } from '@/libary/session';

export const dynamic = 'force-dynamic';

// เพิ่มฟังก์ชันนี้ (เหมือนไฟล์ reorder)
async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const token = request.cookies.get('admin_session')?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
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
  order_index?: number;
};

// แปลงข้อมูลจากรูปแบบฐานข้อมูล (snake_case) เป็นรูปแบบที่หน้าเว็บใช้ (camelCase)
function dbRowToProject(row: Record<string, unknown>): Project {
  return {
    id: row.id as number,
    title: (row.title as string) || "",
    description: (row.description as string) || "",
    image: (row.image as string) || "",
    otherImages: (row.other_images as string[]) || [],
    category: (row.category as ProjectCategory) || "Web App",
    tags: (row.tags as string[]) || [],
    demoUrl: (row.demo_url as string) || null,
    githubUrl: (row.github_url as string) || null,
    date: (row.date as string) || "",
    issuer: (row.issuer as string) || undefined,
    fullDescription: (row.full_description as string) || undefined,
    features: (row.features as string[]) || [],
    details: (row.details as string[]) || [],
    technologies: (row.technologies as string[]) || [],
    order_index: (row.order_index as number) ?? 0,
  };
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

function safeParseJSON<T>(data: string | null, fallback: T): T {
  if (!data) return fallback;
  try {
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

// อัปโหลดไฟล์ขึ้น Cloudinary แทนการเขียนลง disk
async function uploadToCloudinary(file: unknown): Promise<string> {
  if (!file || !(file instanceof File)) {
    return typeof file === 'string' ? file : "";
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

  const result = await cloudinary.uploader.upload(base64, {
    folder: 'portfolio',
  });

  return result.secure_url;
}

// --- Route Handlers ---

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;

    const projects = (data || []).map(dbRowToProject);
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);   // 👈 เพิ่มบรรทัดนี้
  if (authError) return authError;    
  try {
    const supabase = getSupabaseClient();
    const formData = await request.formData();

    const idRaw = formData.get('id');
    const id = idRaw ? parseInt(idRaw as string, 10) : null;

    // รูปภาพหลัก
    const imageFile = formData.get('mainImageFile');
    let imagePath = (formData.get('image') as string) || "";
    if (imageFile instanceof File) {
      imagePath = await uploadToCloudinary(imageFile);
    }

    // รูปภาพประกอบ
    const otherImageFiles = formData.getAll('otherImageFiles');
    let otherImagesPaths: string[] = [];

    if (otherImageFiles.length > 0 && otherImageFiles[0] instanceof File) {
      for (const file of otherImageFiles) {
        const url = await uploadToCloudinary(file);
        if (url) otherImagesPaths.push(url);
      }
    } else {
      otherImagesPaths = safeParseJSON(formData.get('otherImages') as string, []);
    }

    const projectData = {
      title: (formData.get('title') as string) || "",
      image: imagePath,
      other_images: otherImagesPaths,
      category: (formData.get('category') as ProjectCategory) || "Web App",
      description: (formData.get('description') as string) || "",
      full_description: (formData.get('fullDescription') as string) || "",
      tags: safeParseJSON(formData.get('tags') as string, []),
      features: safeParseJSON(formData.get('features') as string, []),
      technologies: safeParseJSON(formData.get('technologies') as string, []),
      demo_url: (formData.get('demoUrl') as string) || null,
      github_url: (formData.get('githubUrl') as string) || null,
      date: (formData.get('date') as string) || new Date().toISOString().split('T')[0],
      issuer: (formData.get('issuer') as string) || null,
    };

    if (id !== null) {
      // แก้ไขข้อมูลเดิม
      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id);

      if (error) throw error;
    } else {
      // เพิ่มโปรเจกต์ใหม่ ต่อท้ายลำดับ
      const { count } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      const { error } = await supabase
        .from('projects')
        .insert({ ...projectData, order_index: count || 0 });

      if (error) throw error;
    }

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {

  const authError = await requireAuth(request);   // 👈 เพิ่มบรรทัดนี้
  if (authError) return authError;  
  try {
    const supabase = getSupabaseClient();
    const { id } = await request.json() as { id: string };

    // ลบข้อมูลออกจากฐานข้อมูล
    // หมายเหตุ: รูปภาพบน Cloudinary จะไม่ถูกลบอัตโนมัติ ต้องลบเองผ่าน Cloudinary dashboard
    // หรือค่อยเพิ่มโค้ดเรียก cloudinary.uploader.destroy() ทีหลังได้
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}