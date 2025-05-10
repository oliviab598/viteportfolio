import React, { useRef } from "react";
import { gsap } from "gsap";
import "./App.css";

const HoverImagePopup: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const images = [
    "image1.jpeg",
    "image2.jpeg",
    "image3.jpeg",
    "image4.jpeg",
    "image5.jpeg",
  ];
  const spawnLoop = useRef<gsap.core.Tween | null>(null);

  const spawnImage = () => {
    if (!containerRef.current) return;

    const img = document.createElement("img");
    const index = indexRef.current;
    img.src = `/${images[index]}`;
    img.alt = `img${index + 1}`;
    indexRef.current = (index + 1) % images.length;
    img.style.position = "absolute";
    img.style.width = "4em";
    img.style.height = "6em";
    img.style.objectFit = "cover";
    img.style.pointerEvents = "none";
    img.style.opacity = "0";

    const offsetX = Math.random() * 4 + 4;
    const offsetY = Math.random() * 2 - 0.7;
    img.style.left = `${offsetX}em`;
    img.style.top = `${offsetY}em`;

    containerRef.current.appendChild(img);

    gsap.fromTo(
      img,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(img, {
            opacity: 0,
            duration: 0.6,
            delay: 0.6,
            ease: "power2.in",
            onComplete: () => {
              containerRef.current?.removeChild(img);
            },
          });
        },
      }
    );
  };

  const startCycling = () => {
    const loop = () => {
      spawnImage();
      spawnLoop.current = gsap.delayedCall(0.25, loop);
    };
    loop();
  };

  const stopCycling = () => {
    if (spawnLoop.current) {
      spawnLoop.current.kill();
      spawnLoop.current = null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#111",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        className="dotemp-text"
        onMouseEnter={startCycling}
        onMouseLeave={stopCycling}
        style={{
          color: "white",
          fontSize: "2rem",
          cursor: "pointer",
          position: "relative",
        }}
      >
        olivia brown
        <div
          ref={containerRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 1000,
            width: 0,
            height: 0,
          }}
        />
      </div>
    </div>
  );
};

export default HoverImagePopup;
