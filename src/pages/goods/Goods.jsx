import GoodsGrid from "../../components/GoodGreed/GoodGreed.jsx";
import Options from "../../components/Options/Options.jsx";
import {useMemo, useState} from "react";
import useShop from "../../context/useShop.js";
import Loading from "../../components/Loading/Loading.jsx";


function Goods() {
  const {
    goods,
    loadingGoods,
    goodsError,
  } = useShop();

  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [selectedFandoms, setSelectedFandoms] = useState(['all']);
  const [sortBy, setSortBy] = useState('');

  const filteredGoods = useMemo(() => {
    return goods.filter((good) => {
      const categoryMatch =
        selectedCategories.includes('all') ||
        selectedCategories.includes(good.category);

      const fandomMatch =
        selectedFandoms.includes('all') ||
        selectedFandoms.includes(good.fandom);

      return categoryMatch && fandomMatch;
    });
  }, [goods, selectedCategories, selectedFandoms]);


  if (sortBy.length > 0) {
    switch (sortBy) {
      case 'name-asc':
        filteredGoods.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filteredGoods.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'price-asc':
        filteredGoods.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredGoods.sort((a, b) => b.price - a.price);
        break;
      default:

    }
  }

  return (
    <>
      <Options
        selectedCategories={selectedCategories}
        selectedFandoms={selectedFandoms}
        setSelectedCategories={setSelectedCategories}
        setSelectedFandoms={setSelectedFandoms}
        sortBy={sortBy}
        setSortBy={setSortBy}/>
      {
        loadingGoods ? <Loading size={320} text={'Загрузка товаров...'}/> :
          goodsError ? <p>Ошибка: {goodsError}</p> :
            <GoodsGrid goods={filteredGoods} />
      }
    </>
  )
}


export default Goods;