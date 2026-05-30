import { FaGithub, FaInstagram, FaFilm } from "react-icons/fa";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo-wrapper">
            <FaFilm className="footer-logo-icon" />
            <h2>OneMovie</h2>
          </div>

          <p className="footer-quote">
            “Enjoy the movie and forget your problems for a while.”
          </p>

          <div className="footer-socials">
            <a
              href="https://github.com/wannn-sion95"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/wannn_sion/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Navigation</h3>
          <a href="#">Home</a>
          <a href="#">Shows</a>
          <a href="#">Favorites</a>
        </div>

        <div className="footer-links">
          <h3>Legal & Support</h3>
          <a href="#">Help Center</a>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 OneMovie. Built by Wannn Sion.</p>
      </div>
    </footer>
  );
}

export default Footer;
