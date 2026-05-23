export type DocPage = {
  slug: string
  title: string
  description: string
  source: string
  section: string
  order: number
}

export const DOC_PAGES: DocPage[] = [
  /* ── Start ── */
  {
    slug: "getting-started",
    title: "Start Here",
    description: "Canonical onboarding for developers and product users.",
    source: "START_HERE.md",
    section: "Start",
    order: 1,
  },
  {
    slug: "overview",
    title: "Overview",
    description: "Project overview and quick start.",
    source: "README.md",
    section: "Start",
    order: 2,
  },
  {
    slug: "user-guide",
    title: "User Guide",
    description: "Using CharacterOS Studio and collaboration features.",
    source: "USER_GUIDE.md",
    section: "Start",
    order: 3,
  },
  {
    slug: "studio-layout",
    title: "Studio Layout",
    description: "Interactive wireframe of the CharacterOS Studio interface.",
    source: "",
    section: "Start",
    order: 4,
  },

  /* ── Product ── */
  {
    slug: "build-pipeline",
    title: "Story Analysis",
    description: "6-stage project initialization showing character extraction and analysis.",
    source: "",
    section: "Product",
    order: 1,
  },
  {
    slug: "agents",
    title: "CharacterOS",
    description: "Complete CharacterOS agent reference — all 25+ agents, data models, and API surface.",
    source: "AGENTS.md",
    section: "Product",
    order: 2,
  },
  {
    slug: "story-graph",
    title: "Story Graph",
    description: "Interactive knowledge graph showing character, event, and world state relationships.",
    source: "",
    section: "Product",
    order: 3,
  },
  {
    slug: "agent-network",
    title: "Agent Network Diagram",
    description: "Complete CharacterOS agent network with 25+ agents organized into 5 families.",
    source: "",
    section: "Product",
    order: 4,
  },
  {
    slug: "audio-pipeline",
    title: "Audio Pipeline",
    description: "7-step audio production pipeline from dialogue parsing to quality validation.",
    source: "",
    section: "Product",
    order: 5,
  },

  /* ── Reference ── */
  {
    slug: "api",
    title: "API Reference",
    description: "REST API reference for Marvox backend endpoints.",
    source: "API.md",
    section: "Reference",
    order: 1,
  },
  {
    slug: "api-examples",
    title: "API Examples",
    description: "Interactive curl and Python code examples for common workflows.",
    source: "",
    section: "Reference",
    order: 2,
  },
  {
    slug: "workflows",
    title: "Workflows",
    description: "Interactive production workflow references.",
    source: "",
    section: "Reference",
    order: 3,
  },
  {
    slug: "architecture",
    title: "Architecture Guide",
    description: "System design, core modules, and data topology.",
    source: "ARCHITECTURE.md",
    section: "Reference",
    order: 4,
  },
  {
    slug: "integrations",
    title: "Third-Party Integrations",
    description: "Integrating Marvox with Google Docs, Word Add-ins, and OpenClaw.",
    source: "docs/INTEGRATIONS.md",
    section: "Reference",
    order: 5,
  },

  /* ── Ship ── */
  {
    slug: "deployment",
    title: "Deployment",
    description: "Railway + Vercel production deployment and environment config.",
    source: "DEPLOYMENT.md",
    section: "Ship",
    order: 1,
  },
  {
    slug: "developers",
    title: "Local Setup",
    description: "Local database setup, migrations, and testing.",
    source: "DEVELOPMENT.md",
    section: "Ship",
    order: 2,
  },
  {
    slug: "security",
    title: "Security",
    description: "Security posture, CSRF middleware, and rate limits.",
    source: "SECURITY.md",
    section: "Ship",
    order: 3,
  },
  {
    slug: "contributing",
    title: "Contributing",
    description: "Contribution workflow and PR guidelines.",
    source: "CONTRIBUTING.md",
    section: "Ship",
    order: 4,
  },
  {
    slug: "deployment-runbook",
    title: "Deployment Runbook",
    description: "Detailed runbook for Marvox production infrastructure.",
    source: "docs/DEPLOYMENT_RUNBOOK.md",
    section: "Ship",
    order: 5,
  },
  {
    slug: "deployment-inventory",
    title: "Deployment Inventory",
    description: "Supported deployment artifact inventory.",
    source: "docs/DEPLOYMENT_INVENTORY.md",
    section: "Ship",
    order: 6,
  },

  /* ── Project ── */
  {
    slug: "roadmap",
    title: "Roadmap",
    description: "Product roadmap showing phases from foundation through hardening.",
    source: "",
    section: "Project",
    order: 1,
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "Release notes, versions, and updates.",
    source: "CHANGELOG.md",
    section: "Project",
    order: 2,
  },
  {
    slug: "source-of-truth",
    title: "Source of Truth",
    description: "Precedence of docs, schemas, and source code files.",
    source: "SOURCE_OF_TRUTH.md",
    section: "Project",
    order: 3,
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
export const DOC_SECTION_KEYS = ["Start", "Product", "Reference", "Ship", "Project"]

// Sort sections based on explicit order
DOC_SECTIONS.sort((a, b) => DOC_SECTION_KEYS.indexOf(a.title) - DOC_SECTION_KEYS.indexOf(b.title))
