# Start Here

Marvox is a Storyworld Production Studio built around CharacterOS. This guide is the canonical onboarding entrypoint for both developers and product users.

---

## Fast Orientation

Marvox takes a manuscript and produces a working storyworld:
- Analysis → Character profiles → Canon index → Scenes → Audio → Export

If you are new, start with the browser flow the codebase is built around:
- Homepage → Demo → `/projects/sample` → auth-preserved studio entry → CharacterOS → Scene review → Audio handoff

Follow the workflow below before diving into lower-level API or runtime details.

---

## Developer Setup (Local)

### Prerequisites
- Python 3.10+ (3.11+ recommended)
- Node.js 18+

### Install Dependencies
```bash
pip install -r requirements.txt
npm install
```

### Environment
Create `.env` from `.env.example` and set at least:
- `OPENAI_API_KEY`
- `JWT_SECRET_KEY`

Optional but common:
- `OPENAI_MODEL_NAME`
- `CORS_ALLOWED_ORIGINS`
- Storage configuration: `BLOB_READ_WRITE_TOKEN` or S3-compatible variables (see `DEPLOYMENT.md`)

### Run Backend
```bash
python main.py
```

### Run Frontend
```bash
npm run dev
```

Frontend: `http://localhost:3000`  
API docs: `http://localhost:8000/docs`

---

## Product Workflow (P0 Loop)

1. Upload manuscript → analysis job
2. Build CharacterOS (profiles + canon index)
3. Ask canon-grounded questions or generate a teaser scene
4. Continuity validation + 1 revise pass max
5. Generate multi‑voice audio preview
6. Save to Library → Export/Share deliverable

---

## Minimal Auth Flow (API)

Most `/api/*` routes require a JWT Bearer token.

### 1. Register or Demo Login
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"password","name":"You"}'
```

Or demo login:
```bash
curl -X POST http://localhost:8000/api/auth/demo-login \
  -H "Content-Type: application/json"
```

### 2. Use the Token
```bash
curl -X POST http://localhost:8000/api/projects/upload-manuscript \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=My Story" \
  -F "description=Test" \
  -F "file=@alice_in_wonderland.txt"
```

---

## Programmatic Access (API Keys)

For server-to-server access without user login, use API keys:

### 1. Create an API Key
```bash
curl -X POST http://localhost:8000/api/billing/api-keys \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Integration","expires_in_days":90}'

# Response (save the `api_key` value — it's shown only once):
# {
#   "api_key": "mrvx_z7k9x2q8m1p5n...",
#   "api_key_id": "key_abc123...",
#   "expires_at": "2026-06-18T..."
# }
```

### 2. Use the API Key
```bash
curl -X POST http://localhost:8000/api/characteros/projects/my-project-id/characters/alice/reflect \
  -H "Authorization: Bearer mrvx_z7k9x2q8m1p5n..." \
  -H "Content-Type: application/json"

# Response: Character's nightly reflection data
```

### 3. List & Manage Keys
```bash
# List all API keys for your project
curl http://localhost:8000/api/billing/api-keys \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Revoke a key (soft-delete)
curl -X DELETE http://localhost:8000/api/billing/api-keys/key_abc123 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

See `docs/API.md` for the full API reference.

---

## Character Reflection (Background Processing)

Characters automatically reflect on their recent conversations and scenes during nightly processing. This enables character memory and personality evolution across sessions.

### Manual Reflection Trigger
```bash
curl -X POST http://localhost:8000/api/characteros/projects/my-project-id/characters/alice/reflect \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"

# Response:
# {
#   "character_id": "alice",
#   "daily_reflection": "Alice reflected on...",
#   "arc_trend": "improving",  # or "stable" / "declining"
#   "memory_saved": true
# }
```

**How it works**:
1. Retrieves character's recent chat/scene memories
2. Generates a 2-sentence summary (for efficient storage)
3. Analyzes emotional arc trend (for narrative consistency)
4. Creates a reflection as a new "daily_reflection" memory type
5. Returns data for UI display (optional)

**Key endpoints**:
- `POST /api/characteros/projects/{project_id}/characters/{char_id}/reflect` — Trigger reflection manually
- Nightly automatic reflections run at 2 AM UTC (scheduled in background)

---

## Where to Go Next

- `README.md` for project overview and quick start
- `DEVELOPMENT.md` for dev workflows and scripts
- `docs/API.md` for the generated API reference
- `ARCHITECTURE.md` for system design
