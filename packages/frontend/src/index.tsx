import React from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./services/router";
import "@fontsource/archivo/variable.css";
import "material-symbols";

const container = document.getElementById("mount-point");
if (container) {
  const root = createRoot(container);
  root.render(<Router />);
}
