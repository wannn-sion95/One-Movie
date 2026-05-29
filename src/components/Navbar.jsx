import { FaFilm, FaHeart, FaHome, FaTv } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

import "../css/Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* LOGO */}
      <Link to="/" className="navbar-logo">
        <FaFilm />

        <span>OneMovie</span>
      </Link>

      {/* NAV */}
      <div className="navbar-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          <FaHome />

          <span>Home</span>
        </Link>

        <Link
          to="/shows"
          className={`nav-link ${
            location.pathname === "/shows" ? "active" : ""
          }`}
        >
          <FaTv />

          <span>Shows</span>
        </Link>

        <Link
          to="/favorites"
          className={`nav-link ${
            location.pathname === "/favorites" ? "active" : ""
          }`}
        >
          <FaHeart />

          <span>Favorites</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
