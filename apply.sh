#!/usr/bin/env bash
set -euo pipefail

REPO="${1:-.}"
PACKET_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PATCH="$PACKET_ROOT/patches/001_emergency_creator.patch"

cd "$REPO"
if [[ ! -d .git ]]; then
  echo "Run this packet against the Brambleheart repository root (or pass the repo path)." >&2
  exit 1
fi

echo "Checking Brambleheart Beta 0.08 emergency packet..."
git apply --check --whitespace=nowarn "$PATCH"

echo "Applying packet..."
git apply --whitespace=nowarn "$PATCH"

echo "Applied successfully."
echo "Modified: src/views/CreateCharacterView.vue"
echo "Modified: src/styles.css"
