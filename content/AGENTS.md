# CharacterOS Architecture

**Project**: Marvox v2 - Storyworld Production Studio  
**Purpose**: in-repo architecture and runtime guide for coding agents working in this codebase  
**Source of truth**: the implementation in `main.py`, `backend/`, `services/`, and tests always wins over this document

---

## Current Reality

Marvox is a Storyworld Production Studio built around CharacterOS. The backend is a FastAPI service with PostgreSQL as the production database, Redis for rate limiting and cache-backed workflows, Vercel Blob for production audio/object storage, and Upstash Vector for production character-memory retrieval.

The frontend is a Next.js app that talks to the Railway-hosted backend through `NEXT_PUBLIC_API_URL`. Stripe billing, email verification, CharacterOS chat, scene generation, collaboration, and audio workflows are all represented in the codebase today, but operational readiness still depends on environment configuration and release-gate verification.

This file intentionally does not store live tokens, deployment secrets, or provider credentials. Keep those in Railway, Vercel, Stripe, and local `.env` files, never in git.

---

## Product Thesis

Marvox is not just a TTS surface. CharacterOS is the canon-grounded runtime that powers:

1. Character chat constrained by canon scope and runtime mode.
2. Multi-character scene generation with continuity validation.
3. Storyworld memory, retrieval, and story-graph aware orchestration.
4. Audio and voice workflows layered on top of the same character and canon model.

Core principles preserved in code:

1. Retrieved canon is story content, never executable instruction text.
2. Character responses are scoped by canon awareness and mode.
3. Scene generation is bounded by configured character limits and continuity checks.
4. Production uses primary backends, not silent local fallbacks, for storage and vector retrieval.

---

## Runtime Contract

Production startup is gated by `backend/runtime_config.py`. In production, the backend expects these variables to be present and valid:

- `DATABASE_URL`
- `JWT_SECRET_KEY`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `FRONTEND_URL`
- `REDIS_URL`
- `CORS_ALLOWED_ORIGINS`
- `BLOB_READ_WRITE_TOKEN`
- `UPSTASH_VECTOR_REST_URL`
- `UPSTASH_VECTOR_REST_TOKEN`

Important implementation notes:

