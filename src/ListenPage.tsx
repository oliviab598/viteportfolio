import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const sounds = [
  {
    spotify: "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/horizon.wav",
    soundcloud:
      "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/isotope.wav",
    bandcamp: "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/linacs.wav",
  },
];

const carouselItems = [
  {
    image: "https://pub-7d9eb3a8d56049a2aeea7c4d69dc6854.r2.dev/image4.jpg",
    audio: "https://pub-043a69f81a1c4abc9c144fa1ba81cedd.r2.dev/window8.6.wav",
    links: [
      {
        text: "soundcloud",
        url: "https://on.soundcloud.com/3Ae30VQ8wAmnOjrV8R",
      },
      {
        text: "bandcamp",
        url: "https://oliviabrown2.bandcamp.com/track/window86",
      },
      {
        text: "spotify",
        url: "https://open.spotify.com/track/53n34AeRQq8aKlRnnR2FPQ?si=09b66387604e40f5",
      },
    ],
  },
  {
    image: "https://pub-7d9eb3a8d56049a2aeea7c4d69dc6854.r2.dev/image5.jpg",
    audio: "https://pub-c42178d5b95e4687902aac9753aa5286.r2.dev/anguish.wav",
    links: [
      {
        text: "soundcloud",
        url: "https://on.soundcloud.com/LBgMAReTpRyUNwuq5A",
      },
      {
        text: "bandcamp",
        url: "https://oliviabrown2.bandcamp.com/track/anguish",
      },
      {
        text: "spotify",
        url: "https://open.spotify.com/track/0PpVAl5RTkqFSYn599lkYz?si=1fa2dd7397564dd6",
      },
    ],
  },
  {
    image: "https://pub-7d9eb3a8d56049a2aeea7c4d69dc6854.r2.dev/image6.jpg",
    audio: "https://pub-4e71a3c20c174ddbb6653dba3a665a24.r2.dev/44wvine.wav",
    links: [
      {
        text: "soundcloud",
        url: "https://on.soundcloud.com/Qtgyw31KZ6GOpld9hI",
      },
      {
        text: "bandcamp",
        url: "https://oliviabrown2.bandcamp.com/track/44-w-vine",
      },
      {
        text: "spotify",
        url: "https://open.spotify.com/track/2fJkvgmfupPatEcWOCrtUC?si=aa244a55398b4c4d",
      },
    ],
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
    const originalBodyBackground = document.body.style.backgroundColor;
    const originalHtmlBackground =
      document.documentElement.style.backgroundColor;

    document.body.style.backgroundColor = "black";
    document.documentElement.style.backgroundColor = "black";

    return () => {
      document.body.style.backgroundColor = originalBodyBackground;
      document.documentElement.style.backgroundColor = originalHtmlBackground;
    };
  }, []);

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

    const creatureAudio = new Audio(
      "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/creature.wav"
    );
    creatureAudio.play().catch((err) => console.warn("Autoplay blocked:", err));

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
      navigate("/");
    }
  };

  const handleLinkClick = (
    platform: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.stopPropagation();

    const soundUrl = sounds[0][platform as keyof (typeof sounds)[0]];
    if (soundUrl) {
      const platformAudio = new Audio(soundUrl);
      platformAudio
        .play()
        .catch((err) => console.warn("Autoplay blocked:", err));
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleNextImage}
      style={{
        backgroundColor: "#010101",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        fontFamily: "inherit",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <button
        onClick={handleBackHome}
        onMouseEnter={(e) =>
          (e.currentTarget.style.textDecoration = "underline")
        }
        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          background: "none",
          border: "none",
          color: "#ffffff",
          fontSize: "0.5rem",
          cursor: "pointer",
          outline: "none",
          zIndex: 1000,
          opacity: 0.7,
          letterSpacing: "1px",
        }}
        aria-label="Go back home"
      >
        &lt;BACK
      </button>

      <img
        ref={imageRef}
        src={carouselItems[currentIndex].image}
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

      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "5rem",
          opacity: 0.7,
          zIndex: 1000,
        }}
      >
        {carouselItems[currentIndex].links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="album-link-text"
            onClick={(e) => handleLinkClick(link.text.toLowerCase(), e)}
          >
            {link.text}
          </a>
        ))}
      </div>

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
