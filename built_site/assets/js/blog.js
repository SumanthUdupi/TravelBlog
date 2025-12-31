// Blog Module - Main functionality for blog content integration
import BlogContent from './blog-content.js';

const Blog = (() => {
    // DOM Elements
    let blogContainer;
    let blogSearch;
    let blogSearchBtn;
    let filterButtons;
    let thematicArcsContainer;
    let categoriesContainer;
    let tagsContainer;
    let blogModal;
    let blogModalClose;
    let blogModalContent;
    let currentView = 'all';
    let currentPostIndex = 0;
    let filteredPosts = [];

    // Initialize the blog module
    const init = async () => {
        // Wait for BlogContent to initialize
        await BlogContent.init();

        // Cache DOM elements
        cacheDOM();

        // Set up event listeners
        setupEventListeners();

        // Load initial content
        loadInitialContent();

        // Update navigation menu
        updateNavigation();

        // Signal readiness for tests
        window.__BLOG_READY__ = true;
        window.dispatchEvent(new Event('blog:ready'));
        console.log('Blog initialized and ready');
    };

    // Cache DOM elements
    const cacheDOM = () => {
        blogContainer = document.getElementById('blog-container');
        blogSearch = document.getElementById('blog-search');
        blogSearchBtn = document.querySelector('.btn-search');
        filterButtons = document.querySelectorAll('.btn-filter');
        thematicArcsContainer = document.getElementById('thematic-arcs');
        categoriesContainer = document.getElementById('categories-list');
        tagsContainer = document.getElementById('tags-cloud');
        blogModal = document.querySelector('.blog-modal');
        blogModalContent = document.querySelector('.blog-modal-content');
    };

    // Set up event listeners
    const setupEventListeners = () => {
        // Filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                currentView = button.getAttribute('data-filter');
                updateView();
                updateActiveFilter(button);
            });
        });

        // Search functionality
        blogSearch.addEventListener('input', handleSearch);
        blogSearchBtn.addEventListener('click', handleSearch);

        // Close modal when clicking outside content or close button
        blogModal.addEventListener('click', (e) => {
            if (e.target === blogModal || e.target.classList.contains('blog-modal-close')) {
                closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (blogModal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeModal();
                } else if (e.key === 'ArrowRight') {
                    navigatePost(1);
                } else if (e.key === 'ArrowLeft') {
                    navigatePost(-1);
                }
            }
        });
    };

    // Update active filter button
    const updateActiveFilter = (activeButton) => {
        filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    };

    // Load initial content
    const loadInitialContent = () => {
        // Show loading indicator
        showLoading();

        // Load blog posts
        renderBlogPosts();

        // Load sidebar content
        renderSidebar();

        // Hide loading indicator
        hideLoading();
    };

    // Show loading indicator
    const showLoading = () => {
        const loadingIndicator = document.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'flex';
        }
    };

    // Hide loading indicator
    const hideLoading = () => {
        const loadingIndicator = document.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    };

    // Render blog posts based on current view
    const renderBlogPosts = () => {
        const posts = getCurrentPosts();

        if (currentView === 'timeline') {
            renderTimelineView(posts);
        } else if (currentView === 'themes') {
            renderThematicView(posts);
        } else {
            renderGridView(posts);
        }
    };

    // Get posts based on current view and search
    const getCurrentPosts = () => {
        let posts = BlogContent.getAllPosts();

        // Apply search filter if there's a query
        const searchQuery = blogSearch.value.trim();
        if (searchQuery) {
            posts = BlogContent.searchPosts(searchQuery);
        }

        return posts;
    };

    // Render grid view
    const renderGridView = (posts) => {
        if (posts.length === 0) {
            blogContainer.innerHTML = '<p class="no-results">No posts found. Try a different search or filter.</p>';
            return;
        }

        blogContainer.innerHTML = '';

        posts.forEach(post => {
            const card = createBlogCard(post);
            blogContainer.appendChild(card);
        });

        // Add click handlers to cards
        addCardClickHandlers();
    };

    // Create blog card element
    const createBlogCard = (post) => {
        const card = document.createElement('div');
        card.className = 'blog-card reveal';
        card.setAttribute('data-post-id', post.id);

        card.innerHTML = `
            <div class="blog-card-image" style="background-image: url('${post.featuredImage}')"></div>
            <div class="blog-card-content">
                <h3 class="blog-card-title">${post.title}</h3>
                <div class="blog-card-meta">
                    <span>${post.date}</span>
                    <span>${post.readingTime}</span>
                </div>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <div class="blog-card-tags">
                    ${post.tags.map(tag => `<span class="blog-card-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        return card;
    };

    // Add click handlers to blog cards
    const addCardClickHandlers = () => {
        const cards = document.querySelectorAll('.blog-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const postId = card.getAttribute('data-post-id');
                const post = BlogContent.getAllPosts().find(p => p.id === postId);
                if (post) {
                    showPostDetail(post);
                }
            });
        });
    };

    // Render timeline view
    const renderTimelineView = (posts) => {
        if (posts.length === 0) {
            blogContainer.innerHTML = '<p class="no-results">No posts found. Try a different search or filter.</p>';
            return;
        }

        // Group posts by day for timeline
        const timelineData = BlogContent.getTimelineData();

        blogContainer.innerHTML = '';

        const timelineContainer = document.createElement('div');
        timelineContainer.className = 'timeline-view active';

        timelineData.forEach(dayData => {
            const dayPosts = dayData.posts.filter(post =>
                posts.some(p => p.id === post.id)
            );

            if (dayPosts.length > 0) {
                const dayElement = createTimelineDay(dayData, dayPosts);
                timelineContainer.appendChild(dayElement);
            }
        });

        blogContainer.appendChild(timelineContainer);

        // Add click handlers
        addTimelineClickHandlers();
    };

    // Create timeline day element
    const createTimelineDay = (dayData, posts) => {
        const dayElement = document.createElement('div');
        dayElement.className = 'timeline-day';

        dayElement.innerHTML = `
            <div class="timeline-day-header">
                <div class="timeline-marker">${dayData.day}</div>
                <h3 class="timeline-day-title">Day ${dayData.day}: ${dayData.date}</h3>
            </div>
            <div class="timeline-posts">
                ${posts.map(post => createTimelinePost(post)).join('')}
            </div>
        `;

        return dayElement;
    };

    // Create timeline post element
    const createTimelinePost = (post) => {
        return `
            <div class="timeline-post" data-post-id="${post.id}">
                <h4 class="timeline-post-title">${post.title}</h4>
                <div class="timeline-post-meta">
                    <span>${post.date}</span>
                    <span>${post.readingTime}</span>
                </div>
                <p class="timeline-post-excerpt">${post.excerpt}</p>
                <div class="timeline-post-tags">
                    ${post.tags.map(tag => `<span class="blog-card-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
    };

    // Add click handlers to timeline posts
    const addTimelineClickHandlers = () => {
        const posts = document.querySelectorAll('.timeline-post');
        posts.forEach(post => {
            post.addEventListener('click', () => {
                const postId = post.getAttribute('data-post-id');
                const postData = BlogContent.getAllPosts().find(p => p.id === postId);
                if (postData) {
                    showPostDetail(postData);
                }
            });
        });
    };

    // Render thematic view
    const renderThematicView = (posts) => {
        if (posts.length === 0) {
            blogContainer.innerHTML = '<p class="no-results">No posts found. Try a different search or filter.</p>';
            return;
        }

        const thematicArcs = BlogContent.getThematicArcs();

        blogContainer.innerHTML = '';

        const thematicContainer = document.createElement('div');
        thematicContainer.className = 'thematic-view active';

        thematicArcs.forEach(arc => {
            const arcPosts = posts.filter(post => post.thematicArc === arc);

            if (arcPosts.length > 0) {
                const arcElement = createThematicArc(arc, arcPosts);
                thematicContainer.appendChild(arcElement);
            }
        });

        blogContainer.appendChild(thematicContainer);

        // Add click handlers
        addThematicClickHandlers();
    };

    // Create thematic arc element
    const createThematicArc = (arc, posts) => {
        const arcElement = document.createElement('div');
        arcElement.className = 'thematic-arc';

        const arcDescriptions = {
            'Spiritual Journey and Transformation': 'Personal reflections on spiritual experiences and insights into spiritual growth.',
            'Historical and Mythological Exploration': 'Historical context and mythological stories of the sacred sites.',
            'Architectural and Engineering Marvels': 'Detailed analysis of temple architecture and engineering achievements.',
            'Cultural and Social Insights': 'Cultural traditions and social practices of the regions visited.'
        };

        arcElement.innerHTML = `
            <h3 class="thematic-arc-title">${arc}</h3>
            <p class="thematic-arc-description">${arcDescriptions[arc] || 'Exploring the sacred journey through different themes.'}</p>
            <div class="thematic-posts">
                ${posts.map(post => createThematicPost(post)).join('')}
            </div>
        `;

        return arcElement;
    };

    // Create thematic post element
    const createThematicPost = (post) => {
        return `
            <div class="blog-card" data-post-id="${post.id}">
                <div class="blog-card-image" style="background-image: url('${post.featuredImage}')"></div>
                <div class="blog-card-content">
                    <h3 class="blog-card-title">${post.title}</h3>
                    <div class="blog-card-meta">
                        <span>${post.date}</span>
                        <span>${post.readingTime}</span>
                    </div>
                    <p class="blog-card-excerpt">${post.excerpt}</p>
                    <div class="blog-card-tags">
                        ${post.tags.map(tag => `<span class="blog-card-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    };

    // Add click handlers to thematic posts
    const addThematicClickHandlers = () => {
        const cards = document.querySelectorAll('.thematic-posts .blog-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const postId = card.getAttribute('data-post-id');
                const post = BlogContent.getAllPosts().find(p => p.id === postId);
                if (post) {
                    showPostDetail(post);
                }
            });
        });
    };

    // Show post detail in modal
    const showPostDetail = (post) => {
        // Set current post and find its index
        currentPostIndex = BlogContent.getAllPosts().findIndex(p => p.id === post.id);

        // Update modal content
        blogModalContent.innerHTML = `
            <button class="blog-modal-close">×</button>
            <div class="blog-modal-header">
                <h2 class="blog-modal-title">${post.title}</h2>
                <div class="blog-modal-meta">
                    <span>${post.date} • ${post.author}</span>
                    <span>${post.readingTime} • ${post.location}</span>
                </div>
            </div>
            <div class="blog-modal-featured-image" style="background-image: url('${post.featuredImage}')"></div>
            <div class="blog-modal-content-text">
                ${post.content}
            </div>
            <div class="blog-modal-tags">
                ${post.tags.map(tag => `<span class="blog-card-tag">${tag}</span>`).join('')}
            </div>
            <div class="blog-modal-navigation">
                <button class="btn-nav prev-post" ${currentPostIndex === 0 ? 'disabled' : ''}>← Previous</button>
                <button class="btn-nav next-post" ${currentPostIndex === BlogContent.getAllPosts().length - 1 ? 'disabled' : ''}>Next →</button>
            </div>
        `;

        // Show modal
        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Add event listeners to navigation buttons
        const prevBtn = document.querySelector('.prev-post');
        const nextBtn = document.querySelector('.next-post');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => navigatePost(-1));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => navigatePost(1));
        }
    };

    // Navigate between posts
    const navigatePost = (direction) => {
        const allPosts = BlogContent.getAllPosts();
        const newIndex = currentPostIndex + direction;

        if (newIndex >= 0 && newIndex < allPosts.length) {
            currentPostIndex = newIndex;
            showPostDetail(allPosts[currentPostIndex]);
        }
    };

    // Close modal
    const closeModal = () => {
        blogModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Handle search
    const handleSearch = () => {
        updateView();
    };

    // Update view based on current settings
    const updateView = () => {
        showLoading();
        renderBlogPosts();
        hideLoading();
    };

    // Render sidebar content
    const renderSidebar = () => {
        renderThematicArcs();
        renderCategories();
        renderTags();
    };

    // Render thematic arcs in sidebar
    const renderThematicArcs = () => {
        const arcs = BlogContent.getThematicArcs();

        thematicArcsContainer.innerHTML = arcs.map(arc =>
            `<div class="thematic-arc-item" data-arc="${arc}">${arc}</div>`
        ).join('');

        // Add click handlers
        const arcItems = document.querySelectorAll('.thematic-arc-item');
        arcItems.forEach(item => {
            item.addEventListener('click', () => {
                const arc = item.getAttribute('data-arc');
                filterByThematicArc(arc);
            });
        });
    };

    // Filter by thematic arc
    const filterByThematicArc = (arc) => {
        // This would be implemented to filter posts by thematic arc
        console.log('Filter by thematic arc:', arc);
        // In a full implementation, this would update the view to show only posts from this arc
    };

    // Render categories in sidebar
    const renderCategories = () => {
        const categories = BlogContent.getCategories();

        categoriesContainer.innerHTML = categories.map(category =>
            `<div class="category-item" data-category="${category}">${category}</div>`
        ).join('');

        // Add click handlers
        const categoryItems = document.querySelectorAll('.category-item');
        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                const category = item.getAttribute('data-category');
                filterByCategory(category);
            });
        });
    };

    // Filter by category
    const filterByCategory = (category) => {
        console.log('Filter by category:', category);
        // In a full implementation, this would update the view to show only posts from this category
    };

    // Render tags in sidebar
    const renderTags = () => {
        const tags = BlogContent.getTags();

        tagsContainer.innerHTML = tags.map(tag =>
            `<span class="tag-item" data-tag="${tag}">${tag}</span>`
        ).join('');

        // Add click handlers
        const tagItems = document.querySelectorAll('.tag-item');
        tagItems.forEach(item => {
            item.addEventListener('click', () => {
                const tag = item.getAttribute('data-tag');
                filterByTag(tag);
            });
        });
    };

    // Filter by tag
    const filterByTag = (tag) => {
        console.log('Filter by tag:', tag);
        // In a full implementation, this would update the view to show only posts with this tag
    };

    // Update navigation menu
    const updateNavigation = () => {
        const navList = document.querySelector('.nav-list');
        if (navList) {
            const blogNavItem = document.createElement('li');
            blogNavItem.innerHTML = '<a href="#blog" class="nav-link">Blog</a>';
            navList.appendChild(blogNavItem);
        }
    };

    return {
        init
    };
})();

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Blog.init();
});