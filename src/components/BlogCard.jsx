import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/card.css';

const BlogCard = ({ post }) => {
  // Safe fallback for image if none provided
  const bgImage = post.image || post.imageUrl || 'https://images.unsplash.com/photo-1542259681-dadcd73156f0?q=80&w=2070&auto=format&fit=crop';

  return (
    <article className="blog-card">
      <Link to={`/post/${post.slug}`} className="blog-card-link">
        <div className="card-image-wrapper">
          <img src={bgImage} alt={post.title} className="card-image" loading="lazy" />
          <div className="card-overlay"></div>
        </div>

        <div className="card-content">
          {post.tags && post.tags.length > 0 && (
            <span className="card-category">{post.tags[0]}</span>
          )}
          <h3 className="card-title">{post.title}</h3>
          <p className="card-excerpt">{post.excerpt}</p>

          <div className="card-footer">
            <div className="card-meta">
              <span>{post.readTime}</span>
            </div>
            <div className="read-more-btn">
              Read Article <span>&rarr;</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
