import React from 'react';
import BlogCard from '../components/BlogCard';
import posts from '../data/posts'; // We will create this file next

const Home = () => {
  return (
    <div className="home-page">
      <div className="container">
        <div className="hero">
          <h1 className="hero-title">The Æsthetic</h1>
          <p className="hero-subtitle">A Curated Journal on Art, Design, and Culture.</p>
        </div>
        <div className="blog-grid">
          {posts.map((post, index) => (
            <div key={post.id} className="fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
