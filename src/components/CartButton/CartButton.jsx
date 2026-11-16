import './CartButton.css'
import CartIcon from "../CartIcon/CartIcon.jsx";
import useShop from "../../context/useShop.js";

function CartButton({ good }) {
  const {
    cart,
    addToCart,
    changeQuantity,
  } = useShop();

  const goodInCart = cart.find((item) => item.id === good.id);

  const handleChangeQuantity = async (goodId, quantity) => {
    try {
      await changeQuantity(goodId, quantity);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (good) => {
    try {
      await addToCart(good);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {goodInCart ?
        <div className="cart-add-good__button">
          <button type="button"
                  className='text text_type_digits-small cart-add-good__button_minus'
                  onClick={() => handleChangeQuantity(goodInCart.id, goodInCart.quantity-1)}>-</button>
          <p className='text text_type_digits-default'>{goodInCart.quantity}</p>
          <button type="button"
                  className='text text_type_digits-small cart-add-good__button_plus'
                  onClick={() => handleChangeQuantity(goodInCart.id, goodInCart.quantity+1)}>+</button>
        </div> :
        <button type="button"
                className="button cart-add-good__button"
                aria-label="В корзину"
                onClick={() => handleAddToCart(good)}>
          <CartIcon/>
        </button>
    }
    </>
  )
}

export default CartButton;