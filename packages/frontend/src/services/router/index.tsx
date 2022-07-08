import React from "react";
import { BrowserRouter as ReactRouter, Route, Routes } from "react-router-dom";
import { AuthPage } from "../../feature/auth";

export const Router = () => {
  return (
    <ReactRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <a href="https://anilist.co/api/v2/oauth/authorize?client_id=8772&redirect_uri=http://localhost:9000/auth&response_type=code">
              aniliost
            </a>
          }
        />
      </Routes>
    </ReactRouter>
  );
};
