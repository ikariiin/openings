import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "ArchivoVariable",sans-serif;
    font-size: 1rem;
    line-height: 1.45rem;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.backgroundColor};
  }
`;
