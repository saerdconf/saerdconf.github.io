(function () { /* IIFE — nothing leaks to window except what we explicitly expose */

/* ── DATA ────────────────────────────────────────────────────── */
/* imgs[] values are the photo filenames (without .jpg extension)
   served from static/img/explore/<filename>.jpg
   Countries with more than one pink pin have locations that are
   regions / areas, not cities — the label is set dynamically below. */
/* ══════════════════════════════════════════════════════════════
   PIN TYPE REGISTRY  —  Rexby-style colours
   ──────────────────────────────────────────────────────────────
   To add a new type, append one line before the closing brace:
     mytype: { color:'#hex', icon:'fa-solid fa-icon-name', label:'My Label' },
   Then set  type:"mytype"  on any city entry. Done — legend auto-updates.
══════════════════════════════════════════════════════════════ */
const tmPinTypes = {
  /* ── FOOD & DRINK  (pink / magenta family — matches Rexby) ── */
  restaurant:  { color:'#e8194b', icon:'fa-solid fa-utensils',            label:'Restaurant'       },
  cafe:        { color:'#c0392b', icon:'fa-solid fa-mug-saucer',          label:'Café'             },
  bar:         { color:'#9b2335', icon:'fa-solid fa-martini-glass',       label:'Bar'              },
  bakery:      { color:'#d35400', icon:'fa-solid fa-bread-slice',         label:'Bakery'           },
  brewery:     { color:'#b7410e', icon:'fa-solid fa-beer-mug-empty',      label:'Brewery'          },

  /* ── NATURE & OUTDOORS  (teal / green family — matches Rexby) ── */
  beach:       { color:'#3aa3aa', icon:'fa-solid fa-umbrella-beach',      label:'Beach'            },
  park:        { color:'#a5ae00', icon:'fa-solid fa-tree',                label:'Park'             },
  hike:        { color:'#1caa0d', icon:'fa-solid fa-person-hiking',       label:'Hike'             },
  waterfall:   { color:'#3faa9c', icon:'fa-solid fa-water',               label:'Waterfall'        },
  hotspring:   { color:'#ca6f1e', icon:'fa-solid fa-hot-tub-person',      label:'Hot Spring'       },
  wildlife:    { color:'#117a65', icon:'fa-solid fa-paw',                 label:'Wildlife'         },
  campsite:    { color:'#1a5276', icon:'fa-solid fa-campground',          label:'Campsite'         },
  lake:         { color:'#aabed3', icon:'fa-solid fa-water',          label:'Lake'         },

  /* ── SIGHTSEEING & CULTURE  (golden / amber — matches Rexby) ── */
  sightseeing: { color:'#ff4e22', icon:'fa-solid fa-binoculars',          label:'Sightseeing'      },
  museum:      { color:'#b7950b', icon:'fa-solid fa-building-columns',    label:'Museum'           },
  culture:     { color:'#5260c1', icon:'fa-solid fa-masks-theater',       label:'Culture'          },
  photospot:   { color:'#ff7b31', icon:'fa-solid fa-camera-retro',        label:'Photospot'        },
  area:        { color:'#7d6608', icon:'fa-solid fa-map-location-dot',    label:'Area'             },
  town:        { color:'#41087d', icon:'fa-solid ffa-mountain-city',      label:'Town'             },
  city:        { color:'#eed410', icon:'fa-solid fa-city',                label:'City'             },
  village:     { color:'#710ab5', icon:'fa-solid fa-people-roof',         label:'Village'          },
  zoo:         { color:'#04265d', icon:'fa-solid fa-paw',                 label:'Zoo'              },

  /* ── TRANSPORT  (dark slate blue — matches Rexby) ── */
  transport:   { color:'#2e4057', icon:'fa-solid fa-bus',                 label:'Public Transport' },
  harbor:      { color:'#1a252f', icon:'fa-solid fa-anchor',              label:'Harbor'           },
  airport:     { color:'#283747', icon:'fa-solid fa-plane-departure',     label:'Airport'          },
  train:       { color:'#13ce83', icon:'fa-solid fa-train-subway',          label:'Train Station'    },

  /* ── ACCOMMODATION  (purple / indigo — matches Rexby) ── */
  hotel:       { color:'#6c3483', icon:'fa-solid fa-bed',                 label:'Hotel'            },
  hostel:      { color:'#76448a', icon:'fa-solid fa-people-roof',         label:'Hostel'           },
  home:        { color:'#5b2c6f', icon:'fa-solid fa-house',               label:'Homes'            },

  /* ── ACTIVITIES & WELLNESS  (orange / coral — matches Rexby) ── */
  activity:    { color:'#e67e22', icon:'fa-solid fa-person-running',      label:'Activity'         },
  tours:       { color:'#ca6f1e', icon:'fa-solid fa-route',               label:'Tours'            },
  spa:         { color:'#a569bd', icon:'fa-solid fa-spa',                 label:'Spa'              },
  walking:     { color:'#242755', icon:'fa-solid fa-person-walking',      label:'Walking'          },
  workshop:    { color:'#d950de', icon:'fa-solid fa-comment-dots',        label:'Workshop'         },
  conference:  { color:'#b75214', icon:'fa-solid fa-chalkboard-user',    label:'Conference'       },


  /* ── SHOPPING  (hot pink) ── */
  shop:        { color:'#c0392b', icon:'fa-solid fa-bag-shopping',        label:'Shop'             },

  /* ── EDUCATION & WORK ── */
  university:  { color:'#1a5276', icon:'fa-solid fa-graduation-cap',      label:'University'       },
  research:    { color:'#42657b', icon:'fa-solid fa-microscope',          label:'Research'         },

  /* ── FALLBACK ── */
  default:     { color:'#7f8c8d', icon:'fa-solid fa-location-dot',        label:'Spot'             },
};

const tmCountries = [
  { name:"Austria", lat:47.8, lng:13.0, flag:"at", desc:"Alpine majesty, classical music, imperial palaces, and charming villages.",
    cities:[
      {name:"Vienna",    lat:48.2082, lng:16.3738, type:"city",  desc:"Imperial capital of art, music, and coffeehouse culture.", imgs:["ep20","ep21","ep22","ep23", "ep24"]},
      {name:"Salzburg",  lat:47.8095, lng:13.0550, type:"train", desc:"Birthplace of Mozart, baroque architecture and Alpine setting.", imgs:["ep103"]},
      {name:"Hafelekarspitze", lat:47.3162, lng:11.3996, type:"sightseeing",   desc:"High Alpine peak above Innsbruck, cable car access, sweeping views.", imgs:["ep1","ep2","ep3","ep4"]},
      {name:"Innsbruck", lat:47.2650, lng:11.3920, type:"city",   desc:"Tyrolean city nestled in Alps, colourful houses, imperial history, winter sports.", imgs:["ep5","ep6","ep7","ep8"]},
      {name:"Hallstatt", lat:47.5667, lng:13.6620, type:"walking",   desc:"Lakeside village with pastel houses, alpine views, and historic salt mines.", imgs:["ep9","ep10","ep11"]},
      {name:"Hallstatt", lat:47.5646, lng:13.6498, type:"village",   desc:"Lakeside village with pastel houses, alpine views, and historic salt mines.", imgs:["ep12","ep13","ep14", "ep15"]},
      {name:"Alpenzoo Innsbruck - Tirol", lat:47.2813, lng:11.3982, type:"zoo",   desc:"Alpine zoo showcasing mountain wildlife, perched above Innsbruck with views.", imgs:["ep17","ep18","ep19"]},

    ]},
  { name:"Cambodia", lat:12.0, lng:104.5, flag:"kh", desc:"Home to Angkor Wat, ancient temples, and lush landscapes of Khmer heritage.",
    cities:[
      {name:"Siem Reap",  lat:13.3671, lng:103.8448, type:"culture", desc:"Gateway to the majestic Angkor temple complex.", imgs:["siem_reap_1","siem_reap_2","siem_reap_3","siem_reap_4"]},
      {name:"Phnom Penh", lat:11.5564, lng:104.9282, type:"sightseeing",  desc:"Vibrant capital on the Mekong with rich royal heritage.", imgs:["phnom_penh_1","phnom_penh_2","phnom_penh_3","phnom_penh_4"]},
      {name:"Kampot",     lat:10.6112, lng:104.1806, type:"park",   desc:"Riverside town famed for pepper plantations and French villas.", imgs:["kampot_1","kampot_2","kampot_3","kampot_4"]},
      {name:"Koh Rong",   lat:10.7226, lng:103.2440, type:"beach",    desc:"Tropical island known for white beaches and clear waters.", imgs:["koh_rong_1","koh_rong_2","koh_rong_3","koh_rong_4"]},
      {name:"Phnom Preah",lat:12.1738, lng:102.9069, type:"hike",   desc:"Forested mountain rising above plains, offering peaceful nature and scenic views.", imgs:["ep114","ep115","ep116","ep117"]},
    ]},
  { name:"China", lat:35.0, lng:105.0, flag:"cn", desc:"Ancient wonders, futuristic cities, and the Great Wall stretching to the horizon.",
    cities:[
      {name:"Beijing Capital International Airport",  lat:40.0822, lng:116.6053, type:"airport",  desc:"Massive global hub with terminals, flights, shops, and bustling travellers.", imgs:["ep34"]},
      {name:"Shanghai", lat:31.2304, lng:121.4737, type:"city", desc:"Futuristic skyline meets colonial Bund architecture.", imgs:["ep29"]},
      {name:"Suzhou",    lat:31.3025, lng:120.5842, type:"culture", desc:"Ancient canal city famed for classical gardens, silk heritage, and bridges.", imgs:["ep30","ep31","ep32","ep33"]},
      {name:"C-SEASD Workshop",   lat:31.2749, lng:120.7380, type:"workshop", desc:"It was a two‑day academic workshop connecting China and Southeast Asia researchers to discuss sustainable development challenges.", imgs:["ep35","ep36","ep37", "ep84"]},
       {name:"Fuyong Subdistrict",   lat:22.6715, lng:113.8225, type:"area", desc:"Urban area in Shenzhen, China, known for its transport hubs and local communities.", imgs:["ep77","ep78","ep79"]},
    ]},

  { name:"Denmark", lat:56.0, lng:10.0, flag:"dk", desc:"Hygge lifestyle, Viking history, and modern Scandinavian design.",
    cities:[
      {name:"Copenhagen", lat:55.6761, lng:12.5683, type:"city",  desc:"Colorful Nyhavn, cycling culture, and world-class cuisine.", imgs:["ep38","ep39","ep40","ep41"]},
      {name:"Aalborg",     lat:57.0311, lng:9.9166, type:"culture", desc:"Historic Danish city known for vibrant culture, waterfronts, and modern architecture.", imgs:["ep42","ep43","ep44","ep45"]},
      {name:"6th Nordic Post-Keynesian Conference",     lat:57.0147, lng:9.9753, type:"conference", desc:"International economics conference gathering scholars to discuss Post-Keynesian theory and research.", imgs:["ep46","ep47","ep48"]},
    ]},


  { name:"Ethiopia", lat:9.5, lng:39.5, flag:"et", desc:"Ancient rock churches, coffee origins, and breathtaking highland landscapes.",
    cities:[
      {name:"Addis Ababa", lat:9.0320, lng:38.7469, type:"airport", desc:"Africa's diplomatic capital, high-altitude city with rich culture.", imgs:["addis_ababa_1","addis_ababa_2","addis_ababa_3","addis_ababa_4"]},
    ]},
  { name:"Fiji", lat:-17.5, lng:178.0, flag:"fj", desc:"Coral reefs, turquoise waters, and the warm tropical Bula spirit.",
    cities:[
      {name:"Suva", lat:-18.1416, lng:178.4419, type:"city", desc:"Capital city on the Pacific, vibrant market and cultural hub.", imgs:["suva_1","suva_2","suva_3","suva_4"]},
      {name:"Nadi", lat:-17.7765, lng:177.4356, type:"sightseeing",   desc:"Gateway city with lush gardens and Mamanuca Islands access.", imgs:["ep118","ep119","ep120","ep121"]},
    ]},
  { name:"Finland", lat:62.0, lng:25.0, flag:"fi", desc:"A thousand lakes, Nordic saunas, and the magical Northern Lights.",
    cities:[
      {name:"Helsinki Airport", lat:60.3181, lng:24.9520, type:"airport", desc:"Modern Nordic hub offering efficient transit, sleek design, and calm atmosphere", imgs:["ep99"]},
    ]},
  { name:"France", lat:46.5, lng:2.5, flag:"fr", desc:"Art, romance, cuisine, and iconic landmarks from coast to countryside.",
    cities:[
      {name:"Paris", lat:48.8566, lng:2.3522, type:"sightseeing", desc:"City of Light — Eiffel Tower, Louvre, and café terraces.", imgs:["ep74","ep75","ep76",]},
    ]},
  { name:"Germany", lat:51.0, lng:10.0, flag:"de", desc:"Castles, beer gardens, fairy-tale forests, and cutting-edge innovation.",
    cities:[
      {name:"Berlin",  lat:52.5200, lng:13.4050, type:"sightseeing",  desc:"Reunified capital, cutting-edge art and tumultuous history.", imgs:["berlin_1","berlin_2","berlin_3","berlin_4"]},
      {name:"Munich Central Station",  lat:48.1404, lng:11.5600, type:"train", desc:"Major Bavarian rail hub, bustling platforms, shops, and international connections.", imgs:["ep25","ep26","ep27"]},
      {name:"Frankfurt", lat:50.1109, lng:8.6846, type:"city", desc:"A major financial hub that's home to the European Central Bank.", imgs:["ep100","ep101","ep102"]},
    ]},

  { name:"India", lat:22.0, lng:79.0, flag:"in", desc:"A subcontinent of ancient temples, spice markets, and breathtaking diversity.",
    cities:[
      {name:"New Delhi",  lat:28.6139, lng:77.2090, type:"sightseeing",  desc:"Mughal forts, colonial boulevards, and vibrant bazaars.", imgs:["new_delhi_1","new_delhi_2","new_delhi_3","new_delhi_4"]},
      {name:"Mumbai",     lat:19.0760, lng:72.8777, type:"culture", desc:"Bollywood, colonial architecture, and the bustling Gateway of India.", imgs:["mumbai_1","mumbai_2","mumbai_3","mumbai_4"]},
    ]},
  { name:"Indonesia", lat:-3.0, lng:117.0, flag:"id", desc:"Thousands of islands, volcanoes, rainforests, and vibrant cultures.",
    cities:[
      {name:"Jakarta", lat:-6.2088, lng:106.8456, type:"beach", desc:"Sprawling megacity, melting pot of cultures and cuisines.", imgs:["ep49","ep50","ep51","ep52", "ep56"]},
      {name:"32nd ASEAS Conference", lat:-6.3605, lng:106.8272, type:"conference", desc:"International hybrid conference in Indonesia uniting scholars to discuss Southeast Asian studies and interdisciplinary research.", imgs:["ep53","ep54","ep55"]},
    ]},



  { name:"Laos", lat:18.5, lng:103.0, flag:"la", desc:"Serene mountains, Buddhist monasteries, and the mighty Mekong River.",
    cities:[
      {name:"Luang Prabang", lat:19.8845, lng:102.1347, type:"culture", desc:"UNESCO World Heritage town, golden temples on the Mekong.", imgs:["luang_prabang_1","luang_prabang_2","luang_prabang_3","luang_prabang_4"]},
      {name:"Vang Vieng",    lat:18.9222, lng:102.4417, type:"hike",   desc:"Dramatic karst scenery, rivers and outdoor adventure.", imgs:["vang_vieng_1","vang_vieng_2","vang_vieng_3","vang_vieng_4"]},
    ]},
  { name:"Malaysia", lat:4.0, lng:109.0, flag:"my", desc:"Rainforests, skyscrapers, diverse cultures, and incredible culinary fusion.",
    cities:[
      {name:"Kuala Lumpur", lat:3.1390, lng:101.6869, type:"sightseeing", desc:"Petronas Towers, street food haven and multicultural city.", imgs:["kuala_lumpur_1","kuala_lumpur_2","kuala_lumpur_3","kuala_lumpur_4"]},
    ]},
  { name:"Netherlands", lat:52.5, lng:5.0, flag:"nl", desc:"Windmills, tulip fields, golden age canals, and vibrant cycling culture.",
    cities:[
      {name:"Amstersdam Airport Schipol", lat:52.3180, lng:4.7486, type:"airport", desc:"Major Dutch airport hub with global connections, trains, shops, and lounges.", imgs:["ep28"]},
    ]},
  { name:"Philippines", lat:12.5, lng:122.5, flag:"ph", desc:"Over 7,000 islands, pristine beaches, and legendary warm hospitality.",
    cities:[
      {name:"Manila",         lat:14.5995, lng:120.9842, type:"sightseeing",  desc:"Historic Intramuros, bustling bayside capital of the archipelago.", imgs:["manila_1","manila_2","manila_3","manila_4"]},
      {name:"Chocolate Hills", lat:9.8374, lng:124.1499, type:"park",   desc:"Famous limestone formations, turning brown in dry season, creating scenic landscapes.", imgs:["Phillipines25","IMG_5896","IMG_5909","IMG_5917"]},
      {name:"Bohol Waterfall", lat:9.6920, lng:124.3684, type:"waterfall",   desc:"Island paradise with Chocolate Hills, tarsiers, beaches, and clear waters", imgs:["ep109","ep110","ep111","ep112", "ep113"]},

    ]},

  { name:"Qatar", lat:25.3, lng:51.2, flag:"qa", desc:"Futuristic skylines, desert dunes, and a crossroads of ancient trade routes.",
    cities:[
      {name:"Doha", lat:25.2854, lng:51.5310, type:"airport", desc:"Ultramodern capital with the Museum of Islamic Art and Souq Waqif.", imgs:["doha_1","doha_2","doha_3","doha_4"]},
    ]},
  { name:"Rwanda", lat:-2.0, lng:30.0, flag:"rw", desc:"Land of a thousand hills, mountain gorillas, and remarkable resilience.",
    cities:[
      {name:"Kigali",          lat:-1.9441, lng:30.0619, type:"sightseeing", desc:"Africa's cleanest capital, with powerful genocide memorials and growing innovation.", imgs:["kigali_1","kigali_2","kigali_3","kigali_4"]},
      {name:"Volcanoes N.P.",  lat:-1.4767, lng:29.5244, type:"wildlife",  desc:"Misty rainforests sheltering endangered mountain gorillas.", imgs:["volcanoes_1","volcanoes_2","volcanoes_3","volcanoes_4"]},
    ]},
  { name:"Singapore", lat:1.3521, lng:103.8198, flag:"sg", desc:"Garden city, futuristic skyline, and multicultural melting pot.",
    cities:[
      {name:"Marina Bay", lat:1.2834, lng:103.8607, type:"culture", desc:"Iconic Marina Bay Sands, Gardens by the Bay and skyline.", imgs:["marina_bay_1","marina_bay_2","marina_bay_3","marina_bay_4"]},
      {name:"Chinatown",  lat:1.2838, lng:103.8448, type:"restaurant",    desc:"Vibrant heritage district, temples, street markets and hawker stalls.", imgs:["chinatown_sg_1","chinatown_sg_2","chinatown_sg_3","chinatown_sg_4"]},
      {name:"Sentosa",    lat:1.2494, lng:103.8303, type:"beach",   desc:"Resort island with Universal Studios and cable car views.", imgs:["sentosa_1","sentosa_2","sentosa_3","sentosa_4"]},
    ]},
  { name:"Spain", lat:40.0, lng:-3.5, flag:"es", desc:"Flamenco, siesta, tapas, and a mosaic of vibrant historic cities.",
    cities:[
      {name:"Madrid",    lat:40.4168, lng:-3.7038, type:"city",  desc:"Royal Palace, Prado Museum, and vibrant nightlife.", imgs:["ep68","ep69","ep70","ep71", "ep72", "ep73"]},
      {name:"Barcelona", lat:41.3851, lng:2.1734,  type:"culture", desc:"Gaudí's Sagrada Família, Gothic Quarter and La Rambla.", imgs:["ep57","ep58","ep59","ep60", "ep61", "ep67"]},
      {name:"Mercat de la Boqueria", lat:41.3818, lng:2.1715,  type:"shop", desc:"Famous Barcelona market offering fresh food, vibrant stalls, and local delicacies..", imgs:["ep62","ep63","ep64","ep65", "ep66"]},

    ]},
  { name:"Sweden", lat:62.0, lng:15.0, flag:"se", desc:"Archipelagos, minimalist design, and the magic of endless summer light.",
    cities:[
      {name:"Stockholm", lat:59.3293, lng:18.0686, type:"sightseeing", desc:"Venice of the North — islands, Viking history and design.", imgs:["ep80","ep81","ep82","ep83"]},
    ]},
  { name:"Switzerland", lat:46.8, lng:8.0, flag:"ch", desc:"Alpine peaks, pristine lakes, chocolate, and precision watchmaking.",
    cities:[
      {name:"Thun",     lat:46.7581, lng:7.6293, type:"lake", desc:"Lakeside town with medieval castle, turquoise waters, and mountain views.", imgs:["ep95","ep96"]},
      {name:"Grindelwald",     lat:46.6614, lng:8.0541, type:"hike", desc:"Alpine village with dramatic peaks, glaciers, and scenic hiking trails.", imgs:["ep92","ep93","ep94"]},
      {name:"Interlaken", lat:46.6863, lng:7.8632, type:"hike",   desc:"Adventure capital between two lakes, gateway to the Alps.", imgs:["ep89","ep90","ep91"]},
      {name:"Brienz", lat:46.7538, lng:8.0384, type:"lake",   desc:"Charming lakeside village with turquoise waters, woodcarving traditions, and mountains.", imgs:["ep97","ep98"]},

    ]},

  

  { name:"Thailand", lat:15.0, lng:101.0, flag:"th", desc:"Land of smiles, golden temples, vibrant street food, and tropical beaches.",
    cities:[
      {name:"Bangkok", lat:13.7367, lng:100.5231, type:"sightseeing", desc:"Temple of the Emerald Buddha, floating markets and tuk-tuks.", imgs:["bangkok_1","bangkok_2","bangkok_3","bangkok_4"]},
    ]},
   { name:"Uganda", lat:1.4, lng:32.3, flag:"ug", desc:"Source of the Nile, home to gorillas, forests, and savannahs.",
    cities:[
      {name:"Dubai",     lat:25.2048, lng:55.2708, type:"culture", desc:"Burj Khalifa, gold souks, and desert safaris meet the future.", imgs:["dubai_1","dubai_2","dubai_3","dubai_4"]},
    ]},
  { name:"United Arab Emirates", lat:24.0, lng:54.5, flag:"ae", desc:"Desert dunes, ultramodern towers, souk culture, and luxury at every turn.",
    cities:[
      {name:"Dubai",     lat:25.2048, lng:55.2708, type:"culture", desc:"Burj Khalifa, gold souks, and desert safaris meet the future.", imgs:["dubai_1","dubai_2","dubai_3","dubai_4"]},
      {name:"Abu Dhabi", lat:24.4539, lng:54.3773, type:"airport",  desc:"Capital city of stunning mosques, museums, and Formula 1.", imgs:["abu_dhabi_1","abu_dhabi_2","abu_dhabi_3","abu_dhabi_4"]},
    ]},
  { name:"United Kingdom", lat:54.0, lng:-2.5, flag:"gb", desc:"Royal heritage, literary legends, rolling countryside, and dynamic cities.",
    cities:[
      {name:"London",     lat:51.5074, lng:-0.1278, type:"sightseeing",  desc:"Big Ben, Tower Bridge, West End and multicultural energy.", imgs:["london_1","london_2","london_3","london_4"]},
      {name:"Leeds",  lat:55.9533, lng:-3.1883, type:"culture", desc:"Castle rock, Arthur's Seat, whisky trails and festivals.", imgs:["edinburgh_1","edinburgh_2","edinburgh_3","edinburgh_4"]},
      {name:"Manchester", lat:53.4808, lng:-2.2426, type:"culture", desc:"Music, football, Northern Quarter and Industrial heritage.", imgs:["manchester_1","manchester_2","manchester_3","manchester_4"]},
    ]},
  { name:"Vietnam", lat:16.5, lng:107.0, flag:"vn", desc:"Dramatic karst landscapes, bustling cities, and aromatic street food.",
    cities:[
      {name:"Hanoi",            lat:21.0285, lng:105.8542, type:"sightseeing", desc:"French colonial old quarter, Hoan Kiem Lake and pho.", imgs:["hanoi_1","hanoi_2","hanoi_3","hanoi_4"]},
      {name:"Ho Chi Minh City", lat:10.8231, lng:106.6297, type:"restaurant",    desc:"Saigon's energy, war history and street food culture.", imgs:["hcmc_1","hcmc_2","hcmc_3","hcmc_4"]},
    ]},
  { name:"Zambia", lat:-14.5, lng:27.5, flag:"zm", desc:"Victoria Falls, wild safaris, and the mighty Zambezi River.",
    cities:[
      {name:"Lusaka",      lat:-15.3875, lng:28.3228, type:"sightseeing", desc:"Rapidly growing capital with markets and modern development.", imgs:["ep122","ep123"]},
      {name:"South Luangwa National Park", lat:-13.0358, lng:31.7867, type:"wildlife",  desc:"Wildlife-rich savanna famous for walking safaris and abundant African animals.", imgs:["ep104","ep105","ep106","ep107", "ep108"]},
    ]},
].sort((a, b) => a.name.localeCompare(b.name));

/* ── LIGHTBOX ────────────────────────────────────────────────── */
/* tmLbNames holds raw image name strings (no path/extension).
   Thumbs are shown instantly; full-res is loaded in the background
   and swapped in once ready — so the lightbox opens with zero delay. */
let tmLbNames = [], tmLbIdx = 0, tmLbCity = '';

function tmOpenLb(names, idx, cityName) {
  tmLbNames = names; tmLbIdx = idx; tmLbCity = cityName;
  tmRenderLb();
  document.getElementById('tm-lb').classList.add('tm-on');
}
function tmCloseLb() { document.getElementById('tm-lb').classList.remove('tm-on'); }
function tmLbNav(dir) { tmLbIdx = (tmLbIdx + dir + tmLbNames.length) % tmLbNames.length; tmRenderLb(); }
function tmRenderLb() {
  const imgEl = document.getElementById('tm-lb-img');
  const name  = tmLbNames[tmLbIdx];

  /* 1. Show thumb instantly — no waiting */
  imgEl.src = tmThumb(name);
  imgEl.classList.remove('tm-lb-loaded');

  /* 2. Load full-res in background; swap when ready */
  const hires = new Image();
  hires.onload = () => {
    /* Only swap if user hasn't navigated away */
    if (tmLbNames[tmLbIdx] === name) {
      imgEl.src = hires.src;
      imgEl.classList.add('tm-lb-loaded');
    }
  };
  hires.src = tmFull(name);

  document.getElementById('tm-lb-caption').textContent =
    `${tmLbCity} · Photo ${tmLbIdx + 1} of ${tmLbNames.length}`;
  document.getElementById('tm-lb-dots').innerHTML = tmLbNames
    .map((_,i) => `<div class="tm-lb-dot${i===tmLbIdx?' tm-on':''}"
                        onclick="(function(){tmLbIdx=${i};tmRenderLb();})()"></div>`)
    .join('');
}
document.getElementById('tm-lb-close').addEventListener('click', tmCloseLb);
document.getElementById('tm-lb-prev').addEventListener('click', () => tmLbNav(-1));
document.getElementById('tm-lb-next').addEventListener('click', () => tmLbNav(1));
document.getElementById('tm-lb').addEventListener('click', function(e){ if(e.target===this) tmCloseLb(); });
document.addEventListener('keydown', e => {
  if (!document.getElementById('tm-lb').classList.contains('tm-on')) return;
  if (e.key === 'Escape')     tmCloseLb();
  if (e.key === 'ArrowLeft')  tmLbNav(-1);
  if (e.key === 'ArrowRight') tmLbNav(1);
});

/* Expose helpers needed by inline onclick in dots */
window.tmLbIdx    = () => tmLbIdx;
window.tmRenderLb = tmRenderLb;

/* ── IMAGE HELPERS ───────────────────────────────────────────── */
/* Thumbnails and full images served from the site's own static folder */
/* Thumbnails: small compressed copies in the thumbs/ subfolder (generated by
   the batch script below). Full images: originals at full resolution.
   The popup grid loads thumbs (fast); the lightbox loads originals (crisp). */
const tmThumb = (name) => `static/img/explore/thumbs/${name}.jpg`;
const tmFull  = (name) => `static/img/explore/${name}.jpg`;

/* ── MAP ─────────────────────────────────────────────────────── */
const tmMap = L.map('tm-map', { zoomControl:false, attributionControl:false }).setView([20,10], 2.2);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  {
    subdomains:    'abcd',
    maxZoom:       19,
    minZoom:       2,
    keepBuffer:    4,        /* pre-load 4 tiles beyond viewport edge during pan */
    updateWhenIdle:true,     /* only fetch new tiles after panning stops, not during */
    crossOrigin:   true,     /* enables browser HTTP cache to reuse tiles across sessions */
  }).addTo(tmMap);
L.control.zoom({ position:'bottomright' }).addTo(tmMap);

const tmCountryIcon = () => L.divIcon({
  className: '',
  html: `<div class="tm-pin-outer"><div class="tm-pin-ring"></div><div class="tm-pin-ring2"></div><div class="tm-pin-inner"><i class="fa-solid fa-globe"></i></div></div>`,
  iconSize:[36,36], popupAnchor:[0,-20], tooltipAnchor:[0,-14]
});
const tmCityIcon = (type) => {
  const t = tmPinTypes[type] || tmPinTypes.default;
  return L.divIcon({
    className: '',
    html: `<div class="tm-city-pin-outer" data-pintype="${type||'default'}">
             <div class="tm-city-pill" style="background:${t.color}">
               <i class="${t.icon}"></i>
             </div>
           </div>`,
    iconSize:[30,30], popupAnchor:[0,-18], tooltipAnchor:[0,-14]
  });
};

function tmCityPopupHtml(country, city) {
  const t = tmPinTypes[city.type] || tmPinTypes.default;
  const n = city.imgs.length;

  /* ── photo count → layout modifier class ── */
  let layoutClass;
  if      (n === 1)  layoutClass = 'tm-photos--1';
  else if (n === 2)  layoutClass = 'tm-photos--2';
  else if (n === 3)  layoutClass = 'tm-photos--3';
  else if (n === 4)  layoutClass = 'tm-photos--4';
  else               layoutClass = 'tm-photos--5-6';

  /* Always show max 5 tiles; tile 5 becomes "+N more" when n > 5 */
  const visibleImgs = n <= 5 ? city.imgs : city.imgs.slice(0, 5);
  const extraCount  = n > 5 ? n - 4 : 0;  /* tiles 1-4 normal, tile 5 = overflow */

  const photos = visibleImgs.map((name, i) => {
    const isOverflowTile = extraCount > 0 && i === 4;
    const overlay = isOverflowTile
      ? `<div class="tm-ph-more">+${extraCount}</div>`
      : `<div class="tm-zoom-hint"><i class="fa-solid fa-expand"></i> View</div>`;
    return `
    <div class="tm-ph" data-idx="${i}">
      <img src="${tmThumb(name)}" alt="" loading="lazy">
      ${overlay}
    </div>`;
  }).join('');

  const locLabel = country.cities.length > 1 ? 'location' : 'city';
  const wiki = `https://en.wikipedia.org/wiki/${encodeURIComponent(city.name)}`;

  /* Photo count badge — only for 2+ */
  const photoBadge = n > 1
    ? `<span class="tm-photo-count"><i class="fa-solid fa-images"></i> ${n}</span>`
    : '';

  return `
    <div class="tm-popup-body">
      <div class="tm-popup-photos ${layoutClass}">${photos}${photoBadge}</div>
      <div class="tm-popup-text">
        <div class="tm-city-badge" style="color:${t.color};background:${t.color}14;border-color:${t.color}30">
          <i class="${t.icon}"></i> <span class="fi fi-${country.flag}" title="${country.name}"></span> ${country.name}
          <span class="tm-type-tag">${t.label}</span>
        </div>
        <div class="tm-popup-title">${city.name}</div>
        <div class="tm-popup-desc">${city.desc}</div>
        <div class="tm-popup-actions">
          <a href="${wiki}" target="_blank" rel="noopener" class="tm-popup-link" style="background:${t.color}">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Read More
          </a>
          <span class="tm-popup-coord">${city.lat.toFixed(2)}°, ${city.lng.toFixed(2)}°</span>
        </div>
      </div>
    </div>`;
}

let tmActiveItem   = null;
const tmAllMarkers = [];        /* { marker, type } — populated in forEach below */
const tmActiveFilters = new Set(); /* empty = show all */
let tmLastGalleryCardId   = null; /* data-card-id to find card after re-render */
let tmLastGalleryCardName = '';   /* city name shown on back button */

tmCountries.forEach(c => {
  /* Location pins — country globe pins removed; only typed location pins shown */
  c.cities.forEach(city => {
    const imgNames = city.imgs;   /* raw names — lightbox resolves paths itself */
    const pinType  = city.type || 'default';
    const marker   = L.marker([city.lat, city.lng], { icon:tmCityIcon(pinType), riseOnHover:true })
      .bindPopup(tmCityPopupHtml(c, city), { maxWidth:410, minWidth:350, className:'tm-popup', offset:[0,-8] })
      .bindTooltip(`📍 ${city.name}`, { sticky:true, offset:[0,-14], direction:'top', className:'tm-tt' })
      .on('popupopen', () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          const content = document.querySelector('.leaflet-popup-content');
          if (!content || content._tmBound) return; /* already delegated — skip */
          content._tmBound = true;
          content.style.cursor = 'default';
          content.addEventListener('click', function(e) {
            const ph = e.target.closest('.tm-ph');
            if (!ph) return;
            e.stopPropagation();
            ph.style.cursor = 'zoom-in';
            tmOpenLb(imgNames, parseInt(ph.dataset.idx) || 0, city.name);
          });
          /* Cursor hint on each photo tile — set once, no repeated listeners */
          content.querySelectorAll('.tm-ph').forEach(ph => ph.style.cursor = 'zoom-in');
        }));
      });
    marker.addTo(tmMap);
    /* Store marker reference for filter toggling */
    tmAllMarkers.push({ marker, type: pinType });
  });
});

