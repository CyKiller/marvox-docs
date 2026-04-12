import fs from "fs"
import path from "path"
import { DOC_PAGE_BY_SLUG, type DocPage } from "./docs-data"

const repoRoot = path.resolve(process.cwd(), "content")

export type DocContent = {
  page: DocPage
  markdown: string
}

export function getDocBySlug(slug: string): DocPage | undefined {
  return DOC_PAGE_BY_SLUG.get(slug)
}

export function loadDocContent(slug: string): DocContent | null {
  const page = getDocBySlug(slug)
  if (!page) {
    return null
  }
  const fullPath = path.join(repoRoot, page.source)
  if (!fs.existsSync(fullPath)) {
    return null
  }
  const markdown = fs.readFileSync(fullPath, "utf-8")
  return { page, markdown }
}
