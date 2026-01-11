import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import SimpleMarkdown from '../utils/SimpleMarkdown';
import DOMPurify from 'dompurify';
import '../styles/pages/post.css';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getPostBySlug } = useBlog();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      const foundPost = await getPostBySlug(slug);
      setPost(foundPost);
      setLoading(false);
    };
    fetchPost();
  }, [slug, getPostBySlug]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  if (loading) return (
    <div className="loading-screen">
      <div className="loader"></div>
    </div>
  );

  if (!post) return (
    <div className="container section text-center" style={{ paddingTop: '100px' }}>
      <h2>Artifact not found.</h2>
      <button onClick={() => navigate('/')} className="back-button" style={{ display: 'inline-flex', marginTop: '20px' }}>Return Home</button>
    </div>
  );

  const bgImage = post.image || post.imageUrl || 'https://images.unsplash.com/photo-1596324021202-601445107e32?q=80&w=2070&auto=format&fit=crop';

  return (
    <div className="blog-post-page fade-in">
      {/* Reading Progress */}
      <div className="reading-progress-container">
        <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }}></div>
      </div>

      <button className="back-button-fixed" onClick={() => navigate(-1)} aria-label="Go Back">
        <span>&larr;</span>
      </button>

      <article>
        {/* Full Width Hero */}
        <header className="post-hero">
          <div className="post-hero-overlay"></div>
          <img
            src={bgImage}
            alt={post.title}
            className="post-hero-image"
          />
          <div className="post-header-content">
            <div className="post-category">
              {post.tags ? post.tags[0] : 'Journal'}
            </div>
            <h1 className="post-title-large">{post.title}</h1>
            <div className="post-meta-row">
              <span>{new Date(post.date || Date.now()).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>&bull;</span>
              <span>{post.readTime || '5 min read'}</span>
              <span>&bull;</span>
              <span>{post.author || 'Editorial'}</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="post-layout">
          <div className="post-body">
            {post.content.startsWith('#') || post.content.includes('\n') ? (
              <SimpleMarkdown content={post.content} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
            )}

            <hr style={{ margin: '4rem 0', borderColor: 'var(--glass-border)' }} />

            <div className="text-center" style={{ opacity: 0.6 }}>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>~ End of Artifact ~</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