/* ── PANEL LIST ──────────────────────────────────────────────── */
const tmListEl = document.getElementById('tm-country-list');
function tmRenderList(filter) {
  tmListEl.innerHTML = '';
  const list = filter
    ? tmCountries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    : tmCountries;
  list.forEach((c, i) => {
    /* Countries with >1 pink pin → "locations"; single pin → "city" */
    const locWord = c.cities.length > 1 ? 'locations' : 'city';
    const el = document.createElement('div');
    el.className = 'tm-country-item';
    el.innerHTML = `
      <div class="tm-c-flag"><span class="fi fi-${c.flag}"></span></div>
      <div class="tm-c-body">
        <div class="tm-c-name">${c.name}</div>
        <div class="tm-c-desc">${c.cities.length} ${locWord} · ${c.desc}</div>
      </div>
      <i class="fa-solid fa-chevron-right tm-c-arrow"></i>`;
    el.addEventListener('click', () => {
      if (tmActiveItem) tmActiveItem.classList.remove('tm-active');
      el.classList.add('tm-active');
      tmActiveItem = el;
      tmMap.flyTo([c.lat, c.lng], 6, { duration:1.5, easeLinearity:0.2 });
    });
    tmListEl.appendChild(el);
  });
}
tmRenderList('');
let _listTimer = null;
document.getElementById('tm-search').addEventListener('input', e => {
  clearTimeout(_listTimer);
  _listTimer = setTimeout(() => tmRenderList(e.target.value), 160);
});
document.getElementById('tm-reset-btn').addEventListener('click', () => {
  tmMap.flyTo([20,10], 2.2, { duration:1.5 });
  tmMap.closePopup();
  if (tmActiveItem) { tmActiveItem.classList.remove('tm-active'); tmActiveItem = null; }
});

