import React, { useRef } from 'react';

const MagneticButton = ({ children, onClick, style }) => {
    const btnRef = useRef(null);

    const handleMouseMove = (e) => {
        const btn = btnRef.current;
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.setProperty('--x', `${x * 0.5}px`);
        btn.style.setProperty('--y', `${y * 0.5}px`);
    };

    const handleMouseLeave = () => {
        const btn = btnRef.current;
        if (!btn) return;
        btn.style.setProperty('--x', '0px');
        btn.style.setProperty('--y', '0px');
    };

    return (
        <button
            ref={btnRef}
            className="magnetic-btn"
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                ...style,
                position: 'relative',
                transform: 'translate(var(--x), var(--y))',
                transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)', // Custom spring ease
                cursor: 'pointer',
                overflow: 'hidden'
            }}
        >
            <span style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
                {children}
            </span>
            {/* Glow Effect */}
            <div style={{
                position: 'absolute',
                top: 'var(--y)',
                left: 'var(--x)',
                transform: 'translate(-50%, -50%)',
                width: '150%',
                height: '150%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                pointerEvents: 'none',
                transition: 'top 0.1s, left 0.1s'
            }}></div>
        </button>
    );
};

export default MagneticButton;
