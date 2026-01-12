import React, { useEffect, useState } from 'react';

const StickySidebar = ({ sections = [] }) => {
    // sections format: [{ id: 'intro', label: 'Introduction' }, ...]
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -50% 0px', // Trigger when section is in the middle
                threshold: 0.1
            }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sections]);

    if (!sections.length) return null;

    return (
        <nav className="sticky-toc" aria-label="Table of Contents">
            <style>{`
                .sticky-toc {
                    padding-left: var(--space-md);
                    border-left: 1px solid rgba(0,0,0,0.1);
                    margin-top: var(--space-xl);
                }
                .toc-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: var(--space-sm);
                    color: var(--color-text-muted);
                    font-family: var(--font-ui);
                    font-size: var(--text-sm);
                    transition: all 0.3s ease;
                    text-decoration: none;
                    cursor: pointer;
                }
                .toc-dot {
                    width: 6px;
                    height: 6px;
                    background: currentColor;
                    border-radius: 50%;
                    margin-right: var(--space-sm);
                    transition: all 0.3s var(--ease-elastic);
                }
                .toc-item:hover, .toc-item.active {
                    color: var(--color-accent);
                    transform: translateX(5px);
                }
                .toc-item.active .toc-dot {
                    background: var(--color-accent);
                    box-shadow: 0 0 10px var(--color-accent-glow);
                    transform: scale(1.5);
                }
            `}</style>

            {sections.map((section) => (
                <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`toc-item ${activeId === section.id ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <span className="toc-dot"></span>
                    {section.label}
                </a>
            ))}
        </nav>
    );
};

export default StickySidebar;
