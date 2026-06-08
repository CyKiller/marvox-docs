"use client"

import React, { useState } from "react"
import { CheckCircle2, Clock, Target, AlertCircle, Check, Circle } from "lucide-react"

type RoadmapPhase = {
  phase: number
  name: string
  title: string
  description: string
  status: "completed" | "in-progress" | "planned" | "blocked"
  estimatedCompletion?: string
  features: string[]
  completedFeatures: number
  blockers?: string
}

const phases: RoadmapPhase[] = [
  {
    phase: 1,
    name: "Foundation",
    title: "CharacterOS Core Runtime",
    description:
      "Single-agent character chat with canon retrieval, mode system (CANON/CANON+INFER), and Stripe billing integration. FastAPI backend, Next.js frontend, PostgreSQL persistent storage.",
    status: "completed",
    features: [
      "Character chat with RAG",
      "Canon scope filtering",
      "Mode system (CANON, CANON+INFER)",
      "Stripe billing",
      "JWT auth & email verification",
    ],
    completedFeatures: 5,
  },
  {
    phase: 2,
    name: "Collaboration",
    title: "Multi-Writer Studio & Character Reactions",
    description:
      "Real-time collaboration rooms enabling writers to work together. Character reactions in collaboration sessions via CharacterParticipantManager. WebSocket integration for live updates.",
    status: "completed",
    features: [
      "Collaboration rooms",
      "Real-time WebSocket updates",
      "Character participant reactions",
      "Scene conflict detection",
      "Chat history persistence",
    ],
    completedFeatures: 5,
  },
  {
    phase: 3,
    name: "Scene Generation",
    title: "WriterAgent & Continuity Validation",
    description:
      "Multi-character scene generation with 3-pass continuity validation. Narrative framing, dialogue quality scoring, emotional arc tracking. Full agent network expansion to 25+ agents.",
    status: "completed",
    features: [
      "WriterAgent multi-character scenes",
      "ContinuityAgent (5-layer validation)",
      "NarratorAgent framing",
      "DialogueQualityAgent scoring",
      "EmotionalBeatAnalyzer tracking",
      "DirectorAgent mood injection",
    ],
    completedFeatures: 6,
  },
  {
    phase: 4,
    name: "Audio Production",
    title: "Multi-Voice TTS & Voice DNA",
    description:
      "Audio generation pipeline with voice selection, configuration, and TTS synthesis. Voice DNA concept for character vocal identity. Audio continuity QA and quality scoring.",
    status: "completed",
    features: [
      "VoiceSelectionAgent mapping",
      "VoiceConfigurationAgent (300+ params)",
      "OpenAI TTS synthesis",
      "Parallel synthesis with semaphore guards",
      "AudioContinuityAgent QA (5-layer)",
      "Voice DNA evolution",
      "Audio caching strategy",
    ],
    completedFeatures: 7,
  },
  {
    phase: 5,
    name: "Memory & Reflection",
    title: "Character Memory Bridge & Nightly Reflection",
    description:
      "Background reflection scheduler enabling personality evolution and memory accumulation. Character memories persist across sessions. Consensus analyzer for multi-writer voice coherence.",
    status: "completed",
    features: [
      "MemoryBridge persistence",
      "Nightly reflection scheduler",
      "EmotionalArcEvolverAgent",
      "ConsensusAnalyzerAgent",
      "Memory pruning (90d TTL)",
      "Personality evolution tracking",
    ],
    completedFeatures: 6,
  },
  {
    phase: 6,
    name: "Advanced RAG",
    title: "Story Graph & Semantic Search",
    description:
      "Multi-modal RAG system with semantic story understanding. Character-aware and chapter-filtered retrieval. Story graph integration for relationship-aware context.",
    status: "completed",
    features: [
      "StoryGraphService",
      "Character-filtered RAG",
      "Chapter-scoped retrieval",
      "Relationship-aware context",
      "Multi-modal embeddings",
      "pgvector backend (PostgreSQL)",
    ],
    completedFeatures: 6,
  },
  {
    phase: 7,
    name: "Documentation & SEO",
    title: "Production Docs Site & Optimizations",
    description:
      "Comprehensive documentation with SEO optimization, interactive components, and developer guides. Deployed to Netlify. Dark/light modes, breadcrumbs, table of contents.",
    status: "completed",
    features: [
      "Marvox-docs site (separate repo)",
      "SEO fundamentals (robots.txt, sitemap)",
      "Theme toggle (dark/light)",
      "Interactive components (6+)",
      "Code examples",
      "API reference",
    ],
    completedFeatures: 6,
  },
  {
    phase: 8,
    name: "Content & Diagrams",
    title: "Interactive Diagrams & Code Examples",
    description:
      "Documentation expanded with interactive diagrams (Story Graph, Agent Network, Build/Audio Pipelines), API code examples, the roadmap timeline, and home page polish. All shipped to the live docs site.",
    status: "completed",
    features: [
      "Story Graph diagram",
      "Agent Network diagram",
      "API code examples (curl + Python)",
      "Build pipeline diagram",
      "Audio pipeline diagram",
      "Roadmap timeline",
      "Home page polish",
    ],
    completedFeatures: 7,
  },
  {
    phase: 9,
    name: "Production Hardening",
    title: "Stabilization & Scaling",
    description:
      "Active focus: production stabilization, contract consistency, and release reliability. Release gates across frontend, audio, CharacterOS, and storyworld-collab. Caching, database tuning, and monitoring as scale demands grow.",
    status: "in-progress",
    features: [
      "Release gates (frontend / audio / CharacterOS)",
      "Contract consistency hardening",
      "Redis caching optimization",
      "Database tuning",
      "Connection pooling",
      "Monitoring dashboards",
      "Load testing framework",
    ],
    completedFeatures: 2,
  },
]

