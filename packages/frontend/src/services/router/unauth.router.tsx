import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthPage } from "../../feature/auth";
import { Landing } from "../../feature/landing";

export const UnauthRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
};
