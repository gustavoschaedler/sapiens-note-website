#!/usr/bin/env bash
# ============================================================================
# Sapiens Note website — installer for Ubuntu Server (Docker + systemd service)
#
#   sudo ./deploy/install.sh                      # install on port 80
#   sudo SAPIENS_PORT=8080 ./deploy/install.sh    # custom host port
#   sudo SAPIENS_BIND=127.0.0.1 ./deploy/install.sh   # localhost only (tunnel)
#
# Idempotent: re-run to update (re-copies files, rebuilds and restarts).
# ============================================================================
set -euo pipefail

APP="sapiens-note-website"
INSTALL_DIR="/opt/${APP}"
SERVICE="/etc/systemd/system/${APP}.service"
PORT="${SAPIENS_PORT:-80}"
BIND="${SAPIENS_BIND:-0.0.0.0}"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

log(){ printf '\033[1;36m==>\033[0m %s\n' "$*"; }
err(){ printf '\033[1;31mERROR:\033[0m %s\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || err "run as root:  sudo ./deploy/install.sh"

# ---- 1. Docker -------------------------------------------------------------
if ! command -v docker >/dev/null 2>&1; then
  log "Installing Docker (get.docker.com)…"
  curl -fsSL https://get.docker.com | sh
else
  log "Docker already installed: $(docker --version)"
fi
docker compose version >/dev/null 2>&1 || err "Docker Compose plugin missing (install 'docker-compose-plugin')."
systemctl enable --now docker >/dev/null 2>&1 || true

# ---- 2. Copy project to /opt (skip if cloned directly into INSTALL_DIR) -----
if [ "${REPO}" = "${INSTALL_DIR}" ]; then
  log "Project already at ${INSTALL_DIR} (cloned in place) — skipping copy."
else
  log "Installing files to ${INSTALL_DIR}…"
  mkdir -p "${INSTALL_DIR}"
  cp -rf "${REPO}/public" "${REPO}/deploy" "${REPO}/docker-compose.yml" "${REPO}/.dockerignore" "${INSTALL_DIR}/"
fi
cat > "${INSTALL_DIR}/.env" <<EOF
SAPIENS_PORT=${PORT}
SAPIENS_BIND=${BIND}
EOF

# ---- 3. systemd service ----------------------------------------------------
log "Writing systemd service ${SERVICE}…"
cat > "${SERVICE}" <<EOF
[Unit]
Description=Sapiens Note website (Docker Compose)
Requires=docker.service
After=docker.service network-online.target
Wants=network-online.target

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=${INSTALL_DIR}
ExecStart=/usr/bin/docker compose up -d --build
ExecStop=/usr/bin/docker compose down
ExecReload=/usr/bin/docker compose up -d --build
TimeoutStartSec=600

[Install]
WantedBy=multi-user.target
EOF

# ---- 4. Build + start ------------------------------------------------------
log "Building image and starting the service…"
systemctl daemon-reload
systemctl enable "${APP}.service" >/dev/null 2>&1 || true
systemctl restart "${APP}.service"

IP="$(hostname -I 2>/dev/null | awk '{print $1}')"
echo
log "Done. Sapiens Note website is running."
echo "    URL:     http://${IP:-<vm-ip>}:${PORT}/   (bind: ${BIND})"
echo "    Status:  systemctl status ${APP}"
echo "    Logs:    docker logs -f ${APP}"
echo "    Stop:    systemctl stop ${APP}"
echo "    Update:  re-run sudo ./deploy/install.sh"
