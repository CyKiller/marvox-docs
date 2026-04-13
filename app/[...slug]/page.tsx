import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Pencil } from "lucide-react"
import { DOC_PAGES } from "@/lib/docs-data"
import { loadDocContent } from "@/lib/docs-content"
import { ArchitecturePage } from "@/components/architecture-page"
import ApiReferencePage from "@/components/api-reference-page"
import WorkflowsPage from "@/components/workflows-page"
import StudioLayoutDiagram from "@/components/studio-layout-diagram"
import StoryGraphDiagram from "@/components/story-graph-diagram"
import AgentNetworkDiagram from "@/components/agent-network-diagram"
import MarkdownRenderer from "@/components/markdown-renderer"
import { TableOfContents } from "@/components/table-of-contents"

const GITHUB_CONTENT_BASE =
  "https://github.com/CyKiller/MarvoxV1/blob/main/"

type PageProps = {
  params: { slug: string[] }
}

export function generateStaticParams() {
  return DOC_PAGES.map((page) => ({ slug: page.slug.split("/") }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug?.join("/") || ""
  const content = loadDocContent(slug)
  if (!content) return {}
  return {
    title: content.page.title,
    description: content.page.description,
    openGraph: {
      title: `${content.page.title} — Marvox Docs`,
      description: content.page.description,
    },
  }
}

export default function DocPage({ params }: PageProps) {
  const slug = params.slug?.join("/") || ""

  // Architecture has a fully custom visual page
  if (slug === "architecture") {
    return <ArchitecturePage />
  }

  // API reference has a fully custom visual page
  if (slug === "api") {
    return <ApiReferencePage />
  }

  // Workflows interactive reference
  if (slug === "workflows") {
    return <WorkflowsPage />
  }

  // Studio layout interactive wireframe
  if (slug === "studio-layout") {
    return <StudioLayoutDiagram />
  }

  // Story graph interactive diagram
  if (slug === "story-graph") {
    return <StoryGraphDiagram />
  }

  // Agent network diagram
  if (slug === "agent-network") {
    return <AgentNetworkDiagram />
  }

  const content = loadDocContent(slug)
  if (!content) {
    notFound()
  }

  const editUrl = content.page.source
    ? `${GITHUB_CONTENT_BASE}${content.page.source}`
    : null

  return (
    <div className="flex gap-8 items-start">
      <article className="min-w-0 flex-1 pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "hsl(240 5% 45%)" }}>
          <Link href="/" className="hover:text-slate-300 transition-colors">Docs</Link>
          <span aria-hidden>›</span>
          <span style={{ color: "hsl(240 5% 55%)" }}>{content.page.section}</span>
          <span aria-hidden>›</span>
          <span style={{ color: "hsl(0 0% 75%)" }}>{content.page.title}</span>
        </nav>

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
            id="page-title"
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
          {editUrl && (
            <a
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-xs text-muted-foreground hover:text-sky-400 transition-colors"
            >
              <Pencil className="w-3 h-3" />
              Edit this page on GitHub
            </a>
          )}
        </div>

        {/* Markdown body */}
        <MarkdownRenderer content={content.markdown} />
      </article>

      {/* Right-rail TOC — only visible at xl: breakpoint */}
      <TableOfContents markdown={content.markdown} />
    </div>
  )
}
