/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,  
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
  reactStrictMode: true,
};

module.exports = nextConfig;