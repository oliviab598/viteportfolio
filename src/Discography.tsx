import React, { useRef } from "react";
import { gsap } from "gsap";
import "./App.css";

const Discography: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const lyric =
    "breath caught in my lungs · silence taking hold · airways start to close · won't you take control · my head is my head · while the beat implodes · i beg you please take me · take me";

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
      image: "https://pub-7d9eb3a8d56049a2aeea7c4d69dc6854.r2.dev/found.png",
      title: "found",
      spotify: "https://open.spotify.com/track/1jiVdOGHI3TWnMXEGsUXam",
      soundcloud: "https://soundcloud.com/olivia-brown-448332522/found",
      bandcamp: "https://oliviabrown2.bandcamp.com/track/found",
    },
    {
      image: "https://pub-7d9eb3a8d56049a2aeea7c4d69dc6854.r2.dev/manrmir.png",
      title: "man rm -ir",
      spotify: "https://open.spotify.com/album/32JJ1P36P8Q79HBf26AgeQ",
      soundcloud: "https://on.soundcloud.com/cs3SEMqgmzEydpUwOY",
      bandcamp: "https://oliviabrown2.bandcamp.com/album/man-rm-ir",
    },
    {
      image: "https://pub-a767803cacdb4977bdb56815a0b057b5.r2.dev/helpless.jpg",
      title: "helpless",
      spotify: "https://open.spotify.com/album/0pjKYEkMi4QOwTaHKnLRfT",
      soundcloud: "https://on.soundcloud.com/wMeplDiw0idwQZl7sy",
      bandcamp: "https://oliviabrown2.bandcamp.com/track/helpless",
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
            <span className="marquee-text">{lyric.repeat(1500)}</span>
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
