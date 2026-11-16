import './Footer.css'
import ThemeToggle from "../ThemeToggle/ThemeToggle.jsx";

function Footer() {
  return (<footer className="footer footer_background_image">
    <div className="footer__content">

      <ul className="footer-nav footer__navigation footer-nav_style">
        <li className="footer-nav__item footer__item_theme">
          <ThemeToggle/>
        </li>
        <li className="footer-nav__item">
          <a className="footer-nav__link" href="/about">About</a>
        </li>
        <li className="footer-nav__item">
          <a className="footer-nav__link" target="_blank" href="/privacy">Privacy</a>
        </li>
        <li className="footer-nav__item">
          <a className="footer-nav__link" href="/contact">Contact</a>
        </li>
        <li className="footer-nav__item footer__item_copyright">
          Copyright © Sorkan176, <span lang="ja">あん</span>
        </li>
      </ul>
    </div>
  </footer>)
}


export default Footer;