import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <div className="blog-card">
      <Link to={`/post/${post.id}`}>
        <div className="card-image">
          <img src={post.imageUrl} alt={post.title} />
        </div>
        <div className="card-content">
          <h3 className="card-title">{post.title}</h3>
          <p className="card-excerpt">{post.excerpt}</p>
          <div className="card-meta">
            <span>{post.date}</span>
            <span>&bull;</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
