# Docs Drift Audit — 2026-06-27

**Scope:** `cykiller/marvox-docs` (public documentation site) audited against the
`CyKiller/MarvoxV1` code and contract tests as the source of truth.
**Method:** Code/contract files were read directly; every "Code truth" line below cites a
real file + symbol. Per the Marvox engineering rule, code and contract tests win over docs.
**Nature of this document:** Advisory only. **No documentation pages were edited.** This
report names each stale page and the exact correction to apply later.

## Verdict

Yes — the docs need updating. The published docs are **accurate but materially
incomplete** in two release-sensitive areas (upload + export formats), and miss two
medium items (voice catalog, API versioning). Nothing advertises a capability the code
*lacks* — the drift is **understatement**, so users currently see fewer capabilities than
the product actually ships.

| # | Finding | Severity | Primary pages |
|---|---------|----------|----------------|
| 1 | Export formats understated (19 shipped, 3 documented) | **High** | `content/CHANGELOG.md`, `content/USER_GUIDE.md`, `content/README.md`, `content/API.md` |
| 2 | Upload formats understated (8 accepted, 5 documented) | **High** | `content/USER_GUIDE.md`, `content/README.md`, `content/API.md` |
| 3 | Voice catalog + default narrator undocumented | Medium | `content/AGENTS.md`, `content/USER_GUIDE.md`, `content/API.md` |
| 4 | API path versioning (`/api/v1`) not reflected | Medium | `content/API.md`, `content/ARCHITECTURE.md` |

---

## Finding 1 — Export formats are understated (HIGH)

**Code truth.** `backend/export_routes.py` → `SUPPORTED_EXPORT_TYPES` defines **19**
export types, frozen by `tests/test_export_contract.py`; the frontend mirror is
`lib/export-formats.ts` (frozen by `__tests__/lib/export-formats.test.ts`). The Pro-gated
subset is `PREMIUM_EXPORT_TYPES` (9 of the 19); the other 10 are Free.

| Category | Format (label) | Backend id | Tier |
|----------|----------------|------------|------|
| Text | PDF | `text_pdf` | Pro |
| Text | Word (.docx) | `text_docx` | Pro |
| Text | EPUB | `text_epub` | Pro |
| Text | Final Draft (.fdx) | `text_fdx` | Pro |
| Text | Fountain | `text_fountain` | Free |
| Text | Markdown | `text_md` | Free |
| Text | RTF | `text_rtf` | Free |
| Audio | MP3 | `audio_mp3` | Pro |
| Audio | WAV | `audio_wav` | Pro |
| Audio | FLAC | `audio_flac` | Pro |
| Data | Character JSON | `json_characters` | Pro |
| Data | VoiceDNA JSON | `json_voicedna` | Pro |
| Data | Canon graph CSV | `csv_canongraph` | Free |
| Data | Dialogue CSV | `csv_dialogue` | Free |
| Data | Dialogue XLSX | `xlsx_dialogue` | Free |
| Data | HTML | `html_story` | Free |
| Interchange | XLIFF localization | `xliff_localization` | Free |
| Interchange | SRT subtitles | `srt_subtitles` | Free |
| Interchange | Yarn game dialogue | `json_yarn` | Free |

**What the docs say.** `content/CHANGELOG.md` (v1.5.0) is the only place the export set is
enumerated, and it lists just three:

> **Production-grade exports** — Real Fountain (`.fountain` screenplay), localization
> (XLIFF 1.2), and subtitle (SRT) exports via `/api/projects/{project_id}/export/{export_type}` …

`content/USER_GUIDE.md` ("Export & store") describes packaging/blob behavior but never
lists the available export formats at all.

**Recommended correction.**
- In `content/USER_GUIDE.md`, add an "Export formats" subsection listing all 19 grouped by
  category (Text / Audio / Data / Interchange) with the Free vs Pro tier on each.
- In `content/CHANGELOG.md` v1.5.0, broaden the "Production-grade exports" entry to reflect
  the full set rather than three representative formats.
- In `content/README.md` and `content/API.md` (export section), align any export list to the
  19-format table above and document the Pro tier gate (HTTP 403 for premium types without a
  Pro subscription, per `export_routes.py` lines ~400–405).

---

## Finding 2 — Upload formats are understated (HIGH)

**Code truth.** `services/manuscript_storage.extract_text_from_bytes` accepts **8** formats,
frozen by `tests/test_upload_format_contract.py`; the frontend mirror is
`lib/upload-formats.ts` (`ACCEPTED_FILE_TYPES`, frozen by `__tests__/lib/upload-formats.test.ts`):

`.txt`, `.docx`, `.pdf`, `.epub`, **`.md` (Markdown)**, `.rtf`, **`.fdx` (Final Draft)**, **`.fountain`**

**What the docs say.** `content/USER_GUIDE.md` ("Ingest & validate"):

> **Supported formats**: UTF-8 Text (`.txt`), EPUB (`.epub`), PDF (`.pdf`),
> Microsoft Word (`.docx`), and Rich Text Format (`.rtf`).

Missing: **Markdown (`.md`)**, **Final Draft (`.fdx`)**, and **Fountain (`.fountain`)**.

**Recommended correction.**
- Update the USER_GUIDE "Supported formats" line to all 8 extensions.
- Apply the same correction anywhere `content/README.md` and `content/API.md` enumerate
  accepted upload formats.
- The `MAX_UPLOAD_MB` (100 MB) note is correct — keep it.

---

## Finding 3 — Voice catalog & default narrator undocumented (MEDIUM)

**Code truth.** `services/characteros/voice_utils.py` → `CANONICAL_AVAILABLE_VOICES` is the
single source of truth for the voice catalog (13 voices): `alloy, ash, ballad, cedar, coral,
echo, fable, marin, nova, onyx, sage, shimmer, verse`. The default narrator resolves to
`cedar` (`resolve_narrator_voice()`), and voices are assigned from gender/age pools with
trait overrides (`VOICE_POOL`, `TRAIT_VOICE_OVERRIDES`).

**What the docs say.** `content/AGENTS.md` / `content/USER_GUIDE.md` describe voices
generically ("Speech DNA", "300+ configs", "Marvox voice") but never list the canonical
catalog or name the default narrator. Audio/Voice is a release-sensitive contract, so the
catalog and default belong in the docs.

**Recommended correction.** Add a short "Voice catalog" subsection (likely in
`content/AGENTS.md` audio/voice section and/or `content/USER_GUIDE.md` "Synthesize voices")
listing the 13 canonical voices, the default narrator (`cedar`), and a one-line note that
casting is gender/age-aware with trait-based overrides. Reference `voice_utils.py` as the
source of truth so future edits stay anchored.

---

## Finding 4 — API path versioning not reflected (MEDIUM)

**Code truth.** `main.py` mounts the canonical API surface under **`/api/v1/...`** (with the
legacy unversioned `/api/...` also mounted for backward compatibility). CharacterOS
endpoints are canonically `/api/v1/characteros/...`; audio under `/api/v1/audio/...`.

**What the docs say.** `content/API.md` and examples elsewhere use unversioned paths such as
`/api/characteros/...` without noting that `/api/v1` is the canonical surface.

**Recommended correction.** In `content/API.md` (and the API overview in
`content/ARCHITECTURE.md`), state that `/api/v1` is the canonical versioned surface and that
unversioned `/api` paths are legacy aliases. When actioning, spot-check a few endpoint names
for drift while updating (e.g. the audio-generation endpoint name) against `main.py` and
`backend/*_routes.py`.

---

## Confirmed accurate — do NOT change

These were checked and match the code; flagging them so they are not "corrected" by mistake:

- **OpenClaw integration** (`content/docs/INTEGRATIONS.md`) — real and present:
  `backend/openclaw_webhook.py`, `backend/openclaw_character_bridge.py`,
  `services/openclaw_listener_daemon.py`.
- **pgvector** as the single production vector backend (no separate vector DB) — matches the
  CHANGELOG's historical migration note.
- **Deploy topology** — Vercel (frontend) + Railway/Docker (backend) + Netlify (docs);
  health check `/api/health/ready`; Alembic auto-migrate at startup — all match
  `vercel.json`, `railway.json`, `Dockerfile`.
- **Runtime/stack** — Next.js 16.x frontend, Node ≥20.9, Python 3.12 backend, Stripe billing,
  blob fail-closed (`AUDIO_BLOB_STRICT`) — match `package.json` / `Dockerfile` / `runtime_config.py`.
- **Workflow specifics** — 5-character scene cap (`CHAROS_MAX_SCENE_CHARACTERS=5`), stale-job
  scan (30 min), stale-analyzing window (2 h), 4 operating modes, API-key format `mrvx_…`,
  nightly reflection 02:00 UTC — all match the code.

---

## Action checklist (page → change → severity)

- [ ] `content/USER_GUIDE.md` — add full 19-format export list (with Free/Pro tiers); add
      `.md`/`.fdx`/`.fountain` to upload formats; add voice catalog + default narrator. **High**
- [ ] `content/CHANGELOG.md` — broaden v1.5.0 "Production-grade exports" to the full set. **High**
- [ ] `content/README.md` — align upload + export format lists to code. **High**
- [ ] `content/API.md` — align upload/export sections; note `/api/v1` canonical surface;
      document Pro export tier gate. **High/Medium**
- [ ] `content/AGENTS.md` — add canonical 13-voice catalog + default narrator. **Medium**
- [ ] `content/ARCHITECTURE.md` — note `/api/v1` as canonical API surface. **Medium**

## How to verify after applying fixes

1. Cross-check each documented list against the code constants:
   `backend/export_routes.py::SUPPORTED_EXPORT_TYPES` / `PREMIUM_EXPORT_TYPES`,
   `lib/export-formats.ts`, `lib/upload-formats.ts`,
   `services/characteros/voice_utils.py::CANONICAL_AVAILABLE_VOICES`.
2. In MarvoxV1, the contract tests that freeze these lists are
   `tests/test_export_contract.py` and `tests/test_upload_format_contract.py` — they are the
   canonical spec to diff documentation against in future audits.
3. Re-run this audit (code-first) after the doc edits to confirm zero remaining drift.
