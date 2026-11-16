import './OrderHistory.css'
import {useEffect, useState} from "react";
import {getOrders} from "../../api/orders.js";
import useShop from "../../context/useShop.js";


const orderBackground = <svg width="800" height="30" viewBox="0 0 800 30" fill="none" xmlns="http://www.w3.org/2000/svg"
                             preserveAspectRatio="none" className='order-card_background'>
  <path
    d="M775 0C775 13.5913 785.846 24.6499 799.355 24.9922L800 25V31H0.00012207V25C13.8072 25 25.0001 13.8071 25.0001 0H775Z"
    fill="var(--color-green)"/>
  <path d="M10 31V10H790V31" strokeWidth="3" stroke="#D5EABB"/>
  <path
    d="M11.3516 0.234375C12.5053 5.34622 16.6567 9.49867 21.7686 10.6523C22.0815 10.723 22.0815 11.152 21.7686 11.2227C16.6625 12.375 12.52 16.5277 11.3811 21.6367C11.3713 21.6807 11.3615 21.7246 11.3516 21.7686C11.2809 22.0815 10.8519 22.0815 10.7812 21.7686C9.61602 16.6056 5.39829 12.3879 0.235352 11.2227C-0.077596 11.152 -0.077596 10.723 0.235352 10.6523C0.278617 10.6426 0.321883 10.6329 0.365149 10.6232C5.47428 9.48403 9.62884 5.34054 10.7812 0.234375C10.8519 -0.0785714 11.2809 -0.0785714 11.3516 0.234375Z"
    fill="#246665"/>
  <path
    d="M789.352 0.234375C790.505 5.34622 794.657 9.49867 799.769 10.6523C800.081 10.723 800.081 11.152 799.769 11.2227C794.663 12.375 790.52 16.5277 789.381 21.6367C789.371 21.6807 789.361 21.7246 789.352 21.7686C789.281 22.0815 788.852 22.0815 788.781 21.7686C787.616 16.6056 783.398 12.3879 778.235 11.2227C777.922 11.152 777.922 10.723 778.235 10.6523C778.279 10.6426 778.322 10.6329 778.365 10.6232C783.474 9.48403 787.629 5.34054 788.781 0.234375C788.852 -0.0785714 789.281 -0.0785714 789.352 0.234375Z"
    fill="#246665"/>

</svg>

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // картинки из заказов
  const {goods} = useShop();


  useEffect(() => {
    let cancelled = false;

    async function loadOrders() {
      try {
        const data = await getOrders();

        if (!cancelled) {
          setOrders(data);
        }
      } catch (error) {
        console.error('Orders loading error:', error);

        if (!cancelled) {
          setError('Не удалось загрузить историю заказов');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className='text text_type_main-medium'>Загрузка заказов...</p>;
  }

  if (error) {
    return <p className='text text_type_main-medium'>{error}</p>;
  }

  if (orders.length === 0) {
    return <p className='text text_type_main-medium'>У вас пока нет заказов</p>;
  }

  console.log(goods, orders)


  return (
    <section className="order-history">

      {orders.map((order) => (
        <div key={order.id} className='order-wrapper'>
          {orderBackground}
          <article className="order-card">
            <h3 className="text text_type_main-medium order-card__title">
              Заказ № {order.id.slice(0, 8)}
            </h3>

            <p className="text text_type_main-default order-card__date">
              Дата: {new Date(order.created_at).toLocaleDateString('ru-RU')}
            </p>

            <p className="text text_type_main-default order-card__status">
              Статус: {order.status}
            </p>
            {/*TODO images лежит в goods*/}
            <ul className="order-card__items">
              {order.order_items.map((item) => (
                <li key={item.id} className="order-card__item">

                  <img
                    className="order-card__image"
                    src={goods.find((good) => good.id === item.good_id)?.images[0].src}
                    alt={item.title}
                    loading="lazy"
                  />

                  <div className="order-card__item-info">
                    <h3 className="text text_type_main-default order-card__item-title">
                      {item.title}
                    </h3>

                    <p className="text text_type_main-default order-card__item-price">
                      {item.quantity} шт. × {item.price} ₽
                    </p>
                  </div>

                  <strong className="text text_type_digits-default order-card__item-total">
                    {item.quantity * item.price} ₽
                  </strong>
                </li>
              ))}
            </ul>

            <strong className="text text_type_digits-medium order-card__total">
              Итого: {order.total} ₽
            </strong>
          </article>
          {orderBackground}
        </div>
      ))}
    </section>
  );
}

export default OrderHistory;