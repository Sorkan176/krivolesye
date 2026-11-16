import './GoodGreed.css'
import GoodCard from "../GoodCard/GoodCard.jsx";


function GoodsGrid({ goods }) {
  if (goods.length === 0) {
    return (
      <div>
        Тут как-то пусто...
      </div>
    )
  }

  return (
    <div className="goods-grid">
      {goods.map((good) => (
        <div  key={`good-${good.id}`} className="good-card-wrapper">
          <div  className='grid-stick grid-stick_default_style'></div>
          <GoodCard good={good} />
        </div>
      ))}
    </div>
  );
}

export default GoodsGrid;