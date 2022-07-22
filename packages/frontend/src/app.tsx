import React from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/global-style";
import { defaultTypography } from "./components/typography/default";
import { AppStateProvider, useAppState } from "./services/context";
import { Router } from "./services/router";
import { generateTheme } from "./services/theme";

export const App = () => {
  return (
    <AppStateProvider>
      <StatefulApp />
    </AppStateProvider>
  );
};

export const StatefulApp = () => {
  const { state } = useAppState();
  const [theme, setTheme] = React.useState({
    backgroundColor: "#ffffff",
    textColor: "#444444",
    primaryColor: "#ff0000",
    secondaryColor: "#9755ff",
    typography: defaultTypography,
  } as DefaultTheme);

  React.useEffect(() => {
    generateTheme(state.background).then((theme) => setTheme(theme));
  }, [state]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
};
