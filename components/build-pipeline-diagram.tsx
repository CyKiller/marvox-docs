"use client"

import React, { useState } from "react"
import { CheckCircle2, Circle, Clock } from "lucide-react"

type PipelineStage = {
  id: string
  name: string
  title: string
  description: string
  duration: string
  inputs: string[]
  outputs: string[]
  status: "pending" | "running" | "completed" | "error"
}

const stages: PipelineStage[] = [
  {
    id: "upload",
    name: "Upload",
    title: "Manuscript Upload & Validation",
    description:
      "User uploads manuscript (TXT, DOCX, PDF). System validates file size (<100MB), extracts text, and stores in Vercel Blob. Word count and character count computed.",
    duration: "30 seconds",
    inputs: ["Manuscript file"],
    outputs: ["Project ID", "Word count", "Character list (preview)"],
    status: "completed",
  },
  {
    id: "analyze",
    name: "Analyze",
    title: "Character & World Extraction",
    description:
      "Progressive analysis engine extracts characters, relationships, plot points, and world rules. Uses multi-pass LLM analysis with caching. Results stored in PostgreSQL.",
    duration: "2-5 minutes",
    inputs: ["Manuscript text", "Project ID"],
    outputs: ["Character profiles", "Relationship graph", "Canon scope"],
    status: "completed",
  },
  {
    id: "characteros",
    name: "CharacterOS",
    title: "Vector Index & Memory Init",
    description:
      "Initializes CharacterOS runtime. Chunks canon into semantic blocks, computes embeddings (Upstash/ChromaDB), builds RAG index. Initializes memory bridge for character persistence.",
    duration: "1-2 minutes",
    inputs: ["Canonical text", "Character profiles"],
    outputs: ["Vector indices", "Memory tables", "RAG ready"],
    status: "running",
  },
  {
    id: "scene",
    name: "Scene",
    title: "WriterAgent Demo Scene",
    description:
      "Generates optional demo scene with selected characters to verify WriterAgent, continuity validation, and narrator framing work correctly. Used for testing before full handoff.",
    duration: "1-3 minutes",
    inputs: ["2-3 characters"],
    outputs: ["Demo scene", "Continuity report"],
    status: "pending",
  },
  {
    id: "audio",
    name: "Audio",
    title: "Voice Config & TTS Test",
    description:
      "Maps character voices using VoiceSelectionAgent. Configures voice DNA (speed, pitch, emotion). Synthesizes short test audio to verify voice quality before user work.",
    duration: "2-4 minutes",
    inputs: ["Demo scene", "Character traits"],
    outputs: ["Voice configs", "Test audio"],
    status: "pending",
  },
  {
    id: "launch",
    name: "Launch",
    title: "Studio Ready",
    description:
      "Build complete. Project is now ready for user interaction: character chat, scene generation, collaboration, audio workflows. All agents, memory, and RAG systems are live.",
    duration: "30 seconds",
    inputs: ["All previous outputs"],
    outputs: ["Project unlocked"],
    status: "pending",
  },
]

