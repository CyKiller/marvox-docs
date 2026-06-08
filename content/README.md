# Marvox v2: Storyworld Production Studio

[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](#licensing)
[![Powered by CharacterOS](https://img.shields.io/badge/Powered%20by-CharacterOS-blueviolet.svg)](#-characteros-runtime)

**Turn a manuscript into a living storyworld.**

Marvox is a writer-first **Storyworld Production Studio** built around **CharacterOS**. The live product path in code is:

`homepage -> demo -> /projects/sample -> auth-preserved studio entry -> CharacterOS -> scene review -> audio handoff`

> "Canon-grounded means your characters will never spoil the story. They know only what they've experienced. They refuse to answer questions about future events. That's the Marvox promise." — Launch Brief

---

## Status

Current code-truth status:

- Writer-first public funnel with auth callback preservation
- Canon-grounded CharacterOS runtime
- Scene generation with continuity validation
- Downstream audio pipeline and voice identity path
- PostgreSQL-first orchestration with production-primary backend contracts
- Frontend release gate with bundle budgets plus deterministic Playwright verification

**See**: [AGENTS.md](./AGENTS.md) | [ARCHITECTURE.md](./ARCHITECTURE.md) | [START_HERE.md](./START_HERE.md)

## Source of Truth

The canonical source of truth for all production behavior, routes, schemas, and environment variables is the **CyKiller/MarvoxV1** private repository (the `main` branch). This documentation site reflects the current state of that repository. When in doubt, defer to the code.

- **App source**: `CyKiller/MarvoxV1` (private GitHub repo, `main` branch)
- **Docs site**: `marvox-docs` (deployed to [marvox-docs.netlify.app](https://marvox-docs.netlify.app) via Netlify)
- **Production status**: Private beta / active production hardening — not publicly GA

---

## Private Repo CI

GitHub Actions in this private repository are configured for a Linux self-hosted runner so normal CI does not depend on GitHub-hosted billing. Setup steps are in [SELF_HOSTED_RUNNER_SETUP.md](./SELF_HOSTED_RUNNER_SETUP.md).

---

## What is Marvox?

Marvox is **not** a generic TTS app. The codebase centers on a production workflow that keeps manuscript context intact as work moves downstream:

- manuscript upload and analysis
- CharacterOS build
- canon-grounded character and story interaction
- reviewed scene generation
- audio preview and downstream handoff

### The Problem We Solve
- Generic AI characters that spoil plot points
- Characters with no memory of previous dialogue
- Voice that changes every call (no identity)
- Scene generation that contradicts canon

### The Marvox Solution
- **Canon-Grounded**: Characters refuse spoilers. They only know their story arc.
- **Persistent Memory**: Characters remember conversations and scenes they participated in.
- **Voice Identity**: Each character has a persistent voice personality that evolves with their story.
- **Continuity Validation**: Scenes auto-revise if they contradict canon or character traits.

---

## CharacterOS Runtime

CharacterOS is the runtime layer behind the studio experience. The implementation includes canon retrieval, character chat, scene generation, continuity validation, and audio orchestration. Public release copy should describe the workflow and runtime behavior, not depend on a fixed public agent-count headline.

### 6 Text Agents (Orchestrated by AgentRuntime)

| Agent | Role | Input | Output |
|-------|------|-------|--------|
| **ReaderAgent** | Story Q&A with citations | User question + manuscript | Grounded answer + chapter references |
| **CharacterAgent** | Canon-locked character chat | Character ID + message + mode | Character response + citations |
| **WriterAgent** | Multi-character scene generation | 2-5 character IDs + prompt | Scene dialogue + stage directions |
| **ContinuityAgent** | 5-layer validation engine | Generated scene + canon | Pass/Fail + severity + revision feedback |
| **DirectorAgent** | Scene mood/pacing control | Mood + intensity + pacing | Enhanced writer prompt with direction |
| **NarratorAgent** | Narrative framing & transitions | Scene content + style | Prose-wrapped scene with atmosphere |

### 4 Audio Agents (Specialized for Voice Production)

| Agent | Role | Input | Output |
|-------|------|-------|--------|
| **VoiceSelectionAgent** | Map traits → voice | Character traits + personality | Best voice + alternatives |
| **VoiceConfigurationAgent** | Create voice configs | Personality data | 300+ configs (speed 0.25x–4.0x) |
| **AudioSceneAgent** | Per-block emotion detection | Scene text | Dynamic speed + emotion instructions |
| **AudioContinuityAgent** | 5-layer audio validation | Generated audio | Quality report + warnings |

### Four Operating Modes

```
CANON       → Strict source material only (character refuses spoilers)
CANON+INFER → Safe inference allowed (marks uncertainty)
BRANCH      → Creative freedom (alternate timelines)
WRITER_ROOM → Improv mode (multi-character invention)
```

---

## Quick Start (3 Minutes)

### Prerequisites
- Python 3.11+ (`python --version`)
- Node.js 20.9+, npm 10+ (`node --version`)
- Docker Desktop — required for local PostgreSQL + Redis (`docker --version`)
- OpenAI API key (`OPENAI_API_KEY` in `.env`)
- JWT secret (`JWT_SECRET_KEY` in `.env`)

### 1. Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
export OPENAI_API_KEY="sk-..."  # Add your key
export JWT_SECRET_KEY="change-me"

# Start backend (runs on :8000)
python main.py
```

### 2. Frontend Setup (New Terminal)
```bash
# Install Node dependencies
npm install

# Start frontend (runs on :3000)
npm run dev
```

### 3. Try It Out
```bash
# Register or demo-login to get a token
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"password","name":"You"}'

# Use the access_token from the response
export TOKEN="YOUR_TOKEN"

# Upload a manuscript
curl -X POST http://localhost:8000/api/projects/upload-manuscript \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Alice in Wonderland" \
  -F "description=Demo" \
  -F "file=@alice_in_wonderland.txt"

# Get project status
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/projects/{project_id}

# Build CharacterOS (30 seconds)
curl -X POST http://localhost:8000/api/characteros/projects/{project_id}/build \
  -H "Authorization: Bearer $TOKEN"

# Chat with a character
curl -X POST http://localhost:8000/api/characteros/projects/{project_id}/chat \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "character_id": "alice",
    "message": "Who are you?",
    "mode": "CANON"
  }'
```

**Frontend**: http://localhost:3000  
**API Docs**: http://localhost:8000/docs

---

## Core Features

### Real-Time Character Chat
- Canon-locked responses (spoiler protection)
- Context-aware with chapter citations
- Conversation memory persists across sessions
- Three interaction modes: CANON, CANON+INFER, BRANCH

### Multi-Character Scene Generation
- 2-5 character interactions in one scene
- Automatic continuity validation
- High-severity contradictions trigger auto-revision
- Character relationships maintained from canon

### Story Q&A with Grounding
- Answers cite specific chapters
- Retrieves relevant canon chunks via semantic search
- Confidence scores based on retrieval quality
- Supports manuscript exploration

### Multi-Voice Audio Production
- Each character bound to a Marvox voice + personality instructions
- Dynamic speed/emotion adjustment per dialogue block
- Narrator voice for scene framing
- 50–100ms silence padding for natural flow

### Continuity Validation Loop
- **Layer 1**: Trait consistency (character personality preserved)
- **Layer 2**: Relationship dynamics (respects canon bonds)
- **Layer 3**: Timeline coherence (chronological accuracy)
- **Layer 4**: Dialogue authenticity (matches speech patterns)
- **Layer 5**: Spoiler protection (no future knowledge)

---

## Architecture

### Backend (Python/FastAPI + AI Orchestration)
- **FastAPI** ≥0.104.1 — Async HTTP server
- **Python** 3.11+ — Type-safe async/await runtime
- **Frontier LLM** — LLM inference for all agents
- **Neural TTS engine** — Multi-voice audio synthesis
- **PostgreSQL + pgvector** — Vector embeddings, project data, and production storage (single backend, all environments)
- **Redis/Dragonfly-compatible cache** — Rate limiting, session cache, job queues
- **AgentRuntime** — Central orchestrator for CharacterOS agents

### Frontend (Next.js 16.x + React)
- **Next.js 16.x** — App Router, SSR (Node.js 20.9+, npm 10+; Marvox Core App only, Docs site uses Next.js 15.x)
- **React 18 + TypeScript 5**
- **Tailwind CSS + shadcn/ui**
- **Playwright** — E2E testing

### RAG System
- **Embeddings**: the embedding model (1,536 dims)
- **Storage**: PostgreSQL pgvector (local and production — no separate vector database required)
- **Chunk Types**: Dialogue (highest priority), chapter summaries, scene segments
- **Filtering**: Canon scope (chapter restrictions per character)

---

## Production API Endpoints

### CharacterOS Routes (`/api/characteros`)
- `POST /api/characteros/projects/{id}/build` — Index manuscript + extract profiles
- `POST /api/characteros/projects/{id}/chat` — Character chat with mode control
- `POST /api/characteros/projects/{id}/scene` — Generate multi-character scene
- `POST /api/characteros/projects/{id}/story-qa` — Grounded story Q&A
- `GET /api/characteros/projects/{id}/characters` — List character profiles
- `GET /api/characteros/projects/{id}/profile/{character_id}` — Single character detail
- `POST /api/characteros/projects/{id}/characters/{character_id}/interact` — Character interaction endpoint
- `GET /api/characteros/projects/{id}/characters/{character_id}/evolution-state` — Character arc + DNA state
- `POST /api/characteros/projects/{id}/characters/{character_id}/reflect` — Trigger character reflection
- `GET /api/characteros/projects/{id}/story-graph` — Entity relationships
- `GET /api/characteros/projects/{id}/timeline` — Event chronology
- `GET /api/characteros/projects/{id}/storyboard` — Scene cards for storyboard view

### Audio Routes (`/api/audio`)
- `POST /api/audio/characteros/projects/{id}/generate-audio-pipeline` — Multi-voice scene audio
- `POST /api/audio/characteros/projects/{id}/production-metrics` — Audio quality report

### Job Tracking (`/api/jobs`)
- `GET /api/jobs/{job_id}` — Check build/generation status
- `POST /api/jobs/{job_id}/cancel` — Cancel long-running task

---

## Testing & Validation

### Run Tests
```bash
# All tests (13 passing)
pytest tests/characteros/ -v

# Character chat RAG (canon scope enforcement)
pytest tests/characteros/test_character_chat_rag.py

# Scene generation + continuity
pytest tests/characteros/test_scene_generation.py

# Prompt injection defense
pytest tests/characteros/test_prompt_injection_defense.py
```

### E2E Test (Full Workflow)
```bash
# Upload → Build → Chat → Scene → Audio (end-to-end)
pytest tests/e2e/ -v
```

---

## Data Models

### CharacterProfile (Extracted)
```json
{
  "character_id": "uuid",
  "character_name": "Alice",
  "canonical_facts": ["Alice is curious", "She falls down rabbit hole"],
  "personality_data": {
    "traits": ["curious", "brave"],
    "tone": "informal",
    "empathy": 0.8
  },
  "canon_scope": {
    "chapters": [1, 2, 3, 5, 8],
    "omniscient": false
  },
  "voice_binding": {
    "voice_id": "marvox-voice",
    "provider": "marvox"
  }
}
```

### CanonIndex (RAG)
```json
{
  "id": "uuid",
  "chunk_text": "\"I can't go back to yesterday...\"",
  "chunk_type": "dialogue",
  "chapter_number": 5,
  "character_ids": ["alice_id"],
  "speaker": "Alice"
}
```

---

## Security & Privacy

- **Manuscript**: Encrypted in database, can be deleted on request
- **Embeddings**: PostgreSQL pgvector (same database as project data), deleted when project deleted
- **Model Training**: Data is NOT used to train external models
- **Access Control**: Private to project owner only
- **Rate Limiting**: Implemented on critical endpoints

---

## Deployment

### Development
```bash
python main.py  # Runs on localhost:8000
npm run dev     # Runs on localhost:3000
```

### Production Topology
```bash
FRONTEND_URL=https://<your-vercel-domain> \
BACKEND_URL=https://<your-railway-domain> \
./scripts/production-checklist.sh
```

- Frontend: Vercel
- Browser API surface: same-origin `/api/*` on Vercel
- Backend: Railway
- Staging: Vercel preview deployments + Railway staging backend

### Environment Variables (`.env`)
```
OPENAI_API_KEY=sk-...
OPENAI_MODEL_NAME=  # configures the language model
JWT_SECRET_KEY=change-me
DATABASE_URL=postgresql://marvox:marvox@localhost:5432/marvox
REDIS_URL=redis://localhost:6379/0
VECTOR_DB_BACKEND=pgvector
BLOB_READ_WRITE_TOKEN=your_blob_token  # optional local blob storage
```

---

## Documentation

| Document | Purpose |
|----------|---------|
| [AGENTS.md](./AGENTS.md) | Complete agent network reference + API surface |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design, tech stack, data flow |
| [START_HERE.md](./START_HERE.md) | First-time user walkthrough |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Developer setup and workflows |
| [docs/API.md](./docs/API.md) | OpenAPI-generated reference |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Supported deployment contract |
| [docs/DEPLOYMENT_RUNBOOK.md](./docs/DEPLOYMENT_RUNBOOK.md) | Production/staging operations |
| [docs/DEPLOYMENT_INVENTORY.md](./docs/DEPLOYMENT_INVENTORY.md) | Keep/rename/remove deployment artifact map |

---

## For Developers

### Adding a Character Agent Feature
1. Add method to `CharacterAgent` → [agent_runtime.py](./services/characteros/agent_runtime.py#L1)
2. Add Pydantic model to `characteros_routes.py`
3. Add HTTP route in FastAPI
4. Add TypeScript client in `lib/character-api.ts`
5. Write unit + E2E tests

### Adding a Continuity Check
1. Add validation method to `ContinuityAgent.validate()` → [continuity_agent.py](./services/characteros/continuity_agent.py)
2. Return `{passed, severity, warnings, fail_reasons}`
3. Test in `test_continuity_agent.py`

### RAG Modifications
1. Edit `CanonIndexer.retrieve_*()` methods → [canon_indexer.py](./services/characteros/canon_indexer.py)
2. Update filtering logic (chapters, characters, types)
3. Test with `test_character_chat_rag.py`

### Vector Backup / Restore

Vectors are stored in PostgreSQL (pgvector). Back up and restore the `canon_index` table using standard PostgreSQL tools:

```bash
pg_dump --table=canon_index $DATABASE_URL > canon_index_backup.sql
psql $DATABASE_URL < canon_index_backup.sql
```

---

## Tech Stack

### Python
- fastapi ≥0.104.1, uvicorn 0.24.0 — async web server
- AI SDK — LLM + TTS
- asyncpg 0.29.0 + SQLAlchemy 2.x — async PostgreSQL access
- pgvector (via PostgreSQL) — vector search
- scikit-learn, numpy — ML utilities
- ruff, mypy — linting and type checking

### Node/Frontend
- next 16.x (Marvox Core App) / next 15.x (Docs Site), react 18, typescript 5
- node 20.9+, npm 10+
- tailwindcss, shadcn/ui — components
- playwright — E2E testing

---

## Licensing

**Marvox v2 is released under a Proprietary License** (not open source).

```
© 2026 Marvox AI. All rights reserved.
Licensed for evaluation and demonstration purposes only.
Unauthorized copying, modification, or distribution prohibited.
For commercial licensing, contact licensing@marvox.ai
```

### Why Proprietary?
- **IP Protection**: Protects marvox's acquisition value
- **Scarcity Signal**: Signals exclusivity for potential buyers
- **Licensing Revenue**: Enables monetization if bootstrapping continues
- **Post-Acquisition Optionality**: New owner can change to open source if desired

---

## FAQ

**Q: Will my manuscript be used to train models?**  
A: No. Data is private to your project only and never used for external model training.

**Q: Can characters spoil the story?**  
A: No. Mode=CANON enforces strict canon scope. Characters refuse questions about chapters they haven't experienced.

**Q: What's the cost?**  
A: Transparent pricing: inference provider API calls billed at cost (typically $0.0002/character chat).

**Q: Can I self-host?**  
A: Local development is supported. The only supported deployed topology in this repo is Vercel for the frontend plus Railway for the backend. See [DEPLOYMENT.md](./DEPLOYMENT.md).

**Q: When will this be open source?**  
A: Post-acquisition, the new owner may choose to open source it. For now, it's proprietary.

---

## Support

- **Docs**: [START_HERE.md](./START_HERE.md)
- **Issues**: GitHub Issues (for evaluation users)
- **Email**: support@marvox.ai

---

**Marvox v2 — The storyworld production studio for the AI era.**  
*Where characters remember. Where canon matters. Where voice has memory.*
