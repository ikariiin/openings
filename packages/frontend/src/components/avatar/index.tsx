import React from "react";
import styled, { css } from "styled-components";

const Image = styled.img<{ size: number }>`
  ${(props) =>
    props.size &&
    css`
      width: ${props.size}px;
      height: ${props.size}px;
      border-radius: ${props.size / 3}px;
    `}
`;

export const Avatar = ({
  imageUrl,
  size = 60,
}: {
  imageUrl: string;
  size: number;
}) => {
  return <Image src={imageUrl} size={size} />;
};
