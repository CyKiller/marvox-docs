# Changelog

All notable changes to Marvox are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) · Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

---

## [1.4.0] — Phase 4: API Key Management & Character Reflection (2026-03-19)

### Added
- **API Key Management** — Programmatic access to Marvox without user credentials.
  - `POST /api/billing/api-keys` — Create long-lived API keys (SHA256-hashed, one-time display).
  - `GET /api/billing/api-keys` — List keys with prefix, last-used audit trail.
  - `DELETE /api/billing/api-keys/{key_id}` — Soft-revoke a key immediately.
  - Keys use `Authorization: Bearer mrvx_...` — identical to JWT bearer flow.
  - Schema: migration `0011` — `api_keys` table with indexes on `project_id`, `key_hash`, `is_active`.
- **Character Reflection** — Automatic memory-driven personality evolution.
  - `POST /api/characteros/projects/{id}/characters/{char_id}/reflect` — Manual trigger.
  - Nightly automatic reflections at 02:00 UTC via background scheduler.
  - Produces: reflection text, emotional arc trend (improving / stable / declining), saved memory ID.
  - Error codes: `REFLECT_FAILED`, `REFLECT_NO_MEMORIES`.
- **OpenAI Cost Tracking** — `OPENAI_API_USAGE_WARNING_THRESHOLD` env var alerts when costs exceed the configured percentage (default: 80%).

### Changed
- `DEPLOYMENT.md` — Updated required Railway env vars to include Phase 4 additions.

---

## [1.3.0] — Phase 3: Collaboration & Character Participants (2026-02-20)

### Added
- **CharacterParticipantManager** — Characters react to `SCENE_COMPLETE` events in real-time via WebSocket broadcasts (event type: `CHARACTER_REACTION`).
- Reactions are generated in parallel (semaphore = 3) using `CharacterAgent.chat(mode=WRITER_ROOM)`.
- Memory persistence for character reactions via `MemoryBridge` (non-blocking — failures do not block reactions).
- **EmotionalArcEvolverAgent** — Evolves character personality from accumulated reactions.
- **ConsensusAnalyzerAgent** — Detects conflicting character portrayals across multiple writers.
- `ReactionAudioStreamAgent` — Live audio streaming for character reactions in collaboration sessions.

### Fixed
- Circular import in `collab_routes.py` — now uses lazy initialization for `CharacterParticipantManager`.

---

## [1.2.0] — Phase 2: Audio Pipeline (2026-02-01)

### Added
- **8-step audio production pipeline** (`AudioPipelineOrchestrator`):
  1. Parse scene dialogue blocks.
  2. Resolve character voices via `VoiceSelectionAgent`.
  3. Configure per-character TTS params via `VoiceConfigurationAgent` (300+ configs; speed 0.25×–4.0×).
  4. Per-line emotion detection (`AudioSceneAgent`).
  5. TTS generation (parallel with `asyncio.Semaphore(5)` to prevent OOM).
  6. Audio composition and mixing via `pydub`.
  7. 5-layer audio QA via `AudioContinuityAgent`.
  8. Store to Vercel Blob; fall back to local file storage in dev.
- **VoiceCloningAgent** — Neural voice DNA cloning.
- **DNALearningEngine** — Evolves voice DNA when overall quality score ≥ 85 %.
- **VoiceVault** — IP-locks Voice DNA to project/org boundaries (signed binding).
- `AudiobookOrchestrator` — Full audiobook production from project canon.

---

## [1.1.0] — Phase 1: CharacterOS Agent Network (2026-01-25)

### Added
- **19-agent CharacterOS network** orchestrated by `AgentRuntime` singleton.
- **Content generation agents**: `CharacterAgent`, `WriterAgent`, `ReaderAgent`, `NarratorAgent`.
- **Quality agents**: `ContinuityAgent` (5-layer validation), `DialogueQualityAgent`, `EmotionalBeatAnalyzer`, `ScenePacingOptimizer`.
- **Supporting agents**: `DirectorAgent`, `SummarizationAgent`, `AtmosphereAgent`, `QualityAnalysisAgent`.
- **3-pass scene generation**: WriterAgent → ContinuityAgent (fast) → optional 1 revision → ContinuityAgent (full) → NarratorAgent → ContinuityAgent (warn-only).
- **4-mode system**: `CANON`, `CANON+INFER`, `BRANCH`, `WRITER_ROOM`.
- **RAG pipeline**: `CanonIndexer` with semantic search, chapter/character filters, and `CHAROS_RETRIEVAL_DEFAULT_TOP_K` tuning.
- **MemoryBridge** — Cross-agent character memory persistence with 90-day auto-pruning.
- **Prompt safety** — `sanitize_story_excerpts()` + `RAG_SAFETY_RULE` blocks prompt injection from story content.
- **Typed agent contracts** — all agent boundaries use `dump_validated()` / `validate_retrieved_chunks()`.
- **`@traced` telemetry** — structured span logs on all public agent methods.
- `EvalRecorder` — JSONL eval event log for agent decisions and latency.
- `RuntimePolicy.from_env()` — all `CHAROS_*` tuning knobs centralized.

### Infrastructure
- Upstash Vector as production vector backend (`VECTOR_DB_BACKEND=upstash`).
- ChromaDB for local development.
- `BatchEmbeddingService` — batched + cached embedding calls (4× faster than per-call).
- `IntegratedSecurityMiddleware` — CSRF, rate limiting, XSS sanitization.
- Stripe billing integration with webhook deduplication.

---

## [1.0.0] — MVP Foundation (2026-01-15)

### Added
- FastAPI backend on Railway (PostgreSQL + Redis).
- Next.js 14 frontend on Vercel.
- Manuscript upload and analysis pipeline (`.txt`, `.epub`, `.pdf`).
- Character extraction — up to 14+ characters per manuscript.
- AI-powered story analysis: summary, themes, dialogue patterns, publication readiness.
- 9-tab analysis dashboard with charts.
- JWT authentication, email verification, Google OAuth.
- Alembic-managed schema migrations (auto-run at Railway startup).
- Docker Compose for local development.


### Phase 3: Audio Pipeline (Target: 8 days)
- [x] Integrate OpenAI TTS
- [ ] Build multi-voice audio combining
- [ ] Add voice binding to characters
- [ ] Create `/audio` endpoint

### Phase 4: Frontend (Target: 13 days)
- [ ] Build CharacterOS Studio page
- [ ] Add Scene Simulator UI
- [ ] Implement mode selector (CANON/CANON+INFER/BRANCH)
- [ ] Add audio playback controls

---

## Archive

Historical progress reports moved to `archive_docs/`:
- DAY3_COMPLETE.md
- CHARACTEROS_DAY1_COMPLETE.md
- BACKEND_CONTRACT_FIXES_COMPLETE.md
- OPENAI_MIGRATION_COMPLETE.md
- And 15 other completion reports (see archive_docs/)
