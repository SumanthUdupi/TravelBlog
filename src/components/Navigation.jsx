import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIdentity } from '../context/hooks';
import '../styles/components/navigation.css';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { user } = useIdentity();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <nav className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-content">
                <Link to="/" className="nav-logo">
                    Imperial Tech
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links">
                    <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>
                        Journal
                    </Link>
                    <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
                        Philosophy
                    </Link>
                    <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                        Contact
                    </Link>
                    {user ? (
                        <div className="nav-profile-badge" title={user.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img src={user.avatar} alt={user.name} style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid var(--color-accent)' }} />
                            <span style={{ fontSize: '0.8rem' }}>{user.name.split(' ')[0]}</span>
                        </div>
                    ) : (
                        <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>Guest</span>
                    )}
                </div>

                {/* Mobile Bottom Bar (Replaces Top Hamburger) */}
                <div className="mobile-bottom-bar">
                    <Link to="/" className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        <span>Home</span>
                    </Link>
                    <Link to="/blog" className={`bottom-nav-item ${location.pathname.startsWith('/blog') ? 'active' : ''}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                        <span>Journal</span>
                    </Link>
                    <button className="bottom-nav-item" onClick={() => {/* Placeholder for Search */ }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        <span>Search</span>
                    </button>
                    <button
                        className={`bottom-nav-item ${isMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                        <span>Menu</span>
                    </button>
                </div>

                {/* Mobile Overlay (Triggered by Bottom Bar Menu) */}
                <div
                    className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
                    aria-hidden={!isMenuOpen}
                    style={{ visibility: isMenuOpen ? 'visible' : 'hidden' }}
                >
                    <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Journal</Link>
                    <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>Philosophy</Link>
                    <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
