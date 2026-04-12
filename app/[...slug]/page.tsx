import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeHighlight from "rehype-highlight"
import type { Components } from "react-markdown"
import { DOC_PAGES } from "@/lib/docs-data"
import { loadDocContent } from "@/lib/docs-content"

type PageProps = {
  params: { slug: string[] }
}

// Custom markdown components for better rendering
const mdComponents: Components = {
  // Code blocks with language label
  pre({ children, ...props }) {
    return (
      <div className="code-block-wrapper">
        <pre {...props}>{children}</pre>
      </div>
    )
  },
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "")
    const lang = match?.[1]
    if (lang) {
      return (
        <div className="code-block">
          <div className="code-block-header">
            <span className="code-lang-label">{lang}</span>
          </div>
          <code className={className} {...props}>{children}</code>
        </div>
      )
    }
    return <code className={className} {...props}>{children}</code>
  },
  // Tables with wrapper for horizontal scroll
  table({ children, ...props }) {
    return (
      <div className="table-wrapper">
        <table {...props}>{children}</table>
      </div>
    )
  },
}

export function generateStaticParams() {
  return DOC_PAGES.map((page) => ({ slug: page.slug.split("/") }))
}

export async function generateMetadata({ params }: PageProps) {
  const slug = params.slug?.join("/") || ""
  const content = loadDocContent(slug)
  if (!content) return {}
  return {
    title: content.page.title,
    description: content.page.description,
  }
}

export default function DocPage({ params }: PageProps) {
  const slug = params.slug?.join("/") || ""
  const content = loadDocContent(slug)
  if (!content) {
    notFound()
  }

  return (
    <article className="pb-16">
      {/* Page header */}
      <div className="mb-8 pb-6" style={{ borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
        <div
          className="inline-block text-xs font-medium uppercase tracking-widest mb-3 px-2 py-0.5 rounded"
          style={{
            color: "hsl(196 100% 67%)",
            background: "rgba(125,211,252,0.08)",
            border: "1px solid rgba(125,211,252,0.14)",
          }}
        >
          {content.page.section}
        </div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "hsl(0 0% 98%)", letterSpacing: "-0.025em" }}
        >
          {content.page.title}
        </h1>
        {content.page.description && (
          <p className="text-base" style={{ color: "hsl(240 5% 60%)" }}>
            {content.page.description}
          </p>
        )}
      </div>

      {/* Markdown body */}
      <div className="docs-prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug, rehypeHighlight]}
          components={mdComponents}
        >
          {content.markdown}
        </ReactMarkdown>
      </div>
    </article>
  )
}
