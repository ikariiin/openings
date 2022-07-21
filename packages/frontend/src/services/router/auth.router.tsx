import { AuthResponseDto } from "common";
import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Sideline } from "../../feature/sideline";

export const AuthRouter = ({ authData }: { authData: AuthResponseDto }) => {
  return (
    <BrowserRouter>
      <Sideline authData={authData} />
      <Routes></Routes>
    </BrowserRouter>
  );
};
