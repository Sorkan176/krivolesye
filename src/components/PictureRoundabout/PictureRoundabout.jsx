import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./PictureRoundabout.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function PictureRoundabout({ images }) {
  const containerRef = useRef(null);
  const angleRef = useRef(0);
  const [angle, setAngle] = useState(0);

  const count = images?.length;

  // Радиус цилиндра, рассчитанный по высоте карточки.
  let width;
  if (innerWidth < 768) {
    width = window.innerWidth * 0.8;
  } else {
    width = Math.min(540, window.innerWidth * 0.6);
  }
  const cardHeight = width * 0.75; // соотношение 3:4
  const radius =
    count > 2
      ? cardHeight / (2 * Math.tan(Math.PI / count))
      : cardHeight;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || count < 2) return;

    let touchStartY = 0;
    let touchStartX = 0;

    const handleWheel = (event) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      event.preventDefault();

      angleRef.current += event.deltaY * 0.05;
      setAngle(angleRef.current);
    };

    const handleTouchStart = (event) => {
      const touch = event.touches[0];

      touchStartY = touch.clientY;
      touchStartX = touch.clientX;
    };

    const handleTouchMove = (event) => {
      if (event.touches.length !== 1) return;

      const touch = event.touches[0];

      const deltaY = touchStartY - touch.clientY;
      const deltaX = touchStartX - touch.clientX;

      // Игнорируем преимущественно горизонтальные жесты.
      if (Math.abs(deltaX) > Math.abs(deltaY)) return;

      event.preventDefault();

      angleRef.current += deltaY * 0.5;
      setAngle(angleRef.current);

      touchStartY = touch.clientY;
      touchStartX = touch.clientX;
    };

    container.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [count]);

  if (!count) return null;

  return (
    <section
      ref={containerRef}
      className='barrel-carousel'
      aria-label="Image carousel"
    >
      <div className="barrel-carousel__viewport">
        <div
          className="barrel-carousel__cylinder"
          style={{
            transform: `translateZ(-${radius}px) rotateX(${angle}deg)`,
          }}
        >
          {images.map((image, index) => {
            const rotation = (360 / count) * index;

            return (
              <article
                className="barrel-carousel__item"
                key={`${image.src}-${index}`}
                style={{
                  transform: `rotateX(${rotation}deg) translateZ(${radius}px)`,
                }}
              >
                <img
                  src={`${image.src}`}
                  alt={image.alt ?? ""}
                  draggable="false"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PictureRoundabout;