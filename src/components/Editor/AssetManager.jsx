import React, { useState, useEffect, useCallback } from 'react';

// IndexedDB Helper
const DB_NAME = 'TravelBlogAssets';
const STORE_NAME = 'images';

const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

const AssetManager = () => {
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const loadImages = useCallback(async () => {
        const db = await initDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => {
            setImages(request.result.reverse()); // Newest first
        };
    }, []);

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        if (!files.length) return;

        const db = await initDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                store.add({
                    name: file.name,
                    data: reader.result,
                    date: new Date().toISOString()
                });
            };
            reader.readAsDataURL(file);
        });

        tx.oncomplete = () => loadImages();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this image?')) return;
        const db = await initDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(id);
        tx.oncomplete = () => loadImages();
    };

    return (
        <div className="asset-manager">
            <style>{`
                .asset-manager {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .drop-zone {
                    border: 2px dashed var(--glass-border);
                    padding: var(--space-lg);
                    text-align: center;
                    border-radius: var(--border-radius-lg);
                    margin-bottom: var(--space-md);
                    transition: all 0.2s;
                    background: var(--color-surface-100);
                    color: var(--color-text-muted);
                }
                .drop-zone.active {
                    border-color: var(--color-accent);
                    background: rgba(212, 175, 55, 0.1);
                }
                .asset-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: var(--space-sm);
                    overflow-y: auto;
                    flex: 1;
                }
                .asset-item {
                    position: relative;
                    aspect-ratio: 1;
                    border-radius: var(--border-radius-sm);
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    cursor: pointer;
                }
                .asset-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .asset-item:hover .asset-actions {
                    opacity: 1;
                }
                .asset-actions {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(0,0,0,0.7);
                    padding: 4px;
                    display: flex;
                    justify-content: space-between;
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                .asset-btn {
                    color: white;
                    background: none;
                    border: none;
                    font-size: 0.8rem;
                    cursor: pointer;
                }
            `}</style>

            <h3 style={{ marginBottom: '1rem' }}>Media Library</h3>

            <div
                className={`drop-zone ${isDragging ? 'active' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                Drop Images Here
            </div>

            <div className="asset-grid">
                {images.map(img => (
                    <div key={img.id} className="asset-item" title={img.name}>
                        <img src={img.data} alt={img.name} />
                        <div className="asset-actions">
                            <button className="asset-btn" onClick={() => navigator.clipboard.writeText(`![${img.name}](${img.data})`)}>Copy</button>
                            <button className="asset-btn" onClick={() => handleDelete(img.id)}>&times;</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssetManager;
