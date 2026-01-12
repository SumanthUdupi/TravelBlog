import React, { useState, useEffect } from 'react';
import HybridEditor from '../components/Editor/HybridEditor';
import AssetManager from '../components/Editor/AssetManager';
import Linter from '../components/Editor/Linter';
import '../styles/pages/editor.css';

const PostEditor = () => {
    const [content, setContent] = useState(() => {
        return localStorage.getItem('draft_post') || '# New Story\n\nStart writing...';
    });
    const [showAssets, setShowAssets] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);

    // Auto-Save
    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('draft_post', content);
            setLastSaved(new Date());
        }, 1000);
        return () => clearTimeout(timer);
    }, [content]);

    return (
        <div className="editor-layout">
            <style>{`
                .editor-layout {
                    display: grid;
                    grid-template-columns: 3fr 1fr;
                    height: 100vh;
                    background: var(--color-surface-100);
                    color: var(--color-text-main);
                }
                .editor-main {
                    padding: var(--space-xl);
                    overflow-y: auto;
                    border-right: 1px solid var(--glass-border);
                }
                .editor-sidebar {
                    background: var(--color-surface-200);
                    padding: var(--space-md);
                    border-left: 1px solid var(--glass-border);
                }
                .editor-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: var(--space-lg);
                }
            `}</style>

            <main className="editor-main">
                <div className="editor-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button className="btn-secondary" onClick={() => setShowAssets(!showAssets)}>
                            {showAssets ? 'Hide Assets' : 'Show Assets'}
                        </button>
                        {lastSaved && <span style={{ fontSize: '0.8rem', color: '#888' }}>Saved {lastSaved.toLocaleTimeString()}</span>}
                    </div>
                    <button className="btn-primary">Publish</button>
                </div>

                <HybridEditor content={content} onChange={setContent} />
            </main>

            <aside className="editor-sidebar">
                {showAssets ? (
                    <AssetManager />
                ) : (
                    <Linter content={content} />
                )}
            </aside>
        </div>
    );
};

export default PostEditor;
