import GoodsGrid from "../../components/GoodGreed/GoodGreed.jsx";
import useShop from "../../context/useShop.js";
import Loading from "../../components/Loading/Loading.jsx";

function Favorites() {
  const {goods, favorites, loadingFavorites} = useShop();

  if (loadingFavorites) {
    return <Loading size={320} text={'Загрузка избранного...'}/>
  }

  if (favorites.length === 0) {
    return <p>В избранном пока пусто(</p>
  }

  const favoritesGoods = goods.filter((item) => favorites.includes(item.id));

  return (
    <>
      <GoodsGrid goods={favoritesGoods} />
    </>
  )
}


export default Favorites;