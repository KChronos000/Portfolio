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
      {
        source: '/fruit-ripeness-detection',
        destination: 'https://fruit-ripeness-detection.pages.dev',
      },
      {
        source: '/fruit-ripeness-detection/:path*',
        destination: 'https://fruit-ripeness-detection.pages.dev/:path*',
      },
      {
        source: '/recycle-shop',
        destination: 'https://recycle-shop.pages.dev',
      },
      {
        source: '/recycle-shop/:path*',
        destination: 'https://recycle-shop.pages.dev/:path*',
      }
    ];
  },
};

module.exports = nextConfig;