/* ── STATS ───────────────────────────────────────────────────── */
document.getElementById('tm-s-n').textContent = tmCountries.length;
document.getElementById('tm-nations-badge').textContent = tmCountries.length + ' nations';
function tmGetContinent(lat, lng) {
  if (lat > 35 && lng > -25 && lng < 65)   return 'Europe';
  if (lat > -40 && lat < 40 && lng > -20 && lng < 55) return 'Africa';
  if (lat > 5  && lng > 25  && lng < 180)  return 'Asia';
  if (lat < 5  && lng > 95  && lng < 180)  return 'Oceania';
  if (lat > 15 && lng > -170 && lng < -50) return 'North America';
  if (lat <= 15 && lng > -85 && lng < -30) return 'South America';
  return 'Other';
}
document.getElementById('tm-s-c').textContent =
  new Set(tmCountries.map(function(c){ return tmGetContinent(c.lat, c.lng); })).size;

/* ── PANEL TOGGLE ────────────────────────────────────────────── */
(function tmPanelToggle() {
  const panel = document.getElementById('tm-panel');
  const btn   = document.getElementById('tm-panel-toggle');
  if (!panel || !btn) return;
  if (window.innerWidth <= 768) panel.classList.add('tm-panel--collapsed');
  btn.addEventListener('click', () => {
    panel.classList.toggle('tm-panel--collapsed');
    setTimeout(() => tmMap.invalidateSize(), 320);
  });
})();

