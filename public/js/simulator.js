/* ============================================================
   Device simulator — the Sapiens Note e-ink firmware in the browser,
   REAL: records from the microphone (MediaRecorder), transcribes LIVE
   (Web Speech) as you speak, and persists to the shared SNStore
   (IndexedDB) — the same store the dashboard reads. No mock.
   ============================================================ */
(function () {
  const mount = document.getElementById('simDevice');
  if (!mount || !window.SNStore) return;

  const PAGE = 5;
  const st = { screen: 'splash', page: 0, sel: null, recSecs: 0, scrollPaused: false,
               spd: 3, fmt: 1, recErr: '' };
  let cache = [];                 // notes mirror from the store
  const rec = { mr: null, chunks: [], sr: null, final: '', interim: '', stream: null, t: 0 };
  const player = { audio: null, on: false };
  let timers = [];
  const clearTimers = () => { timers.forEach(t => { clearInterval(t); }); timers = []; };
  const pad = (n) => String(n).padStart(2, '0');
  const mmss = (s) => pad(Math.floor(s / 60)) + ':' + pad(Math.round(s) % 60);
  const esc = (s) => (s || '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  // hand-drawn e-ink icons (currentColor → invert with the button/band)
  const ic = (p, fill) => `<svg class="dic" viewBox="0 0 24 24" width="18" height="18" fill="${fill ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const DI = {
    play:  ic('<path d="M7 4l13 8-13 8z"/>', 1),
    pause: ic('<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>', 1),
    stop:  ic('<rect x="5" y="5" width="14" height="14" rx="2"/>', 1),
    trash: ic('<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 14h10l1-14"/><path d="M10 11v5M14 11v5"/>'),
    up:    ic('<path d="M6 15l6-6 6 6"/>'),
    down:  ic('<path d="M6 9l6 6 6-6"/>'),
    rec:   ic('<circle cx="12" cy="12" r="6"/>', 1),
  };

  mount.innerHTML = `
    <div class="sim-shell">
      <div class="sim-screen" id="simScreen"></div>
      <div class="sim-feet"><span></span><span></span></div>
    </div>
    <div class="sim-side">
      <button class="sim-sbtn" data-act="rec" aria-label="Record">REC</button>
      <button class="sim-sbtn" data-act="back" aria-label="Back / Home">BACK</button>
    </div>`;
  const screen = mount.querySelector('#simScreen');

  mount.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]'); if (!el) return;
    el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 130);
    dispatch(el.dataset.act, el.dataset.arg);
  });

  async function refresh() { cache = await SNStore.list(); }
  SNStore.onChange(async () => {                 // dashboard (or another tab) changed data
    await refresh();
    if (st.screen === 'list' || st.screen === 'detail') render();
  });

  const battery = () => `<span class="b-batt"><span class="b-cell"><i style="width:74%"></i></span>87%</span>`;

  const screens = {
    splash() {
      timers.push(setTimeout(() => { if (st.screen === 'splash') go('home'); }, 2200));
      return `<div class="s-splash" data-act="home"><img src="assets/logo.png" alt="">
        <div class="s-splash-t">Sapiens Note</div><div class="s-splash-v">v0.1.0</div></div>`;
    },
    home() {
      const tile = (a, l) => `<button class="tile" data-act="${a}">${l}</button>`;
      return `<div class="s-headwrap">
        <div class="lhdr"><b>Sapiens Note</b>${battery()}</div>
        <div class="s-home">${tile('notes', 'Notes')}${tile('sync', 'Sync')}${tile('tags', 'Tags')}${tile('settings', 'Settings')}</div>
      </div>`;
    },
    list() {
      const pages = Math.max(1, Math.ceil(cache.length / PAGE));
      if (st.page >= pages) st.page = pages - 1; if (st.page < 0) st.page = 0;
      const slice = cache.slice(st.page * PAGE, st.page * PAGE + PAGE);
      const rows = slice.map((n, i) => {
        const idx = st.page * PAGE + i + 1;
        return `<div class="lrow" data-act="open" data-arg="${n.id}">
          <span class="lnum">${String(idx).padStart(4, '0')}</span>
          <span class="ltitle"><span class="mq">${esc(n.title)}${n.fav ? ' ★' : ''}</span></span>
          ${n.status !== 'transcribed' ? '<span class="ldot">●</span>' : ''}</div>`;
      }).join('') || `<div class="lempty">No notes yet —<br>tap REC and speak</div>`;
      const multi = pages > 1;
      return `<div class="s-list">
        <div class="lhdr"><b>Sapiens Note</b>${battery()}</div>
        <div class="lsub">${cache.length} note${cache.length === 1 ? '' : 's'} · ${st.page + 1}/${pages}</div>
        <div class="lrows">${rows}</div>
        <div class="lfoot">
          ${multi ? `<button class="ebtn sm" data-act="pageUp">${DI.up}</button>` : ''}
          <button class="ebtn rec" data-act="rec">${DI.rec}<span>REC</span></button>
          ${multi ? `<button class="ebtn sm" data-act="pageDown">${DI.down}</button>` : ''}</div></div>`;
    },
    recording() {
      if (st.recErr) return `<div class="s-rec"><div class="rec-band">${DI.rec}<span>REC</span></div>
        <div class="rec-err">${esc(st.recErr)}</div>
        <button class="ebtn" data-act="back">Back</button></div>`;
      return `<div class="s-rec">
        <div class="rec-band">${DI.rec}<span>REC</span></div>
        <div class="rec-time" id="recT">${mmss(rec.t)}</div>
        <div class="rec-wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <button class="ebtn stop" data-act="stop">${DI.stop}<span>STOP</span></button></div>`;
    },
    detail() {
      const n = cache.find(x => x.id === st.sel); if (!n) return screens.list();
      const body = (n.status === 'transcribed' && n.transcript)
        ? `<div class="d-scroll${st.scrollPaused ? ' paused' : ''}" data-act="toggleScroll"><div class="d-track"><p>${esc(n.transcript)}</p></div></div>`
        : `<div class="d-pending" data-act="toggleScroll">Pending transcription.<br>Transcribe it in the web dashboard.</div>`;
      return `<div class="s-detail">
        <div class="d-title"><span class="mq">${esc(n.title)}</span></div><div class="d-line"></div>
        ${body}
        <div class="d-foot">
          <button class="ebtn" data-act="play">${DI.play}</button>
          <button class="ebtn" data-act="askdel">${DI.trash}</button>
          <button class="ebtn" data-act="back">Back</button></div></div>`;
    },
    player() {
      const n = cache.find(x => x.id === st.sel); if (!n) return screens.list();
      return `<div class="s-player">
        <div class="d-title"><span class="mq">${esc(n.title)}</span></div>
        <div class="p-state" id="pState">${player.on ? 'Playing' : 'Paused'}</div>
        <div class="p-bar"><i id="pBar" style="width:0%"></i></div>
        <div class="p-time"><span id="pElapsed">00:00</span><span id="pTotal">${mmss(n.secs)}</span></div>
        <div class="d-foot">
          <button class="ebtn" data-act="playpause" id="pPP">${player.on ? DI.pause : DI.play}</button>
          <button class="ebtn" data-act="playstop">${DI.stop}</button>
          <button class="ebtn" data-act="open" data-arg="${n.id}">Back</button></div></div>`;
    },
    settings() {
      const fmts = ['Jun 07, 12:29', '2026-06-07 12:29', 'note-0007', '07/06 12:29', 'Rec 0007'];
      const step = (a, v, lbl) => `<div class="set-row"><span>${lbl}</span><span class="stepper">
        <button class="ebtn sm" data-act="${a}-">‹</button><b>${v}</b><button class="ebtn sm" data-act="${a}+">›</button></span></div>`;
      return `<div class="s-page"><div class="p-h">Settings</div>
        ${step('spd', st.spd, 'Scroll speed')}${step('fmt', st.fmt, 'Name format')}
        <div class="set-prev">${fmts[st.fmt - 1]}</div>
        <button class="ebtn" data-act="back">Back</button></div>`;
    },
    sync() {
      return `<div class="s-page"><div class="p-h">Sync</div>
        <div class="kv"><span>Account</span><b>local</b></div>
        <div class="kv"><span>Status</span><b>on this device</b></div>
        <div class="kv"><span>Notes</span><b>${cache.length}</b></div>
        <button class="ebtn" data-act="syncnow">Sync now</button>
        <button class="ebtn" data-act="back">Back</button></div>`;
    },
    tags() {
      const tags = ['errands', 'ideas', 'work'];
      return `<div class="s-page"><div class="p-h">Tags</div>
        ${tags.map(t => `<div class="kv"><span>#${t}</span></div>`).join('')}
        <button class="ebtn" data-act="back">Back</button></div>`;
    },
    confirm() {
      const n = cache.find(x => x.id === st.sel) || {};
      return `<div class="s-detail"><div class="d-title"><span>${esc(n.title || '')}</span></div><div class="d-line"></div><div class="d-pending">…</div></div>
        <div class="s-modal"><div class="s-mbox"><b>Delete this note?</b>
          <div class="s-mname">${esc(n.title || '')}</div><div class="s-mhint">This cannot be undone.</div>
          <div class="s-mbtns"><button class="ebtn" data-act="delyes">Delete</button><button class="ebtn" data-act="delno">Cancel</button></div></div></div>`;
    },
  };

  function go(s) { if (player.audio && s !== 'player') stopPlayback(); st.screen = s; render(); }
  function render() {
    clearTimers();
    screen.dataset.screen = st.screen;
    screen.innerHTML = (screens[st.screen] || screens.home)();
    screen.querySelectorAll('.mq').forEach(m => { if (m.scrollWidth > m.parentElement.clientWidth + 2) m.classList.add('run'); });
    if (st.screen === 'detail') {                         // auto-scroll only if the transcript overflows
      const sc = screen.querySelector('.d-scroll'), tr = screen.querySelector('.d-track');
      if (sc && tr) {
        const over = tr.scrollHeight - sc.clientHeight;
        if (over > 4) { tr.style.setProperty('--dist', (-over) + 'px'); tr.style.animationDuration = Math.max(6, over / 14) + 's'; tr.classList.add('run'); }
      }
    }
    if (st.screen === 'player') startPlayback();
  }

  // ---------- real recording + live transcription ----------
  // The device records AUDIO ONLY (exactly like the firmware) → note stays
  // "pending" until you transcribe it in the dashboard.
  async function startRecording() {
    st.recErr = ''; rec.t = 0; rec.chunks = [];
    render();
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch (e) { st.recErr = 'Microphone access is needed to record.'; render(); return; }
    rec.stream = stream;
    const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || '';
    rec.mr = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    rec.mr.ondataavailable = (e) => { if (e.data && e.data.size) rec.chunks.push(e.data); };
    rec.mr.onstop = saveRecording;
    rec.mr.start();
    timers.push(setInterval(() => { rec.t++; const t = screen.querySelector('#recT'); if (t) t.textContent = mmss(rec.t); }, 1000));
  }
  function stopRecording() {                        // STOP → onstop → saveRecording
    if (rec.mr && rec.mr.state !== 'inactive') rec.mr.stop(); else saveRecording();
  }
  async function saveRecording() {
    if (rec.stream) rec.stream.getTracks().forEach(t => t.stop());
    const blob = rec.chunks.length ? new Blob(rec.chunks, { type: rec.mr ? rec.mr.mimeType : 'audio/webm' }) : null;
    const now = new Date();
    const title = now.toLocaleDateString(undefined, { month: 'short', day: '2-digit' }) + ', ' + pad(now.getHours()) + ':' + pad(now.getMinutes());
    await SNStore.add({ title, transcript: '', secs: rec.t || 1, status: 'pending' }, blob);
    rec.mr = rec.stream = null; rec.chunks = [];
    await refresh(); st.page = 0; go('list');
  }

  // ---------- real playback ----------
  async function startPlayback() {
    const n = cache.find(x => x.id === st.sel); if (!n) return;
    if (!player.audio) {
      const url = await SNStore.audioURL(n.id);
      if (!url) { const s = screen.querySelector('#pState'); if (s) s.textContent = 'No audio'; return; }
      player.audio = new Audio(url);
      player.audio.ontimeupdate = () => {
        const a = player.audio; if (!a || !a.duration) return;
        const bar = screen.querySelector('#pBar'), el = screen.querySelector('#pElapsed');
        if (bar) bar.style.width = (a.currentTime / a.duration * 100) + '%';
        if (el) el.textContent = mmss(a.currentTime);
      };
      player.audio.onended = () => { player.on = false; const pp = screen.querySelector('#pPP'); if (pp) pp.innerHTML = DI.play; const s = screen.querySelector('#pState'); if (s) s.textContent = 'Stopped'; };
    }
    player.audio.play().then(() => { player.on = true; }).catch(() => {});
  }
  function stopPlayback() { if (player.audio) { player.audio.pause(); player.audio.currentTime = 0; player.audio = null; } player.on = false; }

  function dispatch(act, arg) {
    switch (act) {
      case 'home': go('home'); break;
      case 'notes': st.page = 0; go('list'); break;
      case 'sync': go('sync'); break;
      case 'tags': go('tags'); break;
      case 'settings': go('settings'); break;
      case 'rec': st.screen = 'recording'; startRecording(); break;
      case 'stop': stopRecording(); break;
      case 'open': st.sel = arg; st.scrollPaused = false; go('detail'); break;
      case 'pageUp': st.page--; render(); break;
      case 'pageDown': st.page++; render(); break;
      case 'toggleScroll': st.scrollPaused = !st.scrollPaused; render(); break;
      case 'play': go('player'); break;
      case 'playpause': {
        const a = player.audio;
        if (!a) { startPlayback(); break; }
        if (a.paused) { a.play(); player.on = true; } else { a.pause(); player.on = false; }
        const pp = screen.querySelector('#pPP'); if (pp) pp.innerHTML = player.on ? DI.pause : DI.play;
        const s = screen.querySelector('#pState'); if (s) s.textContent = player.on ? 'Playing' : 'Paused';
        break;
      }
      case 'playstop': if (player.audio) { player.audio.pause(); player.audio.currentTime = 0; player.on = false; } render(); break;
      case 'askdel': go('confirm'); break;
      case 'delyes': SNStore.remove(st.sel).then(refresh).then(() => go('list')); break;
      case 'delno': go('detail'); break;
      case 'syncnow': go('sync'); break;
      case 'spd-': st.spd = Math.max(1, st.spd - 1); render(); break;
      case 'spd+': st.spd = Math.min(5, st.spd + 1); render(); break;
      case 'fmt-': st.fmt = Math.max(1, st.fmt - 1); render(); break;
      case 'fmt+': st.fmt = Math.min(5, st.fmt + 1); render(); break;
      case 'back':
        if (st.screen === 'detail' || st.screen === 'player' || st.screen === 'recording') go('list');
        else go('home');
        break;
    }
  }

  refresh().then(render);
})();
