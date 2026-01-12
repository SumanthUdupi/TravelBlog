import React, { useState, useEffect } from 'react';

const BookmarkButton = ({ postId }) => {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('bookmarks');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.includes(postId)) setIsSaved(true);
        }
    }, [postId]);

    const toggleSave = (e) => {
        e.stopPropagation(); // Prevent triggering card click
        const saved = localStorage.getItem('bookmarks') || '[]';
        let parsed = JSON.parse(saved);

        if (isSaved) {
            parsed = parsed.filter(id => id !== postId);
        } else {
            parsed.push(postId);
        }

        localStorage.setItem('bookmarks', JSON.stringify(parsed));
        setIsSaved(!isSaved);
    };

    return (
        <button
            onClick={toggleSave}
            aria-label={isSaved ? "Remove from bookmarks" : "Save for later"}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: isSaved ? 'var(--color-accent)' : 'var(--color-text-muted)',
                transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>
    );
};

export default BookmarkButton;
