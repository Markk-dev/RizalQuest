/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  experimental: {
    turbo: {
      resolveAlias: {},
    },
  },
}

module.exports = nextConfig
