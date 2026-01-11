
import BlogCard from '../components/BlogCard';
import { useBlog } from '../context/BlogContext';
import '../styles/pages/home.css';

const Home = () => {
  const { posts, isLoading } = useBlog();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  // Helper to determine bento class based on index
  const getBentoClass = (index) => {
    if (index === 0) return 'featured';
    if (index === 1 || index === 2) return 'side';
    if (index === 3) return 'wide';
    return '';
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-particles"></div>
        </div>

        <div className="hero-content">
          <span className="hero-eyebrow">Curated / Editorial / Timeless</span>
          <h1 className="hero-title">The Æsthetic</h1>
          <p className="hero-subtitle">
            An exploration of sacred geography, ancient architecture, and the hidden narratives of the subcontinent.
          </p>
        </div>

        <div className="scroll-indicator">
          <span className="scroll-text">Explore</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Artifacts Grid Section */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Artifacts & Archives</h2>
          <span className="section-subtitle">Recent Discoveries</span>
        </div>

        <div className="bento-grid">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={post.id} className={`bento-item ${getBentoClass(index)}`}>
                <BlogCard post={post} featured={index === 0} />
              </div>
            ))
          ) : (
            <div className="text-center" style={{ gridColumn: 'span 12', padding: '4rem' }}>
              <p className="text-muted">No artifacts found in the archives.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

