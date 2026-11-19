import './Favorites.css'
import GoodsGrid from "../../components/GoodGreed/GoodGreed.jsx";
import useShop from "../../context/useShop.js";
import Loading from "../../components/Loading/Loading.jsx";

function Favorites() {
  const {goods, favorites, loadingFavorites} = useShop();

  if (loadingFavorites) {
    return <Loading size={320} text={'Загрузка избранного...'}/>
  }

  const favoritesGoods = goods.filter((item) => favorites.includes(item.id));

  return (
    <div className='favorites'>
      <h1 className='text text_type_main-large text_color_secondary favorites__title'>Избранное</h1>
      {favorites.length === 0 ?
        <p className='text text_type_main-default text_color_primary'>В избранном пока пусто(</p> :
        <GoodsGrid goods={favoritesGoods} />
      }
    </div>
  )
}


export default Favorites;