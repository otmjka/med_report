#!/usr/bin/env bash
set -euo pipefail

while true; do
  echo "[worker] tick $(date -Iseconds)"
  touch /tmp/alive
  sleep 3
done
