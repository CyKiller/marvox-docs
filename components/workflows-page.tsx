"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Upload, MessageSquare, Clapperboard, Volume2, Moon, Users, KeyRound, Database,
  Workflow, Check, CornerDownRight, Play, Square, ArrowLeft, ArrowRight,
} from "lucide-react"

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

// ── Step type ──────────────────────────────────────────────────────────────────

type WorkflowColor = "cyan" | "purple" | "green" | "amber" | "orange" | "pink" | "teal"

type WorkflowStep = {
  agent: string
  action: string
  note: string
  color: WorkflowColor
  file?: string
  conditional?: boolean
}

// ── Workflow data ──────────────────────────────────────────────────────────────

type Workflow = {
  id: string
  title: string
  subtitle: string
  color: WorkflowColor
  steps: WorkflowStep[]
}

const WORKFLOWS: Workflow[] = [
  {
    id: "build",
    title: "Project Upload & Build",
    subtitle: "From manuscript upload to CharacterOS ready — the full build lifecycle",
    color: "cyan",
    steps: [
      {
        agent: "API layer",
        action: "POST /api/projects",
        note: "Manuscript ingested (DOCX / PDF / TXT up to 100 MB). MAX_UPLOAD_MB validated before reading into memory.",
        color: "cyan",
        file: "backend/project_routes.py",
      },
      {
        agent: "ProgressiveAnalysisEngine",
        action: "analyze(manuscript)",
        note: "Background analysis: characters, plot arcs, themes, and style extracted. Returns job_id immediately; frontend polls GET /api/jobs/{job_id}.",
        color: "cyan",
        file: "services/progressive_analysis_engine.py",
      },
      {
        agent: "CanonIndexer",
        action: "index_manuscript()",
        note: "Story text chunked and embedded via BatchEmbeddingService (the embedding model, 1,536D). Persisted to PostgreSQL pgvector (all environments).",
        color: "cyan",
        file: "services/characteros/canon_indexer.py",
      },
      {
        agent: "AgentRuntime",
        action: "build_character_profiles()",
        note: "CharacterAgent profiles generated per character, memories initialized in MemoryBridge, WorldStateService and StoryGraphService wired.",
        color: "cyan",
        file: "services/characteros/agent_runtime.py",
      },
      {
        agent: "BuildStatusGuard",
        action: "status → complete",
        note: "Project status flips to 'complete'. BuildStatusGuard on the frontend now unlocks all CharacterOS pages (Chat, Scene, Audio, Reader).",
        color: "cyan",
        file: "app/projects/[id]/characteros/",
      },
    ],
  },
  {
    id: "chat",
    title: "Character Chat",
    subtitle: "Canon-grounded character response — mode-aware, RAG-retrieved, memory-persisted",
    color: "purple",
    steps: [
      {
        agent: "Auth middleware",
        action: "verify JWT / API key",
        note: "Bearer token resolved via JWT chain (JWT_SECRET_KEY → SECRET_KEY → AUTH_SECRET). API keys checked against SHA256 hash in api_keys table.",
        color: "purple",
        file: "backend/auth_routes.py",
      },
      {
        agent: "CharacterAgent",
        action: "resolve_mode()",
        note: "Mode selected: CANON (refuse out-of-scope), CANON+INFER (safe inference), BRANCH (creative), or WRITER_ROOM (scene generation). Legacy canon_locked=true maps to CANON.",
        color: "purple",
        file: "services/characteros/character_agent.py",
      },
      {
        agent: "CanonIndexer",
        action: "retrieve(query, mode)",
        note: "Semantic search: embed query → top-K × CHAROS_RETRIEVAL_CANDIDATE_MULTIPLIER (default 20) candidates → rerank → return top CHAROS_RETRIEVAL_DEFAULT_TOP_K (default 5). Chapter/character filters applied in CANON mode.",
        color: "purple",
        file: "services/characteros/canon_indexer.py",
      },
      {
        agent: "ContextHydrationService",
        action: "hydrate(character_id)",
        note: "Injects world state, story graph position, active scene context, and recent memory into the prompt context block.",
        color: "purple",
        file: "services/characteros/context_hydration_service.py",
      },
      {
        agent: "SystemPrompts",
        action: "build_character_agent_system_prompt()",
        note: "Versioned prompt builder (PROMPT_VERSION = '2026-02-19'). RAG_SAFETY_RULE appended to every system prompt that uses retrieved canon text.",
        color: "purple",
        file: "services/characteros/system_prompts.py",
      },
      {
        agent: "InferenceService",
        action: "acreate_completion()",
        note: "Call to the configured language model. Response cached; cost tracked against the usage-warning threshold.",
        color: "purple",
        file: "services/inference_service.py",
      },
      {
        agent: "MemoryBridge",
        action: "save_character_memory()",
        note: "Exchange persisted to character memory store. Memory rows pruned after MEMORY_PRUNE_DAYS (default 90) days.",
        color: "purple",
        file: "services/characteros/memory_bridge.py",
      },
    ],
  },
  {
    id: "scene",
    title: "Scene Generation — 3-Pass Validation",
    subtitle: "WriterAgent → ContinuityAgent × 3 → NarratorAgent — do not collapse the passes",
    color: "green",
    steps: [
      {
        agent: "WriterAgent",
        action: "generate_scene()",
        note: "Multi-character scene draft. DirectorAgent enriches prompt with mood and pacing before the LLM call. Max characters: CHAROS_MAX_SCENE_CHARACTERS (default 5).",
        color: "green",
        file: "services/characteros/writer_agent.py",
      },
      {
        agent: "ContinuityAgent",
        action: "validate() — Pass 1",
        note: "5-layer canon validation: trait consistency, relationship accuracy, timeline coherence, dialogue authenticity, spoiler detection. Fast or full based on CHAROS_CONTINUITY_DETERMINISTIC_FIRST.",
        color: "green",
        file: "services/characteros/continuity_agent.py",
      },
      {
        agent: "WriterAgent",
        action: "revise_scene()",
        note: "Triggered only when Pass 1 severity=high. Maximum 1 revision. If the revision still fails, warnings are surfaced to the caller rather than infinite-looping.",
        color: "amber",
        conditional: true,
        file: "services/characteros/writer_agent.py",
      },
      {
        agent: "ContinuityAgent",
        action: "validate() — Pass 2",
        note: "Final polish — always full validation regardless of Pass 1 outcome. This ensures the revised (or original) scene meets canon standards before narration.",
        color: "green",
        file: "services/characteros/continuity_agent.py",
      },
      {
        agent: "NarratorAgent",
        action: "add_framing()",
        note: "Adds prose framing, scene transitions, atmospheric set-dressing, and act/chapter context. Output is the polished final scene text.",
        color: "purple",
        file: "services/characteros/narrator_agent.py",
      },
      {
        agent: "ContinuityAgent",
        action: "validate() — Pass 3",
        note: "Narrator output check (fast mode, warn-only). Never triggers a revision — narrator output is final. Warnings appended to continuity_warnings in the response.",
        color: "green",
        file: "services/characteros/continuity_agent.py",
      },
      {
        agent: "MemoryBridge",
        action: "save_scene_participation()",
        note: "Each character's participation in the scene is persisted to their memory store for future context retrieval.",
        color: "teal",
        file: "services/characteros/memory_bridge.py",
      },
      {
        agent: "ProjectManager",
        action: "save_scene_generation()",
        note: "Full scene record (text, metadata, continuity_warnings, narration_applied) persisted to PostgreSQL via execute_unified.",
        color: "teal",
        file: "services/project_manager.py",
      },
    ],
  },
  {
    id: "audio",
    title: "Audio Production — 8-Step TTS Pipeline",
    subtitle: "Scene text → multi-voice audio with VoiceVault IP-lock and blob storage",
    color: "amber",
    steps: [
      {
        agent: "AudioSceneAgent",
        action: "parse_dialogue_blocks(scene)",
        note: "Scene text segmented into per-speaker dialogue blocks. Emotion detected per line (neutral, excited, sad, angry, whisper, etc.) for prosody injection.",
        color: "amber",
        file: "services/characteros/audio_scene_agent.py",
      },
      {
        agent: "VoiceSelectionAgent",
        action: "select_voices(characters)",
        note: "Character trait → voice neural DNA mapping from a multi-voice catalog. VoiceVault verifies IP-lock: DNA bound to project/org boundary.",
        color: "amber",
        file: "services/characteros/voice_selection_agent.py",
      },
      {
        agent: "VoiceConfigurationAgent",
        action: "configure_voices()",
        note: "300+ voice configuration profiles. Speed range 0.25×–4.0×. ProsodyPerformanceAgent injects performance directives per emotion.",
        color: "amber",
        file: "services/characteros/voice_configuration_agent.py",
      },
      {
        agent: "TTS Semaphore",
        action: "asyncio.Semaphore(5)",
        note: "Concurrent TTS calls guarded by semaphore(5). Prevents OOM under parallel audio generation. asyncio.gather() over all dialogue blocks.",
        color: "orange",
        file: "services/tts_service.py",
      },
      {
        agent: "Neural TTS",
        action: "generate(block, voice, speed)",
        note: "Neural TTS model per block. Each block returns raw audio bytes. Per-block emotion and SSML-style instructions injected into the voice prompt.",
        color: "amber",
        file: "services/tts_service.py",
      },
      {
        agent: "AudioPipelineOrchestrator",
        action: "compose_scene_audio()",
        note: "pydub mixes individual block audio files into a single scene audio track with configurable silence gaps between speakers.",
        color: "amber",
        file: "services/characteros/audio_pipeline_orchestrator.py",
      },
      {
        agent: "AudioContinuityAgent",
        action: "validate_audio()",
        note: "5-layer audio QA gate: voice consistency, pacing, volume normalization, format validation, and IP-lock verification.",
        color: "amber",
        file: "services/characteros/audio_continuity_agent.py",
      },
      {
        agent: "BlobStorage",
        action: "upload_audio()",
        note: "Final audio stored to Cloud blob (prod) or local files (dev). AUDIO_BLOB_STRICT=true forces hard failure if blob is unhealthy. URL returned to caller.",
        color: "teal",
        file: "services/storage/blob_storage.py",
      },
    ],
  },
  {
    id: "reflection",
    title: "Character Reflection — Nightly Cycle",
    subtitle: "Automatic memory-driven personality arc evolution running at 2 AM UTC",
    color: "orange",
    steps: [
      {
        agent: "Scheduler",
        action: "nightly_reflection_job() — 2:00 AM UTC",
        note: "APScheduler cron triggers reflection for all active characters across all projects. Also triggerable manually via POST /api/characteros/projects/{id}/characters/{id}/reflect.",
        color: "orange",
        file: "main.py",
      },
      {
        agent: "MemoryBridge",
        action: "get_recent_memories(character_id)",
        note: "Fetches N most recent memory entries for the character. If no memories exist, returns REFLECT_NO_MEMORIES error code (non-fatal).",
        color: "orange",
        file: "services/characteros/memory_bridge.py",
      },
      {
        agent: "EmotionalArcEvolverAgent",
        action: "compute_arc_trend(memories)",
        note: "Analyzes memory sequence to determine emotional arc direction: improving, stable, or declining. Used to evolve personality weighting.",
        color: "orange",
        file: "services/characteros/emotional_arc_evolver_agent.py",
      },
      {
        agent: "CharacterAgent",
        action: "generate_reflection_thought()",
        note: "LLM call generates a first-person reflection in the character's voice, grounded in their memories and arc trend. Canon-consistent via system prompt.",
        color: "orange",
        file: "services/characteros/character_agent.py",
      },
      {
        agent: "MemoryBridge",
        action: "save_reflection(character_id, thought)",
        note: "Reflection text saved as a special memory entry. Response includes: reflection text, emotional arc trend, and saved memory ID for audit.",
        color: "orange",
        file: "services/characteros/memory_bridge.py",
      },
    ],
  },
  {
    id: "collab",
    title: "Collaboration Reactions",
    subtitle: "SCENE_COMPLETE WebSocket event → parallel character reactions → broadcast",
    color: "pink",
    steps: [
      {
        agent: "WebSocket layer",
        action: "EVENT: SCENE_COMPLETE",
        note: "Writer publishes a completed scene in the collaboration room. SCENE_COMPLETE event is broadcast to all participants in the collab session.",
        color: "pink",
        file: "backend/collab_routes.py",
      },
      {
        agent: "CharacterParticipantManager",
        action: "trigger_character_reactions(scene, characters)",
        note: "Receives the SCENE_COMPLETE event. Resolves all characters configured as participants in this collaboration session.",
        color: "pink",
        file: "services/characteros/character_participant_manager.py",
      },
      {
        agent: "asyncio.Semaphore(3)",
        action: "parallel reaction gate",
        note: "Max 3 concurrent character reactions. Prevents runaway LLM spend in large collaborations. Each reaction is independent.",
        color: "pink",
        file: "services/characteros/character_participant_manager.py",
      },
      {
        agent: "CharacterAgent",
        action: "chat(mode=WRITER_ROOM) × N",
        note: "Each character reacts to the scene from their own perspective, using the full conversation history for context. Mode is WRITER_ROOM for creative framing.",
        color: "pink",
        file: "services/characteros/character_agent.py",
      },
      {
        agent: "MemoryBridge",
        action: "save_character_memory() [non-blocking]",
        note: "Each reaction is persisted to the character's memory store. Non-blocking — memory failures do not block the reaction from being broadcast.",
        color: "pink",
        file: "services/characteros/memory_bridge.py",
      },
      {
        agent: "WebSocket layer",
        action: "broadcast CHARACTER_REACTION × N",
        note: "Each reaction broadcast to all writers in the collab room as a CHARACTER_REACTION event. EmotionalArcEvolverAgent updates the character's arc from the interaction.",
        color: "pink",
        file: "backend/collab_routes.py",
      },
    ],
  },
  {
    id: "apikey",
    title: "API Key Lifecycle",
    subtitle: "Programmatic access — creation, one-time display, usage tracking, revocation",
    color: "orange",
    steps: [
      {
        agent: "API layer",
        action: "POST /api/billing/api-keys",
        note: "Authenticated user creates an API key. Name and optional expiration provided. Quota check enforced before creation.",
        color: "orange",
        file: "backend/billing_routes.py",
      },
      {
        agent: "Key generation",
        action: "generate + SHA256 hash",
        note: "Raw key returned to caller ONCE (displayed in UI, never stored in plaintext). SHA256 hash stored in api_keys table. Key prefix stored for display (last 4 chars).",
        color: "orange",
        file: "backend/billing_routes.py",
      },
      {
        agent: "Auth middleware",
        action: "Authorization: Bearer <key>",
        note: "API calls use the key as a Bearer token in the Authorization header. Middleware hashes the incoming key and compares against stored SHA256 hash.",
        color: "orange",
        file: "backend/security_middleware.py",
      },
      {
        agent: "api_keys table",
        action: "UPDATE last_used_at",
        note: "Every successful API key authentication updates last_used_at for audit trail. usage_count incremented. Enables detection of unused or compromised keys.",
        color: "orange",
        file: "services/project_manager.py",
      },
      {
        agent: "Expiry check",
        action: "expires_at validation",
        note: "On each request, expiry date is validated. Expired keys return 401. Keys without expiry remain valid until revoked. GET /api/billing/api-keys lists all active keys.",
        color: "orange",
        file: "backend/billing_routes.py",
      },
      {
        agent: "API layer",
        action: "DELETE /api/billing/api-keys/{key_id}",
        note: "Soft-delete: key marked inactive, never physically removed from the database. Historical audit trail (last_used_at, usage_count) preserved. Cannot be re-activated.",
        color: "orange",
        file: "backend/billing_routes.py",
      },
    ],
  },
  {
    id: "rag",
    title: "RAG Retrieval Pipeline",
    subtitle: "From raw query to safe, canon-grounded context block for LLM prompts",
    color: "teal",
    steps: [
      {
        agent: "CanonIndexer",
        action: "retrieve(query, mode, filters)",
        note: "Entry point for all RAG calls. Mode-aware: CANON mode applies chapter/character_id filters. CANON+INFER uses broad retrieval with no chapter filter.",
        color: "teal",
        file: "services/characteros/canon_indexer.py",
      },
      {
        agent: "BatchEmbeddingService",
        action: "embed_batch([query])",
        note: "Query embedded via the embedding model (1,536D). Calls are batched and cached, never embedded one-by-one. Cache hit rate typically 60-80% for repeated queries.",
        color: "teal",
        file: "services/batch_embedding_service.py",
      },
      {
        agent: "VectorDB",
        action: "search(embedding, top_k × multiplier)",
        note: "Over-fetches by CHAROS_RETRIEVAL_CANDIDATE_MULTIPLIER (default 20) before rerank. Returns candidate chunks from PostgreSQL pgvector (all environments).",
        color: "teal",
        file: "services/vector_db_service.py",
      },
      {
        agent: "Reranker",
        action: "rerank(candidates) → top_k",
        note: "Candidates re-scored by relevance and canon scope. Top CHAROS_RETRIEVAL_DEFAULT_TOP_K (default 5) results selected. Spoiler-aware filtering applied in CANON mode.",
        color: "teal",
        file: "services/characteros/canon_indexer.py",
      },
      {
        agent: "agent_contracts",
        action: "validate_retrieved_chunks(raw)",
        note: "Raw VectorDB results normalized to typed RetrievedChunk objects. CHAROS_STRICT_CONTRACTS=1 enforces validation and fails hard on malformed chunks.",
        color: "teal",
        file: "services/characteros/agent_contracts.py",
      },
      {
        agent: "prompt_safety",
        action: "sanitize_story_excerpts(chunks)",
        note: "Each chunk wrapped with canonical excerpt markers. Prevents injection attacks where story text contains instruction-like patterns.",
        color: "teal",
        file: "services/characteros/prompt_safety.py",
      },
      {
        agent: "SystemPrompts",
        action: "append RAG_SAFETY_RULE",
        note: "RAG_SAFETY_RULE appended to every system prompt that uses retrieved text. Non-negotiable contract — no agent may ingest retrieved canon without this rule.",
        color: "teal",
        file: "services/characteros/prompt_safety.py",
      },
    ],
  },
]

