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
};

module.exports = nextConfig;