/* ── Remove <br> from panel/legend titles so they stay one line ── */
['tm-panel-title', 'tm-legend-title'].forEach(function(cls) {
  var el = document.querySelector('.' + cls);
  if (el) el.innerHTML = el.innerHTML.replace(/<br\s*\/?>/gi, ' ');
});

/* ════════════════════════════════════════════════════════════
   DESTINATIONS — Mobile FAB + Bottom Sheet
   Styles live in travel_map.css (no runtime injection needed)
════════════════════════════════════════════════════════════ */
(function tmDestinationsSheet() {
  var shell = document.getElementById('tm-shell');
  if (!shell) return;

  /* Styles are in travel_map.css — removed 47-rule JS injection */

  var fab = document.createElement('button');
  fab.className = 'tm-destinations-fab';
  fab.setAttribute('aria-label', 'Country collection');
  fab.innerHTML = '<i class="fa-solid fa-earth-americas"></i><span>Destinations</span>';
  shell.appendChild(fab);

  var sheet = document.createElement('div');
  sheet.className = 'tm-destinations-sheet';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  sheet.innerHTML =
    '<div class="tm-ds-inner">' +
      '<div class="tm-ds-handle"></div>' +
      '<div class="tm-ds-header">' +
        '<span class="tm-ds-title">Country Collection</span>' +
        '<span class="tm-ds-badge" id="tm-ds-badge"></span>' +
        '<button class="tm-ds-close" id="tm-ds-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>' +
      '</div>' +
      '<div class="tm-ds-search-row">' +
        '<i class="fa-solid fa-magnifying-glass"></i>' +
        '<input type="text" class="tm-ds-inp" placeholder="Search a country\u2026">' +
      '</div>' +
      '<div class="tm-ds-list" id="tm-ds-list"></div>' +
      '<div class="tm-ds-footer">' +
        '<button class="tm-ds-reset" id="tm-ds-reset"><i class="fa-solid fa-earth-americas"></i><span>Reset World View</span></button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(sheet);

  var dsBadge  = sheet.querySelector('#tm-ds-badge');
  var dsSearch = sheet.querySelector('.tm-ds-inp');
  var dsList   = sheet.querySelector('#tm-ds-list');
  var dsClose  = sheet.querySelector('#tm-ds-close');
  var dsReset  = sheet.querySelector('#tm-ds-reset');

  function render(filter) {
    dsList.innerHTML = '';
    var q = (filter || '').toLowerCase();
    var list = q ? tmCountries.filter(function(c){ return c.name.toLowerCase().indexOf(q) !== -1; }) : tmCountries;
    list.forEach(function(c) {
      var locWord = c.cities.length > 1 ? 'locations' : 'city';
      var el = document.createElement('div');
      el.className = 'tm-ds-item';
      el.innerHTML =
        '<div class="tm-ds-flag"><span class="fi fi-' + c.flag + '"></span></div>' +
        '<div class="tm-ds-body">' +
          '<div class="tm-ds-name">' + c.name + '</div>' +
          '<div class="tm-ds-desc">' + c.cities.length + ' ' + locWord + ' \u00b7 ' + c.desc + '</div>' +
        '</div>' +
        '<i class="fa-solid fa-chevron-right tm-ds-arrow"></i>';
      el.addEventListener('click', function() {
        closeSheet();
        setTimeout(function(){ tmMap.flyTo([c.lat, c.lng], 6, { duration:1.5, easeLinearity:0.2 }); }, 200);
      });
      dsList.appendChild(el);
    });
    if (dsBadge) dsBadge.textContent = tmCountries.length + ' nations';
  }

  function openSheet() { dsSearch.value=''; render(''); sheet.classList.add('tm-ds--open'); document.body.style.overflow='hidden'; }
  function closeSheet() { sheet.classList.remove('tm-ds--open'); document.body.style.overflow=''; }

  fab.addEventListener('click', openSheet);
  dsClose.addEventListener('click', closeSheet);
  sheet.addEventListener('click', function(e){ if(e.target===sheet) closeSheet(); });
  dsSearch.addEventListener('input', function(){ render(this.value); });
  dsReset.addEventListener('click', function(){ tmMap.flyTo([20,10],2.2,{duration:1.5}); tmMap.closePopup(); closeSheet(); });
})();

