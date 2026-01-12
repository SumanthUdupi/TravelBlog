import React, { useState } from 'react';

const ImageOptimizer = ({ src, alt, style, className }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`img-optimizer-wrapper ${className || ''}`} style={{ position: 'relative', overflow: 'hidden', ...style }}>
            {/* Blur Placeholder */}
            {!loaded && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'var(--color-surface-300)',
                    filter: 'blur(10px)',
                    transition: 'opacity 0.5s',
                    zIndex: 1
                }}></div>
            )}

            {/* Actual Image */}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    position: 'relative',
                    zIndex: 2
                }}
                loading="lazy"
            />

            {/* Tech Label (Mocking generic server-side optimization) */}
            <div style={{
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                fontSize: '8px',
                padding: '2px 4px',
                borderRadius: '2px',
                pointerEvents: 'none',
                zIndex: 3,
                fontFamily: 'monospace'
            }}>
                WEBP
            </div>
        </div>
    );
};

export default ImageOptimizer;
