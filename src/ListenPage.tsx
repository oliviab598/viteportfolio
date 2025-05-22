import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const carouselItems = [
  { image: "image4.jpg", audio: "window8.6.wav" },
  { image: "image5.jpg", audio: "anguish.wav" },
  { image: "image6.jpg", audio: "44wvine.wav" },
];

const ListenPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = `/${carouselItems[currentIndex].audio}`;
      audio.load();
      audio.muted = isMuted;
      audio.play().catch((err) => console.warn("Autoplay blocked:", err));
    }
  }, [currentIndex, isMuted]);

  return (
    <div
      onClick={() => {
        setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
      }}
      style={{
        backgroundColor: "#111",
        color: "#F6F7F2",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        fontFamily: "inherit",
        position: "relative",
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.currentTarget.blur();
          navigate("/");
        }}
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
        }}
        aria-label="Go back home"
      >
        ←
      </button>

      <img
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
      />
      <audio ref={audioRef} preload="auto" />
    </div>
  );
};

export default ListenPage;
