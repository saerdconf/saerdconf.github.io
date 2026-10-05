/**
 * video.js  —  Video Carousel
 * Companion stylesheet: video.css
 *
 * How the arrows work
 * ────────────────────
 * Buttons use position:fixed in CSS, which escapes every
 * overflow:hidden and CSS-transform stacking context in the tree.
 * JS measures the exact viewport coordinates of the two column
 * boundaries and the frame vertical midpoint after every paint,
 * then sets btn.style.left / btn.style.top directly.
 * This makes the arrows immune to any site layout constraint.
 *
 * How full-bleed works
 * ─────────────────────
 * The section is inside a Drupal sidebar column so the usual
 * CSS calc trick doesn't work. JS measures the section's actual
 * left offset from the viewport and applies a matching negative
 * margin-left + width:100vw.
 *
 * Responsive modes
 * ─────────────────
 * Desktop  ≥1024px   3 cards   track=5
 * Tablet   768-1023  2 cards   track=4
 * Mobile   <768px    1 card    track=3  swipe, buttons hidden
 */

'use strict';

/* ── 1. VIDEO DATA ──────────────────────────────────────────
 * Edit this array with your YouTube IDs and metadata.
 * ────────────────────────────────────────────────────────── */
const CAROUSEL_VIDEOS = [
  {
    id: '7FWRHSZ-8F8',
    title: "Agriculture in Cambodia",
    desc: 'Cambodia’s agriculture faces climate change, low productivity, and weak market access, while policies focus on better irrigation, mechanisation, finance access, and stronger value chains to drive sustainable growth and resilience.',
    duration: '8:30',
  },
  {
    id: '4HLAaorAjwE',
    title: "Slavery and Capitalism",
    desc: 'Karl Marx’s writings on enslavement and labor have fallen out of favor among historians, but David McNally injects new life into them. Slavery and Capitalism gives the first systematic Marxist account of the capitalist character of Atlantic slavery—using colonial travel literature, planter records and diaries, and slave narratives—to support the provocative claim for enslaved labor in the plantation system as capitalist commodity production.',
    duration: '1:21:41',
  },
  {
    id: '5YnRuUPmWU8',
    title: "A New Approach to Informality",
    desc: 'India’s informal economy is established as the largest in the world – comprising almost all employment and probably just under half of GDP, though this is thought to be declining. The theoretical genealogy of informal activity – as with the categories of the state which academics have to use – is marked by binaries and duality (unorganised, unprotected, unincorporated etc). ',
    duration: '1:41:47',
  },
  {
    id: 'hg4duulYvbk',
    title: "Rethinking Intellectual Property and Data",
    desc: 'We seek to open a conversation about capitalism as it has been theorised, imagined, and contested across historical periods and geographies.',
    duration: '1:02:44',
  },
  {
    id: '2PwN2isseWI',
    title: "Aggregate Demand Policy in Developing Economies",
    desc: 'Session 2 of Macroeconomic Development and Inclusive Growth in East and Southeast Asia. With Prof. Peter Skott, Professor Emeritus, University of Massachusetts Amherst, the United States.',
    duration: '1:30:38',
  },
  {
    id: 'vFDko4rZ40o',
    title: "Fiscal Policy in Cambodia",
    desc: 'I discussed ways to tax the rich and improve fiscal collection to promote public investment as a foundation for long-term growth.',
    duration: '8:43',
  },
];


/* ── 2. MODE CONFIGS ────────────────────────────────────────── */
const MODES = {
  desktop: { visible: 3, trackCards: 5, restOffset: -20,       stepPct: 20       },
  tablet:  { visible: 2, trackCards: 4, restOffset: -25,       stepPct: 25       },
  mobile:  { visible: 1, trackCards: 3, restOffset: -33.33333, stepPct: 33.33333 },
};

function getMode() {
  const w = window.innerWidth;
  if (w >= 1024) return MODES.desktop;
  if (w >= 768)  return MODES.tablet;
  return MODES.mobile;
}


/* ── 3. STATE ───────────────────────────────────────────────── */
const state = {
  cur:      0,
  busy:     false,
  playing:  new Set(),
  lastMode: null,
};

let trackEl, outerEl, sectionEl, btnPrev, btnNext, dotsEl, counterEl;
let touchStartX = 0;
let touchStartY = 0;
const cardPool = [];


