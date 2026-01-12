import React, { useState, useEffect } from 'react';

const OfflineBanner = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            background: 'var(--color-accent)',
            color: '#fff',
            textAlign: 'center',
            padding: '0.5rem',
            zIndex: 10000,
            fontFamily: 'var(--font-ui)',
            fontWeight: 'bold',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
            You are currently reading offline. Content is saved locally.
        </div>
    );
};

export default OfflineBanner;
