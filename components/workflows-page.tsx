"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"

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

// ── Color map ──────────────────────────────────────────────────────────────────

type WorkflowColor = "cyan" | "purple" | "green" | "amber" | "orange" | "pink" | "teal"

const COLOR_MAP: Record<WorkflowColor, { hex: string; bg: string; border: string; glow: string }> = {
  cyan: {
    hex: "hsl(196 100% 67%)",
    bg: "rgba(125,211,252,0.06)",
    border: "rgba(125,211,252,0.18)",
    glow: "rgba(125,211,252,0.25)",
  },
  purple: {
    hex: "hsl(265 80% 75%)",
    bg: "rgba(167,139,250,0.06)",
    border: "rgba(167,139,250,0.18)",
    glow: "rgba(167,139,250,0.25)",
  },
  green: {
    hex: "hsl(160 70% 65%)",
    bg: "rgba(52,211,153,0.06)",
    border: "rgba(52,211,153,0.18)",
    glow: "rgba(52,211,153,0.25)",
  },
  amber: {
    hex: "hsl(40 90% 68%)",
    bg: "rgba(251,191,36,0.06)",
    border: "rgba(251,191,36,0.18)",
    glow: "rgba(251,191,36,0.25)",
  },
  orange: {
    hex: "hsl(25 95% 65%)",
    bg: "rgba(251,146,60,0.06)",
    border: "rgba(251,146,60,0.18)",
    glow: "rgba(251,146,60,0.25)",
  },
  pink: {
    hex: "hsl(330 85% 72%)",
    bg: "rgba(244,114,182,0.06)",
    border: "rgba(244,114,182,0.18)",
    glow: "rgba(244,114,182,0.25)",
  },
  teal: {
    hex: "hsl(174 72% 60%)",
    bg: "rgba(45,212,191,0.06)",
    border: "rgba(45,212,191,0.18)",
    glow: "rgba(45,212,191,0.25)",
  },
}

