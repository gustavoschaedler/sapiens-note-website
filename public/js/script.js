/* ============================================================
   Sapiens Note site — i18n (PT-BR / GB-EN), reveal, nav
   ============================================================ */

const I18N = {
  pt: {
    "meta.desc": "Sapiens Note — um gravador de notas de voz com IA, minimalista e offline-first, em uma tela e-ink de 1,54\".",
    "nav.product":"Visão geral","nav.features":"Recursos","nav.how":"Como funciona","nav.compare":"Comparação","nav.specs":"Specs",
    "nav.tagline":"e-ink · open hardware",
    "nav.grp.try":"Experimente","nav.grp.product":"Produto","nav.grp.ref":"Referência",
    "hero.pill":"Notas de voz com IA · open-source · offline-first",
    "hero.title1":"Fale sua ideia.","hero.title2":"Esqueça o resto.",
    "hero.sub":"Um gravador de notas de voz com IA numa tela e-ink de 1,54\". Aperte um botão, fale, guarde no bolso. Depois a nota volta transcrita — sem nunca abrir o celular.",
    "hero.cta1":"Conheça o produto","hero.cta2":"Comparar com o mercado",
    "hero.scale":"menor que um cartão de crédito",
    "hero.stat1":"e-ink mono","hero.stat2":"16-bit · captura local","hero.stat3":"assinaturas","hero.stat4":"offline-first",
    "product.eyebrow":"O produto",
    "product.title":"Um aparelho feito para uma coisa só: capturar a ideia.",
    "product.sub":"Sem feed, sem notificação, sem distração. Tela e-ink de alto contraste, bateria que dura dias e uma interface que se resolve em segundos.",
    "product.s1t":"Menu inicial","product.s1d":"Notes · Sync · Tags · Settings, com aquele flash de inversão do e-ink a cada toque.",
    "product.s2t":"Gravações","product.s2d":"Contador, bateria, paginação e título longo que rola sozinho.",
    "product.s3t":"Transcrição","product.s3d":"O texto inteiro rola sem parar; toque para pausar e voltar.",
    "product.s4t":"Gravando","product.s4d":"Timer enorme e botão STOP — você nunca fica na dúvida se o microfone está gravando.",
    "features.eyebrow":"Recursos",
    "features.title":"Feito para capturar a ideia, não para roubar sua atenção",
    "feat.1t":"Captura em um toque","feat.1d":"Grava áudio mono em 48 kHz / 16 bits, salvo primeiro no próprio aparelho. Não precisa de rede para gravar.",
    "feat.2t":"E-ink, bateria que dura dias","feat.2d":"Painel de 200×200 que mantém a imagem na tela sem gastar energia. Feito para uso rápido.",
    "feat.3t":"Transcrição na tela","feat.3d":"O texto inteiro preenche a tela e rola sozinho; toque para pausar e voltar.",
    "feat.4t":"IA que você troca","feat.4d":"whisper.cpp local (offline) ou a API da OpenAI — você decide. Dá para trocar o motor sem mexer no app.",
    "feat.5t":"Privacidade desde o projeto","feat.5d":"Tudo fica no seu aparelho. Sem conta, sem multiusuário, sem ficar preso à nuvem.",
    "feat.6t":"Dashboard web local","feat.6d":"Ouça, baixe o .wav, transcreva ou refaça a transcrição e veja o espectro do áudio — tudo na sua máquina.",
    "feat.7t":"Tags e player","feat.7d":"Organize por tags e ouça com play/pause/stop e barra de progresso já embutidos.",
    "feat.8t":"Aberto e hackeável","feat.8d":"Núcleo C++ compartilhado, dois simuladores no desktop e firmware ESP-IDF. Nada de caixa-preta.",
    "how.eyebrow":"Como funciona","how.title":"Da fala ao texto em três passos",
    "how.1t":"Capture (offline)","how.1d":"Aperte o botão e fale. O áudio é gravado no cartão como WAV 48 kHz / 16 bits mono. Funciona sem rede nenhuma.",
    "how.2t":"Transcreva (do seu jeito)","how.2d":"No dashboard local, transcreva com whisper.cpp (offline) ou OpenAI. O texto volta pelo mesmo núcleo compartilhado.",
    "how.3t":"Leia no e-ink","how.3d":"A nota aparece transcrita no aparelho, rolando sozinha — sem precisar abrir o celular.",
    "compare.eyebrow":"Comparação","compare.title":"Como o Sapiens Note se posiciona",
    "compare.sub":"A maioria dos gravadores com IA é fechada, depende de nuvem e cobra mensalidade. O Sapiens Note faz o contrário: local, aberto e seu.",
    "cmp.feature":"Recurso",
    "cmp.r1":"Captura 100% offline","cmp.r2":"Transcrição local (sem nuvem)","cmp.r3":"Dados ficam no seu hardware",
    "cmp.r4":"Sem assinatura para o essencial","cmp.r5":"Tela e-ink para leitura","cmp.r6":"Lê a transcrição no aparelho",
    "cmp.r7":"Motor de IA plugável","cmp.r8":"Open source / hackeável",
    "cmp.note":"Comparação baseada em informações públicas dos produtos (2026); ofertas dos concorrentes podem mudar. “~” = parcial/depende da configuração.",
    "specs.eyebrow":"Ficha técnica","specs.title":"Hardware aberto, um único alvo",
    "specs.sub":"Baseado na placa Waveshare ESP32-S3 1,54\" e-Paper (variante touch).",
    "spec.mcu":"MCU","spec.display":"Tela","spec.audio":"Áudio","spec.touch":"Toque",
    "spec.storage":"Armazenamento","spec.power":"Energia","spec.wireless":"Sem fio","spec.sw":"Software",
    "cta.title":"Aberto. Local. Seu.",
    "cta.sub":"Explore o código, rode os simuladores no desktop e monte o seu próprio Sapiens Note.",
    "cta.btn1":"Fale comigo ↗","cta.btn2":"Voltar ao topo",
    "nav.contact":"E-mail",
    "footer.tag":"Notas de voz com IA, minimalistas e offline-first, numa tela e-ink.",
    "footer.made":"feito com foco em privacidade",
    "nav.web":"Sapiens Web","nav.faq":"FAQ",
    "web.title":"O dashboard que transcreve — na sua máquina",
    "web.sub":"Um app web local (um único binário C++) que lê o mesmo banco do aparelho. Ouça, baixe, transcreva e veja o espectro — sem depender de nuvem.",
    "web.badge.done":"Transcrito","web.badge.pending":"Pendente",
    "web.mocksub":"painel local · motor: OpenAI Whisper","web.tx":"Transcrição",
    "web.f1":"Toca cada gravação no navegador, com o espectro do áudio ao vivo.",
    "web.f2":"Baixa o .wav (com o tamanho) e a transcrição em .txt.",
    "web.f3":"Transcreve ou refaz a transcrição de cada gravação, com barra de progresso.",
    "web.f4":"Motor que você troca: whisper.cpp (offline), OpenAI ou fake (demo).",
    "web.f5":"Lê o mesmo SQLite do aparelho — o resultado volta para ele.",
    "web.f6":"Roda 100% local em http://127.0.0.1:8080. Sem conta, sem upload.",
    "faq.title":"Perguntas frequentes",
    "faq.q1":"Preciso de internet para usar?","faq.a1":"Para gravar, não. A captura é 100% offline; só a transcrição pode usar rede — e até ela roda offline com o whisper.cpp.",
    "faq.q2":"Minhas gravações vão para a nuvem?","faq.a2":"Por padrão, não. Tudo fica local (SQLite + WAV). Só sai da sua máquina se você escolher o motor da OpenAI.",
    "faq.q3":"Tem assinatura ou mensalidade?","faq.a3":"Não. O essencial é gratuito e open-source. Você só paga (à OpenAI) se escolher esse motor de transcrição.",
    "faq.q4":"Dá para testar sem comprar o hardware?","faq.a4":"Dá. São dois simuladores de desktop (SDL2 e LVGL 9) que rodam a mesma interface e lógica do aparelho, além do dashboard web.",
    "faq.q5":"Qual é o hardware?","faq.a5":"A placa Waveshare ESP32-S3 1,54\" e-Paper (variante touch): tela mono de 200×200, codec de áudio ES8311, microSD e bateria.",
    "faq.q6":"Em quais idiomas ele transcreve?","faq.a6":"Depende do modelo whisper que você escolher — os multilíngues cobrem dezenas de idiomas, português e inglês incluídos, com detecção automática.",
    "faq.q7":"É open source de verdade?","faq.a7":"É. Núcleo C++, simuladores e firmware ESP-IDF estão no GitHub. Você pode ler, modificar e montar o seu.",
    "eink.label":"E-ink","eink.title":"Alternar tema (Datasheet · Escuro · E-ink)",
    "theme.datasheet":"Datasheet","theme.dark":"Escuro","theme.eink":"E-ink",
    "nav.inside":"Hardware","nav.model":"Live 3D",
    "nav.webdemo":"Dashboard","nav.sim":"Simulador",
    "webdemo.eyebrow":"Experimente","webdemo.title":"O dashboard, funcionando aqui no navegador",
    "webdemo.sub":"É o Sapiens Web de verdade: lê as gravações feitas no simulador, toca o áudio, transcreve com o Whisper da OpenAI (sua chave fica só no navegador) e baixa .wav/.txt. A transcrição volta a aparecer no aparelho.",
    "sim.eyebrow":"Simulador","sim.title":"Experimente o aparelho","sim.hint":"Toque em REC e fale — ele pede acesso ao microfone. A transcrição vem depois, no Dashboard.",
    "sim.sub":"É o firmware e-ink rodando no navegador, de verdade: o REC grava o áudio do microfone e a nota fica pendente. Você transcreve no Dashboard e a transcrição aparece aqui.",
    "priv.lead":"100% no seu navegador —",
    "priv.sim":"as gravações e transcrições ficam salvas aqui, no seu próprio navegador. Nada é enviado para a nuvem nem para nenhum servidor.",
    "priv.dash":"as gravações ficam salvas só no seu navegador, não vão para a nuvem. A transcrição é opcional: se você usá-la, o áudio vai direto para a OpenAI com a sua chave; nada passa por servidores nossos.",
    "inside.eyebrow":"Hardware",
    "inside.title":"O que tem dentro",
    "inside.sub":"Desenho técnico da placa ESP32-S3-ePaper-1.54 (variante touch) e da carcaça impressa em 3D — e-Paper na frente, botões na lateral.",
    "inside.k1t":"Tela e-Paper 1,54\"","inside.k1s":"200×200 mono · toque",
    "inside.k2t":"ESP32-S3","inside.k2s":"8 MB · Wi-Fi + BLE",
    "inside.k3t":"Alto-falante","inside.k3s":"saída de áudio",
    "inside.k4t":"Carcaça traseira","inside.k4s":"encaixe sem parafusos · 3D",
    "inside.k5t":"Carcaça frontal","inside.k5s":"45 × 58 mm · impressa 3D",
    "inside.k6t":"Botões BOOT + PWR","inside.k6s":"lateral direita",
    "inside.k7t":"Microfone","inside.k7s":"captação de voz",
    "inside.k8t":"Bateria Li-ion","inside.k8s":"conector MX1.25",
    "inside.k9t":"Cartão microSD","inside.k9s":"lateral direita",
    "inside.k10t":"USB-C","inside.k10s":"energia + dados",
    "inside.note":"A carcaça impressa em 3D encaixa sem parafusos. Layout real da placa:",
    "model.eyebrow":"Modelo 3D",
    "model.sub":"Arraste para girar · role para dar zoom. A carcaça impressa em 3D — montada, com o hardware dentro e o botão no lugar.",
    "model.hint":"Arraste para girar",
    "model.assembled":"Montada","model.exploded":"Explodida",
    "model.loading":"Carregando modelo 3D…",
    "model.fallback":"Para ver o 3D, abra o site por um servidor local (ex.: python3 -m http.server) — não pelo arquivo (file://) — e com internet."
  },
  en: {
    "meta.desc":"Sapiens Note — a minimalist, offline-first AI voice-note recorder on a 1.54\" e-ink screen.",
    "nav.product":"Overview","nav.features":"Features","nav.how":"How it works","nav.compare":"Compare","nav.specs":"Specs",
    "nav.tagline":"e-ink · open hardware",
    "nav.grp.try":"Try it","nav.grp.product":"Product","nav.grp.ref":"Reference",
    "hero.pill":"AI voice notes · open-source · offline-first",
    "hero.title1":"Speak your idea.","hero.title2":"Forget the rest.",
    "hero.sub":"An AI voice-note recorder on a 1.54\" e-ink screen. Press one button, speak, pocket it. Later the note comes back transcribed — without ever opening your phone.",
    "hero.cta1":"Explore the product","hero.cta2":"Compare to the market",
    "hero.scale":"smaller than a credit card",
    "hero.stat1":"e-ink mono","hero.stat2":"16-bit · local capture","hero.stat3":"subscriptions","hero.stat4":"offline-first",
    "product.eyebrow":"The product",
    "product.title":"One device. One intent: catch the idea.",
    "product.sub":"No feed, no notifications, no distraction. High-contrast e-ink, days of battery, and a seconds-long interface.",
    "product.s1t":"Home menu","product.s1d":"Notes · Sync · Tags · Settings, with an e-ink invert flash on tap.",
    "product.s2t":"Recordings","product.s2d":"Counter, battery, pagination and a marquee for long titles.",
    "product.s3t":"Transcript","product.s3d":"Full text in infinite auto-scroll; tap to pause/resume.",
    "product.s4t":"Recording","product.s4d":"Big timer and a STOP button — never any doubt whether the mic is live.",
    "features.eyebrow":"Features",
    "features.title":"Built to capture, not to hold your attention",
    "feat.1t":"One-tap capture","feat.1d":"Records 48 kHz / 16-bit mono audio, saved locally first. The network is never needed to record.",
    "feat.2t":"E-ink, days of battery","feat.2d":"A 200×200 panel that holds its image at zero power. Made for seconds-long use.",
    "feat.3t":"Transcript on screen","feat.3d":"Full text fills the screen in infinite scroll; tap to pause and resume.",
    "feat.4t":"Pluggable AI","feat.4d":"Local whisper.cpp (offline) or the OpenAI API — your choice. Swap the engine without touching the app.",
    "feat.5t":"Privacy by design","feat.5d":"All data stays local. No accounts, no multi-tenancy, no cloud lock-in.",
    "feat.6t":"Local web dashboard","feat.6d":"Play, download the .wav, transcribe/re-transcribe and see the audio spectrum — all on your machine.",
    "feat.7t":"Tags & player","feat.7d":"Organize with tags and play back with built-in play/pause/stop and a progress bar.",
    "feat.8t":"Open & hackable","feat.8d":"Shared C++ core, two desktop simulators and ESP-IDF firmware. No black box.",
    "how.eyebrow":"How it works","how.title":"From speech to text in three steps",
    "how.1t":"Capture (offline)","how.1d":"Press the button and talk. Audio is written to the card as a 48 kHz / 16-bit mono WAV. Works with no network at all.",
    "how.2t":"Transcribe (your choice)","how.2d":"In the local dashboard, transcribe with whisper.cpp (offline) or OpenAI. The text flows back through the core.",
    "how.3t":"Read on e-ink","how.3d":"The note shows up transcribed on the device, auto-scrolling — without opening your phone.",
    "compare.eyebrow":"Compare","compare.title":"Where Sapiens Note stands",
    "compare.sub":"Most AI recorders are closed, require the cloud and charge a subscription. Sapiens Note flips that: local, open and yours.",
    "cmp.feature":"Feature",
    "cmp.r1":"Fully offline capture","cmp.r2":"Local transcription (no cloud)","cmp.r3":"Data stays on your hardware",
    "cmp.r4":"No subscription for the essentials","cmp.r5":"E-ink display for reading","cmp.r6":"Reads the transcript on-device",
    "cmp.r7":"Pluggable AI engine","cmp.r8":"Open source / hackable",
    "cmp.note":"Comparison based on publicly available product information (2026); competitor offerings may change. “~” = partial/depends on configuration.",
    "specs.eyebrow":"Tech specs","specs.title":"Open hardware, single target",
    "specs.sub":"Based on the Waveshare ESP32-S3 1.54\" e-Paper board (touch variant).",
    "spec.mcu":"MCU","spec.display":"Display","spec.audio":"Audio","spec.touch":"Touch",
    "spec.storage":"Storage","spec.power":"Power","spec.wireless":"Wireless","spec.sw":"Software",
    "cta.title":"Open. Local. Yours.",
    "cta.sub":"Explore the code, run the desktop simulators and build your own Sapiens Note.",
    "cta.btn1":"Email me ↗","cta.btn2":"Back to top",
    "nav.contact":"Email",
    "footer.tag":"Minimalist, offline-first AI voice notes on an e-ink screen.",
    "footer.made":"built privacy-first",
    "nav.web":"Sapiens Web","nav.faq":"FAQ",
    "web.title":"The dashboard that transcribes — on your machine",
    "web.sub":"A local web app (a single C++ binary) that reads the device's own database. Play, download, transcribe and watch the spectrum — no mandatory cloud.",
    "web.badge.done":"Transcribed","web.badge.pending":"Pending",
    "web.mocksub":"local dashboard · engine: OpenAI Whisper","web.tx":"Transcript",
    "web.f1":"Plays each recording in the browser, with a live audio spectrum.",
    "web.f2":"Downloads the .wav (with size) and the .txt transcript.",
    "web.f3":"Transcribe / re-transcribe per recording, with a progress bar.",
    "web.f4":"Pluggable engine: whisper.cpp (offline), OpenAI or fake (demo).",
    "web.f5":"Reads the device's same SQLite — the result flows back to the device.",
    "web.f6":"Runs 100% locally at http://127.0.0.1:8080. No account, no upload.",
    "faq.title":"Frequently asked questions",
    "faq.q1":"Do I need the internet?","faq.a1":"Not to record. Capture is 100% offline; only transcription may use the network — and even that runs offline with whisper.cpp.",
    "faq.q2":"Do my recordings go to the cloud?","faq.a2":"Not by default. Everything stays local (SQLite + WAV). It only leaves your machine if you choose the OpenAI engine.",
    "faq.q3":"Is there a subscription?","faq.a3":"No. The essentials are free and open-source. You only pay (OpenAI) if you opt for that transcription engine.",
    "faq.q4":"Can I try it without the hardware?","faq.a4":"Yes. Two desktop simulators (SDL2 and LVGL 9) run the same UI and logic as the device, plus the web dashboard.",
    "faq.q5":"What's the target hardware?","faq.a5":"The Waveshare ESP32-S3 1.54\" e-Paper board (touch variant): 200×200 mono screen, ES8311 audio codec, microSD and battery.",
    "faq.q6":"Which languages can it transcribe?","faq.a6":"Depends on the chosen whisper model — multilingual models cover dozens of languages, including Portuguese and English, with auto-detection.",
    "faq.q7":"Is it really open source?","faq.a7":"Yes. The C++ core, simulators and ESP-IDF firmware are on GitHub. You can read, modify and build your own.",
    "eink.label":"E-ink","eink.title":"Switch theme (Datasheet · Dark · E-ink)",
    "theme.datasheet":"Datasheet","theme.dark":"Dark","theme.eink":"E-ink",
    "nav.inside":"Hardware","nav.model":"Live 3D",
    "nav.webdemo":"Dashboard","nav.sim":"Simulator",
    "webdemo.eyebrow":"Try it","webdemo.title":"Interactive dashboard — try it here",
    "webdemo.sub":"The real Sapiens Web: it reads the recordings made in the simulator, plays the audio, transcribes the recording with OpenAI Whisper (your key, kept only in this browser) and downloads .wav/.txt. The transcript shows back on the device.",
    "sim.eyebrow":"Simulator","sim.title":"Try the device","sim.hint":"Tap REC and speak — it asks for microphone access. Transcription happens later, in the Dashboard.",
    "sim.sub":"The e-ink firmware in your browser — for real: REC records audio from the mic (the note stays pending). You transcribe it in the Dashboard and the transcript shows up here.",
    "priv.lead":"100% in your browser —",
    "priv.sim":"recordings and transcripts are saved right here, in your own browser. Nothing is sent to the cloud or any server.",
    "priv.dash":"recordings are saved only in your browser, never going to the cloud. Transcription is optional: if you use it, the audio goes straight to OpenAI with your own key; nothing passes through our servers.",
    "inside.eyebrow":"Hardware",
    "inside.title":"What's Inside",
    "inside.sub":"A technical drawing of the real ESP32-S3-ePaper-1.54 board (touch variant) and the 3D-printed case — e-Paper on the front, buttons on the side.",
    "inside.k1t":"1.54\" e-Paper","inside.k1s":"200×200 mono · touch",
    "inside.k2t":"ESP32-S3","inside.k2s":"8 MB · Wi-Fi + BLE",
    "inside.k3t":"Speaker","inside.k3s":"audio out",
    "inside.k4t":"Back housing","inside.k4s":"snap-fit, no screws · 3D",
    "inside.k5t":"Front housing","inside.k5s":"45 × 58 mm · 3D-print",
    "inside.k6t":"BOOT + PWR buttons","inside.k6s":"right side",
    "inside.k7t":"Microphone","inside.k7s":"voice capture",
    "inside.k8t":"Li-ion battery","inside.k8s":"MX1.25 connector",
    "inside.k9t":"microSD card","inside.k9s":"right side",
    "inside.k10t":"USB-C","inside.k10s":"power + data",
    "inside.note":"The 3D-printed case snaps together with no screws. Real board layout:",
    "model.eyebrow":"3D model",
    "model.sub":"Drag to rotate · scroll to zoom. The 3D-printed case you provided — assembled, with the hardware inside and the button in place.",
    "model.hint":"Drag to rotate",
    "model.assembled":"Assembled","model.exploded":"Exploded",
    "model.loading":"Loading 3D model…",
    "model.fallback":"To see the 3D, open the site via a local server (e.g. python3 -m http.server) — not from the file (file://) — and with internet."
  }
};

