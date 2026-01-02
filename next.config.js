/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'instant-storage.s3.amazonaws.com',
      },
    ],
    // Keep domains for backward compatibility, but remotePatterns is preferred
    domains: ['instant-storage.s3.amazonaws.com'],
  },
  // React 19 compatibility
  reactStrictMode: true,
}

module.exports = nextConfig