/* ── LEGEND — panel-style: collapsible, scrollable, filterable ── */
(function tmBuildLegend() {
  const legendEl  = document.getElementById('tm-legend');
  const listEl    = document.getElementById('tm-legend-list');
  const badgeEl   = document.getElementById('tm-types-badge');
  const resetBtn  = document.getElementById('tm-legend-reset-btn');
  const toggleBtn = document.getElementById('tm-legend-toggle');
  if (!legendEl || !listEl) return;

  /* Collect types actually used in the data */
  const usedTypes = new Set();
  tmCountries.forEach(c => c.cities.forEach(city => usedTypes.add(city.type || 'default')));

  /* Update the active-count badge */
  function tmUpdateBadge() {
    const n = tmActiveFilters.size;
    badgeEl.textContent = n === 0 ? 'all shown' : `${n} active`;
  }

  /* Show / hide markers according to active filters */
  function tmApplyFilter() {
    tmAllMarkers.forEach(({ marker, type }) => {
      if (tmActiveFilters.size === 0 || tmActiveFilters.has(type)) {
        marker.addTo(tmMap);
      } else {
        marker.remove();
      }
    });
    tmUpdateBadge();
  }

  /* Build one row per used type */
  Object.entries(tmPinTypes).forEach(([key, t]) => {
    if (key === 'default' || !usedTypes.has(key)) return;
    const row = document.createElement('div');
    row.className = 'tm-legend-item';
    row.dataset.type = key;
    row.innerHTML = `
      <div class="tm-legend-pill" style="background:${t.color}">
        <i class="${t.icon}"></i>
      </div>
      <span>${t.label}</span>`;

    row.addEventListener('click', () => {
      if (tmActiveFilters.has(key)) {
        tmActiveFilters.delete(key);
        row.classList.remove('tm-legend-active');
      } else {
        tmActiveFilters.add(key);
        row.classList.add('tm-legend-active');
      }
      tmApplyFilter();
    });

    listEl.appendChild(row);
  });

  /* Reset button — clears all filters */
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      tmActiveFilters.clear();
      listEl.querySelectorAll('.tm-legend-item').forEach(r => r.classList.remove('tm-legend-active'));
      tmApplyFilter();
    });
  }

  /* Toggle collapse — mirrors panel toggle behaviour */
  if (toggleBtn) {
    /* Auto-collapse on mobile */
    if (window.innerWidth <= 768) {
      legendEl.classList.add('tm-legend--collapsed');
    }
    toggleBtn.addEventListener('click', () => {
      legendEl.classList.toggle('tm-legend--collapsed');
    });
  }

  /* Initialise badge */
  tmUpdateBadge();

  /* ── Mobile FAB + Bottom Sheet ─────────────────────────────── */
  const fabEl       = document.getElementById('tm-filter-fab');
  const sheetEl     = document.getElementById('tm-filter-sheet');
  const sheetListEl = document.getElementById('tm-sheet-list');
  const sheetBadge  = document.getElementById('tm-sheet-badge');
  const fabBadge    = document.getElementById('tm-fab-badge');
  const sheetClose  = document.getElementById('tm-sheet-close');
  const sheetReset  = document.getElementById('tm-sheet-reset-btn');

  function tmOpenSheet() {
    sheetEl.classList.add('tm-sheet--open');
    document.body.style.overflow = 'hidden'; /* prevent body scroll behind sheet */
  }
  function tmCloseSheet() {
    sheetEl.classList.remove('tm-sheet--open');
    document.body.style.overflow = '';
  }

  /* Sync badge text across desktop legend, sheet, and FAB badge */
  function tmSyncBadges() {
    const n = tmActiveFilters.size;
    const txt = n === 0 ? 'all shown' : `${n} active`;
    badgeEl.textContent = txt;
    if (sheetBadge) sheetBadge.textContent = txt;
    if (fabBadge) {
      fabBadge.textContent = n;
      fabBadge.classList.toggle('tm-fab-badge--on', n > 0);
    }
  }

  if (fabEl && sheetEl && sheetListEl) {
    /* Clone legend items into sheet list so both panels stay in sync */
    Object.entries(tmPinTypes).forEach(([key, t]) => {
      if (key === 'default' || !usedTypes.has(key)) return;
      const row = document.createElement('div');
      row.className = 'tm-legend-item';
      row.dataset.type = key;
      row.innerHTML = `
        <div class="tm-legend-pill" style="background:${t.color}">
          <i class="${t.icon}"></i>
        </div>
        <span>${t.label}</span>`;

      /* Keep desktop + sheet rows visually in sync */
      function tmSyncRowState(active) {
        /* find matching row in desktop legend list */
        const desktopRow = listEl.querySelector(`.tm-legend-item[data-type="${key}"]`);
        [row, desktopRow].forEach(r => {
          if (!r) return;
          r.classList.toggle('tm-legend-active', active);
        });
      }

      row.addEventListener('click', () => {
        const nowActive = !tmActiveFilters.has(key);
        if (nowActive) tmActiveFilters.add(key); else tmActiveFilters.delete(key);
        tmSyncRowState(nowActive);
        tmApplyFilter();
        tmSyncBadges();
      });
      sheetListEl.appendChild(row);
    });

    /* FAB opens sheet */
    fabEl.addEventListener('click', tmOpenSheet);

    /* Close button + backdrop tap close sheet */
    if (sheetClose) sheetClose.addEventListener('click', tmCloseSheet);
    sheetEl.addEventListener('click', e => {
      if (e.target === sheetEl) tmCloseSheet();
    });

    /* Sheet reset button */
    if (sheetReset) {
      sheetReset.addEventListener('click', () => {
        tmActiveFilters.clear();
        sheetListEl.querySelectorAll('.tm-legend-item').forEach(r => r.classList.remove('tm-legend-active'));
        listEl.querySelectorAll('.tm-legend-item').forEach(r => r.classList.remove('tm-legend-active'));
        tmApplyFilter();
        tmSyncBadges();
      });
    }

    /* Intercept desktop reset to also sync sheet rows */
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        sheetListEl.querySelectorAll('.tm-legend-item').forEach(r => r.classList.remove('tm-legend-active'));
        tmSyncBadges();
      });
    }

    /* Override tmUpdateBadge to also update sheet/fab */
    const _origUpdate = tmUpdateBadge;
    tmUpdateBadge = tmSyncBadges;

    /* Initial badge state */
    tmSyncBadges();
  }
})();

