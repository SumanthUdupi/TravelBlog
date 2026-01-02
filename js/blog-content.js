// Blog Content Parser and Manager
// This module handles parsing, structuring, and managing blog content

import MarkdownParser from './markdown-parser.js';

const BlogContent = (() => {
    // Content data structure
    let blogPosts = [];
    let categories = [];
    let tags = [];
    let timelineData = [];
    
    // Helper function to extract relevant content from full HTML page
    const extractContentFromHTML = (htmlString) => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            // Try to find the main text container
            // In built_site, content is in .main-text
            const mainText = doc.querySelector('.main-text');
            if (mainText) {
                return mainText.innerHTML;
            }
            // Fallback to article
            const article = doc.querySelector('article');
            if (article) {
                return article.innerHTML;
            }
            // Fallback to body content if no specific container found
            // but strip scripts and styles if possible
            const body = doc.querySelector('body');
            if (body) {
                return body.innerHTML;
            }
            return htmlString;
        } catch (e) {
            console.error('Error parsing HTML content:', e);
            return htmlString;
        }
    };

    // Helper function to load HTML file content
    const loadHTMLFile = async (filePath) => {
        try {
            // Check if we're in a browser environment with fetch API
            if (typeof fetch === 'undefined') {
                console.warn('Fetch API not available, falling back to mock content');
                return getFallbackHTMLContent(filePath);
            }
            try {
                // Try to fetch the actual HTML file
                const response = await fetch(filePath);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const content = await response.text();
                
                if (content && content.trim()) {
                    console.log(`Successfully loaded content from ${filePath}`);
                    return extractContentFromHTML(content);
                } else {
                    console.warn(`Empty content from ${filePath}, falling back to mock`);
                    return getFallbackHTMLContent(filePath);
                }
                
            } catch (fetchError) {
                console.error('Fetch error:', fetchError);
                console.warn('Falling back to mock content for:', filePath);
                return getFallbackHTMLContent(filePath);
            }
            
        } catch (error) {
            console.error('Error loading HTML file:', error);
            return `# Error Loading Content\n\nCould not load the content for this post. Please try again later.`;
        }
    };
    
    // Helper function to provide fallback HTML content
    const getFallbackHTMLContent = (filePath) => {
        const fallbackContent = {
            'built_site/Jai_Jagannath.html': `<div class="blog-fallback-content">
                <h3>A Pilgrim's Journey Through Odisha: December 2024</h3>
                <p>Embark on a sacred odyssey through the spiritual heart of Odisha. This journey takes you from the ancient temples of Bhubaneswar to the divine presence of Lord Jagannath in Puri, exploring the deep spiritual heritage and transformative power of India's sacred sites.</p>
                <p><strong>Day 1:</strong> Arrival in Bhubaneswar. The syncretism of Lingaraj, the tribal heartbeat, and the Jain silence of Udayagiri.</p>
                <p><strong>Day 2:</strong> Deep dive into Bhubaneswar's spiritual anchors and cultural heritage.</p>
                <p><strong>Day 3:</strong> The Shakti Trail. Cuttack Chandi, Netaji's Birthplace, Jajpur's Maa Biraja, and the futuristic fortress of Chhatia Bata.</p>
                <p><strong>Day 4:</strong> The Solar Path culminating at Puri Jagannath Dham.</p>
                <p><em>Full content loading... The complete spiritual journey will be available soon.</em></p>
            </div>`,
            'built_site/odisha_sacred_odyssey.html': `<div class="blog-fallback-content">
                <h3>Odisha Sacred Odyssey: Where the Divine Meets the Soul</h3>
                <p>"Jai Jagannath!" In Odisha, this is not merely a greeting; it is a rhythmic punctuation to life itself. Join us on a transformative pilgrimage through the sacred sites of Odisha, where ancient temples, powerful goddesses, and divine encounters await.</p>
                <p><strong>The Sacred Itinerary:</strong></p>
                <ul>
                    <li>Day 1: The Temple City of Bhubaneswar</li>
                    <li>Day 2: Spiritual & Cultural Exploration</li>
                    <li>Day 3: The Shakti Trail & Inner War</li>
                    <li>Day 4: The Solar Chariot & Lord of the Universe</li>
                </ul>
                <p><em>Full content loading... The complete odyssey will be available soon.</em></p>
            </div>`
        };
        return fallbackContent[filePath] || `<p>Content for ${filePath} is loading. Please check back soon for the full spiritual journey experience.</p>`;
    };
    
    // Initialize content from markdown files
    const init = async () => {
        try {
            // Load and parse blog content
            await loadBlogContent();
            
            // Organize content by categories and tags
            organizeContent();
            
            // Create timeline structure
            buildTimeline();
            
            console.log('Blog content initialized successfully');
        } catch (error) {
            console.error('Error initializing blog content:', error);
        }
    };
    
    // Load blog content from markdown files
    const loadBlogContent = async () => {
        try {
            // Load main blog posts
            const mainPosts = await loadMainBlogPosts();
            
            // Load research posts
            const researchPosts = await loadResearchPosts();
            
            // Combine all posts
            blogPosts = [...mainPosts, ...researchPosts];
            
        } catch (error) {
            console.error('Error loading blog content:', error);
            // Fallback to placeholder content if loading fails
            blogPosts = createFallbackContent();
        }
    };
    
    // Load main blog posts
    const loadMainBlogPosts = async () => {
        const posts = [
            {
                id: 'jai-jagannath',
                title: 'A Pilgrim\'s Journey Through Odisha: December 2024',
                slug: 'jai-jagannath',
                excerpt: 'A detailed account of a spiritual pilgrimage through the sacred sites of Odisha, from Bhubaneswar to Puri Jagannath.',
                content: await getBlogContent('jai-jagannath'),
                date: '2024-12-25',
                author: 'Sacred Odyssey',
                categories: ['Spiritual Journey', 'Pilgrimage'],
                tags: ['Jagannath', 'Odisha', 'Temples', 'Spirituality'],
                featuredImage: 'https://images.unsplash.com/photo-1599827473795-94e82390c96c?q=80&w=1920&auto=format&fit=crop',
                readingTime: '25 min',
                location: 'Odisha, India',
                day: 1,
                thematicArc: 'Spiritual Journey and Transformation'
            }
        ];
        
        return posts;
    };
    
    // Load research posts
    const loadResearchPosts = async () => {
        const researchTopics = [
            'Chausath Yogini', 'Chhatia Bata', 'Cuttack Chandi Shakti Peetha',
            'jain_temple_caves', 'Konark Sun Temple', 'lingaraj_temple',
            'Maa Biraja Shakti Peetha', 'Parashurameshwar Temple', 'puri_jagannath_temple',
            'ram mandir', 'Sri Jagannath Temple Complex', 'subhash_chandra_bose_museum',
            'THE MIRROR OF THE SOUL', 'The Rajarani Temple'
        ];
        
        const posts = [];
        
        for (let i = 0; i < researchTopics.length; i++) {
            const topic = researchTopics[i];
            const content = await getResearchContent(topic);
            
            posts.push({
                id: `research-${i + 1}`,
                title: formatResearchTitle(topic),
                slug: `research-${slugify(topic)}`,
                excerpt: `In-depth research and analysis of ${topic} - its historical, cultural, and spiritual significance.`,
                content: content,
                date: '2024-12-20',
                author: 'Sacred Odyssey',
                categories: ['Historical Research', 'Architectural Analysis'],
                tags: ['Research', 'History', 'Architecture', 'Odisha'],
                featuredImage: getFeaturedImageForTopic(topic),
                readingTime: '10 min',
                location: 'Odisha, India',
                day: Math.floor(i / 4) + 1,
                thematicArc: i % 2 === 0 ? 'Architectural and Engineering Marvels' : 'Cultural and Social Insights'
            });
        }
        
        return posts;
    };
    
    // Create fallback content if loading fails
    const createFallbackContent = () => {
        return [
            {
                id: 'jai-jagannath',
                title: 'A Pilgrim\'s Journey Through Odisha: December 2024',
                slug: 'jai-jagannath',
                excerpt: 'A detailed account of a spiritual pilgrimage through the sacred sites of Odisha, from Bhubaneswar to Puri Jagannath.',
                content: '<p>Content loading failed. Please check your connection and try again.</p>',
                date: '2024-12-25',
                author: 'Sacred Odyssey',
                categories: ['Spiritual Journey', 'Pilgrimage'],
                tags: ['Jagannath', 'Odisha', 'Temples', 'Spirituality'],
                featuredImage: 'https://images.unsplash.com/photo-1599827473795-94e82390c96c?q=80&w=1920&auto=format&fit=crop',
                readingTime: '25 min',
                location: 'Odisha, India',
                day: 1,
                thematicArc: 'Spiritual Journey and Transformation'
            }
        ];
    };
    
    // Helper function to get blog content from HTML files
    const getBlogContent = async (postId) => {
        try {
            // Load the HTML file content
            let filePath = '';
            if (postId === 'jai-jagannath') {
                filePath = 'built_site/Jai_Jagannath.html';
            }

            if (filePath) {
                console.log(`Loading blog content from: ${filePath}`);
                const htmlContent = await loadHTMLFile(filePath);

                if (htmlContent && htmlContent.trim()) {
                    console.log(`Successfully loaded content for ${postId}`);
                    return htmlContent;
                } else {
                    console.warn(`Fallback content used for ${postId}`);
                    return getFallbackBlogContent(postId);
                }
            }

            return `<p>Content for ${postId} would be loaded from the HTML file.</p>`;
        } catch (error) {
            console.error('Error loading blog content:', error);
            return `<p>Error loading content for ${postId}. Please try again later.</p>`;
        }
    };

    // Helper function to get fallback blog content
    const getFallbackBlogContent = (postId) => {
        const fallbackContent = {
            'jai-jagannath': `<div class="blog-fallback-content">
                <h3>A Pilgrim's Journey Through Odisha: December 2024</h3>
                <p>Embark on a sacred odyssey through the spiritual heart of Odisha. This journey takes you from the ancient temples of Bhubaneswar to the divine presence of Lord Jagannath in Puri, exploring the deep spiritual heritage and transformative power of India's sacred sites.</p>
                <p><strong>Day 1:</strong> Arrival in Bhubaneswar and the Temple City's ancient energy</p>
                <p><strong>Day 2:</strong> Deep dive into spiritual and cultural experiences</p>
                <p><strong>Day 3:</strong> The Shakti Trail and revolutionary heritage</p>
                <p><strong>Day 4:</strong> The Solar Path culminating at Puri Jagannath Dham</p>
                <p><em>Full content loading... The complete spiritual journey will be available soon.</em></p>
            </div>`,
            'odisha-sacred-odyssey': `<div class="blog-fallback-content">
                <h3>Odisha Sacred Odyssey: Where the Divine Meets the Soul</h3>
                <p>"Jai Jagannath!" In Odisha, this is not merely a greeting; it is a rhythmic punctuation to life itself. Join us on a transformative pilgrimage through the sacred sites of Odisha, where ancient temples, powerful goddesses, and divine encounters await.</p>
                <p><strong>The Sacred Itinerary:</strong></p>
                <ul>
                    <li>Day 1: The Temple City of Bhubaneswar</li>
                    <li>Day 2: Spiritual & Cultural Exploration</li>
                    <li>Day 3: The Shakti Trail & Inner War</li>
                    <li>Day 4: The Solar Chariot & Lord of the Universe</li>
                </ul>
                <p><em>Full content loading... The complete odyssey will be available soon.</em></p>
            </div>`
        };
        
        return fallbackContent[postId] || `<p>Content for ${postId} is loading. Please check back soon for the full spiritual journey experience.</p>`;
    };
    
    // Mapping for research file names in built_site
    const researchFileMap = {
        'Chausath Yogini': 'Chausath_Yogini.html',
        'Chhatia Bata': 'Chhatia_Bata.html',
        'Cuttack Chandi Shakti Peetha': 'Cuttack_Chandi_Shakti_Peetha.html',
        'jain_temple_caves': 'jain_temple_caves.html',
        'Konark Sun Temple': 'Konark_Sun_Temple.html',
        'lingaraj_temple': 'lingaraj_temple.html',
        'Maa Biraja Shakti Peetha': 'Maa_Biraja_Shakti_Peetha.html',
        'Parashurameshwar Temple': 'Parashurameshwar_Temple.html',
        'puri_jagannath_temple': 'puri_jagannath_temple.html',
        'ram mandir': 'ram_mandir.html',
        'Sri Jagannath Temple Complex': 'Sri_Jagannath_Temple_Complex.html',
        'subhash_chandra_bose_museum': 'subhash_chandra_bose_museum.html',
        'THE MIRROR OF THE SOUL': 'THE_MIRROR_OF_THE_SOUL.html',
        'The Rajarani Temple': 'The_Rajarani_Temple.html'
    };
    
    // Helper function to get research content from HTML files
    const getResearchContent = async (topic) => {
        try {
            // Get correct filename from map or use default strategy
            let fileName = researchFileMap[topic];

            // If not in map, try to construct it matching built_site conventions
            // (usually spaces/dashes to underscores, keeping extension)
            if (!fileName) {
                fileName = topic.replace(/ /g, '_') + '.html';
            }

            const filePath = `built_site/${fileName}`;
            console.log(`Loading research content from: ${filePath}`);
            const htmlContent = await loadHTMLFile(filePath);
            
            if (htmlContent && htmlContent.trim()) {
                console.log(`Successfully loaded research content for ${topic}`);
                return htmlContent;
            } else {
                console.warn(`Fallback content used for research topic: ${topic}`);
                return getFallbackResearchContent(topic);
            }
        } catch (error) {
            console.error('Error loading research content:', error);
            return getFallbackResearchContent(topic);
        }
    };

    // Helper function to get fallback research content
    const getFallbackResearchContent = (topic) => {
        const researchFallbacks = {
            'Chausath Yogini': `<div class="research-fallback-content">
                <h4>Chausath Yogini Temple: The Hypaethral Mandala</h4>
                <p>The Chausath Yogini Temple at Hirapur is one of the most unique and mysterious temples in Odisha, dating back to the 9th century. This circular, roofless temple is dedicated to the 64 Yoginis - manifestations of the divine feminine energy.</p>
                <p><strong>Key Features:</strong></p>
                <ul>
                    <li>Circular architecture open to the sky</li>
                    <li>64 exquisite chlorite sculptures of Yoginis</li>
                    <li>Built by Queen Hira Mahadevi of the Bhauma-Kara dynasty</li>
                    <li>Represents the Tantric synthesis of Shaivism and Shaktism</li>
                </ul>
                <p><em>Detailed research content loading... The complete analysis will be available soon.</em></p>
            </div>`,
            'Chhatia Bata': `<div class="research-fallback-content">
                <h4>Chhatia Bata: The Fortress of the Future</h4>
                <p>Chhatia Bata is a sacred site with deep prophetic significance, believed to be the Second Srikshetra according to the Bhavishya Malika. This site represents the ultimate spiritual battlefield - the human mind.</p>
                <p><strong>Key Aspects:</strong></p>
                <ul>
                    <li>The growing sword of Kalki symbolizing inner transformation</li>
                    <li>Mirror reflections representing self-examination</li>
                    <li>Prophetic significance in the transition between yugas</li>
                    <li>Architectural representation of spiritual warfare</li>
                </ul>
                <p><em>Detailed research content loading... The complete analysis will be available soon.</em></p>
            </div>`,
            'Konark Sun Temple': `<div class="research-fallback-content">
                <h4>Konark Sun Temple: The Cosmic Chariot</h4>
                <p>The Konark Sun Temple, built in the 13th century by King Narasimhadeva I, is a masterpiece of Kalinga architecture. Designed as a colossal chariot with 24 wheels, this temple represents the journey of the sun god Surya across the sky.</p>
                <p><strong>Architectural Marvels:</strong></p>
                <ul>
                    <li>24 intricately carved stone wheels functioning as sundials</li>
                    <li>Seven horses representing the days of the week</li>
                    <li>Erotic sculptures symbolizing the union of opposites</li>
                    <li>Precise astronomical alignment with solar movements</li>
                </ul>
                <p><em>Detailed research content loading... The complete analysis will be available soon.</em></p>
            </div>`
        };
        
        return researchFallbacks[topic] || `<div class="research-fallback-content">
            <h4>Research: ${topic}</h4>
            <p>Detailed research content about ${topic} is loading. This section will provide in-depth analysis of the historical, cultural, and spiritual significance of this sacred site.</p>
            <p><em>Full research content will be available soon.</em></p>
        </div>`;
    };
    
    // Format research title
    const formatResearchTitle = (topic) => {
        return topic.replace(/_/g, ' ').replace(/\.md$/i, '');
    };
    
    // Create slug from title
    const slugify = (text) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    };
    
    // Get featured image for topic
    const getFeaturedImageForTopic = (topic) => {
        const images = [
            'https://images.unsplash.com/photo-1599827473795-94e82390c96c?q=80&w=1920&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1589923188913-262a6e75027a?q=80&w=1920&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1589923188913-262a6e75027a?q=80&w=1920&auto=format&fit=crop'
        ];
        return images[Math.floor(Math.random() * images.length)];
    };
    
    // Organize content by categories and tags
    const organizeContent = () => {
        // Extract unique categories
        categories = [...new Set(blogPosts.flatMap(post => post.categories))];
        
        // Extract unique tags
        tags = [...new Set(blogPosts.flatMap(post => post.tags))];
        
        // Sort alphabetically
        categories.sort();
        tags.sort();
    };
    
    // Build timeline structure
    const buildTimeline = () => {
        // Group posts by day
        const postsByDay = {};
        
        blogPosts.forEach(post => {
            if (!postsByDay[post.day]) {
                postsByDay[post.day] = [];
            }
            postsByDay[post.day].push(post);
        });
        
        // Create timeline data
        timelineData = Object.keys(postsByDay).map(day => ({
            day: parseInt(day),
            date: getDateForDay(parseInt(day)),
            posts: postsByDay[day]
        }));
        
        timelineData.sort((a, b) => a.day - b.day);
    };
    
    // Get date for day
    const getDateForDay = (day) => {
        const dates = [
            'December 22',
            'December 23', 
            'December 24',
            'December 25'
        ];
        return dates[day - 1] || 'December 2024';
    };
    
    // Get all blog posts
    const getAllPosts = () => {
        return blogPosts;
    };
    
    // Get posts by category
    const getPostsByCategory = (category) => {
        return blogPosts.filter(post => post.categories.includes(category));
    };
    
    // Get posts by tag
    const getPostsByTag = (tag) => {
        return blogPosts.filter(post => post.tags.includes(tag));
    };
    
    // Get posts by day
    const getPostsByDay = (day) => {
        return blogPosts.filter(post => post.day === day);
    };
    
    // Get posts by thematic arc
    const getPostsByThematicArc = (arc) => {
        return blogPosts.filter(post => post.thematicArc === arc);
    };
    
    // Search posts
    const searchPosts = (query) => {
        const lowerQuery = query.toLowerCase();
        return blogPosts.filter(post => 
            post.title.toLowerCase().includes(lowerQuery) ||
            post.excerpt.toLowerCase().includes(lowerQuery) ||
            post.content.toLowerCase().includes(lowerQuery) ||
            post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
            post.categories.some(cat => cat.toLowerCase().includes(lowerQuery))
        );
    };
    
    // Get timeline data
    const getTimelineData = () => {
        return timelineData;
    };
    
    // Get all categories
    const getCategories = () => {
        return categories;
    };
    
    // Get all tags
    const getTags = () => {
        return tags;
    };
    
    // Get thematic arcs
    const getThematicArcs = () => {
        const arcs = [...new Set(blogPosts.map(post => post.thematicArc))];
        return arcs.sort();
    };
    
    // Get post by slug
    const getPostBySlug = (slug) => {
        return blogPosts.find(post => post.slug === slug);
    };
    
    return {
        init,
        getAllPosts,
        getPostsByCategory,
        getPostsByTag,
        getPostsByDay,
        getPostsByThematicArc,
        searchPosts,
        getTimelineData,
        getCategories,
        getTags,
        getThematicArcs,
        getPostBySlug
    };
})();

// Export for module usage
export default BlogContent;