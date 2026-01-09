import React from 'react';
import { useParams } from 'react-router-dom';
import posts from '../data/posts';
import { useNavigate } from 'react-router-dom';

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div className="blog-post-page">
        <button onClick={handleBack} className="back-button">← Back</button>
      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-meta">
          <span>{post.author}</span> | <span>{post.date}</span> | <span>{post.readTime} min read</span>
        </p>
      </div>
      <div className="post-hero-image">
        <img src={post.imageUrl} alt={post.title} />
      </div>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}>
      </div>
    </div>
  );
};

export default BlogPost;
