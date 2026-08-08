#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

(cd "$ROOT_DIR" && npm run start:backend) &
BACKEND_PID=$!

sleep 2
(cd "$ROOT_DIR/frontend" && npm run dev) &
FRONTEND_PID=$!

trap 'kill $BACKEND_PID $FRONTEND_PID' EXIT
wait "$BACKEND_PID" "$FRONTEND_PID"
