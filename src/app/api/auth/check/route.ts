import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/libary/session';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value;
  const valid = await verifySessionToken(token);

  if (!valid) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}