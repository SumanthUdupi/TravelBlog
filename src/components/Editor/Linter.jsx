import React, { useMemo } from 'react';

const Linter = ({ content }) => {
    const stats = useMemo(() => {
        const words = content.trim().split(/\s+/).length;
        const chars = content.length;
        const sentences = content.split(/[.!?]+/).length - 1;
        const readTime = Math.ceil(words / 200);

        // Passive voice detection (very basic)
        const passiveMatches = (content.match(/\b(am|is|are|was|were|be|been|being)\s+\w+ed\b/gi) || []).length;

        // SEO Checks
        const h1Count = (content.match(/^# /gm) || []).length;

        const keyword = 'travel'; // Mock keyword for now, could be prop
        const keywordDensity = ((content.toLowerCase().match(new RegExp(keyword, 'g')) || []).length / words * 100).toFixed(1);

        return { words, chars, sentences, readTime, passiveMatches, h1Count, keywordDensity };
    }, [content]);

    return (
        <div className="linter-panel">
            <style>{`
                .linter-panel {
                    font-family: var(--font-ui);
                }
                .stat-card {
                    background: var(--color-surface-100);
                    padding: var(--space-sm);
                    margin-bottom: var(--space-sm);
                    border-radius: var(--border-radius-sm);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
                .stat-value {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: var(--color-primary);
                }
                .stat-label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    color: var(--color-text-muted);
                }
                .warning { border-left: 3px solid #ff4444; }
                .good { border-left: 3px solid #00C851; }
             `}</style>

            <h3>Writing Assistant</h3>

            <div className="stat-card">
                <div className="stat-value">{stats.words}</div>
                <div className="stat-label">Words</div>
            </div>

            <div className="stat-card">
                <div className="stat-value">{stats.readTime} min</div>
                <div className="stat-label">Read Time</div>
            </div>

            <div className={`stat-card ${stats.passiveMatches > 0 ? 'warning' : 'good'}`}>
                <div className="stat-value">{stats.passiveMatches}</div>
                <div className="stat-label">Passive Voice</div>
            </div>

            <h4 style={{ marginTop: 'var(--space-md)' }}>SEO Score</h4>

            <div className={`stat-card ${stats.h1Count === 1 ? 'good' : 'warning'}`}>
                <div className="stat-value">{stats.h1Count}</div>
                <div className="stat-label">H1 Tags (Target: 1)</div>
            </div>

            <div className="stat-card">
                <div className="stat-value">{stats.keywordDensity}%</div>
                <div className="stat-label">Keyword Density</div>
            </div>
        </div>
    );
};

export default Linter;
