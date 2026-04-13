# System Architecture

Marvox is a full-stack AI platform for storyworld production. This document describes the system design, component interactions, and technology stack.

---

## 🏗️ System Overview

```
┌─────────────────┐           ┌─────────────────┐
│   Web Frontend  │◄────────►│   FastAPI       │
│  (Next.js 14)   │  HTTP/WS  │   Backend       │
│   29 Routes     │           │  (Python 3.11+) │
└─────────────────┘           └────────┬────────┘
       ▲                               │
       │                               ▼
       │        ┌──────────────────────────────┐
       │        │  CharacterOS Agent Network   │
       │        │  (25+ Agents + RAG System)   │
       │        └──────────────────┬───────────┘
       │                           │
       ▼                           ▼
   localStorage              ┌──────────────────┐
   (auth tokens)             │  PostgreSQL      │
                             │  (Projects, AI)  │
                             └────────┬─────────┘
                                      │
                                      ▼
                             ┌──────────────────┐
                             │  Upstash / CDB   │
                             │  (Vector Index)  │
                             └──────────────────┘
```

---

## 🔧 Backend Stack (Python/FastAPI)

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
- **OpenAI API** `1.51.0` - GPT-4o-mini inference, TTS audio generation
- **Provider Adapters** - Planned, not yet implemented in this branch
- **Sentence Transformers** `2.2.2` - all-MiniLM-L6-v2 (384D embeddings)
- **ChromaDB** - Local vector database (dev/staging)
- **Upstash Vector** - Serverless vector DB (production option)
- **PyTorch** `2.1.1` - Model inference engine
- **Transformers** `4.36.0` - Hugging Face model library
- **scikit-learn** `1.3.2` - ML utilities
- **NumPy** `1.24.4` - Numerical computing

### Document Processing
- **python-docx** `1.1.0` - DOCX file parsing
- **PyPDF** `3.17.4` - PDF extraction

### Audio Processing
- **pydub** `0.25.1` - Audio format conversion and mixing
- **OpenAI TTS** (`gpt-4o-mini-tts`) - 13 voice synthesis

### Security & Performance
- **Redis** - Required for rate limiting, caching, and background job queues
- **Custom Security Middleware** - CSRF/XSS/input sanitization, rate limiting guards (389 lines)
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
├── security_middleware.py   # CSRF/XSS/rate limiting (389 lines)
└── performance_monitoring.py # Metrics/health checks (370 lines)

services/
├── characteros/
│   ├── agent_runtime.py     # 6-agent orchestrator
│   ├── canon_indexer.py     # RAG semantic search
│   ├── character_agent.py   # Character chat
│   ├── writer_agent.py      # Scene generation
│   ├── continuity_agent.py  # Validation
│   ├── director_agent.py    # Scene direction
│   ├── narrator_agent.py    # Narrative framing
│   └── voice_selection_agent.py
└── openai_tts_service.py    # Multi-voice audio
```

---

## 🎨 Frontend Stack (Next.js/React)

### Core Framework
- **Next.js** `14.2.16` - React framework with App Router
- **React** `18` - UI component library
- **TypeScript** `5` - Strict type checking (enabled in build)

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

### Route Organization (29 Routes)
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
├── characters/page.tsx
└── test-components/page.tsx
```

### API Client Architecture
- **Unified API Client** (`lib/api-client.ts`)
  - Single gateway for all HTTP calls
  - Consistent error handling with recovery suggestions
  - Global error codes (RAG_TIMEOUT, CANON_VIOLATION, etc.)
  - Bearer token authentication with localStorage
  - Automatic retry logic for failed requests

---

## 🔗 Key Data Models

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
    voice_id: string;              // OpenAI voice (alloy, ash, etc.)
    provider: "openai";
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

## 🔐 Security Architecture

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

## ⚡ Performance Architecture

### Request Monitoring
- **Per-endpoint latency tracking** - Millisecond precision
- **Slow query detection** - Threshold: 500ms
- **Request lifecycle logging** - Entry/exit times

### Caching Strategy
- **In-memory cache** with TTL auto-expiration
- **Character profiles** cached after build (1 hour TTL)
- **Analysis results** cached by project_id

### Database Performance
- **PostgreSQL**: Connection pooling, prepared statements
- **Vector index**: ChromaDB (local) or Upstash (serverless)

### Metrics Endpoints
- `GET /metrics` - Prometheus metrics (when enabled)
- `GET /api/health` - Liveness
- `GET /api/health/ready` - Readiness gate

---

## 🚀 Deployment Architecture

### Environment Tiers

**Development**
- PostgreSQL database (local container or managed service)
- ChromaDB (local vector store)
- OpenAI API (real inference)
- Localhost frontend/backend

**Staging**
- PostgreSQL (Supabase or similar)
- Upstash Vector (serverless embeddings)
- OpenAI API (real inference)
- HTTPS domains

**Production**
- PostgreSQL (managed RDS or Supabase)
- Upstash Vector (high-availability)
- OpenAI API (with rate limiting)
- CDN for static assets
- Load balancer for API

### Infrastructure Options
```
Frontend: Vercel, Netlify, or self-hosted
Backend: Railway, Render, AWS Lambda, or self-hosted
Database: Supabase, Railway, AWS RDS, or self-hosted
Vector DB: Upstash, local ChromaDB, or Pinecone
```

---

## 📊 Agent Architecture (CharacterOS)

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
- Semantic search via sentence-transformers
- Optional chapter filtering (canon scope)
- Optional character filtering (dialogue)
- Top-K ranking by relevance

**Safety**:
- Chunks wrapped in `[STORY EXCERPT]` blocks
- System prompt blocks prompt injection
- Retrieved text treated as content, never as instructions

---

## 🔄 Data Flow Example: Scene Generation

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
OpenAI GPT-4o-mini generates scene with dialogue
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

## 📈 Performance Targets (Actual vs Target)

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| CharacterOS Build | <30s | ~6s | ✅ Exceeds |
| Character Chat | <2s | ~1.8s | ✅ Exceeds |
| RAG Retrieval | <200ms | ~120ms | ✅ Exceeds |
| Scene Generation | <5s | ~4.2s | ✅ Exceeds |
| Audio Generation | <10s | ~8.5s | ✅ Exceeds |
| API Response (avg) | <500ms | ~250ms | ✅ Exceeds |

---

## 🔗 Related Documentation

- **[README.md](./README.md)** - Project overview and quick start
- **[FEATURES.md](./FEATURES.md)** - Detailed feature descriptions
- **[docs/API.md](./docs/API.md)** - API endpoint reference
- **[AGENTS.md](./AGENTS.md)** - CharacterOS agent specifications
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Development guidelines

---

**Last Updated**: February 28, 2026  
**Version**: 1.0 (Stable)
