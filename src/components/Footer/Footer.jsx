import './Footer.css'
import ThemeToggle from "../ThemeToggle/ThemeToggle.jsx";
import {Link} from "react-router-dom";

function Footer() {
  return (<footer className="footer footer_background_image">
    <div className="footer__content">

      <ul className="footer-nav footer__navigation footer-nav_style">
        <li className="footer-nav__item footer__item_theme">
          <ThemeToggle/>
        </li>
        <li className="footer-nav__item">
          <Link className="footer-nav__link" target="_blank" to={"/about"}>About</Link>
        </li>
        <li className="footer-nav__item">
          <Link className="footer-nav__link" target="_blank" to={"/privacy"}>Privacy</Link>
        </li>
        <li className="footer-nav__item">
          <Link className="footer-nav__link" target="_blank" to={"/contact"}>Contact</Link>
        </li>
        <li className="footer-nav__item footer__item_copyright">
          Copyright © Sorkan176, <span lang="ja">あん</span>
        </li>
      </ul>
    </div>
  </footer>)
}


export default Footer;