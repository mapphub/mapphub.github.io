(function () {
  var slides = ['Слайд 1', 'Слайд 2', 'Слайд 3', 'Конец'];
  var i = 0;
  var el = document.getElementById('slide');
  function api() { return window.MiniApp || window.MiniApps; }
  function show(n, broadcast) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    el.textContent = slides[i];
    if (broadcast) {
      try { api().net('send', { type: 'slide', index: i }); } catch (e) {}
    }
  }
  function boot() {
    var M = api();
    if (!M) return;
    try { M.shell('setChrome', { title: 'Презентация', topBar: true, bottomBar: false }); } catch (e) {}
    try {
      M.net('on', 'slide', function (p) {
        if (p && typeof p.index === 'number') show(p.index, false);
      });
    } catch (e) {}
    document.getElementById('prev').onclick = function () { show(i - 1, true); };
    document.getElementById('next').onclick = function () { show(i + 1, true); };
    show(0, false);
  }
  if (window.MiniApp || window.MiniApps) boot();
  else {
    window.addEventListener('miniapp-ready', boot);
    window.addEventListener('miniapps-ready', boot);
  }
})();
