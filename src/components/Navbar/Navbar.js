import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className='nav-links'>
      <Link to='/'>
        <img src='CClogotrans.png' alt='logo' width='60' height='60'></img>
      </Link>
      <Link className='link' to='/corporate'>
        Corporate
      </Link>
      <Link className='link' to='/fashion'>
        Fashion and Beauty
      </Link>
      <Link className='link' to='/portraits'>
        Portraits
      </Link>
      <Link className='link' to='/about'>
        About
      </Link>
    </nav>
  );
};

export default Navbar;