const HTML_LANG = { pt:"pt-BR", en:"en-GB" };

// theme constant (declared before applyLang, which calls updateThemeBtn at init)
const THEMES = ["datasheet", "eink", "dark"];

function applyLang(lang){
  const dict = I18N[lang] || I18N.pt;
  document.documentElement.lang = HTML_LANG[lang] || "pt-BR";
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    if (dict[k] == null) return;
    if (el.tagName === "META") el.setAttribute("content", dict[k]);
    else el.textContent = dict[k];
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el=>{
    const k = el.getAttribute("data-i18n-title");
    if (dict[k] != null) el.setAttribute("title", dict[k]);
  });
  document.querySelectorAll(".lang__btn").forEach(b=>
    b.classList.toggle("is-active", b.dataset.lang === lang));
  try { localStorage.setItem("sn-lang", lang); } catch(e){}
  updateThemeBtn();
}

document.querySelectorAll(".lang__btn").forEach(b=>
  b.addEventListener("click", ()=>applyLang(b.dataset.lang)));

// initial language: saved → browser → pt
(function(){
  let lang = "pt";
  try { lang = localStorage.getItem("sn-lang") || lang; } catch(e){}
  if (!localStorage.getItem("sn-lang") && /^en/i.test(navigator.language||"")) lang = "en";
  applyLang(lang);
})();

// year
document.getElementById("year").textContent = new Date().getFullYear();

// theme: 3 modes — Datasheet (default) → Dark → E-ink
function curTheme(){
  return document.body.classList.contains("eink") ? "eink"
       : document.body.classList.contains("dark") ? "dark" : "datasheet";
}
function updateThemeBtn(){      // reflect active mode on the 3-position switch
  document.querySelectorAll("#themeSw .theme-sw__opt").forEach(b=>{
    const on = b.dataset.theme === curTheme();
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
}
function applyTheme(mode){
  if (!THEMES.includes(mode)) mode = "datasheet";
  document.body.classList.toggle("eink", mode === "eink");
  document.body.classList.toggle("dark", mode === "dark");
  try { localStorage.setItem("sn-theme", mode); } catch(e){}
  updateThemeBtn();
}
document.querySelectorAll("#themeSw .theme-sw__opt").forEach(b=>
  b.addEventListener("click", ()=>applyTheme(b.dataset.theme)));
(function(){
  let mode = "datasheet";
  try {
    mode = localStorage.getItem("sn-theme")
         || (localStorage.getItem("sn-eink") === "1" ? "eink" : "datasheet");   // migrate old pref
  } catch(e){}
  if (/[?&]eink=1/.test(location.search)) mode = "eink";   // shareable e-ink link
  const tp = (location.search.match(/[?&]theme=(datasheet|dark|eink)/) || [])[1];
  if (tp) mode = tp;                                        // shareable theme link (?theme=dark)
  applyTheme(mode);
})();

// mobile nav (drop-down panel)
const burger = document.getElementById("burger");
const navPanel = document.getElementById("navPanel");
const navLinks = document.getElementById("navLinks");
const setMenu = (open)=>{ navPanel.classList.toggle("open", open); burger?.setAttribute("aria-expanded", open ? "true" : "false"); };
burger?.addEventListener("click", ()=>setMenu(!navPanel.classList.contains("open")));
navLinks?.querySelectorAll("a").forEach(a=> a.addEventListener("click", ()=>setMenu(false)));

// scroll-spy — highlight the section currently in view
if (navLinks) {
  const spyLinks = [...navLinks.querySelectorAll("a")];
  const spyMap = new Map(spyLinks.map(a => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if (e.isIntersecting){
      spyLinks.forEach(l=>l.classList.remove("active"));
      spyMap.get(e.target.id)?.classList.add("active");
    }});
  }, { rootMargin:"-45% 0px -50% 0px", threshold:0 });
  spyMap.forEach((_, id)=>{ const s = document.getElementById(id); if (s) spy.observe(s); });
  // clear the highlight while still up in the hero
  addEventListener("scroll", ()=>{ if (window.scrollY < 140) spyLinks.forEach(l=>l.classList.remove("active")); }, { passive:true });
}

// scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold:.14 });
document.querySelectorAll(".reveal").forEach((el,i)=>{
  el.style.transitionDelay = (i % 4 * 70) + "ms";
  io.observe(el);
});

// 3D viewer fallback: if Three.js (CDN module) didn't render a canvas, show notice
setTimeout(()=>{
  const v = document.getElementById("viewer");
  if (v && !v.querySelector("canvas")) v.classList.add("failed");
}, 6000);
