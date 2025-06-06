import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Minimal test without ui-kit components
function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Minimal Showcase Test</h1>
      <p>If you see this, the basic React app works.</p>
      <p>CSS should be loading from index.css</p>
      <button className="btn btn-primary">DaisyUI Button Test</button>
    </div>
  );
}

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
