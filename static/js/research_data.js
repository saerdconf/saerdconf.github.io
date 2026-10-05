// ----- Publication type definitions (37 standard Zotero types + 1 site-specific) -----
// HOW TO ADD A NEW PUBLICATION:
//   1. Add your entry to publicationsData below.
//   2. Set pub.zoteroType to one of the 37 Zotero type keys listed here (required).
//      For works in progress with no Zotero type, set pub.type = "progress" instead.
//   3. Counts in the sidebar update automatically — no manual editing needed here.
//
// Type mapping rationale (Chicago Manual of Style, 18th ed.):
//   Op-eds / commentaries in newspapers or news websites  → newspaperArticle  (CMOS 18 §14.191)
//   Op-eds / commentary on news websites (born-digital)   → newspaperArticle  (CMOS 18 §14.191)
//   Conference commentary / panel remarks                  → presentation      (CMOS 18 §14.217)
//   Working papers (named institutional series)            → report            (CMOS 18 §14.229)
//   Policy briefs (short institutional reports)            → report            (CMOS 18 §14.229)
//   Research reports / mapping studies / surveys           → report            (CMOS 18 §14.229)
//   Internship / programme reports                         → report            (CMOS 18 §14.229)
//   Conference papers (competition, named proceedings)     → conferencePaper   (CMOS 18 §14.217)
//   Book chapter in edited volume (COVID-19 survey)        → bookSection       (CMOS 18 §14.103)
//   Works in progress (no Zotero equivalent)               → progress (site-specific, 38th type)

const allPublicationTypes = [
  // ── Core research ────────────────────────────────────────────────────────────
  { key: "journalArticle",      zoteroType: "journalArticle",      label: "Journal article",        count: 0, dataFilter: "articles"      },
  { key: "bookSection",         zoteroType: "bookSection",         label: "Book chapter",           count: 0, dataFilter: "chapters"      },
  { key: "book",                zoteroType: "book",                label: "Book",                   count: 0, dataFilter: "books"         },
  { key: "thesis",              zoteroType: "thesis",              label: "Thesis / Dissertation",  count: 0, dataFilter: "thesis"        },
  { key: "manuscript",          zoteroType: "manuscript",          label: "Manuscript",             count: 0, dataFilter: "manuscript"    },
  { key: "preprint",            zoteroType: "preprint",            label: "Preprint",               count: 0, dataFilter: "preprints"     },
  { key: "report",              zoteroType: "report",              label: "Report",                 count: 0, dataFilter: "reports"       },
  { key: "document",            zoteroType: "document",            label: "Document",               count: 0, dataFilter: "documents"     },
  { key: "dataset",             zoteroType: "dataset",             label: "Dataset",                count: 0, dataFilter: "datasets"      },
  { key: "software",            zoteroType: "software",            label: "Software",               count: 0, dataFilter: "software"      },
  // ── Conference & presentations ────────────────────────────────────────────────
  { key: "conferencePaper",     zoteroType: "conferencePaper",     label: "Conference paper",       count: 0, dataFilter: "confpapers"    },
  { key: "presentation",        zoteroType: "presentation",        label: "Presentation",           count: 0, dataFilter: "presentations" },
  // ── Journalism & commentary ───────────────────────────────────────────────────
  { key: "newspaperArticle",    zoteroType: "newspaperArticle",    label: "Newspaper article",      count: 0, dataFilter: "opeds"         },
  { key: "magazineArticle",     zoteroType: "magazineArticle",     label: "Magazine article",       count: 0, dataFilter: "magazine"      },
  { key: "blogPost",            zoteroType: "blogPost",            label: "Blog post",              count: 0, dataFilter: "blogpost"      },
  { key: "forumPost",           zoteroType: "forumPost",           label: "Forum post",             count: 0, dataFilter: "forum"         },
  { key: "webpage",             zoteroType: "webpage",             label: "Web page",               count: 0, dataFilter: "webpage"       },
  // ── Reference works ───────────────────────────────────────────────────────────
  { key: "encyclopediaArticle", zoteroType: "encyclopediaArticle", label: "Encyclopedia article",   count: 0, dataFilter: "encyclopedia"  },
  { key: "dictionaryEntry",     zoteroType: "dictionaryEntry",     label: "Dictionary entry",       count: 0, dataFilter: "dictionary"    },
  { key: "map",                 zoteroType: "map",                 label: "Map",                    count: 0, dataFilter: "maps"          },
  // ── Legal & policy ────────────────────────────────────────────────────────────
  { key: "case",                zoteroType: "case",                label: "Legal case",             count: 0, dataFilter: "legalcase"     },
  { key: "bill",                zoteroType: "bill",                label: "Bill / Legislation",     count: 0, dataFilter: "bills"         },
  { key: "statute",             zoteroType: "statute",             label: "Statute",                count: 0, dataFilter: "statutes"      },
  { key: "hearing",             zoteroType: "hearing",             label: "Hearing",                count: 0, dataFilter: "hearings"      },
  { key: "patent",              zoteroType: "patent",              label: "Patent",                 count: 0, dataFilter: "patents"       },
  { key: "standard",            zoteroType: "standard",            label: "Standard",               count: 0, dataFilter: "standards"     },
  // ── Audiovisual & media ───────────────────────────────────────────────────────
  { key: "film",                zoteroType: "film",                label: "Film",                   count: 0, dataFilter: "film"          },
  { key: "tvBroadcast",         zoteroType: "tvBroadcast",         label: "TV broadcast",           count: 0, dataFilter: "tv"            },
  { key: "radioBroadcast",      zoteroType: "radioBroadcast",      label: "Radio broadcast",        count: 0, dataFilter: "radio"         },
  { key: "podcast",             zoteroType: "podcast",             label: "Podcast",                count: 0, dataFilter: "podcast"       },
  { key: "audioRecording",      zoteroType: "audioRecording",      label: "Audio recording",        count: 0, dataFilter: "audio"         },
  { key: "videoRecording",      zoteroType: "videoRecording",      label: "Video recording",        count: 0, dataFilter: "video"         },
  { key: "artwork",             zoteroType: "artwork",             label: "Artwork",                count: 0, dataFilter: "artwork"       },
  // ── Personal communications ───────────────────────────────────────────────────
  { key: "interview",           zoteroType: "interview",           label: "Interview",              count: 0, dataFilter: "interviews"    },
  { key: "letter",              zoteroType: "letter",              label: "Letter",                 count: 0, dataFilter: "letters"       },
  { key: "email",               zoteroType: "email",               label: "Email",                  count: 0, dataFilter: "email"         },
  { key: "instantMessage",      zoteroType: "instantMessage",      label: "Instant message",        count: 0, dataFilter: "im"            },
  // ── Site-specific (38th type — no Zotero equivalent) ─────────────────────────
  { key: "work_in_progress",    zoteroType: null,                  label: "Work in progress",       count: 0, dataFilter: "progress"      },
];

