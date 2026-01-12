import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIdentity } from '../context/IdentityContext';
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

                {/* Mobile Toggle */}
                <button
                    className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                    aria-expanded={isMenuOpen}
                >
                    <div className="hamburger"></div>
                </button>

                {/* Mobile Overlay */}
                <div
                    className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
                    aria-hidden={!isMenuOpen}
                    style={{ visibility: isMenuOpen ? 'visible' : 'hidden' }}
                >
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/blog" className="nav-link">Journal</Link>
                    <Link to="/about" className="nav-link">Philosophy</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
