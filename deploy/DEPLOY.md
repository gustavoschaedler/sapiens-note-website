<p align="right"><strong>🇬🇧 English</strong> · <a href="DEPLOY.pt-br.md">🇧🇷 Português</a></p>

# Deploy — Sapiens Note website

Static site (**hardened** nginx in a Docker container), installed as a **systemd
service** on an Ubuntu Server VM (e.g. Proxmox). Starts on boot and restarts on
failure. **Fully offline** (Three.js vendored, no CDN).

## Requirements
- Ubuntu Server 22.04/24.04 LTS VM, with `sudo`.
- Internet only for **installation** (to fetch Docker + the nginx base image).

## Install (one command)
```bash
git clone https://github.com/gustavoschaedler/sapiens-note-website.git
cd sapiens-note-website
sudo ./deploy/install.sh                 # port 80
```

Variants:
```bash
sudo SAPIENS_PORT=8080 ./deploy/install.sh        # different port
sudo SAPIENS_BIND=127.0.0.1 ./deploy/install.sh   # localhost only (Cloudflare Tunnel)
```

`install.sh`:
1. installs **Docker + Compose plugin** (via `get.docker.com`) if missing;
2. copies the project to **`/opt/sapiens-note-website`**;
3. creates/enables the **`sapiens-note-website.service`**;
4. **builds** and **starts** the container.

## Image security (minimal CVEs)
- Base **`nginxinc/nginx-unprivileged:stable-alpine`** — Alpine (few packages),
  official **patched** nginx (`stable`), running as a **non-root** user (uid 101).
- Container is **`read_only: true`** (+ `tmpfs:/tmp`), **`no-new-privileges`**, and
  nginx listens on **8080** (no root needed). Mapped to the host port.

## Manage
```bash
systemctl status  sapiens-note-website
systemctl restart sapiens-note-website
systemctl stop    sapiens-note-website
docker logs -f    sapiens-note-website
```

## Update
```bash
cd sapiens-note-website && git pull
sudo ./deploy/install.sh        # re-copies, rebuilds and restarts (idempotent)
```

## Uninstall
```bash
sudo ./deploy/uninstall.sh
```

## 🌩️ External access — Cloudflare Tunnel

> Assuming `cloudflared` is **already installed and running as a daemon/service**.

No firewall/router ports needed (the tunnel is outbound) and **HTTPS is terminated
at Cloudflare**. Point a *public hostname* of your tunnel to the site:

- **Dashboard** (Zero Trust → Networks → Tunnels → your tunnel → *Public
  Hostname*): `service = http://localhost:<SAPIENS_PORT>` (e.g. `http://localhost:80`).
- **Config file** (`/etc/cloudflared/config.yml` or `~/.cloudflared/config.yml`):
  ```yaml
  ingress:
    - hostname: site.yourdomain.com
      service: http://localhost:80      # same as SAPIENS_PORT
    - service: http_status:404
  ```
  Then: `sudo systemctl restart cloudflared`.

**Recommended:** install with `SAPIENS_BIND=127.0.0.1` so the site is reachable
**only** via localhost + the tunnel (not on the LAN). No `ufw allow` needed.
(Already installed? Set `SAPIENS_BIND=127.0.0.1` in
`/opt/sapiens-note-website/.env` and run `sudo systemctl reload sapiens-note-website`.)

## Notes
- **Reboot**: `restart: unless-stopped` on the container **plus** the systemd
  service (`oneshot`/`RemainAfterExit`) — it comes back when the VM boots.
- **Offline**: Three.js lives in `public/assets/vendor/three/`; the site has no CDN
  dependency (server and client work without internet). Google Fonts fall back to
  system fonts when offline.
- **Firewall** without the tunnel (LAN access): `sudo ufw allow <port>/tcp`.

## Files
```
deploy/Dockerfile          hardened nginx image (unprivileged/alpine)
deploy/nginx.conf          gzip, cache, .3mf mime, SPA fallback (listen 8080)
deploy/install.sh          installer (Docker + systemd)
deploy/uninstall.sh        removal
docker-compose.yml         'web' service (port/bind via .env, read-only)
```
