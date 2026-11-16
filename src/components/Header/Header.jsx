import './Header.css'
import {
  IoSearch,
  IoHeartOutline,
  IoCart,
  IoMenu,
  IoClose,
} from 'react-icons/io5';
import {Link} from "react-router-dom";
import {useSearchStore} from "../../store.js";
import {useEffect, useRef, useState} from "react";


function Header() {
  const toggle = useSearchStore((s) => s.toggle);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className='header__container'>
        <div className='header__logo'>
          <Link to='/' className='logo__link'>
            <h1 className='logo__text'>
              Криволесье
            </h1>
          </Link>
        </div>
        <nav className="header__nav" ref={menuRef}>
          <ul className="sitemap">

            <li>
              <button
                type={'button'}
                className="sitemap__section button sitemap__button"
                onClick={toggle}
              >
                <IoSearch className="sitemap__title"/>
              </button>
            </li>

            <li className="sitemap__desktop">
              <Link
                to={'/goods'}
                className='sitemap__section'
              >
                <span className="text text_type_main-small sitemap__title">Каталог</span>
              </Link>
            </li>

            <li className="sitemap__desktop">
              <Link
                to={'/favorites'}
                className='sitemap__section'
              >
                <IoHeartOutline className="sitemap__title"/>
              </Link>
            </li>

            <li className="sitemap__desktop">
              <Link
                to={'/cart'}
                className='sitemap__section'
              >
                <IoCart className="sitemap__title"/>
              </Link>
            </li>

            <li className="sitemap__desktop">
              <Link
                to={'/profile'}
                className='sitemap__section sitemap__profile'
              >
                <span className="sitemap__image"></span>
              </Link>
            </li>

            <li className="sitemap__mobile">
              <button
                type={'button'}
                className="sitemap__section button sitemap__button sitemap__button_menu"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <IoClose className="sitemap__title"/> : <IoMenu className="sitemap__title"/>}
              </button>

              {/* Выпадающее меню */}
              <ul className={`sitemap__dropdown ${isMenuOpen ? 'sitemap__dropdown_open' : ''}`}>

                <li className="sitemap-dropdown__item">
                  <Link
                    to={'/profile'}
                    className='sitemap-dropdown__link'
                    onClick={() => {
                      closeMenu();
                    }}>
                    Профиль
                  </Link>
                </li>

                <li className="sitemap-dropdown__item">
                  <Link
                    to={'/goods'}
                    className='sitemap-dropdown__link'
                    onClick={() => {
                      closeMenu();
                    }}>
                    Каталог
                  </Link>
                </li>

                <li className="sitemap-dropdown__item">
                  <Link
                    to={'/favorites'}
                    className='sitemap-dropdown__link'
                    onClick={() => {
                    closeMenu();
                  }}>
                    Избранное
                  </Link>
                </li>

                <li className="sitemap-dropdown__item">
                  <Link
                    to={'/cart'}
                    className='sitemap-dropdown__link'
                    onClick={() => {
                    closeMenu();
                  }}>
                    Корзина
                  </Link>
                </li>
              </ul>
            </li>

          </ul>
        </nav>
        <svg
          className="header__wave"
          viewBox="0 0 2000 75"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className='header__wave_fill'
            d="M0 0H2000V45.7698C2000 45.7698 1892.37 63.9242 1820.83 63.7508C1739.67 63.554 1699.86 34.3647 1619.44 39.5582C1566.66 42.9674 1545.4 59.0542 1493.06 63.7508C1401.83 71.9369 1351.16 47.0838 1258.33 45.7698C1172.31 44.5522 1124.93 54.5348 1038.89 55.2507C932.306 56.1374 873.06 42.6479 766.667 45.7698C652.691 49.1142 594.016 80.3089 480.556 74.2125C406.425 70.2293 373.809 47.6559 299.306 45.7698C226.808 43.9345 189.543 67.4253 117.361 63.7508C69.442 61.3114 0 45.7698 0 45.7698V0Z"/>
        </svg>
      </div>
    </header>)
}

export default Header;