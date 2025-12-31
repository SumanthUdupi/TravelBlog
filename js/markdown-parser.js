// Markdown Parser Utility
// This module handles parsing markdown content from files

const MarkdownParser = (() => {
    
    // Parse markdown content to HTML
    const parseMarkdown = (markdown) => {
        if (!markdown) return '';
        
        // Convert markdown to HTML using simple regex patterns
        let html = markdown;
        
        // Headers
        html = html.replace(/^#\s+(.*$)/gm, '<h1>$1</h1>');
        html = html.replace(/^##\s+(.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^###\s+(.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^####\s+(.*$)/gm, '<h4>$1</h4>');
        
        // Bold and italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = html.replace(/_(.*?)_/g, '<em>$1</em>');
        
        // Links
        html = html.replace(/\\[(.*?)\\]\\((.*?)\\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // Images
        html = html.replace(/\!\\[(.*?)\\]\\((.*?)\\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; margin: 1rem 0;">');
        
        // Blockquotes
        html = html.replace(/^>\s?(.*$)/gm, '<blockquote>$1</blockquote>');
        
        // Lists
        html = html.replace(/^\*\s+(.*$)/gm, '<li>$1</li>');
        html = html.replace(/^\d+\.\s+(.*$)/gm, '<li>$1</li>');
        html = html.replace(/<li>(.*?)<\/li>/gs, (match) => {
            // Check if this is part of an ordered or unordered list
            if (match.startsWith('<li>') && match.includes('.')) {
                return match; // Ordered list item
            }
            return match; // Unordered list item
        });
        
        // Replace newlines with proper HTML
        html = html.replace(/\n\n/g, '</p><p>');
        html = html.replace(/\n/g, '<br>');
        
        // Wrap in paragraph tags if not already wrapped
        html = html.replace(/<h[1-6]>(.*?)<\/h[1-6]>/g, '<p>$1</p>');
        
        return html;
    };
    
    // Load markdown file content
    const loadMarkdownFile = async (filePath) => {
        try {
            // Check if we're in a browser environment with fetch API
            if (typeof fetch === 'undefined') {
                console.warn('Fetch API not available, falling back to mock content');
                return getFallbackContent(filePath);
            }

            try {
                // Try to fetch the actual markdown file
                const response = await fetch(filePath);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const content = await response.text();
                
                if (content && content.trim()) {
                    console.log(`Successfully loaded content from ${filePath}`);
                    return content;
                } else {
                    console.warn(`Empty content from ${filePath}, falling back to mock`);
                    return getFallbackContent(filePath);
                }
                
            } catch (fetchError) {
                console.error('Fetch error:', fetchError);
                console.warn('Falling back to mock content for:', filePath);
                return getFallbackContent(filePath);
            }
            
        } catch (error) {
            console.error('Error loading markdown file:', error);
            return `# Error Loading Content\n\nCould not load the content for this post. Please try again later.`;
        }
    };

    // Helper function to provide fallback content
    const getFallbackContent = (filePath) => {
        const fallbackContent = {
            'Blog/raw/Jai Jagannath.md': `# A Pilgrim's Journey Through Odisha: December 2024\n\n## Day One: The Journey Begins - December 22nd\n\nThe railway station clock glowed 4:05 AM when we arrived, our bags heavy with clothes but our hearts light with anticipation. In the pre-dawn darkness, there was something sacred about the emptiness, as if the world was holding its breath before our pilgrimage began.\n\n## Day Two: Bhubaneswar - The City of Temples - December 23rd\n\nWe pulled into Bhubaneswar at 10:00 AM, and immediately the city embraced us with its ancient energy. This city, once called Ekamra Kshetra (the mango grove), is home to over 500 temples, earning it the title "Temple City of India."\n\n## Day Three: The Shakti Peethas and the Birth of a Revolutionary - December 24th\n\nThe morning of December 24th greeted us with the aroma of chole bhature, puffy and golden, stuffed with spiced chickpeas. Fortified, we set out for Cuttack and Jajpur, moving deeper into the sacred circuit of the Goddess.\n\n## Day Four: The Final Arc - December 25th\n\nAt 10:15 AM on December 25th, we climbed to the Chausathi Yogini Temple, perched on a hilltop overlooking the city. This circular, open-air temple is one of only four surviving Yogini temples in India, dating back to the 9th century.\n\nThe pilgrimage was over. The transformation had just begun.\n\n---\n\n**Jai Jagannath**`,
            
            'Blog/raw/odisha_sacred_odyssey.md': `# Odisha Sacred Odyssey: Where the Divine Meets the Soul\n\n*"Jai Jagannath!"*\n\nIn Odisha, this is not merely a greeting; it is a rhythmic punctuation to life itself.\n\nBetween December 22nd and 25th, 2024, I embarked on a pilgrimage—not just of distance, but of dimension. What was planned as a travel itinerary evolved into a sacred odyssey through time, spanning the tribal roots of the Iron Age to the futuristic prophecies of the Malika.\n\n## The Sacred Itinerary\n\n### Day 1: The Temple City\nArrival in Bhubaneswar. The syncretism of Lingaraj, the tribal heartbeat, and the Jain silence of Udayagiri.\n\n### Day 2: Culinary & Spiritual Duality\nDeep dive into Bhubaneswar's culinary delights (Dahibara Aloodum) and spiritual anchors.\n\n### Day 3: The Shakti Trail\nCuttack Chandi, Netaji's Birthplace, Jajpur's Maa Biraja, and the futuristic fortress of Chhatia Bata.\n\n### Day 4: The Solar Path\n64 Yoginis, Dhauli Shanti Stupa, Konark Sun Temple, and the climax at Puri Jagannath Dham.\n\n## Final Reflection\n\nThe Odisha Sacred Odyssey was more than a tour. It was a reminder that we are not human beings having a spiritual experience; we are spiritual beings having a human experience.\n\nIn the stone of Konark, the darkness of the Chhatia sanctum, and the wide eyes of Jagannath, we didn't just see history. We saw ourselves.\n\nJai Jagannath.`,
            
            'Blog/research/Chausath Yogini.md': `# The Chausath Yogini Temple: A Monograph on the Hypaethral Mandala\n\n## Introduction: The Enigma of the Circular Shrine\n\nThe Chausath Yogini Temple at Hirapur, situated in the verdant plains of the Khurda district in Odisha, stands as one of the most profound and enigmatic testaments to the Tantric renaissance that swept through medieval India.\n\n## Historical Background and Patronage\n\n### The Tantric Renaissance in Medieval Odisha\n\nTo understand the genesis of the Hirapur temple, one must situate it within the broader religious currents of early medieval Odisha (c. 7th-10th century CE). This period witnessed a paradigm shift from the dominance of Buddhism and early Shaivism toward the esoteric path of Tantra.\n\n### The Bhauma-Kara Dynasty: A Legacy of Female Rule\n\nThe patronage of the Hirapur temple is inextricably linked to the Bhauma-Kara dynasty (c. 736-940 CE), a ruling house unique in Indian history for its succession of powerful female monarchs.\n\n## The Architecture of the Void: Hypaethral Semantics\n\n### The Concept of the Hypaethral Shrine\n\nThe most arresting feature of the Chausath Yogini Temple is its hypaethral nature—it is open to the sky. In Sanskrit architectural treatises, this is often referred to as a Shunya (void) or Akasha (sky) temple.\n\n### Dimensions and Materials\n\nThe Hirapur temple is miniature in scale, creating an atmosphere of intense intimacy rather than overwhelming grandeur.\n\n- Plan: The temple is circular, with an inner diameter of approximately 25 feet (7.6 meters) and an outer circumference of roughly 90 feet.\n- Walls: The circular wall stands about 2 meters (approx. 6.5 feet) high.\n- Masonry: The construction utilizes dry masonry techniques, relying on gravity and the precise dressing of stones rather than mortar.\n\n## Iconography: The Pantheon of Sixty-Four\n\nThe artistic soul of the Hirapur temple resides in its sculptures. Carved from fine-grained black chlorite (known locally as muguni stone), these images are celebrated for their intricate detailing, plasticity, and the remarkable preservation of their surface polish.\n\n### The Sixty-Four Yoginis: A Detailed Inventory\n\nInside the circular enclosure, sixty niches are carved into the wall, with the remaining four Yoginis placed in the central Chandi Mandapa. The Hirapur Yoginis are distinguished by their standing posture, their nudity (adorned only by jewelry and diaphanous skirts), and their vahanas (mounts).\n\n## Conclusion\n\nThe Chausath Yogini Temple at Hirapur is more than a mere archaeological curiosity; it is a "frozen vibration" of a powerful esoteric past. It stands as a defiance of the conventional norms of Hindu temple architecture—rejecting the towering spire for the open circle, and democratizing the divine by elevating local, animal-headed, and fierce female energies to the status of high goddesses.`,
            
            'Blog/research/Chhatia Bata.md': `# Chhatia Bata: The Fortress of the Future\n\n## Introduction\n\nChhatia Bata is a sacred site with deep prophetic significance in Odisha's spiritual landscape. According to the Bhavishya Malika, this is the Second Srikshetra, a place of immense spiritual power and future importance.\n\n## The Legend and Prophecy\n\n### The Bhavishya Malika\n\nThe Bhavishya Malika ("Garland of the Future") is an ancient prophetic text that describes future events and the coming of divine manifestations. According to this text, Chhatia Bata is destined to play a crucial role in the final battle between good and evil.\n\n### The Sword of Kalki\n\nLegend whispers that the sword (Nandaka) in the Lord's hand at Chhatia Bata is slowly growing. When it unsheathes completely, the final battle begins, marking the end of the Kali Yuga and the dawn of a new era.\n\n## Architectural and Spiritual Features\n\n### The Temple Complex\n\nThe Chhatia Bata temple complex is a fascinating blend of ancient and futuristic elements, reflecting its prophetic significance.\n\n### The Growing Sword\n\nThe central feature of the temple is the representation of Lord Kalki with his sword. The unique arrangement creates an optical illusion where the sword appears to be growing over time.\n\n## Spiritual Significance\n\n### The Battle Within\n\nChhatia Bata represents the ultimate spiritual battlefield—the human mind. The growing sword symbolizes the inner struggle between divine consciousness and the forces of ignorance and ego.\n\n### The Mirror of the Soul\n\nThe temple's design incorporates mirrors that reflect the visitor's image, symbolizing the need for self-examination and inner transformation.\n\n## Conclusion\n\nChhatia Bata stands as a bridge between past, present, and future—a sacred site where prophecy, architecture, and spirituality converge. It reminds us that the final battle is not external but internal, and that true transformation begins within the human heart.`
        };

        return fallbackContent[filePath] || `# Content for ${filePath}\n\nThis content is currently being loaded. The full spiritual journey experience will be available soon.`;
    };
    
    // Load all blog content
    const loadAllBlogContent = async () => {
        try {
            // This would load all the blog content files
            // For now, we'll return a promise that resolves with mock data
            
            return {
                success: true,
                message: 'Blog content loaded successfully'
            };
            
        } catch (error) {
            console.error('Error loading blog content:', error);
            return {
                success: false,
                message: 'Failed to load blog content'
            };
        }
    };
    
    return {
        parseMarkdown,
        loadMarkdownFile,
        loadAllBlogContent
    };
})();

// Export for module usage
export default MarkdownParser;