# Marvox Deployment Contract

Marvox supports one deployment topology:

- Public frontend: Vercel
- Browser API origin: same-origin `/api/*` on Vercel
- Backend runtime: Railway
- Primary stateful services: Railway Postgres, Railway Redis, Upstash Vector, Vercel Blob
- Staging model: Vercel preview deployments plus a Railway staging backend

Production and preview deployments do not support local SQLite, local file storage, or local vector backends.

## Railway Backend

Railway hosts the FastAPI application and the primary backend services.

Required Railway variables:

```env
ENVIRONMENT=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET_KEY=replace-with-generated-secret
OPENAI_API_KEY=...
OPENAI_API_USAGE_WARNING_THRESHOLD=80
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
FRONTEND_URL=https://<your-vercel-domain>
CORS_ALLOWED_ORIGINS=https://<your-vercel-domain>
UPSTASH_VECTOR_REST_URL=https://<your-upstash-index>
UPSTASH_VECTOR_REST_TOKEN=...
BLOB_READ_WRITE_TOKEN=...
FROM_EMAIL=onboarding@<your-domain>
SUPPORT_EMAIL=support@<your-domain>
RESEND_API_KEY=...
VECTOR_DB_BACKEND=upstash
```

**New in Phase 4**:
- `OPENAI_API_USAGE_WARNING_THRESHOLD` — Cost threshold for usage warnings (default: 80). API key management system tracks OpenAI cost and warns when usage exceeds this percentage of your account limit.

### Database Migrations

Alembic migrations run automatically at Railway startup. Phase 4 adds:

- **Migration 0011** (`api_keys` table) — Stores API keys with SHA256 hashing, expiration, and usage tracking
  - Schema: `id, project_id, key_hash, key_prefix, name, created_at, last_used_at, expires_at, is_active`
  - Indexes: `project_id`, `key_hash`, `is_active` for query performance
  - No manual intervention required — Railway runs migrations automatically

Current migration state can be checked via:
```bash
alembic current
alembic heads
```

Required staging difference:

- `FRONTEND_URL` and `CORS_ALLOWED_ORIGINS` must point at the Vercel preview/staging frontend you trust.

## Vercel Frontend

Vercel is the only browser-facing deployment surface. The app must call same-origin `/api/*`; `NEXT_PUBLIC_API_URL` is only the backend rewrite target.

Required Vercel variables:

```env
NEXT_PUBLIC_API_URL=https://<your-railway-domain>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
```

Rules:

- Deployed Vercel environments must set `NEXT_PUBLIC_API_URL` explicitly.
- Deployed Railway environments must set `FRONTEND_URL` and `CORS_ALLOWED_ORIGINS` explicitly.
- Vercel preview deployments are the supported frontend staging surface.
- Railway staging is the supported backend staging surface.

## Deployment Flow

### Production
1. Merge to `main`.
2. Vercel deploys the frontend via Git integration.
3. Railway deploys the backend via Git integration.
4. GitHub Actions remain focused on merge-safe CI; deploy workflows are manual/release-stage only.
5. Run `validate-production-release.yml` or `scripts/run_deployed_production_gate.sh` against the live production URLs.

### Staging
1. Push to `develop` or run `.github/workflows/deploy-staging-railway.yml`.
2. Railway deploys the staging backend.
3. Use the matching Vercel preview deployment as the frontend staging surface.

## GitHub Contract

The GitHub repository should reflect the code/runtime truth:

- Required PR checks are limited to the frontend release contract, backend runtime contract, artifact hygiene, secret scan, dependency review, and conditional DB persistence.
- Live TTS, deep golden-path E2E, deployment, and production validation workflows are manual, scheduled, or release-stage checks.
- GitHub Releases are generated from repo truth at tag time and should not embed hardcoded readiness scores or stale architecture counts.

## Phase 4 Features (API Key Management + Character Reflection)

### API Key Management
- **POST** `/api/billing/api-keys` — Create a new API key
- **GET** `/api/billing/api-keys` — List project API keys (requires auth)
- **DELETE** `/api/billing/api-keys/{key_id}` — Revoke an API key

**Verification in production**:
```bash
# Create API key (requires valid JWT token)
curl -X POST https://your-railway-domain/api/billing/api-keys \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"test","expires_in_days":1}'

# Should return 201 with api_key value
```

### Character Reflection
- **POST** `/api/characteros/projects/{project_id}/characters/{char_id}/reflect` — Trigger character reflection manually

**Verification in production**:
```bash
# Trigger reflection (can use API key or JWT token for auth)
curl -X POST https://your-railway-domain/api/characteros/projects/YOUR_PROJECT_ID/characters/alice/reflect \
  -H "Authorization: Bearer YOUR_API_KEY_OR_JWT"

# Should return 200 with reflection data
```

**Background scheduler**: Nightly reflections run automatically at 2 AM UTC (no manual action needed — verify via logs).

## Operational Tuning Knobs

These variables have defaults and are not required in the Railway env. Set them only when you need to override the default behavior.

All are read via `RuntimePolicy.from_env()` in `services/characteros/runtime_policy.py`. Do not hardcode them.

| Variable | Default | Effect |
| --- | --- | --- |
| `MAX_UPLOAD_MB` | `100` | Reject manuscript uploads larger than this before reading into memory |
| `CHAROS_MAX_SCENE_CHARACTERS` | `5` | Backend limit on characters per scene generation |
| `NEXT_PUBLIC_CHAROS_MAX_SCENE_CHARACTERS` | `5` | Frontend scene-character count selector limit |
| `STALE_JOB_SCAN_INTERVAL_SECONDS` | `1800` | How often the background scanner marks stuck `ANALYZING` jobs as failed |
| `STALE_ANALYZING_HOURS` | `2` | Age threshold (hours) before an `ANALYZING` project is marked failed |
| `MEMORY_PRUNE_DAYS` | `90` | Character memory rows older than this are pruned |
| `MEMORY_PRUNE_INTERVAL_SECONDS` | `86400` | How often the memory pruning scheduler runs |
| `MARVOX_EAGER_STORYWORLD_INIT` | auto | Force (`1`) or disable (`0`) eager storyworld initialization at startup |
| `MARVOX_STORYWORLD_INIT_TIMEOUT_SECONDS` | `30` (primary backend) / `6` (other) | Storyworld initialization timeout |
| `AUDIO_BLOB_STRICT` | auto | When set, blob storage fails closed (no local fallback) |
| `SUPPORT_EMAIL` | `support@marvox.app` | Email shown in support, privacy, and account recovery pages |

---

## Verification

Use the canonical topology check:

```bash
FRONTEND_URL=https://<your-vercel-domain> \
BACKEND_URL=https://<your-railway-domain> \
./scripts/production-checklist.sh
```

Treat any `/api/health/ready` failure as launch-blocking.

## Operations Notes

- Do not commit Vercel, Railway, Stripe, Upstash, Blob, or OpenAI secrets.
- Store deployment credentials in Railway, Vercel, and GitHub Actions secrets only.
- Remove unsupported deployment paths rather than keeping them as fallback options.

See [docs/DEPLOYMENT_RUNBOOK.md](docs/DEPLOYMENT_RUNBOOK.md) for the detailed runbook and [docs/DEPLOYMENT_INVENTORY.md](docs/DEPLOYMENT_INVENTORY.md) for the supported artifact map.
