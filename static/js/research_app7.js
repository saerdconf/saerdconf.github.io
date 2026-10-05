// ===== Constants & State =====
const ITEMS_PER_PAGE = 50;
const YEAR_MIN_BOUND = 2018;
const YEAR_MAX_BOUND = 2026;

let currentPage = 1;
let currentSearchTerm = '';
let yearRangeMin = YEAR_MIN_BOUND;
let yearRangeMax = YEAR_MAX_BOUND;
let currentDetailIdx = -1;
let sortOrder = 'desc'; // 'desc' = newest first, 'asc' = oldest first
let activeStatusFlag = null;

// ===== Filtering =====

// Maps sidebar label → pub.type dataFilter bucket.
// All 37 Zotero types are looked up dynamically from allPublicationTypes.
// The only override needed is "Work in progress" (site-specific 38th type).
function getFilterKeyFromTypeLabel(label) {
  if (label === "Work in progress") return "progress";
  const found = allPublicationTypes.find(t => t.label === label);
  return found ? (found.dataFilter || found.key) : null;
}

// Maps pub.zoteroType → dataFilter bucket
function getFilterKeyFromZoteroType(zt) {
  const map = {
    journalArticle: "articles", bookSection: "chapters", book: "books",
    thesis: "thesis", manuscript: "manuscript", preprint: "preprints",
    report: "reports", document: "documents", dataset: "datasets",
    software: "software", conferencePaper: "confpapers", presentation: "presentations",
    newspaperArticle: "opeds", magazineArticle: "magazine", blogPost: "blogpost",
    forumPost: "forum", webpage: "webpage", encyclopediaArticle: "encyclopedia",
    dictionaryEntry: "dictionary", map: "maps", case: "legalcase", bill: "bills",
    statute: "statutes", hearing: "hearings", patent: "patents", standard: "standards",
    film: "film", tvBroadcast: "tv", radioBroadcast: "radio", podcast: "podcast",
    audioRecording: "audio", videoRecording: "video", artwork: "artwork",
    interview: "interviews", letter: "letters", email: "email", instantMessage: "im"
  };
  return map[zt] || null;
}

// Returns a clean human-readable type label for a publication card
// Uses zoteroType first (precise), falls back to internal pub.type bucket
function getTypeLabel(pub) {
  const ztLabels = {
    journalArticle:      "Journal article",
    bookSection:         "Book chapter",
    book:                "Book",
    thesis:              "Thesis / Dissertation",
    manuscript:          "Manuscript",
    preprint:            "Preprint",
    report:              "Report",
    document:            "Document",
    dataset:             "Dataset",
    software:            "Software",
    conferencePaper:     "Conference paper",
    presentation:        "Presentation",
    newspaperArticle:    "Newspaper article",
    magazineArticle:     "Magazine article",
    blogPost:            "Blog post",
    forumPost:           "Forum post",
    webpage:             "Web page",
    encyclopediaArticle: "Encyclopedia article",
    dictionaryEntry:     "Dictionary entry",
    map:                 "Map",
    case:                "Legal case",
    bill:                "Bill / Legislation",
    statute:             "Statute",
    hearing:             "Hearing",
    patent:              "Patent",
    standard:            "Standard",
    film:                "Film",
    tvBroadcast:         "TV broadcast",
    radioBroadcast:      "Radio broadcast",
    podcast:             "Podcast",
    audioRecording:      "Audio recording",
    videoRecording:      "Video recording",
    artwork:             "Artwork",
    interview:           "Interview",
    letter:              "Letter",
    email:               "Email",
    instantMessage:      "Instant message"
  };
  if (pub.zoteroType && ztLabels[pub.zoteroType]) return ztLabels[pub.zoteroType];
  // Fallback for work_in_progress (no zoteroType)
  if (pub.type === "progress") return "Work in progress";
  return "Research output";
}

// ── Research lifecycle status badges ──────────────────────────────────────
// Each pub can carry one or more boolean stage flags.
// Stages follow the research lifecycle in order:
//   definingProblem → reviewingLiterature → formulatingHypotheses
//   → researchDesign → collectingData → analyzingResults
//   → writingFindings → draftVersion → submitted → underReview
//   → forthcoming → oa (published open access) → award
//
// Usage in research_data.js: add any of these boolean fields to a pub entry.
// Example: { ..., underReview: true, oa: false }
//
const STAGE_BADGES = [
  // ── Pre-research ───────────────────────────────────────────
  { flag: "definingProblem",      cls: "badge-stage-1",
    icon: "fas fa-magnifying-glass", label: "Defining Problem" },
  { flag: "reviewingLiterature",  cls: "badge-stage-2",
    icon: "fas fa-book-open",        label: "Reviewing Literature" },
  { flag: "formulatingHypotheses",cls: "badge-stage-3",
    icon: "fas fa-lightbulb",        label: "Formulating Hypotheses" },
  // ── Data & analysis ────────────────────────────────────────
  { flag: "researchDesign",       cls: "badge-stage-4",
    icon: "fas fa-compass-drafting", label: "Research Design" },
  { flag: "collectingData",       cls: "badge-stage-5",
    icon: "fas fa-database",         label: "Collecting Data" },
  { flag: "analyzingResults",     cls: "badge-stage-6",
    icon: "fas fa-chart-line",       label: "Analyzing Results" },
  // ── Writing & submission ───────────────────────────────────
  { flag: "writingFindings",      cls: "badge-stage-7",
    icon: "fas fa-pen-nib",          label: "Writing Findings" },
  { flag: "draftVersion",         cls: "badge-stage-8",
    icon: "fas fa-file-pen",         label: "Draft Version" },
  { flag: "submitted",            cls: "badge-stage-9",
    icon: "fas fa-paper-plane",      label: "Submitted" },
  // ── Review & publication ───────────────────────────────────
  { flag: "underReview",          cls: "badge-under-review",
    icon: "fas fa-arrows-rotate",    label: "Under Review" },
  { flag: "revised",              cls: "badge-revised",
    icon: "fas fa-file-pen",         label: "Revised" },
  { flag: "acceptedInPrinciple",  cls: "badge-accepted-principle",
    icon: "fas fa-circle-check",     label: "Accepted in Principle" },
  { flag: "forthcoming",          cls: "badge-forthcoming",
    icon: "fas fa-clock",            label: "Forthcoming" },
  { flag: "inPress",              cls: "badge-in-press",
    icon: "fas fa-print",            label: "In Press" },
  { flag: "oa",                   cls: "badge-oa",
    icon: "fas fa-lock-open",        label: "Open Access" },
  { flag: "restricted",           cls: "badge-restricted",
    icon: "fas fa-lock",             label: "Restricted" },
  { flag: "embargoed",            cls: "badge-embargoed",
    icon: "fas fa-hourglass-half",   label: "Embargoed" },
  { flag: "unpub",          cls: "badge-unpub",
    icon: "fas fa-sd-card",           label: "Unpublished"},
  // ── Recognition & impact ───────────────────────────────────
  { flag: "award",                cls: "badge-award",
    icon: "fas fa-trophy",           label: "Award Winner" },
  { flag: "featured",             cls: "badge-featured",
    icon: "fas fa-star",             label: "Featured" },
  { flag: "mediaPickup",          cls: "badge-media-pickup",
    icon: "fas fa-satellite-dish",   label: "Media Coverage" },
  { flag: "policyImpact",         cls: "badge-policy-impact",
    icon: "fas fa-landmark-flag",    label: "Policy Impact" },
  // ── Collaboration & project status ────────────────────────
  { flag: "onHold",               cls: "badge-on-hold",
    icon: "fas fa-circle-pause",     label: "On Hold" },
  { flag: "seekingCollaborators", cls: "badge-seeking-collab",
    icon: "fas fa-people-group",     label: "Seeking Collaborators" },
];

function getStatusBadges(pub) {
  return STAGE_BADGES
    .filter(s => pub[s.flag])
    .map(s => `<span class="status-badge ${s.cls} badge-clickable" data-status-flag="${s.flag}" role="button" tabindex="0" title="Filter: ${s.label}"><i class="${s.icon}"></i>${s.label}</span>`)
    .join('');
}
// ──────────────────────────────────────────────────────────────────────────
// Uses Font Awesome 6 Free (fas / far / fab).
function getTypeIcon(pub) {
  const icons = {
    // ── Core research ──────────────────────────────────────────────────────
    // Journal article: peer-reviewed journal publication → open book with pages
    journalArticle:      "fas fa-book-open",
    // Book chapter: one chapter inside an edited volume → ribbon bookmark
    bookSection:         "fas fa-bookmark",
    // Book: complete standalone published volume → closed book
    book:                "fas fa-book",
    // Thesis / Dissertation: degree-conferring academic work → graduation cap
    thesis:              "fas fa-graduation-cap",
    // Manuscript: unpublished handwritten or typed draft → quill scroll
    manuscript:          "fas fa-scroll",
    // Preprint: posted before peer review, awaiting stamp → file with clock
    preprint:            "fas fa-file-circle-question",
    // Report: institutional / technical / policy report → lined report page
    report:              "fas fa-file-lines",
    // Document: generic official administrative document → plain document
    document:            "fas fa-file-alt",
    // Dataset: structured research data → grid / data table
    dataset:             "fas fa-table",
    // Software: code / program / application → laptop with code brackets
    software:            "fas fa-laptop-code",

    // ── Conference & presentations ─────────────────────────────────────────
    // Conference paper: academic paper delivered at a conference → podium mic
    conferencePaper:     "fas fa-chalkboard-user",
    // Presentation: slides or talk at an event → person at a chalkboard
    presentation:        "fas fa-person-chalkboard",

    // ── Journalism & commentary ────────────────────────────────────────────
    // Newspaper article: op-ed or article in a newspaper → folded newspaper
    newspaperArticle:    "fas fa-newspaper",
    // Magazine article: feature piece in a magazine → open reader
    magazineArticle:     "fas fa-book-open-reader",
    // Blog post: online written editorial or commentary → pen writing on page
    blogPost:            "fas fa-pen-to-square",
    // Forum post: message in an online discussion board → speech bubbles
    forumPost:           "fas fa-comments",
    // Web page: content published on a website → globe with pointer
    webpage:             "fas fa-earth-asia",

    // ── Reference works ────────────────────────────────────────────────────
    // Encyclopedia article: entry in a reference encyclopedia → world book atlas
    encyclopediaArticle: "fas fa-book-atlas",
    // Dictionary entry: word definition entry → language / characters
    dictionaryEntry:     "fas fa-language",
    // Map: geographical or thematic map → map with location pin
    map:                 "fas fa-map-location-dot",

    // ── Legal & policy ─────────────────────────────────────────────────────
    // Legal case: court ruling or legal proceeding → scales of justice
    case:                "fas fa-scale-balanced",
    // Bill / Legislation: draft law before a legislature → parliament building
    bill:                "fas fa-landmark",
    // Statute: codified enacted law → judge's gavel
    statute:             "fas fa-gavel",
    // Hearing: formal testimony before a committee → mic at a stand
    hearing:             "fas fa-microphone-lines",
    // Patent: registered intellectual property grant → award / seal
    patent:              "fas fa-award",
    // Standard: published technical or professional norm → checked clipboard
    standard:            "fas fa-clipboard-check",

    // ── Audiovisual & media ────────────────────────────────────────────────
    // Film: movie, documentary, or short film → cinema film strip
    film:                "fas fa-film",
    // TV broadcast: television programme or episode → television screen
    tvBroadcast:         "fas fa-tv",
    // Radio broadcast: radio programme or live show → broadcast tower
    radioBroadcast:      "fas fa-tower-broadcast",
    // Podcast: audio podcast episode → podcast mic icon
    podcast:             "fas fa-podcast",
    // Audio recording: music album or recorded audio → music notes
    audioRecording:      "fas fa-music",
    // Video recording: recorded video (non-broadcast) → video camera
    videoRecording:      "fas fa-video",
    // Artwork: visual art, illustration, or creative work → painter's palette
    artwork:             "fas fa-palette",

    // ── Personal communications ────────────────────────────────────────────
    // Interview: structured Q&A with a subject → person with tie (interviewee)
    interview:           "fas fa-user-tie",
    // Letter: formal physical written correspondence → open letter with text
    letter:              "fas fa-envelope-open-text",
    // Email: electronic written message → @ symbol
    email:               "fas fa-at",
    // Instant message: real-time chat / DM → chat bubble with dots
    instantMessage:      "fas fa-comment-dots",

    // ── Site-specific (38th type) ──────────────────────────────────────────
    // Work in progress: ongoing research not yet published → hourglass mid-flow
    progress:            "fas fa-hourglass-half",
  };
  const key = pub.zoteroType || pub.type;
  return icons[key] || "fas fa-file";
}

function getFilteredPublications() {
  const selectedTypeLabels = Array.from(document.querySelectorAll('#fullTypeList input:checked'))
    .map(cb => cb.getAttribute('data-type-label'));
  const types = selectedTypeLabels.map(label => getFilterKeyFromTypeLabel(label)).filter(k => k !== null);
  const oaOnly = document.getElementById('oaFilterCheckbox').checked;

  // Language filter
  const selectedLangs = Array.from(document.querySelectorAll('input[data-lang]:checked'))
    .map(cb => cb.getAttribute('data-lang'));

  // SDG filter
  const selectedSdgs = Array.from(document.querySelectorAll('.sdg-checkbox:checked'))
    .map(cb => cb.getAttribute('data-sdg'));

  let filtered = publicationsData.filter(p => {
    if (types.length) {
      const ztBucket = p.zoteroType ? getFilterKeyFromZoteroType(p.zoteroType) : null;
      // For works in progress (no zoteroType), match directly on p.type
      if (!types.includes(p.type) && !(ztBucket && types.includes(ztBucket))) return false;
    }
    const yearNum = parseInt(p.year);
    if (!isNaN(yearNum) && (yearNum < yearRangeMin || yearNum > yearRangeMax)) return false;
    if (oaOnly && !p.oa) return false;
    if (selectedLangs.length && !selectedLangs.includes(p.lang || 'en')) return false;
    // SDG: publication must have at least one of the selected SDGs
    if (selectedSdgs.length) {
      if (!p.sdgs || !p.sdgs.some(s => selectedSdgs.includes(s))) return false;
    }
    if (activeStatusFlag && !p[activeStatusFlag]) return false;
    return true;
  });

  if (currentSearchTerm.trim() !== '') {
    const term = currentSearchTerm.trim().toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.authors.toLowerCase().includes(term) ||
      (p.outlet && p.outlet.toLowerCase().includes(term)) ||
      (p.abstract && p.abstract.toLowerCase().includes(term)) ||
      (p.keywords && p.keywords.some(k => k.toLowerCase().includes(term)))
    );
  }
  return filtered;
}

