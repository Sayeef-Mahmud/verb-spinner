import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Icon } from "@iconify/react";
import { ClaudeLoader } from "../../src/ClaudeLoader";

const BACKGROUNDS = ["#ffffff", "#0d1117", "#1e3a8a", "#7c2d12", "#14532d", "#581c87"];

function App() {
  const [bgIndex, setBgIndex] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        height: "100vh",
        width: "100vw",
        background: BACKGROUNDS[bgIndex],
        transition: "background 0.2s ease",
      }}
    >
      <button
        onClick={() => setBgIndex((i) => (i + 1) % BACKGROUNDS.length)}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          padding: "8px 16px",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        Cycle background
      </button>

      <ClaudeLoader size={24} background={BACKGROUNDS[bgIndex]} />

      <ClaudeLoader
        size={24}
        background={BACKGROUNDS[bgIndex]}
        spinner={<Icon icon="svg-spinners:180-ring" />}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
