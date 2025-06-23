import React, { useRef } from "react";
import { gsap } from "gsap";
import "./App.css";

const Discography: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const lyric =
    "the mirror's crystal clear · smudges a figment of my mind · swallowed up inside your absence · i am the product of oversight · ";

  const sounds = [
    {
      spotify:
        "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/horizon.wav",
      soundcloud:
        "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/isotope.wav",
      bandcamp:
        "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/linacs.wav",
    },
  ];

  const discography = [
    {
      image: "https://pub-a767803cacdb4977bdb56815a0b057b5.r2.dev/helpless.jpg",
      title: "helpless",
      spotify:
        "https://open.spotify.com/album/0pjKYEkMi4QOwTaHKnLRfT?si=j7laCng0QqWCLSVFvMcJhw",
      soundcloud: "https://on.soundcloud.com/wMeplDiw0idwQZl7sy",
      bandcamp: "https://oliviabrown2.bandcamp.com/track/helpless",
    },

    {
      image: "https://pub-7d9eb3a8d56049a2aeea7c4d69dc6854.r2.dev/manrmir.png",
      title: "man rm -ir",
      spotify:
        "https://open.spotify.com/album/32JJ1P36P8Q79HBf26AgeQ?si=ir_HxmnbRvuETY32V3ajXw",
      soundcloud: "https://on.soundcloud.com/cs3SEMqgmzEydpUwOY",
      bandcamp: "https://oliviabrown2.bandcamp.com/album/man-rm-ir",
    },
    {
      image:
        "https://pub-7d9eb3a8d56049a2aeea7c4d69dc6854.r2.dev/touchyou2.png",
      title: "touch you",
      spotify:
        "https://open.spotify.com/album/3ugcwHvC4EdlAU4iZTjULz?si=0hu4TQUkRV2hNIjjoFitoQ",
      soundcloud: "https://on.soundcloud.com/vgmr56ok9wc20A4GSw",
      bandcamp: "https://oliviabrown2.bandcamp.com/track/touch-you",
    },
    {
      image: "https://pub-7d9eb3a8d56049a2aeea7c4d69dc6854.r2.dev/0010.png",
      title: "0010",
      spotify:
        "https://open.spotify.com/album/1bAMq1Yxv9s08il20ulFhZ?si=XMnnQGMKSM2Kr_nwuaZygA",
      soundcloud: "https://on.soundcloud.com/1mynQPMWTaOchSxy8r",
      bandcamp: "https://oliviabrown2.bandcamp.com/track/0010-feat-iyrliaes",
    },
  ];

  const handlePlayAndDelayedNavigate = (soundUrl: string, link: string) => {
    if (audioRef.current) {
      audioRef.current.src = soundUrl;
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
    <div className="discography-wrapper" ref={wrapperRef}>
      <section className="discography-section">
        {discography.map((item, idx) => (
          <div key={idx} className="album-container">
            <a className="album-link">
              <img
                src={item.image}
                alt={`album-${idx + 1}`}
                className="album-image smaller"
              />
            </a>

            <div className="album-links">
              <a
                href={item.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="album-link-text"
                onClick={(e) => {
                  e.preventDefault();
                  const soundUrl = sounds[0].spotify;
                  handlePlayAndDelayedNavigate(soundUrl, item.spotify);
                }}
              >
                spotify
              </a>
              <a
                href={item.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="album-link-text"
                onClick={(e) => {
                  e.preventDefault();
                  const soundUrl = sounds[0].soundcloud;
                  handlePlayAndDelayedNavigate(soundUrl, item.soundcloud);
                }}
              >
                soundcloud
              </a>
              <a
                href={item.bandcamp}
                target="_blank"
                rel="noopener noreferrer"
                className="album-link-text"
                onClick={(e) => {
                  e.preventDefault();
                  const soundUrl = sounds[0].bandcamp;
                  handlePlayAndDelayedNavigate(soundUrl, item.bandcamp);
                }}
              >
                bandcamp
              </a>
            </div>
          </div>
        ))}
      </section>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
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
      <div
        style={{
          color: "white",
          justifyContent: "center",
          textAlign: "center",
          padding: "2em",
          opacity: 0.85,
          letterSpacing: "1.5px",
          fontSize: "0.5em",
          fontFamily: "inherit",
        }}
      >
        Copyright © 2025 Olivia Brown All rights reserved
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default Discography;
