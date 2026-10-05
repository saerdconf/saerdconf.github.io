(function () {
  var PAGES = [
    { url: 'index.html',         label: 'Home' },
    { url: 'bio.html',           label: 'Bio' },
    { url: 'research.html',      label: 'Research' },
    { url: 'press.html',         label: 'Press' },
    { url: 'teaching.html',      label: 'Teaching' },
    { url: 'miscellaneous.html', label: 'Miscellaneous' },
    { url: 'personal.html',      label: 'Personal' },
    { url: 'events.html',        label: 'Events' },
    { url: 'explore.html',       label: 'Explore' },
    { url: 'food.html',          label: 'Food' },
    { url: 'foot.html',          label: 'Foot' },
    { url: 'friends.html',       label: 'Friends' },
    { url: 'pastevents.html',    label: 'Past Events' },
    { url: 'trees.html',         label: 'Trees' },
    { url: 'updates.html',       label: 'Updates' },
    { url: 'work.html',          label: 'Work' },
  ];

  var INDEX = [], loaded = false, loading = false, activeIdx = -1;

  /* ── CSS — all !important to override site styles ── */
  var styleEl = document.createElement('style');
  styleEl.textContent = `
    /* NAV BUTTON — plain link style matching other nav items */
    #site-search-btn {
      display: inline-flex !important;
      align-items: center !important;
      gap: 6px !important;
      background: transparent !important;
      border: none !important;
      border-radius: 0 !important;
      padding: 0 0 0.8em 0 !important;
      cursor: pointer !important;
      color: #b1040e !important;
      font-size: 1.9rem !important;
      font-weight: 600 !important;
      line-height: 1 !important;
      white-space: nowrap !important;
      transition: color .3s ease-out !important;
      font-family: inherit !important;
      text-decoration: none !important;
      box-shadow: none !important;
      letter-spacing: 0 !important;
      position: relative !important;
    }
    #site-search-btn:hover {
      background: transparent !important;
      border: none !important;
      color: #2e2d29 !important;
      text-decoration: underline !important;
    }
    #site-search-btn span {
      font-size: 1.9rem !important;
      color: inherit !important;
      font-weight: 600 !important;
    }
    #site-search-btn svg {
      width: 16px !important;
      height: 16px !important;
      color: inherit !important;
      opacity: 0.75 !important;
      flex-shrink: 0 !important;
    }

    /* Desktop: center search button vertically in the nav row */
    @media (min-width: 992px) {
      .su-multi-menu__menu-lv1 > li:has(#site-search-btn) {
        display: flex !important;
        align-items: center !important;
        align-self: center !important;
      }
      #site-search-btn {
        padding: 0 !important;
        align-self: center !important;
      }
    }

    /* Dark mode */
    html.dark-mode #site-search-btn {
      color: #fff !important;
    }
    html.dark-mode #site-search-btn:hover {
      color: #fff !important;
      background: transparent !important;
    }
    html.dark-mode #site-search-btn svg {
      color: #fff !important;
    }

    /* Mobile/tablet: match the dark nav panel link style exactly */
    @media (max-width: 991px) {
      #site-search-btn {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 1.6rem 0 1.6rem 2.4rem !important;
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid #53565a !important;
        border-radius: 0 !important;
        color: #fff !important;
        font-size: 1.8rem !important;
        font-weight: 600 !important;
        font-family: inherit !important;
        text-align: left !important;
        justify-content: flex-start !important;
        box-shadow: none !important;
        cursor: pointer !important;
        white-space: nowrap !important;
        letter-spacing: 0 !important;
        line-height: 1.4 !important;
        transition: none !important;
        text-decoration: none !important;
      }
      #site-search-btn:hover,
      #site-search-btn:focus {
        background: transparent !important;
        text-decoration: none !important;
        outline: none !important;
      }
      #site-search-btn span {
        color: #fff !important;
        font-size: 1.8rem !important;
        font-weight: 600 !important;
      }
      #site-search-btn svg {
        color: #fff !important;
        opacity: 1 !important;
        width: 18px !important;
        height: 18px !important;
        flex-shrink: 0 !important;
      }
    }

    /* OVERLAY */
    #ss-overlay {
      display: none !important;
      position: fixed !important;
      inset: 0 !important;
      background: rgba(0,0,0,0.42) !important;
      backdrop-filter: blur(7px) !important;
      -webkit-backdrop-filter: blur(7px) !important;
      z-index: 99998 !important;
    }
    #ss-overlay.open { display: block !important; animation: ssOvIn .15s ease !important; }
    @keyframes ssOvIn { from { opacity:0 } to { opacity:1 } }

    /* MODAL */
    #ss-modal {
      display: none !important;
      position: fixed !important;
      top: clamp(50px, 7vh, 100px) !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      width: min(820px, 94vw) !important;
      background: #ffffff !important;
      border-radius: 24px !important;
      box-shadow: 0 48px 120px rgba(0,0,0,.28), 0 4px 24px rgba(0,0,0,.1) !important;
      z-index: 99999 !important;
      overflow: hidden !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    #ss-modal.open {
      display: block !important;
      animation: ssMdIn .22s cubic-bezier(.34,1.3,.64,1) !important;
    }
    @keyframes ssMdIn {
      from { opacity:0; transform: translateX(-50%) translateY(-22px) scale(.95); }
      to   { opacity:1; transform: translateX(-50%) translateY(0) scale(1); }
    }

    /* ── Dark mode modal overrides ── */
    html.dark-mode #ss-overlay {
      background: rgba(0,0,0,0.65) !important;
    }
    html.dark-mode #ss-modal {
      background: #1e1e1c !important;
      box-shadow: 0 48px 120px rgba(0,0,0,.6), 0 4px 24px rgba(0,0,0,.4) !important;
    }
    html.dark-mode #ss-input-row {
      background: #1e1e1c !important;
      border-bottom-color: #3a3836 !important;
    }
    html.dark-mode #ss-search-icon {
      color: #c0392b !important;
    }
    html.dark-mode #ss-input {
      color: #f7f6f3 !important;
      background: transparent !important;
      caret-color: #c0392b !important;
    }
    html.dark-mode #ss-input::placeholder {
      color: #666 !important;
    }
    html.dark-mode #ss-clear-btn {
      background: #333 !important;
      color: #aaa !important;
    }
    html.dark-mode #ss-clear-btn:hover {
      background: #444 !important;
      color: #f7f6f3 !important;
    }
    html.dark-mode #ss-esc-hint {
      color: #c0392b !important;
      border-color: rgba(192,57,43,0.4) !important;
      background: rgba(192,57,43,0.08) !important;
    }
    html.dark-mode #ss-results {
      background: #1e1e1c !important;
    }
    html.dark-mode #ss-results::-webkit-scrollbar-thumb {
      background: #444 !important;
    }
    html.dark-mode .ss-status {
      color: #666 !important;
    }
    html.dark-mode .ss-status strong {
      color: #aaa !important;
    }
    html.dark-mode .ss-page-label {
      color: #c0392b !important;
    }
    html.dark-mode .ss-page-label::after {
      background: #3a3836 !important;
    }
    html.dark-mode .ss-item {
      color: #f7f6f3 !important;
    }
    html.dark-mode .ss-item:hover,
    html.dark-mode .ss-item.ss-active {
      background: #2a2a28 !important;
    }
    html.dark-mode .ss-item-icon {
      background: #2a2a28 !important;
    }
    html.dark-mode .ss-item-title {
      color: #f7f6f3 !important;
    }
    html.dark-mode .ss-item-snippet {
      color: #888 !important;
    }
    html.dark-mode mark.ss-hl {
      background: #5a3a1a !important;
      color: #f7c59f !important;
    }
    html.dark-mode #ss-footer {
      background: #1e1e1c !important;
      border-top-color: #3a3836 !important;
    }
    html.dark-mode .ss-hints {
      background: transparent !important;
    }
    html.dark-mode .ss-hint {
      color: #666 !important;
    }
    html.dark-mode kbd {
      background: rgba(192,57,43,0.1) !important;
      color: #c0392b !important;
      border-color: rgba(192,57,43,0.3) !important;
    }

    /* INPUT ROW */
    #ss-input-row {
      display: flex !important;
      align-items: center !important;
      gap: 16px !important;
      padding: 22px 26px !important;
      border-bottom: 2px solid #f0f0f0 !important;
      background: #fff !important;
    }
    #ss-search-icon {
      flex-shrink: 0 !important;
      color: #8c1515 !important;
      opacity: 0.6 !important;
      display: flex !important;
      align-items: center !important;
    }
    #ss-input {
      flex: 1 !important;
      border: none !important;
      outline: none !important;
      font-size: 22px !important;
      font-weight: 400 !important;
      color: #111 !important;
      background: transparent !important;
      caret-color: #8c1515 !important;
      font-family: inherit !important;
      box-shadow: none !important;
      padding: 0 !important;
      margin: 0 !important;
      border-radius: 0 !important;
      line-height: 1.3 !important;
      width: auto !important;
      height: auto !important;
    }
    #ss-input::placeholder { color: #ccc !important; font-size: 22px !important; }
    #ss-input::-webkit-search-cancel-button { display: none !important; }

    #ss-clear-btn {
      background: #eee !important;
      border: none !important;
      border-radius: 8px !important;
      width: 36px !important;
      height: 36px !important;
      min-width: 36px !important;
      cursor: pointer !important;
      color: #888 !important;
      font-size: 16px !important;
      display: none !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0 !important;
      transition: background .12s !important;
      padding: 0 !important;
      line-height: 1 !important;
    }
    #ss-clear-btn:hover { background: #ddd !important; color: #333 !important; }
    #ss-clear-btn.visible { display: flex !important; }

    #ss-esc-hint {
      font-size: 13px !important;
      color: #b1040e !important;
      border: 1.5px solid rgba(177,4,14,0.35) !important;
      border-radius: 8px !important;
      padding: 6px 14px !important;
      flex-shrink: 0 !important;
      background: rgba(177,4,14,0.05) !important;
      font-family: inherit !important;
      font-weight: 600 !important;
      white-space: nowrap !important;
      line-height: 1 !important;
      letter-spacing: .04em !important;
      text-transform: uppercase !important;
      cursor: pointer !important;
    }

    /* RESULTS */
    #ss-results {
      max-height: 520px !important;
      overflow-y: auto !important;
      padding: 10px 0 14px !important;
      background: #fff !important;
    }
    #ss-results::-webkit-scrollbar { width: 5px !important; }
    #ss-results::-webkit-scrollbar-thumb { background: #e5e5e5 !important; border-radius: 4px !important; }

    /* STATUS */
    .ss-status {
      padding: 44px 30px !important;
      text-align: center !important;
      color: #ccc !important;
      font-size: 18px !important;
      line-height: 1.7 !important;
      font-family: inherit !important;
    }
    .ss-status strong { color: #888 !important; font-size: 20px !important; font-weight: 600 !important; }
    .ss-no-icon { display: block !important; margin: 0 auto 18px !important; color: #ddd !important; }

    /* PAGE LABELS */
    .ss-page-group { margin-top: 10px !important; }
    .ss-page-label {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      padding: 10px 26px 6px !important;
      font-size: 13px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: .1em !important;
      color: #a03030 !important;
      font-family: inherit !important;
    }
    .ss-page-label::after {
      content: "" !important;
      flex: 1 !important;
      height: 1px !important;
      background: #f5eaea !important;
    }

    /* RESULT ITEMS */
    .ss-item {
      display: flex !important;
      align-items: center !important;
      gap: 16px !important;
      padding: 16px 20px !important;
      margin: 3px 10px !important;
      border-radius: 14px !important;
      text-decoration: none !important;
      color: #1a1a1a !important;
      transition: background .1s !important;
      cursor: pointer !important;
      border: none !important;
      box-shadow: none !important;
    }
    .ss-item:hover, .ss-item.ss-active { background: #fdf3f3 !important; }

    .ss-item-icon {
      flex-shrink: 0 !important;
      width: 46px !important;
      height: 46px !important;
      min-width: 46px !important;
      background: #f9eeee !important;
      border-radius: 12px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    .ss-item-icon svg { color: #8c1515 !important; opacity: 0.55 !important; }

    .ss-item-body { flex: 1 !important; min-width: 0 !important; }

    .ss-item-title {
      font-size: 18px !important;
      font-weight: 600 !important;
      color: #1a1a1a !important;
      line-height: 1.35 !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      display: block !important;
      font-family: inherit !important;
    }
    .ss-item-snippet {
      font-size: 15px !important;
      color: #888 !important;
      margin-top: 5px !important;
      line-height: 1.55 !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      display: block !important;
      font-family: inherit !important;
    }

    .ss-chevron { color: #ddd !important; flex-shrink: 0 !important; transition: color .1s !important; }
    .ss-item:hover .ss-chevron, .ss-item.ss-active .ss-chevron { color: #b04040 !important; }

    mark.ss-hl {
      background: #fff176 !important;
      color: inherit !important;
      padding: 0 2px !important;
      border-radius: 3px !important;
      font-weight: 700 !important;
    }

    /* FOOTER */
    #ss-footer {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding: 13px 26px 15px !important;
      border-top: 2px solid #f5f5f5 !important;
      background: #fafafa !important;
    }
    #ss-count {
      font-size: 17px !important;
      color: #bbb !important;
      font-style: italic !important;
      font-family: inherit !important;
    }
    .ss-hints { display: flex !important; gap: 22px !important; }
    .ss-hint {
      font-size: 18px !important;
      color: #aaa !important;
      display: flex !important;
      align-items: center !important;
      gap: 5px !important;
      font-family: inherit !important;
    }
    .ss-hint kbd {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      background: rgba(177,4,14,0.05) !important;
      border: 1.5px solid rgba(177,4,14,0.2) !important;
      border-radius: 6px !important;
      min-width: 30px !important;
      height: 30px !important;
      padding: 0 10px !important;
      font-size: 15px !important;
      font-family: inherit !important;
      color: #b1040e !important;
      font-weight: 600 !important;
    }
  `;
  document.head.appendChild(styleEl);

  /* ── SVGs ── */
  function icoSearch(sz, sw) {
    return `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw||2}" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
  }
  function icoFile() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
  }
  function icoChevron() {
    return `<svg class="ss-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
  }
  function icoEmpty() {
    return `<svg class="ss-no-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`;
  }

  /* ── Build widget ── */
  function buildWidget() {
    var ul = document.querySelector('.su-multi-menu__menu-lv1');
    if (!ul) return;

    var li = document.createElement('li');
    li.className = 'su-multi-menu__item';
    li.style.cssText = 'display:flex!important;align-items:center!important;margin-left:4px!important;';
    li.innerHTML = `<button id="site-search-btn" title="Search (Ctrl+K)" aria-label="Search">${icoSearch(17, 2.5)}<span>Search</span></button>`;
    var dmLi = document.getElementById('dm-toggle-li');
    if (dmLi) {
      ul.insertBefore(li, dmLi);
    } else {
      ul.appendChild(li);
    }

    var overlay = document.createElement('div');
    overlay.id = 'ss-overlay';
    document.body.appendChild(overlay);

    var modal = document.createElement('div');
    modal.id = 'ss-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div id="ss-input-row">
        <span id="ss-search-icon">${icoSearch(28, 2.2)}</span>
        <input id="ss-input" type="search" placeholder="Search across all pages…" autocomplete="off" spellcheck="false" />
        <button id="ss-clear-btn" title="Clear">✕</button>
        <span id="ss-esc-hint">esc</span>
      </div>
      <div id="ss-results"><div class="ss-status">Start typing to search…</div></div>
      <div id="ss-footer">
        <span id="ss-count"></span>
        <div class="ss-hints">
          <span class="ss-hint"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span class="ss-hint"><kbd>⏎</kbd> open</span>
        </div>
      </div>`;
    document.body.appendChild(modal);

    var btn      = document.getElementById('site-search-btn');
    var input    = document.getElementById('ss-input');
    var clearBtn = document.getElementById('ss-clear-btn');
    var results  = document.getElementById('ss-results');
    var countEl  = document.getElementById('ss-count');

    function openSearch() {
      overlay.classList.add('open');
      modal.classList.add('open');
      setTimeout(function () { input.focus(); }, 50);
      if (!loaded && !loading) buildIndex();
    }
    function closeSearch() {
      overlay.classList.remove('open');
      modal.classList.remove('open');
      input.value = '';
      clearBtn.classList.remove('visible');
      results.innerHTML = '<div class="ss-status">Start typing to search…</div>';
      countEl.textContent = '';
      activeIdx = -1;
    }

    btn.addEventListener('click', openSearch);
    overlay.addEventListener('click', closeSearch);
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
      if (e.key === 'Escape' && modal.classList.contains('open')) closeSearch();
      if (modal.classList.contains('open')) handleArrows(e);
    });
    input.addEventListener('input', function () {
      var q = input.value.trim();
      clearBtn.classList.toggle('visible', q.length > 0);
      activeIdx = -1;
      if (q.length < 2) { results.innerHTML = '<div class="ss-status">Start typing to search…</div>'; countEl.textContent = ''; return; }
      if (!loaded) { results.innerHTML = '<div class="ss-status">Indexing… please wait</div>'; return; }
      renderResults(q);
    });
    clearBtn.addEventListener('click', function () {
      input.value = ''; clearBtn.classList.remove('visible');
      results.innerHTML = '<div class="ss-status">Start typing to search…</div>';
      countEl.textContent = ''; activeIdx = -1; input.focus();
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var a = results.querySelector('.ss-active');
        if (a && a.href) window.location.href = a.href;
      }
    });
  }

  function handleArrows(e) {
    var items = document.querySelectorAll('#ss-results .ss-item');
    if (!items.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(activeIdx + 1, items.length - 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); }
    else return;
    items.forEach(function (el, i) { el.classList.toggle('ss-active', i === activeIdx); });
    items[activeIdx].scrollIntoView({ block: 'nearest' });
  }

  /* ── Index ── */
  function buildIndex() {
    loading = true;
    var rem = PAGES.length;
    PAGES.forEach(function (page) {
      fetch(page.url)
        .then(function (r) { return r.ok ? r.text() : ''; })
        .then(function (html) { if (html) parsePageIntoIndex(html, page); })
        .catch(function () {})
        .finally(function () {
          if (--rem === 0) {
            loaded = true; loading = false;
            var q = document.getElementById('ss-input').value.trim();
            if (q.length >= 2) renderResults(q);
            else document.getElementById('ss-results').innerHTML =
              '<div class="ss-status">Ready — searching ' + PAGES.length + ' pages</div>';
          }
        });
    });
  }

  function parsePageIntoIndex(html, page) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    ['nav', 'header', 'footer', 'script', 'style', 'noscript'].forEach(function (t) {
      doc.querySelectorAll(t).forEach(function (el) { el.remove(); });
    });
    var main = doc.querySelector('main') || doc.querySelector('.page-content') || doc.body;
    var curH = page.label;
    main.querySelectorAll('h1,h2,h3,h4,p,li,.cv-row,td').forEach(function (node) {
      var tag  = node.tagName.toLowerCase();
      var text = node.textContent.replace(/\s+/g, ' ').trim();
      if (!text || text.length < 4) return;
      if (/^h[1-4]$/.test(tag)) {
        curH = text;
        INDEX.push({ url: page.url, pageLabel: page.label, heading: text, text: text, isHeading: true });
      } else if (node.children.length === 0 || tag === 'p' || tag === 'li' || node.classList.contains('cv-row')) {
        INDEX.push({ url: page.url, pageLabel: page.label, heading: curH, text: text, isHeading: false });
      }
    });
  }

  /* ── Scroll-to on arrival ── */
  function handleArrival() {
    var q = new URLSearchParams(window.location.search).get('ss');
    if (!q) return;
    var re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    var main = document.querySelector('main') || document.body;
    var walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, null, false);
    var firstEl = null, node;
    while ((node = walker.nextNode())) {
      var el = node.parentElement;
      if (!el || ['SCRIPT', 'STYLE', 'NAV', 'HEADER'].includes(el.tagName)) continue;
      re.lastIndex = 0;
      if (!re.test(node.textContent)) continue;
      re.lastIndex = 0;
      if (!firstEl) firstEl = el;
      var frag = document.createDocumentFragment();
      var txt = node.textContent, last = 0, m;
      while ((m = re.exec(txt)) !== null) {
        frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
        var mark = document.createElement('mark');
        mark.style.cssText = 'background:#fff176;padding:0 2px;border-radius:3px;font-weight:700;';
        mark.textContent = m[0];
        frag.appendChild(mark);
        last = m.index + m[0].length;
      }
      frag.appendChild(document.createTextNode(txt.slice(last)));
      node.parentNode.replaceChild(frag, node);
      re.lastIndex = 0;
    }
    if (firstEl) {
      setTimeout(function () {
        firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstEl.style.outline = '2px solid rgba(140,21,21,0.4)';
        firstEl.style.outlineOffset = '5px';
        firstEl.style.borderRadius = '4px';
        setTimeout(function () { firstEl.style.outline = ''; firstEl.style.outlineOffset = ''; }, 3000);
      }, 300);
    }
  }

  /* ── Render ── */
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function hl(text, q) {
    return text.replace(new RegExp(escRe(q), 'gi'), function (m) { return '<mark class="ss-hl">' + m + '</mark>'; });
  }

  function renderResults(q) {
    var results = document.getElementById('ss-results');
    var countEl = document.getElementById('ss-count');
    var hits = INDEX.filter(function (item) { return new RegExp(escRe(q), 'i').test(item.text); });

    if (!hits.length) {
      countEl.textContent = '';
      results.innerHTML = '<div class="ss-status">' + icoEmpty() + 'No results for <strong>"' + q + '"</strong><br><span style="font-size:16px;color:#ccc;">Try a different keyword</span></div>';
      return;
    }

    var seen = new Set();
    hits = hits.filter(function (item) {
      var k = item.url + '|' + item.text.slice(0, 80);
      if (seen.has(k)) return false; seen.add(k); return true;
    });

    var groups = {}, order = [];
    hits.forEach(function (item) {
      if (!groups[item.pageLabel]) { groups[item.pageLabel] = []; order.push(item.pageLabel); }
      groups[item.pageLabel].push(item);
    });

    var html = '', shown = 0;
    order.forEach(function (label) {
      var items = groups[label].slice(0, 6); shown += items.length;
      html += '<div class="ss-page-group"><div class="ss-page-label">' + label + '</div>';
      items.forEach(function (item) {
        var dest = item.url + '?ss=' + encodeURIComponent(q);
        var title   = hl(item.heading, q);
        var snippet = item.isHeading ? '' : '<div class="ss-item-snippet">' + hl(item.text.slice(0, 150), q) + '</div>';
        html += '<a class="ss-item" href="' + dest + '"><div class="ss-item-icon">' + icoFile() + '</div><div class="ss-item-body"><div class="ss-item-title">' + title + '</div>' + snippet + '</div>' + icoChevron() + '</a>';
      });
      html += '</div>';
    });

    var extra = hits.length - shown;
    if (extra > 0) html += '<div class="ss-status" style="padding:14px 26px!important;font-size:15px!important;text-align:left!important;color:#bbb!important;">+' + extra + ' more result' + (extra > 1 ? 's' : '') + '</div>';

    countEl.textContent = hits.length + ' result' + (hits.length !== 1 ? 's' : '');
    results.innerHTML = html;
  }

  /* ── Init ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { buildWidget(); handleArrival(); });
  } else {
    buildWidget(); handleArrival();
  }
})();
