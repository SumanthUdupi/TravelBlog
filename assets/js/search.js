// Search Logic
export function initSearch() {
    const searchInput = document.getElementById('site-search');
    const resultsContainer = document.getElementById('search-results');

    if (!searchInput) return;

    let posts = [];

    // Load Data
    fetch('data/posts.json')
        .then(res => res.json())
        .then(data => {
            posts = data;
        })
        .catch(err => console.error('Search index load failed', err));

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'none';
            return;
        }

        const results = posts.filter(post => {
            return post.title.toLowerCase().includes(query) ||
                   post.tags.some(tag => tag.includes(query)) ||
                   (post.excerpt && post.excerpt.toLowerCase().includes(query));
        });

        renderResults(results, resultsContainer);
    });

    // Hide on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.style.display = 'none';
        }
    });

    // Show on focus if has value
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length >= 2) {
            resultsContainer.style.display = 'block';
        }
    });
}

function renderResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<div class="search-empty">No scrolls found matching your query.</div>';
        container.style.display = 'block';
        return;
    }

    const html = results.slice(0, 5).map(post => `
        <a href="${post.slug}.html" class="search-result-item">
            <div class="result-title">${post.title}</div>
            <div class="result-meta">${post.date}</div>
        </a>
    `).join('');

    container.innerHTML = html;
    container.style.display = 'block';
}
