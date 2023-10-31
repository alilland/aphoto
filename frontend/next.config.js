/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'host.docker.internal',
        port: '3001',
        pathname: '/v1/public/albums/**/images/**'
      }
    ]
  }
}

module.exports = nextConfig
