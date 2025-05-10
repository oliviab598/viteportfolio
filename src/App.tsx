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

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

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
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        backgroundColor: "#111",
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.1,
          zIndex: 0,
        }}
      >
        <source src="/graphic.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hover text */}
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

      <button
        onClick={toggleAudio}
        className="play-button"
        style={{
          position: "absolute",
          bottom: "3em",
          backgroundColor: "transparent",
          color: "F6F7F2",
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
          zIndex: 2,
        }}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>

      <audio ref={audioRef} src="/anguish.wav" preload="auto" loop />
    </div>
  );
};

export default HoverImagePopup;
