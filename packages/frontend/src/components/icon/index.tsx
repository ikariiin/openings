import styled, { css } from "styled-components";

export const Icon = styled.span<{
  filled?: boolean;
  weight?: number;
  grad?: number;
  opsz?: number;
}>`
  ${(props) => css`
    font-variation-settings: "FILL" ${props.filled ? 1 : 0},
      "wght" ${props.weight || 300}, "GRAD" ${props.grad || -25},
      "opsz" ${props.opsz || 24};
  `}
`;