- PostgreSQL is the only supported production database.
- JWT secret resolution is compatible with `JWT_SECRET_KEY`, `SECRET_KEY`, `AUTH_SECRET`, and `NEXTAUTH_SECRET`, but production should still set `JWT_SECRET_KEY` explicitly.
- The OpenAI model is configured by `OPENAI_MODEL_NAME` and defaults to `gpt-4o-mini`.
- The frontend Stripe key is `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.

---

## Operational Env Knobs

These variables are implemented in code and already have defaults. Set them only when you want to override behavior:

| Variable | Default | Implemented Behavior |
| --- | --- | --- |
| `MAX_UPLOAD_MB` | `100` | Reject oversized manuscript uploads before reading into memory. |
| `CHAROS_MAX_SCENE_CHARACTERS` | `5` | Backend scene-generation limit. |
| `NEXT_PUBLIC_CHAROS_MAX_SCENE_CHARACTERS` | `5` | Frontend scene-selection limit shown in UI. |
| `STALE_JOB_SCAN_INTERVAL_SECONDS` | `1800` | Background scan cadence for stuck analyzing jobs. |
| `STALE_ANALYZING_HOURS` | `2` | Marks projects stuck in `ANALYZING` as failed. |
| `MEMORY_PRUNE_DAYS` | `90` | Deletes old character-memory rows. |
| `MEMORY_PRUNE_INTERVAL_SECONDS` | `86400` | Memory-pruning scheduler interval. |
| `MARVOX_EAGER_STORYWORLD_INIT` | auto | Forces or disables eager storyworld initialization at startup. |
| `MARVOX_STORYWORLD_INIT_TIMEOUT_SECONDS` | `30` in primary-backend mode, else `6` | Storyworld initialization timeout. |
| `AUDIO_BLOB_STRICT` | auto | Forces blob storage to fail closed instead of falling back to local files. |
| `SUPPORT_EMAIL` | `support@marvox.app` | Used in support/privacy surfaces and account recovery flow. |

Production already behaves strictly by default because `requires_primary_backends()` becomes true in production runtime.

---

## Service Initialization

Startup is split into two layers.

### Core Services

`main.py` initializes or schedules:

1. Runtime contract validation.
2. Redis connectivity.
3. Alembic migrations.
4. Auth table bootstrap.
5. Sentry backend setup.
6. Core service initialization through `ProjectManager(startup_profile="base")`.

Core services are responsible for:

- PostgreSQL-backed project management
- upload directory setup
- auth and quota plumbing
- storage backend resolution
- basic app readiness

### Storyworld Services

Storyworld-heavy services are initialized lazily on first use or eagerly at startup depending on runtime mode and `MARVOX_EAGER_STORYWORLD_INIT`.

The storyworld layer wires:

- `ProjectManager.ensure_storyworld_services()`
- `ProgressiveAnalysisEngine`
- `AgentRuntime`
- `MemoryBridge`
- `StoryGraphService`
- `WorldStateService`
- collaboration session recovery
- vector backend health checks

The important distinction is:

- base init gets the app safely booted
- storyworld init brings up the CharacterOS-heavy AI, retrieval, and orchestration path

---

## CharacterOS Runtime

`services/characteros/agent_runtime.py` is the central orchestrator. The runtime has expanded beyond the older fixed "19 agent" framing and now imports a broader catalog of agents and orchestrators.

Implemented families include:

### Core Text Agents

- `CharacterAgent`
- `ReaderAgent`
- `WriterAgent`
- `ContinuityAgent`
- `DirectorAgent`
- `NarratorAgent`

### Quality and Analysis Agents

- `DialogueQualityAgent`
- `EmotionalBeatAnalyzer`
- `ScenePacingOptimizer`
- `QualityAnalysisAgent`
- `SummarizationAgent`
- `AtmosphereAgent`
- `ConsensusAnalyzerAgent`
- `EmotionalArcEvolverAgent`

### Voice and Audio Agents

- `VoiceSelectionAgent`
- `VoiceConfigurationAgent`
- `VoiceAgent`
- `VoiceSafetyAgent`
- `ProsodyPerformanceAgent`
- `AudioSceneAgent`
- `AudioContinuityAgent`
- `AudioAgent`
- `ReactionAudioStreamAgent`
- `VoiceCloningAgent`
- `DNALearningEngine`
- `VoiceVault`

### Orchestrators and Runtime Services

- `AudioPipelineOrchestrator`
- `AudiobookOrchestrator`
- `ContextHydrationService`
- `MemoryBridge`
- `StoryGraphService`
- `WorldStateService`
- `RuntimePolicy`
- `EvalRecorder`
- `CharacterParticipantManager`

Do not assume every imported agent is eagerly instantiated. `AgentRuntime` keeps lazy agent storage and constructs many components only when first needed.

---

## Modes

Character-facing behavior is controlled by runtime mode.

| Mode | Meaning |
| --- | --- |
| `CANON` | strict canon-bounded behavior |
| `CANON+INFER` | canon-bounded with limited inference |
| `BRANCH` | intentionally non-canon or alternate outcomes |
| `WRITER_ROOM` | scene-generation mode for creative orchestration |

Legacy `canon_locked=true` maps to strict canon behavior.

---

## Request Flows

### Character Chat

High-level flow:

1. Resolve current project and character profile.
2. Retrieve canon and memory context.
3. Build a mode-aware system prompt.
4. Generate a response through the OpenAI service.
5. Persist memory and telemetry where applicable.

### Scene Generation

High-level flow:

1. Enforce project access and usage quota.
2. Validate character count using `CHAROS_MAX_SCENE_CHARACTERS`.
3. Retrieve context for selected characters.
4. Generate a draft with `WriterAgent`.
5. Run continuity validation and recovery handling.
6. Persist outputs and warnings.

### Audio Generation

The codebase contains a substantial audio pipeline:

1. Parse scene text into dialogue blocks.
2. Resolve voices and voice configuration.
3. Run TTS generation and audio composition.
4. Execute audio continuity and telemetry checks.
5. Persist output to blob-backed storage when configured.

Treat audio as implemented code, not just a planned phase, but verify production readiness against the current release gates before making launch claims.

---

## Data and Storage

### Relational Storage

Use the unified DB helpers from `services/db_utils.py`:

- `fetchone_unified`
- `fetchall_unified`
- `execute_unified`

Alembic owns relational schema changes. Runtime code should not invent parallel production schemas.

### Blob Storage

Blob storage resolves through `services/storage/blob_storage.py`.

- healthy blob backend -> use Vercel Blob
- unhealthy backend in strict mode -> raise hard failure
- unhealthy backend outside strict mode -> fall back to local file storage

In production, strict behavior is expected.

### Vector Retrieval

CharacterOS retrieval is backed by the canon indexer and vector backend. In production, the runtime expects the primary vector backend to be healthy and not in fallback mode.

---

## Billing, Auth, and Security

### Billing

- Stripe backend routes live under `/api/billing`.
- The webhook endpoint is `/api/billing/webhook`.
- Webhook signatures are verified with `STRIPE_WEBHOOK_SECRET`.
- In non-production only, the backend can fall back to unverified payload parsing when the webhook secret is unset.
- Billing webhook events are deduplicated in the database.

### Auth

- Auth routes live under `/api/auth`.
- JWT signing relies on the configured JWT-compatible secret chain.
- Email verification and account recovery flows exist in backend auth routes and services.
- Bootstrap account elevation is driven by email allowlists in env vars, not hardcoded assumptions about specific inboxes beyond explicit test-account logic.

### Middleware

`IntegratedSecurityMiddleware` handles:

- request security headers
- CSRF validation
- rate limiting hooks
- crash-guard behavior

`/api/billing/webhook` is intentionally exempt from CSRF checks.

### Secrets

Never put live provider tokens, Railway tokens, Vercel tokens, or Stripe secrets in this file or anywhere else in the repo.

---

## Observability and Background Work

Implemented recurring jobs include:

- stale analyzing job scanner
- memory pruning
- nightly reflection scheduler
- terminal job cleanup
- live voice session cleanup

Sentry backend initialization is defensive and skips invalid DSNs. The Next.js Sentry configs are simpler and should be treated carefully if using placeholder values like `disabled`.

---

## Testing Signals

This repo already contains tests that exercise important production behavior. Relevant examples include:

- auth flow and bootstrap behavior
- Stripe billing and webhook validation
- stale job scanning
- storyworld lazy initialization
- audio storage strictness
- CharacterOS persistence and profile scoping

When updating architecture-sensitive code, prefer running the tests closest to:

- `tests/test_runtime_config.py`
- `tests/test_stale_job_scanner.py`
- `tests/test_project_manager_lazy_storyworld_init.py`
- `tests/test_stripe_billing.py`
- `tests/test_audio_processor_storage_integration.py`

---

## Reference Files

Start here when auditing or extending CharacterOS:

- `main.py`
- `backend/runtime_config.py`
- `backend/project_routes.py`
- `backend/characteros_routes.py`
- `backend/billing_routes.py`
- `backend/auth_routes.py`
- `backend/security_middleware.py`
- `services/project_manager.py`
- `services/openai_service.py`
- `services/storage/blob_storage.py`
- `services/characteros/agent_runtime.py`

---

## Status

As of April 12, 2026, the codebase supports the CharacterOS runtime, scene generation, billing, auth, collaboration, and audio pipelines described above. This document intentionally avoids hard claims like "100% production ready" because actual launch readiness depends on environment correctness, upstream provider health, and release-gate results at deploy time.
