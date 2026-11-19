import './Loading.css'
import {useEffect, useRef, useState} from "react";
import gsap from "gsap";


export default function Loading({
                                      size = 280,
                                      text = "Загрузка...",
                                    }) {
  const [loadingText, setLoadingText] = useState(text);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingText((prev) => prev.concat(' Попробуйте включить vpn'));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      // Вращение кольца
      gsap.to(".loader-ring", {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none",
        transformOrigin: "center",
      });

      // Движение кои
      gsap.to(".koi-one", {
        x: 18,
        y: -12,
        rotation: 12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".koi-two", {
        x: -15,
        y: 10,
        rotation: -10,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className='loading-container'
      role="status"
      aria-label={text}
    >
      <svg
        ref={root}
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="toriiRed" x1="100" y1="0" x2="300" y2="0">
            <stop offset="0%" stopColor="#9F2928"/>
            <stop offset="50%" stopColor="#D64B43"/>
            <stop offset="100%" stopColor="#A52D2B"/>
          </linearGradient>

          <linearGradient id="koiGradient">
            <stop offset="0%" stopColor="#C63B34"/>
            <stop offset="100%" stopColor="#F18D76"/>
          </linearGradient>
        </defs>

        {/* Background */}
        <circle cx="200" cy="190" r="135" fill="#E7E9E5" opacity=".18"/>

        {/* Progress ring */}
        <g className="loader-ring">
          <circle
            cx="200"
            cy="200"
            r="145"
            stroke="#9AA5A3"
            strokeWidth="2"
            opacity=".2"
          />

          <path
            d="M200 55 A145 145 0 1 1 86 110"
            stroke="url(#toriiRed)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        {/* Torii */}
        <g className="torii">
          {/* Main upper beam */}
          <path
            d="M105 155 Q200 180 295 155 L287 169 Q200 189 113 169Z"
            fill="#293A35"
          />

          {/* Top red beam */}
          <path
            d="M116 169 L284 169 L278 179 L122 179Z"
            fill="url(#toriiRed)"
          />

          {/* Horizontal beam */}
          <rect x="120" y="190" width="160" height="9" fill="#BE3630" />

          {/* Pillars */}
          <path
            d="M135 176 L148 176 L148 282 L135 282Z"
            fill="url(#toriiRed)"
          />

          <path
            d="M252 176 L265 176 L265 282 L252 282Z"
            fill="url(#toriiRed)"
          />

          {/* Pillar bases */}
          <rect x="132" y="277" width="19" height="8" fill="#465B51" />
          <rect x="249" y="277" width="19" height="8" fill="#465B51" />
        </g>

        {/* Koi fish */}
        <g className="koi-one">
          <path
            d="M75 100 Q85 88 102 98 Q85 110 75 100Z"
            fill="url(#koiGradient)"
          />
          <path
            d="M75 100 L64 91 L66 100 L64 109Z"
            fill="#C63B34"
          />
          <circle cx="96" cy="97" r="1.5" fill="#293A35" />
        </g>

        <g className="koi-two">
          <path
            d="M305 235 Q318 222 335 232 Q318 245 305 235Z"
            fill="#D7DCD9"
          />
          <path
            d="M305 235 L294 226 L296 235 L294 244Z"
            fill="#B3BFBD"
          />
          <circle cx="329" cy="231" r="1.5" fill="#52615D" />
        </g>
      </svg>

      <span className="text text_type_main-medium loading__text">{loadingText}</span>
    </div>
  );
}
