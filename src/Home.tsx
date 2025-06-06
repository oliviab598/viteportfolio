import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

import ImageBanner from "./ImageBanner";
import Discography from "./Discography";
import "./App.css";

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLAudioElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const [listenText, setListenText] = useState("listen");

  const lyric =
    "the mirror's crystal clear · smudges a figment of my mind · swallowed up inside your absence · i am the product of oversight · ";

  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleEnter = () => {
    const bubbleAudio = bubbleRef.current;
    const mainAudio = audioRef.current;
    if (!bubbleAudio || !mainAudio) return;

    bubbleAudio.currentTime = 0;
    bubbleAudio
      .play()
      .catch((err) => console.warn("Bubble play blocked:", err));

    setTimeout(() => {
      mainAudio.currentTime = 0;
      mainAudio.play().catch((err) => console.warn("Autoplay blocked:", err));
    }, 500);

    sessionStorage.setItem("hasEntered", "true");
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
    if (typeof window !== "undefined") {
      gsap.utils.toArray(".album-container").forEach((el: any, i: number) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.1,
          }
        );
      });
    }
  }, []);

  useEffect(() => {
    if (showPopup && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [showPopup]);

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
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasEntered") === "true";
    setHasEntered(hasVisited);

    if (hasVisited && audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.warn("Autoplay blocked:", err));
    }
  }, []);

  return (
    <div
      ref={containerRef}
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
                width: "clamp(3em, 10vw, 4em)",
                height: "clamp(5em, 18vh, 7em)",
                marginTop: "3em",
              }}
            >
              <ImageBanner />
            </div>

            <p
              className="dotemp-text"
              style={{
                fontSize: "0.7rem",
                color: "#B1B2AE",
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.currentTarget.blur();

                  const incidentAudio = new Audio(
                    "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/bubble.wav"
                  );
                  incidentAudio
                    .play()
                    .catch((err) => console.warn("Autoplay blocked:", err));

                  incidentAudio.onended = () => {
                    setShowPopup(true);
                  };
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.opacity = "0.7";
                }}
                style={{
                  color: "#B1B2AE",
                  background: "none",
                  border: "none",
                  fontSize: "0.8rem",
                  letterSpacing: "0.4em",
                  cursor: "pointer",
                  outline: "none",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  opacity: 0.7,
                  zIndex: 1000,
                }}
                onFocus={(e) => e.currentTarget.blur()}
              >
                say hi
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.currentTarget.blur();

                  const incidentAudio = new Audio(
                    "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/incident.wav"
                  );
                  incidentAudio
                    .play()
                    .catch((err) => console.warn("Autoplay blocked:", err));

                  incidentAudio.onended = () => {
                    navigate("/listen");
                  };
                }}
                style={{
                  color: "#B1B2AE",
                  background: "none",
                  border: "none",
                  fontSize: "0.8rem",
                  letterSpacing: "0.4em",
                  cursor: "pointer",
                  outline: "none",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  opacity: 0.7,
                  zIndex: 1000,
                }}
                onMouseEnter={(e) => {
                  setListenText("2 me..");
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  setListenText("listen");
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.opacity = "0.7";
                }}
                onFocus={(e) => e.currentTarget.blur()}
              >
                {listenText}
              </button>
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
                  fontSize: "clamp(0.1rem, 1vw, 0.5rem)",
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
                <br />
                this site compiles my favorite works at the moment !
                <br />
                i love to create! whether it be music, coding, both ??¿¿ (+
                visuals kinda)
                <br />
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: "-0.8em",
                }}
              >
                <div className="marquee-label">fav lyrics: </div>

                <div
                  className="marquee-container"
                  style={{
                    width: "clamp(200px, 60vw, 700px)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div className="marquee-scroller">
                    <span className="marquee-text">{lyric.repeat(2000)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Discography />
        </>
      )}
      <audio
        ref={bubbleRef}
        src="https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/pixel.wav"
        preload="auto"
      />
      <audio
        ref={audioRef}
        src="https://pub-4d497f83b586430fb259ca2d9b006871.r2.dev/0010.wav"
        preload="auto"
        loop
      />
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
      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1999,
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            ref={popupRef}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#A3A3A3",
              padding: "2em",
              color: "#F6F7F2",
              fontFamily: "inherit",
              maxWidth: "90vw",
              maxHeight: "80vh",
              overflowY: "auto",
              textAlign: "center",
              opacity: 0.8,
              zIndex: 2000,
              pointerEvents: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                backgroundColor: "#A3A3A3",
                padding: "2em",
                color: "#F6F7F2",
                fontFamily: "inherit",
                maxWidth: "90vw",
                maxHeight: "80vh",
                overflowY: "auto",
                textAlign: "center",
                opacity: 0.6,
              }}
            >
              <h2 style={{ marginBottom: "1em", fontSize: "1.2rem" }}>
                <span>{`( > _ < )'' .ᐟ`}</span>
              </h2>
              <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
                if you have any business inquiries, questions, or just
                <br />
                want to say hi, shoot me an email <span>{`:)`}</span>
                <br />
                <br />
                <a
                  href="https://gmail.com"
                  target="_blank"
                  style={{
                    color: "#F6F7F2",
                    textDecoration: "underline",
                    display: "inline-block",
                    marginBottom: "0.4rem",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.6";
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  olivia.b.598@gmail.com
                </a>
                <br />
                <br />
                if you want to stalk my socials... find me at:
                <br />
                <br />
                {[
                  {
                    name: "spotify",
                    href: "https://open.spotify.com/artist/0HThQfqn9VOIJeAVwVtvv9?si=4GuxDyhQR8a6725CLxJzwQ",
                  },
                  {
                    name: "soundcloud",
                    href: "https://soundcloud.com/olivia-brown-448332522",
                  },
                  {
                    name: "bandcamp",
                    href: "https://oliviabrown2.bandcamp.com/",
                  },
                  {
                    name: "nina protocol",
                    href: "https://www.ninaprotocol.com/profiles/olivia.b.598",
                  },
                ].map(({ name, href }) => (
                  <React.Fragment key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#F6F7F2",
                        textDecoration: "underline",
                        display: "inline-block",
                        marginBottom: "0.3rem",
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.6";
                        e.currentTarget.style.transform = "scale(1.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      {name}
                    </a>
                    <br />
                  </React.Fragment>
                ))}
              </p>

              <button
                onClick={() => setShowPopup(false)}
                style={{
                  color: "#F6F7F2",
                  background: "none",
                  border: "none",
                  fontSize: "0.8rem",
                  letterSpacing: "0.4em",
                  cursor: "pointer",
                  outline: "none",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  opacity: 0.7,
                  zIndex: 1000,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.opacity = "0.7";
                }}
                onFocus={(e) => e.currentTarget.blur()}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
