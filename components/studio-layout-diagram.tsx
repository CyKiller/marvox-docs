"use client"

import React, { useState, useEffect, useRef } from "react"

// ── Types ─────────────────────────────────────────────────────────────────────

type Panel = "controls" | "scene" | "events"

type PanelInfo = {
  id: Panel
  label: string
  subtitle: string
  agents: string[]
  description: string
  colorHex: string
  colorBg: string
  colorBorder: string
}

// ── Panel metadata ─────────────────────────────────────────────────────────────

const PANELS: PanelInfo[] = [
  {
    id: "controls",
    label: "Controls",
    subtitle: "Prompt & Configuration",
    colorHex: "hsl(265 80% 75%)",
    colorBg: "rgba(167,139,250,0.06)",
    colorBorder: "rgba(167,139,250,0.16)",
    description:
      "The left panel hosts all scene-generation inputs. Writers configure prompt, characters, Director settings, and mode before triggering generation.",
    agents: [
      "DirectorAgent — injects mood & pacing",
      "WriterAgent — receives enriched prompt",
      "CharacterParticipantManager — selects participants",
      "RuntimePolicy — enforces CHAROS_MAX_SCENE_CHARACTERS",
    ],
  },
  {
    id: "scene",
    label: "Live Scene Viewer",
    subtitle: "Real-time generation output",
    colorHex: "hsl(196 100% 67%)",
    colorBg: "rgba(125,211,252,0.06)",
    colorBorder: "rgba(125,211,252,0.16)",
    description:
      "The center panel streams the scene as it is generated, showing each character's dialogue in real-time. ContinuityAgent warnings overlay in the viewport.",
    agents: [
      "WriterAgent — generates dialogue blocks",
      "NarratorAgent — adds framing & transitions",
      "ContinuityAgent — surfaces warnings inline",
      "ScreenplayViewer component — renders formatted output",
    ],
  },
  {
    id: "events",
    label: "Event Log",
    subtitle: "Agent telemetry & collaboration",
    colorHex: "hsl(40 90% 68%)",
    colorBg: "rgba(251,191,36,0.06)",
    colorBorder: "rgba(251,191,36,0.16)",
    description:
      "The right panel displays real-time agent events, token usage, continuity validation results, and live character reactions from collaborators.",
    agents: [
      "AgentTelemetry — @traced span events",
      "AudioContinuityAgent — QA validation status",
      "CharacterParticipantManager — CHARACTER_REACTION events",
      "EvalRecorder — JSONL eval event log",
    ],
  },
]

// ── Streaming text ────────────────────────────────────────────────────────────

const SCENE_LINES = [
  { speaker: "ALICE", text: "\"The roses were white when I planted them,\" she said,", color: "hsl(196 100% 67%)" },
  { speaker: "QUEEN", text: "\"Off with her—\" the Queen began, but stopped herself.", color: "hsl(330 85% 72%)" },
  { speaker: "NARRATOR", text: "The garden held its breath. Paint dripped from the stems.", color: "hsl(240 5% 60%)" },
  { speaker: "ALICE", text: "\"I meant no harm, Your Majesty. Only the truth.\"", color: "hsl(196 100% 67%)" },
  { speaker: "CHESHIRE", text: "\"Truth,\" purred the Cat from the wall above,", color: "hsl(160 70% 65%)" },
  { speaker: "CHESHIRE", text: "\"is only a matter of which side you paint it from.\"", color: "hsl(160 70% 65%)" },
]

