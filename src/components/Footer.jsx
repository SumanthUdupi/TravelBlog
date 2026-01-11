import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container footer-content">
        {/* Brand Column */}
        <div className="footer-brand">
          <h2>THE ÆSTHETIC</h2>
          <p>
            An exploration of ancient wisdom through digital craftsmanship.
            Where philosophy meets future.
          </p>
        </div>

        {/* Links Column 1 */}
        <div>
          <h3 className="footer-heading">Explore</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Journal</Link></li>
            <li><Link to="/about">Philosophy</Link></li>
            <li><Link to="/archive">Archives</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h3 className="footer-heading">Connect</h3>
          <ul className="footer-links">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter/X</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="#">RSS Feed</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footer-newsletter">
          <h3 className="footer-heading">Join the Odyssey</h3>
          <p>Receive weekly insights into the intersection of ancient history and modern design.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} The Æsthetic. All rights reserved.</p>
        <p>Designed with Intent in 2026.</p>
      </div>
    </footer>
  );
};

export default Footer;
