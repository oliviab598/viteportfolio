import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "./App.css";

const HoverImagePopup: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const indexRef = useRef(0);
  const spawnLoop = useRef<gsap.core.Tween | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const images = [
    "image1.png",
    "image2.png",
    "image3.png",
    "image4.png",
    "image5.png",
  ];

  const spawnImage = () => {
    if (!containerRef.current) return;

    const img = document.createElement("img");
    const index = indexRef.current;
    img.src = `/${images[index]}`;
    img.alt = `img${index + 1}`;
    indexRef.current = (index + 1) % images.length;

    img.style.position = "absolute";
    img.style.width = "4em";
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

  const handleEnter = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().catch((err) => console.warn("Autoplay blocked:", err));
    setHasEntered(true);
  };

  useEffect(() => {
    if (hasEntered) {
      gsap.fromTo(
        ".main-content",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" }
      );
    }
  }, [hasEntered]);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        backgroundColor: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "inherit",
      }}
    >
      {!hasEntered ? (
        <button
          onClick={handleEnter}
          className="dotemp-text"
          style={{
            background: "none",
            border: "none",
            color: "#F6F7F2",
            fontSize: "1.5rem",
            cursor: "pointer",
            marginTop: "1em",
            opacity: 0.7,
            outline: "none",
            WebkitTapHighlightColor: "transparent",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.7";
            e.currentTarget.style.transform = "scale(1)";
          }}
          onFocus={(e) => e.currentTarget.blur()}
        >
          enter
        </button>
      ) : (
        <div className="main-content" style={{ opacity: 0 }}>
          <div
            className="dotemp-text"
            onMouseEnter={startCycling}
            onMouseLeave={stopCycling}
            style={{
              color: "#F6F7F2",
              fontSize: "2rem",
              position: "relative",
              textAlign: "center",
              cursor: "default",
              zIndex: 2,
            }}
          >
            olivia brown
            <div
              ref={containerRef}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                zIndex: 3,
                width: 0,
                height: 0,
              }}
            />
          </div>
        </div>
      )}

      <audio ref={audioRef} src="/anguish.wav" preload="auto" loop />
    </div>
  );
};

export default HoverImagePopup;
