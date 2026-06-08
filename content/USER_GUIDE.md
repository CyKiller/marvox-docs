# CharacterOS Studio — Workspace & Workflow Guide

Welcome to the Marvox Storyworld Production Studio operating manual. This guide walks the full workflow loop, from raw manuscript ingestion to professional, multi-voice synthesized audio.

The **Interactive Studio Simulator** above lets you step through each core stage in real time — toggle filters, adjust behavior settings, resolve simulated canon conflicts, and trigger voice synthesis. Every action mirrors a live capability of the CharacterOS API.

---

## Ingest & validate

Every storyworld begins with a written draft. The ingestion layer reads your manuscript, validates boundaries, and initializes a database project.

- **Supported formats**: UTF-8 Text (`.txt`), EPUB (`.epub`), PDF (`.pdf`), Microsoft Word (`.docx`), and Rich Text Format (`.rtf`).
- **Upload limit**: Governed by `MAX_UPLOAD_MB` (default **100 MB**). Oversized uploads are rejected by the pre-validation middleware before consuming server memory.
- **Project scope**: Each upload provisions a clean workspace record backed by PostgreSQL.

> [!TIP]
> **Try it**: Switch to the **`READ`** tab in the simulator above. Hover highlighted entities (like **White Rabbit**) to inspect the character profile cards extracted during analysis.

---

## Analyze the storyworld

Once a manuscript is ingested, Marvox launches the **Progressive Analysis Engine** as an asynchronous background task.

1. **Fact extraction** — locates lore, locations, historical events, and objects.
2. **Character profiling** — extracts major and minor characters, physical descriptions, relationships, and behavioral traits.
3. **Timeline synthesis** — reconstructs a sequential chronicle of plot events.
4. **Story graph** — wires character interaction nodes and thematic transitions into a unified narrative network.

### Operational safety gates

To prevent lockups from frozen upstream dependencies, two background maintenance loops run continuously:

- **Stale job scan** — every 30 minutes (`STALE_JOB_SCAN_INTERVAL_SECONDS` = `1800`).
- **Stale analyzing window** — any job stuck in `ANALYZING` for more than **2 hours** (`STALE_ANALYZING_HOURS` = `2`) is marked `FAILED`. Re-run with `POST /api/projects/{project_id}/re-analyze`.

---

## Bootstrap CharacterOS

With analysis complete, the storyworld loads into **CharacterOS** — the canon-grounded runtime that governs character dialogue, memory, and interaction.

### Grounding index & vector retrieval

CharacterOS uses the PostgreSQL **`pgvector`** extension for semantic retrieval.

- During bootstrap, extracted canon and facts are chunked, embedded, and indexed in pgvector.
- In production, Marvox runs **primary-backend mode**: pgvector retrieval must be healthy and active. Fallbacks are prohibited in production to guarantee literary consistency.

> [!TIP]
> **Try it**: Switch to the **`GROUND`** tab to test grounded Q&A. Click the bottom pill filters (`Grounded Q&A`, `Story answer`, `Evidence in view`) to watch evidence citations highlight inside the reply panel.

### Scoped operating modes

Character behavior is governed by four runtime modes:

- **`CANON`** *(strict)* — bounded strictly by canonical facts. If a topic is undocumented, the character says it does not know.
- **`CANON+INFER`** *(safe inference)* — bounded by canon with a limited degree of safe inference. Recommended for story-agnostic personas executing commercial tasks in a character's voice.
- **`BRANCH`** *(creative)* — intentionally allowed to diverge from canon for "what-if" alternate timelines.
- **`WRITER_ROOM`** *(creative orchestration)* — configured for collaborative scene synthesis where agents co-write dynamically.

> [!TIP]
> **Try it**: Switch to the **`BUILD`** tab. Toggle between **`CANON`** and **`BRANCH`** to see CharacterOS adjust response constraints instantly.

---

## Compose scenes & collaborate

Scene generation is the orchestrational heart of CharacterOS Studio, letting multiple writers — or automated agents — co-create rich dialogue.

### Structural boundaries

- **Character limit** — scene generation is capped at **5 characters** (`CHAROS_MAX_SCENE_CHARACTERS` = `5`). Requests beyond five are blocked at the gateway.
- **Director controls** — directing variables shape output:
  - `mood`: Dramatic, Comedic, Tense, Romantic, or Neutral.
  - `pacing`: Slow (detailed exposition) to Fast (punchy, action-heavy lines).
  - `intensity`: `0.0` (calm) to `1.0` (climactic).

### Real-time collaboration & continuity

Writers join active co-writing workspaces over WebSockets:

- **Socket path**: `ws://your-domain/api/characteros/projects/ws/{project_id}/collab/{session_id}`
- As a scene streams, generated dialogue is checked against the project's pgvector canon. On commit, the `ContinuityAgent` runs a full validation pass.
- If an inconsistency is detected, the status badge transitions `VALID → CONFLICT` and generation pauses for a resolution:
  - **Fix scene** — pause the stream and edit the text manually.
  - **Accept** — accept the contradiction (creates a branching timeline).
  - **Revise** — auto-rewrite the line to align with canon, then resume.

> [!TIP]
> **Try it**: Switch to the **`REVIEW`** tab and click **Start Real-Time Stream** to watch co-writing token streaming. The system triggers a continuity breach when Alice references the rose garden prematurely — click **Revise** to see auto-recovery.

---

## Synthesize voices

Once a scene is written and committed to canon, it passes to the multi-voice audio pipeline.

- **Speech DNA** — every character profile carries voice settings like `speed` (e.g. `1.05`) and `emotion` (e.g. `dramatic`) that mold synthesis.
- **Prosody performance** — the `ProsodyPerformanceAgent` reads exclamation marks, question marks, and emotional cues to modulate pitch, stability, and pauses.

> [!TIP]
> **Try it**: Switch to the **`HANDOFF`** tab and click **Generate Audio Pipeline** to watch the 8-step synthesis run, animate live soundwaves, and compile a finalized package.

---

## Export & store

The final stage compiles and bundles your storyworld assets for distribution.

In development, audio packages may fall back to local folders. In production, Marvox enforces strict **fail-closed** rules:

- **Strict blob mode** — enabled automatically in production (`AUDIO_BLOB_STRICT` = `auto`).
- **Behavior** — if cloud blob storage (`BLOB_READ_WRITE_TOKEN`) is expired or unreachable, the generator raises a hard `503` instead of falling back to local file storage. Every commercial asset is guaranteed to persist in the cloud.

---

## Success checklist

To verify your storyworld is operating cleanly inside CharacterOS:

- [ ] **Ingestion** — manuscript uploaded (`POST /api/projects/upload-manuscript`) under the 100 MB limit.
- [ ] **Analysis** — progressive analysis reaches `SUCCESS` (poll `GET /api/jobs/{job_id}`).
- [ ] **Bootstrap** — character profiles and memories indexed in pgvector.
- [ ] **Scene** — scenes generate cleanly with continuity validation passing.
- [ ] **Audio** — multi-voice audio returns a valid cloud-hosted `audio_url`.
- [ ] **Export** — the audiobook or scene package compiles without storage interruptions.
