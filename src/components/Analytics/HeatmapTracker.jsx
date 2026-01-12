import React, { useEffect, useState } from 'react';

const HeatmapTracker = () => {
    // Mock heatmap visualization for Admin/Editor only
    const [scrollDepth, setScrollDepth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollDepth(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Only show if explicitly toggled or for demo purposes (hidden by default to not annoy user)
    // For this implementation, we will show a subtle indicator on the far right
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '5px',
            height: '100vh',
            zIndex: 9998,
            pointerEvents: 'none',
            opacity: 0.5
        }}>
            <div style={{
                height: '100%',
                background: 'linear-gradient(to bottom, #2d8a56 0%, #d4af37 50%, #d45e5e 100%)',
                opacity: 0.3
            }}></div>
            {/* Current Position Indicator */}
            <div style={{
                position: 'absolute',
                top: `${scrollDepth}%`,
                right: 0,
                width: '10px',
                height: '2px',
                background: 'red',
                boxShadow: '0 0 4px red'
            }}></div>
        </div>
    );
};

export default HeatmapTracker;
