"use client"

import { useState } from "react"
import {
  Key,
  Layers,
  Mic,
  Cpu,
  Activity,
  CreditCard,
  Shield,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Bot,
  Store,
  FileAudio,
  LineChart,
  Users,
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
type Method = "GET" | "POST" | "PATCH" | "DELETE" | "PUT"

interface Endpoint {
  method: Method
  path: string
  summary: string
  auth: boolean
  description?: string
  curl: string
  responseNote?: string
  highlight?: boolean
}

interface ApiGroup {
  id: string
  label: string
  icon: React.ElementType
  color: string
  borderColor: string
  endpoints: Endpoint[]
}

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const API_GROUPS: ApiGroup[] = [
  /* ── Authentication ── */
  {
    id: "auth",
    label: "Authentication",
    icon: Shield,
    color: "#7dd3fc",
    borderColor: "rgba(125,211,252,0.18)",
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/register",
        summary: "Register a new account",
        auth: false,
        description: "Registers a new user profile using PostgreSQL relational storage. Returns a JWT access token immediately.",
        curl: `curl -X POST "https://your-domain/api/auth/register" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"you@example.com","password":"p@ssword","name":"You"}'`,
        responseNote: "AuthResponse — includes JWT access_token and user payload",
      },
      {
        method: "POST",
        path: "/api/auth/login",
        summary: "Login with email + password",
        auth: false,
        curl: `curl -X POST "https://your-domain/api/auth/login" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"you@example.com","password":"p@ssword"}'`,
        responseNote: "AuthResponse — access_token + user object",
      },
      {
        method: "POST",
        path: "/api/auth/demo-login",
        summary: "Demo login (no credentials required)",
        auth: false,
        description: "Instantly provisions a temporary demo session. Restricted to demo-safe actions.",
        curl: `curl -X POST "https://your-domain/api/auth/demo-login" \\
  -H "Content-Type: application/json"`,
      },
      {
        method: "GET",
        path: "/api/auth/me",
        summary: "Get current user info",
        auth: true,
        curl: `curl "https://your-domain/api/auth/me" \\
  -H "Authorization: Bearer <token>"`,
      },
      {
        method: "DELETE",
        path: "/api/auth/me",
        summary: "Delete account and owned projects",
        auth: true,
        curl: `curl -X DELETE "https://your-domain/api/auth/me" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"confirm":true}'`,
      },
      {
        method: "POST",
        path: "/api/auth/logout",
        summary: "Invalidate current session",
        auth: true,
        curl: `curl -X POST "https://your-domain/api/auth/logout" \\
  -H "Authorization: Bearer <token>"`,
      },
    ],
  },

  /* ── Robotics Persona API ── */
  {
    id: "robotics",
    label: "Robotics Persona API",
    icon: Bot,
    color: "#7dd3fc",
    borderColor: "rgba(125,211,252,0.18)",
    endpoints: [
      {
        method: "POST",
        path: "/api/v2/personas/{character_id}/execute",
        summary: "Execute robotic task with persona",
        auth: true,
        description: "Enables external hardware, robotics, and agents to invoke a character persona for independent tasks. Uses X-Marvox-API-Key authorization header.",
        curl: `curl -X POST "https://your-domain/api/v2/personas/alice/execute" \\
  -H "X-Marvox-API-Key: mrvx_your_active_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "task": "Navigate to the charging station.",
    "project_id": "proj-abc",
    "skill_context": {"location": "living-room"}
  }'`,
        responseNote: "PersonaExecuteResponse — status, task response, voice guidance parameters, and post-interaction emotional state metrics",
      },
      {
        method: "GET",
        path: "/api/v2/personas/{character_id}",
        summary: "Retrieve persona profile details",
        auth: true,
        description: "Returns robotics-optimized character parameters, including behavior policies, voice bindings, traits, and evolution stats.",
        curl: `curl "https://your-domain/api/v2/personas/alice" \\
  -H "X-Marvox-API-Key: mrvx_your_active_key"`,
        responseNote: "PersonaProfile — specialized config for downstream systems",
      },
      {
        method: "PATCH",
        path: "/api/v2/personas/{character_id}/behavior",
        summary: "Update behavior policy guidelines",
        auth: true,
        description: "Alters robotics behavior policies without modifying the character's core literary canon facts.",
        curl: `curl -X PATCH "https://your-domain/api/v2/personas/alice/behavior" \\
  -H "X-Marvox-API-Key: mrvx_your_active_key" \\
  -H "Content-Type: application/json" \\
  -d '{"behavior_policies": {"safety_threshold": 0.9, "humor_inhibit": true}}'`,
      },
      {
        method: "GET",
        path: "/api/v2/personas/group/{group_id}/consensus-state",
        summary: "Retrieve fleet group consensus state",
        auth: true,
        description: "Aggregates behavioral and vocal metrics across multiple active personas sharing a fleet group ID. Excellent for fleet synchronization.",
        curl: `curl "https://your-domain/api/v2/personas/group/fleet-alpha/consensus-state" \\
  -H "X-Marvox-API-Key: mrvx_your_active_key"`,
        responseNote: "FleetConsensusState — average empathy, humor, dominant tones, and member list",
      },
    ],
  },

  /* ── Character App Store ── */
  {
    id: "appstore",
    label: "Character App Store",
    icon: Store,
    color: "#7dd3fc",
    borderColor: "rgba(125,211,252,0.18)",
    endpoints: [
      {
        method: "GET",
        path: "/api/v2/templates",
        summary: "List pre-built character templates",
        auth: true,
        description: "Retrieves ready-made template assets from the commercial App Store directory. Can filter by category or tags.",
        curl: `curl "https://your-domain/api/v2/templates?category=assistant" \\
  -H "X-Marvox-API-Key: mrvx_your_active_key"`,
      },
      {
        method: "GET",
        path: "/api/v2/templates/{template_id}",
        summary: "Get a single template configuration",
        auth: true,
        curl: `curl "https://your-domain/api/v2/templates/temp-wizard" \\
  -H "X-Marvox-API-Key: mrvx_your_active_key"`,
        responseNote: "CharacterTemplateResponse — full traits, speech models, and default voice bindings",
      },
      {
        method: "POST",
        path: "/api/v2/personas/from-template/{template_id}",
        summary: "Instantiate a persona from a template",
        auth: true,
        description: "Instantiates a new active character persona immediately inside a project using prebuilt properties.",
        curl: `curl -X POST "https://your-domain/api/v2/personas/from-template/temp-wizard" \\
  -H "X-Marvox-API-Key: mrvx_your_active_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "character_name": "Merlin",
    "project_id": "proj-abc",
    "overrides": {"humor_level": 0.8}
  }'`,
        responseNote: "PersonaFromTemplateResponse — instant active character profile",
      },
    ],
  },

  /* ── Audiobook Production ── */
  {
    id: "audiobook",
    label: "Audiobook Production",
    icon: FileAudio,
    color: "#7dd3fc",
    borderColor: "rgba(125,211,252,0.18)",
    endpoints: [
      {
        method: "GET",
        path: "/api/audiobook/manifest/{project_id}",
        summary: "Retrieve audiobook production manifest",
        auth: true,
        description: "Retrieves metadata, chapter breaks, character maps, and rendering parameters for audiobook compilation.",
        curl: `curl "https://your-domain/api/audiobook/manifest/proj-abc" \\
  -H "Authorization: Bearer <token>"`,
      },
      {
        method: "POST",
        path: "/api/audiobook/produce/{project_id}/{chapter_number}",
        summary: "Synthesize chapter audiobook stream",
        auth: true,
        description: "Queues a background synthesis job rendering every dialogue line of a specific chapter with character voice matches. Returns a job ID.",
        curl: `curl -X POST "https://your-domain/api/audiobook/produce/proj-abc/1" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "{ job_id } — poll GET /api/jobs/{job_id} to track render progress",
      },
      {
        method: "POST",
        path: "/api/audiobook/export/{project_id}",
        summary: "Export fully compiled audiobook chapter assets",
        auth: true,
        description: "Gathers all successfully synthesized chapter streams and exports a bundled package.",
        curl: `curl -X POST "https://your-domain/api/audiobook/export/proj-abc" \\
  -H "Authorization: Bearer <token>"`,
      },
    ],
  },

  /* ── Advanced Storyworld Analysis ── */
  {
    id: "advancedanalysis",
    label: "Advanced Storyworld Analysis",
    icon: LineChart,
    color: "#7dd3fc",
    borderColor: "rgba(125,211,252,0.18)",
    endpoints: [
      {
        method: "GET",
        path: "/api/v2/analysis/projects/{project_id}/results",
        summary: "Retrieve combined analysis overview results",
        auth: true,
        curl: `curl "https://your-domain/api/v2/analysis/projects/proj-abc/results" \\
  -H "Authorization: Bearer <token>"`,
      },
      {
        method: "GET",
        path: "/api/v2/analysis/projects/{project_id}/plot",
        summary: "Retrieve extracted narrative plot points and arcs",
        auth: true,
        curl: `curl "https://your-domain/api/v2/analysis/projects/proj-abc/plot" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "PlotAnalysis — structural plot points, scenes, and pacing beats",
      },
      {
        method: "GET",
        path: "/api/v2/analysis/projects/{project_id}/themes",
        summary: "Retrieve thematic indices and extracted concepts",
        auth: true,
        curl: `curl "https://your-domain/api/v2/analysis/projects/proj-abc/themes" \\
  -H "Authorization: Bearer <token>"`,
      },
      {
        method: "GET",
        path: "/api/v2/analysis/projects/{project_id}/style",
        summary: "Retrieve stylistic profiles and readability metrics",
        auth: true,
        curl: `curl "https://your-domain/api/v2/analysis/projects/proj-abc/style" \\
  -H "Authorization: Bearer <token>"`,
      },
    ],
  },

  /* ── Real-time Collaboration & Sockets ── */
  {
    id: "collaboration",
    label: "Real-time Collaboration",
    icon: Users,
    color: "#7dd3fc",
    borderColor: "rgba(125,211,252,0.18)",
    endpoints: [
      {
        method: "POST",
        path: "/api/characteros/projects/{project_id}/collab/session",
        summary: "Start a real-time collaborative scene session",
        auth: true,
        description: "Establishes a cooperative writing workspace. Active members sync real-time via websockets.",
        curl: `curl -X POST "https://your-domain/api/characteros/projects/proj-abc/collab/session" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"scene_title": "Queen Battle", "character_ids": ["alice", "queen"]}'`,
      },
      {
        method: "POST",
        path: "/api/characteros/projects/{project_id}/collab/conflict/{conflict_id}/resolve",
        summary: "Resolve a narrative canon conflict",
        auth: true,
        description: "Submits co-writer resolution selections when a scene breaks canon timeline integrity.",
        curl: `curl -X POST "https://your-domain/api/characteros/projects/proj-abc/collab/conflict/con_987/resolve" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"resolution_mode": "REVISE"}'`,
      },
      {
        method: "GET",
        path: "/api/characteros/api/v2/projects/{project_id}/identity/candidates",
        summary: "List duplicate character candidates for entity merge",
        auth: true,
        description: "Returns lists of duplicate characters extracted during analysis that are viable for entity merging.",
        curl: `curl "https://your-domain/api/characteros/api/v2/projects/proj-abc/identity/candidates" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "IdentityCandidates — matches, confidence levels, and merge indicators",
      },
      {
        method: "GET",
        path: "ws://your-domain/api/characteros/projects/ws/{project_id}/collab/{session_id}",
        summary: "Establish WebSocket collaborative stream",
        auth: true,
        description: "Establishes a continuous bidirectional websocket connection to stream scene edits, events, presence, and token streams.",
        curl: `# Bidirectional WebSocket. Connect using standard client libraries (e.g., standard browser WebSocket api).`,
      },
    ],
  },

  /* ── Projects ── */
  {
    id: "projects",
    label: "Projects",
    icon: Layers,
    color: "#7dd3fc",
    borderColor: "rgba(125,211,252,0.18)",
    endpoints: [
      {
        method: "GET",
        path: "/api/projects",
        summary: "List all projects for the user",
        auth: true,
        curl: `curl "https://your-domain/api/projects?limit=20" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "Array of project summaries containing current analysis status",
      },
      {
        method: "POST",
        path: "/api/projects/upload-manuscript",
        summary: "Upload manuscript and create a project",
        auth: true,
        description: "Accepts TXT, EPUB, PDF, DOCX, or RTF. Files are capped at 100 MB (`MAX_UPLOAD_MB`). Triggers background analysis and queues the indexing job.",
        curl: `curl -X POST "https://your-domain/api/projects/upload-manuscript" \\
  -H "Authorization: Bearer <token>" \\
  -F "file=@manuscript.txt" \\
  -F "title=My Story"`,
        responseNote: "InitialProjectResponse — includes project_id and analysis job_id",
      },
      {
        method: "GET",
        path: "/api/projects/{project_id}",
        summary: "Get full project details",
        auth: true,
        curl: `curl "https://your-domain/api/projects/proj-abc" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "ProjectDashboardResponse — characters, lore fragments, and status",
      },
      {
        method: "DELETE",
        path: "/api/projects/{project_id}",
        summary: "Delete project and associated data",
        auth: true,
        description: "Permanently deletes manuscript files, character profiles, reflections, and pgvector embeddings from relational and vector storage.",
        curl: `curl -X DELETE "https://your-domain/api/projects/proj-abc" \\
  -H "Authorization: Bearer <token>"`,
      },
    ],
  },

  /* ── CharacterOS ── */
  {
    id: "characteros",
    label: "CharacterOS",
    icon: Cpu,
    color: "#7dd3fc",
    borderColor: "rgba(125,211,252,0.18)",
    endpoints: [
      {
        method: "POST",
        path: "/api/characteros/projects/{project_id}/build",
        summary: "Manually trigger CharacterOS build",
        auth: true,
        description: "Triggers extraction of character profiles, RAG indexing into pgvector, and rehydrates memory structures. Returns a background job ID.",
        curl: `curl -X POST "https://your-domain/api/characteros/projects/{project_id}/build" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "{ job_id } — poll GET /api/jobs/{job_id} for progress",
      },
      {
        method: "POST",
        path: "/api/characteros/projects/{project_id}/chat",
        summary: "Chat with a canon-locked character",
        auth: true,
        description: "Interact with a character agent in CharacterOS. Scoped by mode: CANON (strict canon), CANON+INFER (safe inference), BRANCH (creative), or WRITER_ROOM.",
        curl: `curl -X POST "https://your-domain/api/characteros/projects/{project_id}/chat" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "character_id": "alice",
    "message": "Why did you follow the rabbit?",
    "mode": "CANON"
  }'`,
        responseNote: "CharacterChatResponse — response text, character_name, mode, and citation_passages",
      },
      {
        method: "GET",
        path: "/api/characteros/projects/{project_id}/characters",
        summary: "List all character profiles",
        auth: true,
        curl: `curl "https://your-domain/api/characteros/projects/{project_id}/characters" \\
  -H "Authorization: Bearer <token>"`,
      },
      {
        method: "GET",
        path: "/api/characteros/projects/{project_id}/profile/{character_id}",
        summary: "Get a single character profile",
        auth: true,
        description: "Retrieves canonical facts, speech patterns, personality data, relationships, and current voice bindings.",
        curl: `curl "https://your-domain/api/characteros/projects/{project_id}/profile/alice" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "CharacterProfileResponse — traits, speech patterns, and voice DNA signature",
      },
      {
        method: "POST",
        path: "/api/characteros/projects/{project_id}/scene",
        summary: "Generate a multi-character scene",
        auth: true,
        description: "Generates creative scenes between 2 to 5 characters. Enforces continuous quality validation and revision. Bounded by `CHAROS_MAX_SCENE_CHARACTERS`.",
        curl: `curl -X POST "https://your-domain/api/characteros/projects/{project_id}/scene" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "character_ids": ["alice", "queen-of-hearts"],
    "prompt": "Alice confronts the Queen in the rose garden about the missing tarts.",
    "scene_type": "balanced",
    "director_controls": {
      "mood": "dramatic",
      "pacing": "moderate",
      "intensity": 0.7
    }
  }'`,
        responseNote: "SceneGenerationResponse — scene_text, continuity_passed, and detailed quality_score",
      },
      {
        method: "POST",
        path: "/api/characteros/projects/{project_id}/story-qa",
        summary: "Ask a story Q&A question (RAG)",
        auth: true,
        description: "Consults the ReaderAgent to query the project's manuscript using semantic search over pgvector, returning highly cited answers.",
        curl: `curl -X POST "https://your-domain/api/characteros/projects/{project_id}/story-qa" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"question":"What does Alice find in the tea party?"}'`,
        responseNote: "StoryQAResponse — answer text and cited passages",
      },
      {
        method: "POST",
        path: "/api/characteros/projects/{project_id}/characters/{character_id}/reflect",
        summary: "Trigger character memory reflection",
        auth: true,
        description: "Computes emotional arc trends and updates internal memory schemas. Runs automatically nightly.",
        curl: `curl -X POST "https://your-domain/api/characteros/projects/{project_id}/characters/alice/reflect" \\
  -H "Authorization: Bearer <token>"`,
      },
    ],
  },

  /* ── Audio ── */
  {
    id: "audio",
    label: "Audio & Voice",
    icon: Mic,
    color: "#7dd3fc",
    borderColor: "rgba(125,211,252,0.18)",
    endpoints: [
      {
        method: "POST",
        path: "/api/audio/characteros/projects/{project_id}/generate-audio-pipeline",
        summary: "Generate scene audio pipeline",
        auth: true,
        description: "Executes the 8-step audio synthesis pipeline: parses dialogue blocks, resolves voice DNA, executes TTS generation, composites tracks, and validates quality. Uploads to Cloud blob storage in production.",
        curl: `curl -X POST "https://your-domain/api/audio/characteros/projects/{project_id}/generate-audio-pipeline" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "character_ids": ["alice", "queen"],
    "scene_text": "ALICE: Hello.\\nQUEEN: Off with her head!",
    "voice_assignments": {"alice": "voice_01", "queen": "voice_02"},
    "director_controls": {"mood": "tense", "pacing": "moderate", "intensity": 0.8},
    "output_format": "mp3"
  }'`,
        responseNote: "AudioGenerationResponse — audio_url (MP3), duration_seconds, and 5-layer validation quality breakdown",
      },
      {
        method: "GET",
        path: "/api/audio/voices",
        summary: "List available voice configurations",
        auth: true,
        description: "Lists 300+ voice profiles with vocal archetypes, pace profiles, and emotion mapping matrices.",
        curl: `curl "https://your-domain/api/audio/voices" \\
  -H "Authorization: Bearer <token>"`,
      },
      {
        method: "POST",
        path: "/api/audio/characteros/projects/{project_id}/configure-voice",
        summary: "Configure character voice profiles",
        auth: true,
        description: "Adjust speed, text modifications, and emotion variables, and map optimal vocal DNA to active characters.",
        curl: `curl -X POST "https://your-domain/api/audio/characteros/projects/{project_id}/configure-voice" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "character_id": "alice",
    "speed": 1.05,
    "emotion": "dramatic",
    "apply_v2_preview": true
  }'`,
      },
    ],
  },

  /* ── Jobs ── */
  {
    id: "jobs",
    label: "Background Jobs",
    icon: Activity,
    color: "#7dd3fc",
    borderColor: "rgba(125,211,252,0.18)",
    endpoints: [
      {
        method: "GET",
        path: "/api/jobs/{job_id}",
        summary: "Poll job status and progress",
        auth: true,
        description: "Checks status for CharacterOS builds, manuscript analyzing jobs, and async audio generation. Statuses are: pending, running, completed, failed.",
        curl: `curl "https://your-domain/api/jobs/job_12345" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "JobStatusResponse — status, step, progress (0-100), and warning messages",
      },
    ],
  },

  /* ── Billing & API Keys ── */
  {
    id: "billing",
    label: "Billing & API Keys",
    icon: CreditCard,
    color: "#7dd3fc",
    borderColor: "rgba(125,211,252,0.18)",
    endpoints: [
      {
        method: "POST",
        path: "/api/billing/api-keys",
        summary: "Create a long-lived API key",
        auth: true,
        description: "Generates long-lived developer tokens for direct terminal/application integration. Displayed only once upon creation, hashed securely with SHA256 in the database.",
        curl: `curl -X POST "https://your-domain/api/billing/api-keys" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Local CLI", "expires_in_days": 90}'`,
        responseNote: "201 Created — { api_key: 'mrvx_...', expires_at }",
      },
      {
        method: "GET",
        path: "/api/billing/api-keys",
        summary: "List active API keys (prefixes only)",
        auth: true,
        curl: `curl "https://your-domain/api/billing/api-keys" \\
  -H "Authorization: Bearer <token>"`,
      },
      {
        method: "DELETE",
        path: "/api/billing/api-keys/{key_id}",
        summary: "Revoke an API key",
        auth: true,
        curl: `curl -X DELETE "https://your-domain/api/billing/api-keys/key_abc" \\
  -H "Authorization: Bearer <token>"`,
      },
      {
        method: "POST",
        path: "/api/billing/webhook",
        summary: "Stripe Webhook Receiver",
        auth: false,
        description: "Ingests Stripe billing and subscription lifecycle events. Signature is verified with `STRIPE_WEBHOOK_SECRET`.",
        curl: `# Programmatically invoked by Stripe servers. Verify locally using the Stripe CLI.`,
      },
    ],
  },
]

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────── */
const METHOD_STYLES: Record<Method, { bg: string; text: string }> = {
  GET: { bg: "rgba(125,211,252,0.08)", text: "#7dd3fc" },
  POST: { bg: "rgba(125,211,252,0.15)", text: "#38bdf8" },
  PATCH: { bg: "rgba(245,158,11,0.08)", text: "#fbbf24" },
  DELETE: { bg: "rgba(239,68,68,0.08)", text: "#f87171" },
  PUT: { bg: "rgba(148,163,184,0.08)", text: "#94a3b8" },
}

