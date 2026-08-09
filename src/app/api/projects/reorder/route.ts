import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/libary/supabase';
import { verifySessionToken } from '@/libary/session';

export const dynamic = 'force-dynamic';

// เช็ค auth ในนี้โดยตรง แทนการพึ่ง proxy.ts (middleware)
async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const token = request.cookies.get('admin_session')?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function PUT(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const supabase = getSupabaseClient();
    const { orders } = (await request.json()) as {
      orders: { id: number; order_index: number }[];
    };

    if (!Array.isArray(orders)) {
      return NextResponse.json({ error: 'Invalid orders payload' }, { status: 400 });
    }

    // อัปเดต order_index ทีละแถวใน Supabase
    const updates = orders.map((o) =>
      supabase.from('projects').update({ order_index: o.order_index }).eq('id', o.id)
    );

    const results = await Promise.all(updates);
    const firstError = results.find((r) => r.error);
    if (firstError?.error) throw firstError.error;

    return NextResponse.json({ message: 'Reorder Success' });
  } catch (error: unknown) {
    console.error("Reorder API Error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}