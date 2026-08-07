import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken } from '@/libary/session'


export function middleware(req: NextRequest) {
  // อนุญาตให้ GET ผ่านได้เสมอ (สำหรับหน้าเว็บสาธารณะที่ต้องโชว์ projects)
  if (req.method === 'GET') {
    return NextResponse.next()
  }

  // POST, PUT, DELETE ต้อง login เท่านั้น
  const token = req.cookies.get('admin_session')?.value
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/projects/:path*'],
}