/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // For subdomain deployment (default)
  trailingSlash: true,

  // Image optimization is disabled for static export; images are served as-is.
  images: {
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
