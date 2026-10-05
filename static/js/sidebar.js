document.addEventListener('DOMContentLoaded', function() {
  var sidebar = document.getElementById('otp-sidebar');
  if (!sidebar) return;

  /* ---- Show sidebar only when scrolled past hero image ---- */
  var firstHeading = document.querySelector('h3[id], h4[id], h5[id]');
  var heroImage = document.querySelector('.su-hero, .su-page-banner, .ptype-stanford-banner, picture img');

  function checkSidebarVisibility() {
    var footer = document.getElementById('footer')
                 || document.querySelector('footer')
                 || document.querySelector('.su-global-footer');
    var footerVisible = footer && footer.getBoundingClientRect().top < window.innerHeight;

    // Hide if footer is visible
    if (footerVisible) {
      sidebar.classList.remove('is-visible');
      return;
    }

    // Hide if hero image is still visible (bottom of hero is still in viewport)
    if (heroImage) {
      var heroBottom = heroImage.getBoundingClientRect().bottom;
      if (heroBottom > 0) {
        sidebar.classList.remove('is-visible');
        return;
      }
    }

    sidebar.classList.add('is-visible');
  }

  window.addEventListener('scroll', checkSidebarVisibility, { passive: true });
  checkSidebarVisibility();

  /* ---- Active link highlighting on scroll ---- */
  var allHeadings = document.querySelectorAll('h3[id], h4[id], h5[id]');
  var links       = document.querySelectorAll('.otp-sidebar__link');

  function updateActive() {
var scrollY  = window.scrollY + 140;
var current  = '';
allHeadings.forEach(function(h) {
  if (h.getBoundingClientRect().top + window.scrollY <= scrollY) current = h.id;
});
links.forEach(function(a) {
  var href = (a.getAttribute('href') || '').replace('#', '');
  a.classList.toggle('is-active', href === current);
});
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  /* ---- "On this page" header: scroll to content top + toggle collapse ---- */
  var header = sidebar.querySelector('.otp-sidebar__header');

  header.addEventListener('click', function() {
var target = document.querySelector('h3[id], h4[id], h5[id]');
if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
if (window.innerWidth >= 1025) sidebar.classList.toggle('is-collapsed');
  });

  /* ---- Mobile slide-in panel ---- */
  var handle = document.createElement('div');
  handle.className = 'otp-touch-handle';
  handle.setAttribute('aria-label', 'Open table of contents');
  handle.textContent = 'TOC';

  var overlay = document.createElement('div');
  overlay.className = 'otp-overlay';

  document.body.appendChild(handle);
  document.body.appendChild(overlay);

  function openMobile()  {
sidebar.classList.add('mobile-active');
overlay.classList.add('active');
document.body.style.overflow = 'hidden';
  }
  function closeMobile() {
sidebar.classList.remove('mobile-active');
overlay.classList.remove('active');
document.body.style.overflow = '';
  }

  handle.addEventListener('click', openMobile);
  overlay.addEventListener('click', closeMobile);
  document.getElementById('otp-close-btn').addEventListener('click', closeMobile);
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeMobile(); });

  var tx = 0;
  sidebar.addEventListener('touchstart', function(e) { tx = e.changedTouches[0].screenX; }, { passive: true });
  sidebar.addEventListener('touchend',   function(e) { if (e.changedTouches[0].screenX - tx > 50) closeMobile(); }, { passive: true });
});

