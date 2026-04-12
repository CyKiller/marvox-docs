/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // For subdomain deployment (default)
  trailingSlash: true,

  // Image optimization
  images: {
    domains: ["marvox.com", "docs.marvox.com"],
    unoptimized: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
