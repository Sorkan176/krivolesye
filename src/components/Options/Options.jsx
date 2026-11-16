import './Options.css'
import { FaFilter } from "react-icons/fa6";
import { FaSort } from "react-icons/fa";
import { GiCottonFlower } from "react-icons/gi";
import { FaToriiGate } from "react-icons/fa";
import { GiTargetPoster } from "react-icons/gi";
import { GiWrappingStar } from "react-icons/gi";
import { useState } from "react";

const categories = [
  { value: 'all',      label: 'Все',         Icon: GiCottonFlower },
  { value: 'stickers', label: 'Стикеры',     Icon: GiCottonFlower },
  { value: 'pins',   label: 'Значки',      Icon: FaToriiGate },
  { value: 'keychains',  label: 'Брелоки',       Icon: GiWrappingStar },
  { value: 'cards',  label: 'Открытки',     Icon: GiTargetPoster },
  { value: 'lamps',    label: 'Светильники', Icon: GiCottonFlower },
];

const fandoms = [
  { value: 'all',      label: 'Всё',        Icon: GiCottonFlower },
  { value: 'origin',   label: 'Ориджинал',  Icon: GiCottonFlower },
  { value: 'one piece', label: 'One Piece',  Icon: GiCottonFlower },
];

function Options({
                   selectedCategories,
                   selectedFandoms,
                   setSelectedCategories,
                   setSelectedFandoms,
                   sortBy,
                   setSortBy}
) {
  const [hiddenFilter, setHiddenFilter] = useState(true);
  const [hiddenSort, setHiddenSort] = useState(true);

  const handleCheckboxChange = (value, setter) => {
    setter((prev) => {
      if (value === 'all') {
        return ['all'];
      }
      const filtered = prev.filter((item) => item !== 'all');
      if (filtered.includes(value)) {
        const next = filtered.filter((item) => item !== value);
        return next.length === 0 ? ['all'] : next;
      }
      return [...filtered, value];
    });
  };

  return(
    <div className='options-container'>
      <div className='option-lantern'></div>
      <div className="options__filter filter">
        <button type='button'
                className='button options__hide-button'
                onClick={() => setHiddenFilter(prev => !prev)}>
          <h2 className="options__title text text_type_main-default_bold">
            <FaFilter className="filter__icon option__icon"/>
            Категории
          </h2>
        </button>
        <div className={`filter-container ${hiddenFilter ? 'container_hidden' : ''}`}>
          <form className="filter__form">
            <fieldset className="filter__fieldset">
            <legend className="filter__type text text_type_main-default">Выберите тип</legend>

              <div className="filter__rows">
                {categories.map(({value, label, Icon}) => (
                  <label key={value} className="filter-checkbox">
                    <input
                      className='filter-checkbox__input'
                      type="checkbox"
                      name="filterType"
                      value={value}
                      checked={selectedCategories.includes(value)}
                      onChange={() => handleCheckboxChange(value, setSelectedCategories)}
                    />
                    <span className="filter-checkbox__card">
                    <Icon className="filter-checkbox__icon"/>
                    <span className="filter-checkbox__label">{label}</span>
                  </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="filter__fieldset">
              <legend className='filter__type text text_type_main-default'>Выберите фандом</legend>

              <div className="filter__rows">
                {fandoms.map(({value, label, Icon}) => (
                  <label key={value} className="filter-checkbox">
                    <input
                      className='filter-checkbox__input'
                      type="checkbox"
                      name="filterFandom"
                      value={value}
                      checked={selectedFandoms.includes(value)}
                      onChange={() => handleCheckboxChange(value, setSelectedFandoms)}
                    />
                    <span className="filter-checkbox__card">
                    <Icon className="filter-checkbox__icon"/>
                    <span className="filter-checkbox__label text text_type_main-small">{label}</span>
                  </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </form>
        </div>
      </div>

      <div className="options__sort sort">
        <button type='button'
                className='button options__hide-button'
                onClick={() => setHiddenSort(prev => !prev)}>
          <h2 className='options__title text text_type_main-default_bold'>
            <FaSort className='sort__icon option__icon'/>
            Сортировка
          </h2>
        </button>

          <select name='sort' className={`sort__select text text_type_main-default ${hiddenSort ? 'container_hidden' : ''}`}
                  value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value='' className='sort-option' defaultValue>--Выберите тип--</option>
            <option className='sort-option' value="name-asc">A–Z</option>
            <option className='sort-option' value="name-desc">Z–A</option>
            <option className='sort-option' value="price-asc">По возрастанию цены</option>
            <option className='sort-option' value="price-desc">По убыванию цены</option>
          </select>

      </div>

    </div>
)
}

export default Options;