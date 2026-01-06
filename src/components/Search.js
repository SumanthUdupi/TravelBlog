import { searchEntries } from '../lib/services/journeyService';
import { getAllSites } from '../lib/services/siteService';

export function setupSearch() {
  const searchContainer = document.querySelector('.search-container') || createSearchBar();
  document.body.insertBefore(searchContainer, document.body.firstChild);

  const searchInput = searchContainer.querySelector('.search-input');
  const searchResults = searchContainer.querySelector('.search-results');
  const clearBtn = searchContainer.querySelector('.search-clear');

  let allSites = [];
  let allEntries = [];

  const loadData = async () => {
    const { data: sites } = await getAllSites();
    const { data: entries } = await searchEntries('');
    allSites = sites || [];
    allEntries = entries || [];
  };

  loadData();

  searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();

    if (query.length < 2) {
      searchResults.classList.remove('active');
      clearBtn.style.display = 'none';
      return;
    }

    clearBtn.style.display = 'block';

    const results = performSearch(query, allSites, allEntries);
    displaySearchResults(results, searchResults);
    searchResults.classList.add('active');
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      clearSearch(searchInput, searchResults, clearBtn);
    }
  });

  clearBtn.addEventListener('click', () => {
    clearSearch(searchInput, searchResults, clearBtn);
  });

  document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
      searchResults.classList.remove('active');
    }
  });
}

function createSearchBar() {
  const container = document.createElement('div');
  container.className = 'search-container';

  container.innerHTML = `
    <div class="search-wrapper">
      <label for="site-search" class="sr-only">Search sacred sites and entries</label>
      <input
        type="search"
        id="site-search"
        class="search-input"
        placeholder="Search temples, journeys, locations..."
        autocomplete="off"
      >
      <button class="search-clear" aria-label="Clear search" style="display: none;">&times;</button>
    </div>
    <div class="search-results"></div>
  `;

  return container;
}

function performSearch(query, sites, entries) {
  const lowerQuery = query.toLowerCase();

  const siteResults = sites
    .filter(site =>
      site.name.toLowerCase().includes(lowerQuery) ||
      site.description?.toLowerCase().includes(lowerQuery) ||
      site.location?.toLowerCase().includes(lowerQuery)
    )
    .slice(0, 5)
    .map(site => ({
      type: 'site',
      id: site.id,
      title: site.name,
      slug: site.slug,
      excerpt: site.description,
      icon: '🏛️'
    }));

  const entryResults = entries
    .filter(entry =>
      entry.title.toLowerCase().includes(lowerQuery) ||
      entry.excerpt?.toLowerCase().includes(lowerQuery)
    )
    .slice(0, 5)
    .map(entry => ({
      type: 'entry',
      id: entry.id,
      title: entry.title,
      slug: entry.slug,
      excerpt: entry.excerpt,
      icon: '📖'
    }));

  return [...siteResults, ...entryResults];
}

function displaySearchResults(results, container) {
  if (results.length === 0) {
    container.innerHTML = '<div class="search-no-results">No results found</div>';
    return;
  }

  const html = results.map(result => `
    <a href="${result.type === 'site' ? `/site/${result.slug}` : `/entry/${result.slug}`}" class="search-result-item">
      <span class="search-result-icon">${result.icon}</span>
      <div class="search-result-content">
        <div class="search-result-title">${result.title}</div>
        ${result.excerpt ? `<div class="search-result-excerpt">${result.excerpt.substring(0, 100)}...</div>` : ''}
      </div>
    </a>
  `).join('');

  container.innerHTML = html;
}

function clearSearch(input, results, clearBtn) {
  input.value = '';
  input.focus();
  results.classList.remove('active');
  clearBtn.style.display = 'none';
  input.dispatchEvent(new Event('input'));
}

export function setupSearchFilters() {
  const filterButtons = document.querySelectorAll('[data-filter]');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      filterContent(filter);
    });
  });
}

function filterContent(filter) {
  const items = document.querySelectorAll('[data-category]');

  items.forEach(item => {
    if (filter === 'all' || item.dataset.category === filter) {
      item.style.display = '';
      setTimeout(() => item.classList.add('visible'), 10);
    } else {
      item.classList.remove('visible');
      setTimeout(() => item.style.display = 'none', 300);
    }
  });
}
