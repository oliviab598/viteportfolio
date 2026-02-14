import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const VIDEO_ITEMS = [
  {
    defaultImage: "https://pub-2e921c3296284ee09765df90c269c521.r2.dev/blossom1.png",
    hoverImage: "https://pub-2e921c3296284ee09765df90c269c521.r2.dev/blossom2.png",
    href: "https://www.youtube.com/watch?v=VzoS1pNo7Hk",
    title: "blossom",
  },
  {
    defaultImage: "https://pub-2e921c3296284ee09765df90c269c521.r2.dev/found1.png",
    hoverImage: "https://pub-2e921c3296284ee09765df90c269c521.r2.dev/found2.png",
    href: "https://www.youtube.com/watch?v=ScVUh4v3W_8",
    title: "found",
  },
  {
    defaultImage: "https://pub-2e921c3296284ee09765df90c269c521.r2.dev/sparrow1.png",
    hoverImage: "https://pub-2e921c3296284ee09765df90c269c521.r2.dev/sparrow2.png",
    href: "https://www.youtube.com/watch?v=Au_CngotiCc",
    title: "sparrow",
  },
];

const VisualsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.75, ease: "power2.out" },
      );
    }
  }, []);

  useEffect(() => {
    const previousDisplay = document.body.style.display;
    const previousPlaceItems = document.body.style.placeItems;
    const previousAlignItems = document.body.style.alignItems;
    const previousJustifyContent = document.body.style.justifyContent;
    const previousBackgroundColor = document.body.style.backgroundColor;
    const previousHtmlBackgroundColor =
      document.documentElement.style.backgroundColor;

    document.body.style.display = "block";
    document.body.style.placeItems = "initial";
    document.body.style.alignItems = "stretch";
    document.body.style.justifyContent = "flex-start";
    document.body.style.backgroundColor = "#f9f9f9";
    document.documentElement.style.backgroundColor = "#f9f9f9";

    return () => {
      document.body.style.display = previousDisplay;
      document.body.style.placeItems = previousPlaceItems;
      document.body.style.alignItems = previousAlignItems;
      document.body.style.justifyContent = previousJustifyContent;
      document.body.style.backgroundColor = previousBackgroundColor;
      document.documentElement.style.backgroundColor =
        previousHtmlBackgroundColor;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = 0;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const textToType = "visuals archive";
    const typingSpeed = 100;
    const pauseTime = 1400;
    let isDeleting = false;
    let currentIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      setTypedText(textToType.substring(0, currentIndex));
      if (!isDeleting && currentIndex < textToType.length) {
        currentIndex += 1;
        timeoutId = window.setTimeout(type, typingSpeed);
      } else if (isDeleting && currentIndex > 0) {
        currentIndex -= 1;
        timeoutId = window.setTimeout(type, typingSpeed / 2);
      } else {
        isDeleting = !isDeleting;
        timeoutId = window.setTimeout(type, pauseTime);
      }
    };

    type();

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const handleMove = (event: MouseEvent) => {
      const bounds = container.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      container.style.setProperty("--cursor-x", x.toFixed(3));
      container.style.setProperty("--cursor-y", y.toFixed(3));
    };

    const handleLeave = () => {
      container.style.setProperty("--cursor-x", "0");
      container.style.setProperty("--cursor-y", "0");
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const stage = stageRef.current;
    if (!cards.length || !stage) {
      return undefined;
    }
    gsap.set(cards, {
      opacity: 0,
      y: 24,
      scale: 0.98,
      transformOrigin: "50% 50%",
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
    });

    return undefined;
  }, []);

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.currentTarget.blur();

    const rim2Audio = new Audio(
      "https://pub-41de94e877a547d29501e703c23ca4fc.r2.dev/drowning%20rim2.mp3",
    );
    rim2Audio.play().catch((err) => console.warn("Autoplay blocked:", err));

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          void navigate("/");
        },
      });
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className="visuals-page"
      ref={containerRef}
    >
      <div className="visuals-veil" aria-hidden="true" />
      <div className="visuals-noise" aria-hidden="true" />
      <button
        className="back-button"
        onClick={handleBack}
        aria-label="Go back home"
        style={{
          color: "black",
          fontSize: "0.8rem",
          position: "absolute",
          top: "1.5rem",
          left: "1.5rem",
        }}
      >
        &lt;BACK
      </button>

      <div className="visuals-center">
        <div className="visuals-title" aria-label="Visuals archive">
          <span className="visuals-title-text">{typedText}</span>
          <span className="visuals-title-cursor" />
        </div>
      </div>

      <section
        className="visuals-stage"
        aria-label="Video collection"
        ref={stageRef}
      >
        {VIDEO_ITEMS.map((item, i) => (
          <div
            key={item.href}
            className="visuals-card"
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onMouseEnter={() => {
              setHoveredIndex(i);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
            }}
          >
            <div className="visuals-card-frame">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${item.title}`}
              >
                <span className="visuals-card-media" aria-hidden="true">
                  <img
                    className="visuals-card-image visuals-card-image-base"
                    src={item.defaultImage}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                  <img
                    className="visuals-card-image visuals-card-image-hover"
                    src={item.hoverImage}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    data-active={hoveredIndex === i ? "true" : "false"}
                  />
                </span>
                <span className="visuals-card-sr">{item.title}</span>
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default VisualsPage;
