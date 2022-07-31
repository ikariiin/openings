import { AuthResponseDto } from "common";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Player } from "../../feature/audio/player.controller";
import { Home } from "../../feature/home";
import { Main } from "../../feature/main";
import { Media } from "../../feature/media";
import { Sideline } from "../../feature/sideline";

export const AuthRouter = ({ authData }: { authData: AuthResponseDto }) => {
  return (
    <BrowserRouter>
      <Sideline authData={authData} />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/media/:id" element={<Media />} />
          <Route path="/search" element={<div>search</div>} />
          <Route path="/browse" element={<div>browse</div>} />
        </Routes>
      </Main>
      <Player />
    </BrowserRouter>
  );
};
