import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="main-page">
        <nav id="navbar">

          <ul>
          
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
          
            <li>
              <Link to="/bookmarks">Bookmarks</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;