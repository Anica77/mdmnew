import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ session, onLogout }) => {
  const location = useLocation();

  return (
    <nav className='nav-links'>
      <div className='logo-container'>
        <Link to='/' className='logo-link'>
          <img src='CClogotrans.png' alt='logo' className='logo-image'></img>
        </Link>
      </div>
      <div className='right-links'>
        {location.pathname === "/" ? (
          <Link
            className={`link ${location.pathname === "/about" ? "active" : ""}`}
            to='/about'
          >
            Contact
          </Link>
        ) : (
          <>
            <Link
              className={`link ${
                location.pathname === "/corporate" ? "active" : ""
              }`}
              to='/corporate'
            >
              Business
            </Link>
            <Link
              className={`link ${
                location.pathname === "/fashion" ? "active" : ""
              }`}
              to='/fashion'
            >
              Fashion and Beauty
            </Link>
            <Link
              className={`link ${
                location.pathname === "/portraits" ? "active" : ""
              }`}
              to='/portraits'
            >
              Portraits
            </Link>
            <Link
              className={`link ${
                location.pathname === "/about" ? "active" : ""
              }`}
              to='/about'
            >
              Contact
            </Link>
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
