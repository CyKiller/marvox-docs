export type DocPage = {
  slug: string
  title: string
  description: string
  source: string
  section: string
  order: number
}

export const DOC_PAGES: DocPage[] = [
  {
    slug: "getting-started",
    title: "Start Here",
    description: "Canonical onboarding for developers and product users.",
    source: "START_HERE.md",
    section: "Getting Started",
    order: 1,
  },
  {
    slug: "overview",
    title: "Overview",
    description: "Project overview and quick start.",
    source: "README.md",
    section: "Getting Started",
    order: 2,
  },
  {
    slug: "user-guide",
    title: "User Guide",
    description: "Using CharacterOS Studio and collaboration features.",
    source: "USER_GUIDE.md",
    section: "User Guide",
    order: 1,
  },

  {
    slug: "api",
    title: "API Reference",
    description: "Generated API reference from OpenAPI.",
    source: "API.md",
    section: "API Reference",
    order: 1,
  },
  {
    slug: "developers",
    title: "Development Guide",
    description: "Local setup, scripts, and testing.",
    source: "DEVELOPMENT.md",
    section: "Developer Guide",
    order: 1,
  },
  {
    slug: "architecture",
    title: "Architecture",
    description: "System design and data flow.",
    source: "ARCHITECTURE.md",
    section: "Developer Guide",
    order: 2,
  },
  {
    slug: "deployment",
    title: "Deployment",
    description: "Railway + Vercel production deployment.",
    source: "DEPLOYMENT.md",
    section: "Developer Guide",
    order: 3,
  },
  {
    slug: "contributing",
    title: "Contributing",
    description: "Contribution workflow and PR guidelines.",
    source: "CONTRIBUTING.md",
    section: "Developer Guide",
    order: 4,
  },
  {
    slug: "agents",
    title: "Agent Network",
    description: "Complete CharacterOS agent reference — all 25+ agents, data models, and API surface.",
    source: "AGENTS.md",
    section: "Developer Guide",
    order: 5,
  },
  {
    slug: "workflows",
    title: "Workflows",
    description: "8 interactive production workflow references — build, chat, scene generation, audio, reflection, collaboration, API keys, and RAG.",
    source: "",
    section: "Developer Guide",
    order: 6,
  },
  {
    slug: "studio-layout",
    title: "Studio Layout",
    description: "Interactive wireframe of the CharacterOS Studio interface — 3-panel layout with agent mapping.",
    source: "",
    section: "User Guide",
    order: 2,
  },
  {
    slug: "story-graph",
    title: "Story Graph",
    description: "Interactive knowledge graph showing character, event, plot point, and world state relationships.",
    source: "",
    section: "Developer Guide",
    order: 7,
  },
  {
    slug: "agent-network",
    title: "Agent Network Diagram",
    description: "Complete CharacterOS agent network with 25+ agents organized into 5 families with roles and orchestration patterns.",
    source: "",
    section: "Developer Guide",
    order: 8,
  },
  {
    slug: "api-examples",
    title: "API Code Examples",
    description: "Interactive curl and Python code examples for the 8 most common CharacterOS workflows.",
    source: "",
    section: "API Reference",
    order: 2,
  },
  {
    slug: "roadmap",
    title: "Roadmap",
    description: "Product roadmap and phase status.",
    source: "ROADMAP.md",
    section: "Product",
    order: 1,
  },
  {
    slug: "security",
    title: "Security",
    description: "Security posture and policies.",
    source: "SECURITY.md",
    section: "Product",
    order: 3,
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "Release notes and updates.",
    source: "CHANGELOG.md",
    section: "Product",
    order: 4,
  },
]

export const DOC_SECTIONS = Array.from(
  DOC_PAGES.reduce((map, page) => {
    const existing = map.get(page.section) || []
    existing.push(page)
    map.set(page.section, existing)
    return map
  }, new Map<string, DocPage[]>()),
).map(([section, pages]) => ({
  title: section,
  pages: pages.sort((a, b) => a.order - b.order),
}))

export const DOC_PAGE_BY_SLUG = new Map(DOC_PAGES.map((page) => [page.slug, page]))
