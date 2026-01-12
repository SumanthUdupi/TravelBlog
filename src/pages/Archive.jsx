import { useSearchParams, Link } from 'react-router-dom';
import { useBlog } from '../context/hooks';
import { useState } from 'react';
import ActivityFeed from '../components/Social/ActivityFeed';

const Archive = () => {
    const { posts } = useBlog();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag === 'All' || (post.tags && post.tags.includes(selectedTag));
        return matchesSearch && matchesTag;
    });

    const allTags = ['All', ...new Set(posts.flatMap(p => p.tags || []))];

    return (
        <div className="archive-page fade-in">
            <header className="archive-header">
                <div className="container" style={{ textAlign: 'center', padding: '6rem 0 4rem' }}>
                    <h1 className="archive-title">The Archive</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.7 }}>
                        A collection of thoughts, designs, and explorations.
                    </p>
                </div>
            </header>

            <div className="container">
                <div className="archive-layout-grid">
                    <style>{`
                    .archive-layout-grid {
                        display: grid;
                        grid-template-columns: 1fr 300px;
                        gap: var(--space-2xl);
                    }
                    @media (max-width: 968px) {
                        .archive-layout-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `}</style>

                    <div className="archive-main">
                        {/* Controls */}
                        <div className="archive-controls">
                            <input
                                type="text"
                                placeholder="Search artifacts..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="tags-row">
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        className={`tag-pill ${selectedTag === tag ? 'active' : ''}`}
                                        onClick={() => setSelectedTag(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid-layout">
                            {filteredPosts.map(post => (
                                <Link to={`/post/${post.slug}`} key={post.id} className="blog-card fade-in">
                                    <div className="card-image-container">
                                        <img
                                            src={post.image || 'https://via.placeholder.com/800x600'}
                                            alt={post.title}
                                            className="card-image"
                                            loading="lazy"
                                        />
                                        <div className="card-overlay"></div>
                                    </div>
                                    <div className="card-content">
                                        <div className="card-category">{post.tags ? post.tags[0] : 'Uncategorized'}</div>
                                        <h2 className="card-title">{post.title}</h2>
                                        <p className="card-excerpt">{post.excerpt}</p>
                                        <div className="card-meta">
                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                            <span>&bull;</span>
                                            <span>{post.readTime || '5 min'}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <aside className="archive-sidebar">
                        <ActivityFeed />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Archive;
