/* ============================================================
   Sapiens Web — REAL dashboard (faithful to webtool/page.h).
   Reads the same shared SNStore the device simulator writes to:
   lists actual recordings, plays the real audio, downloads real
   .wav/.txt, deletes, and TRANSCRIBES the stored recording via the
   OpenAI Whisper API (your key, kept only in this browser) — exactly
   like the real flow: record on the device → transcribe here → it
   shows up back on the device.
   ============================================================ */
(function () {
  const mount = document.getElementById('dashApp');
  if (!mount || !window.SNStore) return;

  const $ = (s, r = mount) => r.querySelector(s);
  const PAGE = 5;
  const KEY = 'sn-openai-key';
  let page = 0, notes = [], open = new Set(), busy = new Set(), keyThen = null;

  const SVG = 'viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const ICONS = {
    download: `<svg ${SVG}><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>`,
    trash: `<svg ${SVG}><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 14h10l1-14"/><path d="M10 11v5M14 11v5"/></svg>`,
    speak: `<svg ${SVG}><circle cx="9" cy="8" r="3"/><path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M17 8.5c1 1 1 3 0 4"/><path d="M19.5 6.5c2 2 2 6 0 8"/></svg>`,
    text: `<svg ${SVG}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/></svg>`,
  };
  const esc = (s) => (s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // .wav size from duration (48 kHz / 16 bits · mono = 96 KB/s)
  const fmtSize = (secs) => { const b = Math.max(1, Math.round((secs || 0) * 48000 * 2)); return b < 1048576 ? (b / 1024).toFixed(1) + ' KB' : (b / 1048576).toFixed(1) + ' MB'; };
  const getKey = () => { try { return localStorage.getItem(KEY) || ''; } catch (e) { return ''; } };
  const setKey = (k) => { try { localStorage.setItem(KEY, k); } catch (e) {} };

  // --- sound spectrum (Web Audio) shown in the now-playing tile (from page.h) ---
  let actx = null; const ANALYSERS = new WeakMap(); let viz = { row: null, an: null, raf: 0 };
  function analyserFor(au) {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    if (!ANALYSERS.has(au)) {
      const src = actx.createMediaElementSource(au);
      const an = actx.createAnalyser(); an.fftSize = 256; an.smoothingTimeConstant = 0.8;
      src.connect(an); an.connect(actx.destination); ANALYSERS.set(au, an);
    }
    return ANALYSERS.get(au);
  }
  function startViz(row, au) {
    try { if (actx) actx.resume(); viz.an = analyserFor(au); } catch (e) { return; }
    viz.row = row; if (!viz.raf) drawViz();
  }
  function stopViz(row) {
    if (viz.row !== row) return;
    if (viz.raf) { cancelAnimationFrame(viz.raf); viz.raf = 0; }
    const cv = row.querySelector('.spec'); if (cv) cv.getContext('2d').clearRect(0, 0, cv.width, cv.height);
    viz.row = null; viz.an = null;
  }
  function drawViz() {
    viz.raf = requestAnimationFrame(drawViz);
    if (!viz.row || !viz.an) return;
    const cv = viz.row.querySelector('.spec'); if (!cv) return;
    const n = viz.an.frequencyBinCount, data = new Uint8Array(n); viz.an.getByteFrequencyData(data);
    const ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H); ctx.fillStyle = '#000';
    const usable = Math.max(8, Math.floor(n * 0.30)), bars = Math.max(20, Math.floor(W / 2.2)), bw = W / bars;
    for (let i = 0; i < bars; i++) {
      const idx = Math.min(usable - 1, Math.floor((i / bars) * usable));
      const h = Math.min(H, (data[idx] / 255) * H * 1.7);
      ctx.fillRect(i * bw, H - h, Math.max(1, bw - 1), Math.max(1, h));
    }
  }

  mount.innerHTML = `
    <div class="dh"><img class="dh-logo" src="assets/logo.png" alt="">
      <div><b>Sapiens Note</b><small>local dashboard · engine: OpenAI Whisper</small></div>
      <span class="dh-actions"><button class="btn keybtn" data-act="key">API key</button><span class="dh-sub" id="dSub"></span></span></div>
    <div id="dList"></div>
    <div id="dPager" class="dpager"><button class="btn" data-act="prev">‹ Prev</button><span class="nums" id="dNums"></span><button class="btn" data-act="next">Next ›</button></div>
    <div class="dmodal" id="dModal"><div class="dmbox" id="dmBox"></div></div>`;

  SNStore.onChange(load);

  async function load() {
    notes = await SNStore.list();
    $('#dSub').textContent = notes.length + ' recording' + (notes.length === 1 ? '' : 's');
    const pages = Math.max(1, Math.ceil(notes.length / PAGE));
    if (page >= pages) page = pages - 1; if (page < 0) page = 0;
    const list = $('#dList');
    if (!notes.length) { list.innerHTML = `<div class="dempty">No recordings yet — record one in the device simulator above ↑</div>`; pager(1); return; }
    const slice = notes.slice(page * PAGE, page * PAGE + PAGE);
    const urls = await Promise.all(slice.map(n => SNStore.audioURL(n.id)));
    list.innerHTML = slice.map((n, i) => rowHTML(n, page * PAGE + i + 1, urls[i])).join('');
    slice.forEach(n => { const a = list.querySelector(`.row[data-id="${n.id}"] .dl`); if (a) a.href = URL.createObjectURL(new Blob([n.transcript || ''], { type: 'text/plain' })); });
    // wire the spectrum + now-playing tile to each row's <audio> (like page.h)
    list.querySelectorAll('.row').forEach(row => {
      const au = row.querySelector('audio'); if (!au) return;
      au.addEventListener('play', () => {
        list.querySelectorAll('.row.playing').forEach(r => { if (r !== row) { r.classList.remove('playing'); const o = r.querySelector('audio'); if (o && !o.paused) o.pause(); } });
        row.classList.add('playing'); startViz(row, au);
      });
      au.addEventListener('pause', () => { row.classList.remove('playing'); stopViz(row); });
      au.addEventListener('ended', () => { row.classList.remove('playing'); stopViz(row); });
    });
    pager(pages);
  }

  function rowHTML(n, idx, url) {
    const done = n.status === 'transcribed' && n.transcript;
    const isOpen = open.has(n.id) && done;
    const isBusy = busy.has(n.id);
    return `<div class="row${isBusy ? ' busy' : ''}" data-id="${n.id}">
      <div class="top"><span class="num">${String(idx).padStart(4, '0')}</span>
        <span class="title">${esc(n.title)}</span>
        <span class="badge${done ? ' done' : ''}">${done ? 'transcribed' : 'pending'}</span></div>
      <div class="controls">
        ${url ? `<audio controls preload="metadata" src="${url}"></audio>` : '<span class="noaud">no audio</span>'}
        <button class="btn" data-act="dlwav" data-arg="${n.id}" title="Download .wav">${ICONS.download}<span class="sz">${fmtSize(n.secs)}</span></button>
        <button class="btn act" data-act="transcribe" data-arg="${n.id}" title="${done ? 'Re-transcribe' : 'Transcribe'}"${isBusy ? ' disabled' : ''}>${ICONS.speak}${ICONS.text}</button>
        ${done ? `<button class="btn tgl" data-act="tgl" data-arg="${n.id}">Transcript</button>` : ''}
        <button class="btn del" data-act="del" data-arg="${n.id}" title="Delete">${ICONS.trash}</button>
        <canvas class="spec" width="112" height="22"></canvas>
        <div class="prog"><div class="bar"></div></div>
      </div>
      <div class="tx${isOpen ? ' open' : ''}"><pre>${esc(n.transcript)}</pre>
        <a class="btn dl" download="${esc(n.title)}.txt">Download .txt</a></div>
    </div>`;
  }

  function pager(pages) {
    const p = $('#dPager');
    if (pages <= 1) { p.style.display = 'none'; return; }
    p.style.display = 'flex';
    const nums = $('#dNums'); nums.innerHTML = '';
    for (let i = 0; i < pages; i++) {
      const b = document.createElement('button');
      b.className = 'btn pg' + (i === page ? ' active' : '');
      b.textContent = i + 1; b.dataset.act = 'go'; b.dataset.arg = i;
      nums.appendChild(b);
    }
    p.querySelector('[data-act="prev"]').disabled = page <= 0;
    p.querySelector('[data-act="next"]').disabled = page >= pages - 1;
  }

  // ---- modals ----
  function modal(html) { $('#dmBox').innerHTML = html; $('#dModal').classList.add('open'); }
  function closeModal() { $('#dModal').classList.remove('open'); keyThen = null; }

  function confirmDelete(id) {
    const n = notes.find(x => x.id === id) || {};
    modal(`<h3>Delete this recording?</h3><p class="dmname">${esc(n.title)}</p><p>This cannot be undone.</p>
      <div class="dmbtns"><button class="btn" data-act="delyes" data-arg="${id}">Delete</button><button class="btn" data-act="mclose">Cancel</button></div>`);
  }
  function confirmRe(id) {
    const n = notes.find(x => x.id === id) || {};
    modal(`<h3>Already transcribed</h3><p class="dmname">${esc(n.title)}</p><p>Re-transcribe and replace the current transcript?</p>
      <div class="dmbtns"><button class="btn" data-act="reyes" data-arg="${id}">Re-transcribe</button><button class="btn" data-act="mclose">Cancel</button></div>`);
  }
  function openKeyModal(then) {
    keyThen = then || null;
    modal(`<h3>OpenAI API key</h3>
      <p class="dmhint">Needed to transcribe recordings with Whisper. Stored only in <b>this browser</b> (localStorage); requests go straight to OpenAI. Get one at platform.openai.com.</p>
      <input id="keyInput" class="keyin" type="password" placeholder="sk-…" value="${esc(getKey())}">
      <div class="dmbtns"><button class="btn" data-act="keysave">Save</button><button class="btn" data-act="mclose">Cancel</button></div>`);
    setTimeout(() => { const i = $('#keyInput'); if (i) i.focus(); }, 30);
  }
  function notice(title, msg) {
    modal(`<h3>${esc(title)}</h3><pre class="dlive">${esc(msg)}</pre><div class="dmbtns"><button class="btn" data-act="mclose">OK</button></div>`);
  }

  // ---- REAL transcription via OpenAI Whisper (the stored recording) ----
  function requestTranscribe(id) {
    const n = notes.find(x => x.id === id);
    if (!getKey()) { openKeyModal(() => requestTranscribe(id)); return; }
    if (n && n.status === 'transcribed' && n.transcript) confirmRe(id); else transcribe(id);
  }
  async function transcribe(id) {
    const blob = await SNStore.audioBlob(id);
    if (!blob) { notice('No audio', 'This note has no audio to transcribe.'); return; }
    busy.add(id); load();
    try {
      const type = blob.type || 'audio/webm';
      const ext = type.includes('mp4') ? 'mp4' : type.includes('wav') ? 'wav' : type.includes('mpeg') ? 'mp3' : 'webm';
      const fd = new FormData();
      fd.append('file', new File([blob], 'audio.' + ext, { type }));
      fd.append('model', 'whisper-1');
      fd.append('response_format', 'text');
      const r = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST', headers: { Authorization: 'Bearer ' + getKey() }, body: fd
      });
      const body = await r.text();
      if (!r.ok) { busy.delete(id); load(); notice('Transcription failed', body); return; }
      busy.delete(id); open.add(id);
      await SNStore.update(id, { transcript: body.trim(), status: 'transcribed' }); // → onChange → load()
    } catch (e) { busy.delete(id); load(); notice('Transcription error', String(e) + '\n\n(If this is a CORS/network error, check your connection and key.)'); }
  }

  async function downloadWav(id) {
    const n = notes.find(x => x.id === id) || {};
    let url; try { url = await SNStore.wavURL(id); } catch (e) { url = await SNStore.audioURL(id); }
    if (!url) return;
    const a = document.createElement('a'); a.href = url; a.download = (n.title || 'recording') + '.wav';
    document.body.appendChild(a); a.click(); a.remove();
  }

  // ---- delegated clicks ----
  mount.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]'); if (!el) return;
    const act = el.dataset.act, arg = el.dataset.arg;
    switch (act) {
      case 'prev': if (page > 0) { page--; load(); } break;
      case 'next': page++; load(); break;
      case 'go': page = +arg; load(); break;
      case 'tgl': if (open.has(arg)) open.delete(arg); else open.add(arg); load(); break;
      case 'del': confirmDelete(arg); break;
      case 'delyes': closeModal(); SNStore.remove(arg); break;
      case 'dlwav': downloadWav(arg); break;
      case 'transcribe': requestTranscribe(arg); break;
      case 'reyes': closeModal(); transcribe(arg); break;
      case 'key': openKeyModal(null); break;
      case 'keysave': { const v = ($('#keyInput') || {}).value || ''; setKey(v.trim()); const t = keyThen; closeModal(); if (t && v.trim()) t(); break; }
      case 'mclose': closeModal(); break;
    }
  });
  $('#dModal').addEventListener('click', (e) => { if (e.target.id === 'dModal') closeModal(); });

  load();
})();
