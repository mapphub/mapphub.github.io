(function () {
  var list = document.getElementById('apps');
  var err = document.getElementById('err');
  function api() { return window.MiniApp || window.MiniApps; }

  async function load() {
    err.textContent = '';
    var M = api();
    if (!M) { err.textContent = 'MiniApp недоступен'; return; }
    try {
      var res = await M.apps('list', {});
      var apps = (res && res.apps) || res || [];
      if (!Array.isArray(apps)) apps = [];
      list.innerHTML = '';
      if (!apps.length) {
        list.innerHTML = '<li>Нет приложений</li>';
        return;
      }
      apps.forEach(function (a) {
        var li = document.createElement('li');
        var id = a.id || a.appId;
        li.innerHTML = '<span>' + (a.name || id) + ' <small style="opacity:.6">' + id + '</small></span>';
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'Открыть';
        btn.onclick = function () {
          M.hub('open', { appId: id }).catch(function (e) {
            err.textContent = e.message || e;
          });
        };
        li.appendChild(btn);
        list.appendChild(li);
      });
    } catch (e) {
      err.textContent = e.message || e;
    }
  }

  async function create() {
    var name = prompt('Название приложения');
    if (!name) return;
    var M = api();
    try {
      await M.apps('create', { name: name });
      await load();
    } catch (e) {
      err.textContent = e.message || e;
    }
  }

  function boot() {
    var M = api();
    if (!M) { err.textContent = 'MiniApp недоступен'; return; }
    try { M.shell('setChrome', { title: 'Редактор', topBar: true, bottomBar: false }); } catch (e) {}
    document.getElementById('btn-new').onclick = create;
    load();
  }
  if (window.MiniApp || window.MiniApps) boot();
  else {
    window.addEventListener('miniapp-ready', boot);
    window.addEventListener('miniapps-ready', boot);
  }
})();
