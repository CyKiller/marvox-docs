import Link from "next/link"
import { ArrowRight, BookOpen, Code, Layers, Users, Zap, Shield, Cpu, Network, GitBranch, Volume2, Map, Activity } from "lucide-react"
import HomepageWorkflowDiagram from "@/components/homepage-workflow-diagram"

export default function DocsHomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* ── Quiet Hero ── */}
      <section className="relative rounded-2xl p-8 sm:p-12 marvox-panel-strong">
        <div className="relative space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 marvox-eyebrow">
            <Cpu className="w-3.5 h-3.5" />
            CharacterOS Runtime Environment
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white font-display">
            Marvox Docs
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed font-sans">
            The operating manual for CharacterOS, story analysis, canon-grounded scenes, and multi-voice production.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/getting-started"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all bg-sky-400 text-slate-950 hover:bg-sky-300"
              style={{
                boxShadow: "0 0 20px rgba(125, 211, 252, 0.2)",
              }}
            >
              Start with the workflow <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/api"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all border border-sky-400/20 bg-sky-400/5 text-sky-300 hover:bg-sky-400/10"
            >
              View API reference
            </Link>
            <Link
              href="/developers"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all border border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-300"
            >
              Read deployment guide
            </Link>
          </div>
        </div>
      </section>

      {/* ── Neutral Current Status ── */}
      <section className="rounded-xl px-6 py-5 marvox-panel border-sky-400/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
                Current Status: Private Beta / Production Hardening
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              Docs are aligned directly with `MarvoxV1` main branch. Launch readiness and actual production deployment depend on configured environment variables, upstream API health checks, and release-gate verification.
            </p>
          </div>
          <Link
            href="/changelog"
            className="text-xs font-semibold px-3 py-1.5 rounded border border-slate-800 hover:bg-slate-900 text-slate-400 transition-colors"
          >
            Changelog →
          </Link>
        </div>
      </section>

      {/* ── Glamorous Live Simulator CTA ── */}
      <section className="relative rounded-2xl overflow-hidden border border-sky-400/25 bg-gradient-to-r from-sky-950/25 via-slate-900/40 to-slate-950/60 p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-64 h-64 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider text-sky-400 uppercase bg-sky-950/50 border border-sky-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Live Interactive Simulator
            </div>
            <h2 className="text-xl sm:text-2xl font-medium text-white tracking-tight font-display">
              Experience the Studio v2 Workspace
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Interact with our storyworld production emulator directly in the docs. Explore canon-grounded chat evidence boxes, creative BRANCH settings, token stream tracking with automatic conflict triggers, and multi-voice DNA audio synthesis waves.
            </p>
          </div>
          <Link
            href="/user-guide"
            className="flex-shrink-0 flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all bg-sky-400/10 hover:bg-sky-400/20 text-sky-300 border border-sky-400/30 hover:border-sky-400/50"
            style={{
              boxShadow: "0 0 15px rgba(56, 189, 248, 0.1)",
            }}
          >
            Launch Live Simulator <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Workflow Diagram ── */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-medium text-white tracking-tight font-display">
            The Marvox Production Loop
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Six steps from raw manuscript to canonical, synthesized audio scenes. Understand the flow before programmatically initializing CharacterOS.
          </p>
        </div>
        <HomepageWorkflowDiagram />
      </section>

      {/* ── Core Documentation Paths (Start / Understand / Build / Ship) ── */}
      <section className="space-y-6">
        <h2 className="marvox-eyebrow">
          Core Operating Manual Paths
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start */}
          <div className="marvox-panel p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-sky-400" />
              </div>
              <h3 className="text-lg font-medium text-white font-display">Start</h3>
            </div>
            <p className="text-sm text-slate-400">
              Upload manuscripts and initialize a storyworld workspace. Discover basic workflows, dashboard components, and initial configurations.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-xs">
              <Link href="/getting-started" className="text-sky-400 hover:text-sky-300 hover:underline">Getting Started →</Link>
              <Link href="/user-guide" className="text-sky-400 hover:text-sky-300 hover:underline">User Guide →</Link>
            </div>
          </div>

          {/* Understand */}
          <div className="marvox-panel p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
                <Network className="w-4 h-4 text-sky-400" />
              </div>
              <h3 className="text-lg font-medium text-white font-display">Understand</h3>
            </div>
            <p className="text-sm text-slate-400">
              Explore character profiles, narrative continuity validation, story graphs, and the underlying 25-agent specialized runtime architecture.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-xs">
              <Link href="/agents" className="text-sky-400 hover:text-sky-300 hover:underline">Agent Reference →</Link>
              <Link href="/architecture" className="text-sky-400 hover:text-sky-300 hover:underline">Architecture Deep Dive →</Link>
            </div>
          </div>

          {/* Build */}
          <div className="marvox-panel p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
                <Code className="w-4 h-4 text-sky-400" />
              </div>
              <h3 className="text-lg font-medium text-white font-display">Build</h3>
            </div>
            <p className="text-sm text-slate-400">
              Interface programmatically with the REST API. Build character chats, perform RAG-based story Q&A, and generate multi-character scenes.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-xs">
              <Link href="/api" className="text-sky-400 hover:text-sky-300 hover:underline">API Reference →</Link>
              <Link href="/api-examples" className="text-sky-400 hover:text-sky-300 hover:underline">Code Examples →</Link>
              <Link href="/workflows" className="text-sky-400 hover:text-sky-300 hover:underline">Production Workflows →</Link>
            </div>
          </div>

          {/* Ship */}
          <div className="marvox-panel p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
                <Layers className="w-4 h-4 text-sky-400" />
              </div>
              <h3 className="text-lg font-medium text-white font-display">Ship</h3>
            </div>
            <p className="text-sm text-slate-400">
              Deploy to staging and production environments. Review Railway configs, Stripe webhooks, pgvector storage health, and OWASP security compliance.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-xs">
              <Link href="/developers" className="text-sky-400 hover:text-sky-300 hover:underline">Developer Guide →</Link>
              <Link href="/security" className="text-sky-400 hover:text-sky-300 hover:underline">Security Audit →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quiet Brand Verification ── */}
      <section className="pt-8 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-400">
          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-200">Obsidian Carbon Foundation</h4>
            <p className="text-xs leading-relaxed text-slate-500">
              Styled to mirror the exact surface styling and low-glow principles of the core storyworld studio layout.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-200">Verification-Gated</h4>
            <p className="text-xs leading-relaxed text-slate-500">
              All REST contracts, schemas, and variables are automatically verified and aligned with the `MarvoxV1` runtime engine.
            </p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-200">Restrained & Editorial</h4>
            <p className="text-xs leading-relaxed text-slate-500">
              Calm typography, spacious formatting, and technical clarity designed exclusively for developers and creators.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
