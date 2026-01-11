import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const PostEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { createPost, updatePost, posts, categories } = useBlog();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        status: 'draft',
        category: '',
        image: '', // URL
        excerpt: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const post = posts.find(p => p.id === id);
            if (post) {
                setFormData({
                    title: post.title || '',
                    slug: post.slug || '',
                    content: post.content || '',
                    status: post.status || 'draft',
                    category: post.category || '',
                    image: post.image || '',
                    excerpt: post.excerpt || ''
                });
            }
        }
    }, [id, posts, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing) {
                await updatePost(id, formData);
            } else {
                await createPost(formData);
            }
            navigate('/admin');
        } catch (error) {
            console.error("Failed to save:", error);
            alert("Failed to save artifact.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container section fade-in">
            <h1 className="text-center">{isEditing ? 'Restoration (Edit)' : 'New Acquisition (Create)'}</h1>

            <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>

                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter the title of the artifact..."
                        style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}
                    />
                </div>

                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Slug (Optional)</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            placeholder="custom-url-slug"
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            <option value="">Select Category...</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.slug}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Thumbnail Image URL</label>
                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Excerpt</label>
                    <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        rows="3"
                        placeholder="A brief summary for the catalogue..."
                    />
                </div>

                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Content (HTML supported)</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows="15"
                        placeholder="Write the full description using HTML tags..."
                        style={{ fontFamily: 'monospace', lineHeight: '1.5', fontSize: '14px' }}
                    />
                </div>

                <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={{ width: 'auto' }}
                    >
                        <option value="draft">Review (Draft)</option>
                        <option value="published">On Display (Published)</option>
                    </select>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="button" onClick={() => navigate('/admin')} className="btn">Cancel</button>
                        <button type="submit" disabled={loading} className="btn btn-primary">
                            {loading ? 'Preserving...' : 'Save Artifact'}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default PostEditor;
