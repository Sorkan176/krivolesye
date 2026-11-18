import './RippleLayer.css'
import React from "react";


const RippleLayer = React.memo( function RippleLayer({ ripples, onRemove, } ) {

  return (
    <div className="water-scene__ripples">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="water-scene__ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          onAnimationEnd={() => onRemove(ripple.id)}
        />
      ))}
    </div>
  );
});

export default RippleLayer;