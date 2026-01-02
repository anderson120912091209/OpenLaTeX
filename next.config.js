/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['instant-storage.s3.amazonaws.com'],
  },
}

module.exports = nextConfig
