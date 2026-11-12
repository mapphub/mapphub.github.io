(function () {
  var log = document.getElementById('log');
  var inp = document.getElementById('inp');
  var sendBtn = document.getElementById('send');
  var onlineEl = document.getElementById('online');
  var DB = 'chat_v1', KEY = 'msgs';
  var msgs = [], seen = {};
  var M = null;
  var clientId = 'x' + Math.random().toString(36).slice(2, 7);
  var myName = 'User-' + clientId.slice(-4);

  function api() { return M || window.MiniApp || window.MiniApps; }

  function persist() {
    try { api().db('local.set', { name: DB, key: KEY, value: msgs }); } catch (e) {}
  }
  function render() {
    log.innerHTML = '';
    msgs.forEach(function (m) {
      var row = document.createElement('div');
      var mine = m.clientId === clientId;
      row.className = 'row' + (mine ? ' me' : '');
      var bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.textContent = String(m.text);
      var meta = document.createElement('div');
      meta.className = 'meta';
      meta.textContent = mine ? 'Вы' : (m.name || '???');
      if (!mine) row.appendChild(meta);
      row.appendChild(bubble);
      if (mine) row.appendChild(meta);
      log.appendChild(row);
    });
    log.scrollTop = log.scrollHeight;
  }
  function addMsg(entry) {
    if (!entry || entry.text == null || entry.text === '') return;
    var id = entry.id || (String(entry.clientId || '') + '|' + entry.text + '|' + String(entry.ts || ''));
    if (seen[id]) return;
    seen[id] = 1;
    msgs.push(entry);
    if (msgs.length > 300) msgs = msgs.slice(-300);
    persist();
    render();
  }
  function send() {
    var t = (inp.value || '').trim();
    if (!t) return;
    inp.value = '';
    var entry = { text: t, name: myName, clientId: clientId, ts: Date.now(), id: clientId + '-' + Date.now() };
    addMsg(entry);
    try {
      api().net('send', entry);
    } catch (e) {}
  }
  async function boot() {
    M = window.MiniApp || window.MiniApps;
    if (!M) { log.textContent = 'MiniApp недоступен'; return; }
    try { await M.shell('setChrome', { title: 'Чат', topBar: false, bottomBar: false }); } catch (e) {}
    try {
      if (M.getClientId) clientId = M.getClientId();
      if (M.isHost && M.isHost()) myName = 'Хост-' + String(clientId).slice(-4);
      else myName = 'Гость-' + String(clientId).slice(-4);
    } catch (e) {}
    try {
      await M.db('local.open', { name: DB });
      var v = await M.db('local.get', { name: DB, key: KEY });
      if (Array.isArray(v)) {
        v.forEach(function (m) { addMsg(m); });
      }
    } catch (e) {}
    try {
      // subscribe
      M.net('on', 'message', function (p) { addMsg(p); });
    } catch (e) {
      try { if (M.net && M.net.on) M.net.on('message', function (p) { addMsg(p); }); } catch (e2) {}
    }
    onlineEl.textContent = 'онлайн';
    sendBtn.onclick = send;
    inp.onkeydown = function (e) { if (e.key === 'Enter') send(); };
  }
  if (window.MiniApp || window.MiniApps) boot();
  else {
    window.addEventListener('miniapp-ready', boot);
    window.addEventListener('miniapps-ready', boot);
  }
})();
