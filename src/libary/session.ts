import crypto from 'crypto'

const SECRET = process.env.SESSION_SECRET!
const MAX_AGE = 60 * 60 * 8 // 8 ชั่วโมง

export function createSessionToken() {
  const expires = Date.now() + MAX_AGE * 1000
  const payload = `${expires}`
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
  return `${payload}.${sig}`
}

export function verifySessionToken(token?: string) {
  if (!token) return false
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return false
  const expectedSig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
  if (sig !== expectedSig) return false // ปลอมไม่ได้เพราะไม่รู้ SECRET
  return Date.now() < Number(payload) // ยังไม่หมดอายุ
}