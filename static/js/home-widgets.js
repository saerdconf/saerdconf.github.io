/**
 * home-widgets.js
 * Renders "What's New" and "Upcoming Events" on index.html
 * Depends on: updates-data.js (updatesData) and activity-data.js (activities)
 */

// ── What's New: top 5 from updatesData ─────────────────────────────
(function () {
  function renderWhatsNew() {
    var list = document.getElementById('whats-new-list');
    if (!list || typeof updatesData === 'undefined') return;

    list.innerHTML = updatesData.slice(0, 5).map(function (entry) {
      var text = typeof entry === 'object' ? entry.html : entry;
      return '<li>' + text + '</li>';
    }).join('');

    // Add su-link--external to external links inside the list
    list.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.startsWith('http://') || href.startsWith('https://')) {
        a.classList.add('su-link--external');
        if (!a.getAttribute('target')) a.setAttribute('target', '_blank');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderWhatsNew);
  } else { renderWhatsNew(); }
})();


// ── Upcoming Events: future activities from activity-data.js ────────
(function () {
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function parseFirstDate(s) {
    if (!s) return null;
    var m = s.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
    if (m) {
      var mo = MONTHS.findIndex(function (x) { return x.toLowerCase() === m[2].toLowerCase().slice(0, 3); });
      if (mo !== -1) return new Date(+m[3], mo, +m[1]);
    }
    m = s.match(/([A-Za-z]+)\s+(\d{4})/);
    if (m) {
      var mo2 = MONTHS.findIndex(function (x) { return x.toLowerCase() === m[1].toLowerCase().slice(0, 3); });
      if (mo2 !== -1) return new Date(+m[2], mo2, 1);
    }
    m = s.match(/(\d{4})/);
    if (m) return new Date(+m[1], 0, 1);
    return null;
  }

  function renderEvents() {
    var list = document.getElementById('upcoming-events-list');
    if (!list || typeof activities === 'undefined') return;

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var future = activities
      .filter(function (a) { var d = parseFirstDate(a.date); return d && d >= today; })
      .sort(function (a, b) { return parseFirstDate(a.date) - parseFirstDate(b.date); });

    if (!future.length) {
      list.innerHTML = '<li style="padding:8px 0;color:#888;">No upcoming events.</li>';
      return;
    }

    list.innerHTML = future.slice(0, 5).map(function (a) {
      var d   = parseFirstDate(a.date);
      var mon = MONTHS[d.getMonth()];
      var day = d.getDate();
      var ttl = a.titleUrl
        ? '<a class="su-link" href="' + a.titleUrl + '" target="_blank">' + a.title + '</a>'
        : a.title;
      var role = a.role
        ? '<span class="event-list-item__type"><a href="activity.html">' + a.role + '</a></span>'
        : '';
      var loc = a.location
        ? '<div class="views-field-su-event-address"><span class="map-icon" aria-hidden="true"></span>' +
          '<p class="address"><span>' + a.location + '</span></p></div>'
        : '';
      var dt = a.date.replace(/\(scheduled\)/i, '').trim();

      return '<li><div class="su-event-list-item">' +
        '<div class="su-event-list-item__date">' +
          '<div class="su-date-stacked su-date-stacked--no-background" aria-hidden="true">' +
            '<span class="su-event-start-month">' + mon + '</span>' +
            '<span class="su-event-start-date">'  + day + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="su-event-list-item__details">' +
          role +
          '<h2 class="field-content">' + ttl + '</h2>' +
          '<div class="views-field-su-event-date-time">' +
            '<span class="date-icon" aria-hidden="true"></span>' +
            '<div><time>' + dt + '</time></div>' +
          '</div>' +
          loc +
        '</div>' +
      '</div></li>';
    }).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderEvents);
  } else { renderEvents(); }
})();


// ── Auto su-link--external on all external text links ───────────────
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (!href.startsWith('http://') && !href.startsWith('https://')) return;
    if (href.includes('kosalnith.github.io')) return;
    if (a.classList.contains('xsu-link')) return;
    if (a.closest('nav,header,.su-masthead,.su-multi-menu,.su-main-nav,.su-global-footer,.su-local-footer,#site-header,#site-footer')) return;
    if (a.querySelector('span[aria-hidden],i,svg')) return;
    a.classList.add('su-link--external');
  });
});
