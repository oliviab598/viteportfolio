import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./App.css";

const Discography: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const discography = [
    {
      title: "man rm -ir",
      image: "manrmir2.png",
      link: "https://open.spotify.com/album/32JJ1P36P8Q79HBf26AgeQ?si=ir_HxmnbRvuETY32V3ajXw",
      audio: "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/horizon.wav",
    },
    {
      title: "touch you",
      image: "touchyou2.png",
      link: "https://open.spotify.com/album/3ugcwHvC4EdlAU4iZTjULz?si=0hu4TQUkRV2hNIjjoFitoQ",
      audio: "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/isotope.wav",
    },
    {
      title: "0010",
      image: "0010.png",
      link: "https://open.spotify.com/album/1bAMq1Yxv9s08il20ulFhZ?si=XMnnQGMKSM2Kr_nwuaZygA",
      audio: "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/linacs.wav",
    },
    {
      title: "cerulean",
      image: "cerulean3.png",
      link: "https://open.spotify.com/album/4gv3c9loXssU0VkuJI9Zxk?si=E-VnwqpgT6yKWigJzfYqJg",
      audio:
        "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/synchroton.wav",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const el = imageRefs.current[hoveredIndex];
      if (el) {
        const tl = gsap.timeline();

        tl.fromTo(
          el,
          {
            opacity: 0,
            scale: 0.8,
            filter: "contrast(200%)",
            x: -5,
          },
          {
            opacity: 1,
            scale: 1.05,
            filter: "contrast(150%)",
            x: 5,
            duration: 0.1,
            ease: "power3.inOut",
          }
        );

        tl.to(el, {
          x: -5,
          duration: 0.05,
          ease: "power3.inOut",
        });

        tl.to(el, {
          x: 0,
          scale: 1,
          filter: "contrast(100%)",
          duration: 0.4,
          ease: "power3.out",
          clearProps: "filter,scale,opacity,x",
        });
      }
    }
  }, [hoveredIndex]);

  const handlePlayAndDelayedNavigate = (audioUrl: string, link: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }

    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        duration: 0.6,
        opacity: 0,
        onComplete: () => {
          window.open(link, "_blank");
          gsap.to(wrapperRef.current, { duration: 0, opacity: 1 });
        },
      });
    } else {
      setTimeout(() => {
        window.open(link, "_blank");
      }, 400);
    }
  };

  return (
    <div ref={wrapperRef}>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3em 2em", // Increased top & bottom padding
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "20em",
            display: "flex",
            flexDirection: "column",
            gap: "1.5em",
          }}
        >
          {discography.map((album, idx) => (
            <div
              key={idx}
              className="album-entry"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {/* Title */}
              <div
                className="dotemp-text underline-hover"
                style={{
                  fontSize: "1.2rem",
                  color: hoveredIndex === idx ? "#B1B2AE" : "#F6F7F2",
                  opacity: hoveredIndex === idx ? 1 : 0.8,
                  transition: "color 0.3s ease, opacity 0.3s ease",
                }}
              >
                {album.title}
              </div>

              {/* Image */}
              <div
                ref={(el) => {
                  imageRefs.current[idx] = el;
                }}
                className="album-container"
                style={{
                  marginTop: "0.5em",
                  backgroundImage: `url(/${album.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: hoveredIndex === idx ? "50%" : "0",
                  height: hoveredIndex === idx ? "auto" : "0",
                  opacity: 0,
                  pointerEvents: hoveredIndex === idx ? "auto" : "none",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayAndDelayedNavigate(album.audio, album.link);
                }}
              >
                <img
                  src={`/${album.image}`}
                  alt={album.title}
                  className="album-image"
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <audio ref={audioRef} />
    </div>
  );
};

export default Discography;