// ===== Debounce utility =====
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ===== Abstract toggle =====
function toggleAbstract(btn) {
  const absDiv = btn.closest('.pub-details').querySelector('.abstract-text');
  const chevron = btn.querySelector('.abstract-chevron');
  const hint = btn.querySelector('.abstract-hint');
  const isOpen = absDiv.style.display !== 'none';
  absDiv.style.display = isOpen ? 'none' : 'block';
  chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(90deg)';
  if (hint) hint.textContent = isOpen ? '(click to expand)' : '(click to collapse)';
}

// ===== Co-author website directory =====
const coAuthorLinks = {
  'Sovannroeun Samreth':    'https://rdb.eva.saitama-u.ac.jp/search/detail.html?systemId=22ca3a9d2e4959a4520e17560c007669&lang=en',
  'Dina Chhorn':            'https://sites.google.com/site/chhorndinaedu',
  'Yuki Kanayama':          'https://sites.google.com/view/yukikanayama',
  'Simona Iammarino':       'https://www.gssi.it/people/professors/lectures-social-science-gssi-cities/item/25922-iammarino-simona',
  'Sumontheany Muth':       'https://www.cdri.org.kh/staff/muth-sumontheany',
  'Daniel Yonto':           'https://scholar.xjtlu.edu.cn/en/persons/DanielYonto/',
  'Yudo Angorro':           'https://www.sbm.itb.ac.id/member/yudo-anggoro/',
  'Vuthoun Khiev':          'https://www.asianvision.org/archives/personnel/mr-khiev-vuthoun',
  'I Younan An':            'https://iyounanan.weebly.com/',
  'Sivly Houy':             'https://cdri.org.kh/staff/houy-sivly',
  'Muny Nhim Kean':         'linkedin.com/in/nhim-kean-muny-a169a5259?originalSubdomain=kh',
  'Sosengphyrun Mao':       'https://cdri.org.kh/staff/mao-sosengphyrun',
  'Summer-Solstice Thomas': 'https://www.linkedin.com/in/summer-solstice-thomas-59654b193/',
  'Singhong Ly':            'https://www.linkedin.com/in/singhong-ly-79b2341bb/',
  'Kimly Lay':              'https://www.linkedin.com/in/lay-kimly-31b496157/',
  'Sopheak Song':           'https://cdri.org.kh/staff/song-sopheak',
  'Ronald A. Ruran':        'https://scholar.google.com/citations?user=ruran',
  'Hang Panha Hour':        'https://www.linkedin.com/in/hour-hang-panha/',
};

// ===== Author display: only "(with X, Y and Z)" — Kosal Nith omitted (his page) =====
function formatAuthorsChicagoMeta(authorsStr) {
  if (!authorsStr) return '';

  const parts = authorsStr.split(/\s*&\s*|\s*,\s*(?=[A-Z])/).map(a => a.trim()).filter(Boolean);
  const coAuthors = parts.filter(a => a !== 'Kosal Nith');

  // Solo author or only Kosal — show nothing
  if (!coAuthors.length) return '';

  // Build co-author list with links
  const isDark = document.documentElement.classList.contains('dark-mode');
  const wrapColor = isDark ? '#d6d6d6' : '#4a5568';

  const coHtml = coAuthors.map(name => {
    const url = coAuthorLinks[name];
    return url
      ? `<a href="${url}" target="_blank" style="color:#9f260b;font-weight:600;text-decoration:none;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">${name}</a>`
      : `<span style="color:#2e2d29;">${name}</span>`;
  });

  // Join: "X" / "X and Y" / "X, Y, and Z" (Oxford comma for 3+)
  let coStr;
  if (coHtml.length === 1) {
    coStr = coHtml[0];
  } else if (coHtml.length === 2) {
    coStr = coHtml[0] + '<span style="color:' + wrapColor + ';"> and </span>' + coHtml[1];
  } else {
    coStr = coHtml.slice(0, -1).join('<span style="color:' + wrapColor + ';">, </span>') + '<span style="color:' + wrapColor + ';">, and </span>' + coHtml[coHtml.length - 1];
  }

  return '<span style="color:' + wrapColor + ';font-weight:400;">(with ' + coStr + ')</span>';
}

// ===== Publication info line formatter — Chicago Manual of Style (17th ed.) =====
//
// Maps every Zotero item type to its CMS citation format.
// pub.zoteroType  — the Zotero type string (see list below); falls back to pub.type
// pub.type        — internal site type: articles | chapters | working | opeds | policy | other | progress
//
// ─── Zotero type → CMS format ─────────────────────────────────────────────────
//
//  artwork            →  Title. Medium. Institution/Collection, City, Year.           [CMS 14.235]
//  audioRecording     →  *Album Title*. Label/Studio, Year.                           [CMS 14.263]
//  bill               →  Bill No., Title, Congress, Session (Year).                   [CMS 14.299]
//  blogPost           →  "Post Title." *Blog Name* (blog). Date.                      [CMS 14.208]
//  book               →  *Title*. Publisher, City, Year.                              [CMS 14.75]
//  bookSection        →  in *Book Title*, ch. N, Editor (ed./eds.), Publisher,
//                          City, Month Year.                                           [CMS 14.103]
//  case               →  Case Name, Reporter Vol Reporter Page (Court Year).          [CMS 14.282]
//  conferencePaper    →  Paper presented at Conference Name, City, Date.              [CMS 14.217]
//  dataset            →  *Dataset Title*. Repository, Year. DOI/URL.                  [CMS 14.257]
//  dictionaryEntry    →  "Entry." *Dictionary Name*, Edition. Publisher, Year.        [CMS 14.232]
//  document           →  Title. Institution, Date.                                    [CMS 14.229]
//  email              →  Author to Recipient, "Subject," Date.                        [CMS 14.211]
//  encyclopediaArticle→  "Article." *Encyclopedia Name*, Edition. Publisher, Year.    [CMS 14.232]
//  film               →  *Title*. Directed by Director. Studio, Year.                 [CMS 14.261]
//  forumPost          →  "Post Title." Forum/Platform. Date.                          [CMS 14.208]
//  hearing            →  Title, Hearing before Committee, Congress, Session (Year).   [CMS 14.302]
//  instantMessage     →  Author to Recipient, Date.                                   [CMS 14.212]
//  interview          →  Interviewee, interview by Interviewer, Date.                 [CMS 14.218]
//  journalArticle     →  *Journal Name*, vol(issue), pages, Month Year.               [CMS 14.170]
//  letter             →  Author to Recipient, Date. Collection, Archive, City.        [CMS 14.111]
//  magazineArticle    →  *Magazine Name*, Date.                                       [CMS 14.188]
//  manuscript         →  "Title." Unpublished manuscript, Institution, Year.          [CMS 14.224]
//  map                →  *Map Title*. Scale. Publisher, Year.                         [CMS 14.237]
//  newspaperArticle   →  *Newspaper Name*, Date, edition/section.                     [CMS 14.191]
//  patent             →  Patent No. Number, filed Date, issued Date.                  [CMS 14.258]
//  podcast            →  "Episode Title." *Podcast Name*. Date.                       [CMS 14.265]
//  preprint           →  Series Name No. N, Month Year. DOI.                          [CMS 14.229]
//  presentation       →  Paper/Talk presented at Conference, City, Date.              [CMS 14.217]
//  radioBroadcast     →  "Episode Title." *Program Name*. Network, Date.              [CMS 14.265]
//  report             →  Report Title. Series No. N. Institution, City, Month Year.   [CMS 14.229]
//  software           →  *Software Name*, version N. Publisher, Year.                 [CMS 14.256]
//  standard           →  Standard No. Title. Organization, Year.                      [CMS 14.258]
//  statute            →  Statute Name, Code Vol § Section (Year).                     [CMS 14.289]
//  thesis             →  "Title." PhD diss./MA thesis, University, Year.              [CMS 14.224]
//  tvBroadcast        →  "Episode Title." *Series Name*, Season N, Ep. N. Network, Date. [CMS 14.265]
//  videoRecording     →  *Title*. Directed by Director. Platform/Distributor, Year.   [CMS 14.263]
//  webpage            →  "Page Title." *Website Name*. Date. URL.                     [CMS 14.207]
//
// ─── Italics rules (CMS) ──────────────────────────────────────────────────────
//   Italic  : journal names, book/album/film/podcast/software titles, periodicals,
//             newspaper/magazine names, encyclopedia/dictionary names, website names
//   Roman   : report series, working paper series, statute names, standard numbers,
//             unpublished manuscript descriptions, archive/collection names
//
// ─── Helper ───────────────────────────────────────────────────────────────────
function _doi(pub) {
  if (!pub.doi) return '';
  return `DOI: <a href="https://doi.org/${pub.doi}" target="_blank" style="color:#b1040e;">${pub.doi}</a>`;
}
function _dateStr(pub) {
  // Prefer explicit month + year_pub; fall back to pub.date
  if (pub.month && pub.year_pub) return `${pub.month} ${pub.year_pub}`;
  if (pub.month && pub.year && pub.year !== 'progress') return `${pub.month} ${pub.year}`;
  return pub.date || '';
}
function _join(arr, sep = ', ') {
  return arr.filter(Boolean).join(sep);
}

