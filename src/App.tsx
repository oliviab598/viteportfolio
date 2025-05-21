import { useEffect } from "react"; // Add this if it's not already
import { Routes, Route } from "react-router-dom";
import HoverImagePopup from "./HoverImagePopup";
import ListenPage from "./ListenPage";

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
      <Route path="/" element={<HoverImagePopup />} />
      <Route path="/listen" element={<ListenPage />} />
    </Routes>
  );
};

export default App;
