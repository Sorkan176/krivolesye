import './Greeting.css'
import {useRef} from "react";


function Greeting() {

  const titleRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = titleRef.current.getBoundingClientRect();

    titleRef.current.style.setProperty(
      '--mouse-x',
      `${e.clientX - rect.left}px`
    );

    titleRef.current.style.setProperty(
      '--mouse-y',
      `${e.clientY - rect.top}px`
    );
  };


  return (
      <div className="greeting">
        <h1
          ref={titleRef}
          className="greeting__title text text_type_main-extra-large"
          onMouseMove={handleMouseMove}
        >
          Добро пожаловать
          <br/>
          в <span className="greeting__accent">криволесье</span>
          <span className="greeting__glow" aria-hidden="true">
          Добро пожаловать
          <br/>
          в <span>криволесье</span>
        </span>
        </h1>
      </div>
  )
}

export default Greeting