import './Search.css'
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import useShop from "../../context/useShop.js";
import GoodsGrid from "../../components/GoodGreed/GoodGreed.jsx";


function Search() {
  const [searchParams] = useSearchParams();
  const { goods, loadingGoods } = useShop();

  const query = searchParams.get('q')?.trim() ?? '';

  const searchResults = useMemo(() => {
    if (!query) return [];

    const normalizedQuery = query.toLocaleLowerCase();

    return goods.filter((good) => {
      return (
        good.title.toLocaleLowerCase().includes(normalizedQuery) ||
        good.fandom.toLocaleLowerCase().includes(normalizedQuery) ||
        good.category.toLocaleLowerCase().includes(normalizedQuery)
      );
    });
  }, [goods, query]);

  if (loadingGoods) {
    return <p>Загрузка товаров...</p>;
  }

  return (
    <section className="search-page">
      <div className="search-page__text">
        <h2 className="text text_type_main-medium text_color_primary">Результаты поиска</h2>

        {query && (
          <p className="text text_type_main-default text_color_primary">
            По запросу «{query}» найдено: {searchResults.length}
          </p>
        )}

        {!query && (
          <p className="text text_type_main-default text_color_primary">Введите поисковый запрос.</p>
        )}

        {query && searchResults.length === 0 && (
          <p className="text text_type_main-default text_color_primary">По вашему запросу ничего не найдено.</p>
        )}
      </div>

      {searchResults.length > 0 && (
        <GoodsGrid goods={searchResults} />
      )}
    </section>
  );
}

export default Search;