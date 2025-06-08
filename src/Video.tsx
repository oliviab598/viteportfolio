import React from "react";

const Video: React.FC = () => (
  <div>
    <a
      href="https://www.instagram.com/reel/DKHkgLBy8UC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-block", width: "100%" }}
    >
      <video
        src="https://pub-1035be232e0f4c9d869c88b1a5a469a7.r2.dev/agnod.mov"
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          marginBottom: "-2em",
        }}
      />
    </a>
  </div>
);

export default Video;
