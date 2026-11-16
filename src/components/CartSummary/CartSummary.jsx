import './CartSummary.css'
import {useMemo, useState} from "react";

function CartSummary({
                       cartGoods,
                       currency,
                       onCheckout,
                       onContinueShopping,
                       loading,
                       error
                     }) {

  const totalPrice = useMemo(() => {
    return cartGoods.reduce(
      (total, good) => total + good.price * good.quantity,
      0
    );
  }, [cartGoods]);

  const [origin, setOrigin] = useState({ x: 50, y: 50 });


  const formatPrice = (price) =>
    new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(price);


  const handleMouseEnter = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setOrigin({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <aside className="cart-summary">
      <h3 className="cart-summary__title text text_type_main-medium">Ваш заказ</h3>

      <div className="cart-summary__items">
        {cartGoods.map((item) => (
          <div
            key={item.id}
            className="cart-summary__item"
          >
            <div className="cart-summary__product">
              <span className="cart-summary__name text text_type_main-default">
                {item.title}
              </span>

              <span className="cart-summary__quantity text text_type_digits-small">
               {formatPrice(item.price)} × {item.quantity}
              </span>
            </div>

            <span className="cart-summary__price text text_type_digits-default">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="cart-summary__total">
        <span className='text text_type_main-medium'>Итого</span>
        <strong className='text_type_digits-medium text'>{formatPrice(totalPrice)}</strong>
      </div>

      <div className="cart-summary__actions">
        {error && <p>{error}</p>}
        <button
          className="button cart-summary__checkout cart-summary__button text text_type_main-default_bold"
          style={{
            '--x': `${origin.x}px`,
            '--y': `${origin.y}px`,
          }}
          onMouseEnter={handleMouseEnter}
          type="submit"
          onClick={onCheckout}
          disabled={cartGoods.length === 0 || loading === true}
        >
          {loading ? 'Оформление...' : 'Оформить заказ'}
        </button>

        <button
          className="button cart-summary__continue cart-summary__button text text_type_main-default_bold"
          style={{
            '--x': `${origin.x}px`,
            '--y': `${origin.y}px`,
          }}
          onMouseEnter={handleMouseEnter}
          type="button"
          onClick={onContinueShopping}
        >
          Продолжить покупки
        </button>
      </div>
    </aside>
  );
}

export default CartSummary;