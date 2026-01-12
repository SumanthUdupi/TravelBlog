import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';

const Spaces = () => {
    const { posts } = useBlog();
    const [activeSpace, setActiveSpace] = useState('All');

    // Extract unique tags and count
    const tagCounts = posts.reduce((acc, output) => {
        if (!output.tags) return acc;
        output.tags.forEach(tag => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {});



    const filteredPosts = activeSpace === 'All'
        ? posts
        : posts.filter(p => p.tags && p.tags.includes(activeSpace));

    return (
        <div className="archive-page fade-in">
            <header className="archive-header">
                <div className="container" style={{ textAlign: 'center', padding: '6rem 0 4rem' }}>
                    <h1 className="archive-title">Artifact Spaces</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.7 }}>
                        Explore the archives through curated thematic realms.
                    </p>
                </div>
            </header>

            <div className="container">
                {/* Spaces Grid (Bento) */}
                <div className="spaces-grid">
                    <style>{`
                        .spaces-grid {
                            display: grid;
                            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                            gap: var(--space-md);
                            margin-bottom: var(--space-2xl);
                        }
                        .space-card {
                            background: var(--color-surface-100);
                            border: 1px solid var(--glass-border);
                            padding: var(--space-md);
                            border-radius: var(--border-radius-md);
                            cursor: pointer;
                            transition: all 0.3s ease;
                            text-align: center;
                        }
                        .space-card:hover, .space-card.active {
                            border-color: var(--color-accent);
                            background: rgba(212, 175, 55, 0.05);
                            transform: translateY(-2px);
                        }
                        .space-count {
                            display: block;
                            font-size: 2rem;
                            font-weight: 700;
                            color: var(--color-primary-light);
                            margin-bottom: 4px;
                        }
                        .space-name {
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            font-size: 0.8rem;
                        }
                    `}</style>

                    <div
                        className={`space-card ${activeSpace === 'All' ? 'active' : ''}`}
                        onClick={() => setActiveSpace('All')}
                    >
                        <span className="space-count">{posts.length}</span>
                        <span className="space-name">All Artifacts</span>
                    </div>

                    {Object.entries(tagCounts).map(([tag, count]) => (
                        <div
                            key={tag}
                            className={`space-card ${activeSpace === tag ? 'active' : ''}`}
                            onClick={() => setActiveSpace(tag)}
                        >
                            <span className="space-count">{count}</span>
                            <span className="space-name">{tag}</span>
                        </div>
                    ))}
                </div>

                {/* Filtered Results */}
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
        </div>
    );
};

export default Spaces;
