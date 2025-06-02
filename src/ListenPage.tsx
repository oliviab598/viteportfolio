import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const carouselItems = [
  {
    image: "image4.jpg",
    audio: "https://pub-043a69f81a1c4abc9c144fa1ba81cedd.r2.dev/window8.6.wav",
  },
  {
    image: "image5.jpg",
    audio: "https://pub-c42178d5b95e4687902aac9753aa5286.r2.dev/anguish.wav",
  },
  {
    image: "image6.jpg",
    audio: "https://pub-4e71a3c20c174ddbb6653dba3a665a24.r2.dev/44wvine.wav",
  },
];

const ListenPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const creatureAudioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    // Play the current track
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = carouselItems[currentIndex].audio;
      audio.load();
      audio.play().catch((err) => console.warn("Autoplay blocked:", err));
    }

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0 },
        { opacity: 0.8, duration: 1, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  const handleNextImage = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
        },
      });
    } else {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }
  };

  const handleBackHome = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.currentTarget.blur();
    sessionStorage.setItem("hasEntered", "true");

    // Play the creature sound
    const creatureAudio = new Audio(
      "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/creature.wav"
    );
    creatureAudio.play().catch((err) => console.warn("Autoplay blocked:", err));

    // Animate page fade-out
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          navigate("/");
        },
      });
    } else {
      // Fallback if containerRef isn't available
      navigate("/");
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleNextImage}
      style={{
        backgroundColor: "#030303",
        color: "#F6F7F2",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        fontFamily: "inherit",
        position: "relative",
      }}
    >
      <button
        onClick={handleBackHome}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.2)";
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.opacity = "0.7";
        }}
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          background: "none",
          border: "none",
          color: "#91928f",
          fontSize: "1.5rem",
          cursor: "pointer",
          outline: "none",
          zIndex: 1000,
          opacity: 0.7,
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
        aria-label="Go back home"
      >
        ←
      </button>

      <img
        ref={imageRef}
        src={`/${carouselItems[currentIndex].image}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          opacity: 0.8,
          pointerEvents: "none",
        }}
        alt=""
      />
      <audio ref={audioRef} preload="auto" />
      <audio
        ref={creatureAudioRef}
        preload="auto"
        src="https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/creature.wav"
      />
    </div>
  );
};

export default ListenPage;
