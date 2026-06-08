import Link from "next/link"
import { ArrowRight, BookOpen, Code, Layers, Network, Cpu, Sparkles, Mic, Database, Shield } from "lucide-react"
import HomepageWorkflowDiagram from "@/components/homepage-workflow-diagram"

const CAPABILITIES = [
  { icon: Sparkles, label: "Frontier LLM", note: "canon-grounded" },
  { icon: Mic, label: "Neural TTS", note: "multi-voice" },
  { icon: Database, label: "pgvector RAG", note: "retrieval" },
  { icon: Network, label: "25+ agents", note: "CharacterOS" },
]

const PATHS = [
  {
    icon: BookOpen,
    title: "Start",
    body: "Upload a manuscript and initialize a storyworld workspace. Learn the dashboard, the core loop, and first configurations.",
    links: [
      { href: "/getting-started", label: "Getting Started" },
      { href: "/user-guide", label: "User Guide" },
    ],
  },
  {
    icon: Network,
    title: "Understand",
    body: "Explore character profiles, continuity validation, story graphs, and the 25-agent specialized runtime behind every scene.",
    links: [
      { href: "/agents", label: "Agent Reference" },
      { href: "/architecture", label: "Architecture" },
    ],
  },
  {
    icon: Code,
    title: "Build",
    body: "Interface with the REST API. Build character chats, run RAG story Q&A, and generate multi-character scenes programmatically.",
    links: [
      { href: "/api", label: "API Reference" },
      { href: "/api-examples", label: "Code Examples" },
      { href: "/workflows", label: "Workflows" },
    ],
  },
  {
    icon: Layers,
    title: "Ship",
    body: "Deploy to staging and production. Review runtime config, storage health, pgvector readiness, and security posture.",
    links: [
      { href: "/developers", label: "Developer Guide" },
      { href: "/security", label: "Security" },
    ],
  },
]

export default function DocsHomePage() {
  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* ── Hero ── */}
      <section className="relative pt-6 sm:pt-10">
        <div className="max-w-3xl space-y-7">
          <div className="inline-flex items-center gap-2 marvox-eyebrow rise-in">
            <Cpu className="w-3.5 h-3.5" />
            CharacterOS Runtime Environment
          </div>
          <h1 className="display-hero text-white rise-in rise-in-delay-1">
            The operating manual for storyworld production.
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl rise-in rise-in-delay-2">
            Marvox turns a manuscript into canon-grounded characters, validated scenes, and
            multi-voice audio. This is the reference for the runtime, the API, and the studio.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 rise-in rise-in-delay-3">
            <Link
              href="/getting-started"
              className="cta-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-sky-400 text-slate-950 hover:bg-sky-300"
            >
              Start with the workflow <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/api"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border border-sky-400/25 bg-sky-400/5 text-sky-300 hover:bg-sky-400/10 transition-colors"
            >
              API Reference
            </Link>
          </div>
        </div>

        {/* Capability strip */}
        <div className="reveal-stagger mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {CAPABILITIES.map((c) => (
            <div
              key={c.label}
              className="marvox-panel marvox-card-hover flex items-center gap-3 px-4 py-3.5"
            >
              <div className="w-9 h-9 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center shrink-0">
                <c.icon className="w-4 h-4 text-sky-300" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-100">{c.label}</div>
                <div className="text-xs text-slate-500">{c.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Status ── */}
      <section className="reveal flex flex-wrap items-center justify-between gap-4 rounded-xl px-6 py-5 marvox-panel border-sky-400/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
              Private Beta · Production Hardening
            </span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            Docs are aligned with the <code className="text-sky-300">MarvoxV1</code> main branch. Launch readiness
            depends on configured environment, upstream health checks, and release-gate verification.
          </p>
        </div>
        <Link
          href="/changelog"
          className="text-xs font-semibold px-3 py-1.5 rounded border border-slate-800 hover:bg-slate-900 text-slate-400 transition-colors"
        >
          Changelog →
        </Link>
      </section>

      {/* ── Featured visual: the production loop ── */}
      <section className="reveal space-y-7">
        <div className="max-w-2xl space-y-3">
          <h2 className="display-section text-white">The Marvox production loop</h2>
          <p className="text-base text-slate-400 leading-relaxed">
            Six stages take a raw manuscript to canonical, synthesized audio. Understand the flow
            before you initialize CharacterOS.
          </p>
        </div>
        <HomepageWorkflowDiagram />
      </section>

      {/* ── Studio CTA ── */}
      <section className="reveal relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/40 p-7 sm:p-10">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="marvox-eyebrow">CharacterOS Studio</div>
            <h2 className="display-section text-white">Explore the studio workflow</h2>
            <p className="text-base text-slate-400 leading-relaxed">
              Walk the main workspace flow: canon-grounded chat, scene generation, evidence panels,
              and the audio production handoff.
            </p>
          </div>
          <Link
            href="/user-guide"
            className="cta-primary shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-sky-400 text-slate-950 hover:bg-sky-300"
          >
            Open user guide <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Documentation paths ── */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-3 reveal">
          <h2 className="display-section text-white">Find your path</h2>
          <p className="text-base text-slate-400 leading-relaxed">
            Four routes through the manual, from first upload to production deploy.
          </p>
        </div>
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-6">
          {PATHS.map((p) => (
            <div key={p.title} className="marvox-panel marvox-card-hover p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
                  <p.icon className="w-4 h-4 text-sky-400" />
                </div>
                <h3 className="text-lg font-semibold text-white font-display">{p.title}</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{p.body}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1 text-xs">
                {p.links.map((l) => (
                  <Link key={l.href} href={l.href} className="text-sky-400 hover:text-sky-300 hover:underline">
                    {l.label} →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Brand verification ── */}
      <section className="reveal pt-8 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400 shrink-0" />
              <h4 className="font-semibold text-slate-200">Obsidian foundation</h4>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Mirrors the exact surface styling and low-glow principles of the core studio layout.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400 shrink-0" />
              <h4 className="font-semibold text-slate-200">Verification-gated</h4>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              REST contracts, schemas, and variables are verified against the <code className="text-sky-300/80">MarvoxV1</code> runtime.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
              <h4 className="font-semibold text-slate-200">Restrained &amp; editorial</h4>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Calm typography and technical clarity, built for developers and creators.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
