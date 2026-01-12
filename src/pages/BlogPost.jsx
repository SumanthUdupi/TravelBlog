import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/hooks';
import StickySidebar from '../components/Layout/StickySidebar';
import ShareTooltip from '../components/Engagement/ShareTooltip';
import ReactionButton from '../components/Engagement/ReactionButton';
import CommentSection from '../components/Social/CommentSection';
import DOMPurify from 'dompurify';

const SimpleMarkdown = ({ content }) => (
  <div
    className="prose"
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
  />
);

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getPostBySlug, posts } = useBlog(); // Need all posts for "Related"
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [sections, setSections] = useState([]);

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (post && post.content) {
      const headers = post.content.match(/^#{2,3} (.*$)/gm);
      if (headers) {
        const toc = headers.map(h => {
          const label = h.replace(/^#{2,3} /, '');
          const id = label.toLowerCase().replace(/[^\w]+/g, '-');
          return { id, label };
        });
        setSections(toc);
      }
    }
  }, [post]);

  useEffect(() => {
    const fetchPost = async () => {
      const foundPost = await getPostBySlug(slug);
      setPost(foundPost);
      setLoading(false);

      // Find Related Posts (Simple Tag Match)
      if (foundPost && foundPost.tags) {
        const related = posts.filter(p =>
          p.id !== foundPost.id &&
          p.tags &&
          p.tags.some(t => foundPost.tags.includes(t))
        ).slice(0, 3);
        setRelatedPosts(related);
      }
    };
    fetchPost();
  }, [slug, getPostBySlug, posts]);

  if (loading) return <div className="loading-screen"><div className="loader"></div></div>;
  if (!post) return <div>Post not found</div>;

  const bgImage = post.image || post.imageUrl || 'https://images.unsplash.com/photo-1596324021202-601445107e32?q=80&w=2070&auto=format&fit=crop';

  return (
    <div className="blog-post-page fade-in">
      <ShareTooltip />

      <div className="reading-progress-container">
        <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }}></div>
      </div>

      <button className="back-button-fixed" onClick={() => navigate(-1)} aria-label="Go Back"><span>&larr;</span></button>

      <article>
        <header className="post-hero">
          <div className="post-hero-overlay"></div>
          <img src={bgImage} alt={post.title} className="post-hero-image" />
          <div className="post-header-content">
            <div className="post-category">{post.tags ? post.tags[0] : 'Journal'}</div>
            <h1 className="post-title-large">{post.title}</h1>
            <div className="post-meta-row">
              <span>{new Date(post.date || Date.now()).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </header>

        {/* Golden Grid Layout */}
        <div className="container" style={{ marginTop: 'var(--space-2xl)' }}>

          {/* Main Content */}
          <div className="main-content post-body">
            {/* Inject IDs into content for scrolling (Simple Regex Replacement for Demo) */}
            <SimpleMarkdown content={post.content.replace(/^#{2,3} (.*$)/gm, (match, p1) => {
              const id = p1.toLowerCase().replace(/[^\w]+/g, '-');
              return `<div id="${id}"></div>\n\n${match}`;
            })} />

            <hr style={{ margin: '4rem 0', borderColor: 'var(--glass-border)' }} />

            {/* Engagement Zone */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
              <ReactionButton slug={slug} />
              <div style={{ fontStyle: 'italic', opacity: 0.6 }}>~ End of Artifact ~</div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="related-section">
                <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Related Artifacts</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  {relatedPosts.map(p => (
                    <div key={p.id} onClick={() => navigate(`/post/${p.slug}`)} style={{ cursor: 'pointer', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '8px' }}>
                      <h4 style={{ margin: 0 }}>{p.title}</h4>
                      <small style={{ color: 'var(--color-text-muted)' }}>{p.readTime}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <CommentSection slug={slug} />
          </div>

          {/* Sticky Sidebar */}
          <aside className="sidebar">
            <div className="glass-panel" style={{ padding: 'var(--space-md)' }}>
              <h4 style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7 }}>Contents</h4>
              <StickySidebar sections={sections} />
            </div>
          </aside>

        </div>
      </article>
    </div>
  );
};

export default BlogPost;
