import React, { useState } from 'react';

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="grid-container">
      <div className="grid-item grid-item1">
        <header>
          <nav className="navbar">
            <div className="logo_name">Logo</div>
            <ul id="navi-List" className={isActive ? 'active' : ''}>
              <li><a href="index.html">Home</a></li>
              <li><a href="info.html">View Events</a></li>
              <li><a href="about.html">Sign up</a></li>
              <li><a href="contact.html">Add Events</a></li>
            </ul>

            <div className="menu" id="toggle-Button" onClick={toggleMenu}>
              <div className="menu-line"></div>
              <div className="menu-line"></div>
              <div className="menu-line"></div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}