/* ── 4. FULL-BLEED ──────────────────────────────────────────────
 * Pulls .vc-section to the true left edge of the viewport by
 * measuring and negating its actual left offset.
 * Called once at init and again on resize.
 * ────────────────────────────────────────────────────────────── */
function applyBleed() {
  // Reset first so getBoundingClientRect reflects the natural layout
  sectionEl.style.marginLeft = '';
  sectionEl.style.width      = '';

  const left = sectionEl.getBoundingClientRect().left;
  if (left !== 0) {
    sectionEl.style.marginLeft = `-${left}px`;
    sectionEl.style.width      = '100vw';
  }
}


/* ── 5. ARROW POSITIONING ───────────────────────────────────────
 *
 * Buttons are position:fixed, so left/top are viewport coordinates.
 *
 * Desktop (3 cards):
 *   < sits at the boundary between card 1 and card 2 = 1/3 of outer width
 *   > sits at the boundary between card 2 and card 3 = 2/3 of outer width
 *
 * Tablet (2 cards):
 *   < sits 16% from the left of outer
 *   > sits 84% from the left of outer
 *
 * Vertical: midpoint of the centre card's video frame.
 *
 * We defer to rAF so getBoundingClientRect reads after paint.
 * ────────────────────────────────────────────────────────────── */
function updateArrowPos() {
  const mode = state.lastMode || getMode();
  const isMobile = mode === MODES.mobile;

  // Hide on mobile — swipe handles navigation
  btnPrev.dataset.hidden = isMobile ? 'true' : 'false';
  btnNext.dataset.hidden = isMobile ? 'true' : 'false';
  if (isMobile) return;

  const or = outerEl.getBoundingClientRect();

  // Horizontal: column-boundary fractions of the outer element's width
  let prevFrac, nextFrac;
  if (mode === MODES.tablet) {
    prevFrac = 0.16;
    nextFrac = 0.84;
  } else {
    prevFrac = 1 / 3;
    nextFrac = 2 / 3;
  }

  const prevLeft = or.left + or.width * prevFrac;
  const nextLeft = or.left + or.width * nextFrac;

  // Vertical: midpoint of the centre card's video frame
  const centreCard = cardPool.find(c => c.classList.contains('center-card'));
  const frameEl    = centreCard && centreCard.querySelector('.vc-frame');
  const fr         = frameEl ? frameEl.getBoundingClientRect() : or;
  const midTop     = fr.top + fr.height / 2;

  // Write directly — no CSS variable indirection
  btnPrev.style.left = prevLeft + 'px';
  btnPrev.style.top  = midTop  + 'px';
  btnNext.style.left = nextLeft + 'px';
  btnNext.style.top  = midTop  + 'px';
}


/* ── 6. CARD POOL ───────────────────────────────────────────────
 * Nodes created once, patched in place on every navigate.
 * ────────────────────────────────────────────────────────────── */
function createCardPool(maxCards) {
  trackEl.innerHTML = '';
  cardPool.length   = 0;

  for (let i = 0; i < maxCards; i++) {
    const card = document.createElement('div');
    card.className = 'vc-card side-card';
    card.innerHTML = `
      <div class="vc-frame">
        <img class="vc-thumb" alt="" loading="lazy">
        <div class="vc-embed">
          <iframe title="" allowfullscreen allow="autoplay; encrypted-media"></iframe>
        </div>
        <div class="vc-play-overlay">
          <div class="vc-play-btn">
            <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
        <div class="vc-duration"></div>
      </div>
      <div class="vc-card-info">
        <span class="vc-tag"></span>
        <h3></h3>
        <p></p>
      </div>`;

    card.querySelector('.vc-play-overlay').addEventListener('click', onPlayClick);
    card.addEventListener('click', onCardClick);
    trackEl.appendChild(card);
    cardPool.push(card);
  }
}