/* ── MAP HEIGHT: fills viewport below header + toggle bar ─ */
function tmFitHeight() {
  const shell = document.getElementById('tm-shell');
  if (!shell) return;
  const header = document.querySelector('header.su-masthead')
              || document.querySelector('header[role="banner"]')
              || document.querySelector('#site-header')
              || document.querySelector('header');
  const toggleBar = document.querySelector('.tm-view-toggle-bar');
  const heading   = document.getElementById('academics');
  const vh = (window.visualViewport ? window.visualViewport.height : window.innerHeight);
  const w  = window.innerWidth;
  const headerH  = header    ? header.offsetHeight    : 0;
  const toggleH  = toggleBar ? toggleBar.offsetHeight : 0;
  const headingH = heading   ? heading.offsetHeight   : 0;
  const used = headerH + headingH + toggleH + 8; /* 8px gap below toggle bar */

  let h;
  if (w > 1024) {
    /* Desktop — fill as much of the viewport as possible, minimum 85vh */
    h = Math.max(Math.round(vh * 0.85), vh - used, 800);
  } else if (w > 768) {
    /* Small desktop / large tablet */
    h = Math.max(720, vh - used);
  } else if (w > 480) {
    /* Tablet portrait */
    h = Math.max(680, vh - used);
  } else {
    /* Phone */
    h = Math.max(560, vh - used);
  }
  shell.style.height = h + 'px';
  tmMap.invalidateSize();
}
tmFitHeight();
/* Debounced resize */
let tmResizeTimer = null;
function tmDebouncedFitHeight() {
  clearTimeout(tmResizeTimer);
  tmResizeTimer = setTimeout(tmFitHeight, 120);
}
window.addEventListener('resize', tmDebouncedFitHeight);
/* visualViewport fires for address-bar show/hide on mobile.
   Only attach on mobile (≤1024px) to avoid double-firing with window.resize on desktop. */
if (window.visualViewport && window.innerWidth <= 1024) {
  window.visualViewport.addEventListener('resize', tmDebouncedFitHeight);
}

/* ── Pause live-dot animation when tab is hidden — stops idle GPU/CPU usage ── */
document.addEventListener('visibilitychange', () => {
  const dot = document.querySelector('.tm-live-dot');
  if (dot) dot.style.animationPlayState = document.hidden ? 'paused' : 'running';
});

/* ══════════════════════════════════════════════════════════════
   VIEW TOGGLE — Map ↔ Gallery
══════════════════════════════════════════════════════════════ */
(function tmViewToggle() {
  const btnMap     = document.getElementById('tm-btn-map');
  const btnGallery = document.getElementById('tm-btn-gallery');
  const mapShell   = document.getElementById('tm-shell');
  const galleryEl  = document.getElementById('tm-gallery-view');
  if (!btnMap || !btnGallery || !mapShell || !galleryEl) return;

  function tmSidebarsVisible(show) {
    ['tm-gs-left','tm-gs-right'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('tm-gs--visible', show);
    });
  }

  function showMap() {
    mapShell.style.display  = '';
    galleryEl.style.display = 'none';
    galleryEl.setAttribute('aria-hidden', 'true');
    galleryEl.classList.remove('tm-gallery--active');
    tmSidebarsVisible(false);
    btnMap.classList.add('tm-view-btn--active');
    btnMap.setAttribute('aria-pressed', 'true');
    btnGallery.classList.remove('tm-view-btn--active');
    btnGallery.setAttribute('aria-pressed', 'false');
    setTimeout(() => tmMap.invalidateSize(), 50);
  }

  function showGallery() {
    mapShell.style.display  = 'none';
    galleryEl.style.display = 'block';
    galleryEl.setAttribute('aria-hidden', 'false');
    galleryEl.classList.add('tm-gallery--active');
    tmSidebarsVisible(true);
    btnGallery.classList.add('tm-view-btn--active');
    btnGallery.setAttribute('aria-pressed', 'true');
    btnMap.classList.remove('tm-view-btn--active');
    btnMap.setAttribute('aria-pressed', 'false');
    tmRenderGallery();
  }

  btnMap.addEventListener('click', showMap);
  btnGallery.addEventListener('click', () => {
    /* Hide back bar when user manually switches to gallery */
    const backBar = document.getElementById('tm-back-bar');
    if (backBar) backBar.style.display = 'none';
    showGallery();
  });
})();

/* ── Back to Gallery button ── */
(function tmBackButton() {
  const backBtn = document.getElementById('tm-back-btn');
  const backBar = document.getElementById('tm-back-bar');
  if (!backBtn) return;
  backBtn.addEventListener('click', () => {
    if (backBar) backBar.style.display = 'none';
    /* Switch to gallery — this calls tmRenderGallery() which rebuilds the DOM */
    document.getElementById('tm-btn-gallery').click();
    /* After render, find the fresh card by its data-card-id and scroll to it */
    setTimeout(() => {
      if (!tmLastGalleryCardId) return;
      const freshCard = document.querySelector(
        `.tm-gc-card[data-card-id="${tmLastGalleryCardId}"]`
      );
      if (freshCard) {
        freshCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        freshCard.classList.add('tm-gc-card--highlight');
        setTimeout(() => freshCard.classList.remove('tm-gc-card--highlight'), 1800);
      }
    }, 150);
  });
})();

/* ══════════════════════════════════════════════════════════════
   GALLERY SIDEBAR TOGGLES
══════════════════════════════════════════════════════════════ */
(function tmSidebarToggles() {
  function initSidebar(sidebarId, toggleId, panelId, chevronId, collapseClass) {
    const sidebar  = document.getElementById(sidebarId);
    const toggle   = document.getElementById(toggleId);
    const chevron  = document.getElementById(chevronId);
    if (!sidebar || !toggle) return;

    /* Start collapsed */
    sidebar.classList.add(collapseClass);

    toggle.addEventListener('click', () => {
      const isCollapsed = sidebar.classList.toggle(collapseClass);
      if (chevron) chevron.style.transform = isCollapsed ? '' : 'rotate(180deg)';
    });
  }

  initSidebar('tm-gs-left',  'tm-gs-left-toggle',  'tm-gs-left-panel',  'tm-gs-left-chevron',  'tm-gs--collapsed');
  initSidebar('tm-gs-right', 'tm-gs-right-toggle', 'tm-gs-right-panel', 'tm-gs-right-chevron', 'tm-gs--collapsed');
})();

/* ══════════════════════════════════════════════════════════════
   GALLERY — search + filter state
══════════════════════════════════════════════════════════════ */
let tmGalleryQuery     = '';
let tmGalleryCountries = new Set();
let tmGalleryTypes     = new Set();
let tmGalleryPage      = 1;          /* current page, 1-based */
const TM_PAGE_SIZE     = 30;         /* cards per page */

function tmUpdateFilterBadge(id, set) {
  const badge = document.getElementById(id);
  if (!badge) return;
  const n = set.size;
  badge.textContent = n ? n : '';
  badge.classList.toggle('tm-gs-badge--on', n > 0);
}

