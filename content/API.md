# Marvox API

Version: 1.0.0

This file is generated from `docs/openapi.json`. Do not edit manually.

## Authentication

Most `/api/*` endpoints require a Bearer token. Use `/api/auth/register` or `/api/auth/demo-login` to obtain a JWT, then send:

`Authorization: Bearer <token>`

## Error Responses

FastAPI error responses use one of these shapes:

- `{"detail": "message"}`
- `{"detail": {"error_code": "CODE", "message": "...", "recovery_suggestions": ["..."]}}`

CharacterOS endpoints standardize on the structured `detail` object with `error_code` and `recovery_suggestions`.

## Authentication

### POST /api/auth/account-recovery
Summary: Account Recovery
Submit an account recovery request (username/email help)
Authentication: Bearer token required

Request body:
- application/json — AccountRecoveryRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/auth/account-recovery" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AccountRecoveryRequest"}'
```

### GET /api/auth/db-status
Summary: Db Status
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/auth/db-status" \
  -H "Authorization: Bearer <token>"
```

### POST /api/auth/forgot-password
Summary: Forgot Password
Request a password reset link
Authentication: none

Request body:
- application/json — ForgotPasswordRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ForgotPasswordRequest"}'
```

### POST /api/auth/google/exchange
Summary: Exchange Google Token
Exchange a Google identity token for a Marvox JWT.
Authentication: none

Request body:
- application/json — GoogleExchangeRequest

Responses:
- 200 — Successful Response
- 200 schema: GoogleExchangeResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/auth/google/exchange" \
  -H "Content-Type: application/json" \
  -d '{"example": "See GoogleExchangeRequest"}'
```

### POST /api/auth/login
Summary: Login
Production login (PostgreSQL-only).
Authentication: none

Request body:
- application/json — LoginRequest

Responses:
- 200 — Successful Response
- 200 schema: AuthResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"example": "See LoginRequest"}'
```

### POST /api/auth/logout
Summary: Logout
Logout endpoint
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X POST "http://localhost:8000/api/auth/logout" \
  -H "Authorization: Bearer <token>"
```

### DELETE /api/auth/me
Summary: Delete Current User Account
Delete the authenticated user's account and all owned projects.
Authentication: Bearer token required

Request body:
- application/json — DeleteAccountRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X DELETE "http://localhost:8000/api/auth/me" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See DeleteAccountRequest"}'
```

### GET /api/auth/me
Summary: Get Current User Info
Get current user info from PostgreSQL.
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/auth/me" \
  -H "Authorization: Bearer <token>"
```

### PATCH /api/auth/me
Summary: Update Current User Info
Update account profile fields, password, and notification preferences.
Authentication: Bearer token required

Request body:
- application/json — AccountUpdateRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PATCH "http://localhost:8000/api/auth/me" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AccountUpdateRequest"}'
```

### POST /api/auth/onboarding-complete
Summary: Onboarding Complete
Persist onboarding selections and advance the user's workflow stage.
Authentication: Bearer token required

Request body:
- application/json — OnboardingCompleteRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/auth/onboarding-complete" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See OnboardingCompleteRequest"}'
```

### POST /api/auth/register
Summary: Register
Production registration (PostgreSQL-only).
Authentication: none

Request body:
- application/json — RegisterRequest

Responses:
- 200 — Successful Response
- 200 schema: AuthResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"example": "See RegisterRequest"}'
```

### POST /api/auth/resend-verification
Summary: Resend Verification Email
Resend verification email to user
Authentication: Bearer token required

Request body:
- application/json — ResendVerificationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/auth/resend-verification" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ResendVerificationRequest"}'
```

### POST /api/auth/reset-password
Summary: Reset Password
Reset password using a token
Authentication: none

Request body:
- application/json — ResetPasswordRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/auth/reset-password" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ResetPasswordRequest"}'
```

### POST /api/auth/signup
Summary: Register
Production registration (PostgreSQL-only).
Authentication: Bearer token required

Request body:
- application/json — RegisterRequest

Responses:
- 200 — Successful Response
- 200 schema: AuthResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/auth/signup" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See RegisterRequest"}'
```

### POST /api/auth/verify
Summary: Verify Email
Verify email using a token
Authentication: none

Request body:
- application/json — VerifyRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/auth/verify" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VerifyRequest"}'
```

## Projects

### GET /api/projects
Summary: List Projects
Authentication: Bearer token required

Parameters:
- limit (query, optional) — Limit
- offset (query, optional) — Offset
- sort_by (query, optional) — Sort By
- sort_order (query, optional) — Sort Order
- q (query, optional) — Q
- status (query, optional) — Status

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/batch-delete
Summary: Batch Delete Projects Route
Authentication: Bearer token required

Request body:
- application/json — BatchDeleteRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/batch-delete" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See BatchDeleteRequest"}'
```

### POST /api/projects/upload-manuscript
Summary: Upload Manuscript And Create Project
Authentication: Bearer token required

Request body:
- multipart/form-data — Body_upload_manuscript_and_create_project_api_projects_upload_manuscript_post

Responses:
- 200 — Successful Response
- 200 schema: InitialProjectResponse
- 400 — Bad Request
- 400 schema: ErrorResponse
- 401 — Unauthorized
- 401 schema: ErrorResponse
- 403 — Forbidden
- 403 schema: ErrorResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError
- 500 — Internal Server Error
- 500 schema: ErrorResponse

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/upload-manuscript" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See Body_upload_manuscript_and_create_project_api_projects_upload_manuscript_post"}'
```

### DELETE /api/projects/{project_id}
Summary: Delete Project Route
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X DELETE "http://localhost:8000/api/projects/project-demo" \
  -H "Authorization: Bearer <token>"
```

### GET /api/projects/{project_id}
Summary: Get Project Details Route
Returns a comprehensive dashboard response for the project, including:
- Basic metadata
- Core statistics
- Characters
- Detailed analysis results (if available)
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo" \
  -H "Authorization: Bearer <token>"
```

### PATCH /api/projects/{project_id}
Summary: Patch Project Metadata
Update editable project metadata such as title and description.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ProjectMetadataPatchRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PATCH "http://localhost:8000/api/projects/project-demo" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ProjectMetadataPatchRequest"}'
```

### GET /api/projects/{project_id}/activity
Summary: List Activity
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- limit (query, optional) — Limit
- since_timestamp (query, optional) — Since Timestamp

Responses:
- 200 — Successful Response
- 200 schema: Response List Activity Api Projects  Project Id  Activity Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/activity" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/{project_id}/activity
Summary: Create Activity
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ActivityRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Create Activity Api Projects  Project Id  Activity Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/activity" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ActivityRequest"}'
```

### POST /api/projects/{project_id}/analysis/recover
Summary: Recover Project Analysis
Dedicated recovery endpoint: atomically cancels any stuck/running analysis
jobs for *project_id*, resets the project back to ``uploaded``, and
immediately enqueues a fresh analysis job.

Unlike ``/re-analyze``, this route:
• Is available to any verified free-tier user (recovery is not a Pro feature).
• Accepts projects in ANY status (not just a fixed recovery-state whitelist).
• Returns the full recovery result dict so callers can inspect cancelled jobs.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/analysis/recover" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/{project_id}/audio
Summary: Generate Micro Audio
Generate professional audio for a specific manuscript snippet.
Used by the Micro-Director HUD in the Workbench.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — CharacterAudioGenerationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/audio" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CharacterAudioGenerationRequest"}'
```

### GET /api/projects/{project_id}/branches
Summary: Get Branches
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Branches Api Projects  Project Id  Branches Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/branches" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/{project_id}/branches
Summary: Upsert Branch
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — BranchRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Upsert Branch Api Projects  Project Id  Branches Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/branches" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See BranchRequest"}'
```

### GET /api/projects/{project_id}/chapters
Summary: Get Project Chapters Manifest Route
Returns the canonical chapter manifest for the project.
Used by the Audiobook Production workbench to track synthesis status and staleness.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/chapters" \
  -H "Authorization: Bearer <token>"
```

### GET /api/projects/{project_id}/characters
Summary: Get Project Characters Route
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/characters" \
  -H "Authorization: Bearer <token>"
```

### GET /api/projects/{project_id}/comments
Summary: Get Comments
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- artifact_id (query, optional) — Artifact Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Comments Api Projects  Project Id  Comments Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/comments" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/{project_id}/comments
Summary: Add Comment
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — CommentRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Add Comment Api Projects  Project Id  Comments Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/comments" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CommentRequest"}'
```

### GET /api/projects/{project_id}/confidence
Summary: Get Project Confidence
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Project Confidence Api Projects  Project Id  Confidence Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/confidence" \
  -H "Authorization: Bearer <token>"
```

### GET /api/projects/{project_id}/enterprise/dashboard
Summary: Enterprise Dashboard
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Enterprise Dashboard Api Projects  Project Id  Enterprise Dashboard Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/enterprise/dashboard" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/{project_id}/export
Summary: Export Project
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ExportRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Export Project Api Projects  Project Id  Export Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/export" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ExportRequest"}'
```

### GET /api/projects/{project_id}/export/audit
Summary: Export Audit
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 200 schema: Response Export Audit Api Projects  Project Id  Export Audit Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/export/audit" \
  -H "Authorization: Bearer <token>"
```

### GET /api/projects/{project_id}/export/{export_type}
Summary: Export Project Data
Real export endpoint for various data types.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- export_type (path, required) — Export Type

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/export/{export_type}" \
  -H "Authorization: Bearer <token>"
```

### GET /api/projects/{project_id}/jobs/active
Summary: Get Active Jobs
Get active jobs for a project.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Active Jobs Api Projects  Project Id  Jobs Active Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/jobs/active" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/{project_id}/jobs/analysis
Summary: Start Analysis Job
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Start Analysis Job Api Projects  Project Id  Jobs Analysis Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/jobs/analysis" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/{project_id}/jobs/characteros
Summary: Start Characteros Job
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Start Characteros Job Api Projects  Project Id  Jobs Characteros Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/jobs/characteros" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/{project_id}/jobs/make-ready
Summary: Start Make Ready Job
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Start Make Ready Job Api Projects  Project Id  Jobs Make Ready Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/jobs/make-ready" \
  -H "Authorization: Bearer <token>"
```

### GET /api/projects/{project_id}/manuscript
Summary: Get Project Manuscript Route
Return extracted manuscript text for the dedicated manuscript workspace.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/manuscript" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/{project_id}/manuscript/analyze
Summary: Analyze Manuscript Context
Analyzes a snippet of manuscript text to surface relevant lore (The Observer)
and detect canon violations (Consistency Shield).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ManuscriptAnalysisRequest

Responses:
- 200 — Successful Response
- 200 schema: ManuscriptAnalysisResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/manuscript/analyze" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ManuscriptAnalysisRequest"}'
```

### GET /api/projects/{project_id}/manuscript/chapters/{chapter_number}
Summary: Get Project Chapter Route
Return a single chapter's ordered paragraphs for lazy reader loading.

1-based chapter_number. Paragraphs carry stable global source_paragraph_index
values aligned with the speaker-override contract. source_start/source_end are
char offsets into the normalized manuscript, consistent with the chapter manifest
(`GET /projects/{id}/chapters`).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- chapter_number (path, required) — Chapter Number

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/manuscript/chapters/{chapter_number}" \
  -H "Authorization: Bearer <token>"
```

### GET /api/projects/{project_id}/manuscript/speaker-overrides
Summary: List Speaker Overrides
Return manual speaker overrides for the project at a manuscript_version
(defaults to the project's current version).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- manuscript_version (query, optional) — Manuscript Version

Responses:
- 200 — Successful Response
- 200 schema: Response List Speaker Overrides Api Projects  Project Id  Manuscript Speaker Overrides Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/manuscript/speaker-overrides" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/{project_id}/manuscript/speaker-overrides
Summary: Upsert Speaker Override
Upsert a manual speaker override. The override re-shapes voice-blocks output
(and therefore audio previews/production) for the matching quote. quote_hash is
derived server-side so write and read agree. See contracts/speaker-attribution.md.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — SpeakerOverrideRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Upsert Speaker Override Api Projects  Project Id  Manuscript Speaker Overrides Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/manuscript/speaker-overrides" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See SpeakerOverrideRequest"}'
```

### POST /api/projects/{project_id}/manuscript/update
Summary: Update Manuscript Text
Update the manuscript text content for a project.

This endpoint allows users to edit paragraphs and save changes back to blob storage.
The entire manuscript text is persisted, preserving formatting and structure.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ManuscriptUpdateRequest

Responses:
- 200 — Successful Response
- 200 schema: ManuscriptUpdateResponse
- 400 — Bad Request
- 400 schema: Response 400 Update Manuscript Text Api Projects  Project Id  Manuscript Update Post
- 401 — Unauthorized
- 401 schema: Response 401 Update Manuscript Text Api Projects  Project Id  Manuscript Update Post
- 404 — Not Found
- 404 schema: Response 404 Update Manuscript Text Api Projects  Project Id  Manuscript Update Post
- 409 — Conflict
- 409 schema: Response 409 Update Manuscript Text Api Projects  Project Id  Manuscript Update Post
- 422 — Validation Error
- 422 schema: HTTPValidationError
- 500 — Internal Server Error
- 500 schema: Response 500 Update Manuscript Text Api Projects  Project Id  Manuscript Update Post

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/manuscript/update" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ManuscriptUpdateRequest"}'
```

### POST /api/projects/{project_id}/manuscript/voice-blocks
Summary: Get Manuscript Voice Blocks
Parse a manuscript passage and return speaker-attributed voice blocks with VoiceDNA.

Uses ProseDialogueParser (5-layer attribution: speech_verb → POV → thought_verb
→ pronoun_chain → LLM fallback) to identify who is speaking in each sentence,
then attaches the speaker's voice_id and voice_dna from their CharacterOS profile.

This is the core of the VoiceDNA MOAT: the manuscript becomes aware of its own
voice distribution, enabling the reading surface to show character voices inline.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — VoiceBlocksRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Get Manuscript Voice Blocks Api Projects  Project Id  Manuscript Voice Blocks Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/manuscript/voice-blocks" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoiceBlocksRequest"}'
```

### POST /api/projects/{project_id}/produce
Summary: Start Audiobook Production Route
Triggers a full-book audiobook production job.
This job iterates through chapters and renders dirty/stale content.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/produce" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/{project_id}/re-analyze
Summary: Reanalyze Project
Trigger a fresh analysis run for an existing project.

Recovery states (integrity_blocked, analysis_failed, uploaded): any
verified owner may re-run without a Pro subscription.

Optional manual re-analysis of an already-analyzed project requires Pro.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/re-analyze" \
  -H "Authorization: Bearer <token>"
```

### GET /api/projects/{project_id}/realtime
Summary: Get Realtime Snapshot
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- since_timestamp (query, optional) — Since Timestamp

Responses:
- 200 — Successful Response
- 200 schema: Response Get Realtime Snapshot Api Projects  Project Id  Realtime Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/realtime" \
  -H "Authorization: Bearer <token>"
```

### GET /api/projects/{project_id}/settings
Summary: Get Project Settings
Retrieve project settings (audio, display, continuity preferences).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- effective (query, optional) — Effective

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/settings" \
  -H "Authorization: Bearer <token>"
```

### PUT /api/projects/{project_id}/settings
Summary: Put Project Settings
Update project settings (partial patch, normalized before persistence).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ProjectSettingsPatchRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PUT "http://localhost:8000/api/projects/project-demo/settings" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ProjectSettingsPatchRequest"}'
```

### POST /api/projects/{project_id}/story-qa
Summary: Story Qa
Answer questions about the story using ReaderAgent

Returns grounded answers with chapter citations.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — StoryQARequest

Responses:
- 200 — Successful Response
- 200 schema: StoryQAResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/story-qa" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See StoryQARequest"}'
```

### GET /api/projects/{project_id}/storyworld-report
Summary: Export Storyworld Report
Storyworld Report — the sellable Storyworld Package (Workstream C).

Formats: json (data, all tiers) | html, pdf (downloadable deliverable, Pro+).
409 when analysis is stale; never emits a report from stale analysis.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- format (query, optional) — Format

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/storyworld-report" \
  -H "Authorization: Bearer <token>"
```

### PUT /api/projects/{project_id}/studio-config
Summary: Put Project Studio Config
Update premium studio aesthetics and structural settings (persisted to DB).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — StudioConfigUpdateRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PUT "http://localhost:8000/api/projects/project-demo/studio-config" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See StudioConfigUpdateRequest"}'
```

### GET /api/projects/{project_id}/summary
Summary: Get Project Summary Route
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/summary" \
  -H "Authorization: Bearer <token>"
```

### GET /api/projects/{project_id}/team/members
Summary: List Team Members
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response List Team Members Api Projects  Project Id  Team Members Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/team/members" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/{project_id}/team/members
Summary: Upsert Team Member
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — TeamMemberRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Upsert Team Member Api Projects  Project Id  Team Members Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/team/members" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See TeamMemberRequest"}'
```

### GET /api/projects/{project_id}/voice-providers
Summary: List Voice Providers
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response List Voice Providers Api Projects  Project Id  Voice Providers Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/voice-providers" \
  -H "Authorization: Bearer <token>"
```

### GET /api/projects/{project_id}/world/entities
Summary: List World Entities
List world entities for a project
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- entity_type (query, optional) — Entity Type

Responses:
- 200 — Successful Response
- 200 schema: Response List World Entities Api Projects  Project Id  World Entities Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/projects/project-demo/world/entities" \
  -H "Authorization: Bearer <token>"
```

### POST /api/projects/{project_id}/world/entities
Summary: Upsert World Entity
Create or update a world entity (Environmental Persistence)
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — WorldEntityUpsertRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Upsert World Entity Api Projects  Project Id  World Entities Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/world/entities" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See WorldEntityUpsertRequest"}'
```

## CharacterOS

### GET /api/characteros/api/v2/projects/{project_id}/identity/candidates
Summary: List Identity Candidates
List Project-scoped identity candidates.
Used for manual reconciliation of fragmented character personas.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- status (query, optional) — Status

Responses:
- 200 — Successful Response
- 200 schema: Response List Identity Candidates Api Characteros Api V2 Projects  Project Id  Identity Candidates Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/api/v2/projects/project-demo/identity/candidates" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/api/v2/projects/{project_id}/identity/merge
Summary: Merge Identity Candidates
Manually merge two character identity candidates.
Triggers 'Retroactive Healing' across memories, entities, and the story graph.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ManualMergeRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/api/v2/projects/project-demo/identity/merge" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ManualMergeRequest"}'
```

### POST /api/characteros/build
Summary: Build Characteros Legacy
Backward-compatible build endpoint accepting project_id in request body.
Authentication: Bearer token required

Request body:
- application/json — CharacterOSBuildRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Build Characteros Legacy Api Characteros Build Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/build" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CharacterOSBuildRequest"}'
```

### POST /api/characteros/projects/collab/invite/accept
Summary: Accept Invite
Accept an invitation to join a project.
Authentication: Bearer token required

Request body:
- application/json — AcceptInviteRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Accept Invite Api Characteros Projects Collab Invite Accept Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/collab/invite/accept" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AcceptInviteRequest"}'
```

### POST /api/characteros/projects/{project_id}/audio
Summary: Generate Micro Audio
Generate professional audio for a specific manuscript snippet.
Used by the Micro-Director HUD in the Workbench.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — CharacterAudioGenerationRequest

Responses:
- 200 — Successful Response
- 200 schema: CharacterAudioGenerationResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/audio" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CharacterAudioGenerationRequest"}'
```

### GET /api/characteros/projects/{project_id}/audio-assets
Summary: List Audio Assets
List audio assets generated for a project, optionally filtered by scene_id.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- scene_id (query, optional) — Scene Id
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/audio-assets" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/audio-assets/{audio_id}/signed-url
Summary: Get Audio Asset Signed Url
Return a signed URL for an audio asset, suitable for playback.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- audio_id (path, required) — Audio Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/audio-assets/{audio_id}/signed-url" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/build
Summary: Build Characteros
Manually trigger CharacterOS build for a project

This endpoint can be used to build CharacterOS components after analysis
if the automatic build failed or wasn't triggered.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Build Characteros Api Characteros Projects  Project Id  Build Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/build" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/build/progress/stream
Summary: Stream Build Progress
SSE stream of CharacterOS build progress for a project.
Emits data: { step, percent, detail, ts } events every 600ms until
percent == 100 or the stream is closed by the client.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/build/progress/stream" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/characters
Summary: List Character Profiles
Get all character profiles for a project

Returns list of characters with their canonical facts, personality, and canon scope.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response List Character Profiles Api Characteros Projects  Project Id  Characters Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/characters" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/characters/{character_id}/evolution-state
Summary: Get Evolution State
Get current character DNA + emotional state.

Returns:
- voice_dna: Current vocal signature profile
- emotional_state: Last recorded emotional state (dominant emotion, intensity, etc.)
- interaction_count: Total interactions processed
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Evolution State Api Characteros Projects  Project Id  Characters  Character Id  Evolution State Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/characters/character-demo/evolution-state" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/characters/{character_id}/interact
Summary: Character Interact
Per-turn character interaction with automatic DNA evolution.

This endpoint glues together:
1. CharacterAgent for response generation
2. EmotionalBeatAnalyzer for emotion extraction
3. MemoryBridge for emotional state persistence
4. DNALearningEngine for voice DNA evolution

DNA evolution is triggered on every interaction (not just quality >=85%).
Use domain param to skip canon context (e.g., domain="robotics_service").
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Request body:
- application/json — CharacterInteractRequest

Responses:
- 200 — Successful Response
- 200 schema: CharacterInteractResult
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/characters/character-demo/interact" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CharacterInteractRequest"}'
```

### POST /api/characteros/projects/{project_id}/characters/{character_id}/reflect
Summary: Trigger an on-demand character reflection cycle
Trigger a background reflection cycle for a character on-demand.

The service:
1. Fetches recent interaction memories
2. Compresses them via the SummarizationAgent
3. Analyses the emotional arc trend
4. Generates a proactive thought for the next session
5. Persists the result as memory_type='daily_reflection'

Returns the reflection payload or {"status": "skipped"} when another
reflection is already running for this character.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Responses:
- 200 — Successful Response
- 200 schema: Response Run Character Reflect Api Characteros Projects  Project Id  Characters  Character Id  Reflect Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/characters/character-demo/reflect" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/characters/{character_id}/voice/clone
Summary: Clone Character Voice
Clone a voice for a character using provided audio.

Requires:
- voice_audio: Audio file containing the voice to clone (WAV/MP3)
- consent_audio: Recording of the speaker saying the consent phrase
- Subscription tier Pro or higher

Returns the updated voice binding for the character.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Request body:
- multipart/form-data — Body_clone_character_voice_api_characteros_projects__project_id__characters__character_id__voice_clone_post

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/characters/character-demo/voice/clone" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See Body_clone_character_voice_api_characteros_projects__project_id__characters__character_id__voice_clone_post"}'
```

### POST /api/characteros/projects/{project_id}/chat
Summary: Character Chat
Chat with a character using CharacterAgent

Mode Options:
- CANON: Strict adherence to source material (spoiler-protected)
- CANON+INFER: Safe inference from canon context
- BRANCH: Creative expansion beyond canon
- WRITER_ROOM: Creative scene generation maintaining personality
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — CharacterChatRequest

Responses:
- 200 — Successful Response
- 200 schema: CharacterChatResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/chat" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CharacterChatRequest"}'
```

### GET /api/characteros/projects/{project_id}/chat/history
Summary: Get Character Chat History
Return persisted CharacterOS chat history for one character.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (query, required) — Character Id
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 200 schema: CharacterChatHistoryResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/chat/history" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/codex/lore
Summary: Index Lore
Manually index lore/world fact into the Codex
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — LoreIndexRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Index Lore Api Characteros Projects  Project Id  Codex Lore Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/codex/lore" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See LoreIndexRequest"}'
```

### PUT /api/characteros/projects/{project_id}/collab/canon-scenes/{scene_id}
Summary: Edit Committed Scene
Version-guarded edit of a Story Room committed canon scene.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- scene_id (path, required) — Scene Id

Request body:
- application/json — EditCommittedSceneRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Edit Committed Scene Api Characteros Projects  Project Id  Collab Canon Scenes  Scene Id  Put
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PUT "http://localhost:8000/api/characteros/projects/project-demo/collab/canon-scenes/scene-demo" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See EditCommittedSceneRequest"}'
```

### POST /api/characteros/projects/{project_id}/collab/canon-scenes/{scene_id}/withdraw
Summary: Withdraw Committed Scene
Version-guarded withdrawal of a Story Room committed canon scene.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- scene_id (path, required) — Scene Id

Request body:
- application/json — WithdrawCommittedSceneRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Withdraw Committed Scene Api Characteros Projects  Project Id  Collab Canon Scenes  Scene Id  Withdraw Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/collab/canon-scenes/scene-demo/withdraw" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See WithdrawCommittedSceneRequest"}'
```

### GET /api/characteros/projects/{project_id}/collab/changesets
Summary: List Changesets
List changesets still awaiting review (draft/proposed) for a project.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/collab/changesets" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/collab/changesets/logs
Summary: List Changeset Logs
List changeset application logs for a project.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/collab/changesets/logs" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/collab/changesets/{changeset_id}
Summary: Get Changeset
Fetch a changeset (with typed items) for review.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- changeset_id (path, required) — Changeset Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/collab/changesets/{changeset_id}" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/collab/changesets/{changeset_id}/apply
Summary: Apply Changeset
Apply accepted change items through the canonical write paths.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- changeset_id (path, required) — Changeset Id

Request body:
- application/json — ApplyChangesetRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/collab/changesets/{changeset_id}/apply" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ApplyChangesetRequest"}'
```

### POST /api/characteros/projects/{project_id}/collab/changesets/{changeset_id}/discard
Summary: Discard Changeset
Discard a changeset without applying any items.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- changeset_id (path, required) — Changeset Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/collab/changesets/{changeset_id}/discard" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/collab/conflict/{conflict_id}/resolve
Summary: Resolve Conflict
Resolve a detected conflict by selecting a proposal.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- conflict_id (path, required) — Conflict Id

Request body:
- application/json — ResolveConflictRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Resolve Conflict Api Characteros Projects  Project Id  Collab Conflict  Conflict Id  Resolve Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/collab/conflict/conflict-demo/resolve" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ResolveConflictRequest"}'
```

### GET /api/characteros/projects/{project_id}/collab/directives
Summary: List Project Directives
List active creative directives for the project.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/collab/directives" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/collab/directives
Summary: Manage Project Directive
Create or Manage (deactivate) a creative directive.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/collab/directives" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/collab/drafts
Summary: List Drafts
List all scene drafts for a project. Requires read permission.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response List Drafts Api Characteros Projects  Project Id  Collab Drafts Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/collab/drafts" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/collab/invite
Summary: Create Invite
Create an invitation for a collaborator to join a project.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — CreateInviteRequest

Responses:
- 200 — Successful Response
- 200 schema: CreateInviteResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/collab/invite" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CreateInviteRequest"}'
```

### GET /api/characteros/projects/{project_id}/collab/meetings
Summary: List Meetings
List meetings for a project, newest first.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/collab/meetings" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/collab/meetings
Summary: Create Meeting
Create a new meeting conversation for a project.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — CreateMeetingRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/collab/meetings" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CreateMeetingRequest"}'
```

### GET /api/characteros/projects/{project_id}/collab/meetings/{conversation_id}
Summary: Get Meeting
Get a meeting's metadata and full threaded history.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- conversation_id (path, required) — Conversation Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/collab/meetings/{conversation_id}" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/collab/meetings/{conversation_id}/messages
Summary: Post Meeting Message
Post a human message; trigger the agentic bridge in the background.

Per contract, only USER messages drive the bridge (mention detection +
directive harvest). Agent/character replies land asynchronously; the client
refetches history.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- conversation_id (path, required) — Conversation Id

Request body:
- application/json — PostMessageRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/collab/meetings/{conversation_id}/messages" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See PostMessageRequest"}'
```

### POST /api/characteros/projects/{project_id}/collab/meetings/{conversation_id}/synthesize
Summary: Synthesize Meeting
Synthesize the meeting into a proposed ChangeSet (no side effects on apply targets).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- conversation_id (path, required) — Conversation Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/collab/meetings/{conversation_id}/synthesize" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/collab/members
Summary: List Project Members
List all members with access to a project.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: ListMembersResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/collab/members" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/collab/session
Summary: Create Collaboration Session
Create a new collaboration session.

Returns: { "session_id": "uuid", "url": "ws://..." }
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — CreateSessionRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Create Collaboration Session Api Characteros Projects  Project Id  Collab Session Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/collab/session" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CreateSessionRequest"}'
```

### GET /api/characteros/projects/{project_id}/collab/session/{session_id}
Summary: Get Session Status
Get status and history of a collaboration session.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- session_id (path, required) — Session Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Session Status Api Characteros Projects  Project Id  Collab Session  Session Id  Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/collab/session/session-demo" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/collab/session/{session_id}/simulate-conflict
Summary: Simulate Conflict For Testing
Create a deterministic conflict for integration/E2E testing.
Guarded by `COLLAB_TEST_MODE`.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- session_id (path, required) — Session Id

Responses:
- 200 — Successful Response
- 200 schema: Response Simulate Conflict For Testing Api Characteros Projects  Project Id  Collab Session  Session Id  Simulate Conflict Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/collab/session/session-demo/simulate-conflict" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/collab/{session_id}/commit
Summary: Commit Scene
Commit a draft to canon after final continuity validation. Requires write permission.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- session_id (path, required) — Session Id

Request body:
- application/json — CommitSceneRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Commit Scene Api Characteros Projects  Project Id  Collab  Session Id  Commit Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/collab/session-demo/commit" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CommitSceneRequest"}'
```

### POST /api/characteros/projects/{project_id}/collab/{session_id}/save-draft
Summary: Save Draft
Save a scene draft for later review or commit. Requires write permission.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- session_id (path, required) — Session Id

Request body:
- application/json — SaveDraftRequest

Responses:
- 200 — Successful Response
- 200 schema: DraftResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/collab/session-demo/save-draft" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See SaveDraftRequest"}'
```

### POST /api/characteros/projects/{project_id}/livevoice/session
Summary: Create Live Voice Session
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — LiveVoiceSessionCreateRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/livevoice/session" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See LiveVoiceSessionCreateRequest"}'
```

### GET /api/characteros/projects/{project_id}/livevoice/session/{session_id}
Summary: Get Live Voice Session
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- session_id (path, required) — Session Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/livevoice/session/session-demo" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/livevoice/session/{session_id}/history
Summary: Get Live Voice History
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- session_id (path, required) — Session Id
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/livevoice/session/session-demo/history" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/livevoice/session/{session_id}/turn
Summary: Live Voice Turn
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- session_id (path, required) — Session Id

Request body:
- multipart/form-data — Body_live_voice_turn_api_characteros_projects__project_id__livevoice_session__session_id__turn_post

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/livevoice/session/session-demo/turn" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See Body_live_voice_turn_api_characteros_projects__project_id__livevoice_session__session_id__turn_post"}'
```

### POST /api/characteros/projects/{project_id}/manuscript/analyze
Summary: Analyze Manuscript Context
Analyzes a snippet of manuscript text to surface relevant lore (The Observer)
and detect canon violations (Consistency Shield).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ManuscriptAnalysisRequest

Responses:
- 200 — Successful Response
- 200 schema: ManuscriptAnalysisResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/manuscript/analyze" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ManuscriptAnalysisRequest"}'
```

### GET /api/characteros/projects/{project_id}/privacy-policy
Summary: Get Privacy Policy
Get privacy policy and data handling info for project
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Privacy Policy Api Characteros Projects  Project Id  Privacy Policy Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/privacy-policy" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/profile/{character_id}
Summary: Get Character Profile
Get a single character profile by ID

Returns detailed profile including canonical facts, personality, speech patterns,
and canon scope.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Responses:
- 200 — Successful Response
- 200 schema: CharacterProfileResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/profile/character-demo" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/repair-profiles
Summary: Repair Character Profiles
Idempotent data repair endpoint for missing character profiles.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Repair Character Profiles Api Characteros Projects  Project Id  Repair Profiles Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/repair-profiles" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/scene
Summary: Generate Scene
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — SceneGenerationRequest

Responses:
- 200 — Successful Response
- 200 schema: SceneGenerationResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/scene" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See SceneGenerationRequest"}'
```

### GET /api/characteros/projects/{project_id}/scene/{scene_id}
Summary: Get Scene Generation Detail
Return a persisted scene generation with full text and continuity payload.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- scene_id (path, required) — Scene Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Scene Generation Detail Api Characteros Projects  Project Id  Scene  Scene Id  Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/scene/scene-demo" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/scenes
Summary: List Scene Generations
Return persisted scene generations for Scene Simulator history.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- page (query, optional) — Page
- limit (query, optional) — Limit
- search_term (query, optional) — Search Term
- character_id (query, optional) — Character Id
- status (query, optional) — Status
- severity (query, optional) — Severity
- include_text (query, optional) — Include Text

Responses:
- 200 — Successful Response
- 200 schema: Response List Scene Generations Api Characteros Projects  Project Id  Scenes Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/scenes" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/status
Summary: Get Characteros Status
Get CharacterOS build status for a project

Returns:
- built: bool (is CharacterOS built for this project - checked via explicit build_status flag)
- character_count: int (number of character profiles)
- canon_chunk_count: int (number of indexed canon chunks)
- story_graph_exists: bool (is story graph built)
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Characteros Status Api Characteros Projects  Project Id  Status Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/status" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/story-graph
Summary: Get Story Graph
Return story graph data for Storyworld graph view.

Always returns a valid payload shape (200) to keep frontend view-state stable.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Story Graph Api Characteros Projects  Project Id  Story Graph Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/story-graph" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/story-qa
Summary: Story Qa
Answer questions about the story using ReaderAgent

Returns grounded answers with chapter citations.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — StoryQARequest

Responses:
- 200 — Successful Response
- 200 schema: StoryQAResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/story-qa" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See StoryQARequest"}'
```

### GET /api/characteros/projects/{project_id}/storyboard
Summary: Get Storyboard
Return storyboard scene cards for Storyworld storyboard view.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- page (query, optional) — Page
- limit (query, optional) — Limit
- chapter_min (query, optional) — Chapter Min
- chapter_max (query, optional) — Chapter Max
- search_term (query, optional) — Search Term
- importance_min (query, optional) — Importance Min
- character_id (query, optional) — Character Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Storyboard Api Characteros Projects  Project Id  Storyboard Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/storyboard" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/storyworld/rebuild
Summary: Rebuild Storyworld
Rebuild StoryGraph from persisted project data and save snapshot.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Rebuild Storyworld Api Characteros Projects  Project Id  Storyworld Rebuild Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/storyworld/rebuild" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/storyworld/refresh
Summary: Refresh Storyworld
Refresh all Storyworld snapshots (graph, timeline, storyboard).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Refresh Storyworld Api Characteros Projects  Project Id  Storyworld Refresh Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/storyworld/refresh" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/storyworld/snapshots
Summary: List Storyworld Snapshots
List persisted Storyworld snapshots for this project.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response List Storyworld Snapshots Api Characteros Projects  Project Id  Storyworld Snapshots Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/storyworld/snapshots" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/storyworld/snapshots/{snapshot_type}
Summary: Get Storyworld Snapshot
Get one persisted Storyworld snapshot by type/chapter.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- snapshot_type (path, required) — Snapshot Type
- chapter (query, optional) — Chapter

Responses:
- 200 — Successful Response
- 200 schema: Response Get Storyworld Snapshot Api Characteros Projects  Project Id  Storyworld Snapshots  Snapshot Type  Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/storyworld/snapshots/latest" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/timeline
Summary: Get Timeline
Return timeline events for Storyworld timeline view.

Events are derived from timeline markers (if available) and scene generations.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Timeline Api Characteros Projects  Project Id  Timeline Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/timeline" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/voice-prompt
Summary: Generate Voice Prompt Configuration
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — VoicePromptRequest

Responses:
- 200 — Successful Response
- 200 schema: VoicePromptResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/voice-prompt" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoicePromptRequest"}'
```

### POST /api/characteros/projects/{project_id}/voice-prompt/apply-preview
Summary: Apply Voice Prompt Preview
Apply an already-generated voice preview to the character profile.

Saves the exact config produced at preview time — no re-generation.
This avoids the drift that occurs when re-running generate_configuration
against the same description (distinctiveness requirements may produce a
different voice_id or instructions).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — VoicePromptApplyPreviewRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/voice-prompt/apply-preview" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoicePromptApplyPreviewRequest"}'
```

### POST /api/characteros/projects/{project_id}/voice-prompt/compare
Summary: Compare Voice Prompts
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — VoicePromptCompareRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/voice-prompt/compare" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoicePromptCompareRequest"}'
```

### GET /api/characteros/projects/{project_id}/voice-recipes
Summary: List Voice Recipes
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/voice-recipes" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/voice-recipes
Summary: Create Voice Recipe
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — VoiceRecipeCreateRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/voice-recipes" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoiceRecipeCreateRequest"}'
```

### DELETE /api/characteros/projects/{project_id}/voice-recipes/{recipe_id}
Summary: Delete Voice Recipe
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- recipe_id (path, required) — Recipe Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X DELETE "http://localhost:8000/api/characteros/projects/project-demo/voice-recipes/recipe-demo" \
  -H "Authorization: Bearer <token>"
```

### GET /api/characteros/projects/{project_id}/voice-recipes/{recipe_id}
Summary: Get Voice Recipe
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- recipe_id (path, required) — Recipe Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/voice-recipes/recipe-demo" \
  -H "Authorization: Bearer <token>"
```

### PATCH /api/characteros/projects/{project_id}/voice-recipes/{recipe_id}
Summary: Update Voice Recipe
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- recipe_id (path, required) — Recipe Id

Request body:
- application/json — VoiceRecipeUpdateRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PATCH "http://localhost:8000/api/characteros/projects/project-demo/voice-recipes/recipe-demo" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoiceRecipeUpdateRequest"}'
```

### GET /api/characteros/projects/{project_id}/world/entities
Summary: List World Entities
List world entities for a project
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- entity_type (query, optional) — Entity Type

Responses:
- 200 — Successful Response
- 200 schema: Response List World Entities Api Characteros Projects  Project Id  World Entities Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/world/entities" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/world/entities
Summary: Upsert World Entity
Create or update a world entity (Environmental Persistence)
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — WorldEntityUpsertRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Upsert World Entity Api Characteros Projects  Project Id  World Entities Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/world/entities" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See WorldEntityUpsertRequest"}'
```

### GET /api/characteros/voice-recipes/share/{share_token}
Summary: Get Shared Voice Recipe
Authentication: Bearer token required

Parameters:
- share_token (path, required) — Share Token

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/voice-recipes/share/share-demo" \
  -H "Authorization: Bearer <token>"
```

## Audio

### POST /api/audio/audio/generate-stream
Summary: Generate Audio Stream
Phase 2: Generate audio with streaming manifest.

Returns AudioManifest immediately with scene structure.
Launches background task for concurrent synthesis.
Frontend can poll status or subscribe to SSE updates.
Authentication: Bearer token required

Request body:
- application/json — AudioGenerationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/audio/generate-stream" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AudioGenerationRequest"}'
```

### GET /api/audio/audio/status/{scene_id}
Summary: Get Scene Status
Poll endpoint: Get current status of all blocks in a scene.
Useful for clients without SSE support.
Authentication: Bearer token required

Parameters:
- scene_id (path, required) — Scene Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/audio/status/scene-demo" \
  -H "Authorization: Bearer <token>"
```

### GET /api/audio/audio/status/{scene_id}/stream
Summary: Stream Scene Status
Server-Sent Events endpoint for real-time scene status updates.
Returns a stream of block completion events as they happen.
Authentication: Bearer token required

Parameters:
- scene_id (path, required) — Scene Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/audio/status/scene-demo/stream" \
  -H "Authorization: Bearer <token>"
```

### POST /api/audio/characteros/projects/{project_id}/apply-scene-direction
Summary: Apply Scene Direction
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — SceneDirectionRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/apply-scene-direction" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See SceneDirectionRequest"}'
```

### POST /api/audio/characteros/projects/{project_id}/audio/optimize-block
Summary: Optimize Audio Block
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — VoiceBlockOptimizationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/audio/optimize-block" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoiceBlockOptimizationRequest"}'
```

### POST /api/audio/characteros/projects/{project_id}/audio/stream
Summary: Generate Audio Stream Realtime
Buffered streaming audio generation.

Returns audio chunks from the rendered scene artifact so the browser can
begin playback before the full download is complete.

Uses AudioPipelineOrchestrator for the full audio pipeline, then streams the
stored output in browser-sized chunks.

Args:
    project_id: Project UUID
    request: AudioGenerationRequest with scene_text, character_ids, etc.

Returns:
    StreamingResponse yielding MP3-formatted audio chunks
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — AudioGenerationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/audio/stream" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AudioGenerationRequest"}'
```

### POST /api/audio/characteros/projects/{project_id}/audio/stream-metadata
Summary: Get Audio Stream Metadata
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — AudioGenerationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/audio/stream-metadata" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AudioGenerationRequest"}'
```

### POST /api/audio/characteros/projects/{project_id}/configure-voice
Summary: Configure Voice
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — VoiceConfigurationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/configure-voice" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoiceConfigurationRequest"}'
```

### GET /api/audio/characteros/projects/{project_id}/feedback
Summary: List Feedback
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (query, optional) — Character Id
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/characteros/projects/project-demo/feedback" \
  -H "Authorization: Bearer <token>"
```

### POST /api/audio/characteros/projects/{project_id}/feedback
Summary: Submit Feedback
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — FeedbackRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/feedback" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See FeedbackRequest"}'
```

### POST /api/audio/characteros/projects/{project_id}/generate-audio
Summary: Generate Audio
Legacy route wrapper kept for route-parity and direct unit testing.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — AudioGenerationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/generate-audio" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AudioGenerationRequest"}'
```

### POST /api/audio/characteros/projects/{project_id}/generate-audio-pipeline
Summary: Generate Audio Pipeline
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — AudioGenerationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/generate-audio-pipeline" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AudioGenerationRequest"}'
```

### POST /api/audio/characteros/projects/{project_id}/preview-voice
Summary: Preview Voice
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — VoicePreviewRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/preview-voice" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoicePreviewRequest"}'
```

### GET /api/audio/characteros/projects/{project_id}/production-metrics
Summary: Get Audio Production Metrics
Get audio production metrics for a project from Postgres.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Audio Production Metrics Api Audio Characteros Projects  Project Id  Production Metrics Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/characteros/projects/project-demo/production-metrics" \
  -H "Authorization: Bearer <token>"
```

### GET /api/audio/characteros/projects/{project_id}/tts-health
Summary: Get Tts Health
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/characteros/projects/project-demo/tts-health" \
  -H "Authorization: Bearer <token>"
```

### POST /api/audio/characteros/projects/{project_id}/validate-audio-quality
Summary: Validate Audio Quality
Real 5-layer quality validation using AudioContinuityAgent.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — AudioValidationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/validate-audio-quality" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AudioValidationRequest"}'
```

### GET /api/audio/characteros/projects/{project_id}/voice-dna/export
Summary: Export Voice Dna
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (query, optional) — Character Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/characteros/projects/project-demo/voice-dna/export" \
  -H "Authorization: Bearer <token>"
```

### POST /api/audio/characteros/projects/{project_id}/voice-dna/learn
Summary: Learn Voice Dna
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — VoiceDNALearningRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/voice-dna/learn" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoiceDNALearningRequest"}'
```

### GET /api/audio/characteros/projects/{project_id}/voice-dna/ops-summary
Summary: Voice Dna Ops Summary
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/characteros/projects/project-demo/voice-dna/ops-summary" \
  -H "Authorization: Bearer <token>"
```

### POST /api/audio/characteros/projects/{project_id}/voice-dna/restore
Summary: Restore Voice Dna Version
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — VoiceDNARestoreRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/voice-dna/restore" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoiceDNARestoreRequest"}'
```

### GET /api/audio/characteros/projects/{project_id}/voice-dna/versions
Summary: List Voice Dna Versions
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (query, optional) — Character Id
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/characteros/projects/project-demo/voice-dna/versions" \
  -H "Authorization: Bearer <token>"
```

### GET /api/audio/characteros/projects/{project_id}/voice-preferences
Summary: List Voice Preferences
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- user_id (query, optional) — User Id
- character_id (query, optional) — Character Id
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/characteros/projects/project-demo/voice-preferences" \
  -H "Authorization: Bearer <token>"
```

### POST /api/audio/characteros/projects/{project_id}/voice-preferences
Summary: Save Voice Preferences
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — VoicePreferenceRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/voice-preferences" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoicePreferenceRequest"}'
```

### POST /api/audio/characteros/projects/{project_id}/voice/clone
Summary: Clone Character Voice
Gate consent before voice cloning. consent_confirmed must be True to proceed.

Returns a consent_token the client must include when uploading the voice audio
for actual cloning. The VoiceCloningAgent enforces a second layer of spoken-audio
biometric consent during the upload step.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — VoiceCloneRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Clone Character Voice Api Audio Characteros Projects  Project Id  Voice Clone Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/voice/clone" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoiceCloneRequest"}'
```

### POST /api/audio/characteros/projects/{project_id}/voice/dna-feedback
Summary: Submit Dna Feedback
Record qualitative feedback after a scene's audio to drive DNA learning.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — DNAFeedbackRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Submit Dna Feedback Api Audio Characteros Projects  Project Id  Voice Dna Feedback Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/characteros/projects/project-demo/voice/dna-feedback" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See DNAFeedbackRequest"}'
```

### GET /api/audio/download/{job_id}
Summary: Download Audio
Authentication: Bearer token required

Parameters:
- job_id (path, required) — Job Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/download/job-demo" \
  -H "Authorization: Bearer <token>"
```

### POST /api/audio/generate-stream
Summary: Generate Audio Stream
Phase 2: Generate audio with streaming manifest.

Returns AudioManifest immediately with scene structure.
Launches background task for concurrent synthesis.
Frontend can poll status or subscribe to SSE updates.
Authentication: Bearer token required

Request body:
- application/json — AudioGenerationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/generate-stream" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AudioGenerationRequest"}'
```

### POST /api/audio/projects/{project_id}/audio/generate
Summary: Generate Audio Legacy V1
Legacy compatibility route retained for older tests/clients.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — AudioGenerationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/projects/project-demo/audio/generate" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AudioGenerationRequest"}'
```

### GET /api/audio/projects/{project_id}/audio/status/{job_id}
Summary: Get Audio Status
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- job_id (path, required) — Job Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/projects/project-demo/audio/status/job-demo" \
  -H "Authorization: Bearer <token>"
```

### POST /api/audio/projects/{project_id}/export-audiobook
Summary: Export Audiobook
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- format (query, optional) — Format

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audio/projects/project-demo/export-audiobook" \
  -H "Authorization: Bearer <token>"
```

### GET /api/audio/projects/{project_id}/export-audiobook/{job_id}
Summary: Get Audiobook Export Status
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- job_id (path, required) — Job Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/projects/project-demo/export-audiobook/job-demo" \
  -H "Authorization: Bearer <token>"
```

### GET /api/audio/projects/{project_id}/export-audiobook/{job_id}/download
Summary: Download Audiobook Export
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- job_id (path, required) — Job Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/projects/project-demo/export-audiobook/job-demo/download" \
  -H "Authorization: Bearer <token>"
```

### GET /api/audio/projects/{project_id}/produce-sse/{job_id}
Summary: Production Sse
Server-Sent Events tracking for the 8-step audio pipeline.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- job_id (path, required) — Job Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/projects/project-demo/produce-sse/job-demo" \
  -H "Authorization: Bearer <token>"
```

### GET /api/audio/status/{scene_id}
Summary: Get Scene Status
Poll endpoint: Get current status of all blocks in a scene.
Useful for clients without SSE support.
Authentication: Bearer token required

Parameters:
- scene_id (path, required) — Scene Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/status/scene-demo" \
  -H "Authorization: Bearer <token>"
```

### GET /api/audio/status/{scene_id}/stream
Summary: Stream Scene Status
Server-Sent Events endpoint for real-time scene status updates.
Returns a stream of block completion events as they happen.
Authentication: Bearer token required

Parameters:
- scene_id (path, required) — Scene Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/status/scene-demo/stream" \
  -H "Authorization: Bearer <token>"
```

### GET /api/audio/voices
Summary: List Voices
Public catalog of available TTS voices. No auth required.
Authentication: Bearer token required

Responses:
- 200 — Successful Response
- 200 schema: Response List Voices Api Audio Voices Get

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audio/voices" \
  -H "Authorization: Bearer <token>"
```

### POST /api/audiobook/export/{project_id}
Summary: Export Full Audiobook
Concatenates all completed chapters and uploads a master export.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audiobook/export/project-demo" \
  -H "Authorization: Bearer <token>"
```

### GET /api/audiobook/manifest/{project_id}
Summary: Get Audiobook Manifest
Returns the chapter-by-chapter audiobook manifest and production status.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/audiobook/manifest/project-demo" \
  -H "Authorization: Bearer <token>"
```

### POST /api/audiobook/produce/{project_id}/{chapter_number}
Summary: Produce Audiobook Chapter
Triggers a background job to produce a specific chapter.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- chapter_number (path, required) — Chapter Number

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/audiobook/produce/project-demo/{chapter_number}" \
  -H "Authorization: Bearer <token>"
```

## Jobs

### POST /api/jobs/cleanup
Summary: Cleanup Jobs
Cleanup terminal jobs using the configured retention policy.
Authentication: Bearer token required

Request body:
- application/json — JobsCleanupRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Cleanup Jobs Api Jobs Cleanup Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/jobs/cleanup" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See JobsCleanupRequest"}'
```

### GET /api/jobs/{job_id}
Summary: Get Job
Get job status. Maps project_id to job progress or uses real jobs.
Authentication: Bearer token required

Parameters:
- job_id (path, required) — Job Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Job Api Jobs  Job Id  Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/jobs/job-demo" \
  -H "Authorization: Bearer <token>"
```

### POST /api/jobs/{job_id}/cancel
Summary: Cancel Job
Cancel a persisted background job and stop any running tracked task.
Authentication: Bearer token required

Parameters:
- job_id (path, required) — Job Id

Responses:
- 200 — Successful Response
- 200 schema: Response Cancel Job Api Jobs  Job Id  Cancel Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/jobs/job-demo/cancel" \
  -H "Authorization: Bearer <token>"
```

### GET /api/jobs/{job_id}/detailed
Summary: Get Detailed Job
Get detailed job information including stages and substeps.
Authentication: Bearer token required

Parameters:
- job_id (path, required) — Job Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Detailed Job Api Jobs  Job Id  Detailed Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/jobs/job-demo/detailed" \
  -H "Authorization: Bearer <token>"
```

## Add-ons

### POST /api/addons/google-docs/audio-link
Summary: Google Docs Audio Link
Authentication: Bearer token required

Request body:
- application/json — AddonAudioLinkRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Google Docs Audio Link Api Addons Google Docs Audio Link Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/google-docs/audio-link" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AddonAudioLinkRequest"}'
```

### GET /api/addons/google-docs/auth/callback
Summary: Google Docs Oauth Callback
Authentication: Bearer token required

Parameters:
- code (query, optional) — Code
- state (query, optional) — State
- error (query, optional) — Error

Responses:
- 200 — Successful Response
- 200 schema: string
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/addons/google-docs/auth/callback" \
  -H "Authorization: Bearer <token>"
```

### POST /api/addons/google-docs/auth/exchange-token
Summary: Google Docs Exchange Oauth Code
Authentication: Bearer token required

Request body:
- application/json — GoogleOAuthExchangeCodeRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Google Docs Exchange Oauth Code Api Addons Google Docs Auth Exchange Token Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/google-docs/auth/exchange-token" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See GoogleOAuthExchangeCodeRequest"}'
```

### GET /api/addons/google-docs/auth/validate
Summary: Google Docs Validate Auth
Authentication: Bearer token required

Responses:
- 200 — Successful Response
- 200 schema: GoogleOAuthValidateResponse

Example curl:
```bash
curl -X GET "http://localhost:8000/api/addons/google-docs/auth/validate" \
  -H "Authorization: Bearer <token>"
```

### POST /api/addons/google-docs/bootstrap
Summary: Bootstrap Google Doc
Authentication: Bearer token required

Request body:
- application/json — BootstrapRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Bootstrap Google Doc Api Addons Google Docs Bootstrap Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/google-docs/bootstrap" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See BootstrapRequest"}'
```

### POST /api/addons/google-docs/chat
Summary: Addon Character Chat
Authentication: Bearer token required

Request body:
- application/json — AddonCharacterChatRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Addon Character Chat Api Addons Google Docs Chat Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/google-docs/chat" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AddonCharacterChatRequest"}'
```

### POST /api/addons/google-docs/continuity-check
Summary: Continuity Check
Authentication: Bearer token required

Request body:
- application/json — ContinuityCheckRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Continuity Check Api Addons Google Docs Continuity Check Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/google-docs/continuity-check" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ContinuityCheckRequest"}'
```

### POST /api/addons/google-docs/events
Summary: Addon Track Event
Authentication: Bearer token required

Request body:
- application/json — AddonTrackEventRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Addon Track Event Api Addons Google Docs Events Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/google-docs/events" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AddonTrackEventRequest"}'
```

### POST /api/addons/google-docs/ghostwrite
Summary: Ghostwrite
Authentication: Bearer token required

Request body:
- application/json — GhostwriteRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Ghostwrite Api Addons Google Docs Ghostwrite Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/google-docs/ghostwrite" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See GhostwriteRequest"}'
```

### POST /api/addons/google-docs/projects/{project_id}/audiobook/compile
Summary: Google Docs Compile Audiobook
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Google Docs Compile Audiobook Api Addons Google Docs Projects  Project Id  Audiobook Compile Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/google-docs/projects/project-demo/audiobook/compile" \
  -H "Authorization: Bearer <token>"
```

### PATCH /api/addons/google-docs/projects/{project_id}/characters/{character_id}/voice
Summary: Addon Update Voice
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Request body:
- application/json — AddonUpdateVoiceRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Addon Update Voice Api Addons Google Docs Projects  Project Id  Characters  Character Id  Voice Patch
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PATCH "http://localhost:8000/api/addons/google-docs/projects/project-demo/characters/character-demo/voice" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AddonUpdateVoiceRequest"}'
```

### GET /api/addons/google-docs/projects/{project_id}/dashboard
Summary: Google Docs Dashboard
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Google Docs Dashboard Api Addons Google Docs Projects  Project Id  Dashboard Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/addons/google-docs/projects/project-demo/dashboard" \
  -H "Authorization: Bearer <token>"
```

### GET /api/addons/google-docs/ready
Summary: Google Docs Readiness
Authentication: Bearer token required

Responses:
- 200 — Successful Response
- 200 schema: Response Google Docs Readiness Api Addons Google Docs Ready Get

Example curl:
```bash
curl -X GET "http://localhost:8000/api/addons/google-docs/ready" \
  -H "Authorization: Bearer <token>"
```

### POST /api/addons/google-docs/story-qa
Summary: Addon Story Qa
Authentication: Bearer token required

Request body:
- application/json — AddonStoryQARequest

Responses:
- 200 — Successful Response
- 200 schema: Response Addon Story Qa Api Addons Google Docs Story Qa Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/google-docs/story-qa" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AddonStoryQARequest"}'
```

### GET /api/addons/google-docs/sync-status/{sync_id}
Summary: Get Sync Status
Authentication: Bearer token required

Parameters:
- sync_id (path, required) — Sync Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Sync Status Api Addons Google Docs Sync Status  Sync Id  Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/addons/google-docs/sync-status/{sync_id}" \
  -H "Authorization: Bearer <token>"
```

### POST /api/addons/google-docs/sync-storyworld
Summary: Sync Storyworld
Authentication: Bearer token required

Request body:
- application/json — SyncStoryworldRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Sync Storyworld Api Addons Google Docs Sync Storyworld Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/google-docs/sync-storyworld" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See SyncStoryworldRequest"}'
```

### POST /api/addons/word/bootstrap
Summary: Bootstrap Word Document
Authentication: Bearer token required

Request body:
- application/json — WordBootstrapRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Bootstrap Word Document Api Addons Word Bootstrap Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/word/bootstrap" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See WordBootstrapRequest"}'
```

### POST /api/addons/word/projects/{project_id}/audio-link
Summary: Generate Audio Link
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — WordAudioLinkRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Generate Audio Link Api Addons Word Projects  Project Id  Audio Link Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/word/projects/project-demo/audio-link" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See WordAudioLinkRequest"}'
```

### POST /api/addons/word/projects/{project_id}/chat
Summary: Character Chat
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — WordChatRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Character Chat Api Addons Word Projects  Project Id  Chat Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/word/projects/project-demo/chat" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See WordChatRequest"}'
```

### POST /api/addons/word/projects/{project_id}/continuity-check
Summary: Continuity Check
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — WordContinuityCheckRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Continuity Check Api Addons Word Projects  Project Id  Continuity Check Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/word/projects/project-demo/continuity-check" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See WordContinuityCheckRequest"}'
```

### GET /api/addons/word/projects/{project_id}/dashboard
Summary: Word Dashboard
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Word Dashboard Api Addons Word Projects  Project Id  Dashboard Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/addons/word/projects/project-demo/dashboard" \
  -H "Authorization: Bearer <token>"
```

### POST /api/addons/word/projects/{project_id}/scene
Summary: Generate Scene
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — WordSceneRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Generate Scene Api Addons Word Projects  Project Id  Scene Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/word/projects/project-demo/scene" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See WordSceneRequest"}'
```

### POST /api/addons/word/projects/{project_id}/story-qa
Summary: Story Qa
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — WordStoryQARequest

Responses:
- 200 — Successful Response
- 200 schema: Response Story Qa Api Addons Word Projects  Project Id  Story Qa Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/word/projects/project-demo/story-qa" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See WordStoryQARequest"}'
```

### GET /api/addons/word/projects/{project_id}/workspace
Summary: Workspace Snapshot
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Workspace Snapshot Api Addons Word Projects  Project Id  Workspace Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/addons/word/projects/project-demo/workspace" \
  -H "Authorization: Bearer <token>"
```

### POST /api/addons/word/sync-storyworld
Summary: Sync Storyworld
Authentication: Bearer token required

Request body:
- application/json — WordSyncStoryworldRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Sync Storyworld Api Addons Word Sync Storyworld Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/addons/word/sync-storyworld" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See WordSyncStoryworldRequest"}'
```

## Speech to Text

### POST /api/speech-to-text/projects/{project_id}/transcribe
Summary: Transcribe Voice Input
Transcribe audio file to text using the speech-to-text engine.

Supports: MP3, MP4, MPEG, MPGA, M4A, WAV, WEBM
Max file size: 25 MB

Args:
    project_id: Project ID (for validation)
    file: Audio file upload
    current_user_id: Authenticated user

Returns:
    TranscriptionResponse with transcribed text

Example:
    ```
    POST /api/speech-to-text/projects/{project_id}/transcribe

    // Returns:
    {
      "text": "What did you think of the queen?",
      "language": "en",
      "duration_seconds": 2.3,
      "confidence": 0.98
    }
    ```
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- multipart/form-data — Body_transcribe_voice_input_api_speech_to_text_projects__project_id__transcribe_post

Responses:
- 200 — Successful Response
- 200 schema: TranscriptionResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/speech-to-text/projects/project-demo/transcribe" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See Body_transcribe_voice_input_api_speech_to_text_projects__project_id__transcribe_post"}'
```

### POST /api/speech-to-text/transcribe
Summary: Transcribe Voice Legacy
Legacy transcription endpoint (no project validation).
**DEV ONLY** - Set ENABLE_LEGACY_TRANSCRIBE=true to use.
Use /projects/{project_id}/transcribe for authenticated production access.
Authentication: Bearer token required

Request body:
- multipart/form-data — Body_transcribe_voice_legacy_api_speech_to_text_transcribe_post

Responses:
- 200 — Successful Response
- 200 schema: TranscriptionResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/speech-to-text/transcribe" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See Body_transcribe_voice_legacy_api_speech_to_text_transcribe_post"}'
```

## Health

### GET /api/health
Summary: Api Health Check
Standard API health check endpoint
Authentication: none

Responses:
- 200 — Successful Response
- 200 schema: HealthResponse

Example curl:
```bash
curl -X GET "http://localhost:8000/api/health"
```

### GET /api/health/database
Summary: Health Database
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/health/database"
```

### GET /api/health/openai
Summary: Health Openai
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/health/openai"
```

### GET /api/health/ready
Summary: Health Ready
Readiness gate — strict in production, lax in dev.

Production (requires_primary_backends=True): returns 200 only when:
- runtime contract is valid
- core services are initialized
- database probe is ok
- redis probe is ok
- vector (pgvector) probe is ok
- openai probe is ok
- blob storage is Vercel Blob and writable
- storyworld services available (if eager init is required)

Dev/non-primary mode: only requires database ok; Redis/vector may be unconfigured.
Detailed blockers are included in the 503 payload for Railway/Vercel log visibility.
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/health/ready"
```

### GET /api/health/redis
Summary: Health Redis
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/health/redis"
```

### GET /api/health/summary
Summary: Health Summary
Comprehensive health and observability dashboard.
Returns full status of all services with detailed metrics.
Status code: 200 if healthy, 503 if degraded.
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/health/summary"
```

### GET /api/health/vector-db
Summary: Health Vector Db
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/health/vector-db"
```

### GET /health
Summary:  Build Health Response
Authentication: none

Responses:
- 200 — Successful Response
- 200 schema: HealthResponse

Example curl:
```bash
curl -X GET "http://localhost:8000/health"
```

### GET /metrics
Summary: Prometheus Metrics
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/metrics"
```

### GET /metrics/dashboard
Summary: Metrics Dashboard
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/metrics/dashboard"
```

## Legacy / Deprecated

### POST /api/v2/analysis/projects/{project_id}/cast-review/apply
Summary: Apply Cast Review
Apply persisted cast_review overrides to analysis + rebuild CharacterOS.
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Apply Cast Review Api V2 Analysis Projects  Project Id  Cast Review Apply Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v2/analysis/projects/project-demo/cast-review/apply" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v2/analysis/projects/{project_id}/characters
Summary: Get Characters Analysis
Get character analysis data
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Characters Analysis Api V2 Analysis Projects  Project Id  Characters Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v2/analysis/projects/project-demo/characters" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v2/analysis/projects/{project_id}/dialogue
Summary: Get Dialogue Analysis
Get dialogue analysis data
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Dialogue Analysis Api V2 Analysis Projects  Project Id  Dialogue Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v2/analysis/projects/project-demo/dialogue" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v2/analysis/projects/{project_id}/plot
Summary: Get Plot Analysis
Get plot analysis data
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Plot Analysis Api V2 Analysis Projects  Project Id  Plot Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v2/analysis/projects/project-demo/plot" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v2/analysis/projects/{project_id}/results
Summary: Get Analysis Results
Get all analysis results for a project.

Response envelope includes:
  stale_analysis       — True when the project's manuscript has changed since
                         analysis was last run (hash mismatch).
  degraded             — True when the analysis used fallback/mock heuristics.
  manuscript_hash_current  — SHA-256 of the current manuscript on the project.
  manuscript_hash_analyzed — SHA-256 that was active when analysis ran.
  engine_version, schema_version, analyzed_at — audit trail.
  quality_summary      — per-section readiness and overall status.
  warnings             — forwarded from analysis_metadata.warnings.
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Analysis Results Api V2 Analysis Projects  Project Id  Results Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v2/analysis/projects/project-demo/results" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v2/analysis/projects/{project_id}/stream
Summary: Stream Analysis Progress
Server-Sent Events stream that emits real-time analysis phase transitions.

The client subscribes before (or just after) triggering analysis:

    const es = new EventSource('/api/v2/analysis/projects/{id}/stream');
    es.onmessage = (e) => { const data = JSON.parse(e.data); ... };

Each event payload:
    { type: "progress", phase: str, progress: float (0-1), message: str,
      fast_track_status: str, deep_analysis_status: str, timestamp: str }

Terminal events have type "completed" or "failed".  The stream closes
automatically after 10 minutes or when the job reaches a terminal state.
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v2/analysis/projects/project-demo/stream" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v2/analysis/projects/{project_id}/style
Summary: Get Style Analysis
Get writing style analysis data
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Style Analysis Api V2 Analysis Projects  Project Id  Style Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v2/analysis/projects/project-demo/style" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v2/analysis/projects/{project_id}/themes
Summary: Get Themes Analysis
Get theme analysis data
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Themes Analysis Api V2 Analysis Projects  Project Id  Themes Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v2/analysis/projects/project-demo/themes" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v2/analysis/projects/{project_id}/world
Summary: Get World Analysis
Get world/setting analysis data.

Missing leaves are returned as None rather than substituted with plausible
default strings.  The frontend transformer is responsible for marking those
fields as source_status='missing' in the NormalizedField contract.
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get World Analysis Api V2 Analysis Projects  Project Id  World Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v2/analysis/projects/project-demo/world" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v2/personas
Summary: List available personas
List all available Marvox character personas in the system
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- project_id (query, optional) — Project Id
- interaction_domain (query, optional) — Interaction Domain

Responses:
- 200 — Successful Response
- 200 schema: PersonaListResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v2/personas" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v2/personas/from-template/{template_id}
Summary: Create a persona from a template
Instantiate a new character/persona using a pre-built App Store template.
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- template_id (path, required) — Template Id

Request body:
- application/json — PersonaFromTemplateRequest

Responses:
- 201 — Successful Response
- 201 schema: PersonaFromTemplateResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v2/personas/from-template/{template_id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See PersonaFromTemplateRequest"}'
```

### GET /api/v2/personas/group/{group_id}/consensus-state
Summary: Fleet consensus state
Returns the averaged/consensus state of all personas sharing the given group_id. Useful for fleet-wide synchronisation and drift detection.
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- group_id (path, required) — Group Id

Responses:
- 200 — Successful Response
- 200 schema: FleetConsensusState
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v2/personas/group/{group_id}/consensus-state" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v2/personas/{character_id}
Summary: Get persona profile
Retrieve the profile of a specific Marvox character persona
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- character_id (path, required) — Character Id

Responses:
- 200 — Successful Response
- 200 schema: PersonaProfile
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v2/personas/character-demo" \
  -H "Authorization: Bearer <token>"
```

### PATCH /api/v2/personas/{character_id}/behavior
Summary: Update behavior policies
Update the behavior policy configuration for a persona
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- character_id (path, required) — Character Id

Request body:
- application/json — BehaviorPoliciesUpdateRequest

Responses:
- 200 — Successful Response
- 200 schema: BehaviorPoliciesUpdateResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PATCH "http://localhost:8000/api/v2/personas/character-demo/behavior" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See BehaviorPoliciesUpdateRequest"}'
```

### POST /api/v2/personas/{character_id}/execute
Summary: Execute task with persona
Execute a task request using a specific Marvox character persona
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- character_id (path, required) — Character Id

Request body:
- application/json — PersonaExecuteRequest

Responses:
- 200 — Successful Response
- 200 schema: PersonaExecuteResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v2/personas/character-demo/execute" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See PersonaExecuteRequest"}'
```

### POST /api/v2/robots/simulate
Summary: Simulate Persona In Scene
Run a simulated physical interaction for a persona in a given scene.

**EXPERIMENTAL CONCEPT** — returns canned telemetry. No real physics engine.
The persona's dialogue and emotional state are derived from scene_text;
joint positions are randomized within plausible humanoid ranges.

This endpoint is gated behind authentication but does not charge quota.
Status: deprecated or legacy
Authentication: Bearer token required

Request body:
- application/json — SimulationRequest

Responses:
- 200 — Successful Response
- 200 schema: SimulationResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v2/robots/simulate" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See SimulationRequest"}'
```

### GET /api/v2/templates
Summary: List available character templates
Returns all pre-built character templates for the Robotics App Store.
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- category (query, optional) — Category
- tags (query, optional) — Tags

Responses:
- 200 — Successful Response
- 200 schema: TemplateListResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v2/templates" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v2/templates/{template_id}
Summary: Get a single template by ID
Return a specific template by its ID.
Status: deprecated or legacy
Authentication: Bearer token required

Parameters:
- template_id (path, required) — Template Id

Responses:
- 200 — Successful Response
- 200 schema: CharacterTemplateResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v2/templates/{template_id}" \
  -H "Authorization: Bearer <token>"
```

## Other

### GET /
Summary: Read Root
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/"
```

### POST /api/admin/admin/flush-openai-cache
Summary: Flush all cached analysis responses from Redis
Delete every ``openai_cache:*`` key from Redis.

Use this after fixing a bug that caused incorrect responses to be cached
(e.g. empty-prompt cache collisions that returned Clara demo data for any
project whose fact-sheet compression failed).
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X POST "http://localhost:8000/api/admin/admin/flush-openai-cache" \
  -H "Authorization: Bearer <token>"
```

### POST /api/admin/admin/recover-integrity-blocked
Summary: Repair projects stuck in integrity_blocked state
Reset projects whose status is ``integrity_blocked`` to ``analyzed``
(when valid analysis_results exist) or ``uploaded`` (when no results).

This repairs the false-positive fallout from commits af859aa / 29fd417
that wrote ``integrity_blocked`` for normal manuscripts due to an
over-aggressive entity-extraction heuristic.

Parameters
----------
dry_run : bool (default True)
    When True, return the planned actions without writing to the database.
    Set ``?dry_run=false`` to apply changes.
Authentication: Bearer token required

Parameters:
- dry_run (query, optional) — Dry Run

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/admin/admin/recover-integrity-blocked" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/agents/failures
Summary: Admin Agent Failures
Authentication: Bearer token required

Parameters:
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 200 schema: AdminAgentFailuresResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/agents/failures" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/agents/related-reports
Summary: Admin Agent Related Reports
Return StepStitch user reports that match a given project and time window.

Used by the Monitoring plane to surface related user-filed bug reports beside
agent failures, so operators can correlate symptoms → repro evidence without
switching to the StepStitch cockpit first.

Gracefully returns an empty list when:
- ``stepstitch_traces`` doesn't exist (SQLite / pre-migration environments).
- No project_id is provided (returns recent cross-project reports instead).
Authentication: Bearer token required

Parameters:
- project_id (query, optional) — Project Id
- hours (query, optional) — Hours
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 200 schema: AdminRelatedReportsResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/agents/related-reports" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/agents/runtime-health
Summary: Admin Agent Runtime Health
Live circuit-breaker state for the model chat/TTS/embedding boundaries.

Reads the module-level named breakers used by the agent runtime — the same
source surfaced in the audio and live-voice health endpoints — so operators
can see open/half-open breakers without leaving the admin plane.
Authentication: Bearer token required

Responses:
- 200 — Successful Response
- 200 schema: AdminRuntimeHealthResponse

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/agents/runtime-health" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/agents/traces
Summary: Admin Agent Traces
Authentication: Bearer token required

Parameters:
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 200 schema: AdminAgentTracesResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/agents/traces" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/benchmarks
Summary: Admin Benchmarks
Authentication: Bearer token required

Responses:
- 200 — Successful Response
- 200 schema: AdminBenchmarksResponse

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/benchmarks" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/billing/summary
Summary: Billing Summary
Authentication: Bearer token required

Responses:
- 200 — Successful Response
- 200 schema: BillingSummaryResponse

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/billing/summary" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/config
Summary: Admin Config
Authentication: Bearer token required

Responses:
- 200 — Successful Response
- 200 schema: AdminConfigResponse

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/config" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/health
Summary: Admin Health
Authentication: Bearer token required

Responses:
- 200 — Successful Response
- 200 schema: AdminHealthResponse

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/health" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/jobs
Summary: Admin Jobs
Authentication: Bearer token required

Parameters:
- status (query, optional) — Status
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 200 schema: AdminJobsResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/jobs" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/logs
Summary: Admin Logs
Authentication: Bearer token required

Parameters:
- type (query, optional) — Type
- hours (query, optional) — Hours
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 200 schema: AdminLogsResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/logs" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/metrics/usage
Summary: Admin Metrics Usage
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/metrics/usage" \
  -H "Authorization: Bearer <token>"
```

### POST /api/admin/openclaw/character-turn
Summary: Admin Openclaw Character Turn
Execute a character action via OpenClaw (admin panel interface).

The claw_id ("admin_console") and project_id are injected server-side.
Restricted to admin_operator role only for security.
Authentication: Bearer token required

Request body:
- application/json — AdminOpenclawCharacterTurnRequest

Responses:
- 200 — Successful Response
- 200 schema: OpenclawCharacterTurnResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/admin/openclaw/character-turn" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AdminOpenclawCharacterTurnRequest"}'
```

### GET /api/admin/openclaw/status
Summary: Admin Openclaw Status
Retrieve recent OpenClaw SRE events from Redis rolling window.
Admin-only endpoint — restricted to admin_operator role only.
Gated via JWT cookie auth.
Authentication: Bearer token required

Parameters:
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 200 schema: OpenclawStatusResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/openclaw/status" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/projects
Summary: List Projects
Authentication: Bearer token required

Parameters:
- offset (query, optional) — Offset
- limit (query, optional) — Limit
- q (query, optional) — Q
- status (query, optional) — Status
- owner_id (query, optional) — Owner Id

Responses:
- 200 — Successful Response
- 200 schema: AdminProjectListResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/projects" \
  -H "Authorization: Bearer <token>"
```

### DELETE /api/admin/projects/{project_id}
Summary: Delete Project
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X DELETE "http://localhost:8000/api/admin/projects/project-demo" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/projects/{project_id}
Summary: Get Project Detail
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: AdminProjectDetail
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/projects/project-demo" \
  -H "Authorization: Bearer <token>"
```

### PATCH /api/admin/projects/{project_id}/owner
Summary: Transfer Project Owner
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ProjectOwnerTransferRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PATCH "http://localhost:8000/api/admin/projects/project-demo/owner" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ProjectOwnerTransferRequest"}'
```

### POST /api/admin/provision
Summary: Provision User
Upsert a user with the given tier and Stripe test IDs.
Safe to call repeatedly — updates if email exists, inserts if not.
Authentication: Bearer token required

Request body:
- application/json — ProvisionRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/admin/provision" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ProvisionRequest"}'
```

### GET /api/admin/stats
Summary: Admin Stats
Platform-level counts.
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/stats" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/usage/ai-costs
Summary: Usage Ai Costs
Authentication: Bearer token required

Responses:
- 200 — Successful Response
- 200 schema: UsageAICostsResponse

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/usage/ai-costs" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/usage/features
Summary: Usage Features
Authentication: Bearer token required

Responses:
- 200 — Successful Response
- 200 schema: UsageFeaturesResponse

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/usage/features" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/usage/growth
Summary: Usage Growth
Authentication: Bearer token required

Parameters:
- period_days (query, optional) — Period Days

Responses:
- 200 — Successful Response
- 200 schema: UsageGrowthResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/usage/growth" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/usage/top-users
Summary: Usage Top Users
Authentication: Bearer token required

Parameters:
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 200 schema: UsageTopUsersResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/usage/top-users" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/users
Summary: List Users
List users with pagination.
Authentication: Bearer token required

Parameters:
- offset (query, optional) — Offset
- limit (query, optional) — Limit
- q (query, optional) — Q
- tier (query, optional) — Tier
- role (query, optional) — Role
- status (query, optional) — Status

Responses:
- 200 — Successful Response
- 200 schema: AdminUserListResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/users" \
  -H "Authorization: Bearer <token>"
```

### GET /api/admin/users/{user_id}
Summary: Get User
Get a single user by ID or email.
Authentication: Bearer token required

Parameters:
- user_id (path, required) — User Id

Responses:
- 200 — Successful Response
- 200 schema: AdminUserDetail
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/admin/users/{user_id}" \
  -H "Authorization: Bearer <token>"
```

### PATCH /api/admin/users/{user_id}
Summary: Update User
Update user account, role, lifecycle, or Stripe metadata.
Authentication: Bearer token required

Parameters:
- user_id (path, required) — User Id

Request body:
- application/json — UserPatchRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PATCH "http://localhost:8000/api/admin/users/{user_id}" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See UserPatchRequest"}'
```

### GET /api/billing/api-keys
Summary: List Api Keys
List all API keys for a project. Requires Enterprise subscription.
Authentication: Bearer token required

Parameters:
- project_id (query, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/billing/api-keys" \
  -H "Authorization: Bearer <token>"
```

### POST /api/billing/api-keys
Summary: Create Api Key
Create a new API key for programmatic access. Requires Enterprise subscription.
Authentication: Bearer token required

Parameters:
- project_id (query, required) — Project Id

Request body:
- application/json — CreateAPIKeyRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/billing/api-keys" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CreateAPIKeyRequest"}'
```

### DELETE /api/billing/api-keys/{key_id}
Summary: Revoke Api Key
Revoke an API key. Requires Enterprise subscription.
Authentication: Bearer token required

Parameters:
- key_id (path, required) — Key Id
- project_id (query, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X DELETE "http://localhost:8000/api/billing/api-keys/{key_id}" \
  -H "Authorization: Bearer <token>"
```

### POST /api/billing/cancel-subscription
Summary: Cancel Subscription
Cancel a user's subscription at period end.
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X POST "http://localhost:8000/api/billing/cancel-subscription" \
  -H "Authorization: Bearer <token>"
```

### POST /api/billing/checkout-session
Summary: Create Checkout Session
Create a Stripe checkout session.
Authentication: Bearer token required

Request body:
- application/json — CheckoutCreateRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/billing/checkout-session" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CheckoutCreateRequest"}'
```

### POST /api/billing/portal-session
Summary: Create Portal Session
Create a Stripe Customer Portal session.
Authentication: Bearer token required

Request body:
- application/json — PortalCreateRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/billing/portal-session" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See PortalCreateRequest"}'
```

### GET /api/billing/quota/{api_key_id}
Summary: Get Api Key Quota
Get current quota usage for an API key.
Authentication: Bearer token required

Parameters:
- api_key_id (path, required) — Api Key Id
- project_id (query, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/billing/quota/{api_key_id}" \
  -H "Authorization: Bearer <token>"
```

### GET /api/billing/usage
Summary: Get Usage Summary
Get usage summary for a project (today's aggregated stats).
Authentication: Bearer token required

Parameters:
- project_id (query, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/billing/usage" \
  -H "Authorization: Bearer <token>"
```

### POST /api/billing/webhook
Summary: Stripe Webhook
Handle Stripe webhooks.
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X POST "http://localhost:8000/api/billing/webhook" \
  -H "Authorization: Bearer <token>"
```

### GET /api/character-consciousness/health
Summary: Character Consciousness Health
Health check for character consciousness services.
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/character-consciousness/health" \
  -H "Authorization: Bearer <token>"
```

### POST /api/character-consciousness/projects/{project_id}/characters/{character_id}/conversation/continue
Summary: Continue Character Conversation
Continue a conversation with a character using real interaction service.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Request body:
- application/json — ContinueConversationRequest

Responses:
- 200 — Successful Response
- 200 schema: ConversationResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/character-consciousness/projects/project-demo/characters/character-demo/conversation/continue" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ContinueConversationRequest"}'
```

### POST /api/character-consciousness/projects/{project_id}/characters/{character_id}/conversation/start
Summary: Start Character Conversation
Start a conversation with a character using real CharacterOS-backed services.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Request body:
- application/json — StartConversationRequest

Responses:
- 200 — Successful Response
- 200 schema: ConversationResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/character-consciousness/projects/project-demo/characters/character-demo/conversation/start" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See StartConversationRequest"}'
```

### GET /api/character-consciousness/projects/{project_id}/characters/{character_id}/insights
Summary: Get Character Insights
Get character insights from real profile + memory data.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Responses:
- 200 — Successful Response
- 200 schema: CharacterInsightResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/character-consciousness/projects/project-demo/characters/character-demo/insights" \
  -H "Authorization: Bearer <token>"
```

### GET /api/character-consciousness/projects/{project_id}/characters/{character_id}/memory
Summary: Get Character Memory
Get persisted character memory for a project character.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Responses:
- 200 — Successful Response
- 200 schema: CharacterMemoryResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/character-consciousness/projects/project-demo/characters/character-demo/memory" \
  -H "Authorization: Bearer <token>"
```

### GET /api/dashboard/overview
Summary: Get Dashboard Overview
Return cross-project overview data for the authenticated user.
Authentication: Bearer token required

Parameters:
- recent_projects_limit (query, optional) — Recent Projects Limit
- active_jobs_limit (query, optional) — Active Jobs Limit
- recent_activity_limit (query, optional) — Recent Activity Limit

Responses:
- 200 — Successful Response
- 200 schema: Response Get Dashboard Overview Api Dashboard Overview Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/dashboard/overview" \
  -H "Authorization: Bearer <token>"
```

### GET /api/docs/openapi.json
Summary: Live Openapi Schema
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/docs/openapi.json"
```

### POST /api/enterprise/projects/{project_id}/advisor/turn
Summary: Enterprise Implementation Copilot Turn
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — EnterpriseCopilotTurnRequest

Responses:
- 200 — Successful Response
- 200 schema: EnterpriseCopilotTurnResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/enterprise/projects/project-demo/advisor/turn" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See EnterpriseCopilotTurnRequest"}'
```

### GET /api/enterprise/projects/{project_id}/audit/governance
Summary: Enterprise Audit Governance Records
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: EnterpriseGovernanceRecordsResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/enterprise/projects/project-demo/audit/governance" \
  -H "Authorization: Bearer <token>"
```

### GET /api/enterprise/projects/{project_id}/audit/summary
Summary: Enterprise Audit Summary
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: EnterpriseAuditSummaryResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/enterprise/projects/project-demo/audit/summary" \
  -H "Authorization: Bearer <token>"
```

### GET /api/enterprise/projects/{project_id}/audit/voice-assets
Summary: Enterprise Audit Voice Assets
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: EnterpriseVoiceAssetsResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/enterprise/projects/project-demo/audit/voice-assets" \
  -H "Authorization: Bearer <token>"
```

### GET /api/enterprise/projects/{project_id}/audit/voice-assets/{character_id}/watermark
Summary: Enterprise Audit Voice Watermark
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Responses:
- 200 — Successful Response
- 200 schema: EnterpriseVoiceWatermarkResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/enterprise/projects/project-demo/audit/voice-assets/character-demo/watermark" \
  -H "Authorization: Bearer <token>"
```

### POST /api/enterprise/projects/{project_id}/copilot/turn
Summary: Enterprise Implementation Copilot Turn
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — EnterpriseCopilotTurnRequest

Responses:
- 200 — Successful Response
- 200 schema: EnterpriseCopilotTurnResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/enterprise/projects/project-demo/copilot/turn" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See EnterpriseCopilotTurnRequest"}'
```

### GET /api/launch/db-check
Summary: Db Check
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/launch/db-check" \
  -H "Authorization: Bearer <token>"
```

### GET /api/launch/projects/{project_id}/signals
Summary: List Launch Signals
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- limit (query, optional) — Limit
- status (query, optional) — Status
- signal_type (query, optional) — Signal Type

Responses:
- 200 — Successful Response
- 200 schema: Response List Launch Signals Api Launch Projects  Project Id  Signals Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/launch/projects/project-demo/signals" \
  -H "Authorization: Bearer <token>"
```

### POST /api/launch/projects/{project_id}/signals
Summary: Create Launch Signal
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — LaunchSignalCreateRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Create Launch Signal Api Launch Projects  Project Id  Signals Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/launch/projects/project-demo/signals" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See LaunchSignalCreateRequest"}'
```

### PATCH /api/launch/projects/{project_id}/signals/{signal_id}
Summary: Update Launch Signal
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- signal_id (path, required) — Signal Id

Request body:
- application/json — LaunchSignalUpdateRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Update Launch Signal Api Launch Projects  Project Id  Signals  Signal Id  Patch
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PATCH "http://localhost:8000/api/launch/projects/project-demo/signals/signal-demo" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See LaunchSignalUpdateRequest"}'
```

### GET /api/launch/projects/{project_id}/summary
Summary: Get Launch Summary
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- days (query, optional) — Days

Responses:
- 200 — Successful Response
- 200 schema: Response Get Launch Summary Api Launch Projects  Project Id  Summary Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/launch/projects/project-demo/summary" \
  -H "Authorization: Bearer <token>"
```

### GET /api/launch/projects/{project_id}/weekly-report
Summary: Get Weekly Launch Report
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- days (query, optional) — Days
- format (query, optional) — Format

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/launch/projects/project-demo/weekly-report" \
  -H "Authorization: Bearer <token>"
```

### GET /api/metrics/health-summary
Summary: Health Summary Alias
Alias for /api/health/summary for legacy monitoring dashboards.
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/metrics/health-summary" \
  -H "Authorization: Bearer <token>"
```

### POST /api/openclaw/character-turn
Summary: Execute a task as a Marvox character
Execute a task using a Marvox character's voice and personality.

Called by OpenClaw when:
- A skill needs to generate a response in character voice
- A task executor wants personality-consistent responses
- A robotics agent needs embodied character interaction

The character will:
1. Receive the task instruction
2. Generate a response in their unique voice
3. Evolve their voice DNA based on the interaction
4. Return emotion-tagged response + voice instructions for TTS
Authentication: Bearer token required

Request body:
- application/json — OpenClawCharacterTurnRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/openclaw/character-turn" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See OpenClawCharacterTurnRequest"}'
```

### POST /api/openclaw/event
Summary: Receive an SRE event from OpenClaw
Called by the local OpenClaw agent when:
- A health probe goes degraded
- Sentry detects a new unresolved error
- A Railway restart is triggered
- An autonomous fix is applied

The event is written to:
1. The audit_logs table via audit_logger
2. A Redis sorted set (keyed by timestamp) for dashboard display
Authentication: Bearer token required

Request body:
- application/json — OpenClawEvent

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/openclaw/event" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See OpenClawEvent"}'
```

### GET /api/openclaw/health
Summary: OpenClaw health check for UI status banner
Lightweight health check for the admin UI status banner.
Does not require authentication in dev mode.
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/openclaw/health" \
  -H "Authorization: Bearer <token>"
```

### GET /api/openclaw/status
Summary: List recent OpenClaw SRE events
Returns the most recent OpenClaw events from the Redis rolling window.
Used by the Marvox Admin dashboard to show SRE activity.
Authentication: Bearer token required

Parameters:
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/openclaw/status" \
  -H "Authorization: Bearer <token>"
```

### POST /api/stepstitch/v1/maintenance/purge-expired
Summary: Purge Expired
Authentication: Bearer token required

Responses:
- 200 — Successful Response
- 200 schema: Response Purge Expired Api Stepstitch V1 Maintenance Purge Expired Post

Example curl:
```bash
curl -X POST "http://localhost:8000/api/stepstitch/v1/maintenance/purge-expired" \
  -H "Authorization: Bearer <token>"
```

### POST /api/stepstitch/v1/session
Summary: Save Session Trace
Authentication: Bearer token required

Request body:
- application/json — IngestTracePayload

Responses:
- 200 — Successful Response
- 200 schema: Response Save Session Trace Api Stepstitch V1 Session Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/stepstitch/v1/session" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See IngestTracePayload"}'
```

### DELETE /api/stepstitch/v1/session/by-user/{target_user_id}
Summary: Delete User Traces
Authentication: Bearer token required

Parameters:
- target_user_id (path, required) — Target User Id

Responses:
- 200 — Successful Response
- 200 schema: Response Delete User Traces Api Stepstitch V1 Session By User  Target User Id  Delete
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X DELETE "http://localhost:8000/api/stepstitch/v1/session/by-user/{target_user_id}" \
  -H "Authorization: Bearer <token>"
```

### GET /api/stepstitch/v1/session/{trace_id}
Summary: Get Session
Authentication: Bearer token required

Parameters:
- trace_id (path, required) — Trace Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Session Api Stepstitch V1 Session  Trace Id  Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/stepstitch/v1/session/{trace_id}" \
  -H "Authorization: Bearer <token>"
```

### GET /api/stepstitch/v1/session/{trace_id}/diagnostic-summary
Summary: Get Diagnostic Summary
Authentication: Bearer token required

Parameters:
- trace_id (path, required) — Trace Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Diagnostic Summary Api Stepstitch V1 Session  Trace Id  Diagnostic Summary Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/stepstitch/v1/session/{trace_id}/diagnostic-summary" \
  -H "Authorization: Bearer <token>"
```

### POST /api/stepstitch/v1/session/{trace_id}/export-preview
Summary: Post Export Preview
Authentication: Bearer token required

Parameters:
- trace_id (path, required) — Trace Id

Responses:
- 200 — Successful Response
- 200 schema: Response Post Export Preview Api Stepstitch V1 Session  Trace Id  Export Preview Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/stepstitch/v1/session/{trace_id}/export-preview" \
  -H "Authorization: Bearer <token>"
```

### POST /api/stepstitch/v1/session/{trace_id}/financial-services-export-preview
Summary: Post Financial Services Export Preview
Authentication: Bearer token required

Parameters:
- trace_id (path, required) — Trace Id

Responses:
- 200 — Successful Response
- 200 schema: Response Post Financial Services Export Preview Api Stepstitch V1 Session  Trace Id  Financial Services Export Preview Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/stepstitch/v1/session/{trace_id}/financial-services-export-preview" \
  -H "Authorization: Bearer <token>"
```

### GET /api/stepstitch/v1/session/{trace_id}/playwright
Summary: Get Compiled Repro
Authentication: Bearer token required

Parameters:
- trace_id (path, required) — Trace Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Compiled Repro Api Stepstitch V1 Session  Trace Id  Playwright Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/stepstitch/v1/session/{trace_id}/playwright" \
  -H "Authorization: Bearer <token>"
```

### GET /api/stepstitch/v1/session/{trace_id}/privacy-posture
Summary: Get Privacy Posture
Authentication: Bearer token required

Parameters:
- trace_id (path, required) — Trace Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Privacy Posture Api Stepstitch V1 Session  Trace Id  Privacy Posture Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/stepstitch/v1/session/{trace_id}/privacy-posture" \
  -H "Authorization: Bearer <token>"
```

### GET /api/stepstitch/v1/session/{trace_id}/replayability
Summary: Get Replayability
Authentication: Bearer token required

Parameters:
- trace_id (path, required) — Trace Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Replayability Api Stepstitch V1 Session  Trace Id  Replayability Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/stepstitch/v1/session/{trace_id}/replayability" \
  -H "Authorization: Bearer <token>"
```

### GET /api/stepstitch/v1/session/{trace_id}/summary
Summary: Get Summary
Authentication: Bearer token required

Parameters:
- trace_id (path, required) — Trace Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Summary Api Stepstitch V1 Session  Trace Id  Summary Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/stepstitch/v1/session/{trace_id}/summary" \
  -H "Authorization: Bearer <token>"
```

### GET /api/stepstitch/v1/sessions
Summary: List Sessions
Authentication: Bearer token required

Parameters:
- user_id (query, optional) — User Id
- project_id (query, optional) — Project Id
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 200 schema: Response List Sessions Api Stepstitch V1 Sessions Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/stepstitch/v1/sessions" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/audiobook/export/{project_id}
Summary: Export Full Audiobook
Concatenates all completed chapters and uploads a master export.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/audiobook/export/project-demo" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/audiobook/manifest/{project_id}
Summary: Get Audiobook Manifest
Returns the chapter-by-chapter audiobook manifest and production status.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/audiobook/manifest/project-demo" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/audiobook/produce/{project_id}/{chapter_number}
Summary: Produce Audiobook Chapter
Triggers a background job to produce a specific chapter.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- chapter_number (path, required) — Chapter Number

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/audiobook/produce/project-demo/{chapter_number}" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/auth/account-recovery
Summary: Account Recovery
Submit an account recovery request (username/email help)
Authentication: Bearer token required

Request body:
- application/json — AccountRecoveryRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/auth/account-recovery" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AccountRecoveryRequest"}'
```

### GET /api/v1/auth/db-status
Summary: Db Status
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/auth/db-status" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/auth/forgot-password
Summary: Forgot Password
Request a password reset link
Authentication: Bearer token required

Request body:
- application/json — ForgotPasswordRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/auth/forgot-password" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ForgotPasswordRequest"}'
```

### POST /api/v1/auth/google/exchange
Summary: Exchange Google Token
Exchange a Google identity token for a Marvox JWT.
Authentication: Bearer token required

Request body:
- application/json — GoogleExchangeRequest

Responses:
- 200 — Successful Response
- 200 schema: GoogleExchangeResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/auth/google/exchange" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See GoogleExchangeRequest"}'
```

### POST /api/v1/auth/login
Summary: Login
Production login (PostgreSQL-only).
Authentication: Bearer token required

Request body:
- application/json — LoginRequest

Responses:
- 200 — Successful Response
- 200 schema: AuthResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See LoginRequest"}'
```

### POST /api/v1/auth/logout
Summary: Logout
Logout endpoint
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/auth/logout" \
  -H "Authorization: Bearer <token>"
```

### DELETE /api/v1/auth/me
Summary: Delete Current User Account
Delete the authenticated user's account and all owned projects.
Authentication: Bearer token required

Request body:
- application/json — DeleteAccountRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X DELETE "http://localhost:8000/api/v1/auth/me" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See DeleteAccountRequest"}'
```

### GET /api/v1/auth/me
Summary: Get Current User Info
Get current user info from PostgreSQL.
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/auth/me" \
  -H "Authorization: Bearer <token>"
```

### PATCH /api/v1/auth/me
Summary: Update Current User Info
Update account profile fields, password, and notification preferences.
Authentication: Bearer token required

Request body:
- application/json — AccountUpdateRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PATCH "http://localhost:8000/api/v1/auth/me" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AccountUpdateRequest"}'
```

### POST /api/v1/auth/onboarding-complete
Summary: Onboarding Complete
Persist onboarding selections and advance the user's workflow stage.
Authentication: Bearer token required

Request body:
- application/json — OnboardingCompleteRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/auth/onboarding-complete" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See OnboardingCompleteRequest"}'
```

### POST /api/v1/auth/register
Summary: Register
Production registration (PostgreSQL-only).
Authentication: Bearer token required

Request body:
- application/json — RegisterRequest

Responses:
- 200 — Successful Response
- 200 schema: AuthResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See RegisterRequest"}'
```

### POST /api/v1/auth/resend-verification
Summary: Resend Verification Email
Resend verification email to user
Authentication: Bearer token required

Request body:
- application/json — ResendVerificationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/auth/resend-verification" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ResendVerificationRequest"}'
```

### POST /api/v1/auth/reset-password
Summary: Reset Password
Reset password using a token
Authentication: Bearer token required

Request body:
- application/json — ResetPasswordRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/auth/reset-password" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ResetPasswordRequest"}'
```

### POST /api/v1/auth/signup
Summary: Register
Production registration (PostgreSQL-only).
Authentication: Bearer token required

Request body:
- application/json — RegisterRequest

Responses:
- 200 — Successful Response
- 200 schema: AuthResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/auth/signup" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See RegisterRequest"}'
```

### POST /api/v1/auth/verify
Summary: Verify Email
Verify email using a token
Authentication: Bearer token required

Request body:
- application/json — VerifyRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/auth/verify" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VerifyRequest"}'
```

### GET /api/v1/characteros/api/v2/projects/{project_id}/identity/candidates
Summary: List Identity Candidates
List Project-scoped identity candidates.
Used for manual reconciliation of fragmented character personas.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- status (query, optional) — Status

Responses:
- 200 — Successful Response
- 200 schema: Response List Identity Candidates Api V1 Characteros Api V2 Projects  Project Id  Identity Candidates Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/api/v2/projects/project-demo/identity/candidates" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/characteros/api/v2/projects/{project_id}/identity/merge
Summary: Merge Identity Candidates
Manually merge two character identity candidates.
Triggers 'Retroactive Healing' across memories, entities, and the story graph.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ManualMergeRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/api/v2/projects/project-demo/identity/merge" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ManualMergeRequest"}'
```

### POST /api/v1/characteros/build
Summary: Build Characteros Legacy
Backward-compatible build endpoint accepting project_id in request body.
Authentication: Bearer token required

Request body:
- application/json — CharacterOSBuildRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Build Characteros Legacy Api V1 Characteros Build Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/build" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CharacterOSBuildRequest"}'
```

### POST /api/v1/characteros/projects/{project_id}/audio
Summary: Generate Micro Audio
Generate professional audio for a specific manuscript snippet.
Used by the Micro-Director HUD in the Workbench.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — CharacterAudioGenerationRequest

Responses:
- 200 — Successful Response
- 200 schema: CharacterAudioGenerationResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/audio" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CharacterAudioGenerationRequest"}'
```

### GET /api/v1/characteros/projects/{project_id}/audio-assets
Summary: List Audio Assets
List audio assets generated for a project, optionally filtered by scene_id.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- scene_id (query, optional) — Scene Id
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/audio-assets" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/characteros/projects/{project_id}/audio-assets/{audio_id}/signed-url
Summary: Get Audio Asset Signed Url
Return a signed URL for an audio asset, suitable for playback.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- audio_id (path, required) — Audio Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/audio-assets/{audio_id}/signed-url" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/characteros/projects/{project_id}/build
Summary: Build Characteros
Manually trigger CharacterOS build for a project

This endpoint can be used to build CharacterOS components after analysis
if the automatic build failed or wasn't triggered.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Build Characteros Api V1 Characteros Projects  Project Id  Build Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/build" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/characteros/projects/{project_id}/build/progress/stream
Summary: Stream Build Progress
SSE stream of CharacterOS build progress for a project.
Emits data: { step, percent, detail, ts } events every 600ms until
percent == 100 or the stream is closed by the client.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/build/progress/stream" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/characteros/projects/{project_id}/characters
Summary: List Character Profiles
Get all character profiles for a project

Returns list of characters with their canonical facts, personality, and canon scope.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response List Character Profiles Api V1 Characteros Projects  Project Id  Characters Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/characters" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/characteros/projects/{project_id}/characters/{character_id}/evolution-state
Summary: Get Evolution State
Get current character DNA + emotional state.

Returns:
- voice_dna: Current vocal signature profile
- emotional_state: Last recorded emotional state (dominant emotion, intensity, etc.)
- interaction_count: Total interactions processed
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Evolution State Api V1 Characteros Projects  Project Id  Characters  Character Id  Evolution State Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/characters/character-demo/evolution-state" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/characteros/projects/{project_id}/characters/{character_id}/interact
Summary: Character Interact
Per-turn character interaction with automatic DNA evolution.

This endpoint glues together:
1. CharacterAgent for response generation
2. EmotionalBeatAnalyzer for emotion extraction
3. MemoryBridge for emotional state persistence
4. DNALearningEngine for voice DNA evolution

DNA evolution is triggered on every interaction (not just quality >=85%).
Use domain param to skip canon context (e.g., domain="robotics_service").
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Request body:
- application/json — CharacterInteractRequest

Responses:
- 200 — Successful Response
- 200 schema: CharacterInteractResult
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/characters/character-demo/interact" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CharacterInteractRequest"}'
```

### POST /api/v1/characteros/projects/{project_id}/characters/{character_id}/reflect
Summary: Trigger an on-demand character reflection cycle
Trigger a background reflection cycle for a character on-demand.

The service:
1. Fetches recent interaction memories
2. Compresses them via the SummarizationAgent
3. Analyses the emotional arc trend
4. Generates a proactive thought for the next session
5. Persists the result as memory_type='daily_reflection'

Returns the reflection payload or {"status": "skipped"} when another
reflection is already running for this character.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Responses:
- 200 — Successful Response
- 200 schema: Response Run Character Reflect Api V1 Characteros Projects  Project Id  Characters  Character Id  Reflect Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/characters/character-demo/reflect" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/characteros/projects/{project_id}/characters/{character_id}/voice/clone
Summary: Clone Character Voice
Clone a voice for a character using provided audio.

Requires:
- voice_audio: Audio file containing the voice to clone (WAV/MP3)
- consent_audio: Recording of the speaker saying the consent phrase
- Subscription tier Pro or higher

Returns the updated voice binding for the character.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Request body:
- multipart/form-data — Body_clone_character_voice_api_v1_characteros_projects__project_id__characters__character_id__voice_clone_post

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/characters/character-demo/voice/clone" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See Body_clone_character_voice_api_v1_characteros_projects__project_id__characters__character_id__voice_clone_post"}'
```

### POST /api/v1/characteros/projects/{project_id}/chat
Summary: Character Chat
Chat with a character using CharacterAgent

Mode Options:
- CANON: Strict adherence to source material (spoiler-protected)
- CANON+INFER: Safe inference from canon context
- BRANCH: Creative expansion beyond canon
- WRITER_ROOM: Creative scene generation maintaining personality
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — CharacterChatRequest

Responses:
- 200 — Successful Response
- 200 schema: CharacterChatResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/chat" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CharacterChatRequest"}'
```

### GET /api/v1/characteros/projects/{project_id}/chat/history
Summary: Get Character Chat History
Return persisted CharacterOS chat history for one character.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (query, required) — Character Id
- limit (query, optional) — Limit

Responses:
- 200 — Successful Response
- 200 schema: CharacterChatHistoryResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/chat/history" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/characteros/projects/{project_id}/codex/lore
Summary: Index Lore
Manually index lore/world fact into the Codex
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — LoreIndexRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Index Lore Api V1 Characteros Projects  Project Id  Codex Lore Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/codex/lore" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See LoreIndexRequest"}'
```

### POST /api/v1/characteros/projects/{project_id}/manuscript/analyze
Summary: Analyze Manuscript Context
Analyzes a snippet of manuscript text to surface relevant lore (The Observer)
and detect canon violations (Consistency Shield).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ManuscriptAnalysisRequest

Responses:
- 200 — Successful Response
- 200 schema: ManuscriptAnalysisResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/manuscript/analyze" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ManuscriptAnalysisRequest"}'
```

### GET /api/v1/characteros/projects/{project_id}/privacy-policy
Summary: Get Privacy Policy
Get privacy policy and data handling info for project
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Privacy Policy Api V1 Characteros Projects  Project Id  Privacy Policy Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/privacy-policy" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/characteros/projects/{project_id}/profile/{character_id}
Summary: Get Character Profile
Get a single character profile by ID

Returns detailed profile including canonical facts, personality, speech patterns,
and canon scope.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Responses:
- 200 — Successful Response
- 200 schema: CharacterProfileResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/profile/character-demo" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/characteros/projects/{project_id}/repair-profiles
Summary: Repair Character Profiles
Idempotent data repair endpoint for missing character profiles.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Repair Character Profiles Api V1 Characteros Projects  Project Id  Repair Profiles Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/repair-profiles" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/characteros/projects/{project_id}/scene
Summary: Generate Scene
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — SceneGenerationRequest

Responses:
- 200 — Successful Response
- 200 schema: SceneGenerationResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/scene" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See SceneGenerationRequest"}'
```

### GET /api/v1/characteros/projects/{project_id}/scene/{scene_id}
Summary: Get Scene Generation Detail
Return a persisted scene generation with full text and continuity payload.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- scene_id (path, required) — Scene Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Scene Generation Detail Api V1 Characteros Projects  Project Id  Scene  Scene Id  Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/scene/scene-demo" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/characteros/projects/{project_id}/scenes
Summary: List Scene Generations
Return persisted scene generations for Scene Simulator history.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- page (query, optional) — Page
- limit (query, optional) — Limit
- search_term (query, optional) — Search Term
- character_id (query, optional) — Character Id
- status (query, optional) — Status
- severity (query, optional) — Severity
- include_text (query, optional) — Include Text

Responses:
- 200 — Successful Response
- 200 schema: Response List Scene Generations Api V1 Characteros Projects  Project Id  Scenes Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/scenes" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/characteros/projects/{project_id}/status
Summary: Get Characteros Status
Get CharacterOS build status for a project

Returns:
- built: bool (is CharacterOS built for this project - checked via explicit build_status flag)
- character_count: int (number of character profiles)
- canon_chunk_count: int (number of indexed canon chunks)
- story_graph_exists: bool (is story graph built)
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Characteros Status Api V1 Characteros Projects  Project Id  Status Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/status" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/characteros/projects/{project_id}/story-graph
Summary: Get Story Graph
Return story graph data for Storyworld graph view.

Always returns a valid payload shape (200) to keep frontend view-state stable.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Story Graph Api V1 Characteros Projects  Project Id  Story Graph Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/story-graph" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/characteros/projects/{project_id}/story-qa
Summary: Story Qa
Answer questions about the story using ReaderAgent

Returns grounded answers with chapter citations.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — StoryQARequest

Responses:
- 200 — Successful Response
- 200 schema: StoryQAResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/story-qa" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See StoryQARequest"}'
```

### GET /api/v1/characteros/projects/{project_id}/storyboard
Summary: Get Storyboard
Return storyboard scene cards for Storyworld storyboard view.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- page (query, optional) — Page
- limit (query, optional) — Limit
- chapter_min (query, optional) — Chapter Min
- chapter_max (query, optional) — Chapter Max
- search_term (query, optional) — Search Term
- importance_min (query, optional) — Importance Min
- character_id (query, optional) — Character Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Storyboard Api V1 Characteros Projects  Project Id  Storyboard Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/storyboard" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/characteros/projects/{project_id}/storyworld/rebuild
Summary: Rebuild Storyworld
Rebuild StoryGraph from persisted project data and save snapshot.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Rebuild Storyworld Api V1 Characteros Projects  Project Id  Storyworld Rebuild Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/storyworld/rebuild" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/characteros/projects/{project_id}/storyworld/refresh
Summary: Refresh Storyworld
Refresh all Storyworld snapshots (graph, timeline, storyboard).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Refresh Storyworld Api V1 Characteros Projects  Project Id  Storyworld Refresh Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/storyworld/refresh" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/characteros/projects/{project_id}/storyworld/snapshots
Summary: List Storyworld Snapshots
List persisted Storyworld snapshots for this project.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response List Storyworld Snapshots Api V1 Characteros Projects  Project Id  Storyworld Snapshots Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/storyworld/snapshots" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/characteros/projects/{project_id}/storyworld/snapshots/{snapshot_type}
Summary: Get Storyworld Snapshot
Get one persisted Storyworld snapshot by type/chapter.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- snapshot_type (path, required) — Snapshot Type
- chapter (query, optional) — Chapter

Responses:
- 200 — Successful Response
- 200 schema: Response Get Storyworld Snapshot Api V1 Characteros Projects  Project Id  Storyworld Snapshots  Snapshot Type  Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/storyworld/snapshots/latest" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/characteros/projects/{project_id}/timeline
Summary: Get Timeline
Return timeline events for Storyworld timeline view.

Events are derived from timeline markers (if available) and scene generations.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Timeline Api V1 Characteros Projects  Project Id  Timeline Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/timeline" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/characteros/projects/{project_id}/world/entities
Summary: List World Entities
List world entities for a project
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- entity_type (query, optional) — Entity Type

Responses:
- 200 — Successful Response
- 200 schema: Response List World Entities Api V1 Characteros Projects  Project Id  World Entities Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/characteros/projects/project-demo/world/entities" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/characteros/projects/{project_id}/world/entities
Summary: Upsert World Entity
Create or update a world entity (Environmental Persistence)
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — WorldEntityUpsertRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Upsert World Entity Api V1 Characteros Projects  Project Id  World Entities Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/characteros/projects/project-demo/world/entities" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See WorldEntityUpsertRequest"}'
```

### GET /api/v1/dashboard/overview
Summary: Get Dashboard Overview
Return cross-project overview data for the authenticated user.
Authentication: Bearer token required

Parameters:
- recent_projects_limit (query, optional) — Recent Projects Limit
- active_jobs_limit (query, optional) — Active Jobs Limit
- recent_activity_limit (query, optional) — Recent Activity Limit

Responses:
- 200 — Successful Response
- 200 schema: Response Get Dashboard Overview Api V1 Dashboard Overview Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/dashboard/overview" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/jobs/cleanup
Summary: Cleanup Jobs
Cleanup terminal jobs using the configured retention policy.
Authentication: Bearer token required

Request body:
- application/json — JobsCleanupRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Cleanup Jobs Api V1 Jobs Cleanup Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/jobs/cleanup" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See JobsCleanupRequest"}'
```

### GET /api/v1/jobs/{job_id}
Summary: Get Job
Get job status. Maps project_id to job progress or uses real jobs.
Authentication: Bearer token required

Parameters:
- job_id (path, required) — Job Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Job Api V1 Jobs  Job Id  Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/jobs/job-demo" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/jobs/{job_id}/cancel
Summary: Cancel Job
Cancel a persisted background job and stop any running tracked task.
Authentication: Bearer token required

Parameters:
- job_id (path, required) — Job Id

Responses:
- 200 — Successful Response
- 200 schema: Response Cancel Job Api V1 Jobs  Job Id  Cancel Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/jobs/job-demo/cancel" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/jobs/{job_id}/detailed
Summary: Get Detailed Job
Get detailed job information including stages and substeps.
Authentication: Bearer token required

Parameters:
- job_id (path, required) — Job Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Detailed Job Api V1 Jobs  Job Id  Detailed Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/jobs/job-demo/detailed" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/projects
Summary: List Projects
Authentication: Bearer token required

Parameters:
- limit (query, optional) — Limit
- offset (query, optional) — Offset
- sort_by (query, optional) — Sort By
- sort_order (query, optional) — Sort Order
- q (query, optional) — Q
- status (query, optional) — Status

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/projects" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/projects/batch-delete
Summary: Batch Delete Projects Route
Authentication: Bearer token required

Request body:
- application/json — BatchDeleteRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/batch-delete" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See BatchDeleteRequest"}'
```

### POST /api/v1/projects/upload-manuscript
Summary: Upload Manuscript And Create Project
Authentication: Bearer token required

Request body:
- multipart/form-data — Body_upload_manuscript_and_create_project_api_v1_projects_upload_manuscript_post

Responses:
- 200 — Successful Response
- 200 schema: InitialProjectResponse
- 400 — Bad Request
- 400 schema: ErrorResponse
- 401 — Unauthorized
- 401 schema: ErrorResponse
- 403 — Forbidden
- 403 schema: ErrorResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError
- 500 — Internal Server Error
- 500 schema: ErrorResponse

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/upload-manuscript" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See Body_upload_manuscript_and_create_project_api_v1_projects_upload_manuscript_post"}'
```

### DELETE /api/v1/projects/{project_id}
Summary: Delete Project Route
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X DELETE "http://localhost:8000/api/v1/projects/project-demo" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/projects/{project_id}
Summary: Get Project Details Route
Returns a comprehensive dashboard response for the project, including:
- Basic metadata
- Core statistics
- Characters
- Detailed analysis results (if available)
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/projects/project-demo" \
  -H "Authorization: Bearer <token>"
```

### PATCH /api/v1/projects/{project_id}
Summary: Patch Project Metadata
Update editable project metadata such as title and description.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ProjectMetadataPatchRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PATCH "http://localhost:8000/api/v1/projects/project-demo" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ProjectMetadataPatchRequest"}'
```

### POST /api/v1/projects/{project_id}/analysis/recover
Summary: Recover Project Analysis
Dedicated recovery endpoint: atomically cancels any stuck/running analysis
jobs for *project_id*, resets the project back to ``uploaded``, and
immediately enqueues a fresh analysis job.

Unlike ``/re-analyze``, this route:
• Is available to any verified free-tier user (recovery is not a Pro feature).
• Accepts projects in ANY status (not just a fixed recovery-state whitelist).
• Returns the full recovery result dict so callers can inspect cancelled jobs.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/project-demo/analysis/recover" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/projects/{project_id}/audio
Summary: Generate Micro Audio
Generate professional audio for a specific manuscript snippet.
Used by the Micro-Director HUD in the Workbench.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — CharacterAudioGenerationRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/project-demo/audio" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See CharacterAudioGenerationRequest"}'
```

### GET /api/v1/projects/{project_id}/chapters
Summary: Get Project Chapters Manifest Route
Returns the canonical chapter manifest for the project.
Used by the Audiobook Production workbench to track synthesis status and staleness.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/projects/project-demo/chapters" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/projects/{project_id}/characters
Summary: Get Project Characters Route
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/projects/project-demo/characters" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/projects/{project_id}/export/{export_type}
Summary: Export Project Data
Real export endpoint for various data types.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- export_type (path, required) — Export Type

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/projects/project-demo/export/{export_type}" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/projects/{project_id}/jobs/active
Summary: Get Active Jobs
Get active jobs for a project.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Get Active Jobs Api V1 Projects  Project Id  Jobs Active Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/projects/project-demo/jobs/active" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/projects/{project_id}/jobs/analysis
Summary: Start Analysis Job
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Start Analysis Job Api V1 Projects  Project Id  Jobs Analysis Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/project-demo/jobs/analysis" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/projects/{project_id}/jobs/characteros
Summary: Start Characteros Job
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Start Characteros Job Api V1 Projects  Project Id  Jobs Characteros Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/project-demo/jobs/characteros" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/projects/{project_id}/jobs/make-ready
Summary: Start Make Ready Job
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Start Make Ready Job Api V1 Projects  Project Id  Jobs Make Ready Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/project-demo/jobs/make-ready" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/projects/{project_id}/manuscript
Summary: Get Project Manuscript Route
Return extracted manuscript text for the dedicated manuscript workspace.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/projects/project-demo/manuscript" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/projects/{project_id}/manuscript/analyze
Summary: Analyze Manuscript Context
Analyzes a snippet of manuscript text to surface relevant lore (The Observer)
and detect canon violations (Consistency Shield).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ManuscriptAnalysisRequest

Responses:
- 200 — Successful Response
- 200 schema: ManuscriptAnalysisResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/project-demo/manuscript/analyze" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ManuscriptAnalysisRequest"}'
```

### GET /api/v1/projects/{project_id}/manuscript/chapters/{chapter_number}
Summary: Get Project Chapter Route
Return a single chapter's ordered paragraphs for lazy reader loading.

1-based chapter_number. Paragraphs carry stable global source_paragraph_index
values aligned with the speaker-override contract. source_start/source_end are
char offsets into the normalized manuscript, consistent with the chapter manifest
(`GET /projects/{id}/chapters`).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- chapter_number (path, required) — Chapter Number

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/projects/project-demo/manuscript/chapters/{chapter_number}" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/projects/{project_id}/manuscript/speaker-overrides
Summary: List Speaker Overrides
Return manual speaker overrides for the project at a manuscript_version
(defaults to the project's current version).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- manuscript_version (query, optional) — Manuscript Version

Responses:
- 200 — Successful Response
- 200 schema: Response List Speaker Overrides Api V1 Projects  Project Id  Manuscript Speaker Overrides Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/projects/project-demo/manuscript/speaker-overrides" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/projects/{project_id}/manuscript/speaker-overrides
Summary: Upsert Speaker Override
Upsert a manual speaker override. The override re-shapes voice-blocks output
(and therefore audio previews/production) for the matching quote. quote_hash is
derived server-side so write and read agree. See contracts/speaker-attribution.md.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — SpeakerOverrideRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Upsert Speaker Override Api V1 Projects  Project Id  Manuscript Speaker Overrides Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/project-demo/manuscript/speaker-overrides" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See SpeakerOverrideRequest"}'
```

### POST /api/v1/projects/{project_id}/manuscript/update
Summary: Update Manuscript Text
Update the manuscript text content for a project.

This endpoint allows users to edit paragraphs and save changes back to blob storage.
The entire manuscript text is persisted, preserving formatting and structure.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ManuscriptUpdateRequest

Responses:
- 200 — Successful Response
- 200 schema: ManuscriptUpdateResponse
- 400 — Bad Request
- 400 schema: Response 400 Update Manuscript Text Api V1 Projects  Project Id  Manuscript Update Post
- 401 — Unauthorized
- 401 schema: Response 401 Update Manuscript Text Api V1 Projects  Project Id  Manuscript Update Post
- 404 — Not Found
- 404 schema: Response 404 Update Manuscript Text Api V1 Projects  Project Id  Manuscript Update Post
- 409 — Conflict
- 409 schema: Response 409 Update Manuscript Text Api V1 Projects  Project Id  Manuscript Update Post
- 422 — Validation Error
- 422 schema: HTTPValidationError
- 500 — Internal Server Error
- 500 schema: Response 500 Update Manuscript Text Api V1 Projects  Project Id  Manuscript Update Post

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/project-demo/manuscript/update" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ManuscriptUpdateRequest"}'
```

### POST /api/v1/projects/{project_id}/manuscript/voice-blocks
Summary: Get Manuscript Voice Blocks
Parse a manuscript passage and return speaker-attributed voice blocks with VoiceDNA.

Uses ProseDialogueParser (5-layer attribution: speech_verb → POV → thought_verb
→ pronoun_chain → LLM fallback) to identify who is speaking in each sentence,
then attaches the speaker's voice_id and voice_dna from their CharacterOS profile.

This is the core of the VoiceDNA MOAT: the manuscript becomes aware of its own
voice distribution, enabling the reading surface to show character voices inline.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — VoiceBlocksRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Get Manuscript Voice Blocks Api V1 Projects  Project Id  Manuscript Voice Blocks Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/project-demo/manuscript/voice-blocks" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See VoiceBlocksRequest"}'
```

### POST /api/v1/projects/{project_id}/produce
Summary: Start Audiobook Production Route
Triggers a full-book audiobook production job.
This job iterates through chapters and renders dirty/stale content.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/project-demo/produce" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/projects/{project_id}/re-analyze
Summary: Reanalyze Project
Trigger a fresh analysis run for an existing project.

Recovery states (integrity_blocked, analysis_failed, uploaded): any
verified owner may re-run without a Pro subscription.

Optional manual re-analysis of an already-analyzed project requires Pro.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/project-demo/re-analyze" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/projects/{project_id}/settings
Summary: Get Project Settings
Retrieve project settings (audio, display, continuity preferences).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- effective (query, optional) — Effective

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/projects/project-demo/settings" \
  -H "Authorization: Bearer <token>"
```

### PUT /api/v1/projects/{project_id}/settings
Summary: Put Project Settings
Update project settings (partial patch, normalized before persistence).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — ProjectSettingsPatchRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PUT "http://localhost:8000/api/v1/projects/project-demo/settings" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See ProjectSettingsPatchRequest"}'
```

### POST /api/v1/projects/{project_id}/story-qa
Summary: Story Qa
Answer questions about the story using ReaderAgent

Returns grounded answers with chapter citations.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — StoryQARequest

Responses:
- 200 — Successful Response
- 200 schema: StoryQAResponse
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/project-demo/story-qa" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See StoryQARequest"}'
```

### GET /api/v1/projects/{project_id}/storyworld-report
Summary: Export Storyworld Report
Storyworld Report — the sellable Storyworld Package (Workstream C).

Formats: json (data, all tiers) | html, pdf (downloadable deliverable, Pro+).
409 when analysis is stale; never emits a report from stale analysis.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- format (query, optional) — Format

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/projects/project-demo/storyworld-report" \
  -H "Authorization: Bearer <token>"
```

### PUT /api/v1/projects/{project_id}/studio-config
Summary: Put Project Studio Config
Update premium studio aesthetics and structural settings (persisted to DB).
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — StudioConfigUpdateRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PUT "http://localhost:8000/api/v1/projects/project-demo/studio-config" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See StudioConfigUpdateRequest"}'
```

### GET /api/v1/projects/{project_id}/summary
Summary: Get Project Summary Route
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/projects/project-demo/summary" \
  -H "Authorization: Bearer <token>"
```

### GET /api/v1/projects/{project_id}/world/entities
Summary: List World Entities
List world entities for a project
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- entity_type (query, optional) — Entity Type

Responses:
- 200 — Successful Response
- 200 schema: Response List World Entities Api V1 Projects  Project Id  World Entities Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/v1/projects/project-demo/world/entities" \
  -H "Authorization: Bearer <token>"
```

### POST /api/v1/projects/{project_id}/world/entities
Summary: Upsert World Entity
Create or update a world entity (Environmental Persistence)
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — WorldEntityUpsertRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Upsert World Entity Api V1 Projects  Project Id  World Entities Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/v1/projects/project-demo/world/entities" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See WorldEntityUpsertRequest"}'
```
