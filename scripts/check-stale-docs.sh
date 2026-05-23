#!/usr/bin/env bash
set -euo pipefail

# check-stale-docs.sh
# Scans all active documentation files and components for stale terms and parameters.
# Exits with 1 to fail the build if any are found. Excludes CHANGELOG.md.

echo "🔍 Running Marvox Docs Stale Terms Scan..."

STALE_TERMS=(
  "/api/audio/scene"
  "/api/characteros/projects/{project_id}/reader"
  "character_voice_map"
  "file_url"
  "99/100"
  "world-class documentation complete"
  "UPSTASH_VECTOR_REST_URL"
  "UPSTASH_VECTOR_REST_TOKEN"
  "Next.js 14"
  "Node 18"
  "ChromaDB"
  "Upstash Vector"
)

FOUND_STALE=0

# Scan all markdown (.md) and React (.ts, .tsx) files under content, app, and components.
# Exclude CHANGELOG.md.
FILES_TO_SCAN=$(find app components content -type f \( -name "*.md" -o -name "*.tsx" -o -name "*.ts" \) ! -name "CHANGELOG.md")

for term in "${STALE_TERMS[@]}"; do
  # Perform case-insensitive matching
  MATCHES=$(grep -RInw "$term" $FILES_TO_SCAN 2>/dev/null || true)
  if [ -n "$MATCHES" ]; then
    echo "❌ Detected stale term '$term' in the following files:"
    echo "$MATCHES"
    echo ""
    FOUND_STALE=1
  fi
done

# Check specifically for "direction" parameter usage in request payloads or code examples
DIRECTION_MATCHES=$(grep -RIn -e '"direction":' -e "'direction':" -e "direction=" -e "direction =" $FILES_TO_SCAN 2>/dev/null || true)
if [ -n "$DIRECTION_MATCHES" ]; then
  echo "❌ Detected stale parameter 'direction' in request bodies or argument lists:"
  echo "$DIRECTION_MATCHES"
  echo ""
  FOUND_STALE=1
fi

if [ "$FOUND_STALE" -eq 1 ]; then
    echo "🚨 Stale terms check failed! Please remove the deprecated terms listed above to proceed."
    exit 1
else
    echo "✅ Stale terms check passed. All documentation is accurate."
    exit 0
fi