/* ── Build filter chips once ── */
function tmBuildGalleryFilters() {

  /* ── Country chips ── */
  const countryChips = document.getElementById('tm-gf-countries');
  if (countryChips) {
    tmCountries.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'tm-gf-chip';
      btn.dataset.value = c.name;
      btn.innerHTML = `
        <div class="tm-gf-flag-wrap"><span class="fi fi-${c.flag}"></span></div>
        <span class="tm-gf-chip-label">${c.name}</span>`;
      btn.addEventListener('click', () => {
        if (tmGalleryCountries.has(c.name)) tmGalleryCountries.delete(c.name);
        else tmGalleryCountries.add(c.name);
        btn.classList.toggle('tm-gf-chip--on', tmGalleryCountries.has(c.name));
        tmUpdateFilterBadge('tm-gf-country-badge', tmGalleryCountries);
        tmGalleryPage = 1;
        tmRenderGallery();
      });
      countryChips.appendChild(btn);
    });
  }

  /* ── Type chips ── */
  const usedTypes = new Set();
  tmCountries.forEach(c => c.cities.forEach(city => usedTypes.add(city.type || 'default')));
  const typeChips = document.getElementById('tm-gf-types');
  if (typeChips) {
    Object.entries(tmPinTypes).forEach(([key, t]) => {
      if (!usedTypes.has(key) || key === 'default') return;
      const btn = document.createElement('button');
      btn.className = 'tm-gf-chip';
      btn.dataset.value = key;
      btn.innerHTML = `
        <div class="tm-gf-icon-circle" style="background:${t.color}">
          <i class="${t.icon}"></i>
        </div>
        <span class="tm-gf-chip-label">${t.label}</span>`;
      btn.addEventListener('click', () => {
        if (tmGalleryTypes.has(key)) tmGalleryTypes.delete(key);
        else tmGalleryTypes.add(key);
        btn.classList.toggle('tm-gf-chip--on', tmGalleryTypes.has(key));
        tmUpdateFilterBadge('tm-gf-type-badge', tmGalleryTypes);
        tmGalleryPage = 1;
        tmRenderGallery();
      });
      typeChips.appendChild(btn);
    });
  }

  /* ── Footer reset buttons ── */
  document.getElementById('tm-gf-country-reset')?.addEventListener('click', () => {
    tmGalleryCountries.clear();
    countryChips?.querySelectorAll('.tm-gf-chip').forEach(b => b.classList.remove('tm-gf-chip--on'));
    tmUpdateFilterBadge('tm-gf-country-badge', tmGalleryCountries);
    tmGalleryPage = 1;
    tmRenderGallery();
  });
  document.getElementById('tm-gf-type-reset')?.addEventListener('click', () => {
    tmGalleryTypes.clear();
    typeChips?.querySelectorAll('.tm-gf-chip').forEach(b => b.classList.remove('tm-gf-chip--on'));
    tmUpdateFilterBadge('tm-gf-type-badge', tmGalleryTypes);
    tmGalleryPage = 1;
    tmRenderGallery();
  });

  /* ── Search — debounced so gallery doesn't rebuild on every keystroke ── */
  const inp = document.getElementById('tm-gallery-search');
  const clearBtn = document.getElementById('tm-gallery-search-clear');
  let _searchTimer = null;
  if (inp) {
    inp.addEventListener('input', e => {
      tmGalleryQuery = e.target.value;
      if (clearBtn) clearBtn.style.display = tmGalleryQuery ? 'flex' : 'none';
      tmGalleryPage = 1;
      clearTimeout(_searchTimer);
      _searchTimer = setTimeout(tmRenderGallery, 180);
    });
  }
  if (clearBtn) {
    clearBtn.style.display = 'none';
    clearBtn.addEventListener('click', () => {
      if (inp) inp.value = '';
      tmGalleryQuery = '';
      clearBtn.style.display = 'none';
      tmGalleryPage = 1;
      tmRenderGallery();
    });
  }

  /* ── Clear all ── */
  document.getElementById('tm-gallery-clear-all')?.addEventListener('click', () => {
    tmGalleryQuery = '';
    tmGalleryCountries.clear();
    tmGalleryTypes.clear();
    if (inp) inp.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    document.querySelectorAll('.tm-gf-chip').forEach(b => b.classList.remove('tm-gf-chip--on'));
    tmUpdateFilterBadge('tm-gf-country-badge', tmGalleryCountries);
    tmUpdateFilterBadge('tm-gf-type-badge', tmGalleryTypes);
    tmGalleryPage = 1;
    tmRenderGallery();
  });
}

/* ══════════════════════════════════════════════════════════════
   GALLERY RENDERER — paginated (TM_PAGE_SIZE cards per page)
══════════════════════════════════════════════════════════════ */
function tmRenderGallery() {
  const container = document.getElementById('tm-gallery-countries');
  const activeBar = document.getElementById('tm-gallery-active-bar');
  const countEl   = document.getElementById('tm-gallery-result-count');
  if (!container) return;

  const q = tmGalleryQuery.toLowerCase().trim();

  /* ── 1. Build complete flat list of filtered cards ── */
  const allCards = [];
  tmCountries.forEach(country => {
    if (tmGalleryCountries.size > 0 && !tmGalleryCountries.has(country.name)) return;

    const matchingCities = country.cities.filter(city => {
      const matchesType   = tmGalleryTypes.size === 0 || tmGalleryTypes.has(city.type);
      const matchesSearch = !q ||
        country.name.toLowerCase().includes(q) ||
        city.name.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    }).sort((a, b) => a.name.localeCompare(b.name));

    /* Merge same-named cities into one card */
    const mergedMap = new Map();
    matchingCities.forEach(city => {
      const key = city.name.trim().toLowerCase();
      if (mergedMap.has(key)) {
        const m = mergedMap.get(key);
        m.imgs  = m.imgs.concat(city.imgs);
        m.types.push({ type: city.type, lat: city.lat, lng: city.lng });
      } else {
        mergedMap.set(key, {
          name: city.name, desc: city.desc,
          lat: city.lat, lng: city.lng,
          imgs: [...city.imgs],
          types: [{ type: city.type, lat: city.lat, lng: city.lng }],
        });
      }
    });
    mergedMap.forEach(city => allCards.push({ country, city }));
  });

  const totalCards = allCards.length;

  /* ── 2. Active filter bar ── */
  const hasFilter = q || tmGalleryCountries.size > 0 || tmGalleryTypes.size > 0;
  if (activeBar) {
    activeBar.style.display = hasFilter ? 'flex' : 'none';
    if (countEl) countEl.textContent = `${totalCards} location${totalCards !== 1 ? 's' : ''} found`;
  }

  container.innerHTML = '';

  if (totalCards === 0) {
    container.innerHTML = '<p class="tm-gallery-empty"><i class="fa-solid fa-magnifying-glass"></i><br>No locations match your filters.</p>';
    tmRenderPagination(0, 0);
    return;
  }

  /* ── 3. Pagination — clamp current page ── */
  const totalPages = Math.ceil(totalCards / TM_PAGE_SIZE);
  tmGalleryPage    = Math.min(Math.max(1, tmGalleryPage), totalPages);
  const startIdx   = (tmGalleryPage - 1) * TM_PAGE_SIZE;
  const pageCards  = allCards.slice(startIdx, startIdx + TM_PAGE_SIZE);

  /* ── 4. Re-group this page's cards by country for section headers ── */
  const sectionsMap = new Map();
  pageCards.forEach(({ country, city }) => {
    if (!sectionsMap.has(country.name)) sectionsMap.set(country.name, { country, cities: [] });
    sectionsMap.get(country.name).cities.push(city);
  });

  /* ── 5. Render sections ── */
  sectionsMap.forEach(({ country, cities }) => {
    const section = document.createElement('div');
    section.className = 'tm-gc-section';

    const hdr = document.createElement('div');
    hdr.className = 'tm-gc-country-header';
    hdr.innerHTML = `
      <span class="tm-gc-flag fi fi-${country.flag}"></span>
      <h3 class="tm-gc-country-name">${country.name}</h3>
      <span class="tm-gc-country-desc">${country.desc}</span>`;
    section.appendChild(hdr);

    const locGrid = document.createElement('div');
    locGrid.className = 'tm-gc-locations';

    cities.forEach(city => {
      const allImgs    = city.imgs;
      const n          = allImgs.length;
      const primaryLat = city.types[0].lat;
      const primaryLng = city.types[0].lng;
      const cardId     = city.name.trim().toLowerCase().replace(/\s+/g, '_');

      const card = document.createElement('div');
      card.className = 'tm-gc-card';
      card.dataset.cardId = cardId;

      const photoGrid = document.createElement('div');
      photoGrid.className = 'tm-gc-photo-wrap';
      photoGrid.innerHTML = tmGalleryPhotoGrid(allImgs);
      if (n > 1) {
        const badge = document.createElement('span');
        badge.className = 'tm-gc-photo-count';
        badge.innerHTML = `<i class="fa-solid fa-images"></i> ${n}`;
        photoGrid.querySelector('.tm-gc-photos').appendChild(badge);
      }

      const typeBadgesHtml = city.types.map(({ type }) => {
        const t = tmPinTypes[type] || tmPinTypes.default;
        return `<div class="tm-gc-type-badge" style="color:${t.color};background:${t.color}14;border-color:${t.color}30">
          <i class="${t.icon}"></i> ${t.label}</div>`;
      }).join('');

      const info = document.createElement('div');
      info.className = 'tm-gc-info';
      info.innerHTML = `
        <div class="tm-gc-type-badges">${typeBadgesHtml}</div>
        <button class="tm-gc-loc-name" data-lat="${primaryLat}" data-lng="${primaryLng}" title="View on map"
          style="background:none;border:none;padding:0;margin:0;box-shadow:none;outline:none;border-radius:0;">
          ${city.name} <i class="fa-solid fa-map-location-dot"></i>
        </button>
        <p class="tm-gc-loc-desc">${city.desc}</p>`;

      card.appendChild(photoGrid);
      card.appendChild(info);

      card.querySelectorAll('.tm-gc-ph').forEach(ph => {
        ph.style.cursor = 'zoom-in';
        ph.addEventListener('click', function(e) {
          e.stopPropagation();
          tmOpenLb(allImgs, parseInt(this.dataset.idx) || 0, city.name);
        });
      });

      card.querySelector('.tm-gc-loc-name').addEventListener('click', function() {
        const lat = parseFloat(this.dataset.lat);
        const lng  = parseFloat(this.dataset.lng);
        tmLastGalleryCardId   = cardId;
        tmLastGalleryCardName = city.name;
        document.getElementById('tm-btn-map').click();
        const backBar = document.getElementById('tm-back-bar');
        if (backBar) backBar.style.display = 'flex';
        const nameEl = document.getElementById('tm-back-city-name');
        if (nameEl) nameEl.textContent = city.name;
        setTimeout(() => {
          tmMap.flyTo([lat, lng], 14, { duration: 1.4 });
          setTimeout(() => {
            tmAllMarkers.forEach(({ marker }) => {
              const pos = marker.getLatLng();
              if (Math.abs(pos.lat - lat) < 0.001 && Math.abs(pos.lng - lng) < 0.001) marker.openPopup();
            });
          }, 1500);
        }, 100);
      });

      locGrid.appendChild(card);
    });

    section.appendChild(locGrid);
    container.appendChild(section);
  });

  /* ── 6. Pagination bar ── */
  tmRenderPagination(totalPages, totalCards);

  /* ── 7. Start IntersectionObserver for lazy-loading gallery images ── */
  /* Small rAF delay so DOM is fully painted before observing */
  requestAnimationFrame(tmObserveGalleryImages);
}