export default function BuildPipelineDiagram() {
  const [expandedStage, setExpandedStage] = useState<string | null>(null)

  const getStatusColor = (status: PipelineStage["status"]) => {
    switch (status) {
      case "completed":
        return "from-emerald-500 to-teal-500"
      case "running":
        return "from-amber-500 to-orange-500"
      case "pending":
        return "from-slate-500 to-slate-600"
      case "error":
        return "from-rose-500 to-red-500"
    }
  }

  const getStatusIcon = (status: PipelineStage["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />
      case "running":
        return <Clock className="w-5 h-5 text-amber-400 animate-spin" />
      case "pending":
        return <Circle className="w-5 h-5 text-slate-500" />
      case "error":
        return <Circle className="w-5 h-5 text-rose-500" />
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h1 className="font-display text-3xl font-semibold text-white mb-2">Build Pipeline</h1>
        <p className="text-slate-400 mb-6">
          The 6-stage project initialization pipeline. Each stage progressively unblocks CharacterOS capabilities, from manuscript upload through studio
          readiness. Most projects complete in 5-15 minutes.
        </p>

        {/* Pipeline Visualization */}
        <div className="mb-8 rounded-lg border border-slate-700 bg-slate-900 p-8 overflow-x-auto">
          <div className="flex items-center justify-between gap-4 min-w-max pb-4">
            {stages.map((stage, idx) => (
              <React.Fragment key={stage.id}>
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      expandedStage === stage.id ? "border-cyan-400 bg-slate-800" : "border-slate-600 bg-slate-800 hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {getStatusIcon(stage.status)}
                      <span className="font-mono text-xs font-bold uppercase text-slate-300">{stage.name}</span>
                    </div>
                    <span className="text-xs text-slate-500">{stage.duration}</span>
                  </button>
                </div>

                {idx < stages.length - 1 && (
                  <div className={`flex-1 h-1 rounded-full bg-gradient-to-r ${getStatusColor(stages[idx + 1].status)} opacity-50 min-w-8`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Stage Details */}
        <div className="space-y-4">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`rounded-lg border transition-all ${
                expandedStage === stage.id
                  ? "border-slate-600 bg-slate-900 shadow-lg shadow-slate-900"
                  : "border-slate-700 bg-slate-950 hover:bg-slate-900 cursor-pointer"
              }`}
              onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
            >
              <div className={`px-6 py-4 flex items-start justify-between border-b border-slate-700`}>
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  {getStatusIcon(stage.status)}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white mb-1">{stage.title}</h3>
                    <p className="text-sm text-slate-400">{stage.duration}</p>
                  </div>
                </div>
                <span className="text-slate-400 flex-shrink-0">{expandedStage === stage.id ? "−" : "+"}</span>
              </div>

              {expandedStage === stage.id && (
                <div className="px-6 py-4 space-y-4 bg-slate-950">
                  <p className="text-sm text-slate-300">{stage.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-300 mb-2 uppercase">Inputs</h4>
                      <ul className="space-y-1">
                        {stage.inputs.map((input) => (
                          <li key={input} className="text-xs text-slate-400 flex items-start gap-2">
                            <span className="text-cyan-400 mt-0.5">▸</span> {input}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-300 mb-2 uppercase">Outputs</h4>
                      <ul className="space-y-1">
                        {stage.outputs.map((output) => (
                          <li key={output} className="text-xs text-slate-400 flex items-start gap-2">
                            <span className="text-emerald-400 mt-0.5">▸</span> {output}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Pipeline Architecture</h2>
        <div className="space-y-4 text-sm text-slate-400">
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">⏳ Status Transitions</h3>
            <p>
              Projects transition through these statuses: <span className="text-slate-300">Upload</span> →{" "}
              <span className="text-slate-300">Analyzing</span> → <span className="text-slate-300">CharacterOS</span> →{" "}
              <span className="text-slate-300">Demo Scene</span> → <span className="text-slate-300">Demo Audio</span> →{" "}
              <span className="text-slate-300">Complete</span>. Users see progress in the dashboard with estimated time remaining.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🔄 Async Jobs</h3>
            <p>
              Each stage is tracked as a background job in PostgreSQL. Polling endpoint: <span className="text-slate-300 font-mono">GET /api/jobs/{"{id}"}</span>. Returns{" "}
              <span className="text-slate-300">status</span>, <span className="text-slate-300">progress_percent</span>,{" "}
              <span className="text-slate-300">eta_seconds</span>. If a job stalls longer than 2 hours, a background scanner marks it failed and sends alert.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">💾 State Persistence</h3>
            <p>
              State at each stage is committed to PostgreSQL (character profiles, embeddings, voice configs). If a stage fails, users can trigger a retry. Retried stages skip
              already-computed data using cache keys. No redundant API calls or reprocessing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🚀 Performance Optimizations</h3>
            <p>
              Stage parallelization is limited (e.g., character extraction uses semaphore to prevent memory exhaustion). Scene and audio stages are optional demos — users
              familiar with the tool can skip them. Caching layer bridges requests across stages: embeddings cached in Upstash, character profiles cached in Redis.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-4">Stage Details</h2>
        <div className="space-y-4 text-sm text-slate-400">
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">📤 Upload (30s)</h3>
            <p>
              Client uploads file up to 100MB via multipart form. Backend validates MIME type, extracts text (python-docx for .docx, PyPDF for .pdf, plain text otherwise).
              File stored in Vercel Blob with unique key. Word/character counts streamed to database immediately, unblocking UI "Corpus" display.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🔍 Analyze (2-5m)</h3>
            <p>
              ProgressiveAnalysisEngine chunks manuscript, runs character extraction with multi-pass LLM prompts, detects relationships, and builds canon snapshot.
              Caching prevents redundant analysis of identical text blocks. Results written to <span className="text-slate-300">characters</span> table with extracted traits, dialogue samples, and canon scope.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🧠 CharacterOS (1-2m)</h3>
            <p>
              AgentRuntime initializes: canon chunks → embeddings via BatchEmbeddingService → vector index (ChromaDB local or Upstash production). MemoryBridge tables
              created. RAG system tested with sample query. This stage blocks character chat and scene generation until complete.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🎬 Scene Demo (1-3m)</h3>
            <p>
              WriterAgent generates 1-2 character demo scene to verify: RAG retrieval works, WriterAgent output is coherent, ContinuityAgent validation passes. Scene
              displayed in dashboard. Good smoke test before handing off to user. Can be skipped by experienced users.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🎙️ Audio Demo (2-4m)</h3>
            <p>
              VoiceSelectionAgent maps characters to voices. VoiceConfigurationAgent applies mood and pacing. Short test audio synthesized and cached. Users hear voice
              quality before generating full audiobooks. Optional stage, frequently skipped.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-300 mb-1">🚀 Launch (30s)</h3>
            <p>
              Project status set to "Complete". All workflows unlocked: character chat, scene generation, collaboration, audio. Nightly reflection scheduler enabled.
              Users can now interact with their storyworld freely. Celebration animation shown in UI.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
