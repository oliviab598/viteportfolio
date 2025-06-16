import React from "react";
import Discography from "./Discography";

const Video: React.FC = () => (
  <div style={{ position: "relative", width: "100%" }}>
    <div style={{ width: "100%" }}>
      <a
        href="https://www.instagram.com/reel/DKHkgLBy8UC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", width: "100%" }}
      >
        <video
          src="https://pub-1035be232e0f4c9d869c88b1a5a469a7.r2.dev/agnod.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </a>
    </div>

    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        zIndex: 1,
        pointerEvents: "auto",
      }}
    >
      <Discography />
    </div>
  </div>
);

export default Video;
