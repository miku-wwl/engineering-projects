(function () {
	var root = document.documentElement;
	var toggle = document.querySelector('[data-theme-toggle]');
	var stored = null;
	try { stored = localStorage.getItem('theme'); } catch (_) {}
	var preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

	function setTheme(theme) {
		root.setAttribute('data-theme', theme);
		if (toggle) toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
		try { localStorage.setItem('theme', theme); } catch (_) {}
	}

	setTheme(stored || preferred);
	if (toggle) toggle.addEventListener('click', function () {
		setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
	});

	var live = document.querySelector('[data-live-status]');
	if (live) {
		live.textContent = 'online · ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}
})();
