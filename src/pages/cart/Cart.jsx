import "./Cart.css";
import CartProducts from "../../components/CartProducts/CartProducts.jsx";
import CartSummary from "../../components/CartSummary/CartSummary.jsx";
import {useNavigate} from "react-router-dom";
import useShop from "../../context/useShop.js";
import {createOrder} from "../../api/orders.js";
import {useMemo, useState} from "react";
import Loading from "../../components/Loading/Loading.jsx";
import useAuth from "../../context/useAuth.js";


function Cart() {
  const { user } = useAuth();
  const { goods, cart, clearCart, loadingCart } = useShop();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const currency="RUB";

  const cartGoods = useMemo(() => {
    return cart
      .map((cartItem) => {
        const good = goods.find(
          (good) => good.id === cartItem.id
        );

        if (!good) return null;

        return {
          ...good,
          quantity: cartItem.quantity,
        };
      })
      .filter(Boolean);
  }, [cart, goods]);


  if (loadingCart) {
    return <Loading size={320} text={'Загрузка корзины...'}/>;
  }

  async function handleCheckout(event) {
    event.preventDefault();

    if (!user) {
      navigate('/login', {
        state: {
          from: '/cart',
        },
      });

      return;
    }

    setLoading(true);
    setError('');

    try {
      await createOrder(cart);
      // Очищаем корзину после успешного создания заказа
      await clearCart();
    } catch (error) {
      console.error('Order creation error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const onContinueShopping = () => {
    navigate('/goods');
  }

  return (
    <div className="cart">
      <h1 className="cart__title text text_type_main-large">Корзина</h1>

      {cart.length === 0 ? (
        <p className="cart__empty text text_type_main-medium">Корзина пуста</p>
      ) : (
        <div className="cart__layout">
          <CartProducts cartGoods={cartGoods} />

          <CartSummary
            cartGoods={cartGoods}
            currency={currency}
            onCheckout={handleCheckout}
            onContinueShopping={onContinueShopping}
            loading={loading}
            error={error}
          />
        </div>
      )}
    </div>
  );
}

export default Cart;