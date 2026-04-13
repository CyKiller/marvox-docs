"use client"

import React, { useState } from "react"
import { CheckCircle2, Clock, Target, AlertCircle } from "lucide-react"

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
      "Upstash vector backend",
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
      "Phase 8 expanding documentation with interactive diagrams (Story Graph, Agent Network, Build/Audio Pipelines) and API code examples. In-progress: roadmap timeline, home page polish.",
    status: "in-progress",
    estimatedCompletion: "April 19, 2026",
    features: [
      "Story Graph diagram",
      "Agent Network diagram",
      "API code examples (curl + Python)",
      "Build pipeline diagram",
      "Audio pipeline diagram",
      "Roadmap timeline",
      "Home page polish",
    ],
    completedFeatures: 5,
    blockers: "None - Phase 8A (diagrams) complete, 8B (pipelines) in progress",
  },
  {
    phase: 9,
    name: "Production Hardening",
    title: "Load Testing & Scaling",
    description:
      "Load testing at 1000+ concurrent users. Redis caching optimization. Database connection pooling and query optimization. Monitoring and alerting infrastructure.",
    status: "planned",
    features: [
      "Load testing framework",
      "Redis optimization",
      "Database tuning",
      "Connection pooling",
      "Monitoring dashboards",
      "Alert rules",
      "Performance benchmarks",
    ],
    completedFeatures: 0,
  },
]

export default function RoadmapTimeline() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0)

  const getStatusColor = (status: RoadmapPhase["status"]) => {
    switch (status) {
      case "completed":
        return "from-emerald-500 to-teal-500"
      case "in-progress":
        return "from-amber-500 to-orange-500"
      case "planned":
        return "from-blue-500 to-cyan-500"
      case "blocked":
        return "from-rose-500 to-red-500"
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
        return "✓ Complete"
      case "in-progress":
        return "⧗ In Progress"
      case "planned":
        return "⎯ Planned"
      case "blocked":
        return "✕ Blocked"
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h1 className="font-display text-3xl font-semibold text-white mb-2">Product Roadmap</h1>
        <p className="text-slate-400 mb-6">
          Marvox development timeline across 9 phases. Completed phases: 1-7. Current phase: 8 (interactive diagrams). Upcoming: 9 (production hardening). Total estimated completion:
          April 2026.
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
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getStatusColor(
                          phase.status
                        )} text-white`}
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
                              <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                            ) : (
                              <span className="text-slate-500 font-bold mt-0.5">◦</span>
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
                        <p className="text-sm text-rose-300">
                          <span className="font-semibold">⚠ Blockers:</span> {phase.blockers}
                        </p>
                      </div>
                    )}

                    {phase.status === "in-progress" && (
                      <div className="rounded-lg bg-amber-950/20 border border-amber-900/50 p-3">
                        <p className="text-sm text-amber-300">
                          <span className="font-semibold">📍 Current Status:</span> Phase 8A (diagrams) complete. Phase 8B (pipelines) in progress. Phase 8C (Polish) upcoming.
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
            <h3 className="font-semibold text-slate-300 mb-1">✅ Phases 1-7: Core Features (Production Ready)</h3>
            <p>
              Foundational CharacterOS runtime, collaboration, scene generation, audio production, memory/reflection, advanced RAG, and documentation. All 7 phases complete and
              deployed. Architecture validated through hundreds of test scenarios.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">⧗ Phase 8: Content & Diagrams (In Progress)</h3>
            <p>
              <span className="text-emerald-400">8A Complete:</span> Story Graph, Agent Network, API Code Examples interactive components deployed.{" "}
              <span className="text-amber-400">8B In Progress:</span> Build Pipeline, Audio Pipeline diagrams + Roadmap Timeline.{" "}
              <span className="text-blue-400">8C Planned:</span> Home page polish, feature cards, advanced search.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">⎯ Phase 9: Production Hardening (Planned)</h3>
            <p>
              Load testing, Redis optimization, database tuning, monitoring & alerting. Prepares system for production scale (1000+ concurrent users). Estimated start: late
              April 2026.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Key Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-slate-900 border border-slate-700 p-4">
            <h3 className="font-semibold text-emerald-400 mb-2">✓ What's Done</h3>
            <ul className="space-y-1 text-slate-400">
              <li>✓ 25+ CharacterOS agents</li>
              <li>✓ Scene generation with continuity</li>
              <li>✓ Multi-voice audio production</li>
              <li>✓ Character reflection & memory</li>
              <li>✓ Real-time collaboration</li>
              <li>✓ Interactive docs with 6+ diagrams</li>
            </ul>
          </div>
          <div className="rounded-lg bg-slate-900 border border-slate-700 p-4">
            <h3 className="font-semibold text-amber-400 mb-2">⧗ In Progress</h3>
            <ul className="space-y-1 text-slate-400">
              <li>⧗ Build/Audio pipeline diagrams</li>
              <li>⧗ Roadmap timeline (this page)</li>
              <li>⧗ Home page feature cards</li>
              <li>⧗ Advanced search interface</li>
              <li>⧗ Mobile optimization polish</li>
            </ul>
          </div>
          <div className="rounded-lg bg-slate-900 border border-slate-700 p-4">
            <h3 className="font-semibold text-blue-400 mb-2">⎯ Coming Next</h3>
            <ul className="space-y-1 text-slate-400">
              <li>⎯ Load testing framework</li>
              <li>⎯ Redis caching optimization</li>
              <li>⎯ Database performance tuning</li>
              <li>⎯ Monitoring dashboards</li>
              <li>⎯ Alerting rules & runbooks</li>
            </ul>
          </div>
          <div className="rounded-lg bg-slate-900 border border-slate-700 p-4">
            <h3 className="font-semibold text-slate-300 mb-2">📊 Stats</h3>
            <ul className="space-y-1 text-slate-400">
              <li>Total Phases: 9</li>
              <li>Completed: 7 + (8A)</li>
              <li>In Progress: 8 (B, C remaining)</li>
              <li>Pages Generated: 25</li>
              <li>Components: 9 interactive</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