// uniqueTypes: deduplicated by dataFilter (38 unique entries after dedup).
// All 37 Zotero types have distinct dataFilter values; work_in_progress is the 38th.
// We keep the FIRST entry per dataFilter as the representative label.
const uniqueTypes = [];
const seenFilters = new Set();
for (const t of allPublicationTypes) {
  const key = t.dataFilter || t.key;
  if (!seenFilters.has(key)) { seenFilters.add(key); uniqueTypes.push(t); }
}

// ─── Year counts (verified from publications list below) ───────
const yearItems = [
  { year: "2026", count: 4 },
  { year: "2025", count: 8 },
  { year: "2024", count: 2 },
  { year: "2023", count: 2 },
  { year: "2022", count: 3 },
  { year: "2021", count: 7 },
  { year: "2020", count: 3 },
  { year: "2019", count: 1 },
  { year: "2018", count: 1 }
];

// ─── SDG data — matched to Kosal Nith's research themes ────────
const sdgItems = [
  { label: "SDG 1 - No Poverty"                                },
  { label: "SDG 2 - Zero Hunger"                               },
  { label: "SDG 3 - Good Health and Well-being"                },
  { label: "SDG 4 - Quality Education"                         },
  { label: "SDG 5 - Gender Equality"                           },
  { label: "SDG 6 - Clean Water and Sanitation"                },
  { label: "SDG 7 - Affordable and Clean Energy"               },
  { label: "SDG 8 - Decent Work and Economic Growth"           },
  { label: "SDG 9 - Industry, Innovation, and Infrastructure"  },
  { label: "SDG 10 - Reduced Inequalities"                     },
  { label: "SDG 11 - Sustainable Cities and Communities"       },
  { label: "SDG 12 - Responsible Consumption and Production"   },
  { label: "SDG 13 - Climate Action"                           },
  { label: "SDG 14 - Life Below Water"                         },
  { label: "SDG 15 - Life on Land"                             },
  { label: "SDG 16 - Peace, Justice and Strong Institutions"   },
  { label: "SDG 17 - Partnerships for the Goals"               }
];

