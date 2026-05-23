"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  BookOpen,
  Shield,
  Code,
  CheckCircle,
  Activity,
  User,
  Bot,
  Quote,
  Check,
  Play,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Volume2,
  Download,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

type TabType = "READ" | "GROUND" | "BUILD" | "REVIEW" | "HANDOFF"

export function InteractiveTutorialEmulator() {
  const [activeTab, setActiveTab] = useState<TabType>("GROUND")
  const [groundFilter, setGroundFilter] = useState<"qa" | "answer" | "evidence">("qa")
  
  // BUILD Tab States
  const [buildMode, setBuildMode] = useState<"CANON" | "BRANCH">("CANON")

  // REVIEW Tab States
  const [reviewState, setReviewState] = useState<"idle" | "streaming" | "conflict" | "resolving" | "resolved">("idle")
  const [streamedText, setStreamedText] = useState("")
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // HANDOFF Tab States
  const [audioState, setAudioState] = useState<"idle" | "processing" | "completed">("idle")
  const [audioStep, setAudioStep] = useState(0)

  // Clean up streams on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
    }
  }, [])

  // Review Stream Handler
  const startReviewStream = () => {
    setReviewState("streaming")
    setStreamedText("")
    
    const tokens = [
      "The", " Queen", " of", " Hearts", " stared", " down", " at", " Alice", 
      " with", " cold,", " crimson", " eyes.", " 'Who", " is", " this", " child?'", 
      " she", " demanded.", " Alice", " bowed", " politely,", " curtsying", 
      " before", " the", " grand", " court,", " and", " replied,", " 'I", " met", 
      " your", " Majesty", " in", " the", " rose", " garden", " yesterday.'"
    ]
    
    let index = 0
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
    
    streamIntervalRef.current = setInterval(() => {
      if (index < tokens.length) {
        setStreamedText((prev) => prev + tokens[index])
        index++
        
        // Trigger conflict at "Majesty in the rose garden"
        if (index === 28) {
          if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
          setReviewState("conflict")
        }
      } else {
        if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
      }
    }, 120)
  }

  const resolveConflict = () => {
    setReviewState("resolving")
    setTimeout(() => {
      setStreamedText(
        "The Queen of Hearts stared down at Alice with cold, crimson eyes. 'Who is this child?' she demanded. Alice bowed politely, curtsying before the grand court, and replied, 'I am Alice, an explorer who has just arrived in your majestic kingdom.'"
      )
      setReviewState("resolved")
    }, 1800)
  }

  const resetReview = () => {
    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
    setReviewState("idle")
    setStreamedText("")
  }

  // Audio Pipeline Steps Simulator
  const startAudioPipeline = () => {
    setAudioState("processing")
    setAudioStep(0)
    
    const steps = [
      "Parsing dialogue blocks...",
      "Resolving character voice bindings...",
      "Injecting Alice vocal DNA settings (speed: 1.05)...",
      "Injecting Queen vocal DNA settings (intensity: 0.8)...",
      "Generating text-to-speech audio streams...",
      "Analyzing vocal prosody performance...",
      "Compositing voice tracks & scheduling spacing...",
      "Uploading to Vercel Blob cloud storage...",
    ]

    let stepIndex = 0
    const interval = setInterval(() => {
      if (stepIndex < steps.length - 1) {
        stepIndex++
        setAudioStep(stepIndex)
      } else {
        clearInterval(interval)
        setAudioState("completed")
      }
    }, 800)
  }

  const resetAudio = () => {
    setAudioState("idle")
    setAudioStep(0)
  }

  return (
    <div className="w-full rounded-2xl border border-slate-800/80 bg-slate-950/70 shadow-2xl backdrop-blur-xl overflow-hidden font-sans select-none my-8">
      {/* ── Tabs Header Row ── */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/90 px-4 h-14 overflow-x-auto">
        <div className="flex items-center gap-1">
          {[
            { id: "READ", label: "READ", icon: BookOpen },
            { id: "GROUND", label: "GROUND", icon: Shield },
            { id: "BUILD", label: "BUILD", icon: Code },
            { id: "REVIEW", label: "REVIEW", icon: CheckCircle },
            { id: "HANDOFF", label: "HANDOFF", icon: Volume2 },
          ].map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "relative flex items-center gap-2 px-4 h-14 text-xs font-semibold uppercase tracking-wider transition-all focus:outline-none cursor-pointer shrink-0",
                  active ? "text-sky-300 font-bold" : "text-slate-500 hover:text-slate-300"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", active ? "text-sky-300" : "text-slate-500")} />
                {tab.label}
                {active && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-sky-400"
                    style={{
                      boxShadow: "0 0 10px rgba(125, 211, 252, 0.4)",
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Canon Status Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold tracking-widest uppercase shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          CANON STATE
        </div>
      </div>

      {/* ── Main Emulator Screen ── */}
      <div className="p-6 min-h-[360px] flex flex-col justify-between bg-gradient-to-b from-slate-950/20 to-slate-950/80">
        
        {/* ── TAB 1: READ ── */}
        {activeTab === "READ" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 pb-2 border-b border-slate-900">
              <span>MANUSCRIPT VIEWER</span>
              <span>•</span>
              <span>ALICES_ADVENTURES.TXT</span>
            </div>
            
            <div className="space-y-3 text-sm leading-relaxed text-slate-300 font-serif max-w-2xl">
              <p>
                Chapter I. Down the Rabbit-Hole.
              </p>
              <p>
                <span className="text-white font-semibold">Alice</span> was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”
              </p>
              <p>
                So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a{" "}
                <span className="text-sky-300 border-b border-sky-400/30 bg-sky-400/5 px-1 py-0.5 rounded cursor-help font-sans text-xs font-semibold group relative inline-block">
                  White Rabbit
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-lg border border-slate-800 bg-slate-950/95 text-[11px] font-sans font-normal text-slate-300 shadow-2xl leading-normal scale-0 group-hover:scale-100 transition-transform origin-bottom duration-150 z-50">
                    <span className="block font-bold text-white text-xs mb-1">Entity: White Rabbit</span>
                    <span className="block text-sky-300 font-semibold mb-1">Archetype: Muted Anxious</span>
                    <span className="block text-slate-500 border-t border-slate-900 pt-1.5 mt-1">Traits: Timid, hurried, obsessive about scheduling. Speech is high-pitched and stuttered.</span>
                  </span>
                </span>{" "}
                with pink eyes ran close by her.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded px-3 py-2 text-[11px] bg-slate-900/40 border border-slate-800 text-slate-400 mt-6 max-w-md">
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Hover over <span className="text-sky-300 font-semibold">White Rabbit</span> to inspect the Progressive Analysis entity card.</span>
            </div>
          </div>
        )}

        {/* ── TAB 2: GROUND (Match Screenshot exactly!) ── */}
        {activeTab === "GROUND" && (
          <div className="space-y-6 animate-fadeIn">
            {/* User message row */}
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-8 h-8 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 rounded-xl p-4 bg-slate-900/60 border border-slate-900 text-slate-200 text-sm leading-relaxed">
                Why was the White Rabbit in such a hurry?
              </div>
            </div>

            {/* Character reply row */}
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-8 h-8 rounded-full border border-sky-400/25 bg-sky-400/10 flex items-center justify-center text-sky-300 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-4">
                <div className={cn(
                  "rounded-xl p-4 bg-slate-900/30 border text-slate-200 text-sm leading-relaxed transition-all duration-300",
                  groundFilter === "answer" ? "border-sky-400/40 shadow-[0_0_15px_rgba(125,211,252,0.1)] bg-sky-400/5" : "border-slate-900"
                )}>
                  <p className="mb-3">
                    The White Rabbit is extremely anxious because he's running late, muttering "Oh dear! Oh dear! I shall be late!"
                  </p>
                  <p>
                    He appears to have a specific appointment, pulling a watch from his waistcoat pocket to check the time, which is what first catches Alice’s attention.
                  </p>
                </div>

                {/* Grounded Evidence Quote Box */}
                <div className={cn(
                  "rounded-xl p-4 transition-all duration-300 border",
                  groundFilter === "qa" 
                    ? "border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_15px_rgba(52,211,153,0.06)]"
                    : "border-slate-900/50 bg-slate-950/20"
                )}>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-emerald-400 uppercase mb-3">
                    <Quote className="w-3.5 h-3.5" />
                    GROUNDED EVIDENCE
                  </div>
                  
                  <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex gap-2.5">
                      <span className="w-1 bg-emerald-400/40 rounded shrink-0" />
                      <p className="leading-relaxed">
                        “Oh dear! Oh dear! I shall be late!” <span className="text-slate-500">(Chapter 1)</span>
                      </p>
                    </div>
                    <div className="flex gap-2.5">
                      <span className="w-1 bg-emerald-400/40 rounded shrink-0" />
                      <p className="leading-relaxed">
                        ...when suddenly a White Rabbit with pink eyes ran close by her. There was nothing so very remarkable in that... <span className="text-slate-500">(Chapter 1)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pill Filters Row */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-900">
              {[
                { id: "qa", label: "Grounded Q&A" },
                { id: "answer", label: "Story answer" },
                { id: "evidence", label: "Evidence in view" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setGroundFilter(pill.id as any)}
                  className={cn(
                    "text-xs px-4 py-2 rounded-full border tracking-wide transition-all cursor-pointer font-medium",
                    groundFilter === pill.id
                      ? "border-sky-400 bg-sky-400/10 text-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.15)]"
                      : "border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200"
                  )}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 3: BUILD ── */}
        {activeTab === "BUILD" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/50">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">CharacterOS Mode</span>
                <span className="text-xs text-slate-500">Toggle mode to see response grounding parameters update.</span>
              </div>
              <div className="flex rounded-lg border border-slate-800 p-0.5 bg-slate-900">
                <button
                  onClick={() => setBuildMode("CANON")}
                  className={cn(
                    "text-[10px] font-bold px-3 py-1.5 rounded transition-all cursor-pointer uppercase",
                    buildMode === "CANON" ? "bg-sky-400 text-slate-950 font-bold" : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  CANON
                </button>
                <button
                  onClick={() => setBuildMode("BRANCH")}
                  className={cn(
                    "text-[10px] font-bold px-3 py-1.5 rounded transition-all cursor-pointer uppercase",
                    buildMode === "BRANCH" ? "bg-sky-400 text-slate-950 font-bold" : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  BRANCH
                </button>
              </div>
            </div>

            {/* Prompt Configurator Panel */}
            <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="rounded-lg p-4 bg-slate-950 border border-slate-900 space-y-2">
                <span className="text-[10px] font-bold text-sky-400 block uppercase">System Prompt Schema</span>
                <p className="text-slate-500 leading-normal">
                  {buildMode === "CANON" 
                    ? "You are Alice. Constrain all reply answers strictly to pgvector facts. If not present in canon facts, reply: 'I cannot verify that event in my canon.'"
                    : "You are Alice. You are exploring a branch outcome. You are allowed to imagine alternate timelines. Extrapolate from the canon base."
                  }
                </p>
              </div>
              <div className="rounded-lg p-4 bg-slate-950 border border-slate-900 space-y-2">
                <span className="text-[10px] font-bold text-sky-400 block uppercase">Interactive Response Output</span>
                <p className="text-slate-300 leading-normal font-sans text-xs">
                  {buildMode === "CANON"
                    ? "ALICE: “I only recall following the White Rabbit because his hurried words and waistcoat pocket caught my curious eyes. I have no record of meeting other creatures on the bank.”"
                    : "ALICE: “What if I had decided not to fall down the hole? I might have walked back to the village, or perhaps crossed the river to discover what lies in the hills beyond Wonderland...”"
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: REVIEW ── */}
        {activeTab === "REVIEW" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Live stream monitor */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 min-h-[140px] relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pb-2 border-b border-slate-900">
                <span>CO-WRITING WEBOCSOCKET MONITOR</span>
                <span>STATE: {reviewState.toUpperCase()}</span>
              </div>

              {/* Streaming Box */}
              <div className="py-4 text-xs font-mono text-slate-300 leading-relaxed min-h-[60px]">
                {streamedText || <span className="text-slate-600">Click start to stream scene tokens...</span>}
                {reviewState === "streaming" && <span className="w-1.5 h-3.5 ml-0.5 bg-sky-400 inline-block animate-pulse" />}
              </div>

              {/* Alerts Panel inside screen */}
              {reviewState === "conflict" && (
                <div className="rounded border border-red-500/20 bg-red-500/10 p-3 flex items-start gap-2.5 text-xs text-red-400 animate-pulse">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">CONTINUITY BREACH DETECTED</span>
                    <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                      Alice refers to meeting the Queen in the rose garden, but she does not reach the rose garden until Chapter 8 scope.
                    </p>
                  </div>
                </div>
              )}

              {reviewState === "resolving" && (
                <div className="rounded border border-sky-500/25 bg-sky-500/5 p-3 flex items-center gap-2.5 text-xs text-sky-400">
                  <Sparkles className="w-4 h-4 shrink-0 animate-spin" />
                  <span>ContinuityAgent executing auto-recovery rewrite...</span>
                </div>
              )}

              {reviewState === "resolved" && (
                <div className="rounded border border-emerald-500/25 bg-emerald-500/10 p-3 flex items-center gap-2 text-xs text-emerald-400">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Canon integrity restored successfully. Resolution: REVISE.</span>
                </div>
              )}
            </div>

            {/* Controls Bar */}
            <div className="flex items-center gap-2">
              {reviewState === "idle" && (
                <button
                  onClick={startReviewStream}
                  className="flex items-center gap-2 text-xs px-4 py-2 rounded bg-sky-400 text-slate-950 font-bold hover:bg-sky-300 cursor-pointer transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Start Real-Time Stream
                </button>
              )}

              {reviewState === "conflict" && (
                <>
                  <button
                    onClick={resolveConflict}
                    className="flex items-center gap-1.5 text-xs px-4 py-2 rounded bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Revise (Auto-fix)
                  </button>
                  <button
                    onClick={() => setReviewState("resolved")}
                    className="text-xs px-4 py-2 rounded border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
                  >
                    Accept alternate timeline
                  </button>
                </>
              )}

              {(reviewState === "resolved" || reviewState === "conflict") && (
                <button
                  onClick={resetReview}
                  className="flex items-center gap-1 text-xs px-3 py-2 rounded border border-slate-800 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 5: HANDOFF ── */}
        {activeTab === "HANDOFF" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pb-2 border-b border-slate-900">
                <span>AUDIO SYNTHESIS pipeline MONITOR</span>
                <span>STATUS: {audioState.toUpperCase()}</span>
              </div>

              {audioState === "idle" && (
                <div className="py-6 text-center text-xs text-slate-500 space-y-2">
                  <p>Assign vocal bindings and trigger multi-voice synthesis.</p>
                  <div className="flex justify-center gap-4 text-[11px] text-slate-400 pt-2 font-mono">
                    <span>Alice: alloy (speed 1.05)</span>
                    <span>•</span>
                    <span>Queen: nova (intensity 0.8)</span>
                  </div>
                </div>
              )}

              {audioState === "processing" && (
                <div className="py-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold text-sky-400">Step {audioStep + 1}/8</span>
                    <span className="animate-pulse text-sky-300">Generating...</span>
                  </div>
                  {/* Animating Waveform panel placeholder */}
                  <div className="h-10 rounded bg-slate-900 flex items-center justify-center gap-1 overflow-hidden px-4 border border-slate-800">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
                      <span
                        key={i}
                        className="w-1 bg-sky-400/80 rounded animate-[bounce_1s_infinite]"
                        style={{
                          height: `${Math.floor(Math.random() * 24) + 8}px`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    Executing pipeline step: <span className="text-slate-300">Processing tracks...</span>
                  </div>
                </div>
              )}

              {audioState === "completed" && (
                <div className="py-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1"><Check className="w-4 h-4" /> Audio Pipeline Complete</span>
                    <span className="text-slate-500">2.4 seconds synthesized</span>
                  </div>
                  {/* Static waves */}
                  <div className="h-10 rounded bg-emerald-500/5 flex items-center justify-center gap-1 overflow-hidden px-4 border border-emerald-500/10">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
                      <span
                        key={i}
                        className="w-1 bg-emerald-400/60 rounded"
                        style={{
                          height: `${Math.floor(Math.sin(i) * 15) + 18}px`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>PERSISTENCE: Vercel Blob cloud storage</span>
                    <span className="text-emerald-400 font-bold">AUDIO_BLOB_STRICT: Gated</span>
                  </div>
                </div>
              )}
            </div>

            {/* Controls Bar */}
            <div className="flex items-center gap-2">
              {audioState === "idle" && (
                <button
                  onClick={startAudioPipeline}
                  className="flex items-center gap-1.5 text-xs px-4 py-2 rounded bg-sky-400 text-slate-950 font-bold hover:bg-sky-300 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Generate Audio Pipeline
                </button>
              )}

              {audioState === "completed" && (
                <>
                  <a
                    href="#download"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-1.5 text-xs px-4 py-2 rounded bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Scene MP3
                  </a>
                  <button
                    onClick={resetAudio}
                    className="flex items-center gap-1 text-xs px-3 py-2 rounded border border-slate-800 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ── Subtitle Footer ── */}
      <div className="border-t border-slate-900 bg-slate-950/80 px-6 py-4 flex items-center justify-between text-xs text-slate-400">
        <span>Every answer stays tied to what the manuscript actually says.</span>
        <span className="text-[10px] font-mono font-semibold text-slate-600">Interactive Studio v2 Simulator</span>
      </div>
    </div>
  )
}

export default InteractiveTutorialEmulator
