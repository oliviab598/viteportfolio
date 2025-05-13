import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import "./App.css";

const HoverImagePopup: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);

  const images = ["image1.png", "image2.png", "image3.png"];

  const discography = [
    {
      image: "manrmir.JPEG",
      link: "https://on.soundcloud.com/bPAJivvEjFCu34bH9",
    },
    {
      image: "touchyou2.png",
      link: "https://open.spotify.com/album/3ugcwHvC4EdlAU4iZTjULz?si=0hu4TQUkRV2hNIjjoFitoQ",
    },
    {
      image: "0010.png",
      link: "https://open.spotify.com/album/1bAMq1Yxv9s08il20ulFhZ?si=XMnnQGMKSM2Kr_nwuaZygA",
    },
    {
      image: "cerulean3.png",
      link: "https://open.spotify.com/album/4gv3c9loXssU0VkuJI9Zxk?si=E-VnwqpgT6yKWigJzfYqJg",
    },
  ];

  const handleEnter = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().catch((err) => console.warn("Autoplay blocked:", err));
    setHasEntered(true);
  };

  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hasEntered) {
      gsap.fromTo(
        ".main-content",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" }
      );
    }
  }, [hasEntered]);

  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener("mousemove", moveCursor);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
        backgroundColor: "#111",
        fontFamily: "inherit",
        color: "#F6F7F2",
      }}
    >
      {!hasEntered ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={handleEnter}
            className="dotemp-text"
            style={{
              background: "none",
              border: "none",
              color: "#F6F7F2",
              fontSize: "1.5rem",
              cursor: "pointer",
              opacity: 0.7,
              outline: "none",
              WebkitTapHighlightColor: "transparent",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.7";
              e.currentTarget.style.transform = "scale(1)";
            }}
            onFocus={(e) => e.currentTarget.blur()}
          >
            enter
          </button>
        </div>
      ) : (
        <>
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "3em",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "4em",
                height: "8em",
                marginTop: "3em",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={bannerIndex}
                  src={`/${images[bannerIndex]}`}
                  alt={`cycling-banner-${bannerIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "4em",
                    height: "7em",
                    objectFit: "cover",
                  }}
                />
              </AnimatePresence>
            </div>

            <p
              className="dotemp-text"
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.4em",
                margin: "0.6em 0",
                opacity: 0.7,
              }}
            >
              oliviagbrown.com
            </p>
            <div
              className="dotemp-text"
              style={{
                display: "flex",
                gap: "50em",
                fontSize: "0.8rem",
                letterSpacing: "0.4em",
              }}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#B1B2AE" }}
              >
                listen
              </a>
              <a style={{ color: "#B1B2AE" }}>say hi</a>
            </div>
          </nav>

          <div
            className="main-content"
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              position: "relative",
              marginTop: "-12em",
            }}
          >
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/logo.png"
                alt="Logo"
                style={{
                  maxWidth: "300px",
                  width: "50%",
                  height: "auto",
                  cursor: "default",
                  opacity: 0.7,
                }}
              />

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
            <div>
              <p
                className="dotemp-text"
                style={{
                  position: "relative",
                  fontSize: "0.5rem",
                  letterSpacing: "0.5em",
                  marginTop: "2em",
                  opacity: 0.7,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  textAlign: "center",
                }}
              >
                i'm olivia brown
                <br />i like music and computers &lt;3
                <br />( &gt; _ &lt; )&#39;&#39; .ᐟ
              </p>
            </div>
          </div>

          <section
            className="discography-section"
            style={{
              padding: "10em 14em",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              rowGap: "10em",
              justifyItems: "center",
              alignItems: "center",
              backgroundColor: "#111",
            }}
          >
            {discography.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1.0)";
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.opacity = "0.6";
                }}
              >
                <img
                  src={`/${item.image}`}
                  alt={`album-${idx + 1}`}
                  style={{
                    width: "80%",
                    maxWidth: "300px",
                    opacity: 0.6,
                  }}
                />
              </a>
            ))}
          </section>
        </>
      )}
      <audio ref={audioRef} src="/0010.wav" preload="auto" loop />
      {hasEntered && (
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
      )}
    </div>
  );
};

export default HoverImagePopup;
