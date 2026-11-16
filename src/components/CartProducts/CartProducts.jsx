import './CartProducts.css'
import { useEffect, useRef, useState } from "react";
import GoodCard from "../GoodCard/GoodCard";

function CartProducts({ cartGoods }) {
  const canvasRef = useRef(null);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const updateColumns = () => {
      const styles = getComputedStyle(canvas);

      const cardWidth = parseFloat(
        styles.getPropertyValue("--card-width")
      );

      const gap = parseFloat(
        styles.getPropertyValue("--column-gap")
      );

      const availableWidth = canvas.clientWidth;

      const nextColumns = Math.max(
        1,
        Math.floor(
          (availableWidth + gap) / (cardWidth + gap)
        )
      );

      setColumns(nextColumns);
    };

    updateColumns();

    const observer = new ResizeObserver(updateColumns);
    observer.observe(canvas);

    return () => observer.disconnect();
  }, [cartGoods.length]);

  return (
    <section className="cart-products">
      <div
        ref={canvasRef}
        className="cart-products__canvas"
        style={{ "--columns": columns }}
      >
        {/* Деревянные стойки на заднем плане */}
        <div
          className="cart-products__trees"
          aria-hidden="true"
        >
          {Array.from({ length: columns }, (_, index) => (
            <div
              key={index}
              className="cart-products__tree"
            />
          ))}
        </div>

        {/* Карточки */}
        {cartGoods.map((item, index) => (
          <div
            key={item.id}
            className="cart-products__card"
            style={{
              gridColumn: (index % columns) + 1,
              gridRow: index + 1,
            }}
          >
            <GoodCard good={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CartProducts;