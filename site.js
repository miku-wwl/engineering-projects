(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (_) {}

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    try { localStorage.setItem('theme', theme); } catch (_) {}
  }

  setTheme(stored || 'dark');
  if (toggle) toggle.addEventListener('click', function () {
    setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });

  function updateClock() {
    var now = new Date();
    var time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.querySelectorAll('[data-live-status]').forEach(function (element) { element.textContent = 'online · ' + time.slice(0, 5); });
    document.querySelectorAll('[data-live-time]').forEach(function (element) { element.textContent = time; });
  }
  updateClock();
  window.setInterval(updateClock, 1000);

  var filterButtons = document.querySelectorAll('[data-filter]');
  var projectCards = document.querySelectorAll('[data-project-card]');
  var filterStatus = document.querySelector('[data-filter-status]');
  function applyFilter(filter) {
    projectCards.forEach(function (card) {
      var visible = filter === 'all' || card.getAttribute('data-status') === filter;
      card.classList.toggle('is-hidden', !visible);
      card.setAttribute('aria-hidden', visible ? 'false' : 'true');
    });
    filterButtons.forEach(function (button) { button.classList.toggle('is-active', button.getAttribute('data-filter') === filter); });
    if (filterStatus) filterStatus.textContent = filter;
  }
  filterButtons.forEach(function (button) { button.addEventListener('click', function () { applyFilter(button.getAttribute('data-filter')); }); });

  var probeButton = document.querySelector('[data-probe]');
  var probeOutput = document.querySelector('[data-probe-output]');
  var probeCount = 0;
  if (probeButton && probeOutput) probeButton.addEventListener('click', function () {
    probeCount += 1;
    probeOutput.textContent = 'probe ' + String(probeCount).padStart(2, '0') + ' · nominal';
  });
})();
