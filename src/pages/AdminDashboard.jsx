import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const AdminDashboard = () => {
    const { posts, deletePost, isLoading } = useBlog();

    const handleDelete = async (id) => {
        await deletePost(id);
    };

    return (
        <div className="container section fade-in">
            <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>Curator Dashboard</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Manage the collection of artifacts.</p>
                </div>
                <Link to="/admin/new" className="btn btn-primary">
                    + New Artifact
                </Link>
            </div>

            {isLoading ? (
                <div>Loading archives...</div>
            ) : (
                <div className="admin-table-container">
                    <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--color-border-strong)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Title</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem' }}>Date</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length > 0 ? (
                                posts.map(post => (
                                    <tr key={post.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                                        <td style={{ padding: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
                                            {post.title}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span className={`status-badge ${post.status}`}>
                                                {post.status || 'Draft'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <Link to={`/admin/edit/${post.id}`} style={{ marginRight: '1rem', color: 'var(--color-accent-terracotta)' }}>Edit</Link>
                                            <button onClick={() => handleDelete(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                                        No artifacts found. Begin your curation by creating a new post.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
