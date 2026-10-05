/**
 * updates-widget.js
 * Renders the full Updates page grouped by year.
 * Depends on: updates-data.js (updatesData)
 */

(function () {
  function renderUpdates() {
    var container = document.getElementById('updates-container');
    if (!container || typeof updatesData === 'undefined') return;

    // Group entries by year
    var byYear = {};
    updatesData.forEach(function (e) {
      if (!byYear[e.year]) byYear[e.year] = [];
      byYear[e.year].push(e.html);
    });

    // Render years in descending order
    var years = Object.keys(byYear).sort(function (a, b) { return b - a; });
    var html = '';
    years.forEach(function (year) {
      html += '<h3>' + year + '</h3><div class="slinks-indent">';
      byYear[year].forEach(function (item) {
        html += '<li>' + item + '</li>';
      });
      html += '</div>';
    });
    container.innerHTML = html;

    // Add su-link--external to external links
    container.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.startsWith('http://') || href.startsWith('https://')) {
        a.classList.add('su-link--external');
        if (!a.getAttribute('target')) a.setAttribute('target', '_blank');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderUpdates);
  } else { renderUpdates(); }
})();
