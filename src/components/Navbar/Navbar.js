import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>

        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
