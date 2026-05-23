"use client"

import React from "react"
import {
  Upload,
  ScanText,
  Brain,
  MessageSquare,
  Volume2,
  PackageCheck,
  ChevronRight,
  ChevronDown,
} from "lucide-react"

type WorkflowStep = {
  step: number
  icon: React.ElementType
  title: string
  description: string
  detail: string
  badgeText: string
}

const STEPS: WorkflowStep[] = [
  {
    step: 1,
    icon: Upload,
    title: "Upload Manuscript",
    description: "Drop a TXT, DOCX, PDF, EPUB, or RTF file",
    detail: "Up to 100 MB max",
    badgeText: "Phase 1",
  },
  {
    step: 2,
    icon: ScanText,
    title: "Analyze Story",
    description: "Extract characters, emotional arcs, and themes",
    detail: "GPT-4o-mini default",
    badgeText: "Phase 2",
  },
  {
    step: 3,
    icon: Brain,
    title: "Build CharacterOS",
    description: "Index canon into database; initialize agent runtime",
    detail: "pgvector · PostgreSQL",
    badgeText: "Phase 3",
  },
  {
    step: 4,
    icon: MessageSquare,
    title: "Review & Ground",
    description: "Chat with canon-locked characters in CANON mode",
    detail: "Story Q&A (RAG)",
    badgeText: "Phase 4",
  },
  {
    step: 5,
    icon: Volume2,
    title: "Produce Scenes",
    description: "Generate dialogue scenes and synthesize speech",
    detail: "Multi-voice pipeline",
    badgeText: "Phase 5",
  },
  {
    step: 6,
    icon: PackageCheck,
    title: "Export Artifacts",
    description: "Download audio files, packets, and analysis reports",
    detail: "Vercel Blob storage",
    badgeText: "Phase 6",
  },
]

export default function HomepageWorkflowDiagram() {
  return (
    <div className="space-y-4">
      <style>{`
        @keyframes wf-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wf-step {
          opacity: 0;
          animation: wf-fade-up 0.45s ease forwards;
        }
      `}</style>

      {/* Desktop: single horizontal row */}
      <div className="hidden lg:flex items-stretch gap-0">
        {STEPS.map((s, idx) => (
          <React.Fragment key={s.step}>
            <StepCard s={s} idx={idx} />
            {idx < STEPS.length - 1 && <HArrow />}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile / tablet: vertical/two-column layout */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STEPS.map((s, idx) => (
          <React.Fragment key={s.step}>
            <StepCard s={s} idx={idx} />
            {idx % 2 === 1 && idx < STEPS.length - 1 && (
              <div className="hidden sm:flex col-span-2 justify-center -my-2">
                <ChevronDown className="w-4 h-4 text-sky-400/30" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function StepCard({ s, idx }: { s: WorkflowStep; idx: number }) {
  const Icon = s.icon
  const delay = `${idx * 75}ms`

  return (
    <div
      className="wf-step flex-1 min-w-0 flex flex-col gap-3 p-5 relative overflow-hidden marvox-panel hover:border-sky-400/20 transition-all duration-300 group"
      style={{
        animationDelay: delay,
      }}
    >
      {/* Step badge */}
      <span className="absolute top-4 right-4 text-[9px] font-semibold px-1.5 py-0.5 rounded bg-sky-400/10 text-sky-300 border border-sky-400/15 tracking-wider uppercase">
        {s.badgeText}
      </span>

      {/* Icon */}
      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-sky-400/10 border border-sky-400/20 group-hover:bg-sky-400/15 transition-colors duration-300">
        <Icon className="w-4.5 h-4.5 text-sky-300" style={{ width: 18, height: 18 }} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 pr-6">
        <span className="font-semibold text-sm text-slate-100 font-sans leading-snug">{s.title}</span>
        <span className="text-xs leading-relaxed text-slate-400">
          {s.description}
        </span>
      </div>

      {/* Detail chip */}
      <span className="self-start text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950/60 text-slate-500 border border-slate-900">
        {s.detail}
      </span>
    </div>
  )
}

function HArrow() {
  return (
    <div className="flex items-center flex-shrink-0 px-0.5" aria-hidden>
      <div className="w-3 h-px bg-sky-400/10" />
      <ChevronRight className="w-3.5 h-3.5 -ml-1 text-sky-400/25" />
    </div>
  )
}
