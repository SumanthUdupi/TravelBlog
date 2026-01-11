import { useSearchParams } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import '../styles/pages/archive.css';

const Archive = () => {
    const { posts, categories, isLoading } = useBlog();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('cat');

    const filteredPosts = activeCategory
        ? posts.filter(p => p.category === activeCategory)
        : posts;

    const handleCategoryClick = (categorySlug) => {
        if (activeCategory === categorySlug) {
            setSearchParams({});
        } else {
            setSearchParams({ cat: categorySlug });
        }
    };

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="container archive-layout fade-in">
            {/* Sidebar */}
            <aside className="archive-sidebar">
                <div className="filter-group">
                    <h3 className="sidebar-heading">Collections</h3>
                    <button
                        className={`filter-link ${!activeCategory ? 'active' : ''}`}
                        onClick={() => setSearchParams({})}
                    >
                        All Artifacts
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-link ${activeCategory === cat.slug ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(cat.slug)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <div className="archive-content">
                <header className="archive-header">
                    <h1 className="archive-title">
                        {activeCategory
                            ? categories.find(c => c.slug === activeCategory)?.name
                            : 'The Archives'}
                    </h1>
                    <span className="archive-count">{filteredPosts.length} Artifacts</span>
                </header>

                <div className="archive-grid">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                            <div key={post.id} className="bento-item" style={{ animationDelay: `${index * 50}ms` }}>
                                <BlogCard post={post} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center" style={{ padding: '4rem', gridColumn: '1 / -1' }}>
                            <p className="text-muted">No artifacts found in this collection.</p>
                            <button
                                className="filter-link active"
                                style={{ display: 'inline-block', marginTop: '1rem', width: 'auto' }}
                                onClick={() => setSearchParams({})}
                            >
                                View All
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Archive;
