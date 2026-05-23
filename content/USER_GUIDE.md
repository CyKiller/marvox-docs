# 🎬 CharacterOS Studio - Overall Workflow Guide

Welcome to the **Marvox Storyworld Production Studio** operating manual. This guide outlines the overall workflow loop—from raw manuscript ingestion to professional, multi-voice synthesized audio scene exports.

Whether you are a developer integrating programmatically via the **REST/WS API** or a creator working inside **CharacterOS Studio**, this guide serves as your end-to-end operational blueprint.

---

## 📺 THE SIX-PHASE PRODUCTION LOOP

The Marvox workspace operates on a circular narrative-and-audio production pipeline split into six distinct phases:

```
    ┌───────────────────────────┐
    │  1. MANUSCRIPT INGESTION  │ ◄── [TXT, EPUB, PDF, DOCX, RTF]
    └─────────────┬─────────────┘
                  ▼
    ┌───────────────────────────┐
    │ 2. STORYWORLD ANALYSIS    │ ◄── [Facts, Traits, Story Graph]
    └─────────────┬─────────────┘
                  ▼
    ┌───────────────────────────┐
    │  3. CHARACTEROS BOOTSTRAP │ ◄── [pgvector Index, Scoped Modes]
    └─────────────┬─────────────┘
                  ▼
    ┌───────────────────────────┐
    │ 4. SCENE & COLLABORATION  │ ◄── [WebSockets, Continuity Checks]
    └─────────────┬─────────────┘
                  ▼
    ┌───────────────────────────┐
    │ 5. AUDIO SYNTHESIS        │ ◄── [Speech DNA, Vocal Compositions]
    └─────────────┬─────────────┘
                  ▼
    ┌───────────────────────────┐
    │  6. PRODUCTION EXPORTS    │ ◄── [Audiobooks, Vercel Blob Assets]
    └───────────────────────────┘
```

---

## 🚀 PHASE 1: MANUSCRIPT INGESTION & PRE-VALIDATION

Every storyworld begins with a written draft. The ingestion layer reads your manuscript, validates boundaries, and initializes a database project.

### Ingestion Specifications
- **Supported Formats**: UTF-8 Text (`.txt`), Electronic Publications (`.epub`), Portable Document Format (`.pdf`), Microsoft Word (`.docx`), and Rich Text Format (`.rtf`).
- **File Upload Limits**: Managed by `MAX_UPLOAD_MB` (default is **100 MB**). Uploads exceeding this threshold are immediately rejected by the pre-validation middleware before consuming server memory.
- **Project Scope**: Each upload provisions a clean workspace record backed by PostgreSQL relational schemas.

### Primary API Interactions
- **Upload Endpoint**: `POST /api/projects/upload-manuscript` (Multipart Form Upload)
- **Parameters**: `file` (Binary), `title` (String), `description` (Optional String).
- **Behavior**: Returns a `200 OK` with an `InitialProjectResponse` containing the project's unique ID and the initial background analysis job ID.

---

## 🔍 PHASE 2: PROGRESSIVE STORYWORLD ANALYSIS

Once a manuscript is ingested, Marvox launches the **Progressive Analysis Engine** as an asynchronous background task. 

### The Analysis Pipeline
1. **Fact Extraction**: Locates occurrences of lore, locations, historical events, and objects.
2. **Character Profiling**: Extracts major/minor characters, physical descriptions, core relationships, and behavioral traits.
3. **Timeline Synthesis**: Reconstructs a sequential chronicle of plot events.
4. **Story Graph Generation**: Wires character interaction nodes and thematic transitions into a unified narrative network.

### Background Job States
The analysis job transitions through four standard states:
- `QUEUED`: Job is registered in PostgreSQL relational storage and awaiting processing thread allocation.
- `RUNNING`: The Progressive Analysis Engine is actively reading and extracting parameters.
- `SUCCESS`: Storyworld variables are successfully committed.
- `FAILED`: Job encountered a fatal validation error or pipeline exception.

