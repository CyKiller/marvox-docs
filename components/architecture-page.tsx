"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"

// ── Shared primitives ──────────────────────────────────────────────────────────

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-medium uppercase tracking-widest px-2 py-0.5 rounded mb-4"
      style={{
        color: "hsl(196 100% 67%)",
        background: "rgba(125,211,252,0.08)",
        border: "1px solid rgba(125,211,252,0.14)",
      }}
    >
      {children}
    </span>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl font-bold mb-1"
      style={{ color: "hsl(0 0% 98%)", letterSpacing: "-0.025em" }}
    >
      {children}
    </h2>
  )
}

function SectionSub({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm mb-8" style={{ color: "hsl(240 5% 55%)" }}>
      {children}
    </p>
  )
}

function Card({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode
  className?: string
  glow?: boolean
}) {
  return (
    <div
      className={`rounded-xl ${className}`}
      style={{
        background: "rgba(6,12,28,0.72)",
        border: glow
          ? "1px solid rgba(125,211,252,0.22)"
          : "1px solid rgba(148,163,184,0.1)",
        boxShadow: glow ? "0 0 24px rgba(125,211,252,0.06)" : undefined,
      }}
    >
      {children}
    </div>
  )
}

function Badge({ children, color = "cyan" }: { children: React.ReactNode; color?: "cyan" | "purple" | "green" | "amber" | "slate" }) {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    cyan: { bg: "rgba(125,211,252,0.09)", text: "hsl(196 100% 67%)", border: "rgba(125,211,252,0.18)" },
    purple: { bg: "rgba(167,139,250,0.09)", text: "hsl(265 80% 75%)", border: "rgba(167,139,250,0.18)" },
    green: { bg: "rgba(52,211,153,0.09)", text: "hsl(160 70% 65%)", border: "rgba(52,211,153,0.18)" },
    amber: { bg: "rgba(251,191,36,0.09)", text: "hsl(40 90% 68%)", border: "rgba(251,191,36,0.18)" },
    slate: { bg: "rgba(148,163,184,0.08)", text: "hsl(240 5% 65%)", border: "rgba(148,163,184,0.14)" },
  }
  const c = colors[color]
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold font-mono"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {children}
    </span>
  )
}

// ── Section 1: Production Pipeline ────────────────────────────────────────────

const PIPELINE_STEPS = [
  {
    n: "01", label: "Upload", sub: "Manuscript ingest", desc: "DOCX / PDF / TXT up to 100 MB",
    detail: "MAX_UPLOAD_MB (default 100) enforced server-side before reading into memory. Supported formats: .docx, .pdf, .txt, .epub. File content is sanitized and stored; raw bytes never cached past extraction.",
    file: "backend/project_routes.py",
  },
  {
    n: "02", label: "Analyze", sub: "Progressive analysis", desc: "Characters · Plot · Themes · Style",
    detail: "ProgressiveAnalysisEngine extracts characters, relationships, timeline, themes, and writing style. Jobs tracked in DB — STALE_ANALYZING_HOURS (default 2) auto-fails stuck jobs.",
    file: "services/progressive_analysis_engine.py",
  },
  {
    n: "03", label: "Build", sub: "CharacterOS build", desc: "Profiles · Canon index · Memory init",
    detail: "POST /api/characteros/projects/{id}/build returns job_id immediately. Background: init → profiles → index → memories → complete. BuildStatusGuard gates all CharacterOS pages until status = complete.",
    file: "backend/characteros_routes.py",
  },
  {
    n: "04", label: "Generate", sub: "Scene generation", desc: "WriterAgent + DirectorAgent injection",
    detail: "DirectorAgent enriches the WriterAgent prompt with mood, pacing, and atmospheric context. Character count gated by CHAROS_MAX_SCENE_CHARACTERS (default 5).",
    file: "services/characteros/writer_agent.py",
  },
  {
    n: "05", label: "Validate", sub: "Continuity × 3 passes", desc: "Revise once if severity=high",
    detail: "ContinuityAgent runs three times intentionally. Pass 1: fast check, trigger revision if severity=high. Pass 2: full post-revision validation. Pass 3: narrator warn-only (never revises).",
    file: "services/characteros/continuity_agent.py",
  },
  {
    n: "06", label: "Narrate", sub: "NarratorAgent framing", desc: "Prose transitions + scene polish",
    detail: "AtmosphereAgent injects context before NarratorAgent framing call. Output: prose opening/closing, scene transitions, act markers. Continuity Pass 3 runs on narrator output (warn-only).",
    file: "services/characteros/narrator_agent.py",
  },
  {
    n: "07", label: "Audio", sub: "8-step TTS pipeline", desc: "Multi-voice · Semaphore(5) guarded",
    detail: "AudioPipelineOrchestrator: parse → voice resolution → config → TTS generation (asyncio.Semaphore(5)) → mixing → quality check → storage → telemetry. Output stored to Vercel Blob in production.",
    file: "services/characteros/audio_pipeline_orchestrator.py",
  },
]

