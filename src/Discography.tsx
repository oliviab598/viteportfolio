import React, { useRef } from "react";
import { gsap } from "gsap";
import "./App.css";

const Discography: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handlePlayAndDelayedNavigate = (url: string, link: string) => {
    if (audioRef.current) {
      audioRef.current.src = url;
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

  const discography = [
    {
      image: "manrmir2.png",
      link: "https://open.spotify.com/album/32JJ1P36P8Q79HBf26AgeQ?si=ir_HxmnbRvuETY32V3ajXw",
      title: "man rm -ir",
      audio: "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/horizon.wav",
      soundcloud: "https://on.soundcloud.com/cs3SEMqgmzEydpUwOY",
      bandcamp: "https://oliviabrown2.bandcamp.com/album/man-rm-ir",
    },
    {
      image: "touchyou2.png",
      link: "https://open.spotify.com/album/3ugcwHvC4EdlAU4iZTjULz?si=0hu4TQUkRV2hNIjjoFitoQ",
      title: "touch you",
      audio: "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/isotope.wav",
      soundcloud: "https://on.soundcloud.com/vgmr56ok9wc20A4GSw",
      bandcamp: "https://oliviabrown2.bandcamp.com/track/touch-you",
    },
    {
      image: "0010.png",
      link: "https://open.spotify.com/album/1bAMq1Yxv9s08il20ulFhZ?si=XMnnQGMKSM2Kr_nwuaZygA",
      title: "0010",
      audio: "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/linacs.wav",
      soundcloud: "https://on.soundcloud.com/1mynQPMWTaOchSxy8r",
      bandcamp: "https://oliviabrown2.bandcamp.com/track/0010-feat-iyrliaes",
    },
  ];

  return (
    <div className="discography-wrapper" ref={wrapperRef}>
      <section className="discography-section">
        {discography.map((item, idx) => (
          <div key={idx} className="album-container">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="album-link"
              style={{
                backgroundImage: `url(/${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={(e) => {
                e.preventDefault();
                handlePlayAndDelayedNavigate(item.audio, item.link);
              }}
            >
              <img
                src={`/${item.image}`}
                alt={`album-${idx + 1}`}
                className="album-image smaller"
              />
            </a>
            <div className="album-links">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="album-link-text"
              >
                spotify
              </a>
              <a
                href={item.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="album-link-text"
              >
                soundcloud
              </a>
              <a
                href={item.bandcamp}
                target="_blank"
                rel="noopener noreferrer"
                className="album-link-text"
              >
                bandcamp
              </a>
            </div>
          </div>
        ))}
      </section>

      <audio ref={audioRef} />
    </div>
  );
};

export default Discography;
