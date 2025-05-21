import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const carouselItems = [
  { image: "image1.png", audio: "window8.6.wav" },
  { image: "image2.png", audio: "anguish.wav" },
  { image: "image3.png", audio: "44wvine.wav" },
];

const ListenPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

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
      audio.muted = isMuted; // apply current mute state
      audio.play().catch((err) => console.warn("Autoplay blocked:", err));
    }
  }, [currentIndex, isMuted]);

  return (
    <div
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
      {/* Back arrow */}
      <button
        onClick={(e) => {
          e.currentTarget.blur();
          navigate("/");
        }}
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          background: "none",
          border: "none",
          color: "#F6F7F2",
          fontSize: "1.5rem",
          cursor: "pointer",
          outline: "none",
          zIndex: 1000,
        }}
        aria-label="Go back home"
      >
        ←
      </button>

      {/* Fullscreen Image */}
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
        }}
      />

      {/* Left arrow */}
      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          left: "0",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          color: "#F6F7F2",
          fontSize: "2rem",
          cursor: "pointer",
          padding: "1rem",
          zIndex: 2,
          outline: "none",
        }}
        aria-label="Previous song"
      >
        ‹
      </button>

      {/* Right arrow */}
      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          right: "0",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          color: "#F6F7F2",
          fontSize: "2rem",
          cursor: "pointer",
          padding: "1rem",
          zIndex: 2,
          outline: "none",
        }}
        aria-label="Next song"
      >
        ›
      </button>

      {/* Mute / Unmute button */}
      <button
        onClick={toggleMute}
        style={{
          position: "fixed",
          bottom: "2em",
          left: "2em",
          zIndex: 1000,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.7,
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.opacity = "0.7";
        }}
        onFocus={(e) => e.currentTarget.blur()}
        aria-label="Toggle Music"
      >
        <img
          src={isMuted ? "/speaker-slash.png" : "/speaker.png"}
          alt={isMuted ? "Muted" : "Playing"}
          style={{
            width: "1.5em",
            height: "1.5em",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />
      </button>

      {/* Audio element */}
      <audio ref={audioRef} preload="auto" />
    </div>
  );
};

export default ListenPage;
