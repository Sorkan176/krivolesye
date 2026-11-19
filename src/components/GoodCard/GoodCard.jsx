import './GoodCard.css'
import {useNavigate} from "react-router-dom";
import CartButton from "../CartButton/CartButton.jsx";
import LikeButton from "../LikeButton/LikeButton.jsx";
import {useState} from "react";


function GoodCard({good}) {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  function onGoodClick(event, id) {
    navigate(`/good/${id}`);
  }

  return (
    <div className="good-card">
      <>
        {!isImageLoaded && !imageError && (
          <div className="good-card__img_loading" />
        )}

        {!imageError && (
          <img
            className={`good-card__img`}
            src={good.images[0]?.src}
            alt={good.images[0]?.alt || good.title}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setImageError(true)}
            onClick={(e) => onGoodClick(e, good.id)}
          />
        )}

        {imageError && (
          <div className="good-card__img_error"
               onClick={(e) => onGoodClick(e, good.id)}>
            <p className='text text_type_main-default'>Что-то пошло не так и мы не смогли загрузить картинку</p>
          </div>
        )}
      </>

      {/*<img className='good-card__img' src={good.images[0]?.src} alt={good.images[0]?.alt || good.title}*/}
      {/*     onClick={(e) => onGoodClick(e, good.id)}/>*/}
      <div className='good-card__text '>
        <h3 className='text text_type_digits-medium good-card__price'>{good.price}₽</h3>
        <h4 className='text text_type_main-default good-card__title'>{good.title}</h4>
      </div>

      {/* Разделитель и кнопки */}
      <div className="good-card__actions">
        <LikeButton goodId={good.id}/>
        <CartButton good={good}/>
      </div>
    </div>
  );
}

export default GoodCard;