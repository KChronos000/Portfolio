import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken } from '@/libary/session'

export async function proxy(req: NextRequest) {
  if (req.method === 'GET') {
    return NextResponse.next()
  }

  const token = req.cookies.get('admin_session')?.value
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/projects/:path*'],
}