function ProductionPipeline() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div>
      <div className="overflow-x-auto pb-2">
        <div className="flex items-stretch gap-0 min-w-[700px]">
          {PIPELINE_STEPS.map((step, i) => (
            <div key={step.n} className="flex items-center flex-1">
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="flex-1 rounded-xl p-4 flex flex-col gap-1.5 text-left transition-all duration-200 cursor-pointer"
                style={{
                  background: active === i ? "rgba(6,12,28,0.9)" : "rgba(6,12,28,0.72)",
                  border: active === i
                    ? "1px solid rgba(125,211,252,0.28)"
                    : "1px solid rgba(125,211,252,0.12)",
                  boxShadow: active === i ? "0 0 16px rgba(125,211,252,0.08)" : undefined,
                  minWidth: 0,
                }}
              >
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: "hsl(196 100% 67%)", opacity: active === i ? 1 : 0.65 }}
                >
                  {step.n}
                </span>
                <span className="font-semibold text-sm" style={{ color: "hsl(0 0% 96%)" }}>
                  {step.label}
                </span>
                <span className="text-xs font-medium" style={{ color: "hsl(196 100% 72%)", opacity: 0.8 }}>
                  {step.sub}
                </span>
                <span className="text-xs leading-relaxed" style={{ color: "hsl(240 5% 52%)" }}>
                  {step.desc}
                </span>
              </button>
              {i < PIPELINE_STEPS.length - 1 && (
                <div className="flex items-center px-1 flex-shrink-0">
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path d="M0 6 H14 M10 1 L18 6 L10 11" stroke="rgba(125,211,252,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {active !== null && (
        <div
          className="mt-3 rounded-xl px-5 py-4 transition-all duration-200"
          style={{
            background: "rgba(6,12,28,0.85)",
            border: "1px solid rgba(125,211,252,0.18)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold" style={{ color: "hsl(196 100% 67%)" }}>
              {PIPELINE_STEPS[active].n} — {PIPELINE_STEPS[active].label}
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "hsl(240 5% 65%)" }}>
            {PIPELINE_STEPS[active].detail}
          </p>
          <code
            className="inline-block text-xs font-mono px-2 py-0.5 rounded"
            style={{
              background: "rgba(0,0,0,0.3)",
              color: "hsl(196 100% 67%)",
              border: "1px solid rgba(125,211,252,0.2)",
              opacity: 0.85,
            }}
          >
            {PIPELINE_STEPS[active].file}
          </code>
        </div>
      )}
    </div>
  )
}

// ── Section 2: Agent Network ──────────────────────────────────────────────────

