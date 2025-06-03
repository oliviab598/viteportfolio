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

    // Fade out the wrapper element
    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        duration: 0.6,
        opacity: 0,
        onComplete: () => {
          window.open(link, "_blank");
          // Optionally, fade it back in (if staying on the page)
          gsap.to(wrapperRef.current, { duration: 0, opacity: 1 });
        },
      });
    } else {
      // If no GSAP wrapper, just delay as before
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
    },
    {
      image: "touchyou2.png",
      link: "https://open.spotify.com/album/3ugcwHvC4EdlAU4iZTjULz?si=0hu4TQUkRV2hNIjjoFitoQ",
      title: "touch you",
      audio: "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/isotope.wav",
    },
    {
      image: "0010.png",
      link: "https://open.spotify.com/album/1bAMq1Yxv9s08il20ulFhZ?si=XMnnQGMKSM2Kr_nwuaZygA",
      title: "0010",
      audio: "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/linacs.wav",
    },
    {
      image: "cerulean3.png",
      link: "https://open.spotify.com/album/4gv3c9loXssU0VkuJI9Zxk?si=E-VnwqpgT6yKWigJzfYqJg",
      title: "cerulean",
      audio:
        "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/synchroton.wav",
    },
  ];

  return (
    <div className="discography-wrapper" ref={wrapperRef}>
      <section className="discography-section">
        {discography.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="album-container"
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
              className="album-image"
            />
          </a>
        ))}
      </section>

      <audio ref={audioRef} />
    </div>
  );
};

export default Discography;
