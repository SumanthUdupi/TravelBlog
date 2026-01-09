import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <NavLink to="/">The Æsthetic</NavLink>
        </div>
        <nav>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
