import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import type { Project } from "@/app/assets/Projects/types";

// ชี้ไปที่ไฟล์ JSON
const jsonPath = path.join(process.cwd(), 'src', 'app', 'assets', 'Projects', 'projects.json');

export async function PUT(request: NextRequest) {
    try {
        const { orders } = await request.json(); 
        
        const fileContents = await fs.readFile(jsonPath, 'utf8');
        const projectsData = JSON.parse(fileContents) as Project[]; 

        // 3. ตอน Map ให้ระบุ Type ให้ชัดเจน
        const updatedProjects = projectsData.map((p: Project) => {
            const newOrder = orders.find((o: { id: number; order_index: number }) => o.id === p.id);
            if (newOrder) {
                return { ...p, order_index: newOrder.order_index };
            }
            return p;
        });
        updatedProjects.sort((a: Project, b: Project) => (a.order_index ?? 0) - (b.order_index ?? 0));

        await fs.writeFile(jsonPath, JSON.stringify(updatedProjects, null, 2), 'utf8');

        return NextResponse.json({ message: 'Reorder Success' });
    } catch (error: unknown) {
        console.error("Reorder API Error:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}