export default function RoadmapTimeline() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0)

  const getStatusColor = (status: RoadmapPhase["status"]) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/12 text-emerald-300 border border-emerald-500/25"
      case "in-progress":
        return "bg-amber-500/12 text-amber-300 border border-amber-500/25"
      case "planned":
        return "bg-sky-500/10 text-sky-300 border border-sky-500/20"
      case "blocked":
        return "bg-rose-500/12 text-rose-300 border border-rose-500/25"
    }
  }

  const getStatusIcon = (status: RoadmapPhase["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-emerald-400" />
      case "in-progress":
        return <Clock className="w-6 h-6 text-amber-400 animate-pulse" />
      case "planned":
        return <Target className="w-6 h-6 text-blue-400" />
      case "blocked":
        return <AlertCircle className="w-6 h-6 text-rose-400" />
    }
  }

  const getStatusLabel = (status: RoadmapPhase["status"]) => {
    switch (status) {
      case "completed":
        return "Complete"
      case "in-progress":
        return "In Progress"
      case "planned":
        return "Planned"
      case "blocked":
        return "Blocked"
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h1 className="font-display text-3xl font-semibold text-white mb-2">Product Roadmap</h1>
        <p className="text-slate-400 mb-6">
          Marvox development timeline across 9 phases. Completed: phases 1–8 (runtime, collaboration, scene generation, audio, memory, advanced RAG, docs, interactive diagrams). Current focus: phase 9 — production hardening and release reliability.
        </p>

        {/* Timeline */}
        <div className="space-y-4">
          {phases.map((phase, idx) => (
            <div key={phase.phase} className="relative">
              {/* Timeline connector */}
              {idx < phases.length - 1 && (
                <div
                  className={`absolute left-6 top-16 w-0.5 h-12 bg-gradient-to-b ${
                    phase.status === "completed" ? "from-emerald-500 to-emerald-500/30" : "from-slate-600 to-slate-700"
                  }`}
                />
              )}

              {/* Phase card */}
              <div
                onClick={() => setExpandedPhase(expandedPhase === phase.phase ? null : phase.phase)}
                className={`relative rounded-lg border transition-all cursor-pointer ${
                  expandedPhase === phase.phase
                    ? `border-cyan-400 bg-slate-900 shadow-lg shadow-cyan-500/10`
                    : `border-slate-700 bg-slate-900 hover:border-slate-600`
                }`}
              >
                <div className="flex items-start gap-4 p-6">
                  <div className="flex-shrink-0 z-10">{getStatusIcon(phase.status)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                      <h3 className="font-display text-xl font-semibold text-white">Phase {phase.phase}</h3>
                      <span className="font-semibold text-slate-300">{phase.name}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-400 mb-2">{phase.title}</h4>
                    <p className="text-sm text-slate-400 mb-3">{phase.description}</p>

                    <div className="flex items-center gap-4 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          phase.status
                        )}`}
                      >
                        {getStatusLabel(phase.status)}
                      </span>
                      <span className="text-xs text-slate-400">
                        {phase.completedFeatures}/{phase.features.length} features
                      </span>
                      {phase.estimatedCompletion && (
                        <span className="text-xs text-slate-400">Est. {phase.estimatedCompletion}</span>
                      )}
                    </div>
                  </div>

                  <span className="text-slate-400 flex-shrink-0">{expandedPhase === phase.phase ? "−" : "+"}</span>
                </div>

                {expandedPhase === phase.phase && (
                  <div className="border-t border-slate-700 bg-slate-950 p-6 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-3">Features</h4>
                      <div className="space-y-2">
                        {phase.features.map((feature, idx) => (
                          <div key={feature} className="flex items-start gap-2 text-sm">
                            {idx < phase.completedFeatures ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                            ) : (
                              <Circle className="w-3 h-3 text-slate-600 mt-1 shrink-0" />
                            )}
                            <span className={idx < phase.completedFeatures ? "text-slate-300" : "text-slate-500"}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {phase.blockers && (
                      <div className="rounded-lg bg-rose-950/20 border border-rose-900/50 p-3">
                        <p className="flex items-start gap-2 text-sm text-rose-300">
                          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                          <span><span className="font-semibold">Blockers:</span> {phase.blockers}</span>
                        </p>
                      </div>
                    )}

                    {phase.status === "in-progress" && (
                      <div className="rounded-lg bg-amber-950/20 border border-amber-900/50 p-3">
                        <p className="text-sm text-amber-300">
                          <span className="font-semibold">Current focus:</span> production stabilization and release reliability — release gates, contract consistency, and runtime guards ahead of broad scale work.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Phase Highlights</h2>
        <div className="space-y-4 text-sm text-slate-400">
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">Phases 1–7: Core platform</h3>
            <p>
              Foundational CharacterOS runtime, collaboration, scene generation, audio production, memory/reflection, advanced RAG, and the documentation site. Complete and exercised through the release-gate test suites.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">Phase 8: Interactive documentation</h3>
            <p>
              Story Graph, Agent Network, Build/Audio pipeline diagrams, API code examples, the roadmap timeline, and home page polish — all shipped to the live docs site.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">Phase 9: Production hardening (current)</h3>
            <p>
              Active focus: production stabilization, contract consistency across the frontend/backend boundary, and release reliability. Caching, database tuning, and monitoring follow as scale demands grow.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Key Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-slate-900 border border-slate-700 p-4">
            <h3 className="font-semibold text-emerald-400 mb-2">Shipped</h3>
            <ul className="space-y-1 text-slate-400">
              <li>25+ CharacterOS agents</li>
              <li>Scene generation with continuity</li>
              <li>Multi-voice audio production</li>
              <li>Character reflection &amp; memory</li>
              <li>Real-time collaboration</li>
              <li>Interactive docs with 9 diagrams</li>
            </ul>
          </div>
          <div className="rounded-lg bg-slate-900 border border-slate-700 p-4">
            <h3 className="font-semibold text-amber-400 mb-2">In progress</h3>
            <ul className="space-y-1 text-slate-400">
              <li>Release-gate coverage hardening</li>
              <li>Frontend/backend contract consistency</li>
              <li>Production runtime guards</li>
              <li>Audio &amp; VoiceDNA readiness gates</li>
              <li>Mobile optimization polish</li>
            </ul>
          </div>
          <div className="rounded-lg bg-slate-900 border border-slate-700 p-4">
            <h3 className="font-semibold text-blue-400 mb-2">Coming next</h3>
            <ul className="space-y-1 text-slate-400">
              <li>Load testing framework</li>
              <li>Redis caching optimization</li>
              <li>Database performance tuning</li>
              <li>Monitoring dashboards</li>
              <li>Alerting rules &amp; runbooks</li>
            </ul>
          </div>
          <div className="rounded-lg bg-slate-900 border border-slate-700 p-4">
            <h3 className="font-semibold text-slate-300 mb-2">At a glance</h3>
            <ul className="space-y-1 text-slate-400">
              <li>Total phases: 9</li>
              <li>Completed: 1–8</li>
              <li>Current focus: phase 9</li>
              <li>Doc pages: 25</li>
              <li>Interactive components: 9</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
