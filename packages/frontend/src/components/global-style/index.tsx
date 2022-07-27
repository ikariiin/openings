import { createGlobalStyle } from "styled-components";

import config from "../../services/config/styles.config";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${config.fontFamily};
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.45rem;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
  }
`;
