import React from "react";
import styled from "styled-components";
import { Icon } from "../icon";

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
