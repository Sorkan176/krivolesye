import './GreetingBody.css'
import Lantern from "../Lantern/Lantern.jsx";
import {Link} from "react-router-dom";
import {useEffect, useId, useRef, useState} from "react";

function GreetingBody() {
  const sceneRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const filterId = useId().replace(/:/g, "");
  const nextRippleId = useRef(0);
  const [ripples, setRipples] = useState([]);

  function handleWaterClick(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = nextRippleId.current++;

    const ripple = {
      id,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setRipples((prev) => [...prev, ripple]);
  }

  function removeRipple(id) {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    const scene = sceneRef.current;

    if (scene) {
      observer.observe(scene);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Lantern number={'first'} speed={1.25}/>
      <Lantern number={'second'} speed={0.8}/>

      <Link to='/goods' className='catalog-container'>
        <p className='text text_type_main-medium catalog-container__text'>
          Каталог
        </p>
      </Link>

      <div className={`water-scene ${isVisible ? 'water-scene_visible' : ''}`}
             ref={sceneRef}>
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

          <div className="water-scene__ripples">
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="water-scene__ripple"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                }}
                onAnimationEnd={() => removeRipple(ripple.id)}
              />
            ))}
          </div>
        </div>

        <svg
          className="water-scene__filters"
          aria-hidden="true"
        >
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.04"
              numOctaves="2"
              seed="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.015 0.04;0.025 0.07;0.012 0.035;0.015 0.04"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>

            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
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