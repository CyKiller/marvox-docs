# Changelog

All notable changes to the Marvox CharacterOS project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 🎯 GitHub Project Management (Jan 19, 2026)

**Added:**
- GitHub Project #26 created for MVP v2 tracking
- 4 Phase 1 RAG System issues created with detailed guidance:
  - Issue #4: Enhance retrieve_relevant_chunks() (CRITICAL)
  - Issue #5: Integrate RAG into CharacterAgent (CRITICAL)
  - Issue #6: Canon scope enforcement testing (HIGH)
  - Issue #7: RAG system documentation (MEDIUM)
- Custom labels: priority-critical, priority-high, priority-medium, backend, testing
- All issues linked to milestone v0.2.0 - RAG System (Due: Jan 21, 2026)
- Issues added to Project #26 board

**Links:**
- Project: https://github.com/users/CyKiller/projects/26
- Milestone: https://github.com/CyKiller/MarvoxV1/milestone/1
- Issues: https://github.com/CyKiller/MarvoxV1/issues?q=label%3Aphase-1-rag

---

### Added - CharacterOS MVP v2 (45% Complete)
- Automatic CharacterOS build pipeline during manuscript upload
- Character profile extraction (14 profiles from Alice in Wonderland)
- Canon index with 33-66 chunks stored with embeddings
- Granular progress tracking (Step 1/4, 2/4, 3/4, 4/4)
- Character chat endpoint `/api/characteros/projects/{id}/chat`
- CharacterOS status endpoint with real character/chunk counts
- PostgreSQL database with 4 CharacterOS tables:
  - `character_profiles` - Character personality and traits
  - `canon_index` - Story chunks with embeddings
  - `character_memories` - Conversation history
  - `story_graphs` - Character relationships

### Fixed
- **Critical**: Removed duplicate `run_full_analysis_pipeline` method that prevented CharacterOS from building
- **Critical**: Fixed 6 retrieval methods using deleted `self.get_db()`:
  - `get_character_profile()`
  - `get_character_profiles()`
  - `count_character_profiles()`
  - `count_canon_chunks()`
  - `get_story_graph()`
  - `save_character_memory()`
- Analysis pipeline now completes in ~6 seconds (was timing out at 60s)
- Project status updates with detailed completion messages
- Character chat endpoint corrected to `/api/characteros/projects/{id}/chat`

### Changed
- Updated status messages to show character and chunk counts
- Enhanced logging with emoji indicators for better visibility
- Project status now shows: "✅ Analysis complete: 14 characters, 66 canon chunks indexed"

### Testing
- ✅ `test_day4_complete.py` - All CharacterOS features validated
- ✅ `test_day4_integration.py` - Full upload → analysis → chat workflow
- ✅ `upload_and_test.py` - Background pipeline verification
- ✅ `test_build_direct.py` - Direct CharacterOS build validation

---

## [0.1.0] - 2025-01-18 - DAY 4 Complete

### Added
- Initial CharacterOS architecture based on AGENTS.md specification
- FastAPI backend with PostgreSQL database
- Next.js 14 frontend with TypeScript
- OpenAI GPT-4o-mini integration for AI analysis
- ChromaDB vector database for embeddings
- Upload and analysis pipeline

### Documentation
- Created AGENTS.md - Complete CharacterOS architecture guide
- README.md with setup instructions
- CONTRIBUTING.md guidelines
- SECURITY.md policies

---

## Roadmap

### Phase 1: RAG System (Target: 2 days)
- [ ] Implement `retrieve_relevant_chunks()` with semantic search
- [ ] Add canon scope filtering for spoiler protection
- [ ] Integrate RAG into character chat responses
- [ ] Test canon-locked character behavior

### Phase 2: Scene Generation (Target: 5 days)
- [ ] Implement WriterAgent for multi-character scenes
- [ ] Add ContinuityAgent for canon validation
- [ ] Create `/scene` endpoint
- [ ] Support 2-5 character scene generation

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
