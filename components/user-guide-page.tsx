"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { InteractiveTutorialEmulator } from "@/components/interactive-tutorial-emulator"
import {
  Upload,
  ScanText,
  Brain,
  MessagesSquare,
  Volume2,
  PackageCheck,
  Sparkles,
  ArrowRight,
  MousePointerClick,
  CheckCircle2,
  PlayCircle,
} from "lucide-react"

type Stage = {
  icon: React.ElementType
  id: string
  kicker: string
  title: string
  blurb: string
  chips: string[]
  modes?: string[]
  tryTab: string
  tryText: string
}

const STAGES: Stage[] = [
  {
    icon: Upload,
    id: "ingest",
    kicker: "Bring your story in",
    title: "Ingest & validate",
    blurb:
      "Drop in a manuscript and Marvox reads it, checks the boundaries, and spins up a clean workspace, ready instantly.",
    chips: ["TXT · EPUB · PDF · DOCX · RTF", "Up to 100 MB", "PostgreSQL workspace"],
    tryTab: "READ",
    tryText: "Hover an entity like White Rabbit to see the profile card pulled from your manuscript.",
  },
  {
    icon: ScanText,
    id: "analyze",
    kicker: "Understand it deeply",
    title: "Analyze the storyworld",
    blurb:
      "A background engine maps your characters, facts, timeline, and a full story graph, so the world is understood before a single word is generated.",
    chips: ["Facts & traits", "Timeline synthesis", "Story graph"],
    tryTab: "READ",
    tryText: "Open the simulator to explore the characters and evidence extracted from the text.",
  },
  {
    icon: Brain,
    id: "ground",
    kicker: "Make it canon-true",
    title: "Bootstrap CharacterOS",
    blurb:
      "Canon is chunked, embedded, and indexed so every character speaks only what they truly know. Choose how strictly they stay on-script.",
    chips: ["pgvector retrieval", "Canon-grounded", "No production fallbacks"],
    modes: ["CANON", "CANON+INFER", "BRANCH", "WRITER_ROOM"],
    tryTab: "GROUND",
    tryText: "Toggle the GROUND tab and watch grounded evidence light up inside each reply.",
  },
  {
    icon: MessagesSquare,
    id: "compose",
    kicker: "Write together",
    title: "Compose & collaborate",
    blurb:
      "Co-write scenes with up to five characters. As the scene streams, continuity is checked against canon in real time, and conflicts surface instantly.",
    chips: ["Up to 5 characters", "Director controls", "Live continuity"],
    tryTab: "REVIEW",
    tryText: "Hit Start Real-Time Stream, then Revise when a continuity breach appears.",
  },
  {
    icon: Volume2,
    id: "voice",
    kicker: "Give it a voice",
    title: "Synthesize voices",
    blurb:
      "Each character carries Speech DNA. An eight-step pipeline renders multi-voice audio with prosody tuned to the emotion in every line.",
    chips: ["Speech DNA", "Prosody performance", "8-step pipeline"],
    tryTab: "HANDOFF",
    tryText: "Generate the audio pipeline and watch the soundwaves compile in real time.",
  },
  {
    icon: PackageCheck,
    id: "export",
    kicker: "Ship it",
    title: "Export & store",
    blurb:
      "Bundle audiobooks and scene packages for distribution. Production is fail-closed, so finished assets always land safely in the cloud.",
    chips: ["Fail-closed", "Cloud blob storage", "Audiobook export"],
    tryTab: "HANDOFF",
    tryText: "Finish a pipeline run to see the packaged, downloadable artifact.",
  },
]

const CHECKLIST = [
  "Manuscript uploaded under the 100 MB limit",
  "Progressive analysis reaches SUCCESS",
  "Character profiles indexed in pgvector",
  "Scenes generate with continuity passing",
  "Multi-voice audio returns a cloud-hosted URL",
  "Audiobook or scene package compiles cleanly",
]

