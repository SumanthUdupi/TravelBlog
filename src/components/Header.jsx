import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/_header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <NavLink to="/" className="logo">
        THE <span>ÆSTHETIC</span>
      </NavLink>

      <nav className="nav">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Journal</NavLink>
        <NavLink to="/archive" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Archive</NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About</NavLink>
      </nav>

      <div className="header-actions">
        {/* Placeholder for future search/login */}
        <button className="search-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;

