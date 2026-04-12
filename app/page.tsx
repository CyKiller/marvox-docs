import Link from "next/link"
import { ArrowRight, BookOpen, Code, Layers, Users, Zap, Shield, Cpu, Network, GitBranch } from "lucide-react"

const SECTIONS = [
  {
    icon: BookOpen,
    title: "Getting Started",
    href: "/getting-started",
    description: "Canonical onboarding flow. Launch your first storyworld in minutes.",
  },
  {
    icon: Users,
    title: "User Guide",
    href: "/user-guide",
    description: "CharacterOS Studio workflows, collaboration, and audio preview.",
  },
  {
    icon: Code,
    title: "API Reference",
    href: "/api",
    description: "Full REST API — auth, projects, CharacterOS, billing, and audio.",
  },
  {
    icon: Network,
    title: "Agent Network",
    href: "/agents",
    description: "Complete 25-agent reference: CharacterAgent, WriterAgent, ContinuityAgent, and more.",
  },
  {
    icon: Layers,
    title: "Architecture",
    href: "/architecture",
    description: "Multi-agent network, data flow, and production topology.",
  },
  {
    icon: GitBranch,
    title: "Workflows",
    href: "/workflows",
    description: "8 interactive production flows — build, scene generation, audio pipeline, RAG retrieval, and more.",
  },
  {
    icon: Zap,
    title: "Developer Guide",
    href: "/developers",
    description: "Local setup, test commands, migrations, and CI/CD workflows.",
  },
  {
    icon: Shield,
    title: "Security",
    href: "/security",
    description: "OWASP controls, rate limiting, secrets management, and audits.",
  },
]

const AGENT_FAMILIES = [
  { label: "Content Generation", count: 4, desc: "Reader · Character · Writer · Narrator" },
  { label: "Quality Assurance", count: 4, desc: "Continuity · Dialogue Quality · Emotional Beat · Scene Pacing" },
  { label: "Audio & Voice", count: 7, desc: "Voice Selection · Config · Audio Scene · Continuity · Cloning · DNA Learning · VoiceVault" },
  { label: "Evolution & Consensus", count: 2, desc: "Consensus Analyzer · Emotional Arc Evolver" },
  { label: "Supporting Agents", count: 8, desc: "Director · Summarization · Quality Analysis · Atmosphere · Reaction Audio · and more" },
]

export default function DocsHomePage() {
  return (
    <div className="space-y-16 pb-16">

      {/* ── Hero ── */}
      <section
        className="relative rounded-2xl overflow-hidden p-10"
        style={{
          background: "linear-gradient(135deg, rgba(6,12,28,0.92) 0%, rgba(4,9,22,0.97) 100%)",
          border: "1px solid rgba(125,211,252,0.18)",
          boxShadow: "0 0 80px rgba(125,211,252,0.07), 0 24px 60px rgba(2,8,22,0.4)",
        }}
      >
        <div
          className="absolute -top-20 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(125,211,252,0.13), transparent 70%)" }}
        />
        <div className="relative space-y-5 max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: "rgba(125,211,252,0.08)",
              border: "1px solid rgba(125,211,252,0.2)",
              color: "hsl(196 100% 67%)",
            }}
          >
            <Cpu className="w-3 h-3" />
            Powered by CharacterOS
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold"
            style={{ color: "hsl(0 0% 98%)", letterSpacing: "-0.03em" }}
          >
            Marvox<br />
            <span style={{ color: "hsl(196 100% 67%)" }}>Documentation</span>
          </h1>
          <p style={{ color: "hsl(240 5% 65%)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Build canon-grounded storyworlds with a 25-agent orchestration network.
            Full API reference, architecture deep-dives, and production deployment guides.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/getting-started"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all"
              style={{
                background: "hsl(196 100% 67%)",
                color: "#020817",
                boxShadow: "0 0 20px rgba(125,211,252,0.28)",
              }}
            >
              Start Here <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/api"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all"
              style={{
                border: "1px solid rgba(125,211,252,0.2)",
                background: "rgba(125,211,252,0.05)",
                color: "hsl(196 100% 67%)",
              }}
            >
              API Reference
            </Link>
          </div>
        </div>
      </section>

      {/* ── What's New banner ── */}
      <section
        className="rounded-xl px-5 py-4"
        style={{
          background: "linear-gradient(135deg, rgba(251,146,60,0.06) 0%, rgba(192,132,252,0.06) 100%)",
          border: "1px solid rgba(251,146,60,0.18)",
        }}
      >
        <div className="flex flex-wrap items-start gap-4">
          <div
            className="shrink-0 text-xs font-bold px-2 py-1 rounded"
            style={{ background: "rgba(251,146,60,0.15)", color: "#fb923c" }}
          >
            WHAT&apos;S NEW
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <p className="text-sm font-semibold" style={{ color: "hsl(0 0% 90%)" }}>
              Phase 4 — API Key Management & Character Reflection
            </p>
            <ul className="text-xs space-y-0.5" style={{ color: "hsl(240 5% 60%)" }}>
              <li>
                <span style={{ color: "#fb923c" }}>→</span>{" "}
                Long-lived API keys with SHA256 hashing, expiry, and last-used audit trail
                <code
                  className="ml-1 font-mono px-1 rounded text-[11px]"
                  style={{ background: "rgba(251,146,60,0.1)", color: "#fb923c" }}
                >
                  POST /api/billing/api-keys
                </code>
              </li>
              <li>
                <span style={{ color: "#c084fc" }}>→</span>{" "}
                Nightly character reflection — memory-driven personality arc evolution
              </li>
              <li>
                <span style={{ color: "#7dd3fc" }}>→</span>{" "}
                OpenAI cost tracking with configurable warning thresholds
              </li>
            </ul>
          </div>
          <Link
            href="/changelog"
            className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg"
            style={{
              background: "rgba(251,146,60,0.08)",
              border: "1px solid rgba(251,146,60,0.2)",
              color: "#fb923c",
            }}
          >
            Full Changelog →
          </Link>
        </div>
      </section>

      {/* ── Docs grid ── */}
      <section>
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-5"
          style={{ color: "hsl(240 5% 45%)" }}
        >
          Documentation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map(({ icon: Icon, title, href, description }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-xl p-5 transition-all"
              style={{
                background: "rgba(6,12,28,0.6)",
                border: "1px solid rgba(148,163,184,0.1)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(125,211,252,0.08)", border: "1px solid rgba(125,211,252,0.14)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "hsl(196 100% 67%)" }} />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: "hsl(0 0% 92%)" }}>
                    {title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "hsl(240 5% 55%)" }}>
                    {description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Agent network callout ── */}
      <section>
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-5"
          style={{ color: "hsl(240 5% 45%)" }}
        >
          Agent Network — 25 Agents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AGENT_FAMILIES.map(({ label, count, desc }) => (
            <div
              key={label}
              className="rounded-xl px-5 py-4"
              style={{
                background: "rgba(6,12,28,0.55)",
                border: "1px solid rgba(148,163,184,0.08)",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-semibold text-sm" style={{ color: "hsl(0 0% 90%)" }}>
                  {label}
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-mono"
                  style={{
                    background: "rgba(125,211,252,0.09)",
                    color: "hsl(196 100% 67%)",
                    border: "1px solid rgba(125,211,252,0.14)",
                  }}
                >
                  {count}
                </span>
              </div>
              <p className="text-xs" style={{ color: "hsl(240 5% 52%)" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
