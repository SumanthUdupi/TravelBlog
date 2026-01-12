import React, { useState, useEffect } from 'react';
import { useIdentity } from '../../context/hooks';

const CommentSection = ({ slug }) => {
    const { user, login } = useIdentity();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [guestName, setGuestName] = useState('');

    useEffect(() => {
        // Load comments for this post
        const stored = localStorage.getItem(`comments_${slug}`);
        if (stored) {
            setComments(JSON.parse(stored));
        } else {
            // Seed with mock data if empty
            const mockComments = [
                {
                    id: 'c1',
                    author: 'Archivist_Helena',
                    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Helena',
                    text: 'The geometry here reminds me of the stepwells in Gujarat. Fascinating perspective.',
                    date: new Date(Date.now() - 86400000).toISOString(),
                    replies: []
                }
            ];
            setComments(mockComments);
        }
    }, [slug]);

    const handlePost = (e) => {
        e.preventDefault();

        if (!user && !guestName.trim()) return;

        // Auto-login if guest name provided
        if (!user) {
            login(guestName);
        }

        const commentObj = {
            id: 'c_' + Date.now(),
            author: user ? user.name : guestName,
            avatar: user ? user.avatar : `https://api.dicebear.com/7.x/initials/svg?seed=${guestName}`,
            text: newComment,
            date: new Date().toISOString(),
            replies: []
        };

        const updatedComments = [...comments];
        if (replyTo) {
            const parentIndex = updatedComments.findIndex(c => c.id === replyTo);
            if (parentIndex > -1) {
                updatedComments[parentIndex].replies.push(commentObj);
            }
        } else {
            updatedComments.unshift(commentObj);
        }

        setComments(updatedComments);
        localStorage.setItem(`comments_${slug}`, JSON.stringify(updatedComments));

        setNewComment('');
        setReplyTo(null);
    };

    return (
        <div className="comment-section">
            <style>{`
                .comment-section {
                    margin-top: var(--space-2xl);
                    padding-top: var(--space-xl);
                    border-top: 1px solid var(--glass-border);
                    font-family: var(--font-ui);
                }
                .comment-form {
                    background: var(--color-surface-200);
                    padding: var(--space-md);
                    border-radius: var(--border-radius-md);
                    margin-bottom: var(--space-xl);
                }
                .comment {
                    margin-bottom: var(--space-lg);
                }
                .comment-header {
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                    margin-bottom: var(--space-xs);
                }
                .avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 1px solid var(--glass-border);
                }
                .author { font-weight: 600; font-size: 0.9rem; }
                .date { font-size: 0.8rem; color: var(--color-text-muted); }
                .text { line-height: 1.5; font-size: 0.95rem; }
                .reply-link { 
                    font-size: 0.8rem; 
                    color: var(--color-accent); 
                    cursor: pointer; 
                    margin-top: 4px; 
                    display: inline-block;
                }
                .replies {
                    margin-left: var(--space-lg);
                    border-left: 2px solid var(--glass-border);
                    padding-left: var(--space-md);
                    margin-top: var(--space-sm);
                }
                input, textarea {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 8px;
                    border: 1px solid var(--glass-border);
                    border-radius: 4px;
                    background: var(--color-surface-100);
                    color: var(--color-text-main);
                }
                button {
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                }
            `}</style>

            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>
                Community Discussion ({comments.length})
            </h3>

            <div className="comment-form">
                {!user && (
                    <input
                        type="text"
                        placeholder="Your Name (to join discussion)"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                    />
                )}
                <textarea
                    placeholder={replyTo ? "Write a reply..." : "Share your thoughts on this artifact..."}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {replyTo && <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Replying... <button style={{ background: 'none', color: 'red', padding: 0 }} onClick={() => setReplyTo(null)}>(Cancel)</button></span>}
                    <button onClick={handlePost}>Post Comment</button>
                </div>
            </div>

            <div className="comments-list">
                {comments.map(c => (
                    <div key={c.id} className="comment">
                        <div className="comment-header">
                            <img src={c.avatar} alt="avatar" className="avatar" />
                            <span className="author">{c.author}</span>
                            <span className="date">{new Date(c.date).toLocaleDateString()}</span>
                        </div>
                        <div className="text">{c.text}</div>
                        <span className="reply-link" onClick={() => setReplyTo(c.id)}>Reply</span>

                        {c.replies && c.replies.length > 0 && (
                            <div className="replies">
                                {c.replies.map(r => (
                                    <div key={r.id} className="comment">
                                        <div className="comment-header">
                                            <img src={r.avatar} alt="avatar" className="avatar" />
                                            <span className="author">{r.author}</span>
                                        </div>
                                        <div className="text">{r.text}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
