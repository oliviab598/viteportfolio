import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const images = ["image1.png", "image2.png", "image3.png"];

const ImageBanner = () => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            setBannerIndex((prevIndex) => (prevIndex + 1) % images.length);

            gsap.to(imgRef.current, {
              opacity: 0.6,
              duration: 0.6,
              ease: "power2.inOut",
            });
          },
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "4em",
        height: "7em",
        overflow: "hidden",
      }}
    >
      <img
        ref={imgRef}
        src={`/${images[bannerIndex]}`}
        alt={`cycling-banner-${bannerIndex + 1}`}
        style={{
          width: "4em",
          height: "7em",
          objectFit: "cover",
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.6,
        }}
      />
    </div>
  );
};

export default ImageBanner;
