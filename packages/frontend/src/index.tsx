import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "@fontsource/manrope/variable.css";
import "material-symbols";
import "rc-slider/assets/index.css";

const container = document.getElementById("mount-point");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
