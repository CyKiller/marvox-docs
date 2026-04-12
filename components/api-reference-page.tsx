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
  highlight?: boolean // "Phase 4" / new feature
}

interface ApiGroup {
  id: string
  label: string
  icon: React.ElementType
  color: string           // Tailwind-like hex token
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
    color: "#4ade80",
    borderColor: "rgba(74,222,128,0.22)",
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/register",
        summary: "Register a new account",
        auth: false,
        description: "Production registration (PostgreSQL-only). Returns a JWT token immediately.",
        curl: `curl -X POST "https://your-domain/api/auth/register" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"you@example.com","password":"p@ssword","name":"You"}'`,
        responseNote: "AuthResponse — includes JWT access_token",
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
        description: "Instantly creates or reuses a demo session. Useful for prototyping.",
        curl: `curl -X POST "https://your-domain/api/auth/demo-login" \\
  -H "Content-Type: application/json"`,
      },
      {
        method: "POST",
        path: "/api/auth/google/exchange",
        summary: "Exchange Google identity token for Marvox JWT",
        auth: false,
        curl: `curl -X POST "https://your-domain/api/auth/google/exchange" \\
  -H "Content-Type: application/json" \\
  -d '{"id_token":"GOOGLE_ID_TOKEN"}'`,
        responseNote: "GoogleExchangeResponse — Marvox JWT",
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
        method: "PATCH",
        path: "/api/auth/me",
        summary: "Update profile, password, or notification preferences",
        auth: true,
        curl: `curl -X PATCH "https://your-domain/api/auth/me" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"New Name"}'`,
      },
      {
        method: "DELETE",
        path: "/api/auth/me",
        summary: "Delete account and all owned projects",
        auth: true,
        curl: `curl -X DELETE "https://your-domain/api/auth/me" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"confirm":true}'`,
      },
      {
        method: "POST",
        path: "/api/auth/forgot-password",
        summary: "Send password-reset email",
        auth: false,
        curl: `curl -X POST "https://your-domain/api/auth/forgot-password" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"you@example.com"}'`,
      },
      {
        method: "POST",
        path: "/api/auth/reset-password",
        summary: "Reset password with token from email",
        auth: false,
        curl: `curl -X POST "https://your-domain/api/auth/reset-password" \\
  -H "Content-Type: application/json" \\
  -d '{"token":"RESET_TOKEN","password":"newP@ss"}'`,
      },
      {
        method: "POST",
        path: "/api/auth/verify",
        summary: "Verify email with token from email",
        auth: false,
        curl: `curl -X POST "https://your-domain/api/auth/verify" \\
  -H "Content-Type: application/json" \\
  -d '{"token":"VERIFY_TOKEN"}'`,
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

  /* ── Projects ── */
  {
    id: "projects",
    label: "Projects",
    icon: Layers,
    color: "#7dd3fc",
    borderColor: "rgba(125,211,252,0.22)",
    endpoints: [
      {
        method: "GET",
        path: "/api/projects",
        summary: "List all projects for the authenticated user",
        auth: true,
        description: "Supports pagination, sorting, and status filtering.",
        curl: `curl "https://your-domain/api/projects?limit=20&sort_by=created_at" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "Array of project summaries with status",
      },
      {
        method: "POST",
        path: "/api/projects/upload-manuscript",
        summary: "Upload a manuscript and create a project",
        auth: true,
        description: "Accepts .txt, .epub, .pdf. Max 100 MB by default (`MAX_UPLOAD_MB`). Triggers CharacterOS build in the background.",
        curl: `curl -X POST "https://your-domain/api/projects/upload-manuscript" \\
  -H "Authorization: Bearer <token>" \\
  -F "file=@manuscript.txt" \\
  -F "title=My Story"`,
        responseNote: "InitialProjectResponse — includes project_id and job_id",
      },
      {
        method: "GET",
        path: "/api/projects/{project_id}",
        summary: "Get full project details including analysis results",
        auth: true,
        curl: `curl "https://your-domain/api/projects/project-demo" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "ProjectDashboardResponse — characters, analysis, CharacterOS status",
      },
      {
        method: "PATCH",
        path: "/api/projects/{project_id}",
        summary: "Update project title or description",
        auth: true,
        curl: `curl -X PATCH "https://your-domain/api/projects/project-demo" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Updated Title"}'`,
      },
      {
        method: "DELETE",
        path: "/api/projects/{project_id}",
        summary: "Delete project and all associated data",
        auth: true,
        curl: `curl -X DELETE "https://your-domain/api/projects/project-demo" \\
  -H "Authorization: Bearer <token>"`,
      },
    ],
  },

  /* ── CharacterOS ── */
  {
    id: "characteros",
    label: "CharacterOS",
    icon: Cpu,
    color: "#c084fc",
    borderColor: "rgba(192,132,252,0.22)",
    endpoints: [
      {
        method: "POST",
        path: "/api/characteros/projects/{project_id}/build",
        summary: "Manually trigger CharacterOS build",
        auth: true,
        description: "Builds character profiles, canon index, and memory structures. Returns a job_id immediately for polling.",
        curl: `curl -X POST "https://your-domain/api/characteros/projects/{project_id}/build" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "{ job_id } — poll GET /api/jobs/{job_id} for progress",
      },
      {
        method: "POST",
        path: "/api/characteros/projects/{project_id}/chat",
        summary: "Chat with a canon-locked character",
        auth: true,
        description: "Send a message to a character agent. Supports four modes: CANON, CANON+INFER, BRANCH, WRITER_ROOM. Defaults to CANON+INFER.",
        curl: `curl -X POST "https://your-domain/api/characteros/projects/{project_id}/chat" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "character_id": "alice",
    "message": "Why did you follow the rabbit?",
    "mode": "CANON+INFER"
  }'`,
        responseNote: "CharacterChatResponse — response, character_name, mode, citations",
      },
      {
        method: "GET",
        path: "/api/characteros/projects/{project_id}/characters",
        summary: "List all character profiles for a project",
        auth: true,
        curl: `curl "https://your-domain/api/characteros/projects/{project_id}/characters" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "Array of CharacterProfile — name, traits, voice config",
      },
      {
        method: "GET",
        path: "/api/characteros/projects/{project_id}/characters/{character_id}",
        summary: "Get a single character profile",
        auth: true,
        curl: `curl "https://your-domain/api/characteros/projects/{project_id}/characters/alice" \\
  -H "Authorization: Bearer <token>"`,
      },
      {
        method: "POST",
        path: "/api/characteros/projects/{project_id}/scene",
        summary: "Generate a multi-character scene",
        auth: true,
        description: `Max ${process.env.NEXT_PUBLIC_CHAROS_MAX_SCENE_CHARACTERS ?? 5} characters per scene. Runs 3-pass continuity validation internally.`,
        curl: `curl -X POST "https://your-domain/api/characteros/projects/{project_id}/scene" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "character_ids": ["alice", "queen-of-hearts"],
    "prompt": "Alice confronts the Queen in the garden",
    "mode": "CANON"
  }'`,
        responseNote: "SceneGenerationResponse — scene text, continuity warnings, revision history",
      },
      {
        method: "POST",
        path: "/api/characteros/projects/{project_id}/reader",
        summary: "Ask a story Q&A question (RAG)",
        auth: true,
        description: "ReaderAgent answers questions using semantic search over the canon index, returning cited chapter references.",
        curl: `curl -X POST "https://your-domain/api/characteros/projects/{project_id}/reader" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"question":"What happens in chapter 3?"}'`,
        responseNote: "ReaderResponse — answer, chapter_citations",
      },
      {
        method: "POST",
        path: "/api/characteros/projects/{project_id}/characters/{character_id}/reflect",
        summary: "Trigger character reflection (memory + arc evolution)",
        auth: true,
        description: "Analyzes recent memories, computes emotional arc trend, and generates an internal reflection thought. Runs automatically nightly at 2 AM UTC.",
        curl: `curl -X POST "https://your-domain/api/characteros/projects/{project_id}/characters/alice/reflect" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "ReflectionResponse — reflection text, arc_trend, memory_id",
        highlight: true,
      },
    ],
  },

  /* ── Audio ── */
  {
    id: "audio",
    label: "Audio & Voice",
    icon: Mic,
    color: "#fbbf24",
    borderColor: "rgba(251,191,36,0.22)",
    endpoints: [
      {
        method: "POST",
        path: "/api/audio/scene",
        summary: "Generate multi-voice audio for a scene",
        auth: true,
        description: "8-step audio pipeline: parse dialogue → resolve voices → generate TTS per line → compose → QA → store. Returns a job_id for async polling.",
        curl: `curl -X POST "https://your-domain/api/audio/scene" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "proj_abc",
    "scene_text": "\\\"Curiouser and curiouser!\\\" Alice said...",
    "character_voice_map": {"alice": "nova", "narrator": "onyx"}
  }'`,
        responseNote: "AudioJobResponse — job_id, estimated_duration_seconds",
      },
      {
        method: "GET",
        path: "/api/audio/voices",
        summary: "List available voice configurations",
        auth: true,
        description: "Returns 300+ voice configurations. Filter by character archetype, emotion profile, or speed range.",
        curl: `curl "https://your-domain/api/audio/voices" \\
  -H "Authorization: Bearer <token>"`,
      },
      {
        method: "POST",
        path: "/api/audio/voice-select",
        summary: "Auto-select voice for a character from trait profile",
        auth: true,
        description: "VoiceSelectionAgent maps character personality traits to optimal voice neural DNA.",
        curl: `curl -X POST "https://your-domain/api/audio/voice-select" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"character_id":"alice","project_id":"proj_abc"}'`,
        responseNote: "VoiceSelectionResult — voice_id, confidence_score, rationale",
      },
      {
        method: "GET",
        path: "/api/audio/jobs/{job_id}",
        summary: "Poll audio generation job status",
        auth: true,
        curl: `curl "https://your-domain/api/audio/jobs/job_abc123" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "AudioJobStatus — status (pending|processing|complete|failed), audio_url",
      },
    ],
  },

  /* ── Jobs ── */
  {
    id: "jobs",
    label: "Background Jobs",
    icon: Activity,
    color: "#34d399",
    borderColor: "rgba(52,211,153,0.22)",
    endpoints: [
      {
        method: "GET",
        path: "/api/jobs/{job_id}",
        summary: "Get job status and progress",
        auth: true,
        description: "Poll for CharacterOS build progress, audio generation, and other async jobs. Steps are: init → profiles → index → memories → complete.",
        curl: `curl "https://your-domain/api/jobs/{job_id}" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "JobStatusResponse — status, step, progress (0-100), message",
      },
    ],
  },

  /* ── Billing & API Keys ── */
  {
    id: "billing",
    label: "Billing & API Keys",
    icon: CreditCard,
    color: "#fb923c",
    borderColor: "rgba(251,146,60,0.22)",
    endpoints: [
      {
        method: "POST",
        path: "/api/billing/api-keys",
        summary: "Create a long-lived API key",
        auth: true,
        description: "API keys allow programmatic access without user credentials. Keys are SHA256-hashed in the database — the full key is shown only once at creation. Default expiry: 90 days.",
        curl: `curl -X POST "https://your-domain/api/billing/api-keys" \\
  -H "Authorization: Bearer <jwt_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "CI Integration",
    "expires_in_days": 90
  }'`,
        responseNote: '201 — { api_key: "mrvx_...", key_prefix, expires_at } — save api_key now, not shown again',
        highlight: true,
      },
      {
        method: "GET",
        path: "/api/billing/api-keys",
        summary: "List API keys (prefix only, no full key values)",
        auth: true,
        curl: `curl "https://your-domain/api/billing/api-keys" \\
  -H "Authorization: Bearer <jwt_token>"`,
        responseNote: "Array — key_prefix, name, last_used_at, expires_at, is_active",
      },
      {
        method: "DELETE",
        path: "/api/billing/api-keys/{key_id}",
        summary: "Revoke an API key",
        auth: true,
        description: "Soft-delete — key becomes inactive immediately. Cannot be un-revoked.",
        curl: `curl -X DELETE "https://your-domain/api/billing/api-keys/{key_id}" \\
  -H "Authorization: Bearer <jwt_token>"`,
      },
      {
        method: "GET",
        path: "/api/billing/subscription",
        summary: "Get current subscription status",
        auth: true,
        curl: `curl "https://your-domain/api/billing/subscription" \\
  -H "Authorization: Bearer <token>"`,
        responseNote: "SubscriptionStatus — plan, status, quota_used, quota_limit",
      },
      {
        method: "POST",
        path: "/api/billing/webhook",
        summary: "Stripe webhook receiver",
        auth: false,
        description: "Receives Stripe events. Exempt from CSRF middleware. Signature verified via STRIPE_WEBHOOK_SECRET.",
        curl: `# Called by Stripe — not by API consumers
# Verify with: stripe listen --forward-to your-domain/api/billing/webhook`,
      },
    ],
  },

  /* ── Health ── */
  {
    id: "health",
    label: "Health & Status",
    icon: Key,
    color: "#94a3b8",
    borderColor: "rgba(148,163,184,0.22)",
    endpoints: [
      {
        method: "GET",
        path: "/api/health",
        summary: "Backend health check",
        auth: false,
        description: "Returns database, Redis, vector store, and blob storage connectivity status.",
        curl: `curl "https://your-domain/api/health"`,
        responseNote: '{ status: "ok", db: "ok", redis: "ok", vector: "ok", blob: "ok" }',
      },
      {
        method: "GET",
        path: "/api/auth/db-status",
        summary: "Database connectivity diagnostic",
        auth: false,
        curl: `curl "https://your-domain/api/auth/db-status"`,
      },
    ],
  },
]

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────── */
const METHOD_STYLES: Record<Method, { bg: string; text: string }> = {
  GET:    { bg: "rgba(125,211,252,0.12)", text: "#7dd3fc" },
  POST:   { bg: "rgba(74,222,128,0.12)",  text: "#4ade80" },
  PATCH:  { bg: "rgba(251,191,36,0.12)",  text: "#fbbf24" },
  DELETE: { bg: "rgba(248,113,113,0.12)", text: "#f87171" },
  PUT:    { bg: "rgba(192,132,252,0.12)", text: "#c084fc" },
}

