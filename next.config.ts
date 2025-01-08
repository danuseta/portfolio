const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Jika ingin mengabaikan TypeScript errors juga
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/du6o6c6dc/image/upload/**',
      },
    ],
  },
  transpilePackages: ['react-icons', 'framer-motion'],
  experimental: {
    appDir: true,
    serverActions: true,
  }
};

module.exports = withPWA(nextConfig);