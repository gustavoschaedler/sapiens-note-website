/* ============================================================
   SNStore — shared, REAL client-side store for the device simulator
   and the dashboard. Notes + audio blobs persist in IndexedDB and are
   shared between both surfaces (record in the sim → shows in the
   dashboard, and vice-versa). No backend, no mock.
   ============================================================ */
window.SNStore = (function () {
  const DB = 'sapiens-sim', VER = 1;
  let dbp = null;

  function open() {
    if (dbp) return dbp;
    dbp = new Promise((res, rej) => {
      const r = indexedDB.open(DB, VER);
      r.onupgradeneeded = () => {
        const db = r.result;
        if (!db.objectStoreNames.contains('notes')) db.createObjectStore('notes', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('audio')) db.createObjectStore('audio', { keyPath: 'id' });
      };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  const store = (name, mode) => open().then(db => db.transaction(name, mode).objectStore(name));
  const req = (r) => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  // cross-surface + cross-tab change notification
  const bc = ('BroadcastChannel' in window) ? new BroadcastChannel('sn-store') : null;
  function emit() { window.dispatchEvent(new CustomEvent('sn-store-changed')); if (bc) bc.postMessage('changed'); }
  if (bc) bc.onmessage = () => window.dispatchEvent(new CustomEvent('sn-store-changed'));
  const uid = () => 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  async function add(note, blob) {
    const rec = Object.assign({ id: uid(), createdAt: Date.now(), fav: false, status: 'pending', transcript: '', secs: 0, title: '', mime: blob ? blob.type : '' }, note);
    const ns = await store('notes', 'readwrite'); await req(ns.put(rec));
    if (blob) { const as = await store('audio', 'readwrite'); await req(as.put({ id: rec.id, blob })); }
    emit(); return rec;
  }
  async function list() { const ns = await store('notes', 'readonly'); const all = await req(ns.getAll()); return all.sort((a, b) => b.createdAt - a.createdAt); }
  async function get(id) { const ns = await store('notes', 'readonly'); return req(ns.get(id)); }
  async function update(id, patch) { const ns = await store('notes', 'readwrite'); const n = await req(ns.get(id)); if (!n) return null; Object.assign(n, patch); await req(ns.put(n)); emit(); return n; }
  async function remove(id) { let s = await store('notes', 'readwrite'); await req(s.delete(id)); s = await store('audio', 'readwrite'); await req(s.delete(id)); emit(); }
  async function audioBlob(id) { const as = await store('audio', 'readonly'); const r = await req(as.get(id)); return r && r.blob; }
  async function audioURL(id) { const b = await audioBlob(id); return b ? URL.createObjectURL(b) : null; }

  // decode the recorded blob (webm/opus etc.) → a real 48 kHz / 16-bit mono WAV blob URL
  async function wavURL(id) {
    const b = await audioBlob(id); if (!b) return null;
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const buf = await ac.decodeAudioData(await b.arrayBuffer());
    const n = buf.length, rate = buf.sampleRate, out = new DataView(new ArrayBuffer(44 + n * 2));
    const ch0 = buf.getChannelData(0), ch1 = buf.numberOfChannels > 1 ? buf.getChannelData(1) : null;
    const w = (o, s) => { for (let i = 0; i < s.length; i++) out.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); out.setUint32(4, 36 + n * 2, true); w(8, 'WAVE'); w(12, 'fmt ');
    out.setUint32(16, 16, true); out.setUint16(20, 1, true); out.setUint16(22, 1, true);
    out.setUint32(24, rate, true); out.setUint32(28, rate * 2, true); out.setUint16(32, 2, true);
    out.setUint16(34, 16, true); w(36, 'data'); out.setUint32(40, n * 2, true);
    for (let i = 0; i < n; i++) {
      let s = ch1 ? (ch0[i] + ch1[i]) / 2 : ch0[i]; s = Math.max(-1, Math.min(1, s));
      out.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    ac.close && ac.close();
    return URL.createObjectURL(new Blob([out.buffer], { type: 'audio/wav' }));
  }

  return { add, list, get, update, remove, audioBlob, audioURL, wavURL,
           onChange: (cb) => window.addEventListener('sn-store-changed', cb) };
})();

