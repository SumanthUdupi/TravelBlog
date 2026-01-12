import React from 'react';
import { useAuth } from '../context/hooks';
import { useBlog } from '../context/hooks';

const Profile = () => {
    const { user } = useAuth();
    const { posts } = useBlog();

    if (!user) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Please log in to view profile.</div>;

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            {/* Profile Header */}
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid var(--color-accent)' }}
                />
                <div>
                    <h1 style={{ marginBottom: '0.25rem' }}>{user.name}</h1>
                    <p className="text-muted" style={{ margin: 0 }}>{user.role} &bull; Joined {user.joined}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        {user.badges.map((badge, i) => (
                            <span key={i} style={{
                                background: 'var(--color-accent)',
                                color: '#fff',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                            }}>
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>{posts.length}</div>
                    <div className="text-muted">Artifacts Authenticated</div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}>12.5k</div>
                    <div className="text-muted">Total Readership</div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', color: '#2d8a56' }}>98%</div>
                    <div className="text-muted">Editorial Score</div>
                </div>
            </div>

            <h2 className="section-title">Contribution Log</h2>
            <div className="glass-panel" style={{ padding: '1rem' }}>
                <p className="text-muted" style={{ fontStyle: 'italic' }}>
                    Activity tracking enabled. Contributions to the archives are immutable.
                </p>
                {/* Mock Activity List */}
                <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                    {[1, 2, 3].map(i => (
                        <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)' }}>
                            <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Published</span>
                            <span style={{ margin: '0 0.5rem' }}>&mdash;</span>
                            The Hidden Temples of Bhubaneswar
                            <span style={{ float: 'right', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>2 days ago</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
