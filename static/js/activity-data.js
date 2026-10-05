/* =============================================================
   activity-data.js
   Research activity records for Kosal Nith.
   Each object has:
     title        – display title
     titleUrl     – (optional) URL to make the title clickable
     person       – name
     role         – role at the activity
     date         – display date string (used for rendering)
     location     – city/country (merged with date on display)
     type         – internal sub-type (used by type-pill quick filters)
     typeCategory – must exactly match one of allActivityTypes in widget
     description  – short description
     keywords[]   – search/filter keywords
     sdg[]        – must use full "SDG N - Label" strings from sdgOptions
     resources[]  – optional: [{ type:"photo"|"video"|"other", label, url }]

   TYPE CATEGORIES (valid values for typeCategory):
     "Conference presentations"
     "Talks and presentations in private or public companies"
     "Organisation or participation in workshops, courses, seminars, exhibitions or similar"
     "Conference organisation or participation"
     "Consultancy"
     "Membership of review committee"
     "Other"
   ============================================================= */

const activities = [

  /* ══════════════════════════════════════════════════
     INVITED KEYNOTE PRESENTATIONS
     typeCategory: "Conference presentations"
     type: "Keynote"
  ══════════════════════════════════════════════════ */
  {
    title: "Extractive Industry Sustainability Workshop",
    titleUrl: "",
    person: "Kosal Nith", role: "Keynote Speaker",
    date: "Feb 2023", location: "Phnom Penh, Cambodia",
    type: "Keynote", typeCategory: "Conference presentations",
    description: "Keynote on extractive industry sustainability, organized by Youth Resource Development Program.",
    keywords: ["Extractive industry", "Sustainability", "Natural resources"],
    sdg: ["SDG 12 - Responsible Consumption and Production", "SDG 15 - Life on Land"],
    resources: []
  },
  {
    title: "YRDP Extractive Industry Campaign",
    titleUrl: "",
    person: "Kosal Nith", role: "Keynote Speaker",
    date: "2022", location: "Phnom Penh, Cambodia",
    type: "Keynote", typeCategory: "Conference presentations",
    description: "Keynote at Youth Resource Development Program Extractive Industry Campaign.",
    keywords: ["Extractive industry", "Natural resources", "Cambodia"],
    sdg: ["SDG 12 - Responsible Consumption and Production", "SDG 15 - Life on Land"],
    resources: []
  },
  {
    title: "YRDP Extractive Industry Campaign",
    titleUrl: "",
    person: "Kosal Nith", role: "Keynote Speaker",
    date: "2021", location: "Phnom Penh, Cambodia",
    type: "Keynote", typeCategory: "Conference presentations",
    description: "Keynote at Youth Resource Development Program Extractive Industry Campaign.",
    keywords: ["Extractive industry", "Natural resources", "Cambodia"],
    sdg: ["SDG 12 - Responsible Consumption and Production", "SDG 15 - Life on Land"],
    resources: []
  },
  {
    title: "5th NBC Annual Macroeconomic Conference",
    titleUrl: "https://www.nbc.gov.kh/download_files/news_and_events/announ_eng/5th_Macroconference_in_Eng.pdf",
    person: "Kosal Nith", role: "Keynote Speaker",
    date: "18 Dec 2018", location: "Cambodia-Japan Cooperation Center, Phnom Penh, Cambodia",
    type: "Keynote", typeCategory: "Conference presentations",
    description: "Keynote presentation at the National Bank of Cambodia Annual Macroeconomic Conference.",
    keywords: ["Macroeconomics", "Monetary policy", "Cambodia", "National Bank of Cambodia"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 17 - Partnerships for the Goals"],
    resources: [
      { type: "video", label: "Recording",    url: "https://www.youtube.com/watch?v=Yutzfbn7qao" },
    ]
  },

  /* ══════════════════════════════════════════════════
     CONFERENCE PRESENTATIONS
     typeCategory: "Conference presentations"
     type: "Conference presentation"
  ══════════════════════════════════════════════════ */
  {
    title: "3rd Southeast Asia Economic Research and Development Conference",
    titleUrl: "https://saerdconf.github.io/",
    person: "Kosal Nith", role: "Presenter",
    date: "30 Oct 2025 → 31 Oct 2025", location: "Paññāsāstra University of Cambodia, Siem Reap, Cambodia",
    type: "Conference presentation", typeCategory: "Conference presentations",
    description: "Presented research on economic development in Southeast Asia.",
    keywords: ["Economic development", "Southeast Asia", "Cambodia"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 17 - Partnerships for the Goals"],
    resources: []
  },
  {
    title: "PHC Conference on Monetary Innovations in Support of Riel Promotion, Financial Inclusion, and Green Financing",
    titleUrl: "https://www.pacte-grenoble.fr/en/news/monetary-innovations-support-riel-promotion-financial-inclusion-and-green-financing",
    person: "Kosal Nith", role: "Presenter",
    date: "21 Oct 2025 → 22 Oct 2025", location: "Royal University of Law and Economics, Phnom Penh, Cambodia",
    type: "Conference presentation", typeCategory: "Conference presentations",
    description: "Presented on monetary innovations supporting Riel promotion, financial inclusion, and green financing.",
    keywords: ["Monetary policy", "Financial inclusion", "Green finance", "Riel", "Cambodia"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 10 - Reduced Inequalities", "SDG 13 - Climate Action"],
    resources: []
  },
  {
    title: "3rd Ponlok Chomnes National Policy Forum",
    titleUrl: "https://policypulse.org/publications/knowledge-briefs/ponlok-chomnes-national-policy-forum-2025-booklet/",
    person: "Kosal Nith", role: "Presenter",
    date: "5 Sep 2025", location: "Phnom Penh, Cambodia",
    type: "Conference presentation", typeCategory: "Conference presentations",
    description: "Presented policy-relevant research on Cambodia's development at the national policy forum.",
    keywords: ["Policy", "Cambodia", "Development"],
    sdg: ["SDG 16 - Peace, Justice and Strong Institutions", "SDG 8 - Decent Work and Economic Growth"],
    resources: [
      { type: "video", label: "Recording",    url: "https://www.youtube.com/watch?v=vFDko4rZ40o" },
    ]
  },
  {
    title: "6th Pluralumn Workshop on Empowering Young Mind",
    titleUrl: "https://www.uni-bremen.de/en/hospo/news/details/susanna-bolz-praesentiert-auf-dem-6th-pluralumn-workshop-in-hamburg",
    person: "Kosal Nith", role: "Presenter",
    date: "27 Aug 2025 → 29 Aug 2025", location: "University of Hamburg , Hamburg, Germany (Virtual)",
    type: "Conference presentation", typeCategory: "Conference presentations",
    description: "Presented at the Pluralumn Workshop on Empowering Young Mind (virtual participation).",
    keywords: ["Youth", "Empowerment", "Education"],
    sdg: ["SDG 4 - Quality Education", "SDG 10 - Reduced Inequalities"],
    resources: []
  },
  {
    title: "6th Nordic Post-Keynesian Conference",
    titleUrl: "https://www.business.aau.dk/research/research-groups/mamtep/pkconference?marketing=pkconference.aau.dk",
    person: "Kosal Nith", role: "Presenter",
    date: "23 Apr 2025 → 25 Apr 2025", location: "Aalborg, Denmark",
    type: "Conference presentation", typeCategory: "Conference presentations",
    description: "Presented on post-Keynesian economics and macroeconomic policy.",
    keywords: ["Post-Keynesian", "Macroeconomics", "Heterodox economics"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 10 - Reduced Inequalities"],
    resources: []
  },
  {
    title: "28th Forum for Macroeconomics and Macroeconomic Policies Conference",
    titleUrl: "https://www.boeckler.de/de/dokumentationen-2720-progressive-perspectives-in-times-of-polycrisis-57227.htm",
    person: "Kosal Nith", role: "Presenter",
    date: "24 Oct 2024 → 26 Oct 2024", location: "Holiday Inn Berlin, Berlin, Germany",
    type: "Conference presentation", typeCategory: "Conference presentations",
    description: "Presented on macroeconomic policy challenges at the FMM Conference.",
    keywords: ["Macroeconomics", "Policy", "Macroeconomic policy"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 10 - Reduced Inequalities"],
    resources: [
    { type: "video", label: "Recording",    url: "https://www.youtube.com/watch?v=LeYho9EKR7E&list=PLRIU-ZP0fg53sxVifh1phP9kuNBDdKlxD" },
    { type: "other", label: "Program",       url: "https://www.boeckler.de/data/downloads/OEA/Veranstaltungen/2024/v_2024_10_24_fmm_programm.pdf" },
  ]
  },
  {
    title: "China-Southeast Asia Sustainable Development Workshop",
    titleUrl: "https://ysi.ineteconomics.org/event/china-southeast-asia-sustainable-development-workshop/",
    person: "Kosal Nith", role: "Presenter",
    date: "21 Oct 2024 → 22 Oct 2024", location: "Xi’an Jiaotong-Liverpool University, Suzhou, China",
    type: "Conference presentation", typeCategory: "Conference presentations",
    description: "Presented on sustainable development and China-Southeast Asia economic relations.",
    keywords: ["Sustainable development", "China", "Southeast Asia", "Regional development"],
    sdg: ["SDG 17 - Partnerships for the Goals", "SDG 8 - Decent Work and Economic Growth", "SDG 13 - Climate Action"],
    resources: []
  },
  {
    title: "Workshop on Southeast Asia Economic Development in the Post-Pandemic Era",
    titleUrl: "https://ysi.ineteconomics.org/event/ysi-workshop-on-southeast-asia-economic-development-in-the-post-pandemic-era/",
    person: "Kosal Nith", role: "Presenter",
    date: "12 Sep 2024 → 13 Sep 2024", location: "University of Malaya, Kuala Lumpur, Malaysia",
    type: "Conference presentation", typeCategory: "Conference presentations",
    description: "Presented on Southeast Asia economic development in the post-pandemic context.",
    keywords: ["Southeast Asia", "Post-pandemic", "Economic development"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 3 - Good Health and Well-being"],
    resources: []
  },
  {
    title: "1st Southeast Asia Economic Research and Development Conference",
    titleUrl: "https://cdri.org.kh/news/southeast-asia-s-economic-research-and-development-conference",
    person: "Kosal Nith", role: "Presenter",
    date: "16 Dec 2023 → 17 Dec 2023", location: "Phnom Penh, Cambodia",
    type: "Conference presentation", typeCategory: "Conference presentations",
    description: "Presented research on economic development in Southeast Asia at the inaugural conference.",
    keywords: ["Economic research", "Southeast Asia", "Development"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 17 - Partnerships for the Goals"],
    resources: []
  },
  {
    title: "32nd Association of Southeast Asian Studies Annual Conference",
    titleUrl: "https://aseasuk.org/aseas-conference/2023-conference/",
    person: "Kosal Nith", role: "Presenter",
    date: "27 Nov 2023 → 30 Nov 2023", location: "University of Indonesia, Depok, Indonesia",
    type: "Conference presentation", typeCategory: "Conference presentations",
    description: "Presented at the Association of Southeast Asian Studies Annual Conference.",
    keywords: ["Southeast Asian studies", "ASEAN", "Regional studies"],
    sdg: ["SDG 17 - Partnerships for the Goals", "SDG 16 - Peace, Justice and Strong Institutions"],
    resources: []
  },
  {
    title: "CDRI Regional Symposium 2023",
    titleUrl: "https://cdri.org.kh/news/regional-symposium-on-the-greater-mekong-subregion-s-economic-recovery-the-uncertainty-of-external-events-and-inclusive-development",
    person: "Kosal Nith", role: "Presenter",
    date: "22 Nov 2023", location: "Hyatt Regency Phnom Penh, Phnom Penh, Cambodia",
    type: "Conference presentation", typeCategory: "Conference presentations",
    description: "Presented at the Cambodia Development Resource Institute Regional Symposium.",
    keywords: ["CDRI", "Regional development", "Cambodia"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 17 - Partnerships for the Goals"],
    resources: []
  },
  {
    title: "ELADES YSI Alumni Workshop",
    titleUrl: "https://elades.cepal.org/es/node/64",
    person: "Kosal Nith", role: "Presenter",
    date: "12 Jul 2022 → 13 Jul 2022", location: "Economic Commission for Latin America and the Caribbean, Santiago, Chile (Virtual)",
    type: "Conference presentation", typeCategory: "Conference presentations",
    description: "Presented at the ELADES Young Scholars Initiative Alumni Workshop (virtual).",
    keywords: ["Young scholars", "Heterodox economics", "Latin America"],
    sdg: ["SDG 10 - Reduced Inequalities", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "5th Nordic Post-Keynesian Conference",
    titleUrl: "https://www.business.aau.dk/the-fifth-nordic-post-keynesian-conference-e16577",
    person: "Kosal Nith", role: "Presenter",
    date: "27 Apr 2022 → 29 Apr 2022", location: " Aalborg University, Aalborg, Denmark",
    type: "Conference presentation", typeCategory: "Conference presentations",
    description: "Presented on post-Keynesian economics.",
    keywords: ["Post-Keynesian", "Macroeconomics", "Heterodox economics"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 10 - Reduced Inequalities"],
    resources: []
  },

  /* ══════════════════════════════════════════════════
     DISCUSSIONS
     typeCategory: "Conference presentations"
     type: "Discussion"
  ══════════════════════════════════════════════════ */
  {
    title: "CDRI Monthly Research Seminar",
    titleUrl: "https://web.facebook.com/share/p/1K7qRs2ERF/",
    person: "Kosal Nith", role: "Discussant",
    date: "25 Feb 2026", location: "Online",
    type: "Discussion", typeCategory: "Organisation or participation in workshops, courses, seminars, exhibitions or similar",
    description: "Discussant for paper by Samuel Amponsah, Krishtee Seebaluck, and Afolabi Balogun at CDRI Monthly Research Seminar.",
    keywords: ["Child labor", "Ghana", "Financial diaries", "Agriculture", "CDRI"],
    sdg: ["SDG 1 - No Poverty", "SDG 2 - Zero Hunger", "SDG 8 - Decent Work and Economic Growth"],
    resources: [
      { type: "video", label: "Recording",    url: "https://youtu.be/oPsKCBB19pE" }
    ]
  },

  /* ══════════════════════════════════════════════════
     INVITED SEMINARS
     typeCategory: "Talks and presentations in private or public companies"
     type: "Seminar"
  ══════════════════════════════════════════════════ */
  {
    title: "CDRI Monthly Research Seminar",
    titleUrl: "https://cdri.org.kh/detail/event/does-social-capital-strengthen-household-resilience-in-cambodia-evidence-from-panel-data",
    person: "Kosal Nith", role: "Speaker",
    date: "30 Apr 2025", location: "Online",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at Cambodia Development Resource Institute on economic development.",
    keywords: ["Economic development", "Cambodia", "CDRI"],
    sdg: ["SDG 1 - No Poverty", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "Economic Resarch Seminar",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2024", location: "National University of Management, Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at National University of Management on macroeconomic policy.",
    keywords: ["Macroeconomics", "Policy", "Cambodia", "Higher education"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 4 - Quality Education"],
    resources: []
  },
  {
    title: "Voice of America",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2023", location: "Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Discussion on economic issues in Cambodia at Voice of America.",
    keywords: ["Media", "Economics", "Cambodia"],
    sdg: ["SDG 16 - Peace, Justice and Strong Institutions", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "Politico 360",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2023", location: "Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at Politico 360 on political economy.",
    keywords: ["Political economy", "Media", "Cambodia"],
    sdg: ["SDG 16 - Peace, Justice and Strong Institutions", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "Glocator Research and Consulting",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2023", location: "Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at Glocator Research and Consulting.",
    keywords: ["Research", "Consulting", "Cambodia"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 17 - Partnerships for the Goals"],
    resources: []
  },
  {
    title: "Youth Resource Development Program",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2021", location: "Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at Youth Resource Development Program.",
    keywords: ["Youth", "Development", "Cambodia"],
    sdg: ["SDG 4 - Quality Education", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "IR's Talk",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2021", location: "Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at IR's Talk on international relations and economics.",
    keywords: ["International relations", "Economics"],
    sdg: ["SDG 16 - Peace, Justice and Strong Institutions", "SDG 17 - Partnerships for the Goals"],
    resources: []
  },
  {
    title: "Social Breaking News",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2021", location: "Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at Social Breaking News media platform.",
    keywords: ["Media", "Economics", "Cambodia"],
    sdg: ["SDG 16 - Peace, Justice and Strong Institutions"],
    resources: []
  },
  {
    title: "Sethakech",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2021", location: "Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at Sethakech on economic issues.",
    keywords: ["Economics", "Cambodia", "Sethakech"],
    sdg: ["SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "Panel Policy Discussion",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2020", location: "Future Forum, Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at Future Forum on economic development.",
    keywords: ["Economic development", "Cambodia", "Future Forum"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 16 - Peace, Justice and Strong Institutions"],
    resources: []
  },
  {
    title: "Markets and Markets Research Private Ltd",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2020", location: "Virtual",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited virtual seminar at Markets and Markets Research Private Ltd.",
    keywords: ["Market research", "Economics"],
    sdg: ["SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "Weekly Politikoffee Forum",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2020", location: "Virtual",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited virtual seminar at Politikoffee on political economy.",
    keywords: ["Political economy", "Policy"],
    sdg: ["SDG 16 - Peace, Justice and Strong Institutions", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "Youth Resource Development Program",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2020", location: "Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at Youth Resource Development Program.",
    keywords: ["Youth", "Development", "Cambodia"],
    sdg: ["SDG 4 - Quality Education", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "Cambodia Development Center",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2019", location: "Cambodia Development Center, Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at Cambodia Development Center.",
    keywords: ["Development", "Cambodia"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 16 - Peace, Justice and Strong Institutions"],
    resources: []
  },
  {
    title: "Future Forum",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2019", location: "Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at Future Forum.",
    keywords: ["Development", "Cambodia", "Future Forum"],
    sdg: ["SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "Voice of Democracy (VOD)",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2019", location: "Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at Voice of Democracy (VOD).",
    keywords: ["Media", "Economics", "Cambodia", "Democracy"],
    sdg: ["SDG 16 - Peace, Justice and Strong Institutions"],
    resources: []
  },
  {
    title: "Royal University of Law and Economics",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2019", location: "Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at Royal University of Law and Economics.",
    keywords: ["Economics", "Higher education", "Cambodia"],
    sdg: ["SDG 4 - Quality Education", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "Youth Resource Development Program",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2018", location: "Phnom Penh, Cambodia",
    type: "Seminar", typeCategory: "Talks and presentations in private or public companies",
    description: "Invited seminar at Youth Resource Development Program.",
    keywords: ["Youth", "Development", "Cambodia"],
    sdg: ["SDG 4 - Quality Education", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },

  /* ══════════════════════════════════════════════════
     PARTICIPATION IN COURSES, CONFERENCES, SEMINARS
     typeCategory: "Organisation or participation in workshops, courses, seminars, exhibitions or similar"
     type: "Participation"
  ══════════════════════════════════════════════════ */
  {
    title: "1st Summer School on Empirical Stock-Flow-Consistent Modelling",
    titleUrl: "https://ysi.ineteconomics.org/event/first-summer-school-on-empirical-stock-flow-consistent-modelling/",
    person: "Kosal Nith", role: "Participant",
    date: "17 Aug 2026 → 21 Aug 2026 (scheduled)", location: "Aalborg University, Aalborg, Denmark",
    type: "Organisation", typeCategory: "Organisation or participation in workshops, courses, seminars, exhibitions or similar",
    description: "Participating in an international summer school on empirical economic models.",
    keywords: ["SFC", "Economy", "Business", "Society"],
    sdg: ["SDG 13 - Climate Action", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  
  {
    title: "International Conference on Climate Change and Its Impacts on the Economy, Business, and Society",
    titleUrl: "https://iccciebs-2026.netlify.app",
    person: "Kosal Nith", role: "Co-organiser",
    date: "15 Jul 2026 → 17 Jul 2026 (scheduled)", location: "Pondicherry University, Pondicherry, India",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Participating in international conference on climate change and its economic and social impacts.",
    keywords: ["Climate change", "Economy", "Business", "Society", "India"],
    sdg: ["SDG 13 - Climate Action", "SDG 8 - Decent Work and Economic Growth", "SDG 17 - Partnerships for the Goals"],
    resources: []
  },
  {
    title: "Blueprints for a New Economy Fellowship Program Convening",
    titleUrl: "https://www.linkedin.com/posts/grieve-chelwa-b2a04011_a-few-weeks-ago-i-had-the-immense-privilege-activity-7379235447010484224-B1zn/",
    person: "Kosal Nith", role: "Participant",
    date: "29 Aug 2025 → 01 Sep 2025", location: "Protea Hostel Lusaka Tower, Lusaka, Zambia",
    type: "Participation", typeCategory: "Organisation or participation in workshops, courses, seminars, exhibitions or similar",
    description: "Fellowship convening on new economic models, organized by Oxfam America.",
    keywords: ["New economy", "Fellowship", "Post-neoliberalism", "Oxfam"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 10 - Reduced Inequalities", "SDG 1 - No Poverty"],
    resources: [
          { type: "other", label: "Report",       url: "https://oxfam.app.box.com/s/cpqkz98olc4xrnqdd6fzefikgis7nuiu" },

    ]
  },
  {
    title: "Global Development Conference 2024",
    titleUrl: "https://www.gdn.int/global-development-conference-2024",
    person: "Kosal Nith", role: "Participant",
    date: "26 Nov 2024 → 28 Nov 2024", location: "University of the South Pacific, Suva, Fiji",
    type: "Participation", typeCategory: "Organisation or participation in workshops, courses, seminars, exhibitions or similar",
    description: "Attended Global Development Network annual conference.",
    keywords: ["Global development", "Development economics", "GDN"],
    sdg: ["SDG 17 - Partnerships for the Goals", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "Summer School in Advanced Methods for Economics and Political Economy",
    titleUrl: "https://business.leeds.ac.uk/departments-economics/events/event/982/beyond-the-optimising-agent-summer-school-in-advanced-methods-for-economics-and-political-economy",
    person: "Kosal Nith", role: "Participant",
    date: "24 Jun 2024 → 28 Jun 2024", location: "University of Leeds, Leeds, UK",
    type: "Participation", typeCategory: "Organisation or participation in workshops, courses, seminars, exhibitions or similar",
    description: "Attended summer school on advanced econometric and political economy methods.",
    keywords: ["Advanced methods", "Econometrics", "Political economy", "Summer school"],
    sdg: ["SDG 4 - Quality Education", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "Workshop on Gender in Labor Market and Mobility",
    titleUrl: "",
    person: "Kosal Nith", role: "Participant",
    date: "03 Nov 2023 → 09 Nov 2023", location: "Chulalongkorn University, Bangkok, Thailand",
    type: "Participation", typeCategory: "Organisation or participation in workshops, courses, seminars, exhibitions or similar",
    description: "Participated in workshop on gender, labor market, and mobility.",
    keywords: ["Gender", "Labor market", "Mobility", "Thailand"],
    sdg: ["SDG 5 - Gender Equality", "SDG 8 - Decent Work and Economic Growth", "SDG 10 - Reduced Inequalities"],
    resources: []
  },
  {
    title: "Summer School on the Professions of Francophone Tourism",
    titleUrl: "",
    person: "Kosal Nith", role: "Participant",
    date: "21 Jul 2019 → 26 Jul 2019", location: "École Normale Supérieure de Luang Prabang, Luang Prabang, Laos",
    type: "Participation", typeCategory: "Organisation or participation in workshops, courses, seminars, exhibitions or similar",
    description: "Attended summer school on Francophone tourism professions in Laos.",
    keywords: ["Tourism", "Francophone", "Laos", "Summer school"],
    sdg: ["SDG 4 - Quality Education", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },

  /* ══════════════════════════════════════════════════
     CONFERENCE ORGANISATION
     typeCategory: "Conference organisation or participation"
     type: "Organisation"
  ══════════════════════════════════════════════════ */
  {
    title: "Workshop on Towards Inclusive Digital and Green Economies: Gendered Barriers and Opportunities in Cambodia",
    titleUrl: "",
    person: "Kosal Nith", role: "Co-organiser",
    date: "22 May 2026", location: "Cambodia Development Resource Institute, Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Organisation or participation in workshops, courses, seminars, exhibitions or similar",
    description: "Co-organiser of the dissemination workshop on inclusive digital and green economies in Cambodia.",
    keywords: ["Gender", "Digital", "Green Economy", "Gender"],
    sdg: ["SDG 5 - Gender Equality", "SDG 8 - Decent Work and Economic Growth", "SDG 9 - Industry, Innovation and Infrastructure"],
    resources: []
  },
   {
    title: "4th Southeast Asia Economic Research and Development Conference",
    titleUrl: "https://saerdconf.github.io/",
    person: "Kosal Nith", role: "Co-organiser",
    date: "3 Dec 2026 → 4 Dec 2026 (scheduled)", location: "Paññāsāstra University of Cambodia, Siem Reap, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organiser of the 4th annual Southeast Asia Economic Research and Development Conference.",
    keywords: ["Conference", "Southeast Asia", "Economic development"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 17 - Partnerships for the Goals"],
    resources: []
  },
  {
    title: "Untold Stories Behind Financial Crises (1825–2025): Plurality of Causes and Multidimensional Consequences",
    titleUrl: "https://triangle.ens-lyon.fr/spip.php?article13572",
    person: "Kosal Nith", role: "Co-organiser",
    date: "15 Dec 2025 → 16 Dec 2025", location: "University of Lumière Lyon 2, Lyon, France (Virtual)",
    type: "Organisation", typeCategory: "Organisation or participation in workshops, courses, seminars, exhibitions or similar",
    description: "Co-organizing conference on the history of financial crises from 1825 to 2025.",
    keywords: ["Financial crises", "Economic history", "Lyon"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 16 - Peace, Justice and Strong Institutions"],
    resources: []
  },
  {
    title: "Webinar Series on Rethinking Capitalism and Economic Order",
    titleUrl: "https://ysi.ineteconomics.org/event/rethinking-capitalism-and-economic-order-i/",
    person: "Kosal Nith", role: "Co-organiser",
    date: "Sep 2025 → present", location: "Online",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing an ongoing webinar series on rethinking capitalism and the global economic order.",
    keywords: ["Capitalism", "Economic order", "Heterodox economics", "Webinar"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 10 - Reduced Inequalities", "SDG 16 - Peace, Justice and Strong Institutions"],
    resources: []
  },
  {
    title: "3rd Southeast Asia Economic Research and Development Conference",
    titleUrl: "https://saerdconf.github.io/",
    person: "Kosal Nith", role: "Co-organiser",
    date: "30 Oct 2025 → 31 Oct 2025", location: "Paññāsāstra University of Cambodia, Siem Reap, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Lead organiser of the 3rd annual Southeast Asia Economic Research and Development Conference.",
    keywords: ["Conference", "Southeast Asia", "Economic development"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 17 - Partnerships for the Goals"],
    resources: []
  },
  {
    title: "CDRI Regional Symposium 2024",
    titleUrl: "https://cdri.org.kh/news/2nd-regional-symposium-on-digital-and-green-economy-in-the-greater-mekong-subregion",
    person: "Kosal Nith", role: "Lead organiser",
    date: "3 Dec 2024", location: "Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Lead organiser of the CDRI Regional Symposium.",
    keywords: ["CDRI", "Regional development", "Cambodia", "Symposium"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 17 - Partnerships for the Goals"],
    resources: []
  },
  {
    title: "China-Southeast Asia Sustainable Development Workshop",
    titleUrl: "https://ysi.ineteconomics.org/event/china-southeast-asia-sustainable-development-workshop/",
    person: "Kosal Nith", role: "Co-organiser",
    date: "21 Oct 2024 → 22 Oct 2024", location: "Xi’an Jiaotong-Liverpool University, Suzhou, China",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing the China-Southeast Asia Sustainable Development Workshop.",
    keywords: ["Sustainable development", "China", "Southeast Asia"],
    sdg: ["SDG 17 - Partnerships for the Goals", "SDG 13 - Climate Action", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  },
  {
    title: "Workshop on Southeast Asia Economic Development in the Post-Pandemic Era",
    titleUrl: "https://ysi.ineteconomics.org/event/ysi-workshop-on-southeast-asia-economic-development-in-the-post-pandemic-era/",
    person: "Kosal Nith", role: "Co-organiser",
    date: "12 Sep 2024 → 13 Sep 2024", location: "University of Malaya, Kuala Lumpur, Malaysia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing workshop on post-pandemic economic development in Southeast Asia.",
    keywords: ["Post-pandemic", "Economic development", "Southeast Asia"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 3 - Good Health and Well-being"],
    resources: []
  },
  {
    title: "2nd Southeast Asia Economic Research and Development Conference",
    titleUrl: "https://saerdconf.github.io/2024-edition.html",
    person: "Kosal Nith", role: "Lead organiser",
    date: "Aug 15 2024 → 16 Aug 2024", location: "Paññāsāstra University of Cambodia, Siem Reap, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Lead organiser of the 2nd Southeast Asia Economic Research and Development Conference.",
    keywords: ["Conference", "Southeast Asia", "Economic development"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 17 - Partnerships for the Goals"],
    resources: []
  },
  {
    title: "1st Southeast Asia Economic Research and Development Conference",
    titleUrl: "https://saerdconf.github.io/2023-edition.html",
    person: "Kosal Nith", role: "Lead organiser",
    date: "16 Dec 2023 → 17 Dec 2023", location: "Royal University of Law and Economics, Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Lead organiser of the inaugural Southeast Asia Economic Research and Development Conference.",
    keywords: ["Conference", "Southeast Asia", "Economic development"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 17 - Partnerships for the Goals"],
    resources: []
  },
  {
    title: "CDRI Regional Symposium 2023",
    titleUrl: "https://cdri.org.kh/news/regional-symposium-on-the-greater-mekong-subregion-s-economic-recovery-the-uncertainty-of-external-events-and-inclusive-development",
    person: "Kosal Nith", role: "Lead organiser",
    date: "03 Nov 2023", location: "Hyatt Regency Phnom Penh, Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Lead organiser of the CDRI Regional Symposium.",
    keywords: ["CDRI", "Regional development", "Cambodia", "Symposium"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 17 - Partnerships for the Goals"],
    resources: []
  },
  {
    title: "Sethakech Webinar Series",
    titleUrl: "",
    person: "Kosal Nith", role: "Speaker",
    date: "2021", location: "Phnom Penh, Cambodia",
    type: "Participation", typeCategory: "Organisation or participation in workshops, courses, seminars, exhibitions or similar",
    description: "Co-organizing the Sethakech Webinar Series on economic issues.",
    keywords: ["Webinar", "Economics", "Cambodia", "Sethakech"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 16 - Peace, Justice and Strong Institutions"],
    resources: []
  },
  {
    title: "Sethakech Webinar Series",
    titleUrl: "https://sites.google.com/view/sethakech/webinars",
    person: "Kosal Nith", role: "Co-organiser",
    date: "Jul 2020 → Aug 2021", location: "Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Organisation or participation in workshops, courses, seminars, exhibitions or similar",
    description: "Co-organizing the Sethakech Webinar Series on economic issues.",
    keywords: ["Webinar", "Economics", "Cambodia", "Sethakech"],
    sdg: ["SDG 8 - Decent Work and Economic Growth", "SDG 16 - Peace, Justice and Strong Institutions"],
    resources: []
  },
  {
    title: "Econ Study Trip 2019",
    titleUrl: "https://www.facebook.com/share/v/18EbxMXSz5/",
    person: "Kosal Nith", role: "Lead organiser",
    date: "07 Mar 2019 → 10 Mar 2019", location: "Siem Reap, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Lead organiser of the Economics Study Trip to Siem Reap.",
    keywords: ["Education", "Economics", "Cambodia"],
    sdg: ["SDG 4 - Quality Education", "SDG 8 - Decent Work and Economic Growth"],
    resources: [
      { type: "video", label: "Recording",    url: "https://www.facebook.com/share/v/1GatnguyBv/" },
      ]
  },
  {
    title: "Econ Juniors' Day 2018",
    titleUrl: "",
    person: "Kosal Nith", role: "Co-organiser",
    date: "23 Oct 2018", location: "Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing the Econ Juniors' Day event.",
    keywords: ["Education", "Economics", "Youth", "Cambodia"],
    sdg: ["SDG 4 - Quality Education"],
    resources: []
  },
  {
    title: "Extractive Industries Exposure Trip",
    titleUrl: "",
    person: "Kosal Nith", role: "Co-organiser",
    date: "Sep 2018", location: "Preah Vihear, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing extractive industries exposure trip to Preah Vihear.",
    keywords: ["Extractive industry", "Field trip", "Cambodia"],
    sdg: ["SDG 12 - Responsible Consumption and Production", "SDG 15 - Life on Land"],
    resources: []
  },
  {
    title: "Extractive Industries Advocacy Workshop",
    titleUrl: "",
    person: "Kosal Nith", role: "Co-organiser",
    date: "Aug 2018", location: "Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing workshop on advocacy around extractive industries.",
    keywords: ["Extractive industry", "Advocacy", "Cambodia"],
    sdg: ["SDG 12 - Responsible Consumption and Production", "SDG 16 - Peace, Justice and Strong Institutions"],
    resources: []
  },
  {
    title: "Econ New Year Day 2018",
    titleUrl: "",
    person: "Kosal Nith", role: "Co-organiser",
    date: "2018", location: "Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing the Economics New Year Day event.",
    keywords: ["Economics", "Community", "Cambodia"],
    sdg: ["SDG 4 - Quality Education"],
    resources: []
  },
  {
    title: "Ligue de la Filière Spéciale Francophone 2018-2019",
    titleUrl: "",
    person: "Kosal Nith", role: "Co-organiser",
    date: "Nov 2018 → Feb 2029", location: "Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing the Francophone League event.",
    keywords: ["Francophone", "Education", "Cambodia"],
    sdg: ["SDG 4 - Quality Education"],
    resources: []
  },
  {
    title: "Potluck Social Discussion",
    titleUrl: "",
    person: "Kosal Nith", role: "Lead organiser",
    date: "2018", location: "Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Lead organiser of the Potluck Social Discussion event.",
    keywords: ["Community", "Social discussion", "Cambodia"],
    sdg: ["SDG 16 - Peace, Justice and Strong Institutions", "SDG 10 - Reduced Inequalities"],
    resources: []
  },
  {
    title: "Extractive Industries Campaign 2018",
    titleUrl: "",
    person: "Kosal Nith", role: "Co-organiser",
    date: "Nov 2018", location: "Youth Resource Development Program, Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing campaign on extractive industries.",
    keywords: ["Extractive industry", "Advocacy", "Campaign"],
    sdg: ["SDG 12 - Responsible Consumption and Production", "SDG 16 - Peace, Justice and Strong Institutions"],
    resources: []
  },
  {
    title: "Youth's Perspective on Space for Social Activism",
    titleUrl: "",
    person: "Kosal Nith", role: "Co-organiser",
    date: "Jul 2017 → Oct 2017", location: "Youth Resource Development Program, Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing forum on youth perspectives on social activism.",
    keywords: ["Youth", "Social activism", "Civil society", "Cambodia"],
    sdg: ["SDG 16 - Peace, Justice and Strong Institutions", "SDG 10 - Reduced Inequalities"],
    resources: []
  },
  {
    title: "Econ New Year Day 2018",
    titleUrl: "",
    person: "Kosal Nith", role: "Co-organiser",
    date: "23 Dec 2017", location: "Royal University of Law and Economics, Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing the Economics New Year Day event.",
    keywords: ["Economics", "Community", "Cambodia"],
    sdg: ["SDG 4 - Quality Education"],
    resources: []
  },
  {
    title: "Ligue de la Filière Spéciale Francophone 2017-2018",
    titleUrl: "",
    person: "Kosal Nith", role: "Co-organiser",
    date: "Nov 2017 → Feb 2018", location: "Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing the Francophone League event.",
    keywords: ["Francophone", "Education", "Cambodia"],
    sdg: ["SDG 4 - Quality Education"],
    resources: []
  },
  {
    title: "Extractive Industries Campaign 2018",
    titleUrl: "",
    person: "Kosal Nith", role: "Co-organiser",
    date: "2017", location: "Youth Resource Development Program, Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing campaign on extractive industries.",
    keywords: ["Extractive industry", "Advocacy", "Campaign"],
    sdg: ["SDG 12 - Responsible Consumption and Production", "SDG 16 - Peace, Justice and Strong Institutions"],
    resources: []
  },
  {
    title: "Econ New Year Day 2017",
    titleUrl: "",
    person: "Kosal Nith", role: "Co-organiser",
    date: "22 Dec 2016", location: "Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing the Economics New Year Day event.",
    keywords: ["Economics", "Community", "Cambodia"],
    sdg: ["SDG 4 - Quality Education"],
    resources: []
  },
  {
    title: "Ligue de la Filière Spéciale Francophone 2016-2017",
    titleUrl: "",
    person: "Kosal Nith", role: "Co-organiser",
    date: "Nov 2016 → Feb 2017", location: "Phnom Penh, Cambodia",
    type: "Organisation", typeCategory: "Conference organisation or participation",
    description: "Co-organizing the Francophone League event.",
    keywords: ["Francophone", "Education", "Cambodia"],
    sdg: ["SDG 4 - Quality Education"],
    resources: []
  },

  /* ══════════════════════════════════════════════════
     CONSULTANCY
     typeCategory: "Consultancy"
     type: "Consultancy"
  ══════════════════════════════════════════════════ */
  {
    title: "Public-Social-Private Partnerships for Ecologically-Sound Agriculture and Resilient Livelihood in Northern Tonle Sap Basin (PEARL)",
    titleUrl: "https://www.greenclimate.fund/project/fp199",
    person: "Kosal Nith", role: "Consultant",
    date: "Dec 2025 → present", location: "Remote",
    type: "Consultancy", typeCategory: "Consultancy",
    description: "Providing consulting services on agricultural economics for the UN Food and Agriculture Organization.",
    keywords: ["Agriculture", "FAO", "United Nations", "Food security"],
    sdg: ["SDG 2 - Zero Hunger", "SDG 1 - No Poverty", "SDG 8 - Decent Work and Economic Growth"],
    resources: []
  }

];

/* ── Derive year from date string automatically ── */
activities.forEach(a => {
  const match = a.date.match(/\d{4}/);
  a.year = match ? match[0] : "2026";
});

/* ── SDG master list (do not edit — used by filter UI) ── */
const sdgOptions = [
  "SDG 1 - No Poverty",
  "SDG 2 - Zero Hunger",
  "SDG 3 - Good Health and Well-being",
  "SDG 4 - Quality Education",
  "SDG 5 - Gender Equality",
  "SDG 6 - Clean Water and Sanitation",
  "SDG 7 - Affordable and Clean Energy",
  "SDG 8 - Decent Work and Economic Growth",
  "SDG 9 - Industry, Innovation and Infrastructure",
  "SDG 10 - Reduced Inequalities",
  "SDG 11 - Sustainable Cities and Communities",
  "SDG 12 - Responsible Consumption and Production",
  "SDG 13 - Climate Action",
  "SDG 14 - Life Below Water",
  "SDG 15 - Life on Land",
  "SDG 16 - Peace, Justice and Strong Institutions",
  "SDG 17 - Partnerships for the Goals"
];
