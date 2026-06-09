#!/usr/bin/env bash
# Remove the Sapiens Note website service, container and files.
#   sudo ./uninstall.sh
set -euo pipefail
APP="sapiens-note-website"
INSTALL_DIR="/opt/${APP}"
[ "$(id -u)" -eq 0 ] || { echo "run as root: sudo ./uninstall.sh"; exit 1; }

echo "==> Stopping service…"
systemctl disable --now "${APP}.service" 2>/dev/null || true
rm -f "/etc/systemd/system/${APP}.service"
systemctl daemon-reload

echo "==> Removing container, image and files…"
if [ -d "${INSTALL_DIR}" ]; then
  (cd "${INSTALL_DIR}" && docker compose down --rmi local 2>/dev/null) || true
fi
docker rm -f "${APP}" 2>/dev/null || true
rm -rf "${INSTALL_DIR}"

echo "Done. (Docker itself was left installed.)"