### Operational Safety Gates
To prevent system lockups due to frozen upstream dependencies, Marvox enforces two background maintenance loops:
- **Stale Job Scan**: Runs every 30 minutes (`STALE_JOB_SCAN_INTERVAL_SECONDS` = `1800`).
- **Stale Analyzing Hours**: Any job stuck in the `ANALYZING` state for more than **2 hours** (`STALE_ANALYZING_HOURS` = `2`) is automatically declared dead and marked as `FAILED`. Users can subsequently invoke a re-run using the `POST /api/projects/{project_id}/re-analyze` endpoint.

---

## 🧠 PHASE 3: CHARACTEROS RUNTIME BOOTSTRAP

With analysis complete, the storyworld is ready to be loaded into **CharacterOS**—the canon-grounded runtime that governs character dialogue, memories, and interactions.

### Grounding Index & Vector Retrieval
CharacterOS relies on the PostgreSQL **`pgvector`** extension to power semantic retrieval. 
- During bootstrap, extracted canon materials and facts are split into text chunks, embedded, and indexed inside pgvector.
- In production runtime, Marvox operates in **primary-backend mode**, meaning pgvector retrieval must be healthy and active. Fallbacks are strictly prohibited in production to guarantee absolute literary consistency.

### Scoped Operating Modes
Character-facing behavior and response styles are managed by four runtime modes:
- **`CANON`** *(Strict)*: The character agent is strictly bounded by canonical facts. It will only speak on topics documented in the manuscript. If a topic is unmentioned, it states it does not know.
- **`CANON+INFER`** *(Safe Inference)*: Bounded by canon but allowed a limited degree of safe inference. Recommended for story-agnostic robotics personas (e.g., executing commercial tasks using a character's voice and personality archetype).
- **`BRANCH`** *(Creative)*: Intentionally allowed to diverge from canon, enabling "what-if" alternate timeline narratives.
- **`WRITER_ROOM`** *(Creative Orchestration)*: Configured specifically for creative scene synthesis where agents co-write dynamically.

### Developer API Endpoints
- **Chat Endpoint**: `POST /api/characteros/projects/{project_id}/chat`
- **Story Q&A**: `POST /api/characteros/projects/{project_id}/story-qa` (semantic RAG lookups via pgvector)
- **Profile Retreival**: `GET /api/characteros/projects/{project_id}/profile/{character_id}` (retrieves canonical facts, speech patterns, and voice DNA signatures)

---

## 🎭 PHASE 4: CREATIVE SCENE GENERATION & Real-Time Collaboration

Creative scene generation is the orchestrational heart of CharacterOS Studio. It allows multiple writers (or automated agents) to co-create rich dialogues.

### Structural Boundaries
- **Character Count Limit**: Scene generation is strictly capped at **5 characters** (`CHAROS_MAX_SCENE_CHARACTERS` = `5` and `NEXT_PUBLIC_CHAROS_MAX_SCENE_CHARACTERS` = `5`). Any request requesting more than 5 characters is blocked at the gateway level.
- **Director Controls**: Directing variables are fed to the orchestrator to shape the output:
  - `mood`: Dramatic, Comedic, Tense, Romantic, or Neutral.
  - `pacing`: Slow (detailed exposition) to Fast (punchy, action-heavy lines).
  - `intensity`: Slider from `0.0` (calm) to `1.0` (climactic).

### Real-Time WebSocket Collaboration
Writers can join active co-writing workspaces using standard WebSocket connections:
- **Socket Path**: `ws://your-domain/api/characteros/projects/ws/{project_id}/collab/{session_id}`
- As the orchestrating `WriterAgent` generates tokens, they stream in real-time (`word-by-word`) to all active collaborative sessions.

### Continuous Continuity Validation
While tokens are streaming, the backend runs an asynchronous background validation pass:
1. Every **100 tokens**, the `ContinuityAgent` checks the generated dialogue against the project's pgvector canon.
2. If an inconsistency is detected, the status badge transitions: `🟢 VALID` ──► `🔴 CONFLICT`.
3. The generation pauses, prompting the editor to choose a resolution:
   - **Fix scene**: Pause the stream, allowing writers to edit the scene text manually.
   - **Accept**: Accept the contradiction (this creates a branching narrative timeline).
   - **Revise**: Let the AI auto-rewrite the line to align with canon, then resume generation.

### Entity Merge Candidate Resolution
When progressive analysis extracts multiple character entities that might refer to the same individual (e.g., "Alice" and "Alice Liddell"), developers can list candidate matches via `GET /api/characteros/api/v2/projects/{project_id}/identity/candidates` and merge them programmatically via `POST /api/v2/projects/{project_id}/identity/merge` to ensure canon integrity.

---

## 🎙️ PHASE 5: AUDIO SYNTHESIS PIPELINE

Once a scene is written and committed to canon, it can be passed to the multi-voice audio rendering pipeline.

```
  ┌────────────────────────────────────────────────────────┐
  │ 1. Parse dialogue text block into individual speaker   │
  │    speech fragments.                                   │
  └───────────────────────────┬────────────────────────────┘
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │ 2. Retrieve character's voice bindings and Speech DNA  │
  │    (speed adjustments, emotional tone variables).      │
  └───────────────────────────┬────────────────────────────┘
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │ 3. Execute TTS audio synthesis with professional       │
  │    Prosody Performance adjustments.                    │
  └───────────────────────────┬────────────────────────────┘
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │ 4. Composite separate voice tracks, adjust timing,      │
  │    and upload to production-grade Vercel Blob storage. │
  └────────────────────────────────────────────────────────┘
```

### Vocal Variables & Configuration
- **Speech DNA**: Every character profile has unique voice settings like `speed` (e.g., `1.05`) and `emotion` (e.g., `dramatic`) that mold downstream text-to-speech rendering.
- **Prosody Performance**: The `ProsodyPerformanceAgent` checks for exclamation marks, question marks, and emotional indicators in the text to dynamically modulate pitch, vocal stability, and pauses.

### Primary API Interface
- **Audio Synthesis Endpoint**: `POST /api/audio/characteros/projects/{project_id}/generate-audio-pipeline`
- **Payload Structure**:
  ```json
  {
    "character_ids": ["alice", "queen"],
    "scene_text": "ALICE: Who are you?\nQUEEN: Off with her head!",
    "voice_assignments": {
      "alice": "alloy",
      "queen": "nova"
    },
    "director_controls": {
      "mood": "tense",
      "pacing": "moderate",
      "intensity": 0.8
    },
    "output_format": "mp3"
  }
  ```

---

## 📦 PHASE 6: PRODUCTION ASSET EXPORTS & STORAGE

The final phase compiles and bundles your storyworld assets for commercial distribution.

### Production Storage Resolution
In development, generated audio packages can fall back to local project folders. However, in production, Marvox operates under strict **fail-closed** rules:
- **Audio Blob Strict Mode**: Enabled automatically in production (`AUDIO_BLOB_STRICT` = `auto`). 
- **Behavior**: If the production Vercel Blob storage token (`BLOB_READ_WRITE_TOKEN`) is expired or unreachable, the audio generator will raise a hard failure (`503 Service Unavailable`) instead of falling back to insecure local file storage. This guarantees that all commercial assets are safely and securely persisted in the cloud.

### Audiobook Production
Developers can compile full manuscripts into standardized audiobook packages:
1. **Manifest Retrieval**: Query `GET /api/audiobook/manifest/{project_id}` to retrieve chapter definitions.
2. **Chapter Compilation**: Call `POST /api/audiobook/produce/{project_id}/{chapter_number}` to synthesize all dialogue in the chapter.
3. **Asset Exporting**: Execute `POST /api/audiobook/export/{project_id}` to gather all generated chapter audio files and compile a bundled commercial export package.

---

## 🛠️ SUCCESS CHECKLIST FOR CREATORS

To verify your storyworld is successfully operating within CharacterOS, ensure the following steps pass:

- [ ] **Ingestion**: Your manuscript is successfully uploaded (`POST /api/projects/upload-manuscript`) under the 100 MB limit.
- [ ] **Analysis**: Progressive analysis transitions to the `SUCCESS` state (poll `GET /api/jobs/{job_id}`).
- [ ] **Bootstrap**: Character profiles and memories are successfully index-mapped inside pgvector.
- [ ] **Scene Co-Creation**: Scenes generate cleanly (via UI or `/projects/{project_id}/scene`) with continuous validation passed.
- [ ] **Audio Pipeline**: Multi-voice audio generates and returns a valid cloud-hosted `audio_url`.
- [ ] **Export**: The completed audiobook or scene package compiles without storage pipeline interruptions.

**Happy co-creating! 🎬✨**
