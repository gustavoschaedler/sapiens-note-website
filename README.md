<p align="right"><strong>🇬🇧 English</strong> · <a href="README.pt-br.md">🇧🇷 Português</a></p>

<p align="center">
  <img src="public/assets/logo.png" alt="Sapiens Note" width="96">
</p>

<h1 align="center">Sapiens&nbsp;Note&nbsp;— Website</h1>

<p align="center">
  <em>Product landing page for <strong>Sapiens Note</strong> — a minimalist,<br>
  offline-first AI voice-note recorder on a 1.54" e-ink screen.</em>
</p>

<p align="center">
  <img alt="HTML5"      src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white">
  <img alt="CSS3"       src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black">
  <img alt="Three.js"   src="https://img.shields.io/badge/Three.js-000?logo=threedotjs&logoColor=white">
  <img alt="Docker"     src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white">
  <img alt="nginx"      src="https://img.shields.io/badge/nginx-hardened-009639?logo=nginx&logoColor=white">
  <img alt="offline"    src="https://img.shields.io/badge/offline-100%25-2ea44f">
  <img alt="i18n"       src="https://img.shields.io/badge/i18n-EN%20%C2%B7%20PT--BR-8957e5">
</p>

<p align="center">
  <img src="docs/preview.png" alt="Sapiens Note website — preview" width="860">
</p>

<table align="center">
  <tr>
    <td align="center"><img src="docs/preview.png" width="380"><br><sub><b>Datasheet</b> (default)</sub></td>
    <td align="center"><img src="docs/preview-eink.png" width="380"><br><sub><b>E-ink mode</b> (one click)</sub></td>
  </tr>
</table>

---

## ✨ Overview

A **static** product landing page — no build step, no framework. The default
**"Datasheet"** theme borrows the language of *hardware engineering*: a drafting
grid, dimension lines and a title block around the device, `REF.0x` part designators,
mono technical labels and one industrial-orange accent. A one-click **e-ink mode**
then flips the whole site into the device's flat black-and-white aesthetic.
**Bilingual** (English / Portuguese) with live switching, **mobile-first responsive**,
and **fully offline**: Three.js and the web fonts are vendored locally, so there are
**no CDN dependencies**.

Content and specs are based on the **Sapiens Note** project and the real
**Waveshare ESP32-S3-ePaper-1.54** board (touch variant).

## 🚀 Highlights

| | Feature |
|---|---|
| 🌐 | **Bilingual EN / PT-BR** — top toggle, auto-detects the browser language, remembers the choice. |
| 🎨 | **"Datasheet" theme** — engineering look: drafting grid, dimension lines, title block, `REF.0x` designators, mono labels and an industrial-orange accent. |
| 📱 | **Mobile-first responsive** — tuned down to 375 px (stacked hero, 2×2 stat block, full-width buttons, collapsing nav). |
| 🌗 | **E-ink mode** — swaps the datasheet theme for the device's flat paper look (hard-shadow, monochrome). Persistent + shareable (`?eink=1`). |
| 🧠 | **Live 3D model** — the **real case** (Three.js + `GLTFLoader`, GLB converted from the Shapr3D `Assembled.step`) plus faithful internals (PCB, PICO module, header, USB-C, battery, e-ink screen), with **Assembled ⇄ Exploded** toggle and auto-rotation. |
| 🔩 | **"What's Inside"** — a hand-drawn **SVG technical drawing** based on the real board layout, with engineering callouts to the actual parts (ESP32-S3-PICO-1, FT6336, ES8311, USB-C, BOOT/PWR buttons on the side, Li-ion battery…). |
| 📊 | **Comparison** with market players (Plaud Note, Limitless, Otter.ai, Rabbit R1). |
| 🔌 | **100% offline** — local Three.js + local fonts, zero CDN. |
| 📱 | **Responsive** and `prefers-reduced-motion` aware. |

**Sections:** `Hero` · `Product` · `Features` · `How it works` · `Sapiens Web`
· `Compare` · `What's Inside` · `Live 3D` · `Specs` · `FAQ` · `CTA`

## 🛠️ Stack

- Plain **HTML + CSS + JavaScript** (no bundler).
- **Three.js vendored** in `public/assets/vendor/three/` — no CDN.
- **Google Fonts vendored** in `public/assets/fonts/` — no CDN.
- Home-grown i18n with `data-i18n` + a dictionary in `public/js/script.js`.

## 📁 Structure

```
.
├── public/                  ← document root (served by nginx)
│   ├── index.html
│   ├── css/styles.css
│   ├── js/script.js
│   └── assets/
│       ├── logo.png · sim-*.png
│       ├── case/assembled.glb   real case (from Assembled.step) + sources (*.3mf)
│       ├── vendor/three/        local Three.js (core, OrbitControls, GLTFLoader, …)
│       └── fonts/               local web fonts (woff2 + fonts.css)
├── deploy/                  ← infrastructure
│   ├── Dockerfile               hardened nginx (unprivileged, alpine)
│   ├── nginx.conf               gzip, cache, SPA fallback (listen 8080)
│   ├── install.sh · uninstall.sh
│   └── DEPLOY.md                deployment guide (EN · PT-BR)
├── docker-compose.yml       ← 'web' service (read-only, non-root)
├── .dockerignore
└── README.md · README.pt-br.md
```

## ▶️ Run locally

Must be served over **HTTP** (`file://` blocks ES modules and the `.3mf` `fetch`):

```bash
cd public
python3 -m http.server 8080
# open http://localhost:8080
```

## 🐳 Deploy

For an Ubuntu Server VM (e.g. Proxmox) — one command installs Docker, builds a
**hardened nginx** image (non-root, read-only, alpine) and registers a **systemd
service** that auto-starts on boot:

```bash
git clone https://github.com/gustavoschaedler/sapiens-note-website.git
cd sapiens-note-website
sudo ./deploy/install.sh                            # port 80
# or, for Cloudflare-Tunnel-only access:
sudo SAPIENS_BIND=127.0.0.1 ./deploy/install.sh
```

Full guide — updates, **Cloudflare Tunnel**, firewall, hardening:
**[deploy/DEPLOY.md](deploy/DEPLOY.md)**.

## 🎨 Customization

- **Theme / colors** — design tokens at the top of `public/css/styles.css` (`:root` for *Datasheet*, `body.eink` for e-ink). Key tokens: `--bg` (drafting paper), `--accent` (industrial orange), `--ink`, `--muted`, `--line`, `--grid`.
- **Text / translations** — the `I18N` object in `public/js/script.js` (`en` / `pt` keys).
- **What's Inside drawing** — the inline `<svg class="xray">` in `public/index.html` (parts + callouts).
- **Live 3D case** — `public/assets/case/assembled.glb` (converted from `Assembled.step` via `occt-import-js`); the internals are built procedurally in the inline `<script type="module">`.

## 📄 License

See [LICENSE](LICENSE).