function StreamingScene({ isPlaying }: { isPlaying: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isPlaying) {
      setVisibleLines(0)
      setCharIndex(0)

      intervalRef.current = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev >= SCENE_LINES.length) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            return prev
          }
          return prev + 1
        })
      }, 900)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setVisibleLines(SCENE_LINES.length) // show all when not animating
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  return (
    <div className="space-y-2 font-mono text-xs">
      {SCENE_LINES.slice(0, isPlaying ? visibleLines : SCENE_LINES.length).map((line, i) => (
        <div key={i} className="flex gap-2">
          <span
            className="flex-shrink-0 font-bold text-[10px] uppercase tracking-widest pt-0.5 w-16 text-right"
            style={{ color: line.color, opacity: 0.75 }}
          >
            {line.speaker}
          </span>
          <span style={{ color: "hsl(0 0% 80%)", lineHeight: 1.6 }}>
            {line.text}
            {isPlaying && i === visibleLines - 1 && (
              <span
                className="inline-block w-1.5 h-3 ml-0.5 align-middle animate-pulse"
                style={{ background: "hsl(196 100% 67%)" }}
              />
            )}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Event log items ───────────────────────────────────────────────────────────

const EVENTS = [
  { type: "TRACE", label: "character_chat", value: "42ms", color: "hsl(196 100% 67%)" },
  { type: "PASS", label: "continuity_pass_1", value: "✓ valid", color: "hsl(160 70% 65%)" },
  { type: "REACT", label: "CHARACTER_REACTION", value: "Alice", color: "hsl(265 80% 75%)" },
  { type: "TRACE", label: "narrator_framing", value: "88ms", color: "hsl(196 100% 67%)" },
  { type: "WARN", label: "continuity_pass_3", value: "1 warning", color: "hsl(40 90% 68%)" },
  { type: "REACT", label: "CHARACTER_REACTION", value: "Queen", color: "hsl(265 80% 75%)" },
  { type: "STORE", label: "save_scene_generation", value: "ok", color: "hsl(160 70% 65%)" },
]

function EventLog({ isPlaying }: { isPlaying: boolean }) {
  const [visible, setVisible] = useState(EVENTS.length)

  useEffect(() => {
    if (isPlaying) {
      setVisible(0)
      let i = 0
      const t = setInterval(() => {
        i++
        setVisible(i)
        if (i >= EVENTS.length) clearInterval(t)
      }, 750)
      return () => clearInterval(t)
    } else {
      setVisible(EVENTS.length)
    }
  }, [isPlaying])

  return (
    <div className="space-y-1.5">
      {EVENTS.slice(0, isPlaying ? visible : EVENTS.length).map((ev, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0"
            style={{
              background: `${ev.color}15`,
              color: ev.color,
              border: `1px solid ${ev.color}30`,
              minWidth: 38,
              textAlign: "center",
            }}
          >
            {ev.type}
          </span>
          <span className="text-xs font-mono truncate flex-1" style={{ color: "hsl(0 0% 65%)" }}>
            {ev.label}
          </span>
          <span className="text-xs font-mono flex-shrink-0" style={{ color: ev.color, opacity: 0.7 }}>
            {ev.value}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Panel Popover ─────────────────────────────────────────────────────────────

function PanelPopover({
  panel,
  onClose,
}: {
  panel: PanelInfo
  onClose: () => void
}) {
  return (
    <div
      className="absolute inset-0 z-20 rounded-xl flex items-center justify-center p-4"
      style={{ background: "rgba(2,8,23,0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="rounded-xl p-5 max-w-xs w-full"
        style={{
          background: panel.colorBg,
          border: `1px solid ${panel.colorBorder}`,
          boxShadow: `0 0 30px ${panel.colorBg}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-sm" style={{ color: "hsl(0 0% 96%)" }}>
            {panel.label}
          </span>
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded"
            style={{ color: "hsl(240 5% 50%)", background: "rgba(0,0,0,0.3)" }}
          >
            ✕
          </button>
        </div>
        <p className="text-xs leading-relaxed mb-3" style={{ color: "hsl(240 5% 60%)" }}>
          {panel.description}
        </p>
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "hsl(240 5% 40%)" }}>
            CharacterOS Agents
          </span>
          {panel.agents.map((a) => (
            <div key={a} className="flex items-start gap-1.5">
              <span style={{ color: panel.colorHex, fontSize: 10, marginTop: 1 }}>▸</span>
              <span className="text-xs font-mono" style={{ color: "hsl(240 5% 60%)" }}>
                {a}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function StudioLayoutDiagram() {
  const [view, setView] = useState<"desktop" | "mobile">("desktop")
  const [activePanel, setActivePanel] = useState<Panel | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mobileTab, setMobileTab] = useState<Panel>("controls")

  const activePanelInfo = PANELS.find((p) => p.id === activePanel) ?? null

  return (
    <div className="pb-16">
      {/* Page header */}
      <div className="mb-8 pb-6" style={{ borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
        <span
          className="inline-block text-xs font-medium uppercase tracking-widest px-2 py-0.5 rounded mb-4"
          style={{
            color: "hsl(196 100% 67%)",
            background: "rgba(125,211,252,0.08)",
            border: "1px solid rgba(125,211,252,0.14)",
          }}
        >
          Interactive Diagram
        </span>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "hsl(0 0% 98%)", letterSpacing: "-0.025em" }}
        >
          CharacterOS Studio Layout
        </h1>
        <p className="text-sm leading-relaxed max-w-2xl mb-4" style={{ color: "hsl(240 5% 55%)" }}>
          A live wireframe of the CharacterOS Studio interface. Click any panel to see which agents
          power it, or press <strong style={{ color: "hsl(196 100% 67%)" }}>Animate Scene</strong> to
          watch a generation sequence play out in real-time.
        </p>

        {/* Controls bar */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* View toggle */}
          <div
            className="flex rounded-lg overflow-hidden"
            style={{ border: "1px solid rgba(148,163,184,0.14)" }}
          >
            {(["desktop", "mobile"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-4 py-1.5 text-xs font-medium capitalize transition-all"
                style={
                  view === v
                    ? {
                        background: "rgba(125,211,252,0.1)",
                        color: "hsl(196 100% 67%)",
                      }
                    : {
                        background: "transparent",
                        color: "hsl(240 5% 50%)",
                      }
                }
              >
                {v}
              </button>
            ))}
          </div>

          {/* Animate button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
            style={
              isPlaying
                ? {
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "hsl(0 80% 68%)",
                  }
                : {
                    background: "rgba(125,211,252,0.06)",
                    border: "1px solid rgba(125,211,252,0.2)",
                    color: "hsl(196 100% 67%)",
                  }
            }
          >
            {isPlaying ? (
              <>
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "hsl(0 80% 68%)" }}
                />
                Stop
              </>
            ) : (
              <>
                <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor">
                  <path d="M1 1l7 4.5L1 10V1z" />
                </svg>
                Animate Scene
              </>
            )}
          </button>

          <span className="text-xs" style={{ color: "hsl(240 5% 38%)" }}>
            Click a panel for agent details
          </span>
        </div>
      </div>

      {/* ── Desktop layout ────────────────────────────────────────────────────── */}
      {view === "desktop" ? (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(4,9,20,0.9)",
            border: "1px solid rgba(125,211,252,0.12)",
            boxShadow: "0 0 60px rgba(125,211,252,0.05)",
          }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: "1px solid rgba(148,163,184,0.1)", background: "rgba(6,12,28,0.8)" }}
          >
            <div className="flex gap-1.5">
              {["rgba(239,68,68,0.5)", "rgba(251,191,36,0.5)", "rgba(52,211,153,0.5)"].map((c, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <div
              className="flex-1 mx-4 px-3 py-1 rounded text-xs font-mono text-center"
              style={{ background: "rgba(0,0,0,0.3)", color: "hsl(240 5% 45%)", maxWidth: 320, margin: "0 auto" }}
            >
              marvox.ai/projects/alice/characteros/studio
            </div>
          </div>

          {/* App header mock */}
          <div
            className="flex items-center px-4 py-2.5 gap-4"
            style={{ borderBottom: "1px solid rgba(148,163,184,0.08)", background: "rgba(4,9,20,0.7)" }}
          >
            <span className="text-xs font-semibold" style={{ color: "hsl(196 100% 67%)" }}>
              Marvox Studio
            </span>
            <span className="text-xs" style={{ color: "hsl(240 5% 35%)" }}>
              Alice in Wonderland
            </span>
            <div className="ml-auto flex gap-2">
              {["Chat", "Scene", "Audio", "Reader"].map((tab) => (
                <span
                  key={tab}
                  className="text-xs px-2 py-0.5 rounded"
                  style={
                    tab === "Scene"
                      ? { background: "rgba(125,211,252,0.1)", color: "hsl(196 100% 67%)", border: "1px solid rgba(125,211,252,0.2)" }
                      : { color: "hsl(240 5% 40%)" }
                  }
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          {/* 3-column studio layout */}
          <div className="grid" style={{ gridTemplateColumns: "1fr 2fr 1fr", minHeight: 420 }}>
            {/* ── Left: Controls ────────────────────────────── */}
            <div
              className="flex flex-col gap-3 p-4 relative cursor-pointer transition-all duration-200"
              style={{
                borderRight: "1px solid rgba(148,163,184,0.08)",
                background: activePanel === "controls" ? "rgba(167,139,250,0.03)" : "transparent",
              }}
              onClick={() => setActivePanel(activePanel === "controls" ? null : "controls")}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "hsl(265 80% 75%)" }}>
                  Controls
                </span>
                <span className="text-[10px]" style={{ color: "hsl(240 5% 35%)" }}>
                  ↗ click
                </span>
              </div>

              {/* Prompt area */}
              <div
                className="rounded-lg p-2.5"
                style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(148,163,184,0.1)" }}
              >
                <span className="text-[10px] font-mono" style={{ color: "hsl(240 5% 45%)" }}>
                  Scene prompt...
                </span>
                <div
                  className="mt-1.5 w-3/4 h-1.5 rounded"
                  style={{ background: "rgba(265,80%,75%,0.15)" }}
                />
                <div
                  className="mt-1 w-1/2 h-1.5 rounded"
                  style={{ background: "rgba(265,80%,75%,0.08)" }}
                />
              </div>

              {/* Character chips */}
              <div>
                <span className="text-[10px] uppercase tracking-widest" style={{ color: "hsl(240 5% 35%)" }}>
                  Characters
                </span>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {["Alice", "Queen", "Cheshire"].map((c) => (
                    <span
                      key={c}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(167,139,250,0.1)",
                        color: "hsl(265 80% 75%)",
                        border: "1px solid rgba(167,139,250,0.2)",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Director controls */}
              <div>
                <span className="text-[10px] uppercase tracking-widest" style={{ color: "hsl(240 5% 35%)" }}>
                  Director
                </span>
                {[
                  { label: "Mood", value: 0.7 },
                  { label: "Pacing", value: 0.45 },
                  { label: "Tension", value: 0.8 },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-mono w-10" style={{ color: "hsl(240 5% 40%)" }}>
                      {s.label}
                    </span>
                    <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(148,163,184,0.1)" }}>
                      <div
                        className="h-1 rounded-full"
                        style={{
                          width: `${s.value * 100}%`,
                          background: "linear-gradient(90deg, rgba(167,139,250,0.6), rgba(167,139,250,1))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Mode */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono" style={{ color: "hsl(240 5% 40%)" }}>
                  Mode:
                </span>
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                  style={{
                    background: "rgba(125,211,252,0.08)",
                    color: "hsl(196 100% 67%)",
                    border: "1px solid rgba(125,211,252,0.15)",
                  }}
                >
                  CANON+INFER
                </span>
              </div>

              {/* Generate button */}
              <button
                className="mt-auto w-full py-2 rounded-lg text-xs font-semibold"
                style={{
                  background: "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(125,211,252,0.2))",
                  border: "1px solid rgba(167,139,250,0.3)",
                  color: "hsl(265 80% 80%)",
                }}
              >
                Generate Scene
              </button>

              {activePanel === "controls" && activePanelInfo && (
                <PanelPopover panel={activePanelInfo} onClose={() => setActivePanel(null)} />
              )}
            </div>

            {/* ── Center: Live Scene Viewer ─────────────────── */}
            <div
              className="flex flex-col p-4 relative cursor-pointer transition-all duration-200"
              style={{
                borderRight: "1px solid rgba(148,163,184,0.08)",
                background: activePanel === "scene" ? "rgba(125,211,252,0.02)" : "transparent",
              }}
              onClick={() => setActivePanel(activePanel === "scene" ? null : "scene")}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "hsl(196 100% 67%)" }}>
                  Scene — Act II
                </span>
                <div className="flex items-center gap-2">
                  {isPlaying && (
                    <span
                      className="flex items-center gap-1 text-[10px] font-mono animate-pulse"
                      style={{ color: "hsl(160 70% 65%)" }}
                    >
                      <span className="w-1 h-1 rounded-full bg-current" />
                      generating
                    </span>
                  )}
                  <span className="text-[10px]" style={{ color: "hsl(240 5% 35%)" }}>
                    ↗ click
                  </span>
                </div>
              </div>

              {/* Scene text */}
              <div
                className="flex-1 rounded-lg p-4 overflow-auto"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(125,211,252,0.08)",
                  minHeight: 240,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <StreamingScene isPlaying={isPlaying} />
              </div>

              {/* Continuity badge */}
              <div className="flex items-center gap-2 mt-3">
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                  style={{
                    background: "rgba(52,211,153,0.08)",
                    color: "hsl(160 70% 65%)",
                    border: "1px solid rgba(52,211,153,0.15)",
                  }}
                >
                  ✓ Pass 1
                </span>
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                  style={{
                    background: "rgba(52,211,153,0.08)",
                    color: "hsl(160 70% 65%)",
                    border: "1px solid rgba(52,211,153,0.15)",
                  }}
                >
                  ✓ Pass 2
                </span>
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                  style={{
                    background: "rgba(251,191,36,0.08)",
                    color: "hsl(40 90% 68%)",
                    border: "1px solid rgba(251,191,36,0.15)",
                  }}
                >
                  ⚠ Pass 3
                </span>
              </div>

              {activePanel === "scene" && activePanelInfo && (
                <PanelPopover panel={activePanelInfo} onClose={() => setActivePanel(null)} />
              )}
            </div>

            {/* ── Right: Event Log ──────────────────────────── */}
            <div
              className="flex flex-col p-4 relative cursor-pointer transition-all duration-200"
              style={{
                background: activePanel === "events" ? "rgba(251,191,36,0.02)" : "transparent",
              }}
              onClick={() => setActivePanel(activePanel === "events" ? null : "events")}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "hsl(40 90% 68%)" }}>
                  Event Log
                </span>
                <span className="text-[10px]" style={{ color: "hsl(240 5% 35%)" }}>
                  ↗ click
                </span>
              </div>

              {/* Token counter */}
              <div
                className="rounded-lg px-3 py-2 mb-3 flex justify-between items-center"
                style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(148,163,184,0.08)" }}
              >
                <span className="text-[10px] font-mono" style={{ color: "hsl(240 5% 40%)" }}>
                  tokens
                </span>
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: "hsl(40 90% 68%)" }}
                >
                  {isPlaying ? (
                    <CountUp from={0} to={2847} />
                  ) : (
                    "2,847"
                  )}
                </span>
              </div>

              {/* Events */}
              <div
                className="flex-1 rounded-lg p-3 overflow-auto"
                style={{
                  background: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(148,163,184,0.07)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <EventLog isPlaying={isPlaying} />
              </div>

              {/* Character reaction avatars */}
              <div className="flex items-center gap-1.5 mt-3">
                <span className="text-[10px]" style={{ color: "hsl(240 5% 38%)" }}>
                  Reacting:
                </span>
                {["A", "Q", "C"].map((initial, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{
                      background: ["rgba(125,211,252,0.15)", "rgba(330,85%,72%,0.15)", "rgba(160,70%,65%,0.15)"][i],
                      color: ["hsl(196 100% 67%)", "hsl(330 85% 72%)", "hsl(160 70% 65%)"][i],
                      border: `1px solid ${["rgba(125,211,252,0.25)", "rgba(244,114,182,0.25)", "rgba(52,211,153,0.25)"][i]}`,
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>

              {activePanel === "events" && activePanelInfo && (
                <PanelPopover panel={activePanelInfo} onClose={() => setActivePanel(null)} />
              )}
            </div>
          </div>
        </div>
      ) : (
        // ── Mobile layout ──────────────────────────────────────────────────────
        <div
          className="rounded-2xl overflow-hidden mx-auto"
          style={{
            maxWidth: 360,
            background: "rgba(4,9,20,0.9)",
            border: "1px solid rgba(125,211,252,0.12)",
            boxShadow: "0 0 60px rgba(125,211,252,0.05)",
          }}
        >
          {/* Phone notch */}
          <div
            className="flex items-center justify-center py-2"
            style={{ background: "rgba(6,12,28,0.8)", borderBottom: "1px solid rgba(148,163,184,0.08)" }}
          >
            <div className="w-16 h-1 rounded-full" style={{ background: "rgba(148,163,184,0.2)" }} />
          </div>

          {/* App header */}
          <div
            className="flex items-center px-4 py-2.5 gap-3"
            style={{ borderBottom: "1px solid rgba(148,163,184,0.08)" }}
          >
            <span className="text-xs font-semibold" style={{ color: "hsl(196 100% 67%)" }}>
              Studio
            </span>
            <span className="text-xs" style={{ color: "hsl(240 5% 35%)" }}>
              Alice in Wonderland
            </span>
          </div>

          {/* Content area */}
          <div className="p-4" style={{ minHeight: 300 }}>
            {mobileTab === "controls" && (
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "hsl(265 80% 75%)" }}>
                  Controls
                </span>
                <div
                  className="rounded-lg p-3"
                  style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(148,163,184,0.1)" }}
                >
                  <span className="text-[10px] font-mono" style={{ color: "hsl(240 5% 45%)" }}>
                    Scene prompt...
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {["Alice", "Queen", "Cheshire"].map((c) => (
                    <span
                      key={c}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(167,139,250,0.1)",
                        color: "hsl(265 80% 75%)",
                        border: "1px solid rgba(167,139,250,0.2)",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <button
                  className="w-full py-2 rounded-lg text-xs font-semibold"
                  style={{
                    background: "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(125,211,252,0.2))",
                    border: "1px solid rgba(167,139,250,0.3)",
                    color: "hsl(265 80% 80%)",
                  }}
                >
                  Generate Scene
                </button>
              </div>
            )}
            {mobileTab === "scene" && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "hsl(196 100% 67%)" }}>
                  Scene — Act II
                </span>
                <div
                  className="rounded-lg p-3"
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(125,211,252,0.08)" }}
                >
                  <StreamingScene isPlaying={isPlaying} />
                </div>
              </div>
            )}
            {mobileTab === "events" && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "hsl(40 90% 68%)" }}>
                  Event Log
                </span>
                <EventLog isPlaying={isPlaying} />
              </div>
            )}
          </div>

          {/* Bottom tab bar */}
          <div
            className="grid grid-cols-3"
            style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}
          >
            {[
              { id: "controls" as Panel, label: "Controls", color: "hsl(265 80% 75%)" },
              { id: "scene" as Panel, label: "Scene", color: "hsl(196 100% 67%)" },
              { id: "events" as Panel, label: "Events", color: "hsl(40 90% 68%)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMobileTab(tab.id)}
                className="py-3 text-[11px] font-medium transition-colors"
                style={{
                  color: mobileTab === tab.id ? tab.color : "hsl(240 5% 40%)",
                  borderBottom: mobileTab === tab.id ? `2px solid ${tab.color}` : "2px solid transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Caption */}
      <p className="text-xs text-center mt-4" style={{ color: "hsl(240 5% 35%)" }}>
        Interactive wireframe — Desktop shows the 3-panel layout · Mobile shows the tab-based layout
      </p>
    </div>
  )
}

// ── CountUp utility ─────────────────────────────────────────────────────────

function CountUp({ from, to }: { from: number; to: number }) {
  const [val, setVal] = useState(from)
  useEffect(() => {
    let current = from
    const step = Math.ceil((to - from) / 40)
    const t = setInterval(() => {
      current += step
      if (current >= to) {
        setVal(to)
        clearInterval(t)
      } else {
        setVal(current)
      }
    }, 60)
    return () => clearInterval(t)
  }, [from, to])
  return <>{val.toLocaleString()}</>
}
