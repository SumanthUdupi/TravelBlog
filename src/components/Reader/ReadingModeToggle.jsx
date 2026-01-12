import React, { useState, useEffect } from 'react';

const ReadingModeToggle = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleMode = () => {
        setIsActive(!isActive);
        if (!isActive) {
            document.body.classList.add('reading-mode');
        } else {
            document.body.classList.remove('reading-mode');
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            document.body.classList.remove('reading-mode');
        };
    }, []);

    return (
        <button
            onClick={toggleMode}
            className={`glass-panel`}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10000,
                color: 'var(--color-primary)',
                transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            aria-label="Toggle Reading Mode"
            title="Toggle Distraction-Free Reading"
        >
            {isActive ? (
                // X Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            ) : (
                // Book Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            )}
        </button>
    );
};

export default ReadingModeToggle;
