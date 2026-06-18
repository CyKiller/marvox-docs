// Canonical production origin for the docs site. Single source of truth — imported by
// layout metadata, sitemap, and robots so canonical URLs never diverge across deployments.
export const SITE_URL = "https://marvox-docs.netlify.app"

export const siteConfig = {
  name: "Marvox Documentation",
  description: "Documentation for Marvox Storyworld Production Studio and CharacterOS.",
  url: process.env.NODE_ENV === "production" ? SITE_URL : "http://localhost:3001",
  mainAppUrl: process.env.NODE_ENV === "production" ? "https://marvox.ai" : "http://localhost:3000",
  // Public repository that holds these docs (content/*.md). Used for "Edit on GitHub" + header link.
  repoUrl: "https://github.com/CyKiller/marvox-docs",
  links: {
    github: "https://github.com/CyKiller/marvox-docs",
    discord: "https://discord.gg/marvox",
    twitter: "https://twitter.com/marvoxai",
  },
  api: {
    baseUrl: process.env.NODE_ENV === "production" ? "https://api.marvox.com" : "http://localhost:8000",
  },
}
