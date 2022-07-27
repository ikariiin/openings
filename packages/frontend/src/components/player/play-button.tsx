import React from "react";
import styled, { css } from "styled-components";

const Container = styled.button`
  background-color: ${(props) => props.theme.primaryColor};
  border-radius: 50%;
  border: none;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.15);
  }
`;

const Icon = styled.span<{ filled?: boolean }>`
  ${(props) => css`
    font-variation-settings: "FILL" ${props.filled ? 1 : 0}, "wght" 300,
      "GRAD" -25, "opsz" 24;
    color: ${props.filled ? props.theme.textColor : props.theme.textColorMuted};
  `}
`;

export interface PlayButtonProps {
  onClick: () => unknown;
  playing: boolean;
}

export const PlayButton = ({ playing, onClick }: PlayButtonProps) => {
  return (
    <Container onClick={onClick}>
      <Icon filled={!playing} className="material-symbols-outlined">
        {playing ? "pause" : "play_arrow"}
      </Icon>
    </Container>
  );
};
