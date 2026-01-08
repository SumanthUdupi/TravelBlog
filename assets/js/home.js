import { userPrefs } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    initHeroParallax();
    initTitleAnimation();
    loadFeaturedPosts();
});

// Point 33: Hero Parallax
function initHeroParallax() {
    const hero = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');

    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        // Move elements at different speeds
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        if (heroTitle) heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (heroText) heroText.style.transform = `translateY(${scrolled * 0.2}px)`;
    });
}

// Point 34: Animated Title
function initTitleAnimation() {
    const title = document.querySelector('.hero h1');
    if (!title) return;

    // Wrap letters in spans for stagger if needed, or use SVG stroke logic if we replace text with SVG.
    // Prompt says: "Animate... as if it is being written by an invisible quill (SVG stroke animation)."
    // Ideally we replace the H1 text with an SVG text element.

    const text = title.innerText;
    title.innerHTML = '';
    title.style.display = 'flex';
    title.style.justifyContent = 'center';

    // Create SVG Text
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "120"); // Adjust based on font size
    svg.style.overflow = "visible";

    const textPath = document.createElementNS(svgNS, "text");
    textPath.setAttribute("x", "50%");
    textPath.setAttribute("y", "50%");
    textPath.setAttribute("dominant-baseline", "middle");
    textPath.setAttribute("text-anchor", "middle");
    textPath.setAttribute("class", "animated-title-text");
    textPath.textContent = text;

    svg.appendChild(textPath);
    title.appendChild(svg);

    // Animation is handled in CSS via .animated-title-text class
    // We need to set stroke-dasharray dynamically if possible, but simpler is CSS keyframes with a large estimate.
}

// Point 35: Masonry Grid & Point 36, 37
async function loadFeaturedPosts() {
    const container = document.getElementById('featured-posts');
    if (!container) return;

    try {
        const response = await fetch('data/posts.json');
        const posts = await response.json();

        // Sort by date or stick to JSON order
        // Let's take the first one as Featured

        if (posts.length === 0) {
            container.innerHTML = '<p>No scrolls found in the archives.</p>';
            return;
        }

        container.innerHTML = ''; // Clear loader

        // Featured Post (First one) - Point 37
        const featured = posts[0];
        const featuredCard = createPostCard(featured, true);
        container.appendChild(featuredCard);

        // Grid Container for the rest
        const grid = document.createElement('div');
        grid.className = 'masonry-grid';

        posts.slice(1).forEach(post => {
            grid.appendChild(createPostCard(post, false));
        });

        container.appendChild(grid);

    } catch (err) {
        console.error('Failed to load posts:', err);
        container.innerHTML = '<p>The archives are temporarily sealed.</p>';
    }
}

function createPostCard(post, isFeatured) {
    const card = document.createElement('article');
    card.className = isFeatured ? 'post-card featured-scroll' : 'post-card';

    // Date Badge - Point 36
    const dateBadge = document.createElement('div');
    dateBadge.className = 'date-badge';
    // Format date: "12 Oct"
    const d = new Date(post.date);
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'short' });
    const year = d.getFullYear();

    dateBadge.innerHTML = `<span class="day">${day}</span><span class="month">${month}</span><span class="year">${year}</span>`;

    // Content
    const content = document.createElement('div');
    content.className = 'card-content';

    const title = document.createElement('h3');
    title.innerHTML = `<a href="${post.slug}.html">${post.title}</a>`;

    const excerpt = document.createElement('p');
    excerpt.textContent = post.excerpt;

    // Image (Placeholder or extracted from frontmatter/content if available)
    // For now we don't have image URLs in posts.json, we might simulate or skip.
    // If we want images, we need to update build_site.py to extract first image.
    // Let's add a placeholder image div.
    const imgDiv = document.createElement('div');
    imgDiv.className = 'card-image';
    // Random ancient place image or placeholder pattern
    imgDiv.style.backgroundColor = '#d2b48c'; // Fallback

    card.appendChild(dateBadge); // Stamp on top
    card.appendChild(imgDiv);
    content.appendChild(title);
    content.appendChild(excerpt);

    // Read More Button (Stone Tablet)
    const btn = document.createElement('a');
    btn.href = `${post.slug}.html`;
    btn.className = 'btn-stone';
    btn.textContent = 'Unroll Scroll';
    btn.style.display = 'inline-block';
    btn.style.marginTop = '1rem';
    btn.style.textDecoration = 'none';

    content.appendChild(btn);
    card.appendChild(content);

    return card;
}
