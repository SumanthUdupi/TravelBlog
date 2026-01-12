import React, { useState, useEffect, useRef } from 'react';

const ShareTooltip = () => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [selectedText, setSelectedText] = useState('');
    const tooltipRef = useRef(null);

    useEffect(() => {
        const handleSelection = () => {
            const selection = window.getSelection();

            if (!tooltipRef.current) return;

            if (selection.isCollapsed || selection.toString().trim().length === 0) {
                setVisible(false);
                return;
            }

            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Only show if selection is within a post body (simple heuristic)
            if (!range.commonAncestorContainer.parentElement.closest('.post-body')) {
                setVisible(false);
                return;
            }

            setSelectedText(selection.toString());

            // Calculate position centered above selection
            const top = rect.top + window.scrollY - 50;
            const left = rect.left + window.scrollX + (rect.width / 2);

            setPosition({ top, left });
            setVisible(true);
        };

        document.addEventListener('selectionchange', handleSelection);
        return () => document.removeEventListener('selectionchange', handleSelection);
    }, []);

    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `"${selectedText}"`;
        let shareUrl = '';

        if (platform === 'twitter') {
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(`"${selectedText}" - ${url}`);
            setVisible(false);
            alert('Quote copied to clipboard!');
            return;
        }

        if (shareUrl) window.open(shareUrl, '_blank');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            ref={tooltipRef}
            className="share-tooltip"
            style={{
                position: 'absolute',
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: 'translateX(-50%)',
                zIndex: 1000
            }}
        >
            <style>{`
                .share-tooltip {
                    background: var(--color-primary);
                    color: var(--color-text-invert);
                    padding: 8px 12px;
                    border-radius: 4px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    display: flex;
                    gap: 8px;
                    animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .share-tooltip::after {
                    content: '';
                    position: absolute;
                    bottom: -6px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 6px 6px 0;
                    border-style: solid;
                    border-color: var(--color-primary) transparent transparent transparent;
                }
                .share-btn {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 0.9rem;
                    font-family: var(--font-ui);
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    opacity: 0.8;
                    transition: opacity 0.2s;
                }
                .share-btn:hover { opacity: 1; }
                @keyframes popIn {
                    from { transform: translateX(-50%) scale(0.8); opacity: 0; }
                    to { transform: translateX(-50%) scale(1); opacity: 1; }
                }
            `}</style>

            <button className="share-btn" onClick={() => handleShare('twitter')}>
                <span>𝕏</span> Tweet
            </button>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }}></div>
            <button className="share-btn" onClick={() => handleShare('copy')}>
                Copy
            </button>
        </div>
    );
};

export default ShareTooltip;