// ── Workflow icons ──────────────────────────────────────────────────────────────

const WF_ICONS: Record<string, React.ElementType> = {
  build: Upload,
  chat: MessageSquare,
  scene: Clapperboard,
  audio: Volume2,
  reflection: Moon,
  collab: Users,
  apikey: KeyRound,
  rag: Database,
}

// ── PipelineNode ──────────────────────────────────────────────────────────────

function PipelineNode({
  step,
  index,
  total,
  isActive,
  isDone,
  onClick,
}: {
  step: WorkflowStep
  index: number
  total: number
  isActive: boolean
  isDone: boolean
  onClick: () => void
}) {
  const isLast = index === total - 1

  return (
    <div className="flex gap-3 items-stretch">
      {/* Rail node + connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono font-semibold transition-all duration-300"
          style={{
            background: isActive
              ? "rgba(125,211,252,0.16)"
              : isDone
                ? "rgba(125,211,252,0.08)"
                : "rgba(148,163,184,0.05)",
            border: `1px solid ${
              isActive ? "rgba(125,211,252,0.5)" : isDone ? "rgba(125,211,252,0.25)" : "rgba(148,163,184,0.14)"
            }`,
            color: isActive || isDone ? "hsl(196 100% 72%)" : "hsl(240 5% 45%)",
            boxShadow: isActive ? "0 0 14px rgba(125,211,252,0.35)" : undefined,
            transform: isActive ? "scale(1.08)" : "scale(1)",
          }}
        >
          {isDone && !isActive ? <Check className="w-3.5 h-3.5" /> : String(index + 1).padStart(2, "0")}
        </div>
        {!isLast && (
          <div
            className="w-px flex-1 my-1 transition-all duration-300"
            style={{
              minHeight: "18px",
              background: isDone ? "rgba(125,211,252,0.3)" : "rgba(148,163,184,0.12)",
            }}
          />
        )}
      </div>

      {/* Content card */}
      <button
        onClick={onClick}
        className="flex-1 min-w-0 text-left rounded-lg px-4 py-3 mb-2 transition-all duration-200"
        style={{
          background: isActive ? "rgba(125,211,252,0.05)" : "rgba(6,12,28,0.5)",
          border: `1px solid ${isActive ? "rgba(125,211,252,0.25)" : "rgba(148,163,184,0.08)"}`,
          boxShadow: isActive ? "0 0 18px rgba(125,211,252,0.10)" : undefined,
        }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="font-mono text-xs font-semibold"
            style={{ color: isActive ? "hsl(196 100% 72%)" : "hsl(196 55% 62%)" }}
          >
            {step.agent}
          </span>
          <span
            className="font-mono text-[11px] px-2 py-0.5 rounded"
            style={{
              background: "rgba(0,0,0,0.3)",
              color: "hsl(0 0% 66%)",
              border: "1px solid rgba(148,163,184,0.1)",
            }}
          >
            .{step.action}
          </span>
          {step.conditional && (
            <span
              className="text-[10px] font-semibold font-mono px-1.5 py-0.5 rounded-full"
              style={{
                background: "rgba(251,191,36,0.1)",
                color: "hsl(40 90% 68%)",
                border: "1px solid rgba(251,191,36,0.2)",
              }}
            >
              conditional
            </span>
          )}
        </div>
        {isActive && (
          <>
            <p className="text-xs leading-relaxed mt-2" style={{ color: "hsl(240 5% 70%)" }}>
              {step.note}
            </p>
            {step.file && (
              <div
                className="mt-2 pt-2 flex items-center gap-1.5"
                style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}
              >
                <CornerDownRight className="w-3 h-3" style={{ color: "hsl(240 5% 38%)" }} />
                <code className="text-[11px] font-mono" style={{ color: "hsl(196 100% 70%)", opacity: 0.75 }}>
                  {step.file}
                </code>
              </div>
            )}
          </>
        )}
      </button>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function WorkflowsPage() {
  const [activeId, setActiveId] = useState<string>("build")
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [isWalking, setIsWalking] = useState(false)
  const walkRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const wf = WORKFLOWS.find((w) => w.id === activeId) ?? WORKFLOWS[0]

  function stopWalk() {
    setIsWalking(false)
    if (walkRef.current) {
      clearInterval(walkRef.current)
      walkRef.current = null
    }
  }

  function startWalk() {
    stopWalk()
    setIsWalking(true)
    setActiveStep(0)
    let s = 0
    walkRef.current = setInterval(() => {
      s++
      if (s >= wf.steps.length) {
        stopWalk()
        return
      }
      setActiveStep(s)
    }, 1500)
  }

  function selectWorkflow(id: string) {
    stopWalk()
    setActiveId(id)
    setActiveStep(null)
  }

  function clickStep(i: number) {
    stopWalk()
    setActiveStep(activeStep === i ? null : i)
  }

  useEffect(() => () => {
    if (walkRef.current) clearInterval(walkRef.current)
  }, [])

  const progress = activeStep === null ? 0 : ((activeStep + 1) / wf.steps.length) * 100

  return (
    <div className="pb-16">
      {/* Page header */}
      <div className="mb-8 pb-6" style={{ borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
        <SectionBadge>Production Workflows</SectionBadge>
        <h1 className="display-section text-white mb-2">CharacterOS workflows</h1>
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "hsl(240 5% 58%)" }}>
          Eight production runtime paths, from manuscript upload to audio. Pick a flow, then walk
          each step. Click a node to inspect its implementation, or press{" "}
          <span style={{ color: "hsl(196 100% 67%)" }}>Walk through</span> to animate the sequence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[248px_1fr] gap-6">
        {/* ── Stage rail ── */}
        <nav className="md:sticky md:top-2 self-start">
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 -mx-1 px-1">
            {WORKFLOWS.map((w) => {
              const Icon = WF_ICONS[w.id] ?? Workflow
              const active = w.id === activeId
              return (
                <button
                  key={w.id}
                  onClick={() => selectWorkflow(w.id)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left transition-all duration-200 flex-shrink-0 md:w-full"
                  style={{
                    background: active ? "rgba(125,211,252,0.08)" : "rgba(6,12,28,0.4)",
                    border: `1px solid ${active ? "rgba(125,211,252,0.25)" : "rgba(148,163,184,0.08)"}`,
                    boxShadow: active ? "inset 2px 0 0 hsl(196 100% 67%)" : undefined,
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: active ? "rgba(125,211,252,0.12)" : "rgba(148,163,184,0.05)",
                      border: `1px solid ${active ? "rgba(125,211,252,0.2)" : "rgba(148,163,184,0.1)"}`,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: active ? "hsl(196 100% 72%)" : "hsl(240 5% 55%)" }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold truncate" style={{ color: active ? "hsl(0 0% 96%)" : "hsl(0 0% 72%)" }}>
                      {w.title}
                    </div>
                    <div className="text-[10px]" style={{ color: "hsl(240 5% 45%)" }}>{w.steps.length} steps</div>
                  </div>
                </button>
              )
            })}
          </div>
        </nav>

        {/* ── Stage ── */}
        <div className="min-w-0">
          {/* Stage header + controls */}
          <div className="marvox-panel rounded-xl p-5 mb-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-white">{wf.title}</h2>
                <p className="text-xs mt-1 leading-relaxed max-w-xl" style={{ color: "hsl(240 5% 55%)" }}>
                  {wf.subtitle}
                </p>
              </div>
              <button
                onClick={isWalking ? stopWalk : startWalk}
                className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg transition-all flex-shrink-0"
                style={
                  isWalking
                    ? { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "hsl(0 80% 70%)" }
                    : { background: "rgba(125,211,252,0.1)", border: "1px solid rgba(125,211,252,0.25)", color: "hsl(196 100% 72%)" }
                }
              >
                {isWalking ? (
                  <>
                    <Square className="w-3 h-3 fill-current" /> Stop
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" /> Walk through
                  </>
                )}
              </button>
            </div>
            {/* Progress */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(148,163,184,0.12)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: "linear-gradient(90deg, hsl(196 100% 58%), hsl(196 100% 74%))" }}
                />
              </div>
              <span className="text-[11px] font-mono flex-shrink-0" style={{ color: "hsl(240 5% 50%)" }}>
                {activeStep === null ? `0 / ${wf.steps.length}` : `${activeStep + 1} / ${wf.steps.length}`}
              </span>
            </div>
          </div>

          {/* Pipeline */}
          <div className="pt-1">
            {wf.steps.map((step, i) => (
              <PipelineNode
                key={`${wf.id}-${i}`}
                step={step}
                index={i}
                total={wf.steps.length}
                isActive={activeStep === i}
                isDone={activeStep !== null && i < activeStep}
                onClick={() => clickStep(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="mt-12 flex flex-wrap gap-5">
        <Link href="/architecture" className="text-sm flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Architecture overview
        </Link>
        <Link href="/agents" className="text-sm flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors">
          Agent network reference <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
