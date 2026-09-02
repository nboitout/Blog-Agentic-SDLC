(function () {
  var storageKey = 'academy-deck-theme';
  var controls = document.querySelector('.controls');
  var nextButton = document.getElementById('nextBtn');
  var themeButton = document.getElementById('themeBtn');

  if (!controls || !nextButton) return;

  if (!themeButton) {
    themeButton = document.createElement('button');
    themeButton.className = 'nav-btn theme-btn';
    themeButton.id = 'themeBtn';
    themeButton.type = 'button';
  }

  controls.insertBefore(themeButton, nextButton);

  function applyTheme(theme) {
    var dark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    themeButton.textContent = dark ? 'Light mode' : 'Dark mode';
    themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark-blue theme');
    themeButton.setAttribute('aria-pressed', String(dark));
    try { localStorage.setItem(storageKey, dark ? 'dark' : 'light'); } catch (error) {}
  }

  var initialTheme = 'light';
  try {
    initialTheme = localStorage.getItem(storageKey) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (error) {}

  applyTheme(initialTheme);

  themeButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }, true);
})();
