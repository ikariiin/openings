import { AuthResponseDto } from "common";
import React from "react";
import { loadStore } from "../store";
import { AuthRouter } from "./auth.router";
import { UnauthRouter } from "./unauth.router";

export const Router = () => {
  const authStore = loadStore<AuthResponseDto>("auth");

  if (authStore) {
    return <AuthRouter authData={authStore} />;
  } else {
    return <UnauthRouter />;
  }
};
