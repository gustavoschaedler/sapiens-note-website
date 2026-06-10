<p align="right"><a href="README.md">🇬🇧 English</a> · <strong>🇧🇷 Português</strong></p>

<p align="center">
  <img src="public/assets/logo.png" alt="Sapiens Note" width="96">
</p>

<h1 align="center">Sapiens&nbsp;Note&nbsp;— Website</h1>

<p align="center">
  <em>Site de apresentação do <strong>Sapiens Note</strong> — um gravador de notas<br>
  de voz com IA, minimalista e offline-first, numa tela e-ink de 1,54".</em>
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
    <td align="center"><img src="docs/preview.png" width="380"><br><sub><b>Datasheet</b> (padrão)</sub></td>
    <td align="center"><img src="docs/preview-eink.png" width="380"><br><sub><b>Modo e-ink</b> (um clique)</sub></td>
  </tr>
</table>

---

## ✨ Visão geral

Landing page de produto **estática** — sem build, sem framework. O tema padrão
**"Datasheet"** usa a linguagem da *engenharia de hardware*: grid de papel milimetrado,
linhas de cota (dimensões) e um *title block* em volta do device, designadores de
peça `REF.0x`, labels técnicos em mono e um único acento laranja industrial. Um
**modo e-ink** de um clique transforma o site inteiro no preto-e-branco chapado do
dispositivo. **Bilíngue** (Inglês / Português) com troca em tempo real,
**responsivo mobile-first**, e **100% offline**: Three.js e as fontes são
vendorizados localmente — **sem CDN**.

Conteúdo e specs montados a partir do projeto **Sapiens Note** e da placa real
**Waveshare ESP32-S3-ePaper-1.54** (variante touch).

## 🚀 Destaques

| | Recurso |
|---|---|
| 🌐 | **Bilíngue EN / PT-BR** — toggle no topo, auto-detecta o idioma do navegador, lembra a escolha. |
| 🎨 | **Tema "Datasheet"** — cara de engenharia: grid milimetrado, linhas de cota, *title block*, designadores `REF.0x`, labels em mono e acento laranja industrial. |
| 📱 | **Responsivo mobile-first** — ajustado até 375 px (hero empilhado, bloco de stats 2×2, botões full-width, menu que recolhe). |
| 🌗 | **Modo e-ink** — troca o tema datasheet pelo visual de papel chapado do device (sombra dura, monocromático). Persistente + link (`?eink=1`). |
| 🧠 | **Modelo 3D ao vivo** — o **case real** (Three.js + `GLTFLoader`, GLB convertido do `Assembled.step` do Shapr3D) + internos fiéis (PCB, módulo PICO, header, USB-C, bateria, tela e-ink), com toggle **Montada ⇄ Explodida** e auto-rotação. |
| 🔩 | **"What's Inside"** — um **desenho técnico em SVG** baseado no layout real da placa, com callouts de engenharia para as peças de verdade (ESP32-S3-PICO-1, FT6336, ES8311, USB-C, botões BOOT/PWR na lateral, bateria Li-ion…). |
| 📊 | **Comparação** com players de mercado (Plaud Note, Limitless, Otter.ai, Rabbit R1). |
| 🔌 | **100% offline** — Three.js + fontes locais, zero CDN. |
| 📱 | **Responsivo** e com `prefers-reduced-motion`. |

**Seções:** `Hero` · `Produto` · `Recursos` · `Como funciona` · `Sapiens Web`
· `Comparação` · `What's Inside` · `Live 3D` · `Specs` · `FAQ` · `CTA`

## 🛠️ Stack

- **HTML + CSS + JavaScript** puro (sem bundler).
- **Three.js vendorizado** em `public/assets/vendor/three/` — sem CDN.
- **Google Fonts vendorizadas** em `public/assets/fonts/` — sem CDN.
- i18n caseiro com `data-i18n` + dicionário em `public/js/script.js`.

## 📁 Estrutura

```
.
├── public/                  ← document root (servido pelo nginx)
│   ├── index.html
│   ├── css/styles.css
│   ├── js/script.js
│   └── assets/
│       ├── logo.png · sim-*.png
│       ├── case/assembled.glb   case real (do Assembled.step) + fontes (*.3mf)
│       ├── vendor/three/        Three.js local (core, OrbitControls, GLTFLoader, …)
│       └── fonts/               fontes web locais (woff2 + fonts.css)
├── deploy/                  ← infraestrutura
│   ├── Dockerfile               nginx hardened (unprivileged, alpine)
│   ├── nginx.conf               gzip, cache, fallback SPA (listen 8080)
│   ├── install.sh · uninstall.sh
│   └── DEPLOY.md                guia de deploy (EN · PT-BR)
├── docker-compose.yml       ← serviço 'web' (read-only, não-root)
├── .dockerignore
└── README.md · README.pt-br.md
```

## ▶️ Rodar localmente

Precisa ser servido por **HTTP** (`file://` bloqueia módulos ES e o `fetch` dos `.3mf`):

```bash
cd public
python3 -m http.server 8080
# abra http://localhost:8080
```

## 🐳 Deploy

Para uma VM Ubuntu Server (ex.: Proxmox) — um comando instala o Docker, builda a
imagem **nginx hardened** (não-root, read-only, alpine) e registra um **serviço
systemd** com auto-start no boot:

```bash
git clone https://github.com/gustavoschaedler/sapiens-note-website.git
cd sapiens-note-website
sudo ./deploy/install.sh                            # porta 80
# ou, para acesso só via Cloudflare Tunnel:
sudo SAPIENS_BIND=127.0.0.1 ./deploy/install.sh
```

Guia completo — atualização, **Cloudflare Tunnel**, firewall, hardening:
**[deploy/DEPLOY.pt-br.md](deploy/DEPLOY.pt-br.md)**.

## 🎨 Personalização

- **Tema / cores** — design tokens no topo de `public/css/styles.css` (`:root` para o *Datasheet*, `body.eink` para o e-ink). Tokens-chave: `--bg` (papel milimetrado), `--accent` (laranja industrial), `--ink`, `--muted`, `--line`, `--grid`.
- **Textos / traduções** — objeto `I18N` em `public/js/script.js` (chaves `en` / `pt`).
- **Desenho do What's Inside** — o `<svg class="xray">` inline em `public/index.html` (peças + callouts).
- **Case 3D (Live 3D)** — `public/assets/case/assembled.glb` (convertido do `Assembled.step` via `occt-import-js`); os internos são construídos por código no `<script type="module">` inline.

## 📄 Licença

Veja [LICENSE](LICENSE).
