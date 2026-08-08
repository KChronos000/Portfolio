const SECRET = process.env.SESSION_SECRET!
const MAX_AGE = 60 * 60 * 8 // 8 ชั่วโมง

async function getKey() {
  const enc = new TextEncoder()
  return crypto.subtle.importKey(
    'raw',
    enc.encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
}

function bufferToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function createSessionToken() {
  const expires = Date.now() + MAX_AGE * 1000
  const payload = `${expires}`
  const key = await getKey()
  const sigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  const sig = bufferToHex(sigBuffer)
  return `${payload}.${sig}`
}

export async function verifySessionToken(token?: string) {
  if (!token) return false
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return false

  const key = await getKey()
  const expectedSigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  const expectedSig = bufferToHex(expectedSigBuffer)

  if (sig !== expectedSig) return false // ปลอมไม่ได้เพราะไม่รู้ SECRET
  return Date.now() < Number(payload) // ยังไม่หมดอายุ
}