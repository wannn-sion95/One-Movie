import {
  FaFilm,
  FaHeart,
  FaHome,
  FaTv,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <FaFilm className="logo-icon" />
          <span>OneMovie</span>
        </Link>

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
            className={`nav-link ${location.pathname === "/shows" ? "active" : ""}`}
          >
            <FaTv />
            <span>Shows</span>
          </Link>
          <Link
            to="/favorites"
            className={`nav-link ${location.pathname === "/favorites" ? "active" : ""}`}
          >
            <FaHeart />
            <span>Favorites</span>
          </Link>
        </div>
      </div>

      {/* KANAN: SEARCH BAR, NOTIFIKASI, & PROFILE */}
      <div className="navbar-right">
        <form
          onSubmit={handleSearchSubmit}
          className={`search-box ${isSearchOpen ? "active" : ""}`}
        >
          <button
            type="button"
            className="search-icon-btn"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <FaSearch />
          </button>

          <input
            type="text"
            placeholder="Titles, people, genres"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search-input"
            ref={(input) => isSearchOpen && input && input.focus()}
          />
        </form>

        {/* 2. ICON NOTIFIKASI */}
        <button className="notification-btn">
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        {/* USER PROFILE AVATAR ) */}
        <div
          className="navbar-profile"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="User Avatar"
            className="profile-avatar"
          />
          <span className={`dropdown-caret ${isDropdownOpen ? "open" : ""}`}>
            ▼
          </span>

          {isDropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-arrow"></div>
              <ul className="dropdown-list">
                <li>
                  <Link to="/account">Account</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <div className="dropdown-divider"></div>
                <li>
                  <Link to="/logout" className="logout-link">
                    Sign Out of OneMovie
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