const AGENT_FAMILIES = [
  {
    label: "Content Generation",
    count: 4,
    color: "cyan" as const,
    colorHex: "hsl(196 100% 67%)",
    colorBg: "rgba(125,211,252,0.06)",
    colorBorder: "rgba(125,211,252,0.14)",
    agents: [
      { name: "ReaderAgent", role: "Story Q&A + RAG citations" },
      { name: "CharacterAgent", role: "Canon-locked roleplay" },
      { name: "WriterAgent", role: "Multi-character scene gen" },
      { name: "NarratorAgent", role: "Prose framing + transitions" },
    ],
  },
  {
    label: "Quality Assurance",
    count: 4,
    color: "green" as const,
    colorHex: "hsl(160 70% 65%)",
    colorBg: "rgba(52,211,153,0.05)",
    colorBorder: "rgba(52,211,153,0.12)",
    agents: [
      { name: "ContinuityAgent", role: "5-layer canon validation" },
      { name: "DialogueQualityAgent", role: "Naturalness scoring" },
      { name: "EmotionalBeatAnalyzer", role: "Arc progression tracking" },
      { name: "ScenePacingOptimizer", role: "Dialogue/action ratio" },
    ],
  },
  {
    label: "Audio & Voice",
    count: 7,
    color: "purple" as const,
    colorHex: "hsl(265 80% 75%)",
    colorBg: "rgba(167,139,250,0.05)",
    colorBorder: "rgba(167,139,250,0.12)",
    agents: [
      { name: "VoiceSelectionAgent", role: "Trait → neural DNA mapping" },
      { name: "VoiceConfigurationAgent", role: "300+ voice configs" },
      { name: "AudioSceneAgent", role: "Dialogue block parsing" },
      { name: "AudioContinuityAgent", role: "5-layer audio QA gate" },
      { name: "VoiceCloningAgent", role: "Neural voice DNA cloning" },
      { name: "DNALearningEngine", role: "Evolves voice DNA ≥ 85%" },
      { name: "VoiceVault", role: "IP-lock: sign + bind DNA" },
    ],
  },
  {
    label: "Evolution & Consensus",
    count: 2,
    color: "amber" as const,
    colorHex: "hsl(40 90% 68%)",
    colorBg: "rgba(251,191,36,0.05)",
    colorBorder: "rgba(251,191,36,0.12)",
    agents: [
      { name: "ConsensusAnalyzerAgent", role: "Multi-writer consensus detection" },
      { name: "EmotionalArcEvolverAgent", role: "Personality evolution from reactions" },
    ],
  },
  {
    label: "Supporting",
    count: 8,
    color: "slate" as const,
    colorHex: "hsl(240 5% 65%)",
    colorBg: "rgba(148,163,184,0.04)",
    colorBorder: "rgba(148,163,184,0.1)",
    agents: [
      { name: "DirectorAgent", role: "Mood/pacing injection" },
      { name: "SummarizationAgent", role: "2-sentence memory compression" },
      { name: "AtmosphereAgent", role: "Atmospheric context injection" },
      { name: "ReactionAudioStreamAgent", role: "Live audio streaming" },
      { name: "CharacterParticipantManager", role: "Character reactions on SCENE_COMPLETE" },
      { name: "QualityAnalysisAgent", role: "Text heuristics facade" },
      { name: "VoiceAgent", role: "Voice selection/config orchestration" },
      { name: "AudioAgent", role: "Audio parsing/QA orchestration" },
    ],
  },
]

