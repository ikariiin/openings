import styled, { css } from "styled-components";

export interface TypographyProps {
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "overline";
  gutterBottom?: boolean;
  customGutterBottom?: number;
  align?: "left" | "center" | "right";
  lineHeight?: number;
}

export const Typography = styled.div<TypographyProps>`
  font-size: ${(props) => props.theme.typography[props.variant].fontSize};
  line-height: ${(props) =>
    props.lineHeight || props.theme.typography[props.variant].lineHeight};
  font-weight: ${(props) => props.theme.typography[props.variant].fontWeight};
  text-align: left;
  ${(props) =>
    props.gutterBottom &&
    css`
      margin-bottom: "1rem";
    `}
  ${(props) =>
    props.customGutterBottom &&
    css`
      margin-bottom: ${props.customGutterBottom}rem;
    `}

  ${(props) =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
`;
