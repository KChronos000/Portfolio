import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

async function handler(req: NextRequest) {
  const { env } = getCloudflareContext();

  const url = new URL(req.url);
  const targetUrl = 'https://recycleshop.taemmarin.workers.dev' + url.pathname + url.search;

  const cleanHeaders = new Headers(req.headers);
  cleanHeaders.delete('host');

const response = await (env as any).RECYCLESHOP.fetch(targetUrl, {
    method: req.method,
    headers: cleanHeaders,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? await req.blob() : undefined,
  });

  return new NextResponse(response.body, {
    status: response.status,
    headers: response.headers,
  });
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };