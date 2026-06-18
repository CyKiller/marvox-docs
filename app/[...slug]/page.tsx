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
import APICodeExamples from "@/components/api-code-examples"
import BuildPipelineDiagram from "@/components/build-pipeline-diagram"
import AudioPipelineDiagram from "@/components/audio-pipeline-diagram"
import RoadmapTimeline from "@/components/roadmap-timeline"
import MarkdownRenderer from "@/components/markdown-renderer"
import { TableOfContents } from "@/components/table-of-contents"
import UserGuidePage from "@/components/user-guide-page"

// Edit links point at the markdown that actually backs each page: content/<source> in this docs repo.
const GITHUB_CONTENT_BASE =
  "https://github.com/CyKiller/marvox-docs/blob/main/content/"

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export function generateStaticParams() {
  return DOC_PAGES.map((page) => ({ slug: page.slug.split("/") }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug?.join("/") || ""
  // Drive metadata from DOC_PAGES so custom-component routes (api, architecture, roadmap, …)
  // get unique titles, descriptions, and canonicals too — not just markdown-backed pages.
  const page = DOC_PAGES.find((p) => p.slug === slug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${slug}/`,
    },
    openGraph: {
      title: `${page.title} — Marvox Docs`,
      description: page.description,
    },
  }
}

export default async function DocPage({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug?.join("/") || ""

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

  // API code examples
  if (slug === "api-examples") {
    return <APICodeExamples />
  }

  // Build pipeline diagram
  if (slug === "build-pipeline") {
    return <BuildPipelineDiagram />
  }

  // Audio pipeline diagram
  if (slug === "audio-pipeline") {
    return <AudioPipelineDiagram />
  }

  // Roadmap timeline
  if (slug === "roadmap") {
    return <RoadmapTimeline />
  }

  // User guide — animated visual journey
  if (slug === "user-guide") {
    return <UserGuidePage />
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
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs mb-5 text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Docs</Link>
          <span aria-hidden>›</span>
          <span>{content.page.section}</span>
          <span aria-hidden>›</span>
          <span className="text-foreground/80">{content.page.title}</span>
        </nav>

        {/* Page header */}
        <div className="mb-8 pb-6 border-b border-border">
          <div className="inline-block text-xs font-medium uppercase tracking-widest mb-3 px-2 py-0.5 rounded text-primary bg-primary/[0.08] border border-primary/20">
            {content.page.section}
          </div>
          <h1
            id="page-title"
            className="text-3xl font-bold mb-2 tracking-tight text-foreground"
          >
            {content.page.title}
          </h1>
          {content.page.description && (
            <p className="text-base text-muted-foreground">
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
