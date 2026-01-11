import React from 'react';
import '../styles/pages/post.css'; // Reusing post styles for typography

const About = () => {
  return (
    <div className="blog-post-page fade-in">
      <header className="post-hero" style={{ height: '60vh' }}>
        <div className="post-hero-overlay"></div>
        <div className="post-header-content">
          <div className="post-category">Philosophy</div>
          <h1 className="post-title-large">The Æsthetic</h1>
          <p className="hero-subtitle" style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            We preserve the echoes of the past, for they are the foundation of our future.
          </p>
        </div>
      </header>

      <div className="post-layout">
        <div className="post-body">
          <p>
            The Æsthetic is a digital journal dedicated to the celebration of beauty in all its forms. We believe that thoughtful design and compelling art can enrich our lives, and our mission is to provide a space for exploration and inspiration.
          </p>
          <blockquote>
            "Beauty is the harmony of purpose and form."
          </blockquote>
          <p>
            Our content is curated for those who appreciate the finer things: the subtle details, the masterful craftsmanship, and the stories behind the objects and ideas that shape our world. We delve into a range of topics, from the timeless principles of design to the latest currents in contemporary art and culture.
          </p>
          <h2>Our Mission</h2>
          <p>
            This platform is more than just a blog; it's a community of connoisseurs, creators, and enthusiasts who share a passion for the beautiful. We invite you to join us on this journey of discovery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
