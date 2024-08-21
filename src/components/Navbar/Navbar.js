import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ session, onLogout }) => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isHomepage = location.pathname === "/";

  return (
    <nav className='nav-links'>
      <div className='logo-container'>
        <Link to='/' className='logo-link'>
          <img src='CClogotrans.png' alt='logo' className='logo-image' />
        </Link>
        <div className='logo-text'>
          <p>Creative Capture</p>
          <p>New York</p>
        </div>
      </div>
      <div className='right-links'>
        {/* Conditionally render the contact link or dropdown based on path and screen size */}
        {isHomepage ? (
          <Link className='link' to='/about'>
            Contact
          </Link>
        ) : (
          <>
            <button className='dropdown-toggle' onClick={toggleDropdown}>
              ☰ Categories
            </button>
            <div className={`links-container ${isDropdownOpen ? "open" : ""}`}>
              <Link
                className={`link ${
                  location.pathname === "/corporate" ? "active" : ""
                }`}
                to='/corporate'
                onClick={() => setIsDropdownOpen(false)}
              >
                Business
              </Link>
              <Link
                className={`link ${
                  location.pathname === "/fashion" ? "active" : ""
                }`}
                to='/fashion'
                onClick={() => setIsDropdownOpen(false)}
              >
                Fashion
              </Link>
              <Link
                className={`link ${
                  location.pathname === "/portraits" ? "active" : ""
                }`}
                to='/portraits'
                onClick={() => setIsDropdownOpen(false)}
              >
                Portraits
              </Link>
              <Link
                className={`link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to='/about'
                onClick={() => setIsDropdownOpen(false)}
              >
                Contact
              </Link>
            </div>
          </>
        )}
        {session ? (
          <button className='logoutButton' onClick={onLogout}>
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
