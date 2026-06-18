import type { MetadataRoute } from "next"
import { DOC_PAGES } from "@/lib/docs-data"
import { SITE_URL } from "@/lib/config"

export const dynamic = "force-static"

const BASE_URL = SITE_URL

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = DOC_PAGES.map((page) => ({
    url: `${BASE_URL}/${page.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page.section === "Getting Started" ? 0.9 : 0.7,
  }))

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...pages,
  ]
}
