# Marvox Deployment Runbook

## Topology

Marvox runs on a single supported topology:

- **Frontend**: Vercel
- **Browser API surface**: same-origin `/api/*` on Vercel
- **Backend runtime**: Railway
- **Database/vector/cache**: Railway Postgres with pgvector + Railway Dragonfly over the Redis protocol
- **Blob storage**: Vercel Blob
- **Staging model**: Vercel preview frontend + Railway staging backend

## Services

| Service | Platform | Contract |
|---------|----------|----------|
| Frontend | Vercel | Public browser surface |
| Backend API | Railway | Operational API runtime |
| Postgres + pgvector | Railway | Primary relational and vector database |
| Dragonfly (`REDIS_URL`) | Railway | Primary cache/security backend |
| Blob Storage | Vercel | Object storage |

## Environment Variables

### Railway

| Variable | Requirement |
|----------|-------------|
| `DATABASE_URL` | Required, Postgres URL |
| `REDIS_URL` | Required |
| `JWT_SECRET_KEY` | Required, non-default |
| `OPENAI_API_KEY` | Required |
| `STRIPE_SECRET_KEY` | Required |
| `STRIPE_WEBHOOK_SECRET` | Required |
| `FRONTEND_URL` | Required, must match the trusted Vercel deployment |
| `CORS_ALLOWED_ORIGINS` | Required, must include `FRONTEND_URL` |
| `BLOB_READ_WRITE_TOKEN` | Required |
| `VECTOR_DB_BACKEND` | Optional; if set, must be `pgvector` |

### Vercel

| Variable | Requirement |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Required, points at the matching Railway environment |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Required |

## Deployment Paths

### Production

1. Merge to `main`.
2. Vercel deploys the frontend through Git integration.
3. Railway deploys the backend through Git integration.
4. Run production validation:

```bash
FRONTEND_URL=https://<your-vercel-domain> \
BACKEND_URL=https://<your-railway-domain> \
./scripts/production-checklist.sh
```

Optional deeper validation:

```bash
FRONTEND_URL=https://<your-vercel-domain> \
BACKEND_URL=https://<your-railway-domain> \
./scripts/run_deployed_production_gate.sh
```

The GitHub workflow `.github/workflows/validate-production-release.yml` performs the same validation logic for release candidates.

### Staging

1. Use a Vercel preview deployment as the frontend staging surface.
2. Deploy the staging backend with `.github/workflows/deploy-staging-railway.yml`.
3. Point the Railway staging `FRONTEND_URL` and `CORS_ALLOWED_ORIGINS` at the preview deployment under test.

## Monitoring and Verification

- Scheduled production verification: `.github/workflows/health-check.yml`
- Railway operational status: `scripts/check-railway-status.sh`
- Canonical end-to-end verification: `scripts/production-checklist.sh`

## Rollback

1. Revert the offending commit in Git.
2. Push the revert so Vercel and Railway redeploy from the corrected state.
3. Re-run `scripts/production-checklist.sh`.

This repo does not support Docker Compose production rollback or alternate cloud deployment rollback paths.

## Troubleshooting

| Symptom | Likely Cause | Action |
|---------|--------------|--------|
| Frontend 500 on `/api/*` | `NEXT_PUBLIC_API_URL` missing or wrong on Vercel | Fix Vercel env and redeploy |
| Auth/CSRF failures | `FRONTEND_URL` and `CORS_ALLOWED_ORIGINS` mismatch on Railway | Align Railway env vars with the trusted Vercel deployment |
| 401 for all sessions | `JWT_SECRET_KEY` mismatch or rotated unexpectedly | Verify Railway secret values |
| Empty RAG results | PostgreSQL pgvector unavailable or canon index empty | Verify `DATABASE_URL`, migrations, and `/health/vector` |
| Slow or failing protected routes | Dragonfly/Redis-compatible cache unavailable | Verify `REDIS_URL` and `/health/redis` |

## Unsupported Paths

Do not use or restore:

- AWS/EKS staging deploys
- Manual staging server deploys
- Docker Compose production deploys from this repo
- One-off repair scripts that mutate tracked files or push commits automatically

See [deployment-inventory](/deployment-inventory) for the current keep/rename/remove map.
