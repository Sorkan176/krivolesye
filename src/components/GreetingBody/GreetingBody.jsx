import './GreetingBody.css'
import Lantern from "../Lantern/Lantern.jsx";
import {Link} from "react-router-dom";
import {useCallback, useId, useRef, useState} from "react";
import RippleLayer from "../RippleLayer/RippleLayer.jsx";


function GreetingBody() {
  const [isWaterActive, setIsWaterActive] = useState(false);
  const [ripples, setRipples] = useState([]);

  const filterId = useId().replace(/:/g, "");
  const nextRippleId = useRef(0);

  function handleWaterClick(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = nextRippleId.current++;

    const ripple = {
      id,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setRipples((prev) => [...prev, ripple]);
    setIsWaterActive(true);
  }

  const removeRipple = useCallback((id) => {
    setRipples((prev) => {
      const updated = prev.filter((ripple) => ripple.id !== id);

      if (updated.length === 0) {
        setIsWaterActive(false);
      }

      return updated;
    });
  }, []);


  return (
    <>
      {/*<Lantern number={'first'} speed={1.25}/>*/}
      {/*<Lantern number={'second'} speed={0.8}/>*/}

      <Link to='/goods' className='catalog-container'>
        <p className='text text_type_main-medium catalog-container__text'>
          Каталог
        </p>
      </Link>

      <div className={`water-scene`} >
        <div className="water-scene__image"/>

        <div
          className="water-scene__surface"
          onClick={handleWaterClick}
          role="presentation"
        >
          <div
            className="water-scene__reflection"
            aria-hidden="true"
            style={{filter: `url(#${filterId})`}}
          />

          <RippleLayer
            ripples={ripples}
            onRemove={removeRipple}
          />

        </div>

        <svg
          className="water-scene__filters"
          aria-hidden="true"
        >
          <filter
            id={filterId}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            filterRes="256"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.015 0.035"
              numOctaves="1"
              seed="2"
              result="noise"
            >
              {isWaterActive && (
                <animate
                  attributeName="baseFrequency"
                  values="0.015 0.04;0.025 0.07;0.012 0.035;0.015 0.04"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>

            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      </div>
    </>
  )
}

export default GreetingBody;