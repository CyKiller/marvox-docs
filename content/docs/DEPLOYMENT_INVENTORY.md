# Deployment Inventory

This inventory is the operator map for the supported Marvox deployment model:

- **Frontend**: Vercel
- **Browser API surface**: same-origin `/api/*` on Vercel
- **Backend**: Railway
- **Staging**: Vercel preview deployments + Railway staging backend

## Workflows

| Artifact | Status | Notes |
|----------|--------|-------|
| `.github/workflows/frontend-ci.yml` | Keep | Canonical required frontend/browser release contract. |
| `.github/workflows/backend-ci.yml` | Keep | Canonical required backend/runtime contract. |
| `.github/workflows/secret-scan.yml` | Keep | Secret detection. |
| `.github/workflows/artifact-hygiene.yml` | Keep | Prevent tracked runtime artifacts. |
| `.github/workflows/dependency-review.yml` | Keep | Required dependency risk gate for PRs. |
| `.github/workflows/db-persistence.yml` | Keep | Conditional PR gate for migration/persistence changes only. |
| `.github/workflows/release.yml` | Keep | Tag/manual release workflow that generates notes from repo truth. |
| `.github/workflows/validate-production-release.yml` | Keep | Release-stage live validation after deploy. |
| `.github/workflows/health-check.yml` | Keep | Manual/scheduled production verification against Vercel + Railway. |
| `.github/workflows/deploy-staging-railway.yml` | Keep | Canonical staging backend deploy workflow; renamed from `staging-ghcr-railway.yml`. |
| `.github/workflows/deploy-vercel.yml` | Keep | Manual Vercel deploy/notification workflow only; not a PR gate. |
| `.github/workflows/deploy-railway.yml` | Keep | Manual Railway deploy workflow only; not a PR gate. |
| `.github/workflows/release-readiness.yml` | Keep | Manual release-prep workflow; not required for ordinary PRs. |
| `.github/workflows/audio-e2e-live.yml` | Keep | Manual live-audio validation only. |
| `.github/workflows/golden-path-live-tts.yml` | Keep | Manual live-TTS validation only. |
| `.github/workflows/golden-path-e2e.yml` | Keep | Manual deep E2E validation only. |
| `.github/workflows/phase1-launch-gate.yml` | Keep | Manual launch-validation workflow only. |
| `.github/workflows/characteros-integration.yml` | Keep | Manual CharacterOS integration sweep only. |
| `.github/workflows/characteros-test.yml` | Keep | Manual CharacterOS regression sweep only. |
| `.github/workflows/collab-golden-gate.yml` | Keep | Manual collaboration release gate only. |
| `.github/workflows/storyworld-collab-release-gate.yml` | Keep | Manual storyworld collaboration validation only. |
| `.github/workflows/env-drift-check.yml` | Keep | Scheduled/manual env drift detection only. |
| `.github/workflows/security-advanced.yml` | Keep | Scheduled/manual advanced security scan only. |
| `.github/workflows/performance.yml` | Keep | Scheduled/manual performance benchmark only. |
| `.github/workflows/deploy-smoke-check.yml` | Keep | Deploy smoke helper; do not require on ordinary PRs. |
| `.github/workflows/health-monitoring.yml` | Keep | Operational monitoring workflow; not a merge gate. |

## Scripts

| Artifact | Status | Notes |
|----------|--------|-------|
| `scripts/production-checklist.sh` | Keep | Canonical end-to-end verification command. |
| `scripts/check-railway-status.sh` | Keep | Railway operational health helper. |
| `scripts/deploy-to-railway.sh` | Keep | Git-driven Railway deploy guidance. |
| `scripts/deploy-minimal-backend.sh` | Keep | Minimal Railway deployment guidance. |
| `scripts/force-redeploy.sh` | Keep | Git-driven redeploy guidance and verification. |
| `scripts/run_deployed_production_gate.sh` | Keep | Production validation gate runner. |
| `scripts/configure-railway.sh` | Keep | Railway env contract reference. |
| `scripts/setup-railway-env.sh` | Keep | Railway env setup guide. |
| `scripts/deploy_railway_envs.py` | Keep | Single automated Railway env helper retained. |
| `scripts/setup_stripe_webhook.py` | Keep | Uses explicit `FRONTEND_URL` contract. |
| `scripts/deploy-production.sh` | Remove | Docker Compose production deploy path; unsupported. |
| `scripts/health-check.sh` | Remove | Docker Compose production health path; unsupported. |
| `scripts/deploy-setup.sh` | Remove | Legacy manual deploy bootstrap. |
| `scripts/railway-setup.sh` | Remove | Legacy bootstrap script that writes repo files. |
| `scripts/fix-main-py.sh` | Remove | One-off repair script that commits/pushes on behalf of the operator. |
| `scripts/fix-railway-deployment.sh` | Remove | One-off repair script that mutates tracked files. |
| `scripts/deploy_env_vars.py` | Remove | Mixed Vercel/Railway env updater with outdated assumptions. |
| `scripts/deploy_railway_curl.sh` | Remove | Duplicate Railway env uploader. |
| `scripts/deploy_railway_curl2.sh` | Remove | Duplicate Railway env uploader. |
| `scripts/fix_vercel_env.py` | Remove | One-off Vercel env repair helper. |

## Documents

| Artifact | Status | Notes |
|----------|--------|-------|
| `DEPLOYMENT.md` | Keep | Canonical deployment contract. |
| `docs/DEPLOYMENT_RUNBOOK.md` | Keep | Production/staging operational runbook. |
| `RUNBOOK.md` | Keep | Incident response summary aligned to the same topology. |
| `.github/workflows/README.md` | Keep | Workflow map aligned to the supported topology only. |
| `README.md` | Keep | High-level deployment summary updated to the single supported model. |

## PR Merge-Safety Gates

Treat this as the PR merge-safe contract:

- `Frontend CI`
- `Backend CI`
- `Artifact Hygiene Guard`
- `Secret Scan`
- `Dependency Review`
- `DB Persistence Guard` only when DB or migration paths change

Everything else should be manual, scheduled, or release-stage validation unless and until it proves stable enough to become part of the merge contract.
