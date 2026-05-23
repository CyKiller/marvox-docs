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
  gradientFrom: string
  gradientTo: string
  borderColor: string
  iconBg: string
  iconColor: string
  badgeText: string
}

const STEPS: WorkflowStep[] = [
  {
    step: 1,
    icon: Upload,
    title: "Upload Manuscript",
    description: "Drop a TXT, DOCX, PDF, EPUB, or RTF",
    detail: "Up to 100 MB",
    gradientFrom: "rgba(6,182,212,0.12)",
    gradientTo: "rgba(6,182,212,0.04)",
    borderColor: "rgba(6,182,212,0.25)",
    iconBg: "rgba(6,182,212,0.15)",
    iconColor: "hsl(191 97% 77%)",
    badgeText: "Step 1",
  },
  {
    step: 2,
    icon: ScanText,
    title: "Analyze Story",
    description: "AI extracts characters, arcs, and world",
    detail: "GPT-4o-mini",
    gradientFrom: "rgba(139,92,246,0.12)",
    gradientTo: "rgba(139,92,246,0.04)",
    borderColor: "rgba(139,92,246,0.25)",
    iconBg: "rgba(139,92,246,0.15)",
    iconColor: "hsl(265 89% 78%)",
    badgeText: "Step 2",
  },
  {
    step: 3,
    icon: Brain,
    title: "Build CharacterOS",
    description: "Index canon into RAG; initialize agents",
    detail: "pgvector · PostgreSQL",
    gradientFrom: "rgba(245,158,11,0.12)",
    gradientTo: "rgba(245,158,11,0.04)",
    borderColor: "rgba(245,158,11,0.25)",
    iconBg: "rgba(245,158,11,0.15)",
    iconColor: "hsl(43 96% 66%)",
    badgeText: "Step 3",
  },
  {
    step: 4,
    icon: MessageSquare,
    title: "Chat & Review",
    description: "Talk to canon-locked characters",
    detail: "CANON / BRANCH modes",
    gradientFrom: "rgba(16,185,129,0.12)",
    gradientTo: "rgba(16,185,129,0.04)",
    borderColor: "rgba(16,185,129,0.25)",
    iconBg: "rgba(16,185,129,0.15)",
    iconColor: "hsl(160 84% 39%)",
    badgeText: "Step 4",
  },
  {
    step: 5,
    icon: Volume2,
    title: "Scene & Audio",
    description: "Generate scenes; synthesize multi-voice TTS",
    detail: "OpenAI TTS · 13 voices",
    gradientFrom: "rgba(249,115,22,0.12)",
    gradientTo: "rgba(249,115,22,0.04)",
    borderColor: "rgba(249,115,22,0.25)",
    iconBg: "rgba(249,115,22,0.15)",
    iconColor: "hsl(24 95% 66%)",
    badgeText: "Step 5",
  },
  {
    step: 6,
    icon: PackageCheck,
    title: "Export & Share",
    description: "Download audiobook, scene packets, or artifacts",
    detail: "Vercel Blob",
    gradientFrom: "rgba(125,211,252,0.12)",
    gradientTo: "rgba(125,211,252,0.04)",
    borderColor: "rgba(125,211,252,0.22)",
    iconBg: "rgba(125,211,252,0.12)",
    iconColor: "hsl(199 89% 70%)",
    badgeText: "Step 6",
  },
]

export default function HomepageWorkflowDiagram() {
  return (
    <>
      <style>{`
        @keyframes wf-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wf-step {
          opacity: 0;
          animation: wf-fade-up 0.45s ease forwards;
        }
        .wf-arrow-h { display: flex; align-items: center; }
        .wf-arrow-v { display: none;  }
        @media (max-width: 1023px) {
          .wf-arrow-h { display: none; }
          .wf-arrow-v { display: flex; }
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

      {/* Mobile / tablet: two-column grid */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
        {STEPS.map((s, idx) => (
          <React.Fragment key={s.step}>
            <StepCard s={s} idx={idx} />
            {/* Down-arrow after every odd step except the last */}
            {idx % 2 === 1 && idx < STEPS.length - 1 && (
              <div className="hidden sm:flex col-span-2 justify-center -my-1">
                <ChevronDown className="w-4 h-4" style={{ color: "hsl(240 5% 35%)" }} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Legend row */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs"
           style={{ color: "hsl(240 5% 45%)" }}>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "rgba(6,182,212,0.6)" }} />
          Ingest
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "rgba(139,92,246,0.6)" }} />
          Intelligence
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "rgba(245,158,11,0.6)" }} />
          Runtime init
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "rgba(16,185,129,0.6)" }} />
          Interaction
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "rgba(249,115,22,0.6)" }} />
          Production
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: "rgba(125,211,252,0.6)" }} />
          Delivery
        </span>
      </div>
    </>
  )
}

function StepCard({ s, idx }: { s: WorkflowStep; idx: number }) {
  const Icon = s.icon
  const delay = `${idx * 90}ms`

  return (
    <div
      className="wf-step flex-1 min-w-0 flex flex-col gap-2 rounded-xl p-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${s.gradientFrom}, ${s.gradientTo})`,
        border: `1px solid ${s.borderColor}`,
        animationDelay: delay,
      }}
    >
      {/* Step badge */}
      <span
        className="absolute top-3 right-3 text-[10px] font-semibold px-1.5 py-0.5 rounded"
        style={{
          background: s.iconBg,
          color: s.iconColor,
          letterSpacing: "0.06em",
        }}
      >
        {s.badgeText}
      </span>

      {/* Icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: s.iconBg }}
      >
        <Icon className="w-4.5 h-4.5" style={{ color: s.iconColor, width: 18, height: 18 }} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 pr-8">
        <span className="font-semibold text-sm text-white leading-snug">{s.title}</span>
        <span className="text-xs leading-snug" style={{ color: "hsl(240 5% 58%)" }}>
          {s.description}
        </span>
      </div>

      {/* Detail chip */}
      <span
        className="self-start text-[10px] font-mono px-2 py-0.5 rounded-md"
        style={{
          background: "rgba(4,9,20,0.5)",
          color: s.iconColor,
          border: `1px solid ${s.borderColor}`,
        }}
      >
        {s.detail}
      </span>
    </div>
  )
}

function HArrow() {
  return (
    <div className="flex items-center flex-shrink-0 px-0.5" aria-hidden>
      <div className="w-3 h-px" style={{ background: "hsl(240 5% 28%)" }} />
      <ChevronRight className="w-3.5 h-3.5 -ml-1" style={{ color: "hsl(240 5% 35%)" }} />
    </div>
  )
}
