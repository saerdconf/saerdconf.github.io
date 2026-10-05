/**
 * components.js — Shared site components for kosalnith.github.io
 *
 * HOW TO USE ON EACH PAGE:
 *   1. Add <div id="site-header"></div> where your <header> used to be.
 *   2. Add <div id="site-footer"></div> where your <footer> (+ pre-footer) used to be.
 *   3. Remove the old back-to-top <button> and its inline <script> block.
 *   4. Add script tags at the bottom of <body> in this exact order:
 *        <script src="static/js/components.js"></script>   ← MUST be first
 *        <script src="static/js/darkmode.js"></script>
 *        <script src="static/js/search.js"></script>
 *
 * TO UPDATE header/footer/back-to-top across ALL pages:
 *   Edit this file only — every page picks up the change automatically.
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     1. CONFIGURATION
     Edit nav items, social links, footer links here.
  ───────────────────────────────────────────── */

  const SITE_URL = 'https://saerdconf.github.io';

  // ═══════════════════════════════════════════════════════════════
  // CASE 1 — Pages WITH their own nav item
  // Add the page here and it appears in the top navigation bar.
  // The nav item is highlighted automatically when on that page.
  //
  // Example: adding 'gallery.html' as a new top-level nav item:
  //   { label: 'Gallery', href: 'gallery.html' },
  // ═══════════════════════════════════════════════════════════════
  const NAV_ITEMS = [
    { label: 'Home',              href: 'https://saerdconf.github.io/', external: true },
    { label: 'Previous Editions', href: 'https://saerdconf.github.io/previous-editions.html', external: true },
    { label: 'About Us',          href: 'https://saerdconf.github.io/about.html', external: true },
    { label: 'Contact',           href: 'https://saerdconf.github.io/contact.html', external: true },
  ];

  // ═══════════════════════════════════════════════════════════════
  // CASE 2 — Pages WITHOUT their own nav item (sub-pages)
  // Add the page here so its parent nav item gets highlighted.
  //
  // Format:  'your-page.html' : 'parent-nav-item.html',
  //
  // Example: 'vietnam.html' lives under Personal, so:
  //   'vietnam.html': 'personal.html',
  //
  // The value (right side) MUST match an href in NAV_ITEMS above.
  // ═══════════════════════════════════════════════════════════════
  const PAGE_PARENTS = {
    // ── Personal sub-pages ──────────────────────────
    'work.html':      'personal.html',
    'explore.html':   'personal.html',
    'travelmap.html': 'personal.html',
    'friends.html':   'personal.html',
    'foot.html':      'personal.html',
    'trees.html':     'personal.html',
    'food.html':      'personal.html',
    'vietnam.html':   'personal.html',

    // ── Research sub-pages ───────────────────────────
    // 'new-paper.html':  'research.html',

    // ── Activity sub-pages ───────────────────────────
    // 'conference.html': 'activity.html',
  };

  const SOCIAL_LINKS = [
    { title: 'Google Scholar', href: 'https://scholar.google.com/citations?user=LG2mrO4AAAAJ&hl=en', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="vertical-align:-0.125em"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>' },
    { title: 'ORCiD',          href: 'https://orcid.org/0000-0002-6976-4733',                         svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="vertical-align:-0.125em"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/></svg>' },
    { title: 'ResearchGate',   href: 'https://www.researchgate.net/profile/Kosal-Nith',               svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="vertical-align:-0.125em"><path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z"/></svg>' },
    { title: 'GitHub',         href: 'https://github.com/kosalnith',                                  icon: 'fa fa-github' },
    { title: 'Twitter / X',    href: 'https://twitter.com/kosalnith',                                 icon: 'fa-brands fa-x-twitter' },
    { title: 'Instagram',      href: 'https://www.instagram.com/kosalnith',                           icon: 'fa fa-instagram' },
    { title: 'Facebook',       href: 'https://www.facebook.com/kosalnith26',                          icon: 'fa fa-facebook-square' },
    { title: 'LinkedIn',       href: 'https://www.linkedin.com/in/kosalnith',                         icon: 'fa fa-linkedin' },
    { title: 'YouTube',        href: 'https://www.youtube.com/kosalnith',                             icon: 'fa fa-youtube-play' },
    { title: 'Bluesky',        href: 'https://bsky.app/profile/kosalnith.bsky.social',                svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="vertical-align:-0.125em"><path d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026"/></svg>' },
  ];

  const FOOTER_LINKS = [
    { label: 'Research',      href: SITE_URL + '/research.html' },
    { label: 'Activity',      href: SITE_URL + '/activity.html' },
    { label: 'Press',         href: SITE_URL + '/press.html' },
    { label: 'Miscellaneous', href: SITE_URL + '/miscellaneous.html' },
    { label: 'Updates',       href: SITE_URL + '/updates.html' },
    { label: 'Travel Map',    href: SITE_URL + '/travelmap.html' },
  ];

  const FOOTER_ORG     = 'Center for Development Economics and Trade, Cambodia Development Resource Institute';
  const FOOTER_ADDRESS = 'No. 56, Street 315, Sangkat Boeng Kak II, Khan Tuol Touk, 120508, Phnom Penh, Cambodia';
  const COPYRIGHT_YEAR_START = 2018;


  /* ─────────────────────────────────────────────
     2. SHARED HEAD ELEMENTS
     Favicons and common meta tags injected into
     every page's <head> automatically.
     Do NOT put page-specific tags here (title,
     og:url, og:title, canonical — those stay
     in each page's own <head>).
  ───────────────────────────────────────────── */

  function injectHead() {
    const tags = `
      <!-- Modernizr: feature detection, same on every page -->
      <script src="/static/js/modernizr.min.js"></script>
      <script src="/static/js/modernizr-additional-tests.js"></script>

      <!-- Google Analytics: same tracking ID on every page -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-FXRBQVKK80"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-FXRBQVKK80');
      </script>
      <link rel="icon" href="static/img/favion/kosal.ico" type="image/vnd.microsoft.icon">
      <link rel="apple-touch-icon" sizes="60x60"  href="static/img/icon/apple-touch-icon-60x60.png">
      <link rel="apple-touch-icon" sizes="72x72"  href="static/img/icon/apple-touch-icon-72x72.png">
      <link rel="apple-touch-icon" sizes="76x76"  href="static/img/icon/apple-touch-icon-76x76.png">
      <link rel="apple-touch-icon" sizes="114x114" href="static/img/icon/apple-touch-icon-114x114.png">
      <link rel="apple-touch-icon" sizes="120x120" href="static/img/icon/apple-touch-icon-120x120.png">
      <link rel="apple-touch-icon" sizes="144x144" href="static/img/icon/apple-touch-icon-144x144.png">
      <link rel="apple-touch-icon" sizes="152x152" href="static/img/icon/apple-touch-icon-152x152.png">
      <link rel="apple-touch-icon" sizes="180x180" href="static/img/icon/apple-touch-icon-180x180.png">
      <link rel="icon" type="image/png" href="static/img/icon/favicon-196x196.png" sizes="196x196">
      <link rel="icon" type="image/png" href="static/img/icon/favicon-192x192.png" sizes="192x192">
      <link rel="icon" type="image/png" href="static/img/icon/favicon-128.png"     sizes="128x128">
      <link rel="icon" type="image/png" href="static/img/icon/favicon-96x96.png"   sizes="96x96">
      <link rel="icon" type="image/png" href="static/img/icon/favicon-32x32.png"   sizes="32x32">
      <link rel="icon" type="image/png" href="static/img/icon/favicon-16x16.png"   sizes="16x16">
      <link rel="mask-icon" href="static/img/icon/safari-pinned-tab.svg" color="#ffffff">
      <meta name="application-name"            content="Kosal Nith">
      <meta name="Generator"                   content="Kosal Nith Personal Site">
      <meta name="MobileOptimized"             content="width">
      <meta name="HandheldFriendly"            content="true">
      <meta name="msapplication-TileColor"     content="#FFFFFF">
      <meta name="msapplication-TileImage"     content="https://www-media.stanford.edu/assets/favicon/mstile-144x144.png">
      <meta name="msapplication-square70x70logo"   content="https://www-media.stanford.edu/assets/favicon/mstile-70x70.png">
      <meta name="msapplication-square150x150logo" content="https://www-media.stanford.edu/assets/favicon/mstile-150x150.png">
      <meta name="msapplication-square310x310logo" content="https://www-media.stanford.edu/assets/favicon/mstile-310x310.png">
      <meta property="og:site_name" content="Kosal Nith">
      <meta property="og:type"      content="website">
      <meta name="twitter:card"     content="summary_large_image">
    `;
    // Avoid duplicating if already injected
    if (document.querySelector('link[href="static/img/favion/kosal.ico"]')) return;
    document.head.insertAdjacentHTML('beforeend', tags);
  }

  /* ─────────────────────────────────────────────
     3. HELPERS
  ───────────────────────────────────────────── */

  /** Detect the current page filename (e.g. "personal.html") */
  function currentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  /** Mark the active nav item based on current URL (supports sub-page mapping) */
  function markActiveNav(navEl) {
    const page = currentPage();
    // If this page is a sub-page, resolve it to its parent nav href
    const activePage = PAGE_PARENTS[page] || page;
    navEl.querySelectorAll('.su-multi-menu__item').forEach(function (li) {
      const a = li.querySelector('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const isActive = href === activePage || (activePage === '' && href === 'index.html');
      if (isActive) {
        li.classList.add('su-multi-menu__item--active-trail', 'su-multi-menu__item--current');
        a.setAttribute('aria-current', 'true');
      } else {
        li.classList.remove('su-multi-menu__item--active-trail', 'su-multi-menu__item--current');
        a.removeAttribute('aria-current');
      }
    });
  }

  /* ─────────────────────────────────────────────
     3. HEADER HTML
  ───────────────────────────────────────────── */

  function buildHeader() {
    const navItems = NAV_ITEMS.map(function (item) {
      return '<li class="su-multi-menu__item">' +
        '<a class="su-multi-menu__link" href="' + item.href + '"' +
        (item.external ? ' rel="noopener noreferrer"' : '') + '>' +
        '<span class="su-multi-menu__link-text-wrapper">' + item.label + '</span>' +
        '</a></li>';
    }).join('\n      ');

    return `
<header class="su-masthead su-masthead--right">
  <a href="#main-content" class="visually-hidden focusable su-skipnav su-skipnav--content">Skip to main content</a>
  <a href="#secondary-navigation" class="visually-hidden focusable su-skipnav su-skipnav--secondary">Skip to secondary navigation</a>

  <div class="su-brand-bar su-brand-bar--default">
    <div class="su-brand-bar__container">
      <a class="su-brand-bar__logo" href="${SITE_URL}">
        <span class="su-brand-bar__link--a11y"> (link is external)</span>
      </a>
    </div>
  </div>

  <section>
    <div id="block-stanford-basic-branding" class="su-lockup su-lockup--option-a">
      <a href="https://saerdconf.github.io/">
        <div class="su-lockup__cell1">
          <div class="su-lockup__wordmark-wrapper">
            <span class="su-lockup__wordmark">SAERD26</span>
          </div>
        </div>
        <div class="su-lockup__line5"></div>
      </a>
    </div>

    <div id="block-stanford-basic-main-navigation" class="system-menu-block main">
      <nav class="su-multi-menu su-multi-menu--buttons su-multi-menu--right" aria-label="main menu">
        <button class="su-multi-menu__nav-toggle su-multi-menu__nav-toggle--right" aria-expanded="false" style="position:relative;top:auto;right:auto;margin-left:auto;background:transparent;border:none;box-shadow:none;">Menu</button>
        <ul class="su-multi-menu__menu su-multi-menu__menu-lv1 mobile-hidden">
          ${navItems}
          <li class="su-multi-menu__item dm-toggle-li" id="dm-toggle-li"></li>
        </ul>
      </nav>
    </div>
  </section>
</header>`;
  }

  /* ─────────────────────────────────────────────
     4. PRE-FOOTER + FOOTER HTML
  ───────────────────────────────────────────── */

  function buildFooter() {
    const socialItems = SOCIAL_LINKS.map(function (s) {
      const iconHtml = s.svg ? s.svg : `<span class="${s.icon}" aria-hidden="true"></span>`;
      return `<li><a title="${s.title}" class="xsu-link" data-ga-label="${s.title}" href="${s.href}">` +
        iconHtml +
        `<span class="sr-only-text">${s.title}</span></a></li>`;
    }).join('\n        ');

    const footerNavItems = FOOTER_LINKS.map(function (l) {
      return `<li><a href="${l.href}" rel="nofollow">${l.label}` +
        `<span class="su-global-footer__link-a11y"> (link is external)</span></a></li>`;
    }).join('\n            ');

    return `
<section id="footer__pre-footer" data-ga-action="Pre-footer">
  <div class="social">
    <ul data-ga-action="Social media">
      ${socialItems}
    </ul>
  </div>
</section>

<footer id="footer">
  <div class="su-global-footer">
    <div class="su-global-footer__container">
      <div class="su-global-footer__brand">
        <a id="su-logo" class="su-logo" aria-hidden="true" tabindex="-1" href="">
          <br><span class="su-global-footer__link-a11y"> (link is external)</span>
        </a>
      </div>
      <div class="su-global-footer__content">
        <nav aria-label="global footer menu">
          <ul class="su-global-footer__menu su-global-footer__menu--global">
            ${footerNavItems}
          </ul>
          <ul class="su-global-footer__menu su-global-footer__menu--policy">
            <li><a href="" rel="nofollow">${FOOTER_ORG}<span class="su-global-footer__link-a11y"> (link is external)</span></a></li>
            <br>
            <li><a href="" rel="nofollow">${FOOTER_ADDRESS}<span class="su-global-footer__link-a11y"> (link is external)</span></a></li>
          </ul>
        </nav>
        <div class="su-global-footer__copyright">
          <span>&copy; SAERD 2026.</span>
          <span>All Rights Reserved.</span>
        </div>
      </div>
    </div>
  </div>
</footer>`;
  }

  /* ─────────────────────────────────────────────
     5. BACK TO TOP BUTTON
  ───────────────────────────────────────────── */

  function buildBackToTop() {
    return `<button id="back-to-top" style="display:none;" aria-label="Back to top">
  <span class="fas fa-chevron-up"></span>
  Back to Top
</button>`;
  }

  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    var scrollTimeout;
    window.addEventListener('scroll', function () {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        var show = window.pageYOffset > 300;
        btn.style.display = show ? 'block' : 'none';
        // Toggle .visible for pages that use opacity-based show (e.g. research.css)
        if (show) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      }, 100);
    }, { passive: true });

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (_) {
        window.scrollTo(0, 0);
      }
    });
  }

  /* ─────────────────────────────────────────────
     6. GOOGLE ANALYTICS
  ───────────────────────────────────────────── */

