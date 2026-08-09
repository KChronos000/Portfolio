import { createClient } from '@supabase/supabase-js';

// ใช้ service_role key เพราะ route.ts รันฝั่ง server เท่านั้น
// (bypass RLS ได้ ปลอดภัยเพราะไม่เคยส่ง key นี้ไปฝั่ง client)
export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(url, key);
}