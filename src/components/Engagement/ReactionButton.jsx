import React, { useState, useEffect } from 'react';

const ReactionButton = ({ slug }) => {
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        // Load initial state
        const storedLikes = localStorage.getItem(`likes_${slug}`) || 0;
        const userLiked = localStorage.getItem(`has_liked_${slug}`) === 'true';
        setLikes(parseInt(storedLikes, 10));
        setHasLiked(userLiked);
    }, [slug]);

    const handleLike = () => {
        if (hasLiked) return; // Prevent double liking for now

        const newLikes = likes + 1;
        setLikes(newLikes);
        setHasLiked(true);
        setAnimating(true);

        localStorage.setItem(`likes_${slug}`, newLikes);
        localStorage.setItem(`has_liked_${slug}`, 'true');

        setTimeout(() => setAnimating(false), 1000);
    };

    return (
        <button
            className={`reaction-btn ${hasLiked ? 'liked' : ''} ${animating ? 'animating' : ''}`}
            onClick={handleLike}
            aria-label="Like this article"
            disabled={hasLiked}
        >
            <style>{`
                .reaction-btn {
                    background: transparent;
                    border: 1px solid var(--glass-border);
                    border-radius: 30px;
                    padding: 8px 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    color: var(--color-text-muted);
                    font-family: var(--font-ui);
                    position: relative;
                    overflow: hidden;
                }
                .reaction-btn:hover {
                    border-color: var(--color-accent);
                    background: rgba(212, 175, 55, 0.05);
                }
                .reaction-btn.liked {
                    border-color: var(--color-accent);
                    color: var(--color-accent);
                    background: rgba(212, 175, 55, 0.1);
                }
                .icon { font-size: 1.2rem; transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                
                .reaction-btn:hover .icon { transform: scale(1.2); }
                .reaction-btn.liked .icon { transform: scale(1); }

                /* Explosion Animation */
                .confetti {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 4px;
                    height: 4px;
                    background: var(--color-accent);
                    border-radius: 50%;
                    opacity: 0;
                }
                .animating .confetti { animation: explode 0.6s ease-out forwards; }

                @keyframes explode {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
                }
            `}</style>

            <span className="icon">{hasLiked ? '❤️' : '🤍'}</span>
            <span>{likes > 0 ? likes : 'Like'}</span>

            {/* Simple Particle effects */}
            {animating && [...Array(8)].map((_, i) => (
                <div key={i} className="confetti" style={{
                    '--dx': `${Math.cos(i * 45 * Math.PI / 180) * 30}px`,
                    '--dy': `${Math.sin(i * 45 * Math.PI / 180) * 30}px`
                }}></div>
            ))}
        </button>
    );
};

export default ReactionButton;