function patchCard(card, videoIndex, pos, mode) {
  const v           = CAROUSEL_VIDEOS[videoIndex];
  const centrePos   = Math.floor(mode.trackCards / 2);
  const isCenter    = (mode.visible === 2) ? pos === 1 : pos === centrePos;
  const isEdgeLeft  = pos === 1;
  const isEdgeRight = pos === mode.trackCards - 2;

  card.dataset.videoIndex = videoIndex;
  card.dataset.pos = isEdgeLeft ? 'edge-left' : isEdgeRight ? 'edge-right' : 'inner';

  const wantedClass = 'vc-card ' + (isCenter ? 'center-card' : 'side-card');
  if (card.className !== wantedClass) card.className = wantedClass;

  const wantedBasis = (100 / mode.trackCards) + '%';
  if (card.style.flexBasis !== wantedBasis) card.style.flexBasis = wantedBasis;

  const thumb     = card.querySelector('.vc-thumb');
  const wantedSrc = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;
  if (thumb.src !== wantedSrc) { thumb.src = wantedSrc; thumb.alt = v.title + ' thumbnail'; }

  const embedDiv  = card.querySelector('.vc-embed');
  const iframe    = embedDiv.querySelector('iframe');
  const overlay   = card.querySelector('.vc-play-overlay');
  const isPlaying = state.playing.has(videoIndex);

  if (isPlaying) {
    const wantedIframeSrc = `https://www.youtube.com/embed/${v.id}?autoplay=0&rel=0`;
    if (!embedDiv.classList.contains('on'))  embedDiv.classList.add('on');
    if (iframe.src !== wantedIframeSrc)      iframe.src = wantedIframeSrc;
    if (!overlay.classList.contains('gone')) overlay.classList.add('gone');
    thumb.style.opacity = '0';
  } else {
    if (iframe.src)                           iframe.removeAttribute('src');
    if (embedDiv.classList.contains('on'))    embedDiv.classList.remove('on');
    if (overlay.classList.contains('gone'))   overlay.classList.remove('gone');
    thumb.style.opacity = '1';
  }

  const tag = card.querySelector('.vc-tag');
  const h3  = card.querySelector('h3');
  const p   = card.querySelector('p');
  const dur = card.querySelector('.vc-duration');
  if (tag.textContent !== v.tag)      tag.textContent = v.tag;
  if (h3.textContent  !== v.title)    h3.textContent  = v.title;
  if (p.textContent   !== v.desc)     p.textContent   = v.desc;
  if (dur.textContent !== v.duration) dur.textContent = v.duration;
}


/* ── 7. EVENT HANDLERS ──────────────────────────────────────── */
function onPlayClick(e) {
  e.stopPropagation();
  const card = e.currentTarget.closest('.vc-card');
  if (card) playVideo(parseInt(card.dataset.videoIndex, 10));
}

function onCardClick(e) {
  const card = e.currentTarget;
  if (card.classList.contains('side-card')) {
    goTo(parseInt(card.dataset.videoIndex, 10));
  }
}


/* ── 8. POPULATE ────────────────────────────────────────────── */
function populate(mode) {
  const n = mode.trackCards;
  cardPool.forEach((card, i) => { card.style.display = i < n ? '' : 'none'; });

  for (let pos = 0; pos < n; pos++) {
    const offset = pos - Math.floor(n / 2);
    const idx    = (state.cur + offset + CAROUSEL_VIDEOS.length * 100) % CAROUSEL_VIDEOS.length;
    patchCard(cardPool[pos], idx, pos, mode);
  }

  trackEl.style.width     = `calc(100% * ${n} / ${mode.visible})`;
  trackEl.classList.remove('animating');
  trackEl.style.transform = `translateX(${mode.restOffset}%)`;
  state.lastMode          = mode;

  updateMeta(mode);

  // Defer layout reads to after the browser has painted
  requestAnimationFrame(() => {
    applyBleed();
    updateArrowPos();
  });
}


/* ── 9. META ────────────────────────────────────────────────── */
function updateMeta(mode) {
  const total = CAROUSEL_VIDEOS.length;
  const half  = Math.floor(mode.visible / 2);
  const indices = [];
  for (let i = -half; i <= half; i++) {
    if (mode.visible % 2 === 0 && i === half) break;
    indices.push(((state.cur + i + total) % total) + 1);
  }
  if (indices.length === 0) indices.push(state.cur + 1);
  counterEl.textContent = `${indices.join(', ')} of ${total}`;
  dotsEl.querySelectorAll('.vc-dot').forEach((d, i) => d.classList.toggle('on', i === state.cur));
}


