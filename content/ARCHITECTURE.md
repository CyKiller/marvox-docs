# System Architecture

Marvox is a full-stack AI platform for storyworld production. This document describes the system design, component interactions, and technology stack.

---

## System Overview

```
┌─────────────────┐           ┌─────────────────┐
│   Web Frontend  │◄────────►│   FastAPI       │
│  (Next.js 16.x) │  HTTP/WS  │   Backend       │
│   Vercel        │           │  (Python 3.11+) │
└─────────────────┘           └────────┬────────┘
       ▲                               │
       │                               ▼
       │        ┌──────────────────────────────┐
       │        │  CharacterOS Agent Network   │
       │        │  (AgentRuntime orchestrator) │
       │        └──────────────────┬───────────┘
       │                           │
       ▼                           ▼
   localStorage              ┌──────────────────┐
   (auth tokens)             │  PostgreSQL      │
                             │  + pgvector      │
                             │  (all data +     │
                             │   vector index)  │
                             └────────┬─────────┘
                                      │
                                      ▼
                             ┌──────────────────┐
                             │  Redis/Dragonfly │
                             │  (cache, queues) │
                             └──────────────────┘
```

---

## Backend Stack (Python/FastAPI)

### Core Framework
- **FastAPI** `0.104.1` - Async web framework with auto-docs
- **Python** `3.11+` - Type-safe async/await runtime
- **Uvicorn** `0.24.0` - ASGI web server
- **Pydantic** `2.5.0` - Data validation and settings

### Database Layer
- **PostgreSQL** (all environments: local via Docker, staging, production) - Scalable SQL backend with Alembic migrations
- **psycopg/asyncpg** - PostgreSQL async drivers
- **Redis** (local via Docker, Railway staging/production) - Cache, rate limiting, and job queues

### AI/ML & Embeddings
- **Inference provider** ≥1.51.0 — frontier LLM inference, TTS audio generation
- **The embedding model** — 1,536-dim vector embeddings for RAG
- **PostgreSQL pgvector** — Vector storage and similarity search (local and production, single backend)
- **scikit-learn** ≥1.5.0 — ML utilities
- **NumPy** ≥1.26.0 — Numerical computing

### Document Processing
- **python-docx** `1.1.0` - DOCX file parsing
- **pypdf** `≥4.1.0` - PDF extraction

### Audio Processing
- **pydub** `0.25.1` - Audio format conversion and mixing
- **Neural TTS engine** - multi-voice neural TTS

### Security & Performance
- **Redis** - Required for rate limiting, caching, and background job queues
- **Custom Security Middleware** - CSRF/XSS/input sanitization, rate limiting guards (~1,050 lines)
- **Prometheus Metrics** - `/metrics` endpoint exposed when enabled
- **Health Probes** - `/api/health` and `/api/health/ready`

### Module Organization
```
backend/
├── project_routes.py        # Project management endpoints
├── characteros_routes.py    # Character AI endpoints
├── audio_routes.py          # Audio generation endpoints
├── jobs_routes.py           # Background job tracking
├── auth_routes.py           # Authentication
├── security_middleware.py   # CSRF/XSS/rate limiting (~1,050 lines)
└── performance_monitoring.py # Metrics/health checks (352 lines)

services/
├── characteros/
│   ├── agent_runtime.py     # 25+ agent orchestrator
│   ├── canon_indexer.py     # RAG semantic search
│   ├── character_agent.py   # Character chat
│   ├── writer_agent.py      # Scene generation
│   ├── continuity_agent.py  # Validation
│   ├── director_agent.py    # Scene direction
│   ├── narrator_agent.py    # Narrative framing
│   └── voice_selection_agent.py
└── tts_service.py           # Multi-voice audio
```

---

## Frontend Stack (Next.js/React)

### Core Framework
- **Next.js** `16.x` — React framework with App Router for the Marvox Core App (Note: this documentation site runs on Next.js 15.x; requires Node.js 20.9+, npm 10+)
- **React** `18` — UI component library
- **TypeScript** `5` — Strict type checking (enabled in build)

### Styling & UI
- **Tailwind CSS** `3.4.17` - Utility-first styling
- **shadcn/ui** `0.8.0+` - Accessible component library
- **Framer Motion** `12.30.0` - Page transitions and animations
- **Radix UI** - Unstyled, accessible components (20+ included)
- **Lucide React** - Icon library

### State & Forms
- **React Hook Form** `7.54.1` - Form state management
- **Zod** `3.24.1` - Schema validation
- **zustand** (optional) - Lightweight state management