function AgentNetwork() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {AGENT_FAMILIES.map((family) => (
        <div
          key={family.label}
          className="rounded-xl overflow-hidden"
          style={{
            background: family.colorBg,
            border: `1px solid ${family.colorBorder}`,
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center gap-2.5"
            style={{ borderBottom: `1px solid ${family.colorBorder}` }}
          >
            <span className="font-semibold text-sm" style={{ color: "hsl(0 0% 94%)" }}>
              {family.label}
            </span>
            <span
              className="ml-auto font-mono text-xs font-bold px-1.5 py-0.5 rounded-full"
              style={{
                background: "rgba(0,0,0,0.25)",
                color: family.colorHex,
              }}
            >
              {family.count}
            </span>
          </div>
          {/* Agent list */}
          <div className="px-4 py-3 space-y-2.5">
            {family.agents.map((a) => (
              <div key={a.name} className="flex flex-col">
                <span className="text-xs font-semibold font-mono" style={{ color: family.colorHex }}>
                  {a.name}
                </span>
                <span className="text-xs" style={{ color: "hsl(240 5% 52%)" }}>
                  {a.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Section 3: Scene Generation Orchestration ─────────────────────────────────

const SCENE_STEPS = [
  {
    agent: "WriterAgent",
    action: "generate_scene()",
    note: "DirectorAgent enriches prompt with mood/pacing",
    color: "cyan",
    colorHex: "hsl(196 100% 67%)",
    detail: "DirectorAgent.inject() prepends mood & pacing directives before the WriterAgent LLM call. Max characters enforced by CHAROS_MAX_SCENE_CHARACTERS.",
    file: "services/characteros/writer_agent.py",
  },
  {
    agent: "ContinuityAgent",
    action: "validate() — Pass 1",
    note: "Logical consistency check (fast or full). Severity=high → revise",
    color: "green",
    colorHex: "hsl(160 70% 65%)",
    detail: "5-layer validation: trait consistency, relationship accuracy, timeline coherence, dialogue authenticity, spoiler detection. Mode controlled by CHAROS_CONTINUITY_DETERMINISTIC_FIRST.",
    file: "services/characteros/continuity_agent.py",
  },
  {
    agent: "WriterAgent",
    action: "revise_scene()",
    note: "1 revision max — only triggered on severity=high",
    color: "amber",
    colorHex: "hsl(40 90% 68%)",
    conditional: true,
    detail: "Conditional — only runs when Pass 1 returns severity=high. Maximum 1 revision. If the revision still fails continuity, warnings are surfaced rather than retrying.",
    file: "services/characteros/writer_agent.py",
  },
  {
    agent: "ContinuityAgent",
    action: "validate() — Pass 2",
    note: "Final polish — always full validation",
    color: "green",
    colorHex: "hsl(160 70% 65%)",
    detail: "Always runs regardless of Pass 1 outcome. Always full (not fast) validation. Ensures the final scene (original or revised) meets canon standards before narration.",
    file: "services/characteros/continuity_agent.py",
  },
  {
    agent: "NarratorAgent",
    action: "add_framing()",
    note: "Adds prose framing and scene transitions",
    color: "purple",
    colorHex: "hsl(265 80% 75%)",
    detail: "AtmosphereAgent injects atmospheric context before NarratorAgent calls the LLM. Outputs prose framing, act/chapter transitions, and scene polish.",
    file: "services/characteros/narrator_agent.py",
  },
  {
    agent: "ContinuityAgent",
    action: "validate() — Pass 3",
    note: "Narrator output check (fast, warn-only — never revises)",
    color: "green",
    colorHex: "hsl(160 70% 65%)",
    detail: "Fast mode only. Warn-only — narrator output is always final. Any failures are appended to continuity_warnings in the API response. Never triggers revision.",
    file: "services/characteros/continuity_agent.py",
  },
  {
    agent: "MemoryBridge",
    action: "save_scene_participation()",
    note: "Persist participation to character memory",
    color: "slate",
    colorHex: "hsl(240 5% 65%)",
    detail: "Each participating character's scene involvement persisted to their memory store. Used by future RAG retrieval for character context hydration.",
    file: "services/characteros/memory_bridge.py",
  },
  {
    agent: "ProjectManager",
    action: "save_scene_generation()",
    note: "Persist to PostgreSQL via execute_unified",
    color: "slate",
    colorHex: "hsl(240 5% 65%)",
    detail: "Full scene record saved: text, character_ids, continuity_warnings, narration_applied flag. Uses execute_unified — never raw DB connections.",
    file: "services/project_manager.py",
  },
]

function SceneOrchestration() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  function toggle(i: number) {
    setExpandedStep(expandedStep === i ? null : i)
  }

  return (
    <div className="space-y-2">
      {SCENE_STEPS.map((step, i) => (
        <div key={i} className="flex gap-3 items-start">
          {/* Timeline line */}
          <div className="flex flex-col items-center flex-shrink-0 pt-1">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-200"
              style={{
                background: expandedStep === i ? step.colorHex : `${step.colorHex}66`,
                boxShadow: expandedStep === i ? `0 0 8px ${step.colorHex}80` : undefined,
                transform: expandedStep === i ? "scale(1.25)" : "scale(1)",
              }}
            />
            {i < SCENE_STEPS.length - 1 && (
              <div
                className="w-px flex-1 mt-1"
                style={{ background: "rgba(148,163,184,0.12)", minHeight: "24px" }}
              />
            )}
          </div>
          {/* Content */}
          <button
            onClick={() => toggle(i)}
            className="flex-1 rounded-lg px-4 py-3 mb-1 text-left transition-all duration-200 cursor-pointer"
            style={{
              background: expandedStep === i ? "rgba(6,12,28,0.85)" : "rgba(6,12,28,0.6)",
              border: expandedStep === i
                ? `1px solid ${step.colorHex}40`
                : "1px solid rgba(148,163,184,0.08)",
            }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className="font-mono text-xs font-bold"
                style={{ color: step.colorHex }}
              >
                {step.agent}
              </span>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  color: expandedStep === i ? "hsl(0 0% 80%)" : "hsl(0 0% 65%)",
                  border: "1px solid rgba(148,163,184,0.1)",
                }}
              >
                .{step.action}
              </span>
              {step.conditional && (
                <Badge color="amber">conditional</Badge>
              )}
              <span className="ml-auto text-xs" style={{ color: "hsl(240 5% 35%)" }}>
                {expandedStep === i ? "▴" : "▾"}
              </span>
            </div>
            <p className="text-xs" style={{ color: "hsl(240 5% 52%)" }}>
              {step.note}
            </p>
            {expandedStep === i && (
              <div
                className="mt-3 pt-3 space-y-2"
                style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}
              >
                <p className="text-xs leading-relaxed" style={{ color: "hsl(240 5% 65%)" }}>
                  {step.detail}
                </p>
                <code
                  className="inline-block text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    color: step.colorHex,
                    border: `1px solid ${step.colorHex}25`,
                    opacity: 0.85,
                  }}
                >
                  {step.file}
                </code>
              </div>
            )}
          </button>
        </div>
      ))}
    </div>
  )
}

// ── Section 4: Tech Stack ──────────────────────────────────────────────────────

const STACK_LAYERS = [
  {
    label: "Frontend",
    colorHex: "hsl(196 100% 67%)",
    colorBg: "rgba(125,211,252,0.05)",
    colorBorder: "rgba(125,211,252,0.12)",
    items: [
      { name: "Next.js 14", role: "App Router, SSR/SSG" },
      { name: "React 18", role: "UI runtime" },
      { name: "TypeScript 5", role: "Strict type checking" },
      { name: "Tailwind CSS 3", role: "Utility-first styles" },
      { name: "shadcn/ui", role: "Accessible components" },
      { name: "Framer Motion", role: "Animations" },
      { name: "Radix UI", role: "20+ headless components" },
      { name: "React Hook Form", role: "Form state + Zod validation" },
    ],
  },
  {
    label: "Backend",
    colorHex: "hsl(265 80% 75%)",
    colorBg: "rgba(167,139,250,0.05)",
    colorBorder: "rgba(167,139,250,0.12)",
    items: [
      { name: "FastAPI 0.104+", role: "Async framework, auto-docs" },
      { name: "Python 3.11+", role: "Type-safe async/await" },
      { name: "Uvicorn", role: "ASGI server" },
      { name: "Pydantic v2", role: "Data validation" },
      { name: "Alembic", role: "Schema migrations" },
      { name: "asyncpg", role: "PostgreSQL async driver" },
      { name: "pydub", role: "Audio format mixing" },
      { name: "python-docx / PyPDF", role: "Document parsing" },
    ],
  },
  {
    label: "AI & Inference",
    colorHex: "hsl(160 70% 65%)",
    colorBg: "rgba(52,211,153,0.05)",
    colorBorder: "rgba(52,211,153,0.12)",
    items: [
      { name: "OpenAI GPT-4o-mini", role: "LLM inference (all agents)" },
      { name: "OpenAI TTS", role: "13 voices, gpt-4o-mini-tts" },
      { name: "Sentence Transformers", role: "all-MiniLM-L6-v2 (384D)" },
      { name: "BatchEmbeddingService", role: "Batched + cached embeddings" },
      { name: "ChromaDB", role: "Local vector DB (dev)" },
      { name: "Upstash Vector", role: "Serverless vector (prod)" },
      { name: "AgentRuntime", role: "Singleton orchestrator" },
      { name: "RuntimePolicy", role: "CHAROS_* env knobs" },
    ],
  },
  {
    label: "Infrastructure",
    colorHex: "hsl(40 90% 68%)",
    colorBg: "rgba(251,191,36,0.05)",
    colorBorder: "rgba(251,191,36,0.12)",
    items: [
      { name: "Railway", role: "Backend hosting" },
      { name: "Vercel", role: "Frontend hosting" },
      { name: "PostgreSQL", role: "Primary database (prod only)" },
      { name: "Vercel Blob", role: "Audio/object storage (prod)" },
      { name: "Redis", role: "Rate limiting + cache (prod)" },
      { name: "Sentry", role: "Error monitoring" },
      { name: "Stripe", role: "Billing + webhooks" },
      { name: "Upstash", role: "Vector + edge Redis" },
    ],
  },
]

function TechStack() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {STACK_LAYERS.map((layer) => (
        <div
          key={layer.label}
          className="rounded-xl overflow-hidden"
          style={{ background: layer.colorBg, border: `1px solid ${layer.colorBorder}` }}
        >
          <div
            className="px-4 py-3"
            style={{ borderBottom: `1px solid ${layer.colorBorder}` }}
          >
            <span className="font-semibold text-sm" style={{ color: layer.colorHex }}>
              {layer.label}
            </span>
          </div>
          <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {layer.items.map((item) => (
              <div key={item.name} className="flex flex-col min-w-0">
                <span className="text-xs font-semibold font-mono truncate" style={{ color: "hsl(0 0% 90%)" }}>
                  {item.name}
                </span>
                <span className="text-xs truncate" style={{ color: "hsl(240 5% 50%)" }}>
                  {item.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Section 5: Production Data Flow ───────────────────────────────────────────

function DataFlowDiagram() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(148,163,184,0.1)" }}>
      {/* Row 1 */}
      <div className="grid grid-cols-3 divide-x" style={{ borderBottom: "1px solid rgba(148,163,184,0.1)", divideColor: "rgba(148,163,184,0.1)" }}>
        <FlowCell
          layer="Client"
          label="Next.js Frontend"
          sub="Vercel Edge"
          badge="HTTPS + WebSocket"
          color="cyan"
        />
        <FlowCell
          layer="API Gateway"
          label="FastAPI Backend"
          sub="Railway"
          badge="IntegratedSecurityMiddleware"
          color="purple"
          center
        />
        <FlowCell
          layer="Auth"
          label="JWT Bearer"
          sub="+ Stripe Webhooks"
          badge="SHA256 API Keys"
          color="amber"
        />
      </div>
      {/* Row 2 — arrow row */}
      <div
        className="flex items-center justify-center gap-4 py-2 px-6"
        style={{ background: "rgba(4,9,20,0.4)", borderBottom: "1px solid rgba(148,163,184,0.08)" }}
      >
        <div className="flex-1 h-px" style={{ background: "rgba(125,211,252,0.18)" }} />
        <span className="text-xs font-mono" style={{ color: "hsl(240 5% 40%)" }}>
          AgentRuntime (singleton)
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(125,211,252,0.18)" }} />
      </div>
      {/* Row 3 */}
      <div className="grid grid-cols-3 divide-x" style={{ divideColor: "rgba(148,163,184,0.1)", borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
        <FlowCell
          layer="Content Agents"
          label="Writer · Character"
          sub="Reader · Narrator"
          badge="4 agents"
          color="cyan"
        />
        <FlowCell
          layer="QA Agents"
          label="Continuity (×3)"
          sub="Dialogue · Beat · Pacing"
          badge="4 agents"
          color="green"
          center
        />
        <FlowCell
          layer="Audio Agents"
          label="Voice DNA · TTS"
          sub="Continuity · VoiceVault"
          badge="7 agents"
          color="purple"
        />
      </div>
      {/* Row 4 — storage */}
      <div className="grid grid-cols-4" style={{ background: "rgba(4,9,20,0.4)" }}>
        {[
          { label: "PostgreSQL", sub: "Projects · chars · scenes", color: "hsl(40 90% 65%)" },
          { label: "Upstash Vector", sub: "Canon index (384D)", color: "hsl(196 100% 67%)" },
          { label: "Vercel Blob", sub: "Audio files · exports", color: "hsl(265 80% 72%)" },
          { label: "Redis", sub: "Rate limits · cache", color: "hsl(160 70% 62%)" },
        ].map((s, i) => (
          <div
            key={s.label}
            className="px-4 py-3 flex flex-col gap-0.5"
            style={{ borderLeft: i > 0 ? "1px solid rgba(148,163,184,0.08)" : undefined }}
          >
            <span className="text-xs font-semibold" style={{ color: s.color }}>
              {s.label}
            </span>
            <span className="text-xs" style={{ color: "hsl(240 5% 45%)" }}>
              {s.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FlowCell({
  layer,
  label,
  sub,
  badge,
  color,
  center = false,
}: {
  layer: string
  label: string
  sub: string
  badge: string
  color: string
  center?: boolean
}) {
  const colorMap: Record<string, string> = {
    cyan: "hsl(196 100% 67%)",
    purple: "hsl(265 80% 75%)",
    amber: "hsl(40 90% 68%)",
    green: "hsl(160 70% 65%)",
  }
  const c = colorMap[color] ?? "hsl(196 100% 67%)"
  return (
    <div className={`p-4 flex flex-col gap-1 ${center ? "items-center text-center" : ""}`}>
      <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "hsl(240 5% 40%)" }}>
        {layer}
      </span>
      <span className="text-sm font-semibold" style={{ color: "hsl(0 0% 94%)" }}>
        {label}
      </span>
      <span className="text-xs" style={{ color: "hsl(240 5% 55%)" }}>
        {sub}
      </span>
      <span
        className="mt-1 inline-block text-xs font-mono px-1.5 py-0.5 rounded self-start"
        style={{ background: "rgba(0,0,0,0.25)", color: c, border: `1px solid ${c}30` }}
      >
        {badge}
      </span>
    </div>
  )
}

// ── Section 6: Runtime Mode System ────────────────────────────────────────────

const MODES = [
  {
    id: "CANON",
    label: "CANON",
    desc: "Source material only — refuse out-of-scope queries",
    detail: "Filter by canon_scope.chapters + character_ids. Characters refuse spoilers.",
    colorHex: "hsl(196 100% 67%)",
    colorBg: "rgba(125,211,252,0.06)",
    colorBorder: "rgba(125,211,252,0.16)",
  },
  {
    id: "CANON+INFER",
    label: "CANON + INFER",
    desc: "Canon-bounded with safe inference, marks uncertainty",
    detail: "Broad retrieval, no chapter filter. Characters signal when inferring beyond known facts.",
    colorHex: "hsl(160 70% 65%)",
    colorBg: "rgba(52,211,153,0.06)",
    colorBorder: "rgba(52,211,153,0.14)",
  },
  {
    id: "BRANCH",
    label: "BRANCH",
    desc: "Creative expansion, personality-locked not plot-locked",
    detail: "Unrestricted retrieval. Characters stay true to personality but can explore alternate outcomes.",
    colorHex: "hsl(265 80% 75%)",
    colorBg: "rgba(167,139,250,0.06)",
    colorBorder: "rgba(167,139,250,0.14)",
  },
  {
    id: "WRITER_ROOM",
    label: "WRITER ROOM",
    desc: "Scene generation mode for creative orchestration",
    detail: "Character interaction history retrieval. All agents active. Used by WriterAgent.",
    colorHex: "hsl(40 90% 68%)",
    colorBg: "rgba(251,191,36,0.06)",
    colorBorder: "rgba(251,191,36,0.14)",
  },
]

function RuntimeModes() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {MODES.map((mode) => (
        <div
          key={mode.id}
          className="rounded-xl p-5"
          style={{ background: mode.colorBg, border: `1px solid ${mode.colorBorder}` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="font-mono text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: "rgba(0,0,0,0.25)", color: mode.colorHex }}
            >
              {mode.label}
            </span>
          </div>
          <p className="text-sm font-medium mb-1.5" style={{ color: "hsl(0 0% 90%)" }}>
            {mode.desc}
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "hsl(240 5% 52%)" }}>
            {mode.detail}
          </p>
        </div>
      ))}
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export function ArchitecturePage() {
  return (
    <article className="pb-20 space-y-16">
      {/* Header */}
      <div className="pb-6" style={{ borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
        <SectionBadge>Developer Guide</SectionBadge>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "hsl(0 0% 98%)", letterSpacing: "-0.025em" }}
        >
          System Architecture
        </h1>
        <p className="text-base" style={{ color: "hsl(240 5% 60%)" }}>
          Production-grade Storyworld Production Studio. FastAPI backend on Railway · Next.js frontend on Vercel · 25-agent CharacterOS orchestrated by AgentRuntime singleton.
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-3 mt-5">
          {[
            { val: "25+", label: "Agents" },
            { val: "5", label: "Agent Families" },
            { val: "4", label: "Runtime Modes" },
            { val: "8-step", label: "Audio Pipeline" },
            { val: "3×", label: "Continuity Passes" },
            { val: "gpt-4o-mini", label: "Inference Model" },
          ].map(({ val, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(6,12,28,0.8)", border: "1px solid rgba(148,163,184,0.1)" }}
            >
              <span className="font-mono font-bold text-sm" style={{ color: "hsl(196 100% 67%)" }}>
                {val}
              </span>
              <span className="text-xs" style={{ color: "hsl(240 5% 55%)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 1 — Production Pipeline */}
      <section>
        <SectionBadge>Core Workflow</SectionBadge>
        <SectionHeading>Production Pipeline</SectionHeading>
        <SectionSub>
          Every storyworld moves through this 7-step pipeline. Steps are deterministic and ordered — shortcutting any step is explicitly prevented by the runtime contract.
        </SectionSub>
        <ProductionPipeline />
      </section>

      {/* 2 — Agent Network */}
      <section>
        <SectionBadge>CharacterOS</SectionBadge>
        <SectionHeading>Agent Network — 25 Agents, 5 Families</SectionHeading>
        <SectionSub>
          AgentRuntime is a singleton (get_agent_runtime_singleton()). Agents are lazy-instantiated on first use. Never construct agents per-request.
        </SectionSub>
        <AgentNetwork />
        <div className="mt-4 flex gap-3 flex-wrap">
          <Link
            href="/agents"
            className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              color: "hsl(196 100% 67%)",
              border: "1px solid rgba(125,211,252,0.2)",
              background: "rgba(125,211,252,0.05)",
            }}
          >
            Full Agent Reference →
          </Link>
        </div>
      </section>

      {/* 3 — Scene Generation Orchestration */}
      <section>
        <SectionBadge>Scene Generation</SectionBadge>
        <SectionHeading>Scene Generation Orchestration</SectionHeading>
        <SectionSub>
          ContinuityAgent runs exactly 3 times — this is intentional. Pass 3 is warn-only and never triggers a revision. Do not collapse these calls.
        </SectionSub>
        <SceneOrchestration />
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/workflows"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-all duration-150"
            style={{
              background: "rgba(125,211,252,0.07)",
              border: "1px solid rgba(125,211,252,0.18)",
              color: "hsl(196 100% 67%)",
            }}
          >
            See all 8 production workflows →
          </Link>
        </div>
      </section>

      {/* 4 — Production Data Flow */}
      <section>
        <SectionBadge>Infrastructure</SectionBadge>
        <SectionHeading>Production Data Flow</SectionHeading>
        <SectionSub>
          All production backends are primary — no silent local fallbacks. IntegratedSecurityMiddleware handles CSRF, rate limiting, and XSS sanitization on every request.
        </SectionSub>
        <DataFlowDiagram />
      </section>

      {/* 5 — Tech Stack */}
      <section>
        <SectionBadge>Technology</SectionBadge>
        <SectionHeading>Technology Stack</SectionHeading>
        <SectionSub>
          Frontend on Vercel, backend on Railway. PostgreSQL is the only database across all environments. Local development uses Docker for PostgreSQL + Redis.
        </SectionSub>
        <TechStack />
      </section>

      {/* 6 — Runtime Mode System */}
      <section>
        <SectionBadge>Runtime Contract</SectionBadge>
        <SectionHeading>Runtime Mode System</SectionHeading>
        <SectionSub>
          Mode controls how CharacterOS agents scope retrieval and frame responses. Legacy canon_locked=true maps to CANON, false maps to CANON+INFER.
        </SectionSub>
        <RuntimeModes />
      </section>
    </article>
  )
}
