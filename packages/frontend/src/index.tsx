import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/archivo/variable.css";
import "material-symbols";
import { App } from "./app";

const container = document.getElementById("mount-point");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
