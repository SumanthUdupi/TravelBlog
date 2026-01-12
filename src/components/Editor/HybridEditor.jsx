import React, { useRef, useEffect } from 'react';

const HybridEditor = ({ content, onChange }) => {
    const textareaRef = useRef(null);
    const overlayRef = useRef(null);

    const handleChange = (e) => {
        onChange(e.target.value);
        syncScroll();
    };

    const syncScroll = () => {
        if (textareaRef.current && overlayRef.current) {
            overlayRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    // Simple syntax highlighter
    const getHighlightedText = (text) => {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/^# (.*$)/gm, '<span class="md-h1"># $1</span>')
            .replace(/^## (.*$)/gm, '<span class="md-h2">## $1</span>')
            .replace(/\*\*(.*?)\*\*/g, '<span class="md-bold">**$1**</span>')
            .replace(/\*(.*?)\*/g, '<span class="md-italic">*$1*</span>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<span class="md-link">[$1]($2)</span>')
            .replace(/\n/g, '<br/>');
    };

    return (
        <div className="hybrid-editor-container">
            <style>{`
                .hybrid-editor-container {
                    position: relative;
                    width: 100%;
                    min-height: 80vh;
                    font-family: 'JetBrains Mono', monospace; 
                    font-size: 1.1rem;
                    line-height: 1.6;
                }
                .editor-textarea, .editor-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    padding: var(--space-lg);
                    margin: 0;
                    border: none;
                    background: transparent;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    overflow: auto;
                    box-sizing: border-box; 
                }
                .editor-textarea {
                    z-index: 2;
                    color: transparent;
                    caret-color: var(--color-text-main);
                    outline: none;
                    resize: none;
                }
                .editor-overlay {
                    z-index: 1;
                    color: var(--color-text-main);
                    pointer-events: none;
                }
                /* Syntax Styles */
                .md-h1 { font-family: var(--font-display); font-size: 2rem; font-weight: 700; color: var(--color-accent); }
                .md-h2 { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; color: var(--color-primary-light); }
                .md-bold { font-weight: 700; color: var(--color-text-main); }
                .md-italic { font-style: italic; opacity: 0.8; }
                .md-link { text-decoration: underline; color: var(--color-primary); }
            `}</style>

            <div
                ref={overlayRef}
                className="editor-overlay"
                dangerouslySetInnerHTML={{ __html: getHighlightedText(content) }}
            />

            <textarea
                ref={textareaRef}
                className="editor-textarea"
                value={content}
                onChange={handleChange}
                onScroll={syncScroll}
                spellCheck="false"
            />
        </div>
    );
};

export default HybridEditor;
