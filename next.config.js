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
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
