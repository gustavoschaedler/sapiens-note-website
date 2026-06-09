<p align="right"><a href="DEPLOY.md">🇬🇧 English</a> · <strong>🇧🇷 Português</strong></p>

# Deploy — Sapiens Note website

Site estático (nginx **hardened** em container Docker), instalado como **serviço
systemd** numa VM Ubuntu Server (ex.: Proxmox). Sobe no boot e reinicia em falha.
**100% offline** (Three.js vendorizado, sem CDN).

## Pré-requisitos
- VM Ubuntu Server 22.04/24.04 LTS, com acesso `sudo`.
- Internet apenas para a **instalação** (baixar Docker + imagem base do nginx).

## Instalação (1 comando)
```bash
git clone https://github.com/gustavoschaedler/sapiens-note-website.git
cd sapiens-note-website
sudo ./deploy/install.sh                 # porta 80
```

Variações:
```bash
sudo SAPIENS_PORT=8080 ./deploy/install.sh        # porta diferente
sudo SAPIENS_BIND=127.0.0.1 ./deploy/install.sh   # só localhost (uso com Cloudflare Tunnel)
```

O `install.sh`:
1. instala **Docker + plugin Compose** (via `get.docker.com`) se faltarem;
2. copia o projeto para **`/opt/sapiens-note-website`**;
3. cria/habilita o serviço **`sapiens-note-website.service`**;
4. faz **build** e **sobe** o container.

## Segurança da imagem (mínimo de CVE)
- Base **`nginxinc/nginx-unprivileged:stable-alpine`** — Alpine (poucos pacotes),
  nginx oficial **patchado** (`stable`), rodando como **usuário não-root** (uid 101).
- Container com **`read_only: true`** (+ `tmpfs:/tmp`), **`no-new-privileges`** e
  nginx ouvindo em **8080** (sem precisar de root). Mapeado para a porta do host.

## Gerenciar
```bash
systemctl status  sapiens-note-website
systemctl restart sapiens-note-website
systemctl stop    sapiens-note-website
docker logs -f    sapiens-note-website
```

## Atualizar
```bash
cd sapiens-note-website && git pull
sudo ./deploy/install.sh        # re-copia, rebuilda e reinicia (idempotente)
```

## Desinstalar
```bash
sudo ./deploy/uninstall.sh
```

## 🌩️ Acesso externo — Cloudflare Tunnel

> Assumindo o `cloudflared` **já instalado e rodando como daemon/serviço**.

Não precisa abrir portas no firewall/roteador (o túnel é de saída) e o **HTTPS é
terminado na Cloudflare**. Aponte um *public hostname* do seu túnel para o site:

- **Pelo dashboard** (Zero Trust → Networks → Tunnels → seu túnel → *Public
  Hostname*): `service = http://localhost:<SAPIENS_PORT>` (ex.: `http://localhost:80`).
- **Por config** (`/etc/cloudflared/config.yml` ou `~/.cloudflared/config.yml`):
  ```yaml
  ingress:
    - hostname: site.seudominio.com
      service: http://localhost:80      # use a mesma SAPIENS_PORT
    - service: http_status:404
  ```
  Depois: `sudo systemctl restart cloudflared`.

**Recomendado:** instale com `SAPIENS_BIND=127.0.0.1` para o site ficar acessível
**somente** via localhost + túnel (não exposto na LAN). Assim **não precisa**
`ufw allow`. (Já instalado? Edite `SAPIENS_BIND=127.0.0.1` em
`/opt/sapiens-note-website/.env` e rode `sudo systemctl reload sapiens-note-website`.)

## Notas
- **Reboot**: `restart: unless-stopped` no container **+** serviço systemd
  (`oneshot`/`RemainAfterExit`) — volta sozinho ao ligar a VM.
- **Offline**: Three.js está em `public/assets/vendor/three/`; o site não depende
  de CDN (servidor e cliente funcionam sem internet). As fontes do Google têm
  fallback para fontes do sistema se não houver internet.
- **Firewall** sem túnel (acesso na LAN): `sudo ufw allow <porta>/tcp`.

## Arquivos
```
deploy/Dockerfile          imagem nginx hardened (unprivileged/alpine)
deploy/nginx.conf          gzip, cache, mime .3mf, fallback SPA (listen 8080)
deploy/install.sh          instalador (Docker + systemd)
deploy/uninstall.sh        remoção
docker-compose.yml         serviço 'web' (porta/bind via .env, read-only)
```
