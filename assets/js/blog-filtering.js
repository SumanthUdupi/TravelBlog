document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearBtn = document.getElementById('clear-filters');
    const postsGrid = document.getElementById('posts-grid');
    const posts = document.querySelectorAll('.card.mix');
    const noResults = document.getElementById('no-results');

    let activeFilter = 'all';

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from siblings
            btn.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // If clicking an already active filter (and it's not 'all'), toggle it off?
            // For now, let's just set it as the active filter.
            // But wait, we have two groups (Categories and Tags).
            // The brief says "When tag clicked: filter... When category clicked: filter..."
            // It implies singular filtering or intersection. Let's do simple single-selection filtering for now for simplicity,
            // or we need to handle combined filters. Given "Clear Filter" button exists, let's assume one active filter at a time for simplicity
            // unless the user wants complex AND/OR logic. The brief implies "filter only posts with that tag".

            // Reset other groups' active buttons
            const otherGroup = btn.parentElement.nextElementSibling?.classList.contains('filter-group')
                ? btn.parentElement.nextElementSibling
                : btn.parentElement.previousElementSibling;

            if(otherGroup && otherGroup.classList.contains('filter-group')) {
                otherGroup.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            }

            filterPosts(filterValue);
        });
    });

    clearBtn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        // Set 'All' as active
        document.querySelector('[data-filter="all"]').classList.add('active');
        filterPosts('all');
    });

    function filterPosts(filter) {
        let visibleCount = 0;

        posts.forEach(post => {
            if (filter === 'all') {
                post.style.display = 'flex'; // Restore flex display
                // Re-trigger animation?
                post.classList.add('reveal');
                setTimeout(() => post.classList.add('visible'), 50);
                visibleCount++;
            } else {
                // Check if post has the class
                // Filter format is .class-name
                const className = filter.substring(1); // remove dot
                if (post.classList.contains(className)) {
                    post.style.display = 'flex';
                    post.classList.add('reveal');
                    setTimeout(() => post.classList.add('visible'), 50);
                    visibleCount++;
                } else {
                    post.style.display = 'none';
                    post.classList.remove('visible');
                }
            }
        });

        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }

    // Initial Reveal
    setTimeout(() => {
        posts.forEach(post => post.classList.add('visible'));
    }, 100);
});
