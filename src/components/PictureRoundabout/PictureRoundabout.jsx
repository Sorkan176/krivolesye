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

    const handleWheel = (event) => {
      // Не перехватываем горизонтальный скролл.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      event.preventDefault();

      // deltaY управляет вращением.
      angleRef.current += event.deltaY * 0.05;
      setAngle(angleRef.current);
    };

    container.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel);
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