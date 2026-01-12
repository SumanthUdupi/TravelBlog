import { useBlog } from '../context/BlogContext';
import KineticHero from '../components/Typography/KineticHero';
import BlogCard from '../components/BlogCard';
import HeroArtifact from '../components/3D/HeroArtifact';

// Helper for grid layout
const getBentoClass = (index) => {
  if (index === 0) return 'col-span-2 row-span-2';
  if (index === 3) return 'col-span-2';
  return '';
};

const Home = () => {
  const { posts } = useBlog();
  // ... (keep middle content)

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
        </div>

        <div className="hero-content container" style={{ display: 'flex', alignItems: 'center', minHeight: '80vh' }}>
          <div className="hero-text" style={{ flex: 1 }}>
            <span className="hero-eyebrow">Curated / Editorial / Timeless</span>
            <div style={{ marginBottom: '1rem' }}>
              <KineticHero text="The Æsthetic" />
            </div>
            <p className="hero-subtitle">
              An exploration of sacred geography, ancient architecture, and the hidden narratives of the subcontinent.
            </p>
          </div>
          <div className="hero-visual" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <HeroArtifact />
          </div>
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

