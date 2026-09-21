(function () {
  var storageKey = 'academy-deck-theme';
  var controls = document.querySelector('.controls');
  var nextButton = document.getElementById('nextBtn');
  var themeButton = document.getElementById('themeBtn');

  document.querySelectorAll('.diagram marker').forEach(function (marker) {
    var viewBox = marker.viewBox && marker.viewBox.baseVal;
    if (viewBox && viewBox.width) {
      marker.setAttribute('refX', String(viewBox.x + viewBox.width));
    }
  });

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

  // Keep the original navigation handlers, but dock their controls outside the
  // rotated reading surface on phones. Desktop restores the original position.
  var mobile = window.matchMedia('(max-width: 680px) and (orientation: portrait), (max-width: 1000px) and (max-height: 680px) and (orientation: landscape), (max-height: 680px) and (orientation: landscape) and (pointer: coarse)');
  var placeholder = document.createComment('deck navigation');
  controls.before(placeholder);
  var dock = document.createElement('nav');
  dock.className = 'deck-navigation-dock';
  dock.setAttribute('aria-label', 'Slide navigation');
  dock.hidden = true;
  document.body.appendChild(dock);

  var dots = Array.from(document.querySelectorAll('.dot-btn'));
  var originalControls = Array.from(controls.children);
  var selector = document.createElement('select');
  selector.className = 'deck-slide-selector';
  selector.setAttribute('aria-label', 'Choose slide');
  dots.forEach(function (_, index) {
    var option = document.createElement('option');
    option.value = String(index);
    option.textContent = 'Slide ' + (index + 1) + ' / ' + dots.length;
    selector.appendChild(option);
  });
  controls.appendChild(selector);
  selector.addEventListener('change', function () {
    var dot = dots[Number(selector.value)];
    if (dot) dot.click();
  });
  function syncSlide() {
    var index = dots.findIndex(function (dot) { return dot.classList.contains('is-current'); });
    if (index >= 0) selector.value = String(index);
  }
  var counter = document.getElementById('counter');
  if (counter) new MutationObserver(syncSlide).observe(counter, { childList: true, subtree: true, characterData: true });
  syncSlide();

  function sizeDock() {
    if (mobile.matches) document.documentElement.style.setProperty('--deck-nav-height', dock.getBoundingClientRect().height + 'px');
  }
  function placeControls() {
    dock.hidden = !mobile.matches;
    if (mobile.matches && controls.parentNode !== dock) {
      // Match keyboard order to the visible previous / selector / next / theme row.
      controls.append(document.getElementById('prevBtn'), selector, nextButton, themeButton);
      dock.appendChild(controls);
    }
    else if (!mobile.matches && controls.parentNode !== placeholder.parentNode) {
      originalControls.forEach(function (control) { controls.appendChild(control); });
      controls.appendChild(selector);
      placeholder.after(controls);
      document.documentElement.style.removeProperty('--deck-nav-height');
    }
    sizeDock();
  }
  new ResizeObserver(sizeDock).observe(dock);
  mobile.addEventListener('change', placeControls);
  window.addEventListener('resize', placeControls);
  placeControls();
})();
