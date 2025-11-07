/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'], // Para imágenes de Firebase Storage
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
      },
    ],
  },
  // Optimizaciones
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig
