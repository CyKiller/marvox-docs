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

### POST /api/auth/demo-login
Summary: Demo Login
Demo login endpoint: creates a temporary user and returns a token.
Bypasses onboarding.
Authentication: none

Responses:
- 200 — Successful Response
- 200 schema: AuthResponse

Example curl:
```bash
curl -X POST "http://localhost:8000/api/auth/demo-login"
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
Production login (PostgreSQL-only)
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
Get current user info from PostgreSQL
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
Production registration (PostgreSQL-only)
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

### POST /api/projects
Summary: Create Project Legacy
Create a new project with file upload or text content (original route)
Authentication: Bearer token required

Responses:
- 201 — Successful Response
- 201 schema: ProjectCreateResponse

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects" \
  -H "Authorization: Bearer <token>"
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

### POST /api/projects/{project_id}/re-analyze
Summary: Reanalyze Project
Trigger a fresh analysis run for an existing project.
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

### POST /api/projects/{project_id}/upload
Summary: Upload Project File Legacy
Backward-compatible upload endpoint expected by legacy tests/clients.
Accepts multipart form upload and lenient form payloads used by older callers.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/projects/project-demo/upload" \
  -H "Authorization: Bearer <token>"
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

## CharacterOS

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

### DELETE /api/characteros/projects/{project_id}
Summary: Delete Project
Permanently delete project and all associated data
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 200 schema: Response Delete Project Api Characteros Projects  Project Id  Delete
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X DELETE "http://localhost:8000/api/characteros/projects/project-demo" \
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
- multipart/form-data — Body

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/livevoice/session/session-demo/turn" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See Body"}'
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

Returns detailed profile including canonical facts, personality, speech patterns, and canon scope.
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

### POST /api/characteros/projects/{project_id}/characters/{character_id}/interact
Summary: Character Interact
Continue a conversation with a character using the real interaction service.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Request body:
- application/json — CharacterInteractRequest

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/characters/character-demo/interact" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, who are you?", "mode": "CANON"}'
```

### GET /api/characteros/projects/{project_id}/characters/{character_id}/evolution-state
Summary: Get Character Evolution State
Returns the current emotional arc trend, voice DNA state, and personality evolution history for a character.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- character_id (path, required) — Character Id

Responses:
- 200 — Successful Response (includes arc_trend, voice_dna, evolution_history)
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/characteros/projects/project-demo/characters/character-demo/evolution-state" \
  -H "Authorization: Bearer <token>"
```

### POST /api/characteros/projects/{project_id}/scene
Summary: Generate Scene
Generate multi-character scene using WriterAgent + ContinuityAgent

Validates character count against configured limits.
Automatically validates continuity with canon using a 3-pass orchestration:
- **Pass 1**: Initial continuity validation (fast or full, configurable)
- **Pass 2**: Full continuity validation after optional revision (always full mode)
- **Pass 3**: Post-narrator continuity check (fast, warn-only — never triggers revision)

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

Response fields (SceneGenerationResponse) — continuity:
- `continuity_passed` (boolean) — Whether canon validation passed (based on Pass 2)
- `continuity_pass_1` (object) — Pass 1 result: `{passed, severity, mode, fail_reasons, warning_count}`
- `continuity_pass_2` (object) — Pass 2 result: `{passed, severity, mode, fail_reasons, warning_count}`
- `continuity_pass_3` (object, optional) — Pass 3 warn-only result; present only when `narration_applied=true`: `{passed, severity, mode, fail_reasons, warning_count}`
- `narration_applied` (boolean) — Whether NarratorAgent framing was applied
- `warnings` (array) — All warnings accumulated across passes; Pass 3 failures appear here prefixed with ⚠️

Example curl:
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/project-demo/scene" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See SceneGenerationRequest"}'
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

### POST /api/audio/api/characteros/projects/{project_id}/audio/stream
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
curl -X POST "http://localhost:8000/api/audio/api/characteros/projects/project-demo/audio/stream" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AudioGenerationRequest"}'
```

### POST /api/audio/api/characteros/projects/{project_id}/audio/stream-metadata
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
curl -X POST "http://localhost:8000/api/audio/api/characteros/projects/project-demo/audio/stream-metadata" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See AudioGenerationRequest"}'
```

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
Summary: Generate Audio
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

## Demo

### GET /api/demo/alice
Summary: Get Alice Demo
Return combined demo payload (analysis + project).
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/demo/alice" \
  -H "Authorization: Bearer <token>"
```

### GET /api/demo/alice/analysis
Summary: Get Alice Analysis
Return real AI analysis for Alice.
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/demo/alice/analysis" \
  -H "Authorization: Bearer <token>"
```

### GET /api/demo/alice/project
Summary: Get Alice Project
Return fast real project metadata for the persisted Alice demo.
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/demo/alice/project" \
  -H "Authorization: Bearer <token>"
```

### POST /api/demo/load-alice
Summary: Load Alice Demo
Authentication: Bearer token required

Responses:
- 200 — Successful Response
- 200 schema: Response Load Alice Demo Api Demo Load Alice Post

Example curl:
```bash
curl -X POST "http://localhost:8000/api/demo/load-alice" \
  -H "Authorization: Bearer <token>"
```

### GET /api/demo/project-status/{project_id}
Summary: Get Demo Project Status
Legacy mapping to the demo payload.
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Responses:
- 200 — Successful Response
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/demo/project-status/project-demo" \
  -H "Authorization: Bearer <token>"
```

## Add-ons

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
Transcribe audio file to text using OpenAI Whisper API.

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
Summary: Api Health
Liveness probe endpoint. Process-level only.
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/health"
```

### GET /api/health/ready
Summary: Api Readiness
Launch-readiness probe. Returns 503 on hard blockers.
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/health/ready"
```

### GET /health/
Summary: Root
Root endpoint
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/health/"
```

### GET /health/api/health
Summary: Api Health Check
Standard API health check endpoint
Authentication: none

Responses:
- 200 — Successful Response
- 200 schema: HealthResponse

Example curl:
```bash
curl -X GET "http://localhost:8000/health/api/health"
```

### GET /health/database
Summary: Health Database
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/health/database"
```

### GET /health/health
Summary: Health Check
Simple health check that always works
Authentication: none

Responses:
- 200 — Successful Response
- 200 schema: HealthResponse

Example curl:
```bash
curl -X GET "http://localhost:8000/health/health"
```

### GET /health/openai
Summary: Health Openai
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/health/openai"
```

### GET /health/redis
Summary: Health Redis
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/health/redis"
```

### GET /health/vector-db
Summary: Health Vector Db
Authentication: none

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/health/vector-db"
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

## Legacy / Deprecated

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
Returns comprehensive analysis data for all analysis pages.
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
Get world/setting analysis data
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

### GET /api/launch-ops/db-check
Summary: Db Check
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/launch-ops/db-check" \
  -H "Authorization: Bearer <token>"
```

### GET /api/launch-ops/projects/{project_id}/signals
Summary: List Launch Signals
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- limit (query, optional) — Limit
- status (query, optional) — Status
- signal_type (query, optional) — Signal Type

Responses:
- 200 — Successful Response
- 200 schema: Response List Launch Signals Api Launch Ops Projects  Project Id  Signals Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/launch-ops/projects/project-demo/signals" \
  -H "Authorization: Bearer <token>"
```

### POST /api/launch-ops/projects/{project_id}/signals
Summary: Create Launch Signal
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id

Request body:
- application/json — LaunchSignalCreateRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Create Launch Signal Api Launch Ops Projects  Project Id  Signals Post
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X POST "http://localhost:8000/api/launch-ops/projects/project-demo/signals" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See LaunchSignalCreateRequest"}'
```

### PATCH /api/launch-ops/projects/{project_id}/signals/{signal_id}
Summary: Update Launch Signal
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- signal_id (path, required) — Signal Id

Request body:
- application/json — LaunchSignalUpdateRequest

Responses:
- 200 — Successful Response
- 200 schema: Response Update Launch Signal Api Launch Ops Projects  Project Id  Signals  Signal Id  Patch
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X PATCH "http://localhost:8000/api/launch-ops/projects/project-demo/signals/signal-demo" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"example": "See LaunchSignalUpdateRequest"}'
```

### GET /api/launch-ops/projects/{project_id}/summary
Summary: Get Launch Summary
Authentication: Bearer token required

Parameters:
- project_id (path, required) — Project Id
- days (query, optional) — Days

Responses:
- 200 — Successful Response
- 200 schema: Response Get Launch Summary Api Launch Ops Projects  Project Id  Summary Get
- 422 — Validation Error
- 422 schema: HTTPValidationError

Example curl:
```bash
curl -X GET "http://localhost:8000/api/launch-ops/projects/project-demo/summary" \
  -H "Authorization: Bearer <token>"
```

### GET /api/launch-ops/projects/{project_id}/weekly-report
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
curl -X GET "http://localhost:8000/api/launch-ops/projects/project-demo/weekly-report" \
  -H "Authorization: Bearer <token>"
```

### GET /api/metrics/health-summary
Summary: Metrics Health Summary
Authentication: Bearer token required

Responses:
- 200 — Successful Response

Example curl:
```bash
curl -X GET "http://localhost:8000/api/metrics/health-summary" \
  -H "Authorization: Bearer <token>"
```

---

## Phase 4: API Key Management & Character Reflection

### API Key Management

API keys enable programmatic access to Marvox without user login credentials. Each API key is tied to a project and can be revoked or expired independently.

**Key Features**:
- One-time key display (key shown only at creation)
- SHA256 hashing of key values in database
- Optional expiration dates
- Last-used tracking for audit purposes
- Soft-deletion via `is_active` flag

#### POST /api/billing/api-keys
Summary: Create API Key
Creates a new API key for programmatic access to your project

Authentication: Bearer token (JWT) required

Request body:
- application/json — CreateAPIKeyRequest
  - `name` (string) — Human-readable name for the key
  - `expires_in_days` (integer, optional) — Days until key expires (default: 90)

Responses:
- 201 — Created
  - `api_key` (string) — Full API key (shown only once!)
  - `api_key_id` (string) — Key identifier
  - `key_prefix` (string) — First 10 characters (for identification)
  - `created_at` (datetime)
  - `expires_at` (datetime, optional)
  
- 422 — Validation Error
- 401 — Unauthorized (invalid JWT)

Example curl:
```bash
curl -X POST "http://localhost:8000/api/billing/api-keys" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Integration",
    "expires_in_days": 90
  }'

# Response:
# {
#   "api_key": "mrvx_z7k9x2q8m1p5n8x9a0b1c2d3e4f5g6h7i8j9k...",
#   "api_key_id": "key_abc123xyz789",
#   "key_prefix": "mrvx_z7k9x2q8",
#   "created_at": "2026-03-19T12:00:00Z",
#   "expires_at": "2026-06-17T12:00:00Z"
# }
```

**Important**: Save the `api_key` value immediately — it will not be shown again!

#### GET /api/billing/api-keys
Summary: List API Keys
Lists all API keys for your project (without exposed key values)

Authentication: Bearer token (JWT) required

Parameters:
- project_id (query, optional) — Filter by project

Responses:
- 200 — Successful Response
  - Array of objects:
    - `api_key_id` (string)
    - `key_prefix` (string) — First 10 chars only
    - `name` (string)
    - `created_at` (datetime)
    - `last_used_at` (datetime, optional)
    - `expires_at` (datetime, optional)
    - `is_active` (boolean)

- 422 — Validation Error
- 401 — Unauthorized

Example curl:
```bash
curl -X GET "http://localhost:8000/api/billing/api-keys" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -H "Content-Type: application/json"
```

#### DELETE /api/billing/api-keys/{key_id}
Summary: Revoke API Key
Soft-deletes (revokes) an API key. The key cannot be used after revocation.

Authentication: Bearer token (JWT) required

Parameters:
- key_id (path, required) — API Key ID

Responses:
- 204 — Deleted
- 404 — Not Found (key doesn't exist or already revoked)
- 401 — Unauthorized
- 403 — Forbidden (key belongs to different project)

Example curl:
```bash
curl -X DELETE "http://localhost:8000/api/billing/api-keys/key_abc123xyz789" \
  -H "Authorization: Bearer <your_jwt_token>"
```

### Using API Keys

Once created, use the API key as a Bearer token in the `Authorization` header:

```bash
curl -X POST "http://localhost:8000/api/characteros/projects/my-project/characters/alice/reflect" \
  -H "Authorization: Bearer mrvx_z7k9x2q8m1p5n..." \
  -H "Content-Type: application/json"
```

**Important**:
- Treat API keys like passwords — do not commit them to version control
- Use short expiration times (30-90 days recommended)
- Monitor `last_used_at` field for unused keys and revoke them

---

### Character Reflection

Background reflection enables characters to "think" between sessions, creating memory and personality evolution. Reflections analyze recent conversations, compute emotional arc trends, and generate character thoughts.

#### POST /api/characteros/projects/{project_id}/characters/{character_id}/reflect
Summary: Trigger Character Reflection
Manually triggers a reflection cycle for a character. Reflections run automatically nightly at 2 AM UTC if enabled.

Authentication: Bearer token (JWT or API key) required

Parameters:
- project_id (path, required) — Project ID
- character_id (path, required) — Character ID

Request body:
- application/json (optional) — Empty object `{}`

Responses:
- 200 — Successful Response
  - `character_id` (string)
  - `daily_reflection` (string) — Generated reflection text
  - `arc_trend` (string) — One of: `improving`, `stable`, `declining`
  - `memory_saved` (boolean) — Whether reflection was saved to memory
  - `reflection_data` (object):
    - `recent_memories` (array) — Chat/scene memories analyzed
    - `emotion_summary` (string) — Brief emotional analysis
    - `memory_id` (string) — Saved memory identifier
    
- 404 — Not Found (project or character doesn't exist)
- 422 — Validation Error
- 503 — Service Unavailable (character memory service unavailable)

Relevant Error Codes:
- `REFLECT_NO_MEMORIES` — No memories to reflect on
- `REFLECT_FAILED` — Reflection generation failed

Example curl (JWT):
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/my-project-id/characters/alice/reflect" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# {
#   "character_id": "alice",
#   "daily_reflection": "Alice reflected on her curious encounters today. She feels more empowered and ready for adventure.",
#   "arc_trend": "improving",
#   "memory_saved": true,
#   "reflection_data": {
#     "recent_memories": [
#       {"type": "character_chat", "content": "Alice talked about...", "timestamp": "2026-03-19T10:00:00Z"},
#       {"type": "scene_generation", "content": "Alice participated in...", "timestamp": "2026-03-19T09:15:00Z"}
#     ],
#     "emotion_summary": "Positive emotional arc with curiosity emerging as dominant trait",
#     "memory_id": "mem_xyz789"
#   }
# }
```

Example curl (API Key):
```bash
curl -X POST "http://localhost:8000/api/characteros/projects/my-project-id/characters/alice/reflect" \
  -H "Authorization: Bearer mrvx_z7k9x2q..." \
  -H "Content-Type: application/json" \
  -d '{}'
```

**How Reflection Works**:
1. **Load Character Profile** — Retrieves personality traits, voice binding, and canon scope
2. **Fetch Recent Memories** — Gathers last 24 hours of chat/scene interactions
3. **Summarize** — Compresses memories into 2-sentence summary for efficient storage
4. **Analyze Arc** — Computes emotional beat trend (improving/stable/declining)
5. **Generate Thought** — Character AI generates a natural reflection
6. **Persist** — Saves reflection as a "daily_reflection" memory type
7. **Return** — Sends reflection data back for UI display (optional)

**Background Scheduling**:
- Automatic reflections run nightly at **2 AM UTC**
- Configured via `run_nightly_reflections_for_all()` in agent runtime
- Per-character concurrency control via asyncio locks (prevents duplicate reflections)
- Scheduling can be verified in backend logs

---

## OpenAI Cost Tracking

Phase 4 adds cost tracking for OpenAI API calls:

- **OPENAI_API_USAGE_WARNING_THRESHOLD**: Environment variable (default: 80)
  - When OpenAI API cost exceeds this percentage of your account's monthly limit, warnings are emitted
  - Accessible via `OpenAIService.should_warn_about_usage()` method
  - Used by API key management system to alert project owners

Example warning check:
```python
from services.openai_service import openai_service

is_warned = await openai_service.should_warn_about_usage()
if is_warned:
    # Log warning, notify user, throttle API calls, etc.
    logger.warning("OpenAI usage approaching limit")
