"use client"

import React from "react"
import { Upload, ScanText, Brain, MessageSquare, Volume2, PackageCheck } from "lucide-react"

type WorkflowStep = {
  icon: React.ElementType
  title: string
  description: string
  detail: string
}

const STEPS: WorkflowStep[] = [
  {
    icon: Upload,
    title: "Upload manuscript",
    description: "Drop a TXT, DOCX, PDF, EPUB, or RTF file",
    detail: "Up to 100 MB",
  },
  {
    icon: ScanText,
    title: "Analyze story",
    description: "Extract characters, emotional arcs, and themes",
    detail: "Frontier LLM",
  },
  {
    icon: Brain,
    title: "Build CharacterOS",
    description: "Index canon, then initialize the agent runtime",
    detail: "pgvector · PostgreSQL",
  },
  {
    icon: MessageSquare,
    title: "Review & ground",
    description: "Chat with canon-locked characters in CANON mode",
    detail: "Story Q&A (RAG)",
  },
  {
    icon: Volume2,
    title: "Produce scenes",
    description: "Generate dialogue scenes and synthesize speech",
    detail: "Multi-voice pipeline",
  },
  {
    icon: PackageCheck,
    title: "Export artifacts",
    description: "Download audio, packets, and analysis reports",
    detail: "Cloud blob storage",
  },
]

export default function HomepageWorkflowDiagram() {
  return (
    <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {STEPS.map((s, idx) => {
        const Icon = s.icon
        return (
          <div
            key={s.title}
            className="marvox-panel marvox-card-hover relative flex flex-col gap-3 p-5 overflow-hidden"
          >
            <span className="absolute top-4 right-4 text-[11px] font-mono font-semibold text-sky-300/40">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-sky-400/10 border border-sky-400/20">
              <Icon className="w-[18px] h-[18px] text-sky-300" />
            </div>
            <div className="flex flex-col gap-1 pr-6">
              <span className="font-semibold text-sm text-slate-100 leading-snug">{s.title}</span>
              <span className="text-xs leading-relaxed text-slate-400">{s.description}</span>
            </div>
            <span className="self-start text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/60 text-slate-500 border border-slate-900">
              {s.detail}
            </span>
          </div>
        )
      })}
    </div>
  )
}