function MethodBadge({ method }: { method: Method }) {
  const s = METHOD_STYLES[method]
  return (
    <span
      className="inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-current shrink-0"
      style={{ color: s.text, letterSpacing: "0.04em" }}
    >
      {method}
    </span>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition-all hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-300"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function EndpointCard({ ep }: { ep: Endpoint }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-lg overflow-hidden transition-all marvox-panel"
      style={{
        border: `1px solid ${open ? "rgba(125,211,252,0.15)" : "rgba(148,163,184,0.09)"}`,
      }}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left focus:outline-none"
      >
        <MethodBadge method={ep.method} />
        <code className="text-xs font-mono flex-1 text-left text-slate-200">
          {ep.path}
        </code>
        {ep.auth ? (
          <span className="text-[9px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-sky-400/10 text-sky-300 border border-sky-400/15 shrink-0">
            JWT / API Key
          </span>
        ) : (
          <span className="text-[9px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-slate-950/60 text-slate-500 border border-slate-900 shrink-0">
            public
          </span>
        )}
        <span className="text-slate-600 shrink-0">
          {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </span>
      </button>

      {/* Summary line */}
      <div className="px-4 pb-3.5">
        <span className="text-xs text-slate-400 leading-relaxed">{ep.summary}</span>
      </div>

      {/* Expanded detail */}
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-900/60">
          {ep.description && (
            <p className="pt-3 text-xs leading-relaxed text-slate-400">
              {ep.description}
            </p>
          )}
          <div className="rounded-lg overflow-hidden bg-slate-950/80 border border-slate-900">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-900">
              <span className="text-[10px] font-mono text-slate-500">bash</span>
              <CopyButton text={ep.curl} />
            </div>
            <pre className="px-3 py-3 text-xs overflow-x-auto leading-relaxed text-sky-300 font-mono">
              <code>{ep.curl}</code>
            </pre>
          </div>
          {ep.responseNote && (
            <div className="flex items-start gap-2 rounded px-3 py-2 text-[11px] bg-sky-400/5 border border-sky-400/10 text-sky-300">
              <span className="font-semibold shrink-0">Response Note:</span>
              <span>{ep.responseNote}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function GroupSection({ group }: { group: ApiGroup }) {
  const [collapsed, setCollapsed] = useState(false)
  const Icon = group.icon
  return (
    <section id={`group-${group.id}`} className="space-y-4">
      <button
        className="w-full flex items-center gap-3 py-2 focus:outline-none"
        onClick={() => setCollapsed(c => !c)}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-sky-400/10 border border-sky-400/20">
          <Icon className="w-4.5 h-4.5 text-sky-300" />
        </div>
        <h2 className="text-lg font-medium text-left flex-1 text-slate-100 font-display">
          {group.label}
        </h2>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 shrink-0 font-mono">
          {group.endpoints.length} endpoint{group.endpoints.length !== 1 ? "s" : ""}
        </span>
        <span className="text-slate-600 shrink-0">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {!collapsed && (
        <div className="space-y-3">
          {group.endpoints.map(ep => (
            <EndpointCard key={ep.method + ep.path} ep={ep} />
          ))}
        </div>
      )}
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function ApiReferencePage() {
  return (
    <div className="pb-16 space-y-12 font-sans">
      {/* ── Page header ── */}
      <div className="pb-6 border-b border-slate-900">
        <div className="inline-block text-[10px] font-semibold uppercase tracking-wider mb-3 px-2 py-0.5 rounded bg-sky-400/10 text-sky-300 border border-sky-400/15">
          API Reference
        </div>
        <h1 className="text-3xl font-medium mb-3 text-white font-display">
          REST API Reference
        </h1>
        <p className="text-sm max-w-2xl leading-relaxed text-slate-400">
          All endpoints for the Marvox backend (FastAPI on Railway). Base URL:{" "}
          <code className="text-xs px-1.5 py-0.5 rounded font-mono bg-sky-400/5 text-sky-300 border border-sky-400/10">
            https://your-railway-domain
          </code>
        </p>
      </div>

      {/* ── Auth overview ── */}
      <section className="rounded-xl p-6 space-y-4 marvox-panel-strong border-sky-400/10">
        <h2 className="text-base font-semibold text-sky-300 font-display">
          Authentication Overview
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-lg p-4 space-y-2 bg-slate-950/40 border border-slate-900">
            <div className="font-semibold text-slate-200">JWT Bearer Token</div>
            <p className="text-slate-400 leading-relaxed">
              Returned by <code className="font-mono text-[11px]">/api/auth/login</code> or{" "}
              <code className="font-mono text-[11px]">/api/auth/register</code>. Pass in every protected request:
            </p>
            <code className="block text-[11px] font-mono mt-2 p-2 rounded bg-slate-950 border border-slate-900 text-sky-300">
              Authorization: Bearer &lt;token&gt;
            </code>
          </div>
          <div className="rounded-lg p-4 space-y-2 bg-slate-950/40 border border-slate-900">
            <div className="flex items-center gap-2 font-semibold text-slate-200">
              API Key (Long-Lived)
              <span className="text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-sky-400/10 text-sky-300 border border-sky-400/15">
                NEW
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Create long-lived API keys via{" "}
              <code className="font-mono text-[11px]">POST /api/billing/api-keys</code>.
              Use exactly like a JWT token:
            </p>
            <code className="block text-[11px] font-mono mt-2 p-2 rounded bg-slate-950 border border-slate-900 text-sky-300">
              Authorization: Bearer mrvx_...
            </code>
          </div>
        </div>
        {/* Error shapes */}
        <div className="pt-2">
          <p className="text-xs font-semibold mb-2 text-slate-300 tracking-wide uppercase">Error Response Shapes</p>
          <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="rounded p-3 bg-slate-950/50 border border-slate-900 text-sky-300">
              {`// Simple Auth Error\n{\n  "detail": "Not authenticated"\n}`}
            </div>
            <div className="rounded p-3 bg-slate-950/50 border border-slate-900 text-sky-300">
              {`// Structured CharacterOS Error\n{\n  "detail": {\n    "error_code": "CANON_RETRIEVAL_FAILED",\n    "message": "Vector DB unreachable",\n    "recovery_suggestions": [...]\n  }\n}`}
            </div>
          </div>
        </div>
      </section>

      {/* ── Jump links ── */}
      <nav className="flex flex-wrap gap-2 pt-2">
        {API_GROUPS.map(g => {
          const Icon = g.icon
          return (
            <a
              key={g.id}
              href={`#group-${g.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-800 hover:border-sky-400/30 bg-slate-950/60 text-slate-400 hover:text-sky-300 transition-all"
            >
              <Icon className="w-3.5 h-3.5 text-sky-400" />
              {g.label}
            </a>
          )
        })}
      </nav>

      {/* ── Group list ── */}
      <div className="space-y-10 pt-4">
        {API_GROUPS.map(group => (
          <GroupSection key={group.id} group={group} />
        ))}
      </div>
    </div>
  )
}
