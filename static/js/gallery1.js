/* ============================================================
   GALLERY — gallery.js  v5
   Top nav buttons — one per section.
   Click a button → shows that section's photos below.
   All sections visible by default on load.
   ============================================================ */

(function () {
  'use strict';

  /* ── Photo data ─────────────────────────────────────────── */
  const PHOTOS = [

    /* ── Research Activities (10) ─────────────────────────── */
    { id:  1, category: 'research',
      src:   'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700&q=80',
      title: 'Field Survey', location: 'Phnom Penh, Cambodia', date: '2024',
      desc:  'Data collection in the field — recording vegetation plots along transects at dawn.' },
    { id:  2, category: 'research',
      src:   'https://images.unsplash.com/photo-1532094349884-543559849441?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1532094349884-543559849441?w=700&q=80',
      title: 'Lab Analysis', location: 'University Lab', date: '2023',
      desc:  'Soil samples processed under the microscope after a week in the field.' },
    { id:  3, category: 'research',
      src:   'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?w=700&q=80',
      title: 'Research Conference', location: 'Bangkok, Thailand', date: '2023',
      desc:  'Presenting findings at the regional biodiversity symposium.' },
    { id:  4, category: 'research',
      src:   'https://images.unsplash.com/photo-1581093458791-9b3d86fe9b87?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1581093458791-9b3d86fe9b87?w=700&q=80',
      title: 'Drone Mapping', location: 'Cardamom Mountains', date: '2024',
      desc:  'UAV survey over the forest canopy — capturing canopy height models.' },
    { id:  5, category: 'research',
      src:   'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=700&q=80',
      title: 'Specimen Collection', location: 'Mondulkiri, Cambodia', date: '2022',
      desc:  'Botanical specimens carefully pressed and labelled for the herbarium.' },
    { id:  6, category: 'research',
      src:   'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=700&q=80',
      title: 'Night Trapping', location: 'Virachey NP', date: '2023',
      desc:  'Camera traps set at dusk — patience rewarded with rare nocturnal species.' },
    { id:  7, category: 'research',
      src:   'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=700&q=80',
      title: 'Water Sampling', location: 'Tonle Sap Lake', date: '2024',
      desc:  'Collecting water quality samples along the lake margin at low season.' },
    { id:  8, category: 'research',
      src:   'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=700&q=80',
      title: 'Community Survey', location: 'Prey Veng Province', date: '2022',
      desc:  'Interviewing farmers about land-use practices for the socio-ecological study.' },
    { id:  9, category: 'research',
      src:   'https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=700&q=80',
      title: 'GIS Mapping Session', location: 'Remote Office', date: '2023',
      desc:  'Digitising land-cover boundaries from satellite imagery — hours well spent.' },
    { id: 10, category: 'research',
      src:   'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=700&q=80',
      title: 'Data Visualisation', location: 'Home Office', date: '2024',
      desc:  'Turning months of field data into something a policy maker can read.' },

    /* ── Friends & Colleagues (10) ────────────────────────── */
    { id: 11, category: 'friends',
      src:   'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80',
      title: 'A Rocky (and Muddy) Ski Season Concludes in Colorado', location: 'Phnom Penh', date: '2024',
      desc:  'Faced with a devastating snow drought and record-high March temperatures, some resorts closed early. But at Aspen Mountain, die-hards celebrated the last day of the season on Sunday.' },
    { id: 12, category: 'friends',
      src:   'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=90',
      thumb: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=90',
      title: 'Field Partner', location: 'Phnom Penh', date: '2023',
      desc:  'Two weeks in the forest together — you learn a lot about someone that way.' },
    { id: 13, category: 'friends',
      src:   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=90',
      thumb: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=90',
      title: 'Research Colleague', location: 'Siem Reap', date: '2023',
      desc:  'The kind of colleague who makes every field trip better.' },
    { id: 14, category: 'friends',
      src:   'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=700&q=80',
      title: 'Field Team Photo', location: 'Ratanakiri', date: '2022',
      desc:  'After three weeks in the forest together, these faces feel like family.' },
    { id: 15, category: 'friends',
      src:   'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=700&q=80',
      title: 'Graduation Day', location: 'Phnom Penh', date: '2022',
      desc:  'Years of work, one photograph — surrounded by people who made it possible.' },
    { id: 16, category: 'friends',
      src:   'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=700&q=80',
      title: 'Weekend Picnic', location: 'Kep, Cambodia', date: '2024',
      desc:  'Borrowed a van, packed too much food, zero regrets.' },
    { id: 17, category: 'friends',
      src:   'https://images.unsplash.com/photo-1530099486328-e021101a494a?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1530099486328-e021101a494a?w=700&q=80',
      title: 'Study Group', location: 'University Library', date: '2023',
      desc:  'Exam prep fuelled by instant noodles and shared anxiety.' },
    { id: 18, category: 'friends',
      src:   'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=700&q=80',
      title: 'Mentor Meeting', location: 'Campus Cafe', date: '2024',
      desc:  'An hour with the right person can change the direction of everything.' },
    { id: 19, category: 'friends',
      src:   'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80',
      title: 'Collaborative Workshop', location: 'Singapore', date: '2023',
      desc:  'International partners, shared goals, and a whiteboard full of ideas.' },
    { id: 20, category: 'friends',
      src:   'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=700&q=80',
      title: 'Farewell Party', location: 'Phnom Penh', date: '2022',
      desc:  'Goodbyes are easier when you know the work continues in good hands.' },
    { id: 51, category: 'friends',
      src:   'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=80',
      title: 'Research Seminar', location: 'Phnom Penh', date: '2023',
      desc:  'Sharing ideas with the next generation of researchers.' },
    { id: 52, category: 'friends',
      src:   'https://images.unsplash.com/photo-1507537297725-24a1242a56e3?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1507537297725-24a1242a56e3?w=700&q=80',
      title: 'Morning Coffee', location: 'Siem Reap', date: '2024',
      desc:  'Before the day begins — coffee and conversation with old friends.' },
    { id: 53, category: 'friends',
      src:   'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&q=80',
      title: 'Late Night Work', location: 'University Lab', date: '2023',
      desc:  'Deadlines have a way of bringing people together.' },
    { id: 54, category: 'friends',
      src:   'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?w=700&q=80',
      title: 'Project Kickoff', location: 'Phnom Penh', date: '2024',
      desc:  'First meeting, big ambitions, and a shared sense of purpose.' },
    { id: 55, category: 'friends',
      src:   'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=700&q=80',
      title: 'Conference Hallway', location: 'Bangkok, Thailand', date: '2023',
      desc:  'The best conversations happen between sessions.' },
    { id: 56, category: 'friends',
      src:   'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=700&q=80',
      title: 'Team Lunch', location: 'Kampot, Cambodia', date: '2024',
      desc:  'A long table, good food, and a year of shared work to celebrate.' },
    { id: 57, category: 'friends',
      src:   'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80',
      title: 'Office Hours', location: 'University Campus', date: '2023',
      desc:  'Open doors and open questions — the rhythm of academic life.' },
    { id: 58, category: 'friends',
      src:   'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=700&q=80',
      title: 'Group Discussion', location: 'Phnom Penh', date: '2022',
      desc:  'Four people, three whiteboards, and one stubborn problem.' },
    { id: 59, category: 'friends',
      src:   'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=2000&q=90',
      thumb: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=90',
      title: 'The Long Table', location: 'Phnom Penh, Cambodia', date: '2024',
      desc:  'End of a long project — good food, better company, and a table that ran out of chairs.' },
    { id: 60, category: 'friends',
      src:   'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80',
      title: 'Data Sprint', location: 'Remote Office', date: '2023',
      desc:  'Four laptops, one router, and a dataset that refused to cooperate.' },
    { id: 61, category: 'friends',
      src:   'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=700&q=80',
      title: 'Strategy Session', location: 'NGO Headquarters', date: '2024',
      desc:  'Long table, strong opinions, and a plan that actually held together.' },
    { id: 62, category: 'friends',
      src:   'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700&q=80',
      title: 'Campus Walk', location: 'Phnom Penh', date: '2022',
      desc:  'Between classes, between ideas — the conversations that matter most.' },
    { id: 63, category: 'friends',
      src:   'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=90',
      thumb: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85',
      title: 'End-of-Season Gathering', location: 'Phnom Penh, Cambodia', date: '2023',
      desc:  'A long table, warm light, and a year of shared work behind us.' },
    { id: 64, category: 'friends',
      src:   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&q=80',
      title: 'Mentorship Hour', location: 'Phnom Penh', date: '2024',
      desc:  'The kind of guidance that stays with you long after the hour ends.' },
    { id: 65, category: 'friends',
      src:   'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&q=80',
      title: 'Portrait Afternoon', location: 'Siem Reap', date: '2023',
      desc:  'A quiet afternoon between fieldwork and report writing.' },
    { id: 66, category: 'friends',
      src:   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&q=80',
      title: 'Field Partner', location: 'Mondulkiri', date: '2022',
      desc:  'Two weeks in the forest — you learn a lot about someone that way.' },

    /* ── Traveling by Foot (10) ───────────────────────────── */
    { id: 21, category: 'traveling',
      src:   'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=700&q=80',
      title: 'Morning Trail', location: 'Bokor Mountain', date: '2024',
      desc:  'First light through the mist — every step up worth the view at the top.' },
    { id: 22, category: 'traveling',
      src:   'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80',
      title: 'Ridge Walk', location: 'Cardamom Range', date: '2023',
      desc:  'A narrow path between two valleys — the kind that makes you feel very small.' },
    { id: 23, category: 'traveling',
      src:   'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=700&q=80',
      title: 'Village Road', location: 'Stung Treng Province', date: '2022',
      desc:  'Red dirt roads, banana groves, and children running alongside.' },
    { id: 24, category: 'traveling',
      src:   'https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=700&q=80',
      title: 'Waterfall Path', location: 'Chi Phat, Cambodia', date: '2024',
      desc:  'Three hours through dense undergrowth to reach a waterfall nobody else visits.' },
    { id: 25, category: 'traveling',
      src:   'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=700&q=80',
      title: 'Temple Grounds', location: 'Angkor, Siem Reap', date: '2023',
      desc:  'Walking the outer circuit before the tour groups arrive — stone and silence.' },
    { id: 26, category: 'traveling',
      src:   'https://images.unsplash.com/photo-1499810631641-541e76d678a2?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1499810631641-541e76d678a2?w=700&q=80',
      title: 'Coastal Walk', location: 'Kep, Cambodia', date: '2024',
      desc:  'Crab claws and sea salt — the shoreline path at low tide.' },
    { id: 27, category: 'traveling',
      src:   'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80',
      title: 'Paddy Field Route', location: 'Kampot Province', date: '2022',
      desc:  'Walking between rice paddies at harvest — golden in every direction.' },
    { id: 28, category: 'traveling',
      src:   'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=700&q=80',
      title: 'Forest Descent', location: 'Mondulkiri', date: '2023',
      desc:  'Downhill through secondary forest after a long plateau survey.' },
    { id: 29, category: 'traveling',
      src:   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80',
      title: 'Cloud Forest', location: 'Vietnam Border', date: '2023',
      desc:  'Above 1,800 m the trees disappear into cloud and the path becomes guesswork.' },
    { id: 30, category: 'traveling',
      src:   'https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=700&q=80',
      title: 'Night Market Walk', location: 'Phnom Penh', date: '2024',
      desc:  'The city on foot after dark — smells you never catch from a tuk-tuk.' },

    /* ── Tree Collections (10) ────────────────────────────── */
    { id: 31, category: 'trees',
      src:   'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=700&q=80',
      title: 'Ancient Dipterocarp', location: 'Prey Lang Forest', date: '2024',
      desc:  'Dipterocarpus alatus — three people cannot reach around its base.' },
    { id: 32, category: 'trees',
      src:   'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=80',
      title: 'Canopy Layer', location: 'Virachey NP', date: '2023',
      desc:  'Looking straight up into a cathedral of interlocking crowns.' },
    { id: 33, category: 'trees',
      src:   'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=700&q=80',
      title: 'Strangler Fig', location: 'Ta Prohm, Angkor', date: '2022',
      desc:  'Ficus roots finding purchase where mortar once held.' },
    { id: 34, category: 'trees',
      src:   'https://images.unsplash.com/photo-1518021964703-4b2030f03085?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1518021964703-4b2030f03085?w=700&q=80',
      title: 'Bamboo Grove', location: 'Kampot', date: '2024',
      desc:  'A stand of giant bamboo — technically a grass, but let me have this one.' },
    { id: 35, category: 'trees',
      src:   'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=700&q=80',
      title: 'Sugar Palm Avenue', location: 'Battambang Province', date: '2023',
      desc:  "Borassus flabellifer — Cambodia's national tree, silhouetted at dusk." },
    { id: 36, category: 'trees',
      src:   'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=700&q=80',
      title: 'Root System', location: 'Cardamom Mountains', date: '2024',
      desc:  'Buttress roots spreading across the slope — architecture built over centuries.' },
    { id: 37, category: 'trees',
      src:   'https://images.unsplash.com/photo-1542601906897-cd3438a4f7e0?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1542601906897-cd3438a4f7e0?w=700&q=80',
      title: 'Mangrove Stand', location: 'Koh Kong Province', date: '2023',
      desc:  'Rhizophora at high tide — the forest standing in the sea.' },
    { id: 38, category: 'trees',
      src:   'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=700&q=80',
      title: 'Rain Tree Shade', location: 'Phnom Penh', date: '2022',
      desc:  'Samanea saman spreading its crown over an entire street.' },
    { id: 39, category: 'trees',
      src:   'https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=700&q=80',
      title: 'Flowering Cassia', location: 'Phnom Penh Riverside', date: '2024',
      desc:  'Cassia fistula in full bloom — a tree that looks impossible in April heat.' },
    { id: 40, category: 'trees',
      src:   'https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?w=700&q=80',
      title: 'Woodland Edge', location: 'Mondulkiri Plateau', date: '2023',
      desc:  'Dry deciduous woodland — sparse, light-drenched, and full of birds.' },

    /* ── Local Foods (10) ─────────────────────────────────── */
    { id: 41, category: 'food',
      src:   'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=700&q=80',
      title: 'Fish Amok', location: 'Siem Reap', date: '2024',
      desc:  "Cambodia's national dish — steamed in banana leaf, coconut and kroeung." },
    { id: 42, category: 'food',
      src:   'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80',
      title: 'Morning Market', location: 'Phnom Penh', date: '2023',
      desc:  'Bai sach chrouk stalls open before sunrise — pork and rice for 2,000 riel.' },
    { id: 43, category: 'food',
      src:   'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=700&q=80',
      title: 'Fresh Herbs', location: 'Central Market', date: '2024',
      desc:  'Lemongrass, kaffir lime, galangal — the base of everything good.' },
    { id: 44, category: 'food',
      src:   'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=700&q=80',
      title: 'Num Banh Chok', location: 'Kampot', date: '2023',
      desc:  'Khmer noodles with green fish curry — eaten on a plastic stool at 7 a.m.' },
    { id: 45, category: 'food',
      src:   'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700&q=80',
      title: 'Tropical Fruit', location: 'Battambang', date: '2022',
      desc:  'Rambutan, mangosteen, dragon fruit — the dry-season abundance.' },
    { id: 46, category: 'food',
      src:   'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=700&q=80',
      title: 'BBQ Night', location: 'Phnom Penh', date: '2024',
      desc:  'Roadside grill — skewered corn, pork, and sweet potato over charcoal.' },
    { id: 47, category: 'food',
      src:   'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&q=80',
      title: 'Rice Harvest Meal', location: 'Prey Veng Province', date: '2023',
      desc:  'A communal lunch in the field — freshly cooked rice and preserved fish.' },
    { id: 48, category: 'food',
      src:   'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=700&q=80',
      title: 'Soup Stall', location: 'Night Market, Siem Reap', date: '2023',
      desc:  'A bowl of kuy teav pulled from a pot simmering since midnight.' },
    { id: 49, category: 'food',
      src:   'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&q=80',
      title: 'Palm Sugar Making', location: 'Kampong Speu', date: '2022',
      desc:  'Watching a family render palm sap into blocks of sugar — three-hour process.' },
    { id: 50, category: 'food',
      src:   'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80',
      title: 'Dinner Spread', location: 'Phnom Penh', date: '2024',
      desc:  'A table shared with colleagues after a long field week — the best meal of the year.' },

    /* ── Local Foods extras (11–20) ───────────────────────── */
    { id: 101, category: 'food',
      src:   'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=700&q=80',
      title: 'Spice Market', location: 'Phnom Penh', date: '2024',
      desc:  'Turmeric, lemongrass, kaffir lime — the colours of a Khmer kitchen.' },
    { id: 102, category: 'food',
      src:   'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=700&q=80',
      title: 'Street Noodles', location: 'Siem Reap', date: '2023',
      desc:  'A bowl of pho at the corner stall — best eaten standing up.' },
    { id: 103, category: 'food',
      src:   'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=80',
      title: 'Vegetable Garden', location: 'Kampot', date: '2023',
      desc:  'Morning harvest — what grows here feeds a whole neighbourhood.' },
    { id: 104, category: 'food',
      src:   'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=700&q=80',
      title: 'Grilled Corn', location: 'Phnom Penh', date: '2024',
      desc:  'Roadside charcoal, buttered corn — the smell of every evening walk.' },
    { id: 105, category: 'food',
      src:   'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&q=80',
      title: 'Breakfast Plate', location: 'Battambang', date: '2022',
      desc:  'Rice, egg, and pickled vegetables — simple and perfect.' },
    { id: 106, category: 'food',
      src:   'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=700&q=80',
      title: 'Salad Bowl', location: 'Phnom Penh', date: '2024',
      desc:  'A rare green lunch between field seasons.' },
    { id: 107, category: 'food',
      src:   'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700&q=80',
      title: 'Pasta Evening', location: 'Siem Reap', date: '2023',
      desc:  'A rare Italian detour — cooked by a colleague who studied in Rome.' },
    { id: 108, category: 'food',
      src:   'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=700&q=80',
      title: 'Toast Morning', location: 'Field Camp', date: '2023',
      desc:  'When field logistics allow a proper breakfast — you celebrate.' },
    { id: 109, category: 'food',
      src:   'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=700&q=80',
      title: 'Pancake Stack', location: 'Phnom Penh', date: '2024',
      desc:  'Weekend mornings deserve something warm and excessive.' },
    { id: 110, category: 'food',
      src:   'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=85',
      thumb: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80',
      title: 'Pizza Night', location: 'Phnom Penh', date: '2022',
      desc:  'End of grant report, beginning of pizza — priorities in order.' },
  ];

  /* ── Category config ────────────────────────────────────── */
  var CATS = [
    { key: 'all',       label: 'All Photos',           color: '#6B7280', icon: 'fa-images'       },
    { key: 'research',  label: 'Research Activities',  color: '#2563EB', icon: 'fa-flask'        },
    { key: 'friends',   label: 'Friends & Colleagues', color: '#DB2777', icon: 'fa-user-group'   },
    { key: 'traveling', label: 'Traveling by Foot',    color: '#059669', icon: 'fa-person-hiking' },
    { key: 'trees',     label: 'Tree Collections',     color: '#65A30D', icon: 'fa-tree'         },
    { key: 'food',      label: 'Local Foods',          color: '#D97706', icon: 'fa-bowl-food'    },
  ];

  var PER_PAGE    = 30;
  var activeKey   = 'all';
  var currentPage = 1;
  var filtered    = [];
  var lbIndex     = 0;

  /* ── DOM refs ───────────────────────────────────────────── */
  var nav         = document.getElementById('gallery-nav');
  var labelText   = document.getElementById('gallery-label-text');
  var labelCount  = document.getElementById('gallery-label-count');
  var grid        = document.getElementById('gallery-grid');
  var pagination  = document.getElementById('gallery-pagination');
  var lightbox    = document.getElementById('gallery-lightbox');
  var lbImg       = document.getElementById('lb-img');
  var lbTag       = document.getElementById('lb-tag');
  var lbTitle     = document.getElementById('lb-title');
  var lbDesc      = document.getElementById('lb-desc');
  var lbLocation  = document.getElementById('lb-location');
  var lbDate      = document.getElementById('lb-date');
  var lbIndexEl   = document.getElementById('lb-index');
  var lbProgress  = document.getElementById('lb-progress');
  var lbInfo      = document.getElementById('lb-info');
  var lbClose     = document.getElementById('lb-close');
  var lbPrev      = document.getElementById('lb-prev');
  var lbNext      = document.getElementById('lb-next');

  /* ── Build nav buttons ──────────────────────────────────── */
  function buildNav() {
    nav.innerHTML = '';
    CATS.forEach(function (cat) {
      var count = cat.key === 'all'
        ? PHOTOS.length
        : PHOTOS.filter(function (p) { return p.category === cat.key; }).length;

      var btn = document.createElement('button');
      btn.className   = 'gnav-btn' + (cat.key === activeKey ? ' active' : '');
      btn.dataset.key = cat.key;
      btn.style.setProperty('--cat-color', cat.color);
      btn.innerHTML =
        '<i class="fa ' + cat.icon + '"></i>' +
        '<span class="gnav-label">' + cat.label + '</span>' +
        '<span class="gnav-count">' + count + '</span>';

      btn.addEventListener('click', function () {
        activeKey   = cat.key;
        currentPage = 1;
        buildNav();
        applyFilter();
      });

      nav.appendChild(btn);
    });
  }

  /* ── Filter & render grid ───────────────────────────────── */
  function applyFilter() {
    filtered = activeKey === 'all'
      ? PHOTOS.slice()
      : PHOTOS.filter(function (p) { return p.category === activeKey; });

    /* Update label */
    var cat = CATS.find(function (c) { return c.key === activeKey; });
    if (labelText)  labelText.textContent  = cat ? cat.label : '';
    if (labelCount) labelCount.textContent = filtered.length + ' photos';

    /* NYT-style grid for traveling; editorial for research; photo-essay for friends */
    grid.className = 'gallery-grid' +
      (activeKey === 'traveling' ? ' grid--traveling' : '') +
      (activeKey === 'research'  ? ' grid--research'  : '') +
      (activeKey === 'food'      ? ' grid--food'      : '') +
      '';

    /* Clean up friends essay wrap when switching away */
    var existingEssay = document.getElementById('friends-essay-wrap');
    var existingFPag  = document.getElementById('friends-pagination');
    var existingFood  = document.getElementById('food-essay-wrap');
    if (existingEssay) existingEssay.remove();
    if (existingFPag)  existingFPag.remove();
    if (existingFood)  existingFood.remove();
    grid.style.display = '';

    /* Widen wrapper padding for research and friends editorial layouts */
    var wrapper = grid.closest('.gallery-grid-wrapper');
    if (wrapper) {
      wrapper.classList.toggle('research-active', activeKey === 'research');
      wrapper.style.padding = (activeKey === 'traveling') ? '0' : '';
    }

    /* Inject NYT section header above grid for traveling */
    var existingHeader = document.getElementById('traveling-section-header');
    if (existingHeader) existingHeader.remove();

    if (activeKey === 'traveling' && wrapper) {
      var header = document.createElement('div');
      header.id = 'traveling-section-header';
      header.className = 'traveling-section-header';
      header.innerHTML =
        '<span class="traveling-section-title">Traveling by Foot</span>' +
        '<span class="traveling-section-more">' + filtered.length + ' photos &rsaquo;</span>';
      wrapper.parentNode.insertBefore(header, wrapper);
    }

    if (activeKey === 'friends') {
      renderFriendsEssay();
    } else if (activeKey === 'food') {
      renderFoodEssay();
    } else {
      renderGrid();
      renderPagination();
    }
  }

  /* ── Food essay renderer — alternating 4-col and 5-col rows ── */
  function renderFoodEssay() {
    var existing = document.getElementById('food-essay-wrap');
    if (existing) existing.remove();

    grid.innerHTML = '';
    grid.className = 'gallery-grid grid--food';
    grid.style.display = 'none';

    var wrap = document.createElement('div');
    wrap.id = 'food-essay-wrap';
    wrap.className = 'food-essay-wrap';

    var start  = (currentPage - 1) * PER_PAGE;
    var slice  = filtered.slice(start, start + PER_PAGE);

    /* Pattern: 4, 5, 4, 5 … */
    var photoIdx   = 0;
    var rowPattern = [4, 5];
    var rowNum     = 0;

    while (photoIdx < slice.length) {
      var cols      = rowPattern[rowNum % 2];
      var rowPhotos = slice.slice(photoIdx, photoIdx + cols);
      if (rowPhotos.length === 0) break;

      var row = document.createElement('div');
      row.className = 'food-photo-row food-' + cols + 'col';

      rowPhotos.forEach(function (photo, j) {
        var globalIdx = start + photoIdx + j;
        var cell = document.createElement('div');
        cell.className = 'food-photo-item';
        cell.innerHTML = '<img src="' + photo.thumb + '" alt="' + photo.title + '" loading="lazy" onerror="this.style.opacity=0.3">';
        cell.addEventListener('click', (function (gi) {
          return function () { openLightbox(gi); };
        })(globalIdx));
        row.appendChild(cell);
      });

      wrap.appendChild(row);
      photoIdx += rowPhotos.length;
      rowNum   += 1;
    }

    grid.parentNode.appendChild(wrap);
    renderPagination();
  }


  /* ── Friends essay renderer ─────────────────────────────── */
  /* Row pattern: 1, 2, 3, 4, 5, 6 cols — then repeats          */
  var FRIENDS_PER_PAGE    = 26;
  var FRIENDS_ROW_PATTERN = [1, 2, 3, 4, 5, 6];

  function renderFriendsEssay() {
    /* Remove existing essay + pagination */
    var existing   = document.getElementById('friends-essay-wrap');
    var existingPag = document.getElementById('friends-pagination');
    if (existing)    existing.remove();
    if (existingPag) existingPag.remove();

    grid.innerHTML = '';
    grid.className = 'gallery-grid';
    grid.style.display = 'none';

    var start = (currentPage - 1) * FRIENDS_PER_PAGE;
    var slice = filtered.slice(start, start + FRIENDS_PER_PAGE);

    var wrap = document.createElement('div');
    wrap.id        = 'friends-essay-wrap';
    wrap.className = 'friends-essay-wrap';

    /* Build rows following 1-2-3-4-5-6 pattern */
    var photoIdx   = 0;
    var patternIdx = 0;

    while (photoIdx < slice.length) {
      var cols      = FRIENDS_ROW_PATTERN[patternIdx % FRIENDS_ROW_PATTERN.length];
      var rowPhotos = slice.slice(photoIdx, photoIdx + cols);
      if (rowPhotos.length === 0) break;

      var row = document.createElement('div');
      row.className = 'friends-photo-row cols-' + rowPhotos.length;

      /* cols-1: alternate between text+photo split and centered single photo */
      if (rowPhotos.length === 1) {
        var photo = rowPhotos[0];
        var globalIdx = start + photoIdx;
        /* patternIdx 0 = first col-1 in cycle = text+photo split
           patternIdx 6 = second col-1 in next cycle = centered photo */
        var isSplitStyle = (patternIdx === 0);

        if (isSplitStyle) {
          /* Text left, photo right — NYT article style */
          row.className = 'friends-photo-row cols-1 style-split';
          var textPanel = document.createElement('div');
          textPanel.className = 'friends-text-panel';
          textPanel.innerHTML =
            '<div class="friends-panel-title">' + photo.title + '</div>' +
            '<div class="friends-panel-desc">' + photo.desc + '</div>';
          row.appendChild(textPanel);

          var cell = document.createElement('div');
          cell.className = 'friends-photo-item';
          cell.innerHTML = '<img src="' + photo.thumb + '" alt="' + photo.title + '" loading="lazy" onerror="this.style.opacity=0.3">';
          cell.addEventListener('click', (function (gi) {
            return function () { openLightbox(gi); };
          })(globalIdx));
          row.appendChild(cell);

        } else {
          /* Centered single photo — NYT "The pool deck" style */
          row.className = 'friends-photo-row cols-1 style-centered';
          var cell2 = document.createElement('div');
          cell2.className = 'friends-photo-item';
          cell2.innerHTML = '<img src="' + photo.thumb + '" alt="' + photo.title + '" loading="lazy" onerror="this.style.opacity=0.3">';
          cell2.addEventListener('click', (function (gi) {
            return function () { openLightbox(gi); };
          })(globalIdx));
          row.appendChild(cell2);
        }

      } else {
        /* cols-2: alternate between two-photo and single wide photo */
        if (rowPhotos.length === 2) {
          var cols2Count = 0;
          for (var pi = 0; pi < patternIdx; pi++) {
            if (FRIENDS_ROW_PATTERN[pi % FRIENDS_ROW_PATTERN.length] === 2) cols2Count++;
          }
          var isWideStyle = (cols2Count % 2 === 0); /* every 1st cols-2 row = wide */

          if (isWideStyle) {
            /* Two photos side-by-side, flush (no gap), large outer margins */
            row.className = 'friends-photo-row cols-2 style-wide';
            rowPhotos.forEach(function (photo, j) {
              var globalIdx = start + photoIdx + j;
              var wideCell = document.createElement('div');
              wideCell.className = 'friends-photo-item';
              wideCell.innerHTML = '<img src="' + photo.thumb + '" alt="' + photo.title + '" loading="lazy" onerror="this.style.opacity=0.3">';
              wideCell.addEventListener('click', (function (gi) {
                return function () { openLightbox(gi); };
              })(globalIdx));
              row.appendChild(wideCell);
            });
          } else {
            /* Two side-by-side photos — standard cols-2 */
            rowPhotos.forEach(function (photo, j) {
              var globalIdx = start + photoIdx + j;
              var cell = document.createElement('div');
              cell.className = 'friends-photo-item';
              cell.innerHTML = '<img src="' + photo.thumb + '" alt="' + photo.title + '" loading="lazy" onerror="this.style.opacity=0.3">';
              cell.addEventListener('click', (function (gi) {
                return function () { openLightbox(gi); };
              })(globalIdx));
              row.appendChild(cell);
            });
          }
        } else {
          rowPhotos.forEach(function (photo, j) {
            var globalIdx = start + photoIdx + j;
            var cell = document.createElement('div');
            cell.className = 'friends-photo-item';
            cell.innerHTML = '<img src="' + photo.thumb + '" alt="' + photo.title + '" loading="lazy" onerror="this.style.opacity=0.3">';
            cell.addEventListener('click', (function (gi) {
              return function () { openLightbox(gi); };
            })(globalIdx));
            row.appendChild(cell);
          });
        }
      }

      wrap.appendChild(row);

      /* Caption: centered style gets one below the photo; split style has none */
      if (rowPhotos.length === 1) {
        if (!isSplitStyle) {
          var capSingle = document.createElement('div');
          capSingle.className = 'friends-row-caption friends-caption-centered';
          capSingle.innerHTML = rowPhotos[0].title +
            ' <span class="caption-credit">' + rowPhotos[0].location + '</span>';
          wrap.appendChild(capSingle);
        }
      } else if (rowPhotos.length > 1) {
        var cap = document.createElement('div');
        cap.className = 'friends-row-caption';

        if (rowPhotos.length === 2) {
          if (isWideStyle) {
            /* Wide: two captions matching the two-col layout */
            cap.className = 'friends-row-caption friends-caption-wide';
            cap.innerHTML =
              '<span>' + rowPhotos[0].title + ' <span class="caption-credit">' + rowPhotos[0].location + '</span></span>' +
              '<span>' + rowPhotos[1].title + ' <span class="caption-credit">' + rowPhotos[1].location + '</span></span>';
          } else {
            cap.innerHTML =
              '<span>' + rowPhotos[0].title + ' <span class="caption-credit">' + rowPhotos[0].location + '</span></span>' +
              '<span>' + rowPhotos[1].title + ' <span class="caption-credit">' + rowPhotos[1].location + '</span></span>';
          }
        } else {
          cap.innerHTML =
            rowPhotos.map(function (p) { return p.title; }).join(' &nbsp;&middot;&nbsp; ') +
            ' <span class="caption-credit">' + rowPhotos[0].location + '</span>';
        }
        wrap.appendChild(cap);
      }

      photoIdx   += rowPhotos.length;
      patternIdx += 1;
    }

    grid.parentNode.appendChild(wrap);

    /* Friends-specific pagination */
    var totalPages = Math.ceil(filtered.length / FRIENDS_PER_PAGE);
    if (totalPages > 1) {
      var pag = document.createElement('nav');
      pag.id = 'friends-pagination';
      pag.className = 'gallery-pagination';
      pag.setAttribute('aria-label', 'Friends gallery pages');

      pag.appendChild(friendsPageBtn('\u2039', currentPage - 1, currentPage === 1, 'page-arrow', 'Previous'));

      buildPageRange(currentPage, totalPages).forEach(function (p) {
        if (p === '...') {
          var el = document.createElement('span');
          el.className = 'page-ellipsis';
          el.textContent = '\u2026';
          pag.appendChild(el);
        } else {
          pag.appendChild(friendsPageBtn(p, p, false, p === currentPage ? 'active' : '', 'Page ' + p));
        }
      });

      pag.appendChild(friendsPageBtn('\u203a', currentPage + 1, currentPage === totalPages, 'page-arrow', 'Next'));
      grid.parentNode.appendChild(pag);
    }
  }

  function friendsPageBtn(label, target, disabled, cls, aria) {
    var btn = document.createElement('button');
    btn.className = ('page-btn ' + cls).trim();
    btn.textContent = label;
    btn.disabled = disabled;
    btn.setAttribute('aria-label', aria);
    if (!disabled) btn.addEventListener('click', function () {
      currentPage = target;
      renderFriendsEssay();
      var wrap = document.getElementById('friends-essay-wrap');
      if (wrap) wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return btn;
  }
  function renderGrid() {
    grid.innerHTML = '';

    var start = (currentPage - 1) * PER_PAGE;
    var slice = filtered.slice(start, start + PER_PAGE);

    if (slice.length === 0) {
      grid.innerHTML = '<p class="gallery-empty">No photos here yet.</p>';
      return;
    }

    slice.forEach(function (photo, localIdx) {
      var globalIdx = start + localIdx;
      var cat = CATS.find(function (c) { return c.key === photo.category; }) || CATS[0];

      var item = document.createElement('div');
      item.className   = 'gallery-item';
      item.dataset.cat = photo.category;

      /* Food grid: alternate 4-col (items 1-4, 10-13…) and 5-col (items 5-9, 14-18…) */
      if (photo.category === 'food' && activeKey === 'food') {
        var posInCycle = localIdx % 9; /* 9 = 4+5 cycle */
        if (posInCycle >= 4) {
          item.classList.add('food-5col');
          /* Change grid to 5-col for this item's row via inline style trick */
          item.style.gridColumn = 'span 1';
        }
      }

      var isResearchView  = photo.category === 'research' && activeKey === 'research';
      var isTravelingView = photo.category === 'traveling' && activeKey === 'traveling';
      var showFooter = !isResearchView && !isTravelingView;

      /* NYT editorial card — research */
      if (isResearchView) {
        item.innerHTML =
          '<div class="gallery-img-wrap">' +
            '<img src="' + photo.thumb + '" alt="' + photo.title + '" loading="lazy"' +
                 ' onerror="this.style.opacity=0.3">' +
          '</div>' +
          '<span class="research-credit">' + photo.location + '</span>' +
          '<span class="research-title">' + photo.title + '</span>' +
          '<span class="research-desc">'  + photo.desc   + '</span>' +
          '<div class="research-meta">' +
            photo.date + '<span class="meta-dot"></span>' + photo.location +
          '</div>';

      /* NYT horizontal row card — traveling */
      } else if (isTravelingView) {
        item.innerHTML =
          '<div class="gallery-img-wrap">' +
            '<img src="' + photo.thumb + '" alt="' + photo.title + '" loading="lazy"' +
                 ' onerror="this.style.opacity=0.3">' +
          '</div>' +
          '<span class="traveling-title">' + photo.title + '</span>';

      } else {
        /* Standard card with overlay (+ optional footer) */
        item.innerHTML =
          '<div class="gallery-img-wrap">' +
            '<img src="' + photo.thumb + '" alt="' + photo.title + '" loading="lazy"' +
                 ' onerror="this.style.opacity=0.3">' +
            '<div class="gallery-overlay">' +
              '<div class="overlay-icon"><i class="fa fa-expand"></i></div>' +
              '<div class="overlay-tag">'   + cat.label    + '</div>' +
              '<div class="overlay-title">' + photo.title  + '</div>' +
              '<div class="overlay-meta">'  + photo.location + ' \u00b7 ' + photo.date + '</div>' +
            '</div>' +
          '</div>' +
          (showFooter
            ? '<div class="item-footer">' +
                '<span class="item-num">' + String(globalIdx + 1).padStart(2, '0') + '</span>' +
                '<span class="item-chip" style="color:' + cat.color + ';background:' + cat.color + '1a">' +
                  photo.date +
                '</span>' +
              '</div>'
            : '');
      }

      item.addEventListener('click', (function (gi) {
        return function () { openLightbox(gi); };
      })(globalIdx));

      grid.appendChild(item);
    });

    scheduleReveal();
    /* Scroll to grid top on page change */
    if (currentPage > 1) {
      var wrapper = grid.closest('.gallery-grid-wrapper') || grid;
      wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ── Scroll reveal ──────────────────────────────────────── */
  function scheduleReveal() {
    var items = grid.querySelectorAll('.gallery-item');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.04, rootMargin: '0px 0px -20px 0px' });
      items.forEach(function (item, i) {
        item.style.transitionDelay = Math.min(i * 40, 380) + 'ms';
        io.observe(item);
      });
    } else {
      items.forEach(function (el) { el.classList.add('visible'); });
    }
  }

  /* ── Pagination ─────────────────────────────────────────── */
  function renderPagination() {
    if (!pagination) return;
    pagination.innerHTML = '';
    var total = Math.ceil(filtered.length / PER_PAGE);
    if (total <= 1) return;

    pagination.appendChild(pageBtn('\u2039', currentPage - 1, currentPage === 1, 'page-arrow', 'Previous'));
    buildPageRange(currentPage, total).forEach(function (p) {
      if (p === '...') {
        var el = document.createElement('span');
        el.className = 'page-ellipsis'; el.textContent = '\u2026';
        pagination.appendChild(el);
      } else {
        pagination.appendChild(pageBtn(p, p, false, p === currentPage ? 'active' : '', 'Page ' + p));
      }
    });
    pagination.appendChild(pageBtn('\u203a', currentPage + 1, currentPage === total, 'page-arrow', 'Next'));
  }

  function buildPageRange(cur, total) {
    if (total <= 7) { var r=[]; for(var i=1;i<=total;i++) r.push(i); return r; }
    if (cur <= 4)          return [1,2,3,4,5,'...',total];
    if (cur >= total - 3)  return [1,'...',total-4,total-3,total-2,total-1,total];
    return [1,'...',cur-1,cur,cur+1,'...',total];
  }

  function pageBtn(label, target, disabled, cls, aria) {
    var btn = document.createElement('button');
    btn.className = ('page-btn ' + cls).trim();
    btn.textContent = label;
    btn.disabled    = disabled;
    btn.setAttribute('aria-label', aria);
    if (!disabled) btn.addEventListener('click', (function (t) {
      return function () { currentPage = t; renderGrid(); renderPagination(); };
    })(target));
    return btn;
  }

  /* ── Lightbox ───────────────────────────────────────────── */
  function openLightbox(gi) {
    lbIndex = gi;
    renderLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderLightbox() {
    var photo = filtered[lbIndex];
    if (!photo) return;
    var cat = CATS.find(function (c) { return c.key === photo.category; }) || CATS[0];

    lbImg.style.opacity = '0'; lbImg.style.transform = 'scale(0.97)';
    setTimeout(function () {
      lbImg.src = photo.src; lbImg.alt = photo.title;
      lbImg.onload = function () {
        lbImg.style.transition = 'opacity .28s, transform .28s';
        lbImg.style.opacity = '1'; lbImg.style.transform = 'scale(1)';
      };
    }, 110);

    lbTag.textContent      = cat.label;
    lbTitle.textContent    = photo.title;
    lbDesc.textContent     = photo.desc;
    lbLocation.textContent = photo.location;
    lbDate.textContent     = photo.date;
    lbIndexEl.textContent  = (lbIndex + 1) + ' / ' + filtered.length;
    if (lbProgress) lbProgress.style.width = ((lbIndex + 1) / filtered.length * 100) + '%';

    var accent = cat.color || '#6B7280';
    if (lbInfo) { lbInfo.style.borderLeftColor = accent; }
    if (lbTag)  { lbTag.style.color = accent; lbTag.style.background = accent + '18'; }
  }

  lbClose.addEventListener('click', closeLightbox);
  document.getElementById('lb-backdrop').addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', function () {
    lbIndex = (lbIndex - 1 + filtered.length) % filtered.length; renderLightbox();
  });
  lbNext.addEventListener('click', function () {
    lbIndex = (lbIndex + 1) % filtered.length; renderLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex-1+filtered.length)%filtered.length; renderLightbox(); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex+1)%filtered.length; renderLightbox(); }
  });
  var tx = 0;
  lightbox.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive:true });
  lightbox.addEventListener('touchend',   function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) < 40) return;
    lbIndex = dx < 0 ? (lbIndex+1)%filtered.length : (lbIndex-1+filtered.length)%filtered.length;
    renderLightbox();
  });

  /* ── Init ───────────────────────────────────────────────── */
  buildNav();
  applyFilter();

})();
