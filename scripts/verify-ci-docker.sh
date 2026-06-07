#!/usr/bin/env bash
set -euo pipefail

FRONTEND="$(cd "$(dirname "$0")/.." && pwd)"
IMAGE="node:24-bookworm"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:-pk_test_ci_placeholder}"
CLERK_SECRET_KEY="${CLERK_SECRET_KEY:-sk_test_ci_placeholder}"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="${NEXT_PUBLIC_CLERK_SIGN_IN_URL:-/sign-in}"

DOCKER_ARGS=(
  -v "$FRONTEND:/src:ro"
  -e "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
  -e "CLERK_SECRET_KEY=$CLERK_SECRET_KEY"
  -e "NEXT_PUBLIC_CLERK_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_SIGN_IN_URL"
)

if [[ -f "$FRONTEND/.env" ]]; then
  DOCKER_ARGS=(--env-file "$FRONTEND/.env" "${DOCKER_ARGS[@]}")
fi

echo "=== Simulating GitHub Actions (ubuntu + node 24) ==="
docker run --rm \
  "${DOCKER_ARGS[@]}" \
  "$IMAGE" \
  bash -c '
    set -e
    mkdir -p /app
    cp -a /src/. /app/
    cd /app

    echo "--- npm ci ---"
    npm ci

    echo "--- npm run typecheck ---"
    npm run typecheck

    echo "--- npm run lint ---"
    npm run lint

    echo "--- npm run build ---"
    npm run build

    echo "=== CI simulation passed ==="
  '
