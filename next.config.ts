/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // อนุญาตทุก Domain ที่เป็น https
      },
      {
        protocol: 'http',
        hostname: '**', // อนุญาตทุก Domain ที่เป็น http (ถ้ามี)
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/ate',
        destination: 'https://ate-4sz.pages.dev',
      },
      {
        source: '/ate/:path*',
        destination: 'https://ate-4sz.pages.dev/:path*',
      },
    ];
  },
};

module.exports = nextConfig;