/**
 * Dark Mode Toggle for kosalnith.github.io
 * Palette: bg #141413 | text #f7f6f3 | accent #8c1514
 *
 * The toggle button is injected into #dm-toggle-li — the last <li>
 * inside the main nav <ul>, sitting right after the Search button.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'knith-color-scheme';
  var DARK_CLASS  = 'dark-mode';

  function getPreference() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  var _cachedBtn = null;

  function applyTheme(scheme) {
    var isDark = scheme === 'dark';
    document.documentElement.classList.toggle(DARK_CLASS, isDark);
    localStorage.setItem(STORAGE_KEY, scheme);
    var btn = _cachedBtn || document.querySelector('[data-dm-toggle]');
    if (btn) {
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title',      isDark ? 'Switch to light mode' : 'Switch to dark mode');
      var sun  = btn.querySelector('.dm-sun');
      var moon = btn.querySelector('.dm-moon');
      if (sun)  sun.style.display  = isDark ? 'flex' : 'none';
      if (moon) moon.style.display = isDark ? 'none' : 'flex';
    }
  }

  function buildButton() {
    var btn = document.createElement('button');
    btn.setAttribute('data-dm-toggle', '');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Switch to dark mode');
    btn.setAttribute('title', 'Switch to dark mode');
    btn.className = 'dm-toggle';

    var moon = document.createElement('span');
    moon.className = 'dm-icon dm-moon';
    moon.setAttribute('aria-hidden', 'true');
    moon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    var sun = document.createElement('span');
    sun.className = 'dm-icon dm-sun';
    sun.setAttribute('aria-hidden', 'true');
    sun.style.display = 'none';
    sun.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

    btn.appendChild(moon);
    btn.appendChild(sun);

    btn.addEventListener('click', function () {
      var current = document.documentElement.classList.contains(DARK_CLASS) ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    _cachedBtn = btn;
    return btn;
  }

  function injectCSS() {
    var cssHref = 'static/css/darkmode.css';
    var scripts = document.querySelectorAll('script[src]');
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src.indexOf('darkmode.js') !== -1) {
        cssHref = scripts[i].src.replace('static/js/darkmode.js', 'static/css/darkmode.css');
        break;
      }
    }
    var link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = cssHref;
    document.head.appendChild(link);
  }

  function mountButton() {
    var btn = buildButton();

    // Primary: inject into the placeholder <li> we added to the HTML
    var li = document.getElementById('dm-toggle-li');
    if (li) {
      li.appendChild(btn);
      applyTheme(getPreference());
      reorderSearchLi();
      return;
    }

    // Fallback: create the <li> ourselves at end of nav
    var ul = document.querySelector(
      '#block-stanford-basic-main-navigation .su-multi-menu__menu-lv1, ' +
      '.su-multi-menu .su-multi-menu__menu-lv1'
    );
    if (ul) {
      var newLi = document.createElement('li');
      newLi.className = 'su-multi-menu__item dm-toggle-li';
      newLi.id = 'dm-toggle-li';
      newLi.appendChild(btn);
      ul.appendChild(newLi);
      applyTheme(getPreference());
      reorderSearchLi();
      return;
    }

    // Last resort
    var section = document.querySelector('.su-masthead > section');
    if (section) section.appendChild(btn);
    applyTheme(getPreference());
  }

  /* ── Move search <li> to the first position in the nav ul ─────── */
  function reorderSearchLi() {
    var ul = document.querySelector(
      '#block-stanford-basic-main-navigation .su-multi-menu__menu-lv1, ' +
      '.su-multi-menu .su-multi-menu__menu-lv1'
    );
    if (!ul) return;

    function tryMove() {
      var searchLi = ul.querySelector(
        'li.su-mobile-site-search, ' +
        'li:has(.su-site-search), ' +
        'li:has(.search-block-form), ' +
        'li:has(input[type="search"]), ' +
        'li:has([placeholder])'
      );
      if (searchLi) {
        searchLi.classList.add('dm-search-li');
        ul.insertBefore(searchLi, ul.firstChild);
        return true;
      }
      return false;
    }

    // Try immediately in case search li is already present
    if (tryMove()) return;

    // Otherwise observe the nav ul for child additions — zero polling cost
    var observer = new MutationObserver(function () {
      if (tryMove()) observer.disconnect();
    });
    observer.observe(ul, { childList: true, subtree: false });

    // Safety disconnect after 5s to avoid orphaned observers
    setTimeout(function () { observer.disconnect(); }, 5000);
  }

  // Apply theme immediately to avoid flash of wrong mode
  (function () {
    if (getPreference() === 'dark') {
      document.documentElement.classList.add(DARK_CLASS);
    }
  })();

  injectCSS();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountButton);
  } else {
    mountButton();
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

}());