const script = document.createElement('script');
script.async = true;
script.src = 'https://www.googletagmanager.com/gtag/js?id=G-J14VZQQD1L';
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'G-J14VZQQD1L');

  /* ─────────────────────────────────────────────
     6. INJECT EVERYTHING
  ───────────────────────────────────────────── */

  /** Injects the common site JS bundle into <body> (only once) */
  function injectBodyScript() {
    var scriptSrc = 'static/js/js_JBbJf6RwtYhWtZ0OWen2_GCykwMhsYkgnDCUtmawjXI.js';
    if (document.querySelector('script[src="' + scriptSrc + '"]')) return;
    var s = document.createElement('script');
    s.src = scriptSrc;
    document.body.appendChild(s);
  }

  function reinitMultiMenu() {
    document.querySelectorAll('.su-multi-menu').forEach(function (navEl) {
      var toggle = navEl.querySelector('.su-multi-menu__nav-toggle');
      var menu   = navEl.querySelector('.su-multi-menu__menu-lv1');
      if (!toggle || !menu) return;

      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.add('mobile-hidden');

      if (toggle._knInitDone) return;
      toggle._knInitDone = true;

      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
        open ? menu.classList.add('mobile-hidden') : menu.classList.remove('mobile-hidden');
      });

      menu.addEventListener('click', function (e) {
        if (window.innerWidth >= 992) return;
        var el = e.target;
        while (el && el !== menu) {
          // Close on nav link, search button, or dark/light mode toggle
          if (
            (el.tagName === 'A' && el.classList.contains('su-multi-menu__link')) ||
            el.id === 'site-search-btn' ||
            el.classList.contains('dm-toggle')
          ) {
            setTimeout(function () {
              toggle.setAttribute('aria-expanded', 'false');
              menu.classList.add('mobile-hidden');
            }, 80);
            return;
          }
          el = el.parentElement;
        }
      });
    });
  }

  function inject() {
    // --- Head tags ---
    injectHead();

    // --- Common body script (Drupal/site JS, same on every page) ---
    injectBodyScript();

    // --- Header ---
    var headerSlot = document.getElementById('site-header');
    if (headerSlot) {
      headerSlot.outerHTML = buildHeader();
      // Mark active nav after injection
      var nav = document.querySelector('.su-multi-menu');
      if (nav) markActiveNav(nav);
      reinitMultiMenu();
    }

    // --- Footer ---
    var footerSlot = document.getElementById('site-footer');
    if (footerSlot) {
      footerSlot.outerHTML = buildFooter();
    }

    // --- Back to Top ---
    // Inject before </body> if not already present
    if (!document.getElementById('back-to-top')) {
      document.body.insertAdjacentHTML('beforeend', buildBackToTop());
    }
    initBackToTop();

    // --- Leaflet map fix ---
    // If this page has a Leaflet map, the header injection shifts the layout.
    // Call invalidateSize() after a short delay so the map recalculates its dimensions.
    fixLeafletMap();
  }

  function fixLeafletMap() {
    // Only run if Leaflet is loaded on this page
    if (typeof L === 'undefined') return;
    setTimeout(function () {
      // Find every element that Leaflet has attached a map instance to
      document.querySelectorAll('.leaflet-container').forEach(function (el) {
        // Leaflet attaches the map object to the container via _leaflet_id
        var id = el._leaflet_id;
        if (!id) return;
        // Walk Leaflet's internal map registry to find the matching instance
        Object.keys(L.Map._instances || {}).forEach(function (key) {
          var m = L.Map._instances[key];
          if (m && m.getContainer && m.getContainer() === el) {
            m.invalidateSize();
          }
        });
      });
    }, 300);
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