/* ── Pagination bar ── */
function tmRenderPagination(totalPages, totalCards) {
  document.getElementById('tm-pagination')?.remove();
  if (totalPages <= 1) return;

  const startCard = (tmGalleryPage - 1) * TM_PAGE_SIZE + 1;
  const endCard   = Math.min(tmGalleryPage * TM_PAGE_SIZE, totalCards);

  /* ── Dark mode detection ── */
  const dark = document.documentElement.classList.contains('dark-mode');

  /* ── Colour tokens (inline so site CSS can't override) ── */
  const C = dark ? {
    bg:         '#1e1c1a',   /* button face */
    border:     '#3a3630',   /* button border */
    text:       '#c4bcb4',   /* button number */
    bgHover:    '#2a2826',
    borderHover:'#f0541a',
    textHover:  '#f0541a',
    bgActive:   '#f0541a',   /* filled orange pill */
    borderActive:'#f0541a',
    textActive: '#ffffff',
    bgDisabled: '#171513',
    borderDisabled:'#252220',
    textDisabled:'#3a3630',
    ellipsis:   '#4a4640',
    infoText:   '#5a5450',
    navBg:      'rgba(30,28,26,.7)',
  } : {
    bg:         '#ffffff',
    border:     '#e0dcd6',
    text:       '#4a4035',
    bgHover:    '#fff8f6',
    borderHover:'#f0441a',
    textHover:  '#f0441a',
    bgActive:   '#f0441a',   /* filled orange pill */
    borderActive:'#f0441a',
    textActive: '#ffffff',
    bgDisabled: '#f7f6f4',
    borderDisabled:'#ede9e3',
    textDisabled:'#c8c0b8',
    ellipsis:   '#9a8e82',
    infoText:   '#9a8e82',
    navBg:      'rgba(245,243,240,.85)',
  };

  /* ── Base styles shared by all buttons ── */
  const BASE = 'display:inline-flex;align-items:center;justify-content:center;' +
    'min-width:40px;height:40px;padding:0 12px;border-radius:10px;' +
    'font-size:1.5rem;font-weight:500;cursor:pointer;line-height:1;' +
    'white-space:nowrap;transition:none;text-decoration:none;' +
    '-webkit-appearance:none;appearance:none;font-family:inherit;';

  function styleNormal()   { return BASE + `background:${C.bg}!important;border:1.5px solid ${C.border}!important;color:${C.text}!important;box-shadow:none!important;`; }
  function styleHover()    { return BASE + `background:${C.bgHover}!important;border:1.5px solid ${C.borderHover}!important;color:${C.textHover}!important;box-shadow:none!important;`; }
  function styleActive()   { return BASE + `background:${C.bgActive}!important;border:1.5px solid ${C.borderActive}!important;color:${C.textActive}!important;font-weight:700!important;box-shadow:0 2px 12px rgba(240,68,26,.35)!important;cursor:default!important;`; }
  function styleDisabled() { return BASE + `background:${C.bgDisabled}!important;border:1.5px solid ${C.borderDisabled}!important;color:${C.textDisabled}!important;box-shadow:none!important;cursor:default!important;opacity:.5!important;`; }

  /* ── Wrapper nav ── */
  const bar = document.createElement('nav');
  bar.id = 'tm-pagination';
  bar.setAttribute('aria-label', 'Gallery pages');
  bar.style.cssText = 'display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;' +
    `padding:28px 16px 52px;max-width:1200px;margin:0 auto;`;

  function scrollTop() {
    document.querySelector('.tm-gallery-top')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ── Helper: make a nav button ── */
  function makeNavBtn(iconClass, disabled, onClick) {
    const btn = document.createElement('button');
    btn.setAttribute('style', disabled ? styleDisabled() : styleNormal());
    btn.innerHTML = `<i class="${iconClass}" style="font-size:1.1rem;pointer-events:none;"></i>`;
    btn.disabled = disabled;
    if (!disabled) {
      btn.addEventListener('mouseenter', () => btn.setAttribute('style', styleHover()));
      btn.addEventListener('mouseleave', () => btn.setAttribute('style', styleNormal()));
      btn.addEventListener('click', onClick);
    }
    return btn;
  }

  /* ── Prev ── */
  const prev = makeNavBtn('fa-solid fa-chevron-left', tmGalleryPage === 1, () => {
    tmGalleryPage--; tmRenderGallery(); scrollTop();
  });
  prev.setAttribute('aria-label', 'Previous page');
  bar.appendChild(prev);

  /* ── Page numbers with smart ellipsis ── */
  const pages = new Set([1, totalPages]);
  for (let p = tmGalleryPage - 1; p <= tmGalleryPage + 1; p++) {
    if (p >= 1 && p <= totalPages) pages.add(p);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  let last = 0;
  sorted.forEach(p => {
    /* Ellipsis gap */
    if (last && p - last > 1) {
      const ell = document.createElement('span');
      ell.style.cssText = `display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:40px;color:${C.ellipsis};font-size:1.5rem;cursor:default;user-select:none;`;
      ell.textContent = '…';
      bar.appendChild(ell);
    }

    const isActive = p === tmGalleryPage;
    const btn = document.createElement('button');
    btn.setAttribute('style', isActive ? styleActive() : styleNormal());
    btn.setAttribute('aria-label', `Page ${p}`);
    btn.textContent = p;
    if (isActive) {
      btn.setAttribute('aria-current', 'page');
      btn.disabled = true;
    } else {
      btn.addEventListener('mouseenter', () => btn.setAttribute('style', styleHover()));
      btn.addEventListener('mouseleave', () => btn.setAttribute('style', styleNormal()));
      btn.addEventListener('click', () => { tmGalleryPage = p; tmRenderGallery(); scrollTop(); });
    }
    bar.appendChild(btn);
    last = p;
  });

  /* ── Next ── */
  const next = makeNavBtn('fa-solid fa-chevron-right', tmGalleryPage === totalPages, () => {
    tmGalleryPage++; tmRenderGallery(); scrollTop();
  });
  next.setAttribute('aria-label', 'Next page');
  bar.appendChild(next);

  /* ── Info text ── */
  const info = document.createElement('p');
  info.style.cssText = `width:100%;text-align:center;font-size:1.3rem;color:${C.infoText};margin:8px 0 0;letter-spacing:.02em;`;
  info.textContent = `Showing ${startCard}–${endCard} of ${totalCards} locations`;
  bar.appendChild(info);

  const container = document.getElementById('tm-gallery-countries');
  container?.parentNode?.insertBefore(bar, container.nextSibling);
}

/* Init filters once */
tmBuildGalleryFilters();
function tmGalleryPhotoGrid(imgs) {
  const n = imgs.length;
  const th = name => `static/img/explore/thumbs/${name}.jpg`;
  /* Use data-src so IntersectionObserver can swap in src when tile enters viewport */
  const tile = (name, idx, extra) => {
    const overflow = (extra !== undefined)
      ? `<div class="tm-gc-more">+${extra}</div>` : '';
    return `<div class="tm-gc-ph" data-idx="${idx}"><img data-src="${th(name)}" alt="" loading="lazy">${overflow}</div>`;
  };

  if (n === 1) return `<div class="tm-gc-photos tm-gc-photos--1">${tile(imgs[0],0)}</div>`;
  if (n === 2) return `<div class="tm-gc-photos tm-gc-photos--2">${tile(imgs[0],0)}${tile(imgs[1],1)}</div>`;
  if (n === 3) return `<div class="tm-gc-photos tm-gc-photos--3">${tile(imgs[0],0)}${tile(imgs[1],1)}${tile(imgs[2],2)}</div>`;
  if (n === 4) return `<div class="tm-gc-photos tm-gc-photos--4">${tile(imgs[0],0)}${tile(imgs[1],1)}${tile(imgs[2],2)}${tile(imgs[3],3)}</div>`;

  const extra = n - 5;
  const stripTiles = imgs.slice(1, 5).map((name, i) => {
    const isOverflow = extra > 0 && i === 3;
    return tile(name, i + 1, isOverflow ? extra + 1 : undefined);
  }).join('');

  return `<div class="tm-gc-photos tm-gc-photos--5plus">
    <div class="tm-gc-ph tm-gc-ph--hero" data-idx="0"><img data-src="${th(imgs[0])}" alt="" loading="lazy"></div>
    <div class="tm-gc-ph-strip">${stripTiles}</div>
  </div>`;
}

/* ── Gallery IntersectionObserver — swaps data-src → src as cards enter viewport ── */
let _tmGalleryObserver = null;
function tmObserveGalleryImages() {
  /* Disconnect any previous observer before creating a new one */
  if (_tmGalleryObserver) _tmGalleryObserver.disconnect();

  if (!('IntersectionObserver' in window)) {
    /* Fallback for old browsers — load all immediately */
    document.querySelectorAll('.tm-gc-ph img[data-src]').forEach(img => {
      img.src = img.dataset.src;
      delete img.dataset.src;
    });
    return;
  }

  _tmGalleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        delete img.dataset.src;
      }
      _tmGalleryObserver.unobserve(img);
    });
  }, { rootMargin: '200px 0px' }); /* start loading 200px before entering viewport */

  document.querySelectorAll('.tm-gc-ph img[data-src]').forEach(img => {
    _tmGalleryObserver.observe(img);
  });
}


})(); /* end IIFE */
