lightbox.option({
  resizeDuration: 200,
  wrapAround: true,
  disableScrolling: true,
});

document.addEventListener('DOMContentLoaded', function() {
  // Create search index
  const idx = lunr(function() {
    this.ref('id');
    this.field('title');
    this.field('content');
    
    // Index your content
    const sections = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li');
    sections.forEach((section, id) => {
      this.add({
        id: id,
        title: section.tagName.startsWith('H') ? section.innerText : '',
        content: section.innerText
      });
    });
  });
  
  // Search function
  window.performSearch = function() {
    const term = document.getElementById('search-input').value;
    const results = idx.search(term);
    
    if (results.length > 0) {
      // Highlight and scroll to first result
      const firstResultId = results[0].ref;
      const element = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li')[firstResultId];
      element.scrollIntoView({ behavior: 'smooth' });
      element.style.backgroundColor = 'yellow';
      setTimeout(() => element.style.backgroundColor = '', 2000);
    } else {
      alert('No results found');
    }
  };
});






