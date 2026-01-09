import React from 'react';

const About = () => {
  return (
    <div className="about-page fade-in-up" style={{ animationDelay: `100ms` }}>
      <div className="container">
        <div className="post-header">
          <h1 className="post-title">About The Æsthetic</h1>
          <p className="hero-subtitle">Exploring the intersection of art, design, and culture.</p>
        </div>
        <div className="post-content">
          <p>The Æsthetic is a digital journal dedicated to the celebration of beauty in all its forms. We believe that thoughtful design and compelling art can enrich our lives, and our mission is to provide a space for exploration and inspiration.</p>
          <p>Our content is curated for those who appreciate the finer things: the subtle details, the masterful craftsmanship, and the stories behind the objects and ideas that shape our world. We delve into a range of topics, from the timeless principles of design to the latest currents in contemporary art and culture.</p>
          <p>This platform is more than just a blog; it's a community of connoisseurs, creators, and enthusiasts who share a passion for the beautiful. We invite you to join us on this journey of discovery.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
