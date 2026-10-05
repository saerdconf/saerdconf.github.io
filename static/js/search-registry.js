/**
 * search-registry.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for site-wide search coverage.
 *
 * TO ADD A NEW PAGE:
 *   Add one line to window.__searchRegistry.pages:
 *   { url: 'newpage.html', label: 'New Page' }
 *   Then run: python3 generate-static-content.py
 *
 * TO ADD A NEW JS DATA FILE:
 *   Add one line to window.__searchRegistry.dataFiles:
 *   { src: 'static/js/mydata.js', id: 'ss-ds-mydata', indexer: 'auto' }
 *   indexer values:
 *     'auto'       — heuristic scan: indexes any array of objects with name/title + any other fields
 *     'travel'     — for place/country/city arrays (name, country, desc, type, lat/lng)
 *     'research'   — for publication arrays (title, authors, keywords, sdgs, outlet, year)
 *     'activities' — for activity arrays (title, date, location, role, description, keywords)
 *     'updates'    — for news/update arrays ({year, html})
 * ─────────────────────────────────────────────────────────────────────────────
 */
window.__searchRegistry = {

  /* ── Static HTML pages ─────────────────────────────────────────────────── */
  pages: [
    { url: 'index.html',          label: 'Home'          },
    { url: 'research.html',       label: 'Research'      },
    { url: 'activity.html',       label: 'Activities'    },
    { url: 'press.html',          label: 'Press'         },
    { url: 'teaching.html',       label: 'Teaching'      },
    { url: 'miscellaneous.html',  label: 'Miscellaneous' },
    { url: 'personal.html',       label: 'Personal'      },
    { url: 'updates.html',        label: 'Updates'       },
    { url: 'travelmap.html',      label: 'Travel Map'    },
    { url: 'work.html',           label: 'Work'          },
    { url: 'friends.html',        label: 'Friends'       },
    { url: 'foot.html',           label: 'Foot'          },
    { url: 'trees.html',          label: 'Trees'         },
    { url: 'food.html',           label: 'Food'          },
    { url: 'bio.html',            label: 'Bio'           },
    { url: 'cv.html',             label: 'CV'            },
    { url: 'contact.html',        label: 'Contact'       },
    { url: 'events.html',         label: 'Events'        },
    { url: 'pastevents.html',     label: 'Past Events'   },
    { url: 'explore.html',        label: 'Explore'       },
    // ── Add new pages here ──────────────────────────────────────────────────
    // { url: 'newpage.html', label: 'New Page' },
  ],

  /* ── JS data files ─────────────────────────────────────────────────────── */
  dataFiles: [
    { src: 'static/js/research_data.js',  id: 'ss-ds-research',  indexer: 'research'    },
    { src: 'static/js/activity-data.js',  id: 'ss-ds-activity',  indexer: 'activities'  },
    { src: 'static/js/updates-data.js',   id: 'ss-ds-updates',   indexer: 'updates'     },
    { src: 'static/js/travel_map.js',     id: 'ss-ds-travel',    indexer: 'travel'      },
    { src: 'static/js/static-content.js', id: 'ss-ds-static',    indexer: 'static'      },
    // ── Add new data files here ─────────────────────────────────────────────
    // { src: 'static/js/mydata.js', id: 'ss-ds-mydata', indexer: 'auto' },
  ],

};