// ─── Main formatter ────────────────────────────────────────────────────────────
function formatPubInfo(pub) {
  // Resolve the Zotero type; fall back to internal type
  const ztype = pub.zoteroType || '';

  // ── Artwork  [CMS 14.235] ────────────────────────────────────────────────
  if (ztype === 'artwork') {
    return _join([
      pub.medium || '',
      pub.institution || pub.outlet || '',
      pub.pubCity || '',
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── Audio Recording  [CMS 14.263] ────────────────────────────────────────
  if (ztype === 'audioRecording') {
    return _join([
      pub.outlet ? `<em>${pub.outlet}</em>` : '',   // album/label
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── Bill  [CMS 14.299] ───────────────────────────────────────────────────
  if (ztype === 'bill') {
    // pub.billNumber, pub.legislativeBody, pub.session
    const parts = [];
    if (pub.billNumber)     parts.push(`Bill No. ${pub.billNumber}`);
    if (pub.legislativeBody) parts.push(pub.legislativeBody);
    if (pub.session)         parts.push(`${pub.session} Session`);
    if (_dateStr(pub))       parts.push(`(${_dateStr(pub)})`);
    return parts.join(', ');
  }

  // ── Blog Post  [CMS 14.208] ──────────────────────────────────────────────
  if (ztype === 'blogPost') {
    return _join([
      pub.outlet ? `<em>${pub.outlet}</em> (blog)` : '',
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── Book  [CMS 14.75] ────────────────────────────────────────────────────
  if (ztype === 'book') {
    return _join([
      pub.edition ? `${pub.edition} ed.` : '',
      pub.editor  ? `${pub.editor} (${pub.editorRole || 'ed.'})` : '',
      pub.publisher || pub.outlet || '',
      pub.pubCity || '',
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── Book Section / Chapter  [CMS 14.103] ─────────────────────────────────
  if (ztype === 'bookSection' || pub.type === 'chapters') {
    let html = '';
    if (pub.outlet) html += `in <em>${pub.outlet}</em>`;
    if (pub.chapterNum) html += `, ch. ${pub.chapterNum}`;
    if (pub.editor)     html += `, ${pub.editor} (${pub.editorRole || 'ed.'})`;
    if (pub.edition)    html += `, ${pub.edition} ed.`;
    if (pub.publisher)  html += `, ${pub.publisher}`;
    if (pub.pubCity)    html += `, ${pub.pubCity}`;
    const t = _dateStr(pub);
    if (t) html += `, ${t}`;
    if (pub.pages) html += `, ${pub.pages}`;
    if (pub.doi)   html += `. ${_doi(pub)}`;
    return html;
  }

  // ── Case  [CMS 14.282] ───────────────────────────────────────────────────
  if (ztype === 'case') {
    // pub.reporter, pub.reporterVolume, pub.firstPage, pub.court
    const parts = [];
    if (pub.reporter)       parts.push(`${pub.reporterVolume || ''} ${pub.reporter} ${pub.firstPage || ''}`.trim());
    if (pub.court)          parts.push(pub.court);
    if (_dateStr(pub))      parts.push(_dateStr(pub));
    return parts.join(', ');
  }

  // ── Conference Paper / Presentation  [CMS 14.217] ────────────────────────
  if (ztype === 'conferencePaper' || ztype === 'presentation') {
    const verb = ztype === 'presentation' ? 'Presented at' : 'Paper presented at';
    return _join([
      pub.outlet ? `${verb} ${pub.outlet}` : '',   // conference name in roman (CMS)
      pub.pubCity || '',
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── Dataset  [CMS 14.257] ────────────────────────────────────────────────
  if (ztype === 'dataset') {
    return _join([
      pub.outlet ? `<em>${pub.outlet}</em>` : '',   // repository name italic
      pub.version ? `Version ${pub.version}` : '',
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── Dictionary Entry / Encyclopedia Article  [CMS 14.232] ────────────────
  if (ztype === 'dictionaryEntry' || ztype === 'encyclopediaArticle') {
    return _join([
      pub.outlet ? `<em>${pub.outlet}</em>` : '',   // reference work title italic
      pub.edition ? `${pub.edition} ed.` : '',
      pub.publisher || '',
      pub.pubCity || '',
      _dateStr(pub)
    ]);
  }

  // ── Document / Generic  [CMS 14.229] ─────────────────────────────────────
  if (ztype === 'document') {
    return _join([
      pub.outlet || '',        // institution in roman
      pub.pubCity || '',
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── Email  [CMS 14.211] ──────────────────────────────────────────────────
  if (ztype === 'email') {
    // pub.recipient, pub.subject
    const parts = [];
    if (pub.recipient) parts.push(`to ${pub.recipient}`);
    if (pub.subject)   parts.push(`"${pub.subject}"`);
    if (_dateStr(pub)) parts.push(_dateStr(pub));
    return parts.join(', ');
  }

  // ── Film  [CMS 14.261] ───────────────────────────────────────────────────
  if (ztype === 'film') {
    return _join([
      pub.director ? `Directed by ${pub.director}` : '',
      pub.outlet || pub.publisher || '',   // studio/distributor
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── Forum Post  [CMS 14.208] ─────────────────────────────────────────────
  if (ztype === 'forumPost') {
    return _join([
      pub.outlet || '',   // forum/platform name in roman
      _dateStr(pub)
    ]);
  }

  // ── Hearing  [CMS 14.302] ────────────────────────────────────────────────
  if (ztype === 'hearing') {
    return _join([
      pub.committee ? `Hearing before ${pub.committee}` : '',
      pub.legislativeBody || '',
      pub.session ? `${pub.session} Session` : '',
      _dateStr(pub)
    ]);
  }

  // ── Instant Message  [CMS 14.212] ────────────────────────────────────────
  if (ztype === 'instantMessage') {
    return _join([
      pub.recipient ? `to ${pub.recipient}` : '',
      _dateStr(pub)
    ]);
  }

  // ── Interview  [CMS 14.218] ──────────────────────────────────────────────
  if (ztype === 'interview') {
    // pub.interviewer, pub.interviewType ("personal interview", "telephone", etc.)
    return _join([
      pub.interviewer ? `Interview by ${pub.interviewer}` : (pub.outlet || 'Interview'),
      pub.interviewType || '',
      _dateStr(pub)
    ]);
  }

  // ── Journal Article  [CMS 14.170] ────────────────────────────────────────
  if (ztype === 'journalArticle' || pub.type === 'articles') {
    const parts = [];
    if (pub.outlet) parts.push(`<em>${pub.outlet}</em>`);

    if (pub.forthcoming) {
      const yr = pub.year && pub.year !== 'progress' ? pub.year : '';
      parts.push('forthcoming' + (yr ? ' ' + yr : ''));
    } else {
      if (pub.vol)   parts.push(pub.issue ? `${pub.vol}(${pub.issue})` : String(pub.vol));
      if (pub.pages) parts.push(pub.pages);
      const t = _dateStr(pub);
      if (t) parts.push(t);
    }
    const d = _doi(pub);
    if (d) parts.push(d);
    return parts.join(', ');
  }

  // ── Letter  [CMS 14.111] ─────────────────────────────────────────────────
  if (ztype === 'letter') {
    // pub.recipient, pub.archive, pub.archiveLocation (city)
    return _join([
      pub.recipient ? `to ${pub.recipient}` : '',
      _dateStr(pub),
      pub.archive || pub.outlet || '',          // collection/archive in roman
      pub.archiveLocation || pub.pubCity || ''
    ]);
  }

  // ── Magazine Article  [CMS 14.188] ───────────────────────────────────────
  if (ztype === 'magazineArticle') {
    return _join([
      pub.outlet ? `<em>${pub.outlet}</em>` : '',   // magazine italic
      _dateStr(pub),
      pub.pages ? pub.pages : '',
      _doi(pub)
    ]);
  }

  // ── Manuscript  [CMS 14.224] ─────────────────────────────────────────────
  if (ztype === 'manuscript') {
    return _join([
      'Unpublished manuscript',
      pub.outlet || pub.institution || '',
      pub.pubCity || '',
      _dateStr(pub)
    ]);
  }

  // ── Map  [CMS 14.237] ────────────────────────────────────────────────────
  if (ztype === 'map') {
    return _join([
      pub.scale ? `Scale ${pub.scale}` : '',
      pub.publisher || pub.outlet || '',
      pub.pubCity || '',
      _dateStr(pub)
    ]);
  }

  // ── Newspaper Article  [CMS 14.191] ──────────────────────────────────────
  if (ztype === 'newspaperArticle') {
    return _join([
      pub.outlet ? `<em>${pub.outlet}</em>` : '',   // newspaper italic
      _dateStr(pub),
      pub.section ? pub.section : '',
      pub.edition ? pub.edition : '',
      _doi(pub)
    ]);
  }

  // ── Patent  [CMS 14.258] ─────────────────────────────────────────────────
  if (ztype === 'patent') {
    // pub.patentNumber, pub.filingDate, pub.issueDate
    const parts = [];
    if (pub.patentNumber) parts.push(`Patent No. ${pub.patentNumber}`);
    if (pub.filingDate)   parts.push(`filed ${pub.filingDate}`);
    const t = _dateStr(pub);
    if (t) parts.push(`issued ${t}`);
    return parts.join(', ');
  }

  // ── Podcast  [CMS 14.265] ────────────────────────────────────────────────
  if (ztype === 'podcast') {
    return _join([
      pub.outlet ? `<em>${pub.outlet}</em>` : '',   // podcast title italic
      pub.episodeNumber ? `Episode ${pub.episodeNumber}` : '',
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── Preprint  [CMS 14.229 — treat like working paper] ────────────────────
  if (ztype === 'preprint') {
    const series = pub.seriesNum
      ? `${pub.seriesName || pub.outlet || 'Preprint'} No. ${pub.seriesNum}`
      : (pub.seriesName || pub.outlet || 'Preprint');
    return _join([series, _dateStr(pub), _doi(pub)]);
  }

  // ── Radio Broadcast  [CMS 14.265] ────────────────────────────────────────
  if (ztype === 'radioBroadcast') {
    return _join([
      pub.outlet ? `<em>${pub.outlet}</em>` : '',   // program title italic
      pub.network || '',
      _dateStr(pub)
    ]);
  }

  // ── Report  [CMS 14.229] ─────────────────────────────────────────────────
  // Series name and report number in roman (institutional publication)
  if (ztype === 'report') {
    const seriesStr = pub.seriesNum
      ? `${pub.seriesName || pub.outlet || ''} No. ${pub.seriesNum}`
      : (pub.seriesName || pub.outlet || '');
    return _join([
      seriesStr,                    // roman
      pub.institution || '',
      pub.pubCity || '',
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── Software  [CMS 14.256] ───────────────────────────────────────────────
  if (ztype === 'software') {
    return _join([
      pub.version ? `Version ${pub.version}` : '',
      pub.publisher || pub.outlet || '',
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── Standard  [CMS 14.258] ───────────────────────────────────────────────
  if (ztype === 'standard') {
    // pub.number, pub.organization
    return _join([
      pub.standardNumber ? `No. ${pub.standardNumber}` : '',
      pub.organization || pub.outlet || '',
      _dateStr(pub)
    ]);
  }

  // ── Statute  [CMS 14.289] ────────────────────────────────────────────────
  // pub.code, pub.codeVolume, pub.section
  if (ztype === 'statute') {
    const parts = [];
    if (pub.code)        parts.push(pub.code);
    if (pub.codeVolume && pub.section)
      parts.push(`${pub.codeVolume} § ${pub.section}`);
    if (_dateStr(pub)) parts.push(`(${_dateStr(pub)})`);
    return parts.join(', ');
  }

  // ── Thesis / Dissertation  [CMS 14.224] ──────────────────────────────────
  if (ztype === 'thesis') {
    // pub.thesisType: "PhD dissertation" | "MA thesis" | etc.
    return _join([
      pub.thesisType || 'PhD dissertation',
      pub.outlet || pub.institution || '',    // university in roman
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── TV Broadcast  [CMS 14.265] ───────────────────────────────────────────
  if (ztype === 'tvBroadcast') {
    return _join([
      pub.outlet ? `<em>${pub.outlet}</em>` : '',   // series italic
      pub.season  ? `Season ${pub.season}`  : '',
      pub.episodeNumber ? `Ep. ${pub.episodeNumber}` : '',
      pub.network || '',
      _dateStr(pub)
    ]);
  }

  // ── Video Recording  [CMS 14.263] ────────────────────────────────────────
  if (ztype === 'videoRecording') {
    return _join([
      pub.director ? `Directed by ${pub.director}` : '',
      pub.publisher || pub.outlet || '',
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── Web Page  [CMS 14.207] ───────────────────────────────────────────────
  if (ztype === 'webpage') {
    return _join([
      pub.outlet ? `<em>${pub.outlet}</em>` : '',   // website name italic
      _dateStr(pub),
      pub.accessDate ? `Accessed ${pub.accessDate}` : ''
    ]);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Internal site types (no zoteroType set) — kept for backward compatibility
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Working paper (internal)  [CMS 14.229] ────────────────────────────────
  if (pub.type === 'working') {
    const parts = [];
    if (pub.underReview && pub.seriesName) {
      // Under review: journal name italic
      parts.push(`Submitted to <em>${pub.seriesName.replace(/^Submitted to /i, '')}</em>`);
    } else {
      const series = pub.seriesNum
        ? `${pub.seriesName || pub.outlet || ''} No. ${pub.seriesNum}`
        : (pub.seriesName || pub.outlet || '');
      if (series) parts.push(series);   // roman
    }
    const t = _dateStr(pub);
    if (t) parts.push(t);
    const d = _doi(pub);
    if (d) parts.push(d);
    return parts.join(', ');
  }

  // ── Op-Ed / Commentary (internal)  [CMS 14.191 / 14.188] ─────────────────
  if (pub.type === 'opeds') {
    return _join([
      pub.outlet ? `<em>${pub.outlet}</em>` : '',   // periodical italic
      _dateStr(pub),
      _doi(pub)
    ]);
  }

  // ── Policy brief / Other / Work in progress (internal)  [CMS 14.229] ─────
  return _join([
    pub.outlet || '',   // institutional name in roman
    _dateStr(pub),
    _doi(pub)
  ]);
}

/* ── Parse any date string into a sortable timestamp ──
   Priority within a year (desc = newest first):
     1. forthcoming       → Dec 31 23:59:59  TOP (date unknown/future)
     2. "22 Mar 2026"     → exact day
     3. "June 2022" / "Oct 2025" → 1st of month (day unknown)
     4. "2026" year-only  → Jan 1 00:00:00   BOTTOM (month+day unknown) */
function parsePublicationDate(pub) {
  const raw = (pub.date || '').trim();
  const yr  = parseInt(pub.year) || new Date().getFullYear();

  /* Check forthcoming flag OR "forthcoming" in date string → top of year group */
  if (pub.forthcoming || /forthcoming/i.test(raw)) {
    return new Date(yr, 11, 31, 23, 59, 59).getTime();
  }

  if (!raw) return new Date(yr, 0, 1).getTime();

  const MONTHS = { january:0,jan:0,february:1,feb:1,march:2,mar:2,april:3,apr:3,may:4,june:5,jun:5,july:6,jul:6,august:7,aug:7,september:8,sep:8,sept:8,october:9,oct:9,november:10,nov:10,december:11,dec:11 };
  const dmy = raw.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (dmy) { const m = MONTHS[dmy[2].toLowerCase()]; if (m !== undefined) return new Date(parseInt(dmy[3]), m, parseInt(dmy[1])).getTime(); }
  const my = raw.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (my) { const m = MONTHS[my[1].toLowerCase()]; if (m !== undefined) return new Date(parseInt(my[2]), m, 1).getTime(); }
  const y = raw.match(/^(\d{4})$/);
  if (y) return new Date(parseInt(y[1]), 0, 1).getTime();
  const d = new Date(raw); if (!isNaN(d.getTime())) return d.getTime();
  return new Date(yr, 0, 1).getTime();
}

function renderPublicationsWithPagination() {
  const filtered = getFilteredPublications();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  if (totalPages === 0) currentPage = 1;
  else if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  /* Sort by full date before slicing — forthcoming top, year-only bottom */
  const dateSorted = [...filtered].sort((a, b) => {
    const da = parsePublicationDate(a), db = parsePublicationDate(b);
    return sortOrder === 'desc' ? db - da : da - db;
  });

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = dateSorted.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const grouped = {};
  pageItems.forEach(p => { if (!grouped[p.year]) grouped[p.year] = []; grouped[p.year].push(p); });
  /* Year order derived from sorted list — no hardcoded array needed */
  const yearOrder = [];
  pageItems.forEach(p => { if (!yearOrder.includes(p.year)) yearOrder.push(p.year); });

  let html = '';
  for (let y of yearOrder) {
    if (!grouped[y]) continue;
    const yearLabel = y === 'progress' ? 'Work in Progress' : y;
    html += `<div class="year-header">${yearLabel}</div>`;
    for (let pub of grouped[y]) {
      html += `
        <div class="publication">
          <div class="pub-details">
            <div class="pub-title">
              <a href="research_main/${titleToSlug(pub.title)}.html" class="pub-detail-link" data-pub-idx="${publicationsData.indexOf(pub)}">${pub.title}</a>
            </div>
            ${formatAuthorsChicagoMeta(pub.authors) ? `<div class="pub-meta">${formatAuthorsChicagoMeta(pub.authors)}</div>` : ''}
            <div class="pub-outlet">${formatPubInfo(pub)}</div>
            <div class="pub-type-label">
              <i class="${getTypeIcon(pub)}"></i> ${getTypeLabel(pub)}
              ${pub.link ? `<a class="link-btn link-btn--inline" href="${pub.link}" target="_blank"><i class="fas fa-arrow-up-right-from-square"></i> Open</a>` : ''}
            </div>

            <div class="card-bottom">

              ${getStatusBadges(pub) ? `<div class="badge-row">${getStatusBadges(pub)}</div>` : ''}

              <div class="pub-actions">
                ${pub.abstract ? `
                <button class="abstract-toggle-btn" onclick="toggleAbstract(this)">
                  <i class="fas fa-chevron-right abstract-chevron"></i>
                  <strong>Abstract</strong>
                  <span class="abstract-hint">(click to expand)</span>
                </button>` : ''}
              </div>

              ${pub.abstract ? `<div class="abstract-text" style="display:none;">${pub.abstract}</div>` : ''}

              ${pub.resources && pub.resources.length ? `
              <div class="pub-resources">
                ${pub.resources.map(r => {
                  let rtype = 'default';
                  if (r.icon.includes('fa-file-pdf'))               rtype = 'paper';
                  else if (r.icon.includes('fa-person-chalkboard')) rtype = 'slides';
                  else if (r.icon.includes('fa-code'))               rtype = 'replication';
                  else if (r.icon.includes('fa-x-twitter'))          rtype = 'thread';
                  else if (r.icon.includes('fa-file-lines'))         rtype = 'appendix';
                  else if (r.icon.includes('fa-video') ||
                           r.icon.includes('fa-youtube') ||
                           r.icon.includes('fa-play'))               rtype = 'video';
                  else if (r.icon.includes('fa-file-contract') ||
                           r.icon.includes('fa-file-circle-check') ||
                           r.icon.includes('fa-book-open'))          rtype = 'published';
                  const iconClass = r.icon.startsWith('fa-brands') ? r.icon : `fas ${r.icon}`;
                  return r.url
                    ? `<a class="resource-btn resource-btn--${rtype}" href="${r.url}" target="_blank" ${pub.downloads !== undefined ? `data-track-dl data-pub-slug="${slugify(pub.title)}"` : ''}><i class="${iconClass}"></i>${r.label}</a>`
                    : `<span class="resource-btn resource-btn--inactive resource-btn--${rtype}"><i class="${iconClass}"></i>${r.label}</span>`;
                }).join('')}
              </div>` : ''}

              ${pub.keywords && pub.keywords.length ? `
              <div class="pub-keywords">
                ${pub.keywords.slice(0, 3).map((k, i) =>
                  `<span class="pub-kw kw-clickable" role="button" tabindex="0" data-keyword="${k.replace(/"/g,'&quot;')}" title="Find all publications with keyword: ${k.replace(/"/g,'&quot;')}"><span class="pub-kw-dot ${pub.kwStrength[i] || 'none'}"></span>${k}</span>`
                ).join('')}
              </div>` : ''}

            </div>
          </div>
          ${pub.downloads !== undefined ? `
          <div class="right-stats">
            <div class="download-circle" id="dlcircle-${slugify(pub.title)}">
              <div class="dl-num" id="dlnum-${slugify(pub.title)}">–</div>
              <div class="dl-label">Downloads</div>
            </div>
          </div>` : ''}
        </div>`;
    }
  }

  document.getElementById('publicationsContainer').innerHTML = html ||
    '<div style="padding: 2rem; text-align: center; color: #6c7a8e;">No publications match the selected filters and search term.</div>';

  const start = totalItems === 0 ? 0 : startIdx + 1;
  const end = Math.min(startIdx + pageItems.length, totalItems);
  document.getElementById('resultCount').innerText =
    totalItems === 0 ? '0 results' : `${start} - ${end} out of ${totalItems} results`;

  var chipBar = document.getElementById('statusChipBar');
  if (!chipBar) {
    chipBar = document.createElement('div');
    chipBar.id = 'statusChipBar';
    chipBar.className = 'status-chip-bar';
    var sortBarEl = document.querySelector('.sort-bar');
    if (sortBarEl) sortBarEl.insertAdjacentElement('afterend', chipBar);
  }
  if (activeStatusFlag) {
    var bd = STAGE_BADGES.find(function(s){ return s.flag === activeStatusFlag; });
    chipBar.innerHTML = bd ? '<span class="active-status-chip"><i class="' + bd.icon + '"></i>' + bd.label + '<span class="chip-clear-btn" id="clearStatusChip" title="Clear" role="button" tabindex="0" aria-label="Clear filter">&#x2715;</span></span>' : '';
    var cb = document.getElementById('clearStatusChip');
    if (cb) {
      cb.onclick = function(){ activeStatusFlag = null; currentPage = 1; renderPublicationsWithPagination(); };
      cb.onkeydown = function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cb.onclick(); } };
    }
  } else { chipBar.innerHTML = ''; }

  renderPaginationControls(totalPages);
  // Refresh live download counts for newly rendered circles
  if (typeof loadAllDownloadCounts === 'function') loadAllDownloadCounts();
}

function renderPaginationControls(totalPages) {
  const container = document.getElementById('paginationContainer');
  if (!container) return;
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  let html = '';
  if (currentPage > 1) html += `<a data-page="${currentPage - 1}"><i class="fas fa-chevron-left"></i> Previous</a>`;
  else html += `<span class="disabled"><i class="fas fa-chevron-left"></i> Previous</span>`;

  let startPage = Math.max(1, currentPage - 3);
  let endPage = Math.min(totalPages, startPage + 6);
  if (endPage - startPage < 6 && startPage > 1) startPage = Math.max(1, endPage - 6);

  if (startPage > 1) html += `<a data-page="1">1</a>`;
  if (startPage > 2) html += `<span class="ellipsis">...</span>`;
  for (let i = startPage; i <= endPage; i++) {
    if (i === currentPage) html += `<span class="active-page">${i}</span>`;
    else html += `<a data-page="${i}">${i}</a>`;
  }
  if (endPage < totalPages - 1) html += `<span class="ellipsis">...</span>`;
  if (endPage < totalPages) html += `<a data-page="${totalPages}">${totalPages}</a>`;

  if (currentPage < totalPages) html += `<a data-page="${currentPage + 1}">Next <i class="fas fa-chevron-right"></i></a>`;
  else html += `<span class="disabled">Next <i class="fas fa-chevron-right"></i></span>`;

  container.innerHTML = html;
  container.querySelectorAll('a[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const newPage = parseInt(link.getAttribute('data-page'), 10);
      if (!isNaN(newPage) && newPage !== currentPage) {
        currentPage = newPage;
        renderPublicationsWithPagination();
      }
    });
  });
}

// ===== Rendering: Sidebar Filters =====

function renderSdgList() {
  const container = document.getElementById('sdgList');
  if (!container) return;

  // Auto-compute SDG counts from publication data
  const sdgCounts = {};
  (publicationsData || []).forEach(p => {
    if (p.sdgs) p.sdgs.forEach(s => { sdgCounts[s] = (sdgCounts[s] || 0) + 1; });
  });

  let html = '';
  sdgItems.forEach((item, idx) => {
    const count = sdgCounts[item.label] || 0;
    const hiddenClass = idx >= 6 ? 'sdg-hidden' : '';
    html += `<label class="custom-check ${hiddenClass}">
      <input type="checkbox" class="sdg-checkbox" data-sdg="${item.label}">
      <span class="check-box"></span>
      <span class="custom-check-left">
        <span>${item.label}</span>
        <span class="count-badge">(${count})</span>
      </span>
    </label>`;
  });
  container.innerHTML = html;

  let expanded = false;
  const toggleBtn = document.getElementById('toggleSdgBtn');
  toggleBtn.innerText = 'Show more ›';
  toggleBtn.onclick = () => {
    expanded = !expanded;
    const allItems = document.querySelectorAll('#sdgList .custom-check');
    if (expanded) {
      allItems.forEach(item => item.classList.remove('sdg-hidden'));
      toggleBtn.innerText = 'Show less';
    } else {
      allItems.forEach((item, idx) => {
        if (idx >= 6) item.classList.add('sdg-hidden');
        else item.classList.remove('sdg-hidden');
      });
      toggleBtn.innerText = 'Show more ›';
    }
  };
}

function renderTypeList() {
  const container = document.getElementById('fullTypeList');
  if (!container) return;

  // Compute live counts per dataFilter bucket
  const bucketCounts = {};
  publicationsData.forEach(p => {
    if (p.type) bucketCounts[p.type] = (bucketCounts[p.type] || 0) + 1;
  });

  // Deduplicate by dataFilter (so working_paper/policy_brief merge into 'reports',
  // op_ed merges into 'opeds', other_publication merges into 'documents').
  // Result: exactly 38 unique sidebar entries (37 Zotero types + Work in progress).
  const seen = new Set();
  const deduped = [];
  allPublicationTypes.forEach(t => {
    const k = t.dataFilter || t.key;
    if (!seen.has(k)) { seen.add(k); deduped.push({ ...t, count: bucketCounts[k] || 0 }); }
  });

  // Only types that have publications — zero-count types are never shown.
  // Sorted A → Z by label.
  const withPubs = deduped
    .filter(t => t.count > 0)
    .sort((a, b) => a.label.localeCompare(b.label));

  // Show first 6 by default; the rest are hidden until "Show all X types ›" is clicked.
  const VISIBLE_DEFAULT = 6;
  const visible = withPubs.slice(0, VISIBLE_DEFAULT);
  const hidden  = withPubs.slice(VISIBLE_DEFAULT);

  function makeRow(type) {
    return `<label class="custom-check" data-type-key="${type.key}">
      <input type="checkbox" data-filter="${type.dataFilter || type.key}" data-type-label="${type.label}">
      <span class="check-box"></span>
      <span class="custom-check-left">
        <span>${type.label}</span>
        <span class="count-badge">(${type.count})</span>
      </span>
    </label>`;
  }

  let html = '';
  visible.forEach(t => { html += makeRow(t); });

  if (hidden.length) {
    html += `<div id="typeZeroGroup" style="display:none;">`;
    hidden.forEach(t => { html += makeRow(t); });
    html += `</div>`;
  }

  container.innerHTML = html;

  const showMoreBtn = document.getElementById('showMoreTypesBtn');
  if (showMoreBtn) {
    if (!hidden.length) {
      // All active types fit within the default — no button needed.
      showMoreBtn.style.display = 'none';
    } else {
      showMoreBtn.style.display = '';
      let expanded = false;
      showMoreBtn.innerText = `Show all ${withPubs.length} types ›`;
      showMoreBtn.onclick = () => {
        expanded = !expanded;
        const grp = document.getElementById('typeZeroGroup');
        if (grp) grp.style.display = expanded ? 'block' : 'none';
        showMoreBtn.innerText = expanded
          ? 'Show fewer types'
          : `Show all ${withPubs.length} types ›`;
      };
    }
  }
}

// ===== Year Slider =====

function updateYearSliderUI() {
  const minVal = parseInt(document.getElementById('yearSliderMin').value);
  const maxVal = parseInt(document.getElementById('yearSliderMax').value);
  const pctMin = (minVal - YEAR_MIN_BOUND) / (YEAR_MAX_BOUND - YEAR_MIN_BOUND) * 100;
  const pctMax = (maxVal - YEAR_MIN_BOUND) / (YEAR_MAX_BOUND - YEAR_MIN_BOUND) * 100;

  // Hide floating pill labels (replaced by static minmax display)
  const minLabel = document.getElementById('yearMinLabel');
  const maxLabel = document.getElementById('yearMaxLabel');
  if (minLabel) minLabel.style.display = 'none';
  if (maxLabel) maxLabel.style.display = 'none';

  // Update static min/max labels below the track to show selected years
  const minStatic = document.getElementById('yearMinStatic');
  const maxStatic = document.getElementById('yearMaxStatic');
  if (minStatic) { minStatic.textContent = minVal; minStatic.style.color = minVal > YEAR_MIN_BOUND ? '#b1040e' : ''; minStatic.style.fontWeight = minVal > YEAR_MIN_BOUND ? '700' : ''; }
  if (maxStatic) { maxStatic.textContent = maxVal; maxStatic.style.color = maxVal < YEAR_MAX_BOUND ? '#b1040e' : ''; maxStatic.style.fontWeight = maxVal < YEAR_MAX_BOUND ? '700' : ''; }

  // Fill bar
  const fill = document.getElementById('yearFill');
  if (fill) { fill.style.left = pctMin + '%'; fill.style.width = (pctMax - pctMin) + '%'; }

  yearRangeMin = minVal;
  yearRangeMax = maxVal;
}

function initYearSlider() {
  const sliderMin = document.getElementById('yearSliderMin');
  const sliderMax = document.getElementById('yearSliderMax');
  sliderMin.addEventListener('input', () => {
    if (parseInt(sliderMin.value) > parseInt(sliderMax.value)) sliderMin.value = sliderMax.value;
    updateYearSliderUI();
    updateFiltersAndResetPage();
  });
  sliderMax.addEventListener('input', () => {
    if (parseInt(sliderMax.value) < parseInt(sliderMin.value)) sliderMax.value = sliderMin.value;
    updateYearSliderUI();
    updateFiltersAndResetPage();
  });
  updateYearSliderUI();
}

// ===== Event Listeners =====

function updateFiltersAndResetPage() {
  currentPage = 1;
  renderPublicationsWithPagination();
}

function initEventListeners() {
  // Debounced search input
  document.getElementById('searchInput').addEventListener('input', debounce((e) => {
    currentSearchTerm = e.target.value;
    currentPage = 1;
    renderPublicationsWithPagination();
  }, 200));

  document.getElementById('fullTypeList').addEventListener('change', updateFiltersAndResetPage);
  document.getElementById('oaFilterCheckbox').addEventListener('change', updateFiltersAndResetPage);

  // Language filter checkboxes
  document.querySelectorAll('input[data-lang]').forEach(cb => {
    cb.addEventListener('change', updateFiltersAndResetPage);
  });

  // SDG filter — event delegation on the container (handles dynamic checkboxes)
  const sdgContainer = document.getElementById('sdgList');
  if (sdgContainer) {
    sdgContainer.addEventListener('change', (e) => {
      if (e.target.classList.contains('sdg-checkbox')) {
        updateFiltersAndResetPage();
      }
    });
  }

  // Top pill buttons
  document.querySelectorAll('.type-pill[data-filter-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      const filterVal = btn.getAttribute('data-filter-type');
      document.querySelectorAll('#fullTypeList input').forEach(cb => cb.checked = false);
      if (filterVal !== 'all') {
        const targetCb = document.querySelector(`#fullTypeList input[data-filter="${filterVal}"]`);
        if (targetCb) targetCb.checked = true;
      }
      document.getElementById('oaFilterCheckbox').checked = false;
      document.getElementById('yearSliderMin').value = YEAR_MIN_BOUND;
      document.getElementById('yearSliderMax').value = YEAR_MAX_BOUND;
      updateYearSliderUI();
      updateFiltersAndResetPage();
    });
  });

  document.getElementById('publicationsContainer').addEventListener('click', function(e) {
    var badge = e.target.closest('.badge-clickable');
    if (!badge) return;
    var flag = badge.getAttribute('data-status-flag');
    if (!flag) return;
    activeStatusFlag = (activeStatusFlag === flag) ? null : flag;
    currentPage = 1;
    renderPublicationsWithPagination();
    var anchor = document.querySelector('.sort-bar') || document.getElementById('publicationsContainer');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // More dropdown items
  document.querySelectorAll('.more-item').forEach(item => {
    item.addEventListener('click', () => {
      const type = item.getAttribute('data-more-type');
      document.querySelectorAll('#fullTypeList input').forEach(cb => cb.checked = false);
      const targetCb = document.querySelector(`#fullTypeList input[data-filter="${type}"]`);
      if (targetCb) targetCb.checked = true;
      document.getElementById('oaFilterCheckbox').checked = false;
      document.getElementById('yearSliderMin').value = YEAR_MIN_BOUND;
      document.getElementById('yearSliderMax').value = YEAR_MAX_BOUND;
      updateYearSliderUI();
      updateFiltersAndResetPage();
      document.getElementById('moreDropdown').classList.remove('open');
    });
  });

  document.getElementById('moreButton').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('moreDropdown').classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.more-wrapper')) document.getElementById('moreDropdown').classList.remove('open');
  });

  // ── Mobile filter drawer (tablet & phone) ──────────────────────────────
  (function initMobileDrawer() {
    const toggleBtn  = document.getElementById('mobileFilterToggle');
    const backdrop   = document.getElementById('filterBackdrop');
    const sidebar    = document.querySelector('.research-sidebar');
    const closeBtn   = document.getElementById('filterCloseBtn');

    if (!toggleBtn || !backdrop || !sidebar) return;

    function openDrawer() {
      sidebar.classList.add('filter-open');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      sidebar.classList.remove('filter-open');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', openDrawer);
    backdrop.addEventListener('click', closeDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Close on filter change on mobile
    sidebar.addEventListener('change', () => {
      if (window.innerWidth <= 900) setTimeout(closeDrawer, 300);
    });
  })();
  if (sortBtn) {
    sortBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
      const label = sortOrder === 'desc' ? 'Publication Year, Title <i class="fas fa-chevron-down" id="sortIcon"></i>'
                                         : 'Publication Year, Title <i class="fas fa-chevron-up" id="sortIcon"></i>';
      sortBtn.innerHTML = label;
      currentPage = 1;
      renderPublicationsWithPagination();
    });
  }

  // ── Sidebar hide / show toggle (desktop only) ────────────────────────────
  const toggleBtn   = document.getElementById('sidebarToggleBtn');
  const toggleIcon  = document.getElementById('sidebarToggleIcon');
  const toggleLabel = document.getElementById('sidebarToggleLabel');
  const showBtn     = document.getElementById('sidebarShowBtn');
  const sidebar     = document.querySelector('.research-sidebar');
  const twoCol      = document.querySelector('.two-columns');

  function setSidebarCollapsed(collapsed) {
    if (!sidebar) return;
    if (collapsed) {
      sidebar.classList.add('sidebar-collapsed');
      if (twoCol) twoCol.classList.add('sidebar-collapsed-state');
      if (toggleIcon)  toggleIcon.className  = 'fas fa-eye';
      if (toggleLabel) toggleLabel.textContent = 'Show filters';
    } else {
      sidebar.classList.remove('sidebar-collapsed');
      if (twoCol) twoCol.classList.remove('sidebar-collapsed-state');
      if (toggleIcon)  toggleIcon.className  = 'fas fa-eye-slash';
      if (toggleLabel) toggleLabel.textContent = 'Hide filters';
    }
    try { sessionStorage.setItem('sidebarCollapsed', collapsed ? '1' : '0'); } catch(e) {}
  }

  // "Hide filters" button inside the sidebar
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      setSidebarCollapsed(!sidebar.classList.contains('sidebar-collapsed'));
    });
  }

  // "Show filters" button in the main content area
  if (showBtn) {
    showBtn.addEventListener('click', () => setSidebarCollapsed(false));
  }

  // Restore saved state
  try {
    setSidebarCollapsed(sessionStorage.getItem('sidebarCollapsed') === '1');
  } catch(e) { setSidebarCollapsed(false); }
  // ─────────────────────────────────────────────────────────────────────────

  // Export button — builds CSV from currently filtered results
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const filtered = getFilteredPublications();
      if (!filtered.length) { alert('No results to export.'); return; }
      const headers = ['Title','Authors','Year','Date','Outlet','Type','OA','Link','Abstract'];
      const escape = v => `"${String(v || '').replace(/"/g, '""')}"`;
      const rows = filtered.map(p => [
        escape(p.title),
        escape(p.authors),
        escape(p.year),
        escape(p.date),
        escape(p.outlet),
        escape(p.type),
        escape(p.oa ? 'Yes' : 'No'),
        escape(p.link),
        escape(p.abstract)
      ].join(','));
      const csv = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'kosalnith_research_output.csv';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
    });
  }


  document.getElementById('publicationsContainer').addEventListener('click', (e) => {
    // Keyword click
    const kw = e.target.closest('.kw-clickable');
    if (kw) {
      e.preventDefault();
      e.stopPropagation();
      filterByKeyword(kw.getAttribute('data-keyword'));
      return;
    }
    // Publication detail link
    const link = e.target.closest('.pub-detail-link');
    if (link) {
      e.preventDefault();
      const idx = parseInt(link.getAttribute('data-pub-idx'));
      showDetail(idx);
    }
  });

  // Keyword clicks on the detail page
  document.getElementById('pubDetailView').addEventListener('click', (e) => {
    const kw = e.target.closest('.kw-clickable');
    if (kw) {
      e.preventDefault();
      e.stopPropagation();
      filterByKeyword(kw.getAttribute('data-keyword'));
    }
  });
}

// ===== Detail Page — URL routing =====

// Build a clean URL slug from a publication title
function titleToSlug(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 80)
    .replace(/-+$/, '');
}

// Find publication index by slug
function findIdxBySlug(slug) {
  return publicationsData.findIndex(p => titleToSlug(p.title) === slug);
}

// Update <meta> OG tags for social sharing
function updateMetaTags(pub) {
  const base = 'https://kosalnith.github.io/research_main.html';
  const slug = titleToSlug(pub.title);
  const url  = `${base}?pub=${slug}`;
  const desc = pub.abstract
    ? pub.abstract.substring(0, 200) + '…'
    : `${pub.authors}. ${pub.outlet || ''}. ${pub.year || ''}`;

  // Each publication has its own ogImage field pointing to a unique branded card
  const ogImage = pub.ogImage || 'https://kosalnith.github.io/static/img/og-research.png';

  const setMeta = (sel, val) => {
    let el = document.querySelector(sel);
    if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
    el.setAttribute('content', val);
  };
  const setMetaProp = (prop, val) => setMeta(`meta[property="${prop}"]`, val);
  const setMetaName  = (name, val) => setMeta(`meta[name="${name}"]`, val);

  document.title = pub.title + ' · Kosal Nith';

  setMetaProp('og:title',           pub.title + ' · Kosal Nith');
  setMetaProp('og:description',     desc);
  setMetaProp('og:url',             url);
  setMetaProp('og:type',            'article');
  setMetaProp('og:image',           ogImage);
  setMetaProp('og:image:width',     '1200');
  setMetaProp('og:image:height',    '630');
  setMetaProp('og:site_name',       'Kosal Nith · Research Portal');

  setMetaName('twitter:card',        'summary_large_image');
  setMetaName('twitter:title',       pub.title + ' · Kosal Nith');
  setMetaName('twitter:description', desc);
  setMetaName('twitter:image',       ogImage);
  setMetaName('twitter:site',        '@kosalnith');

  // Update canonical href
  let canon = document.querySelector('link[rel="canonical"]');
  if (!canon) { canon = document.createElement('link'); canon.rel = 'canonical'; document.head.appendChild(canon); }
  canon.href = url;
}

function showList() {
  document.getElementById('pubDetailView').style.display = 'none';
  document.getElementById('pubListView').style.display  = 'block';
  window.scrollTo(0, 0);
  document.title = 'Kosal Nith · Research output';
  // Strip ?pub= query param, keep base path
  history.pushState({ view: 'list' }, '', window.location.pathname);
  // Restore default meta
  const setMeta = (sel, val) => { const el = document.querySelector(sel); if (el) el.setAttribute('content', val); };
  setMeta('meta[property="og:title"]',       'Research output · Kosal Nith');
  setMeta('meta[property="og:description"]', 'Research output by Kosal Nith — economist and researcher at CDRI.');
  setMeta('meta[property="og:url"]',         'https://kosalnith.github.io/research_main.html');
  setMeta('meta[property="og:image"]',       'https://kosalnith.github.io/static/img/og-research.png');
  setMeta('meta[name="twitter:image"]',      'https://kosalnith.github.io/static/img/og-research.png');
  setMeta('meta[name="twitter:card"]',       'summary_large_image');
}

function showDetail(idx) {
  const pub = publicationsData[idx];
  if (!pub) return;
  currentDetailIdx = idx;
  document.getElementById('pubListView').style.display   = 'none';
  document.getElementById('pubDetailView').style.display = 'block';
  window.scrollTo(0, 0);
  document.title = pub.title + ' · Kosal Nith';

  // Push ?pub=slug to URL (works on both file:// and https://)
  const slug    = titleToSlug(pub.title);
  const newUrl  = `${window.location.pathname}?pub=${slug}`;
  history.pushState({ view: 'detail', idx }, '', newUrl);
  updateMetaTags(pub);

  // Build shareable URL
  const shareUrl = `https://kosalnith.github.io/research_main.html?pub=${slug}`;

  // Prev / Next nav
  const prevPub = publicationsData[idx - 1];
  const nextPub = publicationsData[idx + 1];
  document.getElementById('detailNavRow').innerHTML = `
    <button class="detail-nav-btn ${!prevPub ? 'disabled' : ''}" onclick="${prevPub ? `showDetail(${idx - 1})` : ''}">
      <i class="fas fa-chevron-left"></i>
      <span class="nav-label">Previous</span>
    </button>
    <button class="detail-back-btn" onclick="showList()" style="margin:0;white-space:nowrap;">
      <i class="fas fa-list"></i> All publications
    </button>
    <button class="detail-nav-btn ${!nextPub ? 'disabled' : ''}" onclick="${nextPub ? `showDetail(${idx + 1})` : ''}" style="flex-direction:row-reverse;text-align:right;">
      <span class="nav-label">Next</span>
      <i class="fas fa-chevron-right"></i>
    </button>
    <div class="detail-share-inline">
      <span class="detail-share-label"><i class="fas fa-share-nodes"></i> Share</span>
      <a class="detail-share-inline-btn" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(pub.title)}&url=${encodeURIComponent(shareUrl)}" target="_blank" title="Share on X / Twitter">
        <i class="fab fa-x-twitter"></i>
      </a>
      <a class="detail-share-inline-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}" target="_blank" title="Share on LinkedIn">
        <i class="fab fa-linkedin-in"></i>
      </a>
      <a class="detail-share-inline-btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}" target="_blank" title="Share on Facebook">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a class="detail-share-inline-btn" href="https://www.instagram.com/" target="_blank" title="Share on Instagram">
        <i class="fab fa-instagram"></i>
      </a>
      <a class="detail-share-inline-btn" href="https://bsky.app/intent/compose?text=${encodeURIComponent(pub.title + ' ' + shareUrl)}" target="_blank" title="Share on Bluesky">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 320" style="width:1.2em;height:1.2em;fill:currentColor;vertical-align:middle;"><path d="M180 142c-16.3-31.8-60.7-90.8-102-120C38 2 0 20 0 60c0 12 6.7 102.7 11 117 14 48.7 64.7 53.7 98 49-34 5-82.7 20.7-84 72-1 36.7 25.7 73 84 73s97-48.3 71-89c26 40.7 71 89 71 89 58.3 0 85-36.3 84-73-1.3-51.3-50-67-84-72 33.3 4.7 84-0.3 98-49C353.3 162.7 360 72 360 60c0-40-38-58-78-20C240.7 51.2 196.3 110.2 180 142z"/></svg>
      </a>
      <a class="detail-share-inline-btn" href="mailto:?subject=${encodeURIComponent(pub.title)}&body=${encodeURIComponent('Check out this paper: ' + shareUrl)}" title="Share via Email">
        <i class="fas fa-envelope"></i>
      </a>
      <button class="detail-share-inline-btn detail-copy-link-btn" onclick="copyPubLink('${shareUrl}')" title="Copy link">
        <i class="fas fa-link" id="copyLinkIcon"></i>
      </button>
    </div>
  `;

  // Breadcrumb
  const typeLabel = pub.breadcrumb || 'Research output';
  const typeLabelShort = getTypeLabel(pub);
  document.getElementById('detailBreadcrumb').innerHTML =
    `<a href="#" onclick="showList();return false;"><i class="fas fa-home" style="font-size:1.5rem;margin-right:3px;"></i> Research</a>
     <span class="sep">›</span>
     <span>${typeLabelShort}</span>
     <span class="sep">›</span>
     <span style="color:#2c3f55;font-weight:500;">${pub.title.substring(0, 60)}${pub.title.length > 60 ? '…' : ''}</span>`;

  // Fingerprint from keywords
  const fpItems = pub.keywords
    ? pub.keywords.slice(0, 5).map((k, i) => ({
        label: k,
        pct: Math.max(18, Math.round(100 - i * 18)),
        cat: i % 2 === 0 ? 'Economics & Finance' : 'Keyphrases'
      }))
    : [];

  // Citation formats
  const yearStr = pub.year && pub.year !== 'progress' ? pub.year : 'n.d.';

  // Authors are stored as "First Last, First Last & First Last"
  // Split correctly: split on " & " first, then on ", " only between names (not within)
  function splitAuthors(raw) {
    // First normalise: replace " & " with a delimiter, then split on ", " safely
    // Strategy: split on " & " and ", " but treat each "First Last" as a unit
    // Names are "First Last" format — split on ", " followed by a capital (next name)
    // or " & "
    return raw
      .split(/\s*&\s*|\s*,\s*(?=[A-Z])/)
      .map(a => a.trim())
      .filter(Boolean);
  }

  // For APA/Harvard/Chicago: convert "First Last" → "Last, First"
  function toLastFirst(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return name;
    const last = parts[parts.length - 1];
    const first = parts.slice(0, -1).join(' ');
    return `${last}, ${first}`;
  }

  // authorsExpanded = full name string for metadata table / BibTeX / RIS
  const authorsExpanded = pub.authors;
  const authorList = splitAuthors(pub.authors);
  const zt = pub.zoteroType || '';

  // ── Shared helpers ──────────────────────────────────────────────────────────

  // "First Last" → "Last, F. M." (APA/Harvard initials)
  function toInitialsLast(name) {
    const parts = name.trim().split(/\s+/);
    const last  = parts[parts.length - 1];
    const inits = parts.slice(0, -1).map(x => x[0] + '.').join(' ');
    return inits ? `${last}, ${inits}` : last;
  }

  // Author list → "Last, F., & Last, F." (APA)
  function apaAuthors() {
    const names = authorList.map(toInitialsLast);
    if (names.length === 1) return names[0];
    return names.slice(0, -1).join(', ') + ', &amp; ' + names[names.length - 1];
  }

  // Author list → "Last, F. and Last, F." (Harvard)
  function harvardAuthors() {
    const names = authorList.map(toInitialsLast);
    if (names.length === 1) return names[0];
    return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
  }

  // Author list → "Last, First, and First Last" (Chicago)
  function chicagoAuthors() {
    const names = authorList.map((a, i) => i === 0 ? toLastFirst(a) : a);
    if (names.length === 1) return names[0];
    if (names.length === 2) return names[0] + ', and ' + names[1];
    return names.slice(0, -1).join(', ') + ', and ' + names[names.length - 1];
  }

  // Author list → "Last, First and Last, First" (BibTeX)
  function bibtexAuthors() {
    return authorList.map(a => toLastFirst(a)).join(' and ');
  }

  // Editor string helper
  const edStr = pub.editor ? pub.editor : '';
  const edRole = pub.editorRole || 'ed.';

  // URL/DOI helpers
  // Auto-extract DOI from link if not explicitly set
  const resolvedDoi = pub.doi || (pub.link && pub.link.includes('doi.org/') ? pub.link.split('doi.org/')[1] : null);
  const doiUrl   = resolvedDoi ? `https://doi.org/${resolvedDoi}` : '';
  const linkHtml = resolvedDoi
    ? `<a href="${doiUrl}" target="_blank" style="color:#b1040e;">${doiUrl}</a>`
    : pub.link
      ? `<a href="${pub.link}" target="_blank" style="color:#b1040e;">${pub.link}</a>`
      : '';
  const doiPlain = resolvedDoi ? doiUrl : (pub.link || '');

  // Date helpers
  const dateStr = pub.date || (pub.month && yearStr !== 'n.d.' ? `${pub.month} ${yearStr}` : yearStr);
  const accessStr = pub.accessDate ? ` Accessed ${pub.accessDate}.` : '';

  // ── BibTeX type + field mapping ─────────────────────────────────────────────
  function toBibtexType() {
    const m = {
      journalArticle: 'article',       bookSection: 'incollection',
      book: 'book',                    thesis: 'phdthesis',
      manuscript: 'unpublished',       preprint: 'unpublished',
      report: 'techreport',            document: 'techreport',
      dataset: 'misc',                 software: 'misc',
      conferencePaper: 'inproceedings',presentation: 'misc',
      newspaperArticle: 'article',     magazineArticle: 'article',
      blogPost: 'misc',                forumPost: 'misc',
      webpage: 'misc',                 encyclopediaArticle: 'incollection',
      dictionaryEntry: 'incollection', map: 'misc',
      case: 'misc',                    bill: 'misc',
      statute: 'misc',                 hearing: 'misc',
      patent: 'patent',                standard: 'misc',
      film: 'misc',                    tvBroadcast: 'misc',
      radioBroadcast: 'misc',          podcast: 'misc',
      audioRecording: 'misc',          videoRecording: 'misc',
      artwork: 'misc',                 interview: 'misc',
      letter: 'misc',                  email: 'misc',
      instantMessage: 'misc',
    };
    return m[zt] || 'misc';
  }

  // ── RIS type mapping ────────────────────────────────────────────────────────
  function toRisType() {
    const m = {
      journalArticle: 'JOUR',  bookSection: 'CHAP',    book: 'BOOK',
      thesis: 'THES',           manuscript: 'UNPB',     preprint: 'UNPB',
      report: 'RPRT',           document: 'RPRT',       dataset: 'DATA',
      software: 'COMP',         conferencePaper: 'CONF',presentation: 'CONF',
      newspaperArticle: 'NEWS', magazineArticle: 'MGZN',blogPost: 'ELEC',
      forumPost: 'ELEC',        webpage: 'ELEC',        encyclopediaArticle: 'ENCYC',
      dictionaryEntry: 'DICT',  map: 'MAP',             case: 'CASE',
      bill: 'BILL',             statute: 'STAT',        hearing: 'HEAR',
      patent: 'PAT',            standard: 'STD',        film: 'MPCT',
      tvBroadcast: 'BROAD',     radioBroadcast: 'BROAD',podcast: 'SOUND',
      audioRecording: 'SOUND',  videoRecording: 'VIDEO',artwork: 'ART',
      interview: 'INPR',        letter: 'PCOMM',        email: 'PCOMM',
      instantMessage: 'PCOMM',
    };
    return m[zt] || 'GEN';
  }

  // ── APA 7th Edition ─────────────────────────────────────────────────────────
  function buildAPA(p, yr) {
    const au = apaAuthors();
    const doi = linkHtml ? ` ${linkHtml}` : '';
    const pub_ = p.publisher || p.outlet || '';
    const inst = p.institution || p.outlet || '';

    switch (zt) {
      case 'journalArticle':
        return `${au} (${yr}). ${p.title}. <em>${p.outlet || ''}</em>${p.volume ? `, <em>${p.volume}</em>` : ''}${p.issue ? `(${p.issue})` : ''}${p.pages ? `, ${p.pages}` : ''}.${doi}`;
      case 'bookSection':
        return `${au} (${yr}). ${p.title}. In ${edStr ? edStr + ` (${edRole}), ` : ''}<em>${p.outlet || ''}</em>${p.pages ? ` (pp. ${p.pages})` : ''}. ${pub_}.${doi}`;
      case 'book':
        return `${au} (${yr}). <em>${p.title}</em>. ${pub_}.${doi}`;
      case 'thesis':
        return `${au} (${yr}). <em>${p.title}</em> [${p.thesisType || 'Doctoral dissertation'}, ${inst}].${doi}`;
      case 'manuscript':
        return `${au} (${yr}). <em>${p.title}</em> [Unpublished manuscript]. ${inst}.`;
      case 'preprint':
        return `${au} (${yr}). <em>${p.title}</em>. ${p.outlet || 'Preprint'}.${doi}`;
      case 'report':
      case 'document':
        return `${au} (${yr}). <em>${p.title}</em>${p.seriesNum ? ` (No. ${p.seriesNum})` : ''}. ${inst}.${doi}`;
      case 'dataset':
        return `${au} (${yr}). <em>${p.title}</em> [Data set]. ${inst || pub_}.${doi}`;
      case 'software':
        return `${au} (${yr}). <em>${p.title}</em>${p.version ? ` (Version ${p.version})` : ''} [Computer software]. ${pub_}.${doi}`;
      case 'conferencePaper':
      case 'presentation':
        return `${au} (${yr}, ${dateStr}). <em>${p.title}</em> [${zt === 'presentation' ? 'Conference presentation' : 'Paper presentation'}]. ${p.outlet || ''}.${doi}`;
      case 'newspaperArticle':
        return `${au} (${yr}, ${dateStr}). ${p.title}. <em>${p.outlet || ''}</em>.${doi}`;
      case 'magazineArticle':
        return `${au} (${yr}, ${dateStr}). ${p.title}. <em>${p.outlet || ''}</em>.${doi}`;
      case 'blogPost':
        return `${au} (${yr}, ${dateStr}). ${p.title}. <em>${p.outlet || ''}</em>.${doi}`;
      case 'webpage':
        return `${au} (${yr}, ${dateStr}). ${p.title}. ${p.outlet || ''}.${doi}${accessStr}`;
      case 'encyclopediaArticle':
      case 'dictionaryEntry':
        return `${au} (${yr}). ${p.title}. In ${edStr ? edStr + ` (${edRole}), ` : ''}<em>${p.outlet || ''}</em>. ${pub_}.${doi}`;
      case 'patent':
        return `${au} (${yr}). <em>${p.title}</em>${p.patentNumber ? ` (Patent No. ${p.patentNumber})` : ''}. ${p.outlet || 'Patent Office'}.`;
      case 'film':
        return `${au} (${yr}). <em>${p.title}</em> [Film]. ${pub_}.`;
      case 'tvBroadcast':
      case 'radioBroadcast':
        return `${au} (${yr}, ${dateStr}). ${p.title} [${zt === 'tvBroadcast' ? 'TV' : 'Radio'} broadcast episode]. In <em>${p.outlet || ''}</em>. ${pub_}.`;
      case 'podcast':
        return `${au} (${yr}, ${dateStr}). ${p.title} [Audio podcast episode]. <em>${p.outlet || ''}</em>.${doi}`;
      case 'audioRecording':
        return `${au} (${yr}). <em>${p.title}</em> [Album]. ${pub_}.`;
      case 'videoRecording':
        return `${au} (${yr}). <em>${p.title}</em> [Video]. ${pub_}.${doi}`;
      case 'interview':
        return `${au} (${yr}, ${dateStr}). [Interview]. ${p.outlet || ''}.`;
      case 'letter':
      case 'email':
      case 'instantMessage':
        return `${au} (${yr}, ${dateStr}). [${zt === 'letter' ? 'Letter' : zt === 'email' ? 'Email' : 'Message'} to ${p.recipient || 'recipient'}].`;
      default:
        return `${au} (${yr}). ${p.title}${p.outlet ? `. ${p.outlet}` : ''}.${doi}`;
    }
  }

  // ── Harvard ─────────────────────────────────────────────────────────────────
  function buildHarvard(p, yr) {
    const au = harvardAuthors();
    const doi = linkHtml ? ` ${linkHtml}` : '';
    const pub_ = p.publisher || p.outlet || '';
    const inst = p.institution || p.outlet || '';

    switch (zt) {
      case 'journalArticle':
        return `${au} (${yr}) '${p.title}', <em>${p.outlet || ''}</em>${p.volume ? `, vol. ${p.volume}` : ''}${p.issue ? `, no. ${p.issue}` : ''}${p.pages ? `, pp. ${p.pages}` : ''}.${doi}`;
      case 'bookSection':
        return `${au} (${yr}) '${p.title}', in ${edStr ? edStr + ` (${edRole}) ` : ''}<em>${p.outlet || ''}</em>, ${pub_}${p.pages ? `, pp. ${p.pages}` : ''}.${doi}`;
      case 'book':
        return `${au} (${yr}) <em>${p.title}</em>, ${pub_}.${doi}`;
      case 'thesis':
        return `${au} (${yr}) '${p.title}', ${p.thesisType || 'doctoral dissertation'}, ${inst}.`;
      case 'manuscript':
        return `${au} (${yr}) '${p.title}', unpublished manuscript, ${inst}.`;
      case 'preprint':
        return `${au} (${yr}) '${p.title}', ${p.outlet || 'preprint'}.${doi}`;
      case 'report':
      case 'document':
        return `${au} (${yr}) <em>${p.title}</em>${p.seriesNum ? `, no. ${p.seriesNum}` : ''}, ${inst}.${doi}`;
      case 'conferencePaper':
      case 'presentation':
        return `${au} (${yr}) '${p.title}', paper presented at ${p.outlet || ''}, ${dateStr}.`;
      case 'newspaperArticle':
      case 'magazineArticle':
        return `${au} (${yr}) '${p.title}', <em>${p.outlet || ''}</em>, ${dateStr}.${doi}`;
      case 'blogPost':
      case 'webpage':
        return `${au} (${yr}) '${p.title}', <em>${p.outlet || ''}</em>, ${dateStr}.${doi}${accessStr}`;
      case 'encyclopediaArticle':
      case 'dictionaryEntry':
        return `${au} (${yr}) '${p.title}', in <em>${p.outlet || ''}</em>, ${pub_}.${doi}`;
      case 'film':
        return `${au} (${yr}) <em>${p.title}</em> [film], ${pub_}.`;
      case 'podcast':
        return `${au} (${yr}) '${p.title}', <em>${p.outlet || ''}</em>, ${dateStr}.${doi}`;
      default:
        return `${au} (${yr}) '${p.title}'${p.outlet ? `, ${p.outlet}` : ''}.${doi}`;
    }
  }

  // ── Chicago 17th Edition ────────────────────────────────────────────────────
  function buildChicago(p, yr) {
    const au = chicagoAuthors();
    const doi = linkHtml ? ` ${linkHtml}` : '';
    const pub_ = p.publisher || p.outlet || '';
    const inst = p.institution || p.outlet || '';
    // Chicago places the year inline as ". YEAR. " — if yr already ends with
    // a period (e.g. "n.d."), use it as-is to avoid double dots like "n.d.."
    const yrDot = yr.endsWith('.') ? yr : `${yr}.`;

    switch (zt) {
      case 'journalArticle':
        return `${au}. ${yrDot} "${p.title}." <em>${p.outlet || ''}</em>${p.volume ? ` ${p.volume}` : ''}${p.issue ? `, no. ${p.issue}` : ''}${p.pages ? `: ${p.pages}` : ''}.${doi}`;
      case 'bookSection':
        return `${au}. ${yrDot} "${p.title}." In <em>${p.outlet || ''}</em>${edStr ? `, edited by ${edStr}` : ''}${p.pages ? `, ${p.pages}` : ''}. ${pub_}.${doi}`;
      case 'book':
        return `${au}. ${yrDot} <em>${p.title}</em>. ${pub_}.${doi}`;
      case 'thesis':
        return `${au}. ${yrDot} "${p.title}." ${p.thesisType || 'PhD diss.'}, ${inst}.`;
      case 'manuscript':
        return `${au}. ${yrDot} "${p.title}." Unpublished manuscript, ${inst}.`;
      case 'preprint':
        return `${au}. ${yrDot} "${p.title}." ${p.outlet || 'Preprint'}.${doi}`;
      case 'report':
      case 'document':
        return `${au}. ${yrDot} <em>${p.title}</em>${p.seriesNum ? `, no. ${p.seriesNum}` : ''}. ${inst}.${doi}`;
      case 'dataset':
        return `${au}. ${yrDot} "${p.title}." ${inst || pub_}.${doi}`;
      case 'conferencePaper':
      case 'presentation':
        return `${au}. ${yrDot} "${p.title}." Paper presented at ${p.outlet || ''}, ${dateStr}.`;
      case 'newspaperArticle':
        return `${au}. "${p.title}." <em>${p.outlet || ''}</em>, ${dateStr}.${doi}`;
      case 'magazineArticle':
        return `${au}. "${p.title}." <em>${p.outlet || ''}</em>, ${dateStr}.`;
      case 'blogPost':
        return `${au}. "${p.title}." <em>${p.outlet || ''}</em> (blog). ${dateStr}.${doi}`;
      case 'webpage':
        return `${au}. "${p.title}." <em>${p.outlet || ''}</em>. ${dateStr}.${doi}${accessStr}`;
      case 'encyclopediaArticle':
      case 'dictionaryEntry':
        return `${au}. ${yrDot} "${p.title}." In <em>${p.outlet || ''}</em>. ${pub_}.${doi}`;
      case 'film':
        return `${au}. ${yrDot} <em>${p.title}</em>. ${pub_}.`;
      case 'podcast':
        return `${au}. "${p.title}." <em>${p.outlet || ''}</em>. Podcast audio, ${dateStr}.${doi}`;
      case 'interview':
        return `${au}. Interview by ${p.recipient || 'interviewer'}. ${dateStr}.`;
      case 'letter':
        return `${au}. ${dateStr}. Letter to ${p.recipient || 'recipient'}.`;
      default:
        return `${au}. ${yrDot} "${p.title}."${p.outlet ? ` ${p.outlet}.` : ''}${doi}`;
    }
  }

  // ── BibTeX ──────────────────────────────────────────────────────────────────
  const bibtexType = toBibtexType();
  const bibtexKey  = toLastFirst(authorList[0]).split(',')[0].toLowerCase().replace(/[^a-z]/g,'') + yearStr;
  const bibtexAu   = bibtexAuthors();
  const pub_       = pub.publisher || pub.outlet || '';
  const inst_      = pub.institution || pub.outlet || '';

  // Type-specific BibTeX fields
  function bibtexFields() {
    const base = [
      `  title        = {${pub.title}}`,
      `  author       = {${bibtexAu}}`,
      `  year         = {${yearStr}}`,
    ];
    if (resolvedDoi) base.push(`  doi          = {${resolvedDoi}}`);
    if (pub.link && !resolvedDoi) base.push(`  url          = {${pub.link}}`);
    if (pub.keywords?.length) base.push(`  keywords     = {${pub.keywords.join(', ')}}`);

    switch (zt) {
      case 'journalArticle':
        if (pub.outlet)  base.push(`  journal      = {${pub.outlet}}`);
        if (pub.volume)  base.push(`  volume       = {${pub.volume}}`);
        if (pub.issue)   base.push(`  number       = {${pub.issue}}`);
        if (pub.pages)   base.push(`  pages        = {${pub.pages}}`);
        break;
      case 'bookSection':
        if (pub.outlet)  base.push(`  booktitle    = {${pub.outlet}}`);
        if (edStr)       base.push(`  editor       = {${edStr}}`);
        if (pub_)        base.push(`  publisher    = {${pub_}}`);
        if (pub.pages)   base.push(`  pages        = {${pub.pages}}`);
        break;
      case 'book':
        if (pub_)        base.push(`  publisher    = {${pub_}}`);
        if (pub.pubCity) base.push(`  address      = {${pub.pubCity}}`);
        break;
      case 'thesis':
        base.splice(2, 1, `  year         = {${yearStr}}`);
        base.push(`  school       = {${inst_}}`);
        base.push(`  type         = {${pub.thesisType || 'PhD dissertation'}}`);
        break;
      case 'report':
      case 'document':
        if (inst_)       base.push(`  institution  = {${inst_}}`);
        if (pub.seriesNum) base.push(`  number       = {${pub.seriesNum}}`);
        break;
      case 'conferencePaper':
      case 'presentation':
        if (pub.outlet)  base.push(`  booktitle    = {${pub.outlet}}`);
        if (dateStr)     base.push(`  note         = {${dateStr}}`);
        break;
      case 'newspaperArticle':
      case 'magazineArticle':
        if (pub.outlet)  base.push(`  journal      = {${pub.outlet}}`);
        if (pub.date)    base.push(`  note         = {${pub.date}}`);
        break;
      case 'software':
        if (pub.version) base.push(`  version      = {${pub.version}}`);
        if (pub_)        base.push(`  organization = {${pub_}}`);
        break;
      default:
        if (pub.outlet)  base.push(`  howpublished = {${pub.outlet}}`);
        if (pub.date)    base.push(`  note         = {${pub.date}}`);
    }
    return base;
  }

  const bibtex = `@${bibtexType}{${bibtexKey},\n${bibtexFields().join(',\n')}\n}`;

  // ── RIS ─────────────────────────────────────────────────────────────────────
  function buildRIS(p, yr) {
    const lines = [`TY  - ${toRisType()}`];
    lines.push(`TI  - ${p.title}`);
    authorList.forEach(a => lines.push(`AU  - ${a}`));
    lines.push(`PY  - ${yr}`);

    switch (zt) {
      case 'journalArticle':
        if (p.outlet)  lines.push(`JO  - ${p.outlet}`);
        if (p.volume)  lines.push(`VL  - ${p.volume}`);
        if (p.issue)   lines.push(`IS  - ${p.issue}`);
        if (p.pages)   lines.push(`SP  - ${p.pages.split(/[-–]/)[0].trim()}`,
                                   `EP  - ${p.pages.split(/[-–]/)[1]?.trim() || ''}`);
        break;
      case 'bookSection':
        if (p.outlet)  lines.push(`BT  - ${p.outlet}`);
        if (edStr)     lines.push(`A2  - ${edStr}`);
        if (pub_)      lines.push(`PB  - ${pub_}`);
        if (p.pages)   lines.push(`SP  - ${p.pages.split(/[-–]/)[0].trim()}`,
                                   `EP  - ${p.pages.split(/[-–]/)[1]?.trim() || ''}`);
        break;
      case 'book':
        if (pub_)      lines.push(`PB  - ${pub_}`);
        if (p.pubCity) lines.push(`CY  - ${p.pubCity}`);
        break;
      case 'thesis':
        if (inst_)     lines.push(`PB  - ${inst_}`);
        lines.push(`M3  - ${p.thesisType || 'PhD dissertation'}`);
        break;
      case 'report':
      case 'document':
        if (inst_)     lines.push(`PB  - ${inst_}`);
        if (p.seriesNum) lines.push(`VL  - ${p.seriesNum}`);
        break;
      case 'conferencePaper':
      case 'presentation':
        if (p.outlet)  lines.push(`T2  - ${p.outlet}`);
        if (p.date)    lines.push(`N1  - ${p.date}`);
        break;
      default:
        if (p.outlet)  lines.push(`PB  - ${p.outlet}`);
        if (p.date)    lines.push(`N1  - ${p.date}`);
    }

    if (p.doi || resolvedDoi)  lines.push(`DO  - ${resolvedDoi || p.doi}`);
    if (p.link) lines.push(`UR  - ${p.link}`);
    if (p.keywords?.length) p.keywords.forEach(k => lines.push(`KW  - ${k}`));
    lines.push(`ER  -`);
    return lines.join('\n');
  }

  const apa     = buildAPA(pub, yearStr);
  const harvard = buildHarvard(pub, yearStr);
  const chicago = buildChicago(pub, yearStr);
  const ris     = buildRIS(pub, yearStr);

  // Related publications
  const related = publicationsData
    .filter((p, i) => i !== idx && (p.type === pub.type || (pub.keywords && p.keywords && pub.keywords.some(k => p.keywords.includes(k)))))
    .slice(0, 4);

  // Build main content
  document.getElementById('detailMain').innerHTML = `
    <h1 class="detail-title">${pub.title}</h1>
    <div class="detail-authors">${formatAuthorsChicagoMeta(pub.authors)}</div>
    ${getStatusBadges(pub) ? `<div class="detail-badge-row">${getStatusBadges(pub)}</div>` : ''}

    <div class="detail-tab-bar">
      <div class="detail-tab active" onclick="switchDetailTab(this,'overview')">Overview</div>
      <div class="detail-tab" onclick="switchDetailTab(this,'cite')">Cite</div>
    </div>

    <!-- Overview tab -->
    <div id="detailTabOverview">
      ${pub.abstract ? `
      <div class="detail-section-title">Abstract</div>
      <div class="detail-abstract su-wysiwyg-text"><p>${pub.abstract}</p></div>` : `
      <div class="detail-no-abstract">
        <i class="fas fa-info-circle" style="margin-right:6px;"></i>No abstract available for this publication.
      </div>`}

      ${pub.figures && pub.figures.length ? `
      <div class="detail-section-title">Main Figures</div>
      <div class="detail-figures-grid detail-figures-count-${pub.figures.length}">
        ${pub.figures.map(f => `
        <div class="detail-figure-item">
          <a href="static/img/research/${f.file}" target="_blank" download title="Download full-size image">
            <img src="static/img/research/thumbs/${f.file}" alt="${f.caption || f.file}" class="detail-figure-thumb" loading="lazy">
            <div class="detail-figure-overlay"><i class="fas fa-download"></i> Download</div>
          </a>
          ${f.caption ? `<div class="detail-figure-caption">${f.caption}</div>` : ''}
        </div>`).join('')}
      </div>` : ''}

      <div class="detail-section-title">Publication details</div>
      <table class="detail-meta-table">
        <tr><td>Authors</td><td><p>${authorsExpanded}</p></td></tr>
        <tr><td>Year</td><td><p>${yearStr !== 'n.d.' ? yearStr : '<em style="color:#6c7a8e;">Work in progress</em>'}</p></td></tr>
        <tr><td>Date</td><td><p>${pub.date || '—'}</p></td></tr>
        <tr><td>Outlet / Journal</td><td><p>${pub.outlet || '—'}</p></td></tr>
        <tr><td>Publication type</td><td><p>${typeLabel}</p></td></tr>
        <tr><td>Language</td><td><p>${pub.lang === 'fr' ? 'French' : pub.lang === 'km' ? 'Khmer' : 'English'}</p></td></tr>
        <tr><td>Open Access</td><td>${pub.oa ? '<span class="status-badge badge-oa"><i class="fas fa-lock-open"></i>Open Access</span>' : '<p style="color:#6c7a8e;">Restricted</p>'}</td></tr>
        ${STAGE_BADGES.filter(s => pub[s.flag] && s.flag !== 'oa').length ? `<tr><td>Status</td><td class="detail-status-badges">${STAGE_BADGES.filter(s => pub[s.flag] && s.flag !== 'oa').map(s => `<span class="status-badge ${s.cls}"><i class="${s.icon}"></i>${s.label}</span>`).join(' ')}</td></tr>` : ''}
        ${pub.link ? `<tr><td>External link</td><td><p><a href="${pub.link}" target="_blank" style="color:#b1040e;">${pub.link} <i class="fas fa-external-link-alt" style="font-size:1.4rem;"></i></a></p></td></tr>` : ''}
        ${resolvedDoi ? `<tr><td>DOI</td><td><p><a href="https://doi.org/${resolvedDoi}" target="_blank" style="color:#b1040e;">https://doi.org/${resolvedDoi} <i class="fas fa-external-link-alt" style="font-size:1.4rem;"></i></a></p></td></tr>` : ''}
      </table>

      ${pub.keywords && pub.keywords.length ? `
      <div class="detail-section-title">Keywords</div>
      <div class="detail-keywords">
        ${pub.keywords.map(k => `<span class="detail-keyword kw-clickable" role="button" tabindex="0" data-keyword="${k.replace(/"/g,'&quot;')}" title="Find all publications with keyword: ${k.replace(/"/g,'&quot;')}">${k}</span>`).join('')}
      </div>` : ''}

      ${related.length ? `
      <div class="detail-section-title">Related publications</div>
      <div>
        ${related.map((r) => `
        <div class="detail-related-item">
          <div class="detail-related-title" onclick="showDetail(${publicationsData.indexOf(r)})">${r.title}</div>
          <div class="detail-related-meta">${r.authors} · ${r.date || r.year || ''} · ${r.outlet || ''}</div>
        </div>`).join('')}
      </div>` : ''}
    </div>

    <!-- Fingerprint tab -->
    <div id="detailTabFingerprint" style="display:none;">
      ${fpItems.length ? `
      <p style="font-size:1.6rem;color:#4b5e77;margin-bottom:1.5rem;line-height:1.6;">
        Dive into the research topics of '<em>${pub.title}</em>'. Together they form a unique fingerprint.
      </p>
      <div class="detail-fp-header">Research topics</div>
      ${fpItems.map(fp => `
        <div class="detail-fingerprint-item">
          <div class="detail-fp-label">
            <span>${fp.label}</span>
            <span>${fp.pct}%</span>
          </div>
          <div class="detail-fp-bar-bg">
            <div class="detail-fp-bar" style="width:${fp.pct}%"></div>
          </div>
          <div style="font-size:1.5rem;color:#9aaebf;margin-top:3px;">${fp.cat}</div>
        </div>`).join('')}` : `
      <p style="color:#6c7a8e;font-size:1.6rem;padding:1rem 0;">No fingerprint data available for this publication.</p>`}
    </div>

    <!-- Cite tab — redesigned -->
    <div id="detailTabCite" style="display:none;">
      <div class="detail-section-title">Cite this publication</div>

      <!-- Tab selector bar -->
      <div class="cite-tab-bar">
        <button class="cite-tab-btn active" onclick="switchCiteTab(this,'apa')">APA</button>
        <button class="cite-tab-btn" onclick="switchCiteTab(this,'harvard')">Harvard</button>
        <button class="cite-tab-btn" onclick="switchCiteTab(this,'chicago')">Chicago</button>
        <button class="cite-tab-btn" onclick="switchCiteTab(this,'bibtex')">BibTeX</button>
        <button class="cite-tab-btn" onclick="switchCiteTab(this,'ris')">RIS</button>
      </div>

      <!-- Citation boxes -->
      <div class="cite-box-wrap">
        <div class="cite-box" id="citeBoxApa">
          <button class="cite-copy-btn" onclick="copyText('citeBoxApa')"><i class="fas fa-copy"></i> Copy</button>
          <div class="cite-text">${apa}</div>
        </div>
        <div class="cite-box" id="citeBoxHarvard" style="display:none;">
          <button class="cite-copy-btn" onclick="copyText('citeBoxHarvard')"><i class="fas fa-copy"></i> Copy</button>
          <div class="cite-text">${harvard}</div>
        </div>
        <div class="cite-box" id="citeBoxChicago" style="display:none;">
          <button class="cite-copy-btn" onclick="copyText('citeBoxChicago')"><i class="fas fa-copy"></i> Copy</button>
          <div class="cite-text">${chicago}</div>
        </div>
        <div class="cite-box" id="citeBoxBibtex" style="display:none;font-family:monospace;">
          <button class="cite-copy-btn" onclick="copyText('citeBoxBibtex')"><i class="fas fa-copy"></i> Copy</button>
          <div class="cite-text" style="white-space:pre;">${bibtex}</div>
        </div>
        <div class="cite-box" id="citeBoxRis" style="display:none;font-family:monospace;">
          <button class="cite-copy-btn" onclick="copyText('citeBoxRis')"><i class="fas fa-copy"></i> Copy</button>
          <div class="cite-text" style="white-space:pre;">${ris}</div>
        </div>
      </div>

      <!-- Export buttons -->
      <div class="cite-export-row">
        <a class="cite-export-btn" href="data:text/plain;charset=utf-8,${encodeURIComponent(ris)}" download="citation_nith.ris">
          <i class="fas fa-download"></i> Export RIS
        </a>
        <a class="cite-export-btn" href="data:text/plain;charset=utf-8,${encodeURIComponent(bibtex)}" download="citation_nith.bib">
          <i class="fas fa-download"></i> Export BibTeX
        </a>
      </div>
    </div>
  `;

  // Build sidebar
  document.getElementById('detailSidebar').innerHTML = `
    ${pub.award ? `<div class="detail-award"><i class="fas fa-trophy"></i> Award Winner — Best Paper</div>` : ''}

    ${pub.downloads ? `
    <div class="detail-card">
      <div class="detail-card-title"><i class="fas fa-chart-bar" style="margin-right:5px;color:#b1040e;"></i>Usage statistics</div>
      <div class="detail-stat-row">
        <div class="detail-stat-num">${pub.downloads}</div>
        <div style="line-height:1.3;font-size:1.6rem;"><strong>Downloads</strong><br><span style="font-size:1.5rem;color:#6c7a8e;">Full-text downloads</span></div>
      </div>
    </div>` : ''}

  `;
}

// ===== Tab Switching =====

function switchDetailTab(el, tab) {
  document.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const tabs = { overview: 'detailTabOverview', fingerprint: 'detailTabFingerprint', cite: 'detailTabCite' };
  Object.entries(tabs).forEach(([key, id]) => {
    const elem = document.getElementById(id);
    if (elem) elem.style.display = key === tab ? 'block' : 'none';
  });
}

function switchCiteTab(el, fmt) {
  document.querySelectorAll('.cite-tab-btn').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  ['apa', 'harvard', 'chicago', 'bibtex', 'ris'].forEach(id => {
    const box = document.getElementById('citeBox' + id.charAt(0).toUpperCase() + id.slice(1));
    if (box) box.style.display = id === fmt ? 'block' : 'none';
  });
}

function copyText(boxId) {
  const box = document.getElementById(boxId);
  const textEl = box.querySelector('.cite-text');
  const text = textEl ? textEl.innerText.trim() : box.innerText.replace(/^Copy\n?/, '').trim();
  navigator.clipboard.writeText(text).then(() => {
    const btn = box.querySelector('.cite-copy-btn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check" style="margin-right:3px;color:#2c6e2c;"></i> Copied!';
    setTimeout(() => btn.innerHTML = orig, 1800);
  }).catch(() => {
    const range = document.createRange();
    range.selectNodeContents(textEl || box);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  });
}

// Copy shareable pub link to clipboard
function copyPubLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    const icon = document.getElementById('copyLinkIcon');
    if (icon) {
      icon.className = 'fas fa-check';
      icon.parentElement.style.color = '#2c6e2c';
      setTimeout(() => {
        icon.className = 'fas fa-link';
        icon.parentElement.style.color = '';
      }, 2000);
    }
  }).catch(() => {
    prompt('Copy this link:', url);
  });
}

// ===== Keyword click — filter publications by keyword =====
function filterByKeyword(keyword) {
  // Switch to list view
  showList();
  // Set the search input to the keyword
  const input = document.getElementById('searchInput');
  if (input) {
    input.value = keyword;
    currentSearchTerm = keyword;
  }
  // Clear all other filters so only keyword search is active
  document.querySelectorAll('#fullTypeList input').forEach(cb => cb.checked = false);
  document.getElementById('oaFilterCheckbox').checked = false;
  document.querySelectorAll('input[data-lang]').forEach(cb => cb.checked = false);
  document.querySelectorAll('.sdg-checkbox').forEach(cb => cb.checked = false);
  document.getElementById('yearSliderMin').value = YEAR_MIN_BOUND;
  document.getElementById('yearSliderMax').value = YEAR_MAX_BOUND;
  updateYearSliderUI();
  currentPage = 1;
  renderPublicationsWithPagination();
  // Scroll to top of results
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// CSS position:sticky can be broken when any ancestor has overflow:hidden/auto/scroll.
// This JS fallback detects that situation and switches to position:fixed instead.
function initStickySidebar() {
  // On mobile/tablet (<=900px) the sidebar is a slide-up drawer -- skip sticky JS entirely
  if (window.innerWidth <= 900) return;

  const sidebar = document.querySelector('.research-sidebar');
  if (!sidebar) return;

  // Test if sticky actually works: after a tiny scroll, check if the sidebar moved
  // A simpler reliable approach: always use the scroll-based fixed fallback
  const twoCol = document.querySelector('.two-columns');
  if (!twoCol) return;

  function onScroll() {
    const colRect  = twoCol.getBoundingClientRect();
    const sidebarH = sidebar.offsetHeight;
    const viewH    = window.innerHeight;

    // Only fix when the two-column layout top is scrolled above viewport top
    if (colRect.top <= 20) {
      // Don't go past the bottom of the two-column container
      const bottomLimit = colRect.bottom - sidebarH;
      if (bottomLimit <= 20) {
        sidebar.classList.remove('is-fixed');
        sidebar.style.position = 'absolute';
        sidebar.style.top = (twoCol.offsetHeight - sidebarH) + 'px';
      } else {
        sidebar.style.position = '';
        sidebar.style.top = '';
        sidebar.classList.add('is-fixed');
      }
    } else {
      sidebar.classList.remove('is-fixed');
      sidebar.style.position = '';
      sidebar.style.top = '';
    }
  }

  // Only activate the JS fallback if CSS sticky is not working
  // We detect this by checking if the sidebar's computed position is actually sticky
  const computed = window.getComputedStyle(sidebar).position;
  if (computed !== 'sticky') {
    // CSS sticky is not supported or blocked — use JS fallback
    twoCol.style.position = 'relative';
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  // If sticky IS working, also listen for scroll to handle max-height overflow scroll
}


// ===== Download counting via CountAPI =====
// Namespace keyed to the site so counts are isolated per publication.
const DL_NAMESPACE = 'kosalnith-research';

/**
 * Convert a publication title into a short URL-safe slug used as the
 * CountAPI key (max 60 chars, lowercase, hyphens only).
 */
function slugify(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/**
 * Fetch the current hit count for a slug from CountAPI.
 * Falls back silently on network error.
 */
async function fetchDownloadCount(slug) {
  try {
    const res = await fetch(`https://api.countapi.xyz/get/${DL_NAMESPACE}/${slug}`);
    if (!res.ok) return null;
    const data = await res.json();
    return (data && typeof data.value === 'number') ? data.value : null;
  } catch { return null; }
}

/**
 * Increment the hit counter for a slug and return the new value.
 * On first ever hit, CountAPI auto-creates the key starting at 1.
 */
async function incrementDownloadCount(slug) {
  try {
    const res = await fetch(`https://api.countapi.xyz/hit/${DL_NAMESPACE}/${slug}`);
    if (!res.ok) return null;
    const data = await res.json();
    return (data && typeof data.value === 'number') ? data.value : null;
  } catch { return null; }
}

/**
 * Load live counts for every visible download circle and display them.
 * All papers start at 0. CountAPI auto-creates the key on first hit.
 */
async function loadAllDownloadCounts() {
  const circles = document.querySelectorAll('.download-circle[id^="dlcircle-"]');
  await Promise.all(Array.from(circles).map(async (circle) => {
    const slug = circle.id.replace('dlcircle-', '');
    const numEl = document.getElementById('dlnum-' + slug);
    if (!numEl) return;
    const count = await fetchDownloadCount(slug);
    // null means key doesn't exist yet (0 downloads), show 0
    numEl.textContent = (count !== null) ? count : 0;
  }));
}

/**
 * Wire up click handlers on resource buttons that have data-track-dl.
 * Each click increments the CountAPI counter and updates the circle live.
 */
function initDownloadTracking() {
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-track-dl]');
    if (!btn) return;
    const slug = btn.getAttribute('data-pub-slug');
    if (!slug) return;
    // Fire-and-forget; update display if circle exists
    const newCount = await incrementDownloadCount(slug);
    if (newCount !== null) {
      const numEl = document.getElementById('dlnum-' + slug);
      if (numEl) numEl.textContent = newCount;
    }
  });
}


// ===== Auto-update all filter counts from data =====
function updateAllCounts() {
  const pubs = publicationsData || [];

  // OA count
  const oaCount = pubs.filter(p => p.oa).length;
  const oaBadge = document.querySelector('#oaFilterCheckbox')
    ?.closest('label')?.querySelector('.count-badge');
  if (oaBadge) oaBadge.textContent = '(' + oaCount + ')';

  // Language counts
  const langCounts = { en: 0, fr: 0, km: 0 };
  pubs.forEach(p => { if (p.lang && langCounts[p.lang] !== undefined) langCounts[p.lang]++; });
  document.querySelectorAll('input[data-lang]').forEach(inp => {
    const badge = inp.closest('label')?.querySelector('.count-badge');
    if (badge) badge.textContent = '(' + (langCounts[inp.dataset.lang] || 0) + ')';
  });

  // Type pill counts
  const typeCounts = {};
  pubs.forEach(p => { typeCounts[p.type] = (typeCounts[p.type] || 0) + 1; });

  document.querySelectorAll('.type-pill[data-filter-type]').forEach(btn => {
    const t = btn.dataset.filterType;
    if (!t || t === 'all') return;
    const numEl = btn.querySelector('.pill-number');
    if (numEl) numEl.textContent = typeCounts[t] || 0;
  });

  // "More" dropdown items
  document.querySelectorAll('.more-item[data-more-type]').forEach(el => {
    const strong = el.querySelector('strong');
    if (strong) strong.textContent = typeCounts[el.dataset.moreType] || 0;
  });

  // "More" pill total
  const morePill = document.getElementById('moreButton');
  if (morePill) {
    const moreTotal = ['presentations','confpapers','progress']
      .reduce((s, t) => s + (typeCounts[t] || 0), 0);
    const numEl = morePill.querySelector('.pill-number');
    if (numEl) numEl.textContent = moreTotal;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderSdgList();
  initYearSlider();
  renderTypeList();
  updateAllCounts();
  renderPublicationsWithPagination();
  initEventListeners();
  initStickySidebar();
  initDownloadTracking();
  loadAllDownloadCounts();

  // On load: read ?pub=slug from query string and open that publication
  const pubSlug = new URLSearchParams(window.location.search).get('pub');
  if (pubSlug) {
    const idx = findIdxBySlug(pubSlug);
    if (idx !== -1) showDetail(idx);
  }

  // Handle browser back / forward button
  window.addEventListener('popstate', (e) => {
    const st = e.state;
    if (st && st.view === 'detail' && typeof st.idx === 'number') {
      showDetail(st.idx);
    } else {
      showList();
    }
  });
});
