# Marvox Development Guide

**Status**: Active (Storyworld Production Studio)

This guide replaces prior setup notes and Supabase-era instructions. It reflects the current PostgreSQL-only, OpenAI-backed stack in `beta-integration-clean`.

---

## Prerequisites

- Python 3.10+ (3.11+ recommended)
- Node.js 18+

---

## Install Dependencies

```bash
pip install -r requirements.txt
npm install
```

---

## Environment Setup

1. Copy `.env.example` to `.env`.
2. Set required values:

```
OPENAI_API_KEY=sk-...
JWT_SECRET_KEY=change-me
```

Optional but common:
- `OPENAI_MODEL_NAME`
- `CORS_ALLOWED_ORIGINS`
- `CHROMA_PERSIST_DIR`
- Storage settings in `DEPLOYMENT.md`

Full inventory: `docs/env_inventory.md`

---

## Run Services

Backend:
```bash
python main.py
```

Frontend:
```bash
npm run dev
```

API docs: `http://localhost:8000/docs`
Frontend: `http://localhost:3000`

---

## Auth in Development

Most `/api/*` routes require a JWT Bearer token.

Register:
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

---

## Useful Scripts

- `scripts/export_openapi.py` exports OpenAPI to `docs/openapi.json`
- `scripts/scan_env_vars.py` builds the env var inventory
- `scripts/scan_routes.py` builds the route inventory
- `scripts/run_docs_checks.sh` runs doc link checks and OpenAPI diff

---

## Tests

Backend tests:
```bash
pytest tests/
```

Frontend checks:
```bash
npm run type-check
```

E2E tests (Playwright):
```bash
npx playwright test
```

---

## Documentation Source of Truth

- API reference is generated from `docs/openapi.json` into `docs/API.md`
- Primary onboarding docs: `START_HERE.md` and `README.md`
- System design: `ARCHITECTURE.md`

---

## Deployment

See `DEPLOYMENT.md` for Railway + Vercel deployment and production environment variables.
