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
  <img src="docs/preview.png" alt="Datasheet theme" width="100%"><br>
  <sub><b>Datasheet</b> — default theme</sub>
</p>

<p align="center">
  <img src="docs/preview-eink.png" alt="E-ink theme" width="100%"><br>
  <sub><b>E-ink</b> — one click</sub>
</p>

<p align="center">
  <img src="docs/preview-dark.png" alt="Dark theme" width="100%"><br>
  <sub><b>Dark</b> — one click</sub>
</p>

<p align="center"><b>Two real, working browser demos — no hardware needed</b></p>

<p align="center">
  <img src="docs/dashboard.png" alt="Dashboard" width="100%"><br>
  <sub><b>Dashboard</b> — record → transcribe → read back</sub>
</p>

<p align="center">
  <img src="docs/sim.png" alt="Firmware simulator" width="360"><br>
  <sub><b>Firmware simulator</b> — the e-ink device, in your browser</sub>
</p>

---

## ✨ Overview

A **static** product landing page — no build step, no framework. The default
**"Datasheet"** theme borrows the language of *hardware engineering*: a drafting
grid, dimension lines and a title block around the device, `REF.0x` part designators,
mono technical labels and one industrial-orange accent. **Three one-click themes** —
**Datasheet** (default), **E-ink** (the device's flat black-and-white look) and
**Dark** — are picked from a 3-position switch in the **left sidebar**.
**Bilingual** (English / Portuguese) with live switching, **mobile-first responsive**,
and **fully offline**: Three.js and the web fonts are vendored locally, so there are
**no CDN dependencies**.

The page also ships two **real, working** browser demos — a device simulator and the
Sapiens Web dashboard — that share a local **IndexedDB** store. Everything they do
stays in your browser; nothing is sent to a server (the only exception is the optional
OpenAI transcription, which uses your own key).

Content and specs are based on the **Sapiens Note** project and the real
**Waveshare ESP32-S3-ePaper-1.54** board (touch variant).

## 🚀 Highlights

| | Feature |
|---|---|
| 🧭 | **Left sidebar nav** — grouped (*Try it · Product · Reference*) with hand-drawn icons, a scroll-spy active state, and a clean collapse to a top bar + drawer on mobile. |
| 🎨 | **Three themes, one switch** — **Datasheet** (default engineering look: drafting grid, dimension lines, `REF.0x` designators, industrial-orange accent), **E-ink** (the device's flat B/W paper) and **Dark**, chosen from a 3-position control. Persistent (`localStorage`); e-ink is also shareable via `?eink=1`. |
| 🌐 | **Bilingual EN / PT-BR** — `English` / `Português` buttons in the sidebar; auto-detects the browser language and remembers the choice. |
| 🕹️ | **Device simulator (real)** — the e-ink firmware in the browser with hand-drawn (SVG) icons: **REC records 48 kHz / 16-bit mono audio from your mic** (`MediaRecorder`); the note stays *pending* (the device only captures — like the firmware) and plays back for real. Full screen set (Home · List · Recording · Transcript · Player · Settings · Sync · Tags · Delete). (`public/js/simulator.js`) |
| 🖥️ | **Real dashboard (`sapiens-web`)** — a faithful port that reads the **same store** the device writes: plays the real audio with a live **spectrum**, **transcribes via OpenAI Whisper** (your key, kept only in the browser), downloads real **`.wav`/`.txt`**, deletes, paginates. (`public/js/dashboard.js`) |
| 🔁 | **The real flow** — record on the device → transcribe in the dashboard → the transcript shows back on the device, via a shared **IndexedDB** store (`public/js/store.js`). |
| 🔒 | **Local-first / private** — recordings, notes and transcripts live **only in your browser** (IndexedDB); nothing is sent to any server. The only exception: if you use transcription, the audio goes straight to OpenAI with your own key. |
| 🧠 | **Live 3D model** — the **real case** (Three.js + `GLTFLoader`, GLB converted from the Shapr3D `Assembled.step`) plus faithful internals (PCB, ESP32-S3 module, header, USB-C, battery, e-ink screen), with **Assembled ⇄ Exploded** toggle and auto-rotation. |
| 🔩 | **"What's Inside"** — a hand-drawn **SVG technical drawing** of the real board, with engineering callouts (ESP32-S3, FT6336, ES8311, USB-C, BOOT/PWR buttons, Li-ion battery…) and a link to the **Waveshare ESP32-S3-ePaper-1.54** product page. |
| 📊 | **Comparison** with market players (Plaud Note, Limitless, Otter.ai, Rabbit R1). |
| 📱 | **Mobile-first responsive** (down to 375 px) and `prefers-reduced-motion` aware; **100% offline** — local Three.js + fonts, zero CDN. |

**Sections:** `Hero` · `Simulator` · `Dashboard` · `Product` · `Features` · `How it works`
· `Sapiens Web` · `Compare` · `What's Inside` · `Live 3D` · `Specs` · `FAQ` · `CTA`

## 🕹️ Firmware simulator & dashboard

Two **real** browser demos let anyone try the whole product with no hardware:

- **Firmware simulator** (`public/js/simulator.js`) — a DOM/CSS reimplementation of the
  e-ink firmware UI: a black-on-white screen **state machine** (Home · Note list ·
  Recording · Transcript · Player · Settings · Sync · Tags · Delete) with hand-drawn SVG
  icons, the on-tap e-ink **invert flash**, marquee titles, pagination and a battery
  indicator. **REC** actually records from your microphone (`MediaRecorder`); the note is
  saved as *pending* — the device only captures, exactly like the real firmware — and
  plays back for real.
- **Dashboard** (`public/js/dashboard.js`) — a faithful port of the real `sapiens-web`
  tool that reads the **same** IndexedDB store: plays each recording with a live audio
  **spectrum**, transcribes via **OpenAI Whisper** (your key, browser-only), downloads
  real `.wav` / `.txt`, deletes and paginates.

**The flow is the real one:** record on the device → transcribe in the dashboard → the
transcript shows back on the device, all through a shared store (`public/js/store.js`).
Nothing leaves your browser except the optional transcription (see *Where your data lives*).

## 🛠️ Stack

- Plain **HTML + CSS + JavaScript** (no bundler).
- **Three.js vendored** in `public/assets/vendor/three/` — no CDN.
- **Google Fonts vendored** in `public/assets/fonts/` — no CDN.
- Home-grown i18n with `data-i18n` + a dictionary in `public/js/script.js`.

## 🔒 Where your data lives

Everything the two demos do stays **in your browser** — there is no backend:

- **Recordings + notes + transcripts** → IndexedDB (`sapiens-sim` database, object
  stores `notes` + `audio`), in `public/js/store.js`.
- **OpenAI API key** → `localStorage` (`sn-openai-key`), browser-only.
- **Only thing that ever leaves the browser:** transcription sends the audio straight
  to `api.openai.com` with your key. Recording, playback, reading and `.wav`/`.txt`
  downloads are fully offline. Clearing the site's data wipes everything.

## 📁 Structure

```
.
├── public/                  ← document root (served by nginx)
│   ├── index.html
│   ├── css/styles.css
│   ├── js/script.js · js/store.js · js/simulator.js · js/dashboard.js
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

- **Themes / colors** — design tokens at the top of `public/css/styles.css`: `:root` (*Datasheet*), `body.dark` (*Dark*) and `body.eink` (*E-ink*) each redefine the same token set. Key tokens: `--bg` (drafting paper), `--accent` (industrial orange), `--ink`, `--muted`, `--line`, `--grid`. The 3-position theme switch (`#themeSw`) and language buttons (`.lang`) live in the sidebar; logic in `public/js/script.js`.
- **Text / translations** — the `I18N` object in `public/js/script.js` (`en` / `pt` keys).
- **What's Inside drawing** — the inline `<svg class="xray">` in `public/index.html` (parts + callouts).
- **Live 3D case** — `public/assets/case/assembled.glb` (converted from `Assembled.step` via `occt-import-js`); the internals are built procedurally in the inline `<script type="module">`.

## 📄 License

See [LICENSE](LICENSE).
