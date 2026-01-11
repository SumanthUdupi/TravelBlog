/* eslint-disable */
export function initBlogFiltering() {
    const grid = document.getElementById('post-grid');
    const filterContainer = document.getElementById('blog-filters');

    if (!grid) return;

    // Get URL params
    const urlParams = new URLSearchParams(window.location.search);
    const activeTag = urlParams.get('tag') || 'all';

    fetch('data/posts.json')
        .then(res => res.json())
        .then(posts => {
            renderFilters(posts, activeTag);
            renderPosts(posts, activeTag);
        })
        .catch(err => {
            console.error(err);
            grid.innerHTML = '<p>The ink has faded. (Failed to load posts)</p>';
        });
}

function renderFilters(posts, activeTag) {
    const container = document.getElementById('blog-filters');
    if (!container) return;

    // Extract unique tags
    const tags = new Set();
    posts.forEach(post => {
        if (post.tags) post.tags.forEach(tag => tags.add(tag));
    });

    const sortedTags = Array.from(tags).sort();

    // Clear existing (keep 'All')
    container.innerHTML = '<button class="filter-chip ' + (activeTag === 'all' ? 'active' : '') + '" data-tag="all">All</button>';

    sortedTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = `filter-chip ${activeTag === tag ? 'active' : ''}`;
        btn.textContent = tag.replace(/_/g, ' '); // simple format
        btn.dataset.tag = tag;
        btn.onclick = () => {
            // Update UI
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');

            // Update URL without reload
            const newUrl = new URL(window.location);
            if (tag === 'all') newUrl.searchParams.delete('tag');
            else newUrl.searchParams.set('tag', tag);
            window.history.pushState({}, '', newUrl);

            // Re-render
            renderPosts(posts, tag);
        };
        container.appendChild(btn);
    });

    // Add click handler for "All"
    const allBtn = container.querySelector('[data-tag="all"]');
    allBtn.onclick = () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        allBtn.classList.add('active');
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete('tag');
        window.history.pushState({}, '', newUrl);
        renderPosts(posts, 'all');
    };
}

function renderPosts(posts, tag) {
    const grid = document.getElementById('post-grid');
    grid.innerHTML = '';

    const filtered = tag === 'all'
        ? posts
        : posts.filter(p => p.tags && p.tags.includes(tag));

    if (filtered.length === 0) {
        grid.innerHTML = '<p>No entries found for this path.</p>';
        return;
    }

    filtered.forEach(post => {
        const card = document.createElement('article');
        card.className = 'post-card fade-in';

        // Tags HTML
        const tagsHtml = post.tags
            ? post.tags.map(t => `<span class="tag-pill">${t.replace(/_/g, ' ')}</span>`).join('')
            : '';

        card.innerHTML = `
            <h3 class="post-title"><a href="${post.slug}.html">${post.title}</a></h3>
            <div class="post-meta">
                <span>📅 ${post.date}</span>
                <span>⏳ ${post.reading_time} min read</span>
            </div>
            <div class="post-tags">${tagsHtml}</div>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="${post.slug}.html" class="read-more">Read Entry &rarr;</a>
        `;
        grid.appendChild(card);
    });
}

// Auto-init if on page
if (document.getElementById('post-grid')) {
    initBlogFiltering();
}
