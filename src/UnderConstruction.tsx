import React, { useEffect } from "react";
import "./App.css";

const UnderConstruction: React.FC = () => {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener("mousemove", moveCursor);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        color: "#f6f7f2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Dotemp 8bit', monospace",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontSize: "1rem",
          margin: 0,
          letterSpacing: "1px",
          animation: "flicker 1.5s infinite alternate",
        }}
      >
        [ site under construction ]
      </h1>
    </div>
  );
};

export default UnderConstruction;
