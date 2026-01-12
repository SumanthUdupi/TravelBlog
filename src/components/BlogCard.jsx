import React from 'react';
import { Link } from 'react-router-dom';
import BookmarkButton from './Engagement/BookmarkButton';
import MagneticButton from './Effects/MagneticButton';
import '../styles/components/_blog-card.css';

const BlogCard = ({ post, featured }) => {
  // Safe fallback for image if none provided
  const bgImage = post.image || post.imageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop';

  return (
    <article className={`blog-card ${featured ? 'featured' : ''}`}>
      <Link to={`/post/${post.slug}`} className="blog-card-link">
        <div className="card-image-wrapper">
          <img
            src={bgImage}
            alt={post.title}
            className="card-image"
            loading="lazy"
            decoding="async"
          />
          <div className="card-overlay"></div>
          <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10, background: 'rgba(255,255,255,0.8)', borderRadius: '50%' }}>
            <BookmarkButton postId={post.id} />
          </div>
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
            <MagneticButton>
              <div className="read-more-btn">
                Read Article <span>&rarr;</span>
              </div>
            </MagneticButton>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