/* ── 10. SLIDE ──────────────────────────────────────────────── */
function move(dir) {
  if (state.busy) return;
  state.busy = true;

  const mode         = getMode();
  const total        = CAROUSEL_VIDEOS.length;
  const nextCur      = (state.cur + dir + total) % total;
  const targetOffset = mode.restOffset - dir * mode.stepPct;

  dotsEl.querySelectorAll('.vc-dot').forEach((d, i) => d.classList.toggle('on', i === nextCur));

  trackEl.style.willChange = 'transform';
  trackEl.classList.add('animating');
  trackEl.style.transform  = `translateX(${targetOffset}%)`;

  trackEl.addEventListener('transitionend', function onEnd() {
    trackEl.removeEventListener('transitionend', onEnd);
    state.cur = nextCur;
    populate(mode);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      trackEl.style.willChange = 'auto';
      state.busy = false;
    }));
  }, { once: true });
}


/* ── 11. GO TO ──────────────────────────────────────────────── */
function goTo(target) {
  const total = CAROUSEL_VIDEOS.length;
  if (target === state.cur || state.busy) return;
  const fwd = (target - state.cur + total) % total;
  const bwd = (state.cur - target + total) % total;
  move(fwd <= bwd ? 1 : -1);
}


/* ── 12. PLAY VIDEO ─────────────────────────────────────────── */
function playVideo(videoIndex) {
  state.playing.add(videoIndex);
  const card = cardPool.find(c => parseInt(c.dataset.videoIndex, 10) === videoIndex);
  if (!card) return;

  const embedDiv = card.querySelector('.vc-embed');
  const iframe   = embedDiv.querySelector('iframe');
  const overlay  = card.querySelector('.vc-play-overlay');
  const thumb    = card.querySelector('.vc-thumb');

  iframe.src = `https://www.youtube.com/embed/${CAROUSEL_VIDEOS[videoIndex].id}?autoplay=1&rel=0`;
  embedDiv.classList.add('on');
  overlay.classList.add('gone');
  thumb.style.opacity = '0';

  if (videoIndex !== state.cur) { state.cur = videoIndex; populate(getMode()); }
}


/* ── 13. TOUCH SWIPE ────────────────────────────────────────── */
function attachSwipe() {
  outerEl.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  outerEl.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
  }, { passive: true });
}


/* ── 14. SCROLL / RESIZE ────────────────────────────────────────
 * Buttons use position:fixed so they follow the viewport, not the
 * document. When the user scrolls, the buttons stay locked to the
 * same viewport coordinates — which is wrong. We must update their
 * positions on every scroll event to keep them over the videos.
 * ────────────────────────────────────────────────────────────── */
function attachScrollAndResize() {
  // Scroll: re-position buttons to track the carousel as it moves
  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateArrowPos);
  }, { passive: true });

  // Resize: re-measure layout and reposition
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const mode = getMode();
      if (mode === state.lastMode && !state.busy) {
        requestAnimationFrame(() => { applyBleed(); updateArrowPos(); });
      } else {
        populate(mode);
      }
    }, 150);
  });
}


/* ── 15. INIT ───────────────────────────────────────────────── */
function initCarousel() {
  trackEl   = document.getElementById('vc-track');
  outerEl   = document.getElementById('vc-outer');
  sectionEl = document.querySelector('.vc-section');
  btnPrev   = document.getElementById('vc-btn-prev');
  btnNext   = document.getElementById('vc-btn-next');
  dotsEl    = document.getElementById('vc-dots');
  counterEl = document.getElementById('vc-counter');

  if (!trackEl || !outerEl || !sectionEl || !btnPrev || !btnNext || !dotsEl || !counterEl) {
    console.warn('[video.js] Missing elements — check IDs in your HTML.');
    return;
  }

  createCardPool(MODES.desktop.trackCards);

  // Dots
  dotsEl.innerHTML = '';
  CAROUSEL_VIDEOS.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'vc-dot' + (i === 0 ? ' on' : '');
    dot.setAttribute('aria-label', `Go to story ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  btnPrev.addEventListener('click', () => move(-1));
  btnNext.addEventListener('click', () => move(1));

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  move(-1);
    if (e.key === 'ArrowRight') move(1);
  });

  attachSwipe();
  attachScrollAndResize();
  populate(getMode());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousel);
} else {
  initCarousel();
}
