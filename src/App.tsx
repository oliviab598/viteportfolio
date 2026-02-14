import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import VisualsPage from "./VisualsPage";
import "./App.css";

const App: React.FC = () => {
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/visuals" element={<VisualsPage />} />
    </Routes>
  );
};

export default App;
