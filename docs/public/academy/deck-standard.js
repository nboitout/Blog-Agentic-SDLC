(function () {
  var storageKey = 'academy-deck-theme';
  var controls = document.querySelector('.controls');
  var nextButton = document.getElementById('nextBtn');
  var themeButton = document.getElementById('themeBtn');
  // Decks opt in by loading their authored translations before this script.
  var locales = window.academyDeckLocales;
  var language = 'en';
  var languageKey = 'academy-deck-language';
  var preferences;
  var languagePicker;
  var englishTitle = document.title;
  var translations = [];
  var labels = {
    en: {
      light: 'Light mode', dark: 'Dark mode',
      toLight: 'Switch to light theme', toDark: 'Switch to dark-blue theme',
      navigation: 'Slide navigation', choose: 'Choose slide', slide: 'Slide',
      previous: 'Previous slide', next: 'Next slide', language: 'Slide language',
      goTo: function (index, total) { return 'Go to slide ' + index + ' of ' + total; }
    },
    fr: {
      light: 'Mode clair', dark: 'Mode sombre',
      toLight: 'Passer au mode clair', toDark: 'Passer au mode sombre',
      navigation: 'Navigation des diapositives', choose: 'Choisir une diapositive', slide: 'Diapo',
      previous: 'Diapositive précédente', next: 'Diapositive suivante', language: 'Langue des diapositives',
      goTo: function (index, total) { return 'Aller à la diapositive ' + index + ' sur ' + total; }
    }
  };

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

  function labelTheme() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeButton.textContent = dark ? labels[language].light : labels[language].dark;
    themeButton.setAttribute('aria-label', dark ? labels[language].toLight : labels[language].toDark);
    themeButton.setAttribute('aria-pressed', String(dark));
  }

  function applyTheme(theme) {
    var dark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    labelTheme();
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

  if (locales && locales.fr) {
    document.querySelectorAll('[data-i18n], [data-i18n-aria]').forEach(function (element) {
      var attribute = element.hasAttribute('data-i18n-aria') ? 'aria-label' : null;
      translations.push({
        element: element,
        attribute: attribute,
        key: element.getAttribute(attribute ? 'data-i18n-aria' : 'data-i18n'),
        english: attribute ? element.getAttribute(attribute) : element.innerHTML
      });
    });
    controls.classList.add('has-languages');
    preferences = document.createElement('div');
    preferences.className = 'deck-preferences';
    controls.insertBefore(preferences, themeButton);
    preferences.appendChild(themeButton);
    languagePicker = document.createElement('div');
    languagePicker.className = 'deck-language-picker';
    languagePicker.setAttribute('role', 'group');
    ['en', 'fr'].forEach(function (code) {
      var button = document.createElement('button');
      button.type = 'button';
      button.lang = code;
      button.textContent = code.toUpperCase();
      button.setAttribute('aria-label', code === 'en' ? 'English' : 'Français');
      button.dataset.language = code;
      button.addEventListener('click', function () { applyLanguage(code, true); });
      languagePicker.appendChild(button);
    });
    preferences.appendChild(languagePicker);
  }

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
      controls.append(document.getElementById('prevBtn'), selector, nextButton, preferences || themeButton);
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

  function applyLanguage(code, updateUrl) {
    language = code === 'fr' ? 'fr' : 'en';
    var locale = language === 'en' ? null : locales[language];
    translations.forEach(function (entry) {
      var value = locale && locale.content[entry.key];
      if (typeof value !== 'string') value = entry.english;
      if (entry.attribute) entry.element.setAttribute(entry.attribute, value);
      // Only static translations from this repository are inserted as markup.
      else entry.element.innerHTML = value;
    });
    document.documentElement.lang = language;
    document.title = locale ? locale.title : englishTitle;
    var ui = labels[language];
    languagePicker.setAttribute('aria-label', ui.language);
    languagePicker.querySelectorAll('button').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    dock.setAttribute('aria-label', ui.navigation);
    selector.setAttribute('aria-label', ui.choose);
    dots.forEach(function (dot, index) {
      dot.setAttribute('aria-label', ui.goTo(index + 1, dots.length));
      selector.options[index].textContent = ui.slide + ' ' + (index + 1) + ' / ' + dots.length;
    });
    ['prevBtn', 'edgeLeft'].forEach(function (id) {
      var button = document.getElementById(id);
      if (button) button.setAttribute('aria-label', ui.previous);
    });
    ['nextBtn', 'edgeRight'].forEach(function (id) {
      var button = document.getElementById(id);
      if (button) button.setAttribute('aria-label', ui.next);
    });
    labelTheme();
    sizeDock();
    try { localStorage.setItem(languageKey, language); } catch (error) {}
    if (updateUrl) {
      var url = new URL(window.location.href);
      url.searchParams.set('lang', language);
      window.history.replaceState(null, '', url);
    }
  }

  if (languagePicker) {
    var savedLanguage;
    try { savedLanguage = localStorage.getItem(languageKey); } catch (error) {}
    var requestedLanguage = new URLSearchParams(window.location.search).get('lang');
    // An explicit link wins over the saved preference; unsupported values use English.
    applyLanguage(requestedLanguage || savedLanguage || 'en', false);
  }
})();