// ── Step type ──────────────────────────────────────────────────────────────────

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
        note: "Story text chunked and embedded via BatchEmbeddingService (all-MiniLM-L6-v2, 384D). Persisted to Upstash Vector (prod) or ChromaDB (dev).",
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
        agent: "OpenAIService",
        action: "acreate_completion()",
        note: "LLM call to gpt-4o-mini (OPENAI_MODEL_NAME). Response cached; cost tracked for OPENAI_API_USAGE_WARNING_THRESHOLD.",
        color: "purple",
        file: "services/openai_service.py",
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
        note: "Character trait → voice neural DNA mapping. 13 OpenAI TTS voices available. VoiceVault verifies IP-lock: DNA bound to project/org boundary.",
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
        file: "services/openai_tts_service.py",
      },
      {
        agent: "OpenAI TTS",
        action: "generate(block, voice, speed)",
        note: "gpt-4o-mini-tts model per block. Each block returns raw audio bytes. Per-block emotion and SSML-style instructions injected into the voice prompt.",
        color: "amber",
        file: "services/openai_tts_service.py",
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
        note: "Final audio stored to Vercel Blob (prod) or local files (dev). AUDIO_BLOB_STRICT=true forces hard failure if blob is unhealthy. URL returned to caller.",
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
        note: "Query embedded via all-MiniLM-L6-v2 (384D). Calls are batched and cached — never embed one-by-one. Cache hit rate typically 60–80% for repeated queries.",
        color: "teal",
        file: "services/batch_embedding_service.py",
      },
      {
        agent: "VectorDB",
        action: "search(embedding, top_k × multiplier)",
        note: "Over-fetches by CHAROS_RETRIEVAL_CANDIDATE_MULTIPLIER (default 20) before rerank. Returns candidate chunks from Upstash Vector (prod) or ChromaDB (dev).",
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

// ── StepCard ──────────────────────────────────────────────────────────────────

function StepCard({
  step,
  index,
  isLast,
  isActive,
  onClick,
}: {
  step: WorkflowStep
  index: number
  isLast: boolean
  isActive: boolean
  onClick: () => void
}) {
  const c = COLOR_MAP[step.color]
  const stepColor = COLOR_MAP[step.color]

  return (
    <div className="flex gap-3 items-start">
      {/* Timeline */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300"
          style={{
            background: isActive ? stepColor.hex : `${stepColor.hex}55`,
            boxShadow: isActive ? `0 0 8px ${stepColor.glow}` : undefined,
            transform: isActive ? "scale(1.3)" : "scale(1)",
          }}
        />
        {!isLast && (
          <div
            className="w-px flex-1 mt-1 transition-all duration-300"
            style={{
              background: isActive ? `${stepColor.hex}50` : "rgba(148,163,184,0.12)",
              minHeight: "24px",
            }}
          />
        )}
      </div>

      {/* Content card */}
      <button
        onClick={onClick}
        className="flex-1 rounded-lg px-4 py-3 mb-1 text-left transition-all duration-200 cursor-pointer"
        style={{
          background: isActive ? `${c.bg}` : "rgba(6,12,28,0.6)",
          border: isActive
            ? `1px solid ${c.border}`
            : "1px solid rgba(148,163,184,0.08)",
          boxShadow: isActive ? `0 0 12px ${c.glow}30` : undefined,
        }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span
            className="font-mono text-xs font-bold transition-colors"
            style={{ color: isActive ? c.hex : `${c.hex}88` }}
          >
            {step.agent}
          </span>
          <span
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{
              background: "rgba(0,0,0,0.3)",
              color: isActive ? "hsl(0 0% 80%)" : "hsl(0 0% 50%)",
              border: "1px solid rgba(148,163,184,0.1)",
            }}
          >
            .{step.action}
          </span>
          <span
            className="font-mono text-xs font-medium px-1.5 py-0.5 rounded"
            style={{
              background: "rgba(0,0,0,0.2)",
              color: "hsl(240 5% 40%)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {step.conditional && (
            <span
              className="text-xs font-semibold font-mono px-2 py-0.5 rounded-full"
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
        <p
          className="text-xs leading-relaxed transition-colors"
          style={{ color: isActive ? "hsl(240 5% 68%)" : "hsl(240 5% 45%)" }}
        >
          {step.note}
        </p>
        {isActive && step.file && (
          <div
            className="mt-2 pt-2 flex items-center gap-1.5"
            style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}
          >
            <span className="text-xs" style={{ color: "hsl(240 5% 38%)" }}>
              ↳
            </span>
            <code
              className="text-xs font-mono"
              style={{ color: c.hex, opacity: 0.7 }}
            >
              {step.file}
            </code>
          </div>
        )}
      </button>
    </div>
  )
}

// ── WorkflowStepper ───────────────────────────────────────────────────────────

function WorkflowStepper({
  steps,
  isWalking,
  activeStep,
  onStepClick,
}: {
  steps: WorkflowStep[]
  isWalking: boolean
  activeStep: number | null
  onStepClick: (i: number) => void
}) {
  return (
    <div className="space-y-0 pt-1">
      {steps.map((step, i) => (
        <StepCard
          key={i}
          step={step}
          index={i}
          isLast={i === steps.length - 1}
          isActive={activeStep === i}
          onClick={() => onStepClick(i)}
        />
      ))}
    </div>
  )
}

// ── WorkflowAccordion ─────────────────────────────────────────────────────────

function WorkflowAccordion({
  workflow,
  isOpen,
  onToggle,
}: {
  workflow: Workflow
  isOpen: boolean
  onToggle: () => void
}) {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [isWalking, setIsWalking] = useState(false)
  const walkRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const c = COLOR_MAP[workflow.color]

  // Stop walk-through when accordion closes
  useEffect(() => {
    if (!isOpen) {
      stopWalk()
    }
  }, [isOpen])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (walkRef.current) clearInterval(walkRef.current)
    }
  }, [])

  function startWalk() {
    setIsWalking(true)
    setActiveStep(0)
    if (walkRef.current) clearInterval(walkRef.current)
    let step = 0
    walkRef.current = setInterval(() => {
      step++
      if (step >= workflow.steps.length) {
        stopWalk()
        return
      }
      setActiveStep(step)
    }, 1400)
  }

  function stopWalk() {
    setIsWalking(false)
    if (walkRef.current) {
      clearInterval(walkRef.current)
      walkRef.current = null
    }
    setActiveStep(null)
  }

  function handleStepClick(i: number) {
    if (isWalking) stopWalk()
    setActiveStep(activeStep === i ? null : i)
  }

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: isOpen ? "rgba(6,12,28,0.8)" : "rgba(6,12,28,0.5)",
        border: isOpen
          ? `1px solid ${c.border}`
          : "1px solid rgba(148,163,184,0.1)",
        boxShadow: isOpen ? `0 0 20px ${c.glow}20` : undefined,
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors"
        style={{ cursor: "pointer" }}
      >
        {/* Color dot */}
        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{
            background: c.hex,
            boxShadow: isOpen ? `0 0 8px ${c.glow}` : undefined,
          }}
        />

        {/* Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className="font-semibold text-sm leading-tight"
              style={{ color: isOpen ? "hsl(0 0% 96%)" : "hsl(0 0% 70%)" }}
            >
              {workflow.title}
            </span>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: `${c.bg}`,
                color: c.hex,
                border: `1px solid ${c.border}`,
              }}
            >
              {workflow.steps.length} steps
            </span>
          </div>
          {isOpen && (
            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "hsl(240 5% 50%)" }}>
              {workflow.subtitle}
            </p>
          )}
        </div>

        {/* Chevron */}
        <svg
          className="flex-shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", color: "hsl(240 5% 40%)" }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Body */}
      {isOpen && (
        <div style={{ borderTop: `1px solid ${c.border}40` }}>
          {/* Walk Through controls */}
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderBottom: "1px solid rgba(148,163,184,0.07)" }}
          >
            <span className="text-xs" style={{ color: "hsl(240 5% 40%)" }}>
              Click any step to inspect · or use Walk Through
            </span>
            <button
              onClick={isWalking ? stopWalk : startWalk}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
              style={
                isWalking
                  ? {
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "hsl(0 80% 68%)",
                    }
                  : {
                      background: c.bg,
                      border: `1px solid ${c.border}`,
                      color: c.hex,
                    }
              }
            >
              {isWalking ? (
                <>
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: "hsl(0 80% 68%)" }}
                  />
                  Stop
                </>
              ) : (
                <>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                    <path d="M1 1l8 5-8 5V1z" />
                  </svg>
                  Walk Through
                </>
              )}
            </button>
          </div>

          {/* Steps */}
          <div className="px-5 py-4">
            <WorkflowStepper
              steps={workflow.steps}
              isWalking={isWalking}
              activeStep={activeStep}
              onStepClick={handleStepClick}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function WorkflowsPage() {
  const [openId, setOpenId] = useState<string>("build")

  function toggle(id: string) {
    setOpenId(openId === id ? "" : id)
  }

  return (
    <div className="pb-16">
      {/* Page header */}
      <div className="mb-8 pb-6" style={{ borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
        <SectionBadge>Production Workflows</SectionBadge>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "hsl(0 0% 98%)", letterSpacing: "-0.025em" }}
        >
          CharacterOS Workflows
        </h1>
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "hsl(240 5% 55%)" }}>
          8 interactive flow references covering every production runtime path — from manuscript
          upload to audio generation. Click any step to inspect the implementation, or use
          <strong style={{ color: "hsl(196 100% 67%)" }}> Walk Through</strong> to animate the full
          sequence.
        </p>
      </div>

      {/* Legend */}
      <div
        className="rounded-xl px-5 py-4 mb-8 flex flex-wrap gap-x-6 gap-y-2"
        style={{
          background: "rgba(6,12,28,0.5)",
          border: "1px solid rgba(148,163,184,0.08)",
        }}
      >
        <span className="text-xs font-medium" style={{ color: "hsl(240 5% 40%)" }}>
          Color coding:
        </span>
        {[
          { color: "cyan" as const, label: "Data Ingestion" },
          { color: "purple" as const, label: "LLM / Character" },
          { color: "green" as const, label: "Continuity / QA" },
          { color: "amber" as const, label: "Audio / TTS" },
          { color: "orange" as const, label: "Lifecycle / Auth" },
          { color: "pink" as const, label: "Collaboration" },
          { color: "teal" as const, label: "Storage / RAG" },
        ].map(({ color, label }) => (
          <div key={color} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: COLOR_MAP[color].hex }}
            />
            <span className="text-xs" style={{ color: "hsl(240 5% 55%)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Workflow list */}
      <div className="space-y-3">
        {WORKFLOWS.map((wf) => (
          <WorkflowAccordion
            key={wf.id}
            workflow={wf}
            isOpen={openId === wf.id}
            onToggle={() => toggle(wf.id)}
          />
        ))}
      </div>

      {/* Footer link */}
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/architecture"
          className="text-sm flex items-center gap-1.5 transition-colors"
          style={{ color: "hsl(196 100% 67%)", opacity: 0.8 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 7H3M6 4l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Architecture overview
        </Link>
        <Link
          href="/agents"
          className="text-sm flex items-center gap-1.5 transition-colors"
          style={{ color: "hsl(265 80% 75%)", opacity: 0.8 }}
        >
          Agent network reference
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
