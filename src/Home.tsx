import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import Video from "./Video";

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const typingLines = [
    "hi <3 i'm olivia",
    "i like music and computers",
    "i love to create..",
    "sound · code · both ?¿",
  ];

  const socialSounds: Record<string, string> = {
    spotify:
      "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/drowning%20can.wav",
    "apple music":
      "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/drowning%20you.wav",
    soundcloud:
      "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/drowning%20help.wav",
    bandcamp:
      "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/drowning%20me.wav",
    "nina protocol":
      "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/drowning%20ah.wav",
  };

  const handleSocialClick = (name: string) => {
    const soundUrl = socialSounds[name];
    if (!soundUrl) {
      return;
    }
    const socialAudio = new Audio(soundUrl);
    socialAudio.play().catch((err) => console.warn("Autoplay blocked:", err));
  };

  const TypingBox: React.FC = () => {
    const [lineIndex, setLineIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const TYPING_SPEED = 120;
    const DELETING_SPEED = 60;
    const HOLD_DELAY = 2200;

    useEffect(() => {
      let timeout: number;
      const currentLine = typingLines[lineIndex];

      if (!isDeleting) {
        if (displayText.length < currentLine.length) {
          timeout = window.setTimeout(() => {
            setDisplayText(currentLine.slice(0, displayText.length + 1));
          }, TYPING_SPEED);
        } else {
          timeout = window.setTimeout(() => setIsDeleting(true), HOLD_DELAY);
        }
      } else {
        if (displayText.length > 0) {
          timeout = window.setTimeout(() => {
            setDisplayText(currentLine.slice(0, displayText.length - 1));
          }, DELETING_SPEED);
        } else {
          setIsDeleting(false);
          setLineIndex((idx) => (idx + 1) % typingLines.length);
        }
      }

      return () => window.clearTimeout(timeout);
    }, [displayText, isDeleting, lineIndex]);

    return (
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <div className="typing-box" aria-live="polite">
          <span className="typing-text">{displayText}</span>
          <span className="typing-cursor">|</span>
        </div>
      </motion.div>
    );
  };

  useEffect(() => {
    if (showPopup && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      );
    }
  }, [showPopup]);

  useEffect(() => {
    gsap.fromTo(
      ".main-content",
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" },
    );
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" },
      );
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
        backgroundColor: "#F9F9F9",
        fontFamily: "inherit",
        color: "black",
      }}
    >
      <nav
        className="home-nav"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "3em",
        }}
      >
        <video
          src="https://pub-1035be232e0f4c9d869c88b1a5a469a7.r2.dev/logo.mov"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "3em",
            height: "3em",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <p
          className="home-tagline"
          style={{
            fontSize: "0.6rem",
            color: "black",
            letterSpacing: "0.4em",
            marginTop: "1.8em",
          }}
        >
          olivia ✶ chicago ⊹ ࣪ ˖ artist ⚚ experimental electronic ⋆˙⟡ engineer
        </p>
        <div
          className="home-nav-links"
          style={{
            display: "flex",
            gap: "50em",
            fontSize: "0.8rem",
            letterSpacing: "0.4em",
            marginTop: "1em",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.currentTarget.blur();

              const incidentAudio = new Audio(
                "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/drowning%20hat2.mp3",
              );
              incidentAudio
                .play()
                .catch((err) => console.warn("Autoplay blocked:", err));

              incidentAudio.onended = () => {
                setShowPopup(true);
              };
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = "underline";
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = "none";
              e.currentTarget.style.opacity = "0.7";
            }}
            style={{
              color: "black",
              background: "none",
              border: "none",
              fontSize: "0.6rem",
              letterSpacing: "0.4em",
              cursor: "pointer",
              outline: "none",
              transition: "transform 0.3s ease, opacity 0.3s ease",
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
                "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/drowning%20perc2.mp3",
              );
              incidentAudio
                .play()
                .catch((err) => console.warn("Autoplay blocked:", err));

              incidentAudio.onended = () => {
                window.open(
                  "https://ffm.to/drowning_",
                  "_blank",
                  "noopener,noreferrer",
                );
              };
            }}
            style={{
              color: "black",
              background: "none",
              border: "none",
              fontSize: "0.6rem",
              letterSpacing: "0.4em",
              cursor: "pointer",
              outline: "none",
              transition: "transform 0.3s ease, opacity 0.3s ease",
              zIndex: 1000,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.7";
              e.currentTarget.style.textDecoration = "none";
            }}
            onFocus={(e) => e.currentTarget.blur()}
          >
            listen
          </button>
        </div>
      </nav>

      <div
        className="main-content home-main"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
          marginTop: "-10em",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "0.5em",
          }}
        >
          <video
            className="home-hero-video"
            src="https://pub-e506c124ea554b9488ae29cb382852f9.r2.dev/clips.mov"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "min(80vw, 20em)",
              objectFit: "cover",
              margin: "2em",
            }}
          />

          <div
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
        <div
          style={{
            marginTop: "0.5em",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TypingBox />
        </div>
        <div>
          <div className="social-links" style={{ marginTop: "0.6rem" }}>
            {[
              {
                name: "spotify",
                href: "https://open.spotify.com/artist/0HThQfqn9VOIJeAVwVtvv9?si=4GuxDyhQR8a6725CLxJzwQ",
              },
              {
                name: "apple music",
                href: "https://music.apple.com/us/artist/olivia-brown/556597455",
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
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                onClick={() => handleSocialClick(name)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                  e.currentTarget.style.opacity = "0.7";
                }}
                style={{
                  color: "#CE5A08",
                  background: "none",
                  border: "none",
                  fontSize: "0.6rem",
                  letterSpacing: "0.4em",
                  cursor: "pointer",
                  outline: "none",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  margin: "0 1.5em",
                  zIndex: 1000,
                }}
              >
                {name}
              </a>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
                            <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.currentTarget.blur();

                  const incidentAudio = new Audio(
                    "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/cw_glitch_hat07.wav",
                  );
                  incidentAudio
                    .play()
                    .catch((err) => console.warn("Autoplay blocked:", err));

                  incidentAudio.onended = () => {
                    window.open(
                      "https://open.spotify.com/playlist/6TBSkW2T49azv2IkVwo4EA?si=a34050db9e5845ca",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  };
                }}
                style={{
                  color: "white",
                  background: "black",
                  border: "none",
                  borderRadius: "0px",
                  fontSize: "0.6em",
                  letterSpacing: "0.4em",
                  cursor: "pointer",
                  outline: "none",
                  margin: "1em",
                  transition:
                    "transform 0.3s ease, opacity 0.3s ease, text-decoration 0.15s",
                  zIndex: 1000,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
                onFocus={(e) => e.currentTarget.blur()}
              >
                siren's kiss
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.currentTarget.blur();

                  const incidentAudio = new Audio(
                    "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/drowning%20am%20sft%20snare.mp3",
                  );
                  incidentAudio
                    .play()
                    .catch((err) => console.warn("Autoplay blocked:", err));

                  incidentAudio.onended = () => {
                    navigate("/visuals");
                  };
                }}
                style={{
                  color: "white",
                  background: "black",
                  border: "none",
                  borderRadius: "0px",
                  fontSize: "0.6em",
                  letterSpacing: "0.4em",
                  cursor: "pointer",
                  outline: "none",
                  margin: "1em",
                  transition:
                    "transform 0.3s ease, opacity 0.3s ease, text-decoration 0.15s",
                  zIndex: 1000,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
                onFocus={(e) => e.currentTarget.blur()}
              >
                mvs
              </button>
            </div>
          </div>
        </div>
      </div>
      <Video />
      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1999,
            opacity: 0.85,
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
              backgroundColor: "#F9F9F9",
              padding: "2em",
              color: "black",
              fontFamily: "inherit",
              maxWidth: "90vw",
              maxHeight: "80vh",
              overflowY: "auto",
              textAlign: "center",
              opacity: 0.5,
              zIndex: 2000,
              pointerEvents: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                backgroundColor: "#F9F9F9",
                padding: "2em",
                color: "black",
                fontFamily: "inherit",
                maxWidth: "90vw",
                maxHeight: "80vh",
                overflowY: "auto",
                textAlign: "center",
                opacity: 0.8,
              }}
            >
              <h2 style={{ marginBottom: "1em", fontSize: "1.2rem" }}>
                <span>{`( > _ < )'' .ᐟ`}</span>
              </h2>
              <p style={{ opacity: 0.9, fontSize: "0.9rem" }}>
                if you have any business inquiries, questions, or just
                <br />
                want to say hi, shoot me an email <span>{`:)`}</span>
                <br />
                <br />
                <a
                  href="https://gmail.com"
                  target="_blank"
                  style={{
                    color: "black",
                    textDecoration: "underline",
                    display: "inline-block",
                    marginBottom: "0.4rem",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
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
                    name: "apple music",
                    href: "https://music.apple.com/us/artist/olivia-brown/556597455",
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
                        color: "black",
                        textDecoration: "underline",
                        display: "inline-block",
                        marginBottom: "0.3rem",
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "0.6";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
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
                  color: "black",
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
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
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
