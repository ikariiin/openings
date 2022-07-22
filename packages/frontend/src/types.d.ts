import "styled-components";

export interface TypographyTheme {
  h1: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
  };
  h2: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
  };
  h3: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
  };
  h4: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
  };
  h5: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
  };
  h6: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
  };
  subtitle1: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
  };
  subtitle2: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
  };
  body1: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
  };
  body2: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
  };
  button: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
  };
  caption: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
  };
  overline: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
  };
}

declare module "styled-components" {
  export interface DefaultTheme {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    secondaryContainer: string;
    textColorMuted: string;
    typography: TypographyTheme;
    surfaceColor: string;
  }
}
