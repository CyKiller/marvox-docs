# Contributing to Marvox

Thanks for contributing to Marvox. This guide reflects the current workflow for `beta-integration-clean`.

---

## Development Setup

1. Clone the repository.
2. Install dependencies:

```bash
pip install -r requirements.txt
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
# Set OPENAI_API_KEY and JWT_SECRET_KEY at minimum
```

---

## Branch Strategy

- Base all work on `origin/beta-integration-clean`.
- PRs only. Do not push directly to the base branch.
- Keep PRs small and focused.

If your working tree has unrelated changes, create a `wip/dirty-snapshot` branch and rebase from a clean base before opening PRs.

---

## Making Changes

1. Create a feature branch:

```bash
git checkout -b feat/short-description
```

2. Make changes and add tests if needed.
3. Run relevant tests.

---

## Testing

Backend:
```bash
pytest tests/
```

Frontend:
```bash
npm run type-check
```

E2E (Playwright):
```bash
npx playwright test
```

---

## Documentation Updates

If you change API behavior, regenerate OpenAPI and the API reference:

```bash
PYTHONPATH=. ./.venv/bin/python scripts/export_openapi.py --output docs/openapi.json
PYTHONPATH=. ./.venv/bin/python scripts/generate_api_reference.py --input docs/openapi.json --output docs/API.md
```

---

## Commit Message Convention

Use conventional commits:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `refactor:` code refactoring
- `test:` adding or updating tests
- `chore:` maintenance tasks

---

## Pull Request Guidelines

- Provide a clear summary and test coverage.
- Note any breaking changes.
- Include documentation updates for public API changes.
