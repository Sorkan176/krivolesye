import './Good.css'
import {useParams} from "react-router-dom";
import PictureRoundabout from "../../components/PictureRoundabout/PictureRoundabout.jsx";
import useShop from "../../context/useShop.js";
import CartButton from "../../components/CartButton/CartButton.jsx";
import LikeButton from "../../components/LikeButton/LikeButton.jsx";
import NotFound404 from "../not-found-404/notFound404.jsx";
import Loading from "../../components/Loading/Loading.jsx";


function Good() {
  const { id} = useParams();
  const { goods, loadingGoods } = useShop();

  if (loadingGoods)
    return <Loading size={300} />

  const good = goods.find((good) => String(good.id) === id);

  if (good === undefined)
    return <NotFound404 notFoundText={'Товар заплутал в лесу'} />;


  return(<div className='good-container'>
    <PictureRoundabout images={good.images}/>
    <div className='good-description-container'>
      <section className='good__description'>
        <h2 className='good__title text text_type_main-medium'>{good.title}</h2>
        <p className='good__price text text_type_digits-medium'>{good.price}₽</p>
        <div className='good__actions'>
          <LikeButton goodId={good.id} />
          <CartButton good={good}/>
        </div>
      </section>
    </div>
  </div>)
}

export default Good;