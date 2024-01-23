import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to='/corporate'>Corporate</Link>
      <Link to='/fashion'>Fashion and Beauty</Link>
      <Link to='/portraits'>Portraits</Link>
      <Link to='/about'>About</Link>
    </nav>
  );
};

export default Navbar;
