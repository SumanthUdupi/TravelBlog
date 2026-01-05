document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.mix');
    const clearBtn = document.getElementById('clear-filters');
    const noResults = document.getElementById('no-results');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from siblings in same group
            const group = btn.parentElement;
            group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            filterPosts();
        });
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-filter="all"]').classList.add('active'); // Reset to All if exists
            filterPosts();
        });
    }

    function filterPosts() {
        // Get active filters
        const activeCategoryBtn = document.querySelector('.filter-group:first-child .filter-btn.active');
        const activeTagBtn = document.querySelector('.filter-group:last-child .filter-btn.active'); // Assumption on structure

        const categoryFilter = activeCategoryBtn ? activeCategoryBtn.getAttribute('data-filter') : 'all';
        const tagFilter = activeTagBtn ? activeTagBtn.getAttribute('data-filter') : null; // Tags usually additive or exclusive? Brief says "When tag clicked: filter... When category clicked: filter..."

        // Let's implement AND logic if both selected, or just simple selector matching
        // Brief implies simple click -> filter. Let's support both being active if the UI allows, but usually mixitup style is one per group.

        let visibleCount = 0;

        cards.forEach(card => {
            let matchesCategory = (categoryFilter === 'all') || card.matches(categoryFilter);
            let matchesTag = (!tagFilter) || card.matches(tagFilter);

            // If a specific tag is clicked, we might want to prioritize that.
            // The UI allows selecting one category and one tag?
            // Let's assume logic: Show if matches (Category AND Tag).

            if (matchesCategory && matchesTag) {
                card.style.display = 'flex';
                // Trigger animation
                card.classList.remove('reveal');
                void card.offsetWidth; // trigger reflow
                card.classList.add('reveal', 'visible');
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            if (noResults) noResults.style.display = 'block';
        } else {
            if (noResults) noResults.style.display = 'none';
        }
    }

    // Initial animation
    setTimeout(() => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }, 100);
});
