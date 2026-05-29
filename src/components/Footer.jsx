import { FaGithub, FaInstagram, FaFilm } from "react-icons/fa";

import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <FaFilm className="footer-logo" />

        <h2>OneMovie</h2>

        <p>“Enjoy the movie and forget you problems for a while ”</p>
      </div>

      <div className="footer-socials">
        <a href="https://github.com/wannn-sion95" target="_blank">
          <FaGithub />
        </a>

        <a href="https://www.instagram.com/wannn_sion/" target="_blank">
          <FaInstagram />
        </a>
      </div>

      <div className="footer-bottom">
        <p>© 2026 OneMovie. Build by Wannn Sion</p>
      </div>
    </footer>
  );
}

export default Footer;