### Utilities
- **next-themes** - Dark mode support
- **date-fns** `3.6.0` - Date utilities
- **react-dropzone** - File upload handling
- **sonner** `1.7.1` - Toast notifications
- **cmdk** - Command palette UI
- **Embla Carousel** - Carousel/slider component

### Route Organization
```
app/
├── page.tsx                    # Home
├── auth/
│   ├── login/page.tsx
│   └── signup/page.tsx
├── projects/
│   ├── page.tsx               # Project list
│   ├── upload/page.tsx        # Upload new project
│   └── [id]/
│       ├── page.tsx           # Project dashboard
│       ├── manuscript/page.tsx
│       ├── statistics/page.tsx
│       ├── analysis/
│       │   ├── page.tsx       # Summary tab
│       │   ├── plot/page.tsx
│       │   ├── characters/page.tsx
│       │   ├── dialogue/page.tsx
│       │   ├── world/page.tsx
│       │   ├── style/page.tsx
│       │   └── themes/page.tsx
│       ├── settings/
│       │   ├── project/page.tsx
│       │   ├── characters/page.tsx
│       │   ├── audio/page.tsx
│       │   └── export/page.tsx
│       └── characteros/
│           ├── page.tsx       # CharacterOS studio
│           ├── chat/page.tsx
│           ├── scene/page.tsx
│           ├── reader/page.tsx
│           ├── audio/page.tsx
│           ├── world/page.tsx
│           └── profile/[character_id]/page.tsx
├── analytics/page.tsx
└── characters/page.tsx
```

### API Client Architecture
- **Unified API Client** (`lib/api-client.ts`)
  - Single gateway for all HTTP calls
  - Consistent error handling with recovery suggestions
  - Global error codes (RAG_TIMEOUT, CANON_VIOLATION, etc.)
  - Bearer token authentication with localStorage
  - Automatic retry logic for failed requests

---

## Key Data Models

### CharacterProfile (CharacterOS)
```typescript
{
  character_id: string;
  project_id: string;
  canonical_facts: string[];     // What they know from manuscript
  personality_data: {
    traits: string[];             // Psychological profile
    tone: string;                  // Speech style
    humor_level: 0.0-1.0;
    empathy: 0.0-1.0;
  };
  speech_patterns: {
    formality: 0.0-1.0;
    avg_sentence_length: number;
    uses_contractions: 0.0-1.0;
  };
  canon_scope: {
    chapters: number[];            // Spoiler protection
    omniscient: boolean;
  };
  voice_binding: {
    voice_id: string;              // Marvox voice (from the voice catalog)
    provider: "marvox";
  };
}
```

### CanonIndex Chunk
```typescript
{
  id: string;
  project_id: string;
  chunk_text: string;
  chunk_type: "dialogue" | "scene" | "chapter_summary" | "narration";
  chapter_number: number;
  character_ids: string[];
  embedding_id: string;            // Vector DB reference
  metadata: {
    speaker?: string;
    emotional_tone?: string;
  };
}
```

---

## Security Architecture

### Authentication
- Bearer token authentication (JWT-like)
- Token stored in localStorage (frontend)
- Token validated on every API request
- Logout clears localStorage

### Protected Routes
- **JWT Bearer Auth**: required for most `/api/*` routes
- **Input Sanitization**: applied on select add-on routes
- **Rate Limiting**: available in `backend/security_middleware.py` and used by specific endpoints
- **SQL Injection**: parameterized queries via Pydantic validation

### Security Headers
- `X-Frame-Options: DENY` - Prevent clickjacking
- `Content-Security-Policy` - XSS prevention
- `X-Content-Type-Options: nosniff` - MIME sniffing prevention
- `Referrer-Policy: strict-origin-when-cross-origin`
- `CORS`: No wildcard origin; explicit allowlist

---

## Performance Architecture

### Request Monitoring
- **Per-endpoint latency tracking** - Millisecond precision
- **Slow query detection** - Threshold: 500ms
- **Request lifecycle logging** - Entry/exit times

### Caching Strategy
- **Redis/Dragonfly-compatible cache** — Rate limiting, job queues, session cache
- **Character profiles** cached after build (TTL-based)
- **Analysis results** cached by project_id

### Database Performance
- **PostgreSQL + pgvector**: Connection pooling (asyncpg), prepared statements
- **Vector index**: pgvector in PostgreSQL (same connection pool, no separate service required)

### Metrics Endpoints
- `GET /metrics` - Prometheus metrics (when enabled)
- `GET /api/health` - Liveness
- `GET /api/health/ready` - Readiness gate

---

## Deployment Architecture

### Environment Tiers

**Development**
- PostgreSQL + Redis via Docker Compose (local)
- pgvector extension for vector search
- Inference provider (real inference)
- Localhost frontend/backend

**Staging**
- Vercel preview deployment (frontend)
- Railway staging backend
- PostgreSQL + pgvector (Railway managed)
- Inference provider (real inference)

**Production**
- Vercel (frontend — the only supported browser-facing surface)
- Railway (backend FastAPI + Python runtime)
- PostgreSQL + pgvector (Railway managed)
- Redis/Dragonfly-compatible cache (Railway or managed Redis)
- Inference provider (with rate limiting)

### Supported Infrastructure
```
Frontend:  Vercel only (production), Vercel preview (staging)
Backend:   Railway only (production + staging)
Database:  PostgreSQL + pgvector (all environments)
Cache:     Redis / Dragonfly-compatible (all environments)
Docs:      Netlify (marvox-docs.netlify.app)
```

---

## Agent Architecture (CharacterOS)

### 6 Core Agents

1. **ReaderAgent** - Story Q&A with citations
   - Semantic search over canon
   - Returns relevant chunks + chapter citations
   - Maintains context across queries

2. **CharacterAgent** - Character chat (canon-locked)
   - RAG-enhanced with character profile
   - Mode system: CANON|CANON+INFER|BRANCH|WRITER_ROOM
   - Enforces canon scope (spoiler protection)
   - Personality-consistent responses

3. **WriterAgent** - Multi-character scene generation
   - Takes 2-5 character IDs + prompt
   - Generates dialogue with proper formatting
   - Maintains character voice consistency
   - Outputs: NARRATOR: [description] + dialogue blocks

4. **ContinuityAgent** - Canon validation
   - Reviews generated scenes for contradictions
   - Checks trait consistency, timeline accuracy
   - Detects spoiler leakage (future knowledge)
   - Returns severity + revision feedback

5. **DirectorAgent** - Scene direction application
   - Applies mood (dramatic, comedic, tense, romantic)
   - Adjusts pacing (fast, moderate, slow)
   - Controls intensity (0.0-1.0 scale)
   - Injects scene direction into WriterAgent prompt

6. **NarratorAgent** - Narrative framing
   - Adds scene setting and transitions
   - Applies author's writing style (from analysis)
   - Smooths dialogue with atmospheric details
   - Creates seamless scene flow

### RAG (Retrieval Augmented Generation) System

**Indexing**:
- Dialogue chunks (highest priority for character interactions)
- Chapter summaries (quick context)
- Scene chunks (narrative grounding)
- Narration chunks (fallback)

**Retrieval**:
- Semantic search via pgvector cosine similarity (the embedding model, 1536 dims)
- Optional chapter filtering (canon scope)
- Optional character filtering (dialogue)
- Top-K ranking by relevance

**Safety**:
- Chunks wrapped in `[STORY EXCERPT]` blocks
- System prompt blocks prompt injection
- Retrieved text treated as content, never as instructions

---

## Data Flow Example: Scene Generation

```
User Input: "Write a scene between Alice and Mad Hatter"
     │
     ▼
WriterAgent loads character profiles + director controls
     │
     ▼
RAG retrieves past Alice-Hatter interactions from canon
     │
     ▼
Frontier LLM generates scene with dialogue
     │
     ▼
ContinuityAgent validates for contradictions
     │
     ├─ If passed: Store in character memory → Return scene
     │
     └─ If failed: Get revision feedback → Retry WriterAgent
                                                │
                                                └─ Store in memory → Return
```

---

## Performance Targets (Actual vs Target)

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| CharacterOS Build | <30s | ~6s | Exceeds |
| Character Chat | <2s | ~1.8s | Exceeds |
| RAG Retrieval | <200ms | ~120ms | Exceeds |
| Scene Generation | <5s | ~4.2s | Exceeds |
| Audio Generation | <10s | ~8.5s | Exceeds |
| API Response (avg) | <500ms | ~250ms | Exceeds |

---

## Related Documentation

- **[README.md](./README.md)** - Project overview and quick start
- **[FEATURES.md](./FEATURES.md)** - Detailed feature descriptions
- **[docs/API.md](./docs/API.md)** - API endpoint reference
- **[AGENTS.md](./AGENTS.md)** - CharacterOS agent specifications
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Development guidelines

---

**Last Updated**: May 2026 (synced to CyKiller/MarvoxV1 `main`)
**Status**: Private beta / active production hardening
