# Security Policy

Marvox is built with a defense-in-depth security architecture. This page documents the controls enforced in production, vulnerability disclosure process, and operational security guidelines.

---

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 1.x     | ✅ Active patches |
| < 1.0   | ❌ End of life |

## Reporting a Vulnerability

The Marvox team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

To report a security issue, use the GitHub Security Advisory **"Report a Vulnerability"** tab:

> https://github.com/CyKiller/Marvox/security/advisories/new

The team will acknowledge your report within **5 business days** and provide a remediation timeline. Please:

1. Not disclose publicly until a fix is released.
2. Not access, modify, or exfiltrate user data during testing.
3. Include steps to reproduce and proof-of-concept if available.

Security reporters who follow responsible disclosure are credited in the changelog (unless they prefer to remain anonymous).

---

## Production Security Architecture

### 1. Request Security Middleware

All requests pass through `IntegratedSecurityMiddleware` (`backend/security_middleware.py`) which enforces:

| Control | Mechanism |
| ------- | --------- |
| CSRF protection | Double-submit cookie pattern; exempt: `/api/billing/webhook` |
| Rate limiting | Redis-backed sliding window per IP and per user |
| XSS sanitization | Input scrubbing on all request bodies |
| Security headers | `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`, `Content-Security-Policy` |
| Request size limits | `MAX_UPLOAD_MB` (default 100 MB) enforced before reading into memory |

### 2. Authentication & Authorization

- **JWT tokens** — signed with `JWT_SECRET_KEY` (min 256-bit random value required in production).
- **API keys** — SHA256 hashed at rest; full key shown only once during creation. Stored with key prefix, expiry, last-used audit trail, and soft-deletion via `is_active` flag. Backed by migration `0011` (`api_keys` table).
- **Google OAuth** — ID token exchange via `/api/auth/google/exchange`; tokens validated server-side before issuing a Marvox JWT.
- **Password hashing** — bcrypt with adaptive cost factor.
- **Email verification** — required before full account activation; verified via one-time token.

### 3. API Key Security

```bash
# API keys have the format:
mrvx_<random_40_chars>

# Storage: only SHA256(api_key) is written to the database
# table: api_keys (key_hash, key_prefix, project_id, expires_at, is_active)
# The plaintext key is returned once at creation — not retrievable afterward
```

API keys can be:
- **Expired** — set `expires_in_days` at creation (default: 90)
- **Revoked** — `DELETE /api/billing/api-keys/{key_id}` soft-deletes immediately
- **Audited** — `last_used_at` updated on every authenticated request

### 4. Prompt Injection Defense

CharacterOS operates on untrusted story content from user-uploaded manuscripts. All RAG-retrieved text passes through `sanitize_story_excerpts()` (`services/characteros/prompt_safety.py`) before being included in LLM prompts. Every agent system prompt that uses retrieved text ends with `RAG_SAFETY_RULE`, which instructs the model to treat story content as narrative data only — never as executable instructions.

No story excerpt can escalate its privilege or override agent behavior.

### 5. Secrets Management

| Secret | Storage location |
| ------ | ---------------- |
| `OPENAI_API_KEY` | Railway env — never in source |
| `JWT_SECRET_KEY` | Railway env — min 256-bit random |
| `STRIPE_SECRET_KEY` | Railway env |
| `STRIPE_WEBHOOK_SECRET` | Railway env — Stripe signature verification |
| `BLOB_READ_WRITE_TOKEN` | Railway env (Vercel Blob) |
| `UPSTASH_VECTOR_REST_TOKEN` | Railway env |
| `RESEND_API_KEY` | Railway env |

CI secret scanning (`secret-scan.yml`) runs on every push to block accidental commits of credentials.

### 6. Stripe Webhook Verification

The `/api/billing/webhook` route verifies every request using `STRIPE_WEBHOOK_SECRET` via `stripe.Webhook.construct_event()`. Webhook events are deduplicated in the database to prevent replay attacks. This route is intentionally exempt from CSRF middleware because Stripe cannot set browser cookies.

### 7. Data Isolation

- Every character profile, canon index chunk, and memory row is scoped by `project_id`.
- Projects are owned by a user; all CharacterOS routes enforce ownership before access.
- Audio files are stored in Vercel Blob with opaque paths — not enumerable or guessable.

### 8. Database Security

- **PostgreSQL only** in production — SQLite and local file paths are rejected at startup when `ENVIRONMENT=production`.
- **Alembic migrations** are the only way to mutate schema — no runtime `CREATE TABLE` or `ALTER TABLE`.
- All queries use `fetchone_unified` / `fetchall_unified` / `execute_unified` helpers — no raw string interpolation into SQL.

### 9. File Upload Security

- File type validation: only `.txt`, `.epub`, `.pdf` accepted.
- Size enforced server-side before reading (`MAX_UPLOAD_MB`).
- No user-controlled path traversal; files written to isolated upload directories.
- Temporary files cleaned up automatically by background schedulers.

### 10. Observability & Incident Response

| Tool | Purpose |
| ---- | ------- |
| Sentry (backend + frontend) | Error tracking and alerting |
| Railway logs | Backend request audit trail |
| Vercel logs | Frontend and API route logs |
| `CHAROS_EVAL_LOG_PATH` | CharacterOS JSONL event log (agent decisions, latency) |

---

## OWASP Top 10 Coverage

| Risk | Mitigation |
| ---- | ---------- |
| A01 Broken Access Control | Project-scoped routes, JWT ownership checks |
| A02 Cryptographic Failures | bcrypt passwords, SHA256 API keys, TLS everywhere |
| A03 Injection | Parameterized DB queries, prompt injection sanitization |
| A04 Insecure Design | Prompt safety contract, typed agent boundaries |
| A05 Security Misconfiguration | Production runtime contract validation at startup |
| A06 Vulnerable Components | CI dependency review (`dependency-review.yml`) |
| A07 Authentication Failures | JWT + API key, Redis rate limiting, email verification |
| A08 Software Integrity | Secret scanning CI, signed commits recommended |
| A09 Logging Failures | Sentry + Railway/Vercel logs + CHAROS eval log |
| A10 SSRF | No user-controlled URL fetching in backend |

---

## Operational Best Practices for Deployers

1. **Rotate `JWT_SECRET_KEY` if ever exposed** — all active sessions will be invalidated.
2. **Set `OPENAI_API_USAGE_WARNING_THRESHOLD`** (default 80%) to alert when OpenAI costs approach your limit.
3. **Review API key expiries regularly** — default 90-day expiry enforced; revoke unused keys via the dashboard.
4. **Enable Sentry DSNs** in both Railway and Vercel environments for production error tracking.
5. **Run `scripts/run_deployed_production_gate.sh`** after every production deploy to verify the runtime contract.

---

## Contact

Security questions and vulnerability reports: use the GitHub Security Advisory link above or email **security@marvox.app**.