function MethodBadge({ method }: { method: Method }) {
  const s = METHOD_STYLES[method]
  return (
    <span
      className="inline-block font-mono text-[11px] font-bold px-1.5 py-0.5 rounded shrink-0"
      style={{ background: s.bg, color: s.text, letterSpacing: "0.04em" }}
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
      className="flex items-center gap-1 text-xs px-2 py-0.5 rounded transition-all"
      style={{
        color: copied ? "#4ade80" : "hsl(240 5% 55%)",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(148,163,184,0.12)",
      }}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function EndpointCard({ ep }: { ep: Endpoint }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-lg overflow-hidden transition-all"
      style={{
        background: open ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${open ? "rgba(148,163,184,0.18)" : "rgba(148,163,184,0.09)"}`,
      }}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <MethodBadge method={ep.method} />
        <code
          className="text-sm font-mono flex-1 text-left"
          style={{ color: "hsl(0 0% 88%)" }}
        >
          {ep.path}
        </code>
        {ep.highlight && (
          <span
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
            style={{ background: "rgba(251,146,60,0.15)", color: "#fb923c" }}
          >
            Phase 4
          </span>
        )}
        {ep.auth ? (
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0"
            style={{ background: "rgba(250,200,80,0.1)", color: "#fbbf24" }}
          >
            JWT / API Key
          </span>
        ) : (
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0"
            style={{ background: "rgba(148,163,184,0.08)", color: "hsl(240 5% 55%)" }}
          >
            public
          </span>
        )}
        <span style={{ color: "hsl(240 5% 55%)" }} className="shrink-0">
          {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </span>
      </button>

      {/* Summary line */}
      <div className="px-4 pb-2">
        <span className="text-sm" style={{ color: "hsl(240 5% 62%)" }}>{ep.summary}</span>
      </div>

      {/* Expanded detail */}
      {open && (
        <div className="px-4 pb-4 space-y-3" style={{ borderTop: "1px solid rgba(148,163,184,0.09)" }}>
          {ep.description && (
            <p className="pt-3 text-sm leading-relaxed" style={{ color: "hsl(240 5% 68%)" }}>
              {ep.description}
            </p>
          )}
          <div
            className="rounded-lg overflow-hidden"
            style={{ background: "rgba(2,8,17,0.7)", border: "1px solid rgba(148,163,184,0.1)" }}
          >
            <div
              className="flex items-center justify-between px-3 py-1.5"
              style={{ borderBottom: "1px solid rgba(148,163,184,0.08)" }}
            >
              <span className="text-[11px] font-medium" style={{ color: "hsl(240 5% 50%)" }}>bash</span>
              <CopyButton text={ep.curl} />
            </div>
            <pre className="px-3 py-3 text-[13px] overflow-x-auto leading-relaxed" style={{ color: "#93c5fd" }}>
              <code>{ep.curl}</code>
            </pre>
          </div>
          {ep.responseNote && (
            <div
              className="flex items-start gap-2 rounded px-3 py-2 text-xs"
              style={{
                background: "rgba(125,211,252,0.05)",
                border: "1px solid rgba(125,211,252,0.1)",
                color: "hsl(196 100% 70%)",
              }}
            >
              <span className="font-semibold shrink-0">Response:</span>
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
    <section id={`group-${group.id}`} className="space-y-3">
      <button
        className="w-full flex items-center gap-3 py-2"
        onClick={() => setCollapsed(c => !c)}
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
          style={{ background: `${group.color}18`, border: `1px solid ${group.borderColor}` }}
        >
          <Icon className="w-4 h-4" style={{ color: group.color }} />
        </div>
        <h2
          className="text-lg font-semibold text-left flex-1"
          style={{ color: "hsl(0 0% 96%)", letterSpacing: "-0.02em" }}
        >
          {group.label}
        </h2>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded"
          style={{ background: `${group.color}14`, color: group.color }}
        >
          {group.endpoints.length} endpoint{group.endpoints.length !== 1 ? "s" : ""}
        </span>
        <span style={{ color: "hsl(240 5% 50%)" }}>
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {!collapsed && (
        <div className="space-y-2">
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
    <div className="pb-16 space-y-10">

      {/* ── Page header ── */}
      <div className="pb-6" style={{ borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
        <div
          className="inline-block text-xs font-medium uppercase tracking-widest mb-3 px-2 py-0.5 rounded"
          style={{
            color: "hsl(196 100% 67%)",
            background: "rgba(125,211,252,0.08)",
            border: "1px solid rgba(125,211,252,0.14)",
          }}
        >
          API Reference
        </div>
        <h1
          className="text-3xl font-bold mb-3"
          style={{ color: "hsl(0 0% 98%)", letterSpacing: "-0.025em" }}
        >
          REST API Reference
        </h1>
        <p className="text-base max-w-2xl" style={{ color: "hsl(240 5% 60%)" }}>
          All endpoints for the Marvox backend (FastAPI on Railway). Base URL:{" "}
          <code
            className="text-sm px-1.5 py-0.5 rounded font-mono"
            style={{ background: "rgba(125,211,252,0.08)", color: "hsl(196 100% 70%)" }}
          >
            https://your-railway-domain
          </code>
        </p>
      </div>

      {/* ── Auth overview ── */}
      <section
        className="rounded-xl p-5 space-y-4"
        style={{
          background: "rgba(6,12,28,0.7)",
          border: "1px solid rgba(125,211,252,0.14)",
        }}
      >
        <h2 className="text-base font-semibold" style={{ color: "hsl(196 100% 70%)" }}>
          Authentication Overview
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div
            className="rounded-lg p-4 space-y-1"
            style={{ background: "rgba(125,211,252,0.05)", border: "1px solid rgba(125,211,252,0.12)" }}
          >
            <div className="font-semibold" style={{ color: "hsl(0 0% 90%)" }}>JWT Bearer Token</div>
            <p style={{ color: "hsl(240 5% 60%)" }}>
              Returned by <code className="font-mono text-xs">/api/auth/login</code> or{" "}
              <code className="font-mono text-xs">/api/auth/register</code>. Pass in every protected request:
            </p>
            <code
              className="block text-xs font-mono mt-2 p-2 rounded"
              style={{ background: "rgba(2,8,17,0.6)", color: "#93c5fd" }}
            >
              Authorization: Bearer &lt;token&gt;
            </code>
          </div>
          <div
            className="rounded-lg p-4 space-y-1"
            style={{ background: "rgba(251,146,60,0.05)", border: "1px solid rgba(251,146,60,0.14)" }}
          >
            <div
              className="flex items-center gap-2 font-semibold"
              style={{ color: "hsl(0 0% 90%)" }}
            >
              API Key (Phase 4)
              <span
                className="text-[10px] font-semibold px-1 py-0.5 rounded"
                style={{ background: "rgba(251,146,60,0.18)", color: "#fb923c" }}
              >
                NEW
              </span>
            </div>
            <p style={{ color: "hsl(240 5% 60%)" }}>
              Create long-lived API keys via{" "}
              <code className="font-mono text-xs">POST /api/billing/api-keys</code>.
              Use exactly like a JWT token:
            </p>
            <code
              className="block text-xs font-mono mt-2 p-2 rounded"
              style={{ background: "rgba(2,8,17,0.6)", color: "#93c5fd" }}
            >
              Authorization: Bearer mrvx_...
            </code>
          </div>
        </div>
        {/* Error shapes */}
        <div className="pt-1">
          <p className="text-sm font-medium mb-2" style={{ color: "hsl(240 5% 70%)" }}>Error Response Shapes</p>
          <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
            <div
              className="rounded p-3"
              style={{ background: "rgba(2,8,17,0.6)", border: "1px solid rgba(148,163,184,0.1)", color: "#93c5fd" }}
            >
              {`// Simple\n{\n  "detail": "Not authenticated"\n}`}
            </div>
            <div
              className="rounded p-3"
              style={{ background: "rgba(2,8,17,0.6)", border: "1px solid rgba(148,163,184,0.1)", color: "#93c5fd" }}
            >
              {`// Structured (CharacterOS)\n{\n  "detail": {\n    "error_code": "CANON_RETRIEVAL_FAILED",\n    "message": "Vector DB unreachable",\n    "recovery_suggestions": [...]\n  }\n}`}
            </div>
          </div>
        </div>
      </section>

      {/* ── Jump links ── */}
      <nav className="flex flex-wrap gap-2">
        {API_GROUPS.map(g => {
          const Icon = g.icon
          return (
            <a
              key={g.id}
              href={`#group-${g.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: `${g.color}10`,
                border: `1px solid ${g.borderColor}`,
                color: g.color,
              }}
            >
              <Icon className="w-3 h-3" />
              {g.label}
            </a>
          )
        })}
      </nav>

      {/* ── Endpoint groups ── */}
      <div className="space-y-8">
        {API_GROUPS.map(g => (
          <GroupSection key={g.id} group={g} />
        ))}
      </div>

      {/* ── Footer note ── */}
      <div
        className="rounded-xl p-5 text-sm"
        style={{
          background: "rgba(6,12,28,0.5)",
          border: "1px solid rgba(148,163,184,0.1)",
          color: "hsl(240 5% 58%)",
        }}
      >
        <p>
          Full machine-readable spec:{" "}
          <code className="font-mono text-xs">GET /openapi.json</code> or browse the interactive docs at{" "}
          <code className="font-mono text-xs">/docs</code> on your Railway backend.
          The OpenAPI JSON is also exported to{" "}
          <code className="font-mono text-xs">docs/openapi.json</code> in the repo via{" "}
          <code className="font-mono text-xs">scripts/export_openapi.py</code>.
        </p>
      </div>

    </div>
  )
}