export default function UserGuidePage() {
  const [active, setActive] = useState(0)
  const stageRefs = useRef<(HTMLDivElement | null)[]>([])
  const simulatorRef = useRef<HTMLDivElement | null>(null)

  // Moving marker: the active stage follows the reader down the page.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx)
            if (!Number.isNaN(idx)) setActive(idx)
          }
        })
      },
      { root: null, rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    stageRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  function scrollToSimulator() {
    simulatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="pb-20">
      <style>{`
        @keyframes ug-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(125,211,252,0.45), 0 0 18px rgba(125,211,252,0.45); }
          50%      { box-shadow: 0 0 0 6px rgba(125,211,252,0.0), 0 0 26px rgba(125,211,252,0.55); }
        }
        @keyframes ug-shimmer {
          0%   { background-position: -160% 0; }
          100% { background-position: 260% 0; }
        }
        .ug-shimmer {
          background: linear-gradient(100deg, hsl(196 100% 68%) 25%, #ffffff 50%, hsl(196 100% 68%) 75%);
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: hsl(196 100% 70%);
        }
        @media (prefers-reduced-motion: no-preference) {
          .ug-shimmer { animation: ug-shimmer 5s linear infinite; }
          .ug-marker-active { animation: ug-pulse 2.4s ease-in-out infinite; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative pt-4 pb-2">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 marvox-eyebrow rise-in">
            <Sparkles className="w-3.5 h-3.5" />
            CharacterOS Studio
          </div>
          <h1 className="display-hero text-white rise-in rise-in-delay-1">
            From a manuscript to a{" "}
            <span className="ug-shimmer">living storyworld</span>.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl rise-in rise-in-delay-2">
            Six friendly stages take your draft to canon-grounded characters, validated scenes, and
            finished multi-voice audio. Follow along, and try every step live in the simulator.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 rise-in rise-in-delay-3">
            <button
              onClick={scrollToSimulator}
              className="cta-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-sky-400 text-slate-950 hover:bg-sky-300"
            >
              <PlayCircle className="w-4 h-4" /> Try the live simulator
            </button>
            <a
              href="#ingest"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border border-sky-400/25 bg-sky-400/5 text-sky-300 hover:bg-sky-400/10 transition-colors"
            >
              Walk the six stages <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Interactive simulator ── */}
      <section ref={simulatorRef} className="reveal scroll-mt-6 mt-14 space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <h2 className="text-sm font-semibold tracking-wider text-sky-300 uppercase">Interactive simulator</h2>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
          Every tab below is a live capability of the CharacterOS API. Read, ground, build, review, and
          hand off to audio: exactly the loop you will run with your own story.
        </p>
        <InteractiveTutorialEmulator />
      </section>

      {/* ── The journey: moving-marker timeline ── */}
      <section className="mt-20">
        <div className="max-w-2xl space-y-3 reveal mb-10">
          <h2 className="display-section text-white">The six-stage loop</h2>
          <p className="text-base text-slate-400 leading-relaxed">
            Each stage hands a verified artifact to the next. Scroll, and the marker follows you down.
          </p>
        </div>

        <div className="relative">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon
            const isActive = idx === active
            const isDone = idx < active
            const isLast = idx === STAGES.length - 1
            return (
              <div
                key={stage.id}
                id={stage.id}
                data-idx={idx}
                ref={(el) => {
                  stageRefs.current[idx] = el
                }}
                className="reveal scroll-mt-6 relative grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr] gap-4 sm:gap-6 pb-8"
              >
                {/* Rail + moving marker */}
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-mono text-sm font-semibold transition-all duration-500 ${
                      isActive ? "ug-marker-active" : ""
                    }`}
                    style={{
                      background: isActive || isDone ? "rgba(125,211,252,0.14)" : "rgba(148,163,184,0.05)",
                      border: `1px solid ${
                        isActive ? "rgba(125,211,252,0.6)" : isDone ? "rgba(125,211,252,0.3)" : "rgba(148,163,184,0.14)"
                      }`,
                      color: isActive || isDone ? "hsl(196 100% 75%)" : "hsl(240 5% 50%)",
                    }}
                  >
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : String(idx + 1).padStart(2, "0")}
                  </div>
                  {!isLast && (
                    <div
                      className="w-px flex-1 mt-2 transition-colors duration-500"
                      style={{
                        background: isDone
                          ? "linear-gradient(180deg, rgba(125,211,252,0.45), rgba(125,211,252,0.15))"
                          : "rgba(148,163,184,0.12)",
                      }}
                    />
                  )}
                </div>

                {/* Stage card */}
                <div
                  className="marvox-panel marvox-card-hover relative overflow-hidden rounded-2xl p-6 sm:p-7"
                  style={
                    isActive
                      ? { borderColor: "rgba(125,211,252,0.28)", boxShadow: "0 0 0 1px rgba(125,211,252,0.08), 0 20px 50px rgba(2,8,22,0.4)" }
                      : undefined
                  }
                >
                  {/* highlight sweep on the active card */}
                  {isActive && (
                    <div
                      className="absolute inset-x-0 top-0 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(125,211,252,0.7), transparent)" }}
                    />
                  )}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{
                        background: "rgba(125,211,252,0.1)",
                        border: "1px solid rgba(125,211,252,0.2)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-sky-300" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-sky-400/70">{stage.kicker}</div>
                      <h3 className="text-xl font-semibold text-white font-display mt-0.5">{stage.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-[15px] text-slate-300/90 leading-relaxed mt-4">{stage.blurb}</p>

                  {/* highlight chips */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {stage.chips.map((chip) => (
                      <span
                        key={chip}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-sky-400/8 text-sky-200/90 border border-sky-400/15"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* operating modes (stage 3 only) */}
                  {stage.modes && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {stage.modes.map((m) => (
                        <span key={m} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950/60 text-slate-400 border border-slate-800">
                          {m}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Try it callout */}
                  <button
                    onClick={scrollToSimulator}
                    className="group/try mt-5 w-full text-left flex items-start gap-3 rounded-xl px-4 py-3 transition-colors"
                    style={{ background: "rgba(125,211,252,0.05)", border: "1px solid rgba(125,211,252,0.14)" }}
                  >
                    <MousePointerClick className="w-4 h-4 text-sky-300 mt-0.5 shrink-0" />
                    <span className="text-xs leading-relaxed text-slate-300">
                      <span className="font-semibold text-sky-200">Try it · {stage.tryTab} tab.</span>
                      <span className="text-slate-400"> {stage.tryText}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-sky-400/50 mt-0.5 shrink-0 transition-transform group-hover/try:translate-x-0.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Success checklist ── */}
      <section className="reveal mt-12">
        <div className="marvox-panel rounded-2xl p-7 sm:p-8">
          <h2 className="display-section text-white mb-1">You shipped a storyworld</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-2xl">
            Run through this checklist to confirm your project is operating cleanly inside CharacterOS.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {CHECKLIST.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-4 pt-6 border-t border-slate-800">
            <Link href="/workflows" className="text-sm flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors">
              Production workflows <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/api" className="text-sm flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors">
              API reference <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
