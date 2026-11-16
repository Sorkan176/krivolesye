import './Lantern.css'
import {useEffect, useRef, useState} from 'react';

function Lantern({number, speed = 1}) {
  const elementRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const element = elementRef.current;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      element.style.transform = `translateY(${scrollY * speed}px)`;

      const distanceToBottom = document.documentElement.scrollHeight - scrollY - element.getBoundingClientRect().bottom;
      const newOpacity = Math.max(
        0,
        Math.min(1, (distanceToBottom - 280) / 100)
      );

      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={elementRef} style={{ opacity }} className={`parallax-lantern parallax-lantern_${number}`}></div>
  );
}

export default Lantern;