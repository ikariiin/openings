import React from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./services/router";

const container = document.getElementById("mount-point");
if (container) {
  const root = createRoot(container);
  root.render(<Router />);
}