// ─── Publications data ─────────────────────────────────────────
// zoteroType: one of the 37 Zotero type keys (required for all except progress)
// type:       dataFilter bucket — derived from zoteroType via getFilterKeyFromZoteroType()
//             For works in progress: type = "progress" (no zoteroType)
// lang:       en | fr | km
//
// ── Research lifecycle stage flags (add any that apply) ───────
//   definingProblem         — identifying the research question
//   reviewingLiterature     — surveying existing work
//   formulatingHypotheses   — developing testable propositions
//   researchDesign          — designing the methodology
//   collectingData          — gathering primary/secondary data
//   analyzingResults        — running analysis
//   writingFindings         — drafting the manuscript
//   draftVersion            — circulating a working draft
//   submitted               — submitted to a journal/publisher
//   underReview             — under peer review
//   revised                 — revisions requested and submitted
//   acceptedInPrinciple     — conditionally accepted pending minor revisions
//   forthcoming             — accepted, awaiting publication
//   inPress                 — in production, volume/issue not yet assigned
//   oa                      — published open access
//   restricted              — restricted/closed access
//   embargoed               — open access but under embargo period
//   award                   — prize-winning publication
//   featured                — highlighted by outlet or institution
//   mediaPickup             — covered by news media or press
//   policyImpact            — cited in policy documents or government reports
//   onHold                  — paused temporarily
//   seekingCollaborators    — looking for co-authors or research partners
//   unpub                   - unpublished papers 
const publicationsData = [

  // ══ Newspaper Articles / Op-Eds (14) — CMOS 18 §14.191 ══════════════════════
  // Op-eds and commentaries published in newspapers and news websites are
  // Newspaper articles in Zotero. The one conference commentary is a Presentation.

  { title: "Capital Gains Tax Is a Smart Way to Build Infrastructure",
    ogImage: "https://kosalnith.github.io/static/img/og/capital-gains-tax-is-a-smart-way-to-build-infrastructure.png",
    authors: "Kosal Nith", date: "22 Mar 2026", outlet: "Cambodianess",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2026", oa: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Taxation","Capital Gains Tax","Infrastructure","Fiscal Policy","Cambodia"],
    kwStrength: ["full","full","full","half","none"],
    sdgs: ["SDG 9 - Industry, Innovation, and Infrastructure","SDG 10 - Reduced Inequalities","SDG 17 - Partnerships for the Goals"],
    link: "https://cambodianess.com/article/capital-gains-tax-is-a-smart-way-to-build-infrastructure" },

  { title: "Transforming the Tax System with Personal Income Tax",
    ogImage: "https://kosalnith.github.io/static/img/og/transforming-the-tax-system-with-personal-income-tax.png",
    authors: "Kosal Nith", date: "4 Jan 2026", outlet: "Cambodianess",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2026", oa: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Personal Income Tax","Tax Reform","Fiscal Policy","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 10 - Reduced Inequalities","SDG 16 - Peace, Justice and Strong Institutions"],
    link: "https://cambodianess.com/article/transforming-the-tax-system-with-personal-income-tax" },

  { title: "Cambodia Needs Progressive Taxation to Invest in Its Future",
    ogImage: "https://kosalnith.github.io/static/img/og/cambodia-needs-progressive-taxation-to-invest-in-its-future.png",
    authors: "Kosal Nith", date: "17 Oct 2025", outlet: "Camboja News",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2025", oa: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Progressive Taxation","Public Investment","Inequality","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 1 - No Poverty","SDG 10 - Reduced Inequalities","SDG 17 - Partnerships for the Goals"],
    link: "https://cambojanews.com/op-ed-cambodia-needs-progressive-taxation-to-invest-in-its-future/" },

  { title: "Connecting Communities to Support Cambodia's Vulnerable",
    ogImage: "https://kosalnith.github.io/static/img/og/connecting-communities-to-support-cambodias-vulnerable.png",
    authors: "Kosal Nith", date: "13 Aug 2025", outlet: "East Asia Forum",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2025", oa: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Social Protection","Vulnerable Households","Community","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 1 - No Poverty","SDG 3 - Good Health and Well-being","SDG 10 - Reduced Inequalities"],
    link: "https://eastasiaforum.org/2025/08/13/connecting-communities-to-support-cambodias-vulnerable/" },

  { title: "Ascending the Development Ladder in Cambodia: Progressing Towards Higher Income Status",
    ogImage: "https://kosalnith.github.io/static/img/og/ascending-the-development-ladder-in-cambodia-progressing-towards-higher-income-s.png",
    authors: "Kosal Nith, Sovannroeun Samreth & Sopheak Song", date: "7 Dec 2023",
    outlet: "The Cambodia Outlook Conference",
    zoteroType: "presentation",
    type: "presentations", year: "2023", oa: true, lang: "en",
    breadcrumb: "Presentation › Conference commentary",
    keywords: ["Economic Development","Middle-Income Status","Growth","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 8 - Decent Work and Economic Growth","SDG 9 - Industry, Innovation, and Infrastructure","SDG 10 - Reduced Inequalities"],
    link: "https://coc2023.cdri.org.kh/ascending-the-development-ladder-in-cambodia-progressing-towards-higher-income-status/" },

  { title: "Explainer: How Cambodia's Central Bank Addressed Economic Challenges During the Pandemic",
    ogImage: "https://kosalnith.github.io/static/img/og/explainer-how-cambodias-central-bank-addressed-economic-challenges-during-the-pa.png",
    authors: "Kosal Nith", date: "7 Jul 2023", outlet: "The Camboja News",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2023", oa: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Monetary Policy","Central Bank","COVID-19","Cambodia"],
    kwStrength: ["full","full","full","none"],
    sdgs: ["SDG 8 - Decent Work and Economic Growth","SDG 3 - Good Health and Well-being"],
    link: "https://cambojanews.com/explainer-how-cambodias-central-bank-addressed-economic-challenges-during-the-pandemic/" },

  { title: "Will Cambodia Commit to Protecting Its Forests?",
    ogImage: "https://kosalnith.github.io/static/img/og/will-cambodia-commit-to-protecting-its-forests.png",
    authors: "Kosal Nith", date: "13 Nov 2021", outlet: "The Diplomat",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2021", oa: false, restricted: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Deforestation","Forest Policy","Climate","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 13 - Climate Action","SDG 15 - Life on Land"],
    link: "https://thediplomat.com/2021/11/will-cambodia-commit-to-protecting-its-forests/" },

  { title: "Pandemic Offers Chance to Consider Higher Taxes, not Donations, From Rich",
    ogImage: "https://kosalnith.github.io/static/img/og/pandemic-offers-chance-to-consider-higher-taxes-not-donations-from-rich.png",
    authors: "Kosal Nith", date: "13 Aug 2021", outlet: "VOD",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2021", oa: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Taxation","Inequality","COVID-19","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 1 - No Poverty","SDG 10 - Reduced Inequalities","SDG 3 - Good Health and Well-being"],
    link: "https://vodenglish.news/opinion-pandemic-offers-chance-to-consider-higher-taxes-not-donations-from-rich/" },

  { title: "How Cambodia's Agricultural Lending Can Get a Bigger Bang for Its Buck",
    ogImage: "https://kosalnith.github.io/static/img/og/how-cambodias-agricultural-lending-can-get-a-bigger-bang-for-its-buck.png",
    authors: "Kosal Nith", date: "29 May 2021", outlet: "East Asia Forum",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2021", oa: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Agricultural Finance","Credit","Rural Economy","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 2 - Zero Hunger","SDG 1 - No Poverty","SDG 8 - Decent Work and Economic Growth"],
    link: "https://www.eastasiaforum.org/2021/05/29/how-cambodias-agricultural-lending-can-get-a-bigger-bang-for-its-buck/" },

  { title: "Rising Inflation Threatens to Swamp Cambodian Households",
    ogImage: "https://kosalnith.github.io/static/img/og/rising-inflation-threatens-to-swamp-cambodian-households.png",
    authors: "Kosal Nith", date: "26 May 2021", outlet: "The Diplomat",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2021", oa: false, restricted: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Inflation","Household Welfare","Monetary Policy","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 1 - No Poverty","SDG 10 - Reduced Inequalities","SDG 8 - Decent Work and Economic Growth"],
    link: "https://thediplomat.com/2021/05/rising-inflation-threatens-to-swamp-cambodian-households/" },

  { title: "Lockdown's Food Security Crisis Must Address Demand and Supply",
    ogImage: "https://kosalnith.github.io/static/img/og/lockdowns-food-security-crisis-must-address-demand-and-supply.png",
    authors: "Kosal Nith & Kimly Lay", date: "4 May 2021", outlet: "VOD",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2021", oa: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Food Security","COVID-19","Lockdown","Cambodia"],
    kwStrength: ["full","full","full","none"],
    sdgs: ["SDG 2 - Zero Hunger","SDG 1 - No Poverty","SDG 3 - Good Health and Well-being"],
    link: "https://vodenglish.news/lockdowns-food-security-crisis-must-address-demand-and-supply/" },

  { title: "Cambodia's Economic Recovery Uncertain Amid Covid",
    ogImage: "https://kosalnith.github.io/static/img/og/cambodias-economic-recovery-uncertain-amid-covid.png",
    authors: "Kosal Nith", date: "6 Apr 2021", outlet: "The Phnom Penh Post",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2021", oa: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Economic Recovery","COVID-19","GDP","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 8 - Decent Work and Economic Growth","SDG 9 - Industry, Innovation, and Infrastructure"] },

  { title: "Cambodia Will Lose Its Fight Against Deforestation If Change Isn't Made",
    ogImage: "https://kosalnith.github.io/static/img/og/cambodia-will-lose-its-fight-against-deforestation-if-change-isnt-made.png",
    authors: "Kosal Nith", date: "16 Mar 2021", outlet: "Southeast Asia Globe",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2021", oa: false, restricted: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Deforestation","Forest Policy","Environment","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 13 - Climate Action","SDG 15 - Life on Land","SDG 16 - Peace, Justice and Strong Institutions"] },

  { title: "Kingdom's Agro-Processing Potential",
    ogImage: "https://kosalnith.github.io/static/img/og/kingdoms-agro-processing-potential.png",
    authors: "Kosal Nith", date: "8 Jun 2020", outlet: "The Phnom Penh Post",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2020", oa: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Agro-Processing","Agriculture","Industry","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 2 - Zero Hunger","SDG 8 - Decent Work and Economic Growth","SDG 9 - Industry, Innovation, and Infrastructure"] },

  { title: "Cambodia's Agricultural Sector is in Dire Need of Revitalization",
    ogImage: "https://kosalnith.github.io/static/img/og/cambodias-agricultural-sector-is-in-dire-need-of-revitalization.png",
    authors: "Kosal Nith", date: "21 May 2020", outlet: "Southeast Asia Globe",
    zoteroType: "newspaperArticle",
    type: "opeds", year: "2020", oa: true, lang: "en",
    breadcrumb: "Newspaper article › Op-Ed",
    keywords: ["Agriculture","Rural Development","Policy","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 2 - Zero Hunger","SDG 1 - No Poverty","SDG 8 - Decent Work and Economic Growth"] },

  // ══ Journal Article (1) ══════════════════════════════════════

  { title: "Determinants of Informal Borrowing: Evidence from Households in 11 Rural Villages in Cambodia",
    ogImage: "https://kosalnith.github.io/static/img/og/determinants-of-informal-borrowing-evidence-from-households-in-11-rural-villages.png",
    authors: "Sovannroeun Samreth & Kosal Nith", date: "2026",
    outlet: "Journal of International Development Studies",
    month: "34(3), 15-26,",
    publisher: "The Japan Society for International Development",
    zoteroType: "journalArticle",
    type: "articles", year: "2026", oa: true, lang: "en",
    breadcrumb: "Journal article › Research › peer-review",
    abstract: "Informal borrowing remains an important source of financing for rural Cambodian households, exposing them to exploitative interest rates. This study examines the determinants of informal credit reliance using survey data from 1,183 households in 11 villages. We analyze how financial literacy, measured based on understanding of basic financial and economic concepts, social capital (based on community-based group participation), and household characteristics shape borrowing behavior. Higher financial literacy is significantly correlated with a lower likelihood of relying on informal loans. Finance- or credit-related group membership reduces informal borrowing; other community group membership does not. Household income and residential land ownership reduce reliance on informal borrowing. Household head’s age has nonlinear effects. Reliance on informal credit initially declines with age, reflecting greater experience. Increases observed at older ages may be related to changing economic circumstances. Combining financial literacy enhancement, income improvement, and finance-related community networks can promote safe and sustainable financial inclusion in Cambodia.",
    keywords: ["Informal Borrowing","Financial Literacy","Social Capital","Rural Households","Cambodia"],
    kwStrength: ["full","full","full","half","none"],
    link: "https://doi.org/10.32204/jids.34.3_15",
    sdgs: ["SDG 1 - No Poverty","SDG 8 - Decent Work and Economic Growth","SDG 10 - Reduced Inequalities"],
  resources: [
      { label: "Paper", url: "research/papers/Samreth2026.pdf", icon: "fa-file-pdf" },
      { label: "Slides", url: "research/slides/", icon: "fa-person-chalkboard" }
    ],
   },

  // ══ Book Chapters (2) ════════════════════════════════════════

  { title: "Cambodian Cassava: An Analysis on Production, Productivity, and Gender Impacts",
    ogImage: "https://kosalnith.github.io/static/img/og/cambodian-cassava-an-analysis-on-production-productivity-and-gender-impacts.png",
    authors: "Kosal Nith & Yuki Kanayama", date: "Oct 2025",
    outlet: "Navigating Through Crisis: Socio-Economic Impact of COVID-19 in the Mekong Delta Countries",
    zoteroType: "bookSection",
    chapterNum: "3",
    editor: "Sovannroeun Samreth",
    editorRole: "ed.",
    publisher: "Springer",
    pubCity: "Singapore",
    month: "October", year_pub: "2025",
    type: "chapters", year: "2025", oa: true, lang: "en",
    breadcrumb: "Book chapter › Research › peer-review",
    abstract: "Although the agriculture sector in Cambodia was initially considered less vulnerable to the COVID-19 pandemic, cassava farmers experienced severe economic hardship due to the increase in input prices, fluctuations in output prices, and challenges in infrastructure development. However, these aggregate impacts hide the disproportionate repercussions faced by cash crop farmers, who were more severely affected by public health restrictions and market disruptions. Using data from 301 cassava-farming households across five major cultivation provinces, this study examines the pandemic’s impact on production, labor productivity, and labor participation in Cambodia. Although the price of fresh cassava slightly increased and the price of cassava chips remained stable, farmers lost income due to the increase in input prices and the fall in productivity. Between 2019 and 2021, average production costs rose by 9.3%, while income declined by 8.5%. Despite expanding cultivated land and increasing hired labor, overall productivity decreased. These findings underscore the vulnerability of Cambodia’s cassava sector to external shocks and highlight the need for targeted policy interventions. The paper concludes with actionable recommendations to enhance value addition, strengthen domestic markets for cassava products, and support a resilient post-pandemic recovery.",
    keywords: ["Cassava","COVID-19","Agricultural Productivity","Gender","Cambodia"],
    kwStrength: ["full","full","full","half","none"],
    sdgs: ["SDG 2 - Zero Hunger","SDG 5 - Gender Equality","SDG 8 - Decent Work and Economic Growth"],
    link: "https://link.springer.com/chapter/10.1007/978-981-95-1637-7_3",
   resources: [
      { label: "Paper", url: "research/papers/camCassava_2026.pdf", icon: "fa-file-pdf" },
      { label: "Slides", url: "research/slides/Kosal_SARED23.pdf", icon: "fa-person-chalkboard" }
    ],
    figures: [
      { file: "ep1.jpg", caption: "Figure 1: Cassava production costs vs. income (2019–2021)" },
      { file: "ep2.jpg", caption: "Figure 2: Labor productivity by gender and province" },
      { file: "ep3.jpg", caption: "Table 1: Household-level regression results" }
    ] },

  
   { title: "Cambodia–Thailand Border Tensions, Broken Supply Chains: Insights and Foresights",
    ogImage: "https://kosalnith.github.io/static/img/og/food-science-in-cambodia.png",
    authors: "Kosal Nith", date: "Infore Memo, December 2025",
    outlet: "Future Forum",
    zoteroType: "report",
    publisher: "Future Forum",
    month: "December",
    year_pub: "2025",
    type: "reports", year: "2025", oa: true, lang: "en",
    breadcrumb: "Book chapter › Book",
    abstract: "The border tensions between Cambodia and Thailand have disrupted vital supply chains, which is a significant factor contributing to the slowdown of GDP growth in both nations. The impact, however, differs in nature and timeline. Thailand faces severe short-term consequences, including factory shutdowns due to a lack of raw materials and labor shortages while goods can not be exported to Cambodia. Conversely, Cambodia confronts more profound long-term risks: its automotive industry, heavily reliant on Thai components, could stop operations, while the nation must also manage an influx of returned migrant workers and found a costly structural shift to boost local investment. The optimal solution for both countries is to reopen the border as swiftly as possible, with diplomatic discussions prioritizing their shared economic partnership.",
    keywords: ["Supply Chain","ASEAN","Cambodia","Border Conflict"],
    kwStrength: ["full","full","full","half","none"],
    sdgs: ["SDG 9 - Industry, Innovation, and Infrastructure","SDG 12 - Responsible Consumption and Production"],
    link: "",
    resources: [
      { label: "Paper", url: "research/papers/Nith2025.pdf", icon: "fa-file-pdf" }
    ] },
    
    { title: "Food Science in Cambodia",
    ogImage: "https://kosalnith.github.io/static/img/og/food-science-in-cambodia.png",
    authors: "Kosal Nith", date: "2021",
    outlet: "Micro-Policy Intervention: Contemporary Policy Discussion in Cambodia",
    zoteroType: "bookSection",
    chapterNum: "13",
    editor: "Future Forum",
    editorRole: "ed.",
    publisher: "Future Forum",
    pubCity: "Phnom Penh",
    year_pub: "2021",
    type: "chapters", year: "2021", oa: true, lang: "en",
    breadcrumb: "Book chapter › Book",
    abstract: "This paper examines how the development of food science, the role of R&D in the promotion, and the development of the food industry could positively impact the agricultural sector in Cambodia.",
    keywords: ["Food Science","R&D","Agriculture","Policy","Cambodia"],
    kwStrength: ["full","full","full","half","none"],
    sdgs: ["SDG 2 - Zero Hunger","SDG 9 - Industry, Innovation, and Infrastructure","SDG 12 - Responsible Consumption and Production"],
    link: "https://www.futureforum.asia/policy-briefs-and-snapshots/food-science-in-cambodia",
    resources: [
      { label: "Paper", url: "research/papers/CamFood_2019.pdf", icon: "fa-file-pdf" }
    ] },

  // ══ Working Papers / Reports (4) — CMOS 18 §14.229 ══════════════════════════
  // Named institutional working papers have no dedicated Zotero type.
  // Per CMOS 18 §14.229, unpublished institutional documents cite as reports.
  // Zotero type: report. Chicago format: Series Name No. N. Institution, Month Year.

  { title: "Does Social Capital Strengthen the Stability of Household Income? Evidence from Cambodia",
    ogImage: "https://kosalnith.github.io/static/img/og/does-social-capital-strengthen-the-stability-of-household-income-evidence-from-c.png",
    authors: "Kosal Nith, Sovannroeun Samreth & Dina Chhorn",
    date: "Aug 2025", outlet: "Working paper",
    zoteroType: "report",
    seriesName: "Working Paper",
    month: "August", year_pub: "2025",
    abstract: "",
    type: "reports", year: "2025", oa: false, draftVersion: true, lang: "en",
    breadcrumb: "Report › Working paper",
    keywords: ["Social Capital","Household Income","Income Stability","Cambodia"],
    kwStrength: ["full","full","full","none"],
    sdgs: ["SDG 1 - No Poverty","SDG 10 - Reduced Inequalities","SDG 8 - Decent Work and Economic Growth"],
    resources: [
      { label: "Slides", url: "research/slides/SC_slides.pdf", icon: "fa-person-chalkboard" }
    ] },

  { title: "Measuring SEZ Spillovers in Data-Scarce Regions: Evidence from Cambodia's Open Building Data",
    ogImage: "https://kosalnith.github.io/static/img/og/measuring-sez-spillovers-in-data-scarce-regions-evidence-from-cambodias-open-bui.png",
    authors: "Kosal Nith, Daniel Yonto, Yudo Angorro & Vuthoun Khiev",
    date: "Jun 2025", outlet: "Submitted to South East Asia Research",
    zoteroType: "report",
    seriesName: "Submitted to South East Asia Research",
    month: "June", year_pub: "2025",
    type: "reports", year: "2025", oa: false, lang: "en", underReview: true,
    breadcrumb: "Report › Working paper",
    abstract: "The measurement of Special Economic Zones (SEZ) spatial impacts remains a persistent challenge for practitioners in understudied regions where conventional data collection methods prove cost-prohibitive. This study advances a replicable geospatial methodology leveraging Google's Open Buildings 2.5D Temporal Dataset to analyze development patterns in data-scarce contexts. Through examination of 11 SEZs in Cambodia's Svay Rieng province (2016-2023), we reveal two critical findings that challenge prevailing assumptions: first, SEZ-induced spillovers extend substantially beyond the conventionally assumed 1-2 kilometer impact radius; second, development follows a distinctive dual-ring spatial pattern, with outer zones (2-5km) demonstrating near-equivalent building density (21.27/km²) to immediate perimeter areas. Our approach provides three key contributions to the literature and practice: (1) a transferable framework for SEZ impact assessment in understudied regions, (2) empirical evidence challenging linear distance-decay models of agglomeration effects, and (3) demonstration of how accessible satellite-derived data can overcome traditional barriers to evidence-based planning. The methodology's versatility extends beyond SEZ analysis, offering practitioners an operational toolkit for growth monitoring, infrastructure impact assessment, and cross-border development analysis across ASEAN's diverse development contexts. By transforming publicly available building data into actionable spatial intelligence, this approach significantly enhances planning capacity in regions where ground-truth data remains systematically unavailable.",
    keywords: ["Special Economic Zones","Spillovers","Geospatial Analysis","Open Buildings","Cambodia"],
    kwStrength: ["full","full","full","half","none"],
    sdgs: ["SDG 9 - Industry, Innovation, and Infrastructure","SDG 11 - Sustainable Cities and Communities","SDG 8 - Decent Work and Economic Growth"] },

  { title: "20 Years of FDI in Cambodia: Towards Upper Middle-Income Status and Beyond",
    ogImage: "https://kosalnith.github.io/static/img/og/20-years-of-fdi-in-cambodia-towards-upper-middle-income-status-and-beyond.png",
    authors: "Simona Iammarino & Sumontheany Muth & Kosal Nith",
    date: "May 2024", outlet: "Cambodia Development Resource Institute",
    zoteroType: "report",
    seriesName: "CDRI Working Paper",
    seriesNum: "149",
    month: "May", year_pub: "2024",
    type: "reports", year: "2024", oa: true, lang: "en",
    breadcrumb: "Report › Working paper",
    abstract: "This study investigates Cambodia’s progress and potential in this regard by analysing its position and trajectory relative to Greenfield Foreign Direct Investment (FDI) inflows and outflows – where foreign firms establish new operations in Cambodia and Cambodian investors set up businesses abroad. This study also provides preliminary insights on Cambodia's integration into Global and Regional Value Chains (GVCs), always using FDI as a proxy, considering sectoral, functional, and geographical trends and comparing them with those of its neighbouring countries – Lao People’s Democratic Republic and Vietnam – over the 20 years between 2003 and 2022. The research employs a desk review, SWOT analysis, and descriptive statistics by using academic literature, policy documents, stakeholder policy dialogues, and the fDiMarkets database by Financial Times. The analysis shows that FDI has been instrumental in reshaping Cambodia’s economic structure, significantly contributing to economic development and job creation. Key sectors attracting FDI include real estate, financial services, and alternative/renewable energy, while textiles, real estate, and consumer products are notable for generating employment opportunities. However, most FDI projects are concentrated in the capital and coastal areas, and have focused on low-tech manufacturing, which offer limited opportunities for spillovers and industrial upgrading. Cambodia’s outward FDI began in 2008, mainly targeting ASEAN countries. This paper highlights that Cambodia has developed a robust policy framework to attract and re-orient inward FDI, including a provision of various incentives for Qualified Investment Projects. Recent FDI inflow trends indicate growing interest in sectors such as alternative and renewable energy, rubber, automotive OEM, leisure and entertainment, food, tobacco, beverages, and paper, printing, and packaging industries. These sectors could be pivotal for Cambodia’s future growth.",
    keywords: ["Foreign Direct Investment","Greenfield FDI","Global Value Chains","Economic Development","Cambodia"],
    kwStrength: ["full","full","full","half","none"],
    sdgs: ["SDG 8 - Decent Work and Economic Growth","SDG 9 - Industry, Innovation, and Infrastructure","SDG 17 - Partnerships for the Goals"],
    downloads: 0,
    resources: [
      { label: "Paper", url: "research/papers/20Y_FDI_2024.pdf", icon: "fa-file-pdf" },
      { label: "Slides", url: "research/slides/FDICam_Slides_28FMM.pdf", icon: "fa-person-chalkboard" },
      { label: "Thread", url: "https://x.com/KosalNith/status/1851881716870156789?s=20", icon: "fa-brands fa-x-twitter" }
    ] },

  { title: "Monetary Policy and Household Income Distribution: An Empirical Analysis from Cambodia",
    ogImage: "https://kosalnith.github.io/static/img/og/monetary-policy-and-household-income-distribution-an-empirical-analysis-from-cam.png",
    authors: "Kosal Nith", date: "Apr 2022", outlet: "Future Forum",
    zoteroType: "report",
    seriesName: "Future Forum Working Paper",
    month: "April", year_pub: "2022",
    type: "reports", year: "2022", oa: true, lang: "en",
    breadcrumb: "Report › Working paper",
    abstract: "This paper investigates to estimate the distributional effects of monetary policy shocks on macroeconomic aggregates and aggregate consumption. An earning heterogeneity channel, a Fisher channel and an interest rate exposure channel were applied as transmission channels affect aggregate spending when households have different average propensities of consume. Through the Structural VAR model, I find that monetary policy shock pursuant to the exchange rate has positive consequences on inflation, real output and the unemployment rate. Simultaneously, sufficient statistics from Cambodian cross-sectional data in the time period 2014–2020 suggests that all three channels are likely to amplify the effects of monetary policy. Furthermore, I discover that the increase in inequality of household consumption and liabilities over the past 7 years, while decreasing household income and assets inequality over the same period.",
    keywords: ["Monetary Policy","Income Distribution","Structural VAR","Inequality","Cambodia"],
    kwStrength: ["full","full","full","half","none"],
    sdgs: ["SDG 10 - Reduced Inequalities","SDG 1 - No Poverty","SDG 8 - Decent Work and Economic Growth"],
    downloads: 0,
    resources: [
      { label: "Paper", url: "", icon: "fa-file-pdf" },
      { label: "Online Appendix", url: "", icon: "fa-file-lines" },
      { label: "Replication Files", url: "", icon: "fa-code" }
    ] },

  // ══ Reports — Research, Mapping & Policy (8) — CMOS 18 §14.229 ══════════════
  // Research reports, mapping studies, and policy briefs are all institutional
  // reports in Zotero (report). CMOS 18 §14.229: Author. Title. Series No. N.
  // Institution, City, Month Year.

  { title: "Assessing MSME Market Dynamics and Resilience in Phnom Penh: Challenges and Opportunities",
    ogImage: "https://kosalnith.github.io/static/img/og/assessing-msme-market-dynamics-and-resilience-in-phnom-penh-challenges-and-oppor.png",
    authors: "Dina Chhorn, I Younan An, Kosal Nith, Sivly Houy, Muny Nhim Kean & Sosengphyrun Mao",
    date: "Nov 2025", outlet: "Cambodia Development Resource Institute",
    zoteroType: "report",
    type: "reports", year: "2025", oa: true, lang: "en",
    breadcrumb: "Report › Research report",
    abstract: "This report examines the market dynamics and resilience of micro, small, and medium enterprises (MSMEs) in Khan Meanchey, Phnom Penh, based on data from 14,820 establishments. MSMEs are deeply embedded in the urban economy, with nearly every household engaged in business activity. Despite a strong post-pandemic recovery in 2023, early signs of slowdown emerged in 2024 due to inflation, digital disruption, and rent insecurity. The high business turnover—1,790 openings versus 825 closures—reflects a survivalist approach to entrepreneurship rather than scalable growth. Most MSMEs remain informal and micro-scale, which limits their access to credit and formal support. Sectoral analysis reveals a concentration in low-productivity sectors, such as retail and food services, characterised by gender disparities and limited digital adoption. Formalisation and digital tools are linked to improved outcomes, especially in retail and hospitality. Manufacturing remains marginal and informal. Spatial analysis reveals localised resilience but highlights vulnerability to fluctuations in consumer demand, financial constraints, and tenancy issues. The report recommends targeted policy interventions, including formalisation incentives, digital transformation support, and inclusive training for women-led businesses. Strengthening MSME data systems and enabling secure access to tenancy and credit are essential for long-term resilience and inclusive urban development.",
    keywords: ["MSMEs","Urban Economy","Phnom Penh","Resilience","Entrepreneurship"],
    kwStrength: ["full","full","full","half","none"],
    sdgs: ["SDG 8 - Decent Work and Economic Growth","SDG 11 - Sustainable Cities and Communities","SDG 9 - Industry, Innovation, and Infrastructure"],
    downloads: 0, 
    resources: [
      { label: "Paper", url: "research/papers/camMSME_2025.pdf", icon: "fa-file-pdf" }
    ]},

  { title: "Government Ownership of Banks: Diversifying of Potential Products and Factors to Subsidize Agriculture",
    ogImage: "https://kosalnith.github.io/static/img/og/government-ownership-of-banks-diversifying-of-potential-products-and-factors-to.png",
    authors: "Kosal Nith", date: "Dec 2025", outlet: "Future Forum",
    zoteroType: "report",
    type: "reports", year: "2025", oa: true, lang: "en",
    breadcrumb: "Report › Research report",
    abstract: "It has recently been shown that government ownership of banks has a significant role in addressing market failures, improving social welfare and economic development. This study explores and identifies the potential products and factors in agriculture that public banks should subsidize. In this paper, the author investigates statistical properties of the two-step generalized method of moments (GMM) estimator to analyze the direct and indirect consumption of inputs in agricultural production on national-level data for 32 crop products and 14 livestock products from Cambodia during the 1989–2018 period. Many specifications have statistical significance and negative competent production growth. These results suggest that the proposed subsidies should clearly define the types of specialty products by local producers and their potential markets, both local and international. This paper investigates some policy options for government ownership of banks to improve agriculture. However, it must also adapt to new climate change and emergency events for the long-run sustainable development of the sector. Future directions should consider studying micro-data for specific types of products and regions.",
    keywords: ["Public Banks","Government Ownership","Agriculture","Subsidies","Cambodia"],
    kwStrength: ["full","full","full","half","none"],
    sdgs: ["SDG 2 - Zero Hunger","SDG 8 - Decent Work and Economic Growth","SDG 1 - No Poverty"],
    resources: [
      { label: "Paper", url: "research/papers/GOB_2021.pdf", icon: "fa-file-pdf" },
      { label: "Slides", url: "research/slides/GOB_Slides_ ELADES.pdf", icon: "fa-person-chalkboard" },
      { label: "Replication Files", url: "https://github.com/kosalnith/PublicBanks", icon: "fa-code" },
      { label: "Thread", url: "https://x.com/KosalNith/status/1418566500298805268?s=20", icon: "fa-brands fa-x-twitter" }
    ] },

  { title: "Mapping Study: Youth and Civil Society in Urban Cambodia",
    ogImage: "https://kosalnith.github.io/static/img/og/mapping-study-youth-and-civil-society-in-urban-cambodia.png",
    authors: "Kosal Nith", date: "Sep 2022", outlet: "Future Forum",
    zoteroType: "report",
    type: "reports", year: "2022", oa: false, restricted: true, lang: "en",
    breadcrumb: "Report › Mapping study",
    abstract: "Cambodia has one of the highest proportions of young people in the world. According to the United Nations Development Programme (2019), around 65.3% of the population is under the age of 30. This demographic dividend presents an opportunity for future prosperity, as the youth population can contribute to economic growth, social welfare, and inclusion. However, many Cambodian youth continue to face challenges in education, employment, and capacity development. Their potential role in promoting positive change is shaped by the support they receive. Barriers to youth participation in civil society include a shrinking democratic space, limited avenues for engagement with policies and politics, restrictive social norms, financial dependence, and a lack of encouragement and support. Despite these challenges, youth participation is vital for building democratic resilience and achieving a peaceful, inclusive, and prosperous society. Civil society organizations in Cambodia are working to harness the potential of youth as agents of change by enhancing their critical thinking and leadership skills, creating spaces for dialogue, and promoting engagement with governance and policy issues. Yet, further understanding is needed to clarify the roles and challenges of youth in civic engagement and social development. The European Union Delegation to Cambodia (EUD) recognises the importance of youth participation and is developing strategies to increase engagement during 2021–2027. To support this, a mapping study on youth and civil society in urban Cambodia was conducted to explore the aspirations, challenges, and needs of youth actors. The study aims to inform EUD’s efforts to empower youth and promote transformative change.",
    keywords: ["Youth","Civil Society","Civic Engagement","Democracy","Cambodia"],
    kwStrength: ["full","full","half","none","none"],
    sdgs: ["SDG 4 - Quality Education","SDG 16 - Peace, Justice and Strong Institutions","SDG 10 - Reduced Inequalities"] },

  // "Household Saving and Debt" is a chapter in an Asia Foundation edited survey volume
  // — Zotero type: bookSection (CMOS 18 §14.103)
  { title: "Household Saving and Debt",
    ogImage: "https://kosalnith.github.io/static/img/og/household-saving-and-debt.png",
    authors: "Kosal Nith & Summer-Solstice Thomas", date: "Jun 2021",
    outlet: "Revisiting the Pandemic: Rapid Survey on the Impact of Covid-19 on MSMEs and Households",
    zoteroType: "bookSection",
    editor: "The Asia Foundation",
    editorRole: "ed.",
    publisher: "The Asia Foundation",
    pubCity: "Phnom Penh",
    year_pub: "2021",
    type: "chapters", year: "2021", oa: true, lang: "en",
    sdgs: ["SDG 1 - No Poverty","SDG 8 - Decent Work and Economic Growth"],
    breadcrumb: "Book chapter › Edited volume",
    resources: [
      { label: "Paper", url: "research/papers/COVID19HHSD_2021.pdf", icon: "fa-file-pdf" }
    ] },

  // Internship report submitted to Royal University of Law and Economics — Zotero: report (CMOS 18 §14.229)
  { title: "Rapport de Stage : Assistant de Programme de l'Engagement des Jeunes pour l'Action Sociale",
    ogImage: "https://kosalnith.github.io/static/img/og/rapport-de-stage-assistant-de-programme-de-lengagement-des-jeunes-pour-laction-s.png",
    authors: "Kosal Nith", date: "Jan 2019",
    outlet: "Royal University of Law and Economics",
    zoteroType: "report",
    type: "reports", year: "2019", oa: true, lang: "fr",
    breadcrumb: "Report › Internship report",
    abstract: "Le présent document décrit le YRDP ainsi que mon travail dans cette organisation. Ce rapport vise à fournir un aperçu de l'utilisation des matières étudiées à l'Université Royale de Droit et de Sciences Économiques pour la mise en oeuvre de travail dans l'organisation de YRDP.",
    keywords: ["Youth","Civil Society","Social Engagement","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 4 - Quality Education","SDG 16 - Peace, Justice and Strong Institutions"], 
    resources: [
      { label: "Paper", url: "research/papers/RapportduStage_2018.pdf", icon: "fa-file-pdf" },
      { label: "Slides", url: "resarch/slides/Internship_Sharing_2018.pdf", icon: "fa-person-chalkboard" }
    ]},

  // Paper presented at the National Bank of Cambodia 5th Annual Macroeconomic Conference
  // — Zotero type: conferencePaper (CMOS 18 §14.217)
  { title: "Reinvigorating Cambodian Agriculture: Transforming from Extensive to Intensive Agriculture",
    ogImage: "https://kosalnith.github.io/static/img/og/reinvigorating-cambodian-agriculture-transforming-from-extensive-to-intensive-ag.png",
    authors: "Kosal Nith & Singhong Ly", date: "Dec 2018",
    outlet: "National Bank of Cambodia — 5th Annual Macroeconomic Conference",
    zoteroType: "conferencePaper",
    type: "confpapers", year: "2018", oa: true, lang: "en", award: true,
    breadcrumb: "Conference paper",
    abstract: "In this paper we analysis to identify the factor constraining on Cambodian agriculture in transforming from extensive to intensive agriculture. The objective of this study was to examine the general situation of Cambodian agriculture by comparing with neighboring countries in Southeast Asia from a period of 22 years (1996 – 2018) through cultivate areas, technical using, technologies using, fertilizer using, agricultural infrastructure system, agricultural production cost, agricultural output, agricultural market and climate change. The results show that the Cambodian agriculture sector is still at a level where there is significant need to improve the capacity of farmers, the new technologies use and the prevention of climate change. However, the production cost is still high cost and agricultural output has been in low prices. It also causes for farmers to lose confidence in farming and they will be stop working in the sector. Moreover, we also have other policies to improve agriculture sector in Cambodia.",
    keywords: ["Agriculture","Intensive Farming","Productivity","Southeast Asia","Cambodia"],
    kwStrength: ["full","full","full","half","none"],
    sdgs: ["SDG 2 - Zero Hunger","SDG 8 - Decent Work and Economic Growth","SDG 9 - Industry, Innovation, and Infrastructure"],
    downloads: 0,
    resources: [
      { label: "Paper", url: "research/papers/RCA_2018.pdf", icon: "fa-file-pdf" },
      { label: "Slides", url: "resarch/slides/RCA_Slides.pdf", icon: "fa-person-chalkboard" }
    ] },

  // ══ Policy Briefs (2) — CMOS 18 §14.229 → report ════════════════════════════
  // Short institutional policy documents have no dedicated Zotero type.
  // CMOS 18 §14.229 treats them as institutional reports. Zotero type: report.

  { title: "Monetary Policy: How Does It Become a Tool to Support Poor Households Afford to Purchase an Affordable House?",
    ogImage: "https://kosalnith.github.io/static/img/og/monetary-policy-how-does-it-become-a-tool-to-support-poor-households-afford-to-p.png",
    authors: "Kosal Nith", date: "Nov 2022", outlet: "Policy brief",
    zoteroType: "report",
    type: "reports", year: "2022", oa: false, draftVersion: true, unpub: true, lang: "en",
    breadcrumb: "Report › Policy brief",
    abstract: "Cambodia's current monetary policy lacks the autonomy to tackle affordable housing due to non-independent monetary tools and high dollarization. Liquidity-providing collateralized operations (LPCO) show promise as an innovative approach, partnering with private banks to offer low-interest mortgages.",
    keywords: ["Monetary Policy","Affordable Housing","Dollarization","Cambodia"],
    kwStrength: ["full","full","full","none"],
    sdgs: ["SDG 1 - No Poverty","SDG 11 - Sustainable Cities and Communities","SDG 10 - Reduced Inequalities"],
    resources: [
      { label: "Paper", url: "", icon: "fa-file-pdf" },
      { label: "Slides", url: "", icon: "fa-person-chalkboard" }
    ] },

  { title: "How Should Cambodia Prepare for the Fourth Industrial Revolution?",
    ogImage: "https://kosalnith.github.io/static/img/og/how-should-cambodia-prepare-for-the-fourth-industrial-revolution.png",
    authors: "Kosal Nith", date: "8 May 2020",
    outlet: "Cambodia Development Center, Essay Contest 2019",
    zoteroType: "report",
    type: "reports", year: "2020", oa: true, lang: "km", award: true,
    breadcrumb: "Report › Policy brief",
    keywords: ["Industry 4.0","Technology","Economic Development","Cambodia"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 9 - Industry, Innovation, and Infrastructure","SDG 8 - Decent Work and Economic Growth","SDG 4 - Quality Education"],
    link: "https://www.cd-center.org/wp-content/uploads/2020/05/P126_20200508_EC19W1.pdf",
    resources: [
      { label: "Paper", url: "research/papers/camIP4_2020.pdf", icon: "fa-file-pdf" },
      { label: "Slides", url: "research/slides/IP4.0_CDC.pdf", icon: "fa-person-chalkboard" }
    ] },


 // ══ Documents (1) ═════════════════════════════════════
    { title: "LaTeX Econ Slides Template",
    ogImage: "https://kosalnith.github.io/static/img/og/how-should-cambodia-prepare-for-the-fourth-industrial-revolution.png",
    authors: "Kosal Nith", date: "May 2026",
    outlet: "Kosal Nith",
    zoteroType: "document",
    type: "documents", year: "2026", oa: true, lang: "hm",
    breadcrumb: "Document",
    keywords: ["Presentation","Slides","Speaking","Economics"],
    kwStrength: ["full","full","half","none"],
    sdgs: ["SDG 8 - Decent Work and Economic Growth","SDG 4 - Quality Education"],
    resources: [
      { label: "White Mode", url: "", icon: "fa-person-chalkboard" },
      { label: "Dark Mode", url: "", icon: "fa-person-chalkboard" }
    ] },
  // ══ Work in Progress (3) ═════════════════════════════════════

  { title: "Dollarization and Monetary Policy in Cambodia: Challenges, International Lessons, and Policy Implications",
    ogImage: "https://kosalnith.github.io/static/img/og/dollarization-and-monetary-policy-in-cambodia-challenges-international-lessons-a.png",
    authors: "Kosal Nith, Sovannroeun Samreth & Hang Panha Hour",
    type: "progress", year: "progress", draftVersion:true, oa: false, lang: "en",
    sdgs: ["SDG 8 - Decent Work and Economic Growth","SDG 10 - Reduced Inequalities"],
    breadcrumb: "Work in progress" },

  { title: "International Trade and Globalization in Cambodia: The Role of International Cooperation",
    ogImage: "https://kosalnith.github.io/static/img/og/international-trade-and-globalization-in-cambodia-the-role-of-international-coop.png",
    authors: "Kosal Nith & Ronald A. Ruran",
    type: "progress", year: "progress", onHold: true, oa: false, lang: "en",
    sdgs: ["SDG 17 - Partnerships for the Goals","SDG 8 - Decent Work and Economic Growth"],
    breadcrumb: "Work in progress" },

  { title: "The Survey on Skills Demand in Cambodia",
    ogImage: "https://kosalnith.github.io/static/img/og/the-survey-on-skills-demand-in-cambodia.png",
    authors: "Kosal Nith, Dina Chhorn, Sivly Houy & Muny Nhim Kean",
    type: "progress", year: "progress", oa: false, submitted: true, lang: "en",
    sdgs: ["SDG 4 - Quality Education","SDG 8 - Decent Work and Economic Growth"],
    breadcrumb: "Work in progress" }
];
