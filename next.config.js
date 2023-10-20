/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_BASE_URL: '/api/v1/project-notifier'
  },
  output: 'export',
  distDir: '_static',
  images: {
    unoptimized: true
  }
}
module.exports = nextConfig
