import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
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

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

// @ts-ignore
export default withPWAConfig(nextConfig);