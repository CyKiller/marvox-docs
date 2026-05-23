#!/usr/bin/env bash
set -euo pipefail

# check-design-drift.sh
# Scans files under app, components, content, lib, and DESIGN.md for banned flashy AI marketing terms.
# Warning-only check to lock in a premium, platform-native look. Exits with 0.

echo "🔍 Running Marvox Docs Design Drift Scan (Warning-Only)..."

BANNED_GLAMOUR_TERMS=(
  "purple"
  "violet"
  "orange"
  "glamorous"
  "world-class"
  "99/100"
  "Production Ready"
  "Live Simulator"
)

FOUND_DRIFT=0

# Scan all markdown (.md), React (.ts, .tsx), and CSS (.css) files.
# Exclude CHANGELOG.md and the script itself.
FILES_TO_SCAN=$(find app components content lib DESIGN.md -type f \( -name "*.md" -o -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) ! -name "CHANGELOG.md" ! -name "check-design-drift.sh" 2>/dev/null || true)

if [ -z "$FILES_TO_SCAN" ]; then
  echo "⚠️ No files found to scan for design drift."
  exit 0
fi

for term in "${BANNED_GLAMOUR_TERMS[@]}"; do
  # Perform case-insensitive matching
  MATCHES=$(grep -RInw -i "$term" $FILES_TO_SCAN 2>/dev/null || true)
  if [ -n "$MATCHES" ]; then
    echo "⚠️ WARNING: Detected design-drift term '$term' in the following files:"
    echo "$MATCHES"
    echo ""
    FOUND_DRIFT=1
  fi
done

if [ "$FOUND_DRIFT" -eq 1 ]; then
    echo "💡 Design drift scan completed with warnings. Please review the findings to maintain premium carbon aesthetics."
else
    echo "✅ Design drift check passed. Aesthetics conform to the calm Obsidian Carbon design contract."
fi

exit 0
