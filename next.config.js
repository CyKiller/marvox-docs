/** @type {import('next').NextConfig} */
const nextConfig = {
  // For subdirectory deployment
  basePath: process.env.NODE_ENV === "production" ? "/docs" : "",

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

  // Redirects for legacy URLs
  async redirects() {
    return [
      {
        source: "/guide/:path*",
        destination: "/user-guide/:path*",
        permanent: true,
      },
    ]
  },

  // Headers for cross-origin requests
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://marvox.com",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
