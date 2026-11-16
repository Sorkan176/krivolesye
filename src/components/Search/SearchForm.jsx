import './SearchForm.css'
import {useSearchStore} from "../../store.js";
import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

function SearchForm() {
  const visible = useSearchStore((s) => s.visible);
  const hide = useSearchStore((s) => s.hide);

  const [query, setQuery] = useState('');

  const inputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/search') return;

    hide();
    setQuery('');
  }, [location.pathname]);

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const searchQuery = query.trim();

    if (!searchQuery) return;

    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  if (!visible) return null;

  return (
    <div className={`search-container ${visible ? '' : 'search_hidden'}`}>
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          name='search'
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Что ищем, путник?"
          className="search__input text text_type_main-default"
        />
        <button type="submit" className="button search__button">
          <span className='text text_type_main-default_bold'>Поиск</span>
        </button>
      </form>
    </div>
  );
}


export default SearchForm;