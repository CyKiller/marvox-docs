import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { DOC_PAGES } from "@/lib/docs-data"
import { loadDocContent } from "@/lib/docs-content"

type PageProps = {
  params: { slug: string[] }
}

export function generateStaticParams() {
  return DOC_PAGES.map((page) => ({ slug: page.slug.split("/") }))
}

export default function DocPage({ params }: PageProps) {
  const slug = params.slug?.join("/") || ""
  const content = loadDocContent(slug)
  if (!content) {
    notFound()
  }

  return (
    <article className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content.markdown}</ReactMarkdown>
    </article>
  )
}
