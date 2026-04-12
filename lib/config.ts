export const siteConfig = {
  name: "Marvox Documentation",
  description: "Documentation for Marvox Storyworld Production Studio and CharacterOS.",
  url: process.env.NODE_ENV === "production" ? "https://docs.marvox.ai" : "http://localhost:3001",
  mainAppUrl: process.env.NODE_ENV === "production" ? "https://marvox.ai" : "http://localhost:3000",
  links: {
    github: "https://github.com/CyKiller/Marvox",
    discord: "https://discord.gg/marvox",
    twitter: "https://twitter.com/marvoxai",
  },
  api: {
    baseUrl: process.env.NODE_ENV === "production" ? "https://api.marvox.com" : "http://localhost:8000",
  },
}
