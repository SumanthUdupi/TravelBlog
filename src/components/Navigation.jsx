import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/navigation.css';

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <nav className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav-content">
                <Link to="/" className="nav-logo">
                    THE <span>ÆSTHETIC</span>
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        Home
                    </Link>
                    <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>
                        Journal
                    </Link>
                    <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
                        Philosophy
                    </Link>
                    <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                        Contact
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <div className="hamburger"></div>
                </button>

                {/* Mobile Overlay */}
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
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
