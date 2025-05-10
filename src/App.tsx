import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import "./App.css";

const HoverImagePopup: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const indexRef = useRef(0);
  const spawnLoop = useRef<gsap.core.Tween | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const images = [
    "image1.jpeg",
    "image2.jpeg",
    "image3.jpeg",
    "image4.jpeg",
    "image5.jpeg",
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
    img.style.height = "6em";
    img.style.objectFit = "cover";
    img.style.pointerEvents = "none";
    img.style.opacity = "0";

    const offsetX = Math.random() * 4 + 4; // 4–8em to the right
    const offsetY = Math.random() * 2 - 0.7; // -0.7–1.3em
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

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Animate button
    gsap.fromTo(
      ".play-button",
      { scale: 1 },
      { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.out" }
    );

    if (audio.paused) {
      audio.play().catch((err) => console.warn("Autoplay blocked:", err));
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
          position: "relative",
          textAlign: "center",
          cursor: "default",
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

      {/* Play button below the text */}
      <button
        onClick={toggleAudio}
        className="play-button"
        style={{
          position: "absolute",
          bottom: "3em",
          backgroundColor: "transparent",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "3.5em",
          height: "3.5em",
          fontSize: "2.5em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          outline: "none",
        }}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

      <audio ref={audioRef} src="/anguish.wav" preload="auto" loop />
    </div>
  );
};

export default HoverImagePopup;
