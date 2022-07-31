import React from "react";
import styled from "styled-components";
import { Typography } from "../../typography";
import { PlayButton } from "./play-button";

const Container = styled.div<{ banner: string }>`
  height: 135px;
  background-image: url(${(props) => props.banner});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 22px 22px 0 0;
  padding: 1rem;
  position: relative;
`;

const BannerContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.5rem 1rem;
  border-radius: 22px 22px 0 0;
  background: linear-gradient(
    180deg,
    ${(props) => props.theme.surfaceColor}1a 0%,
    ${(props) => props.theme.surfaceColor}95 66%,
    ${(props) => props.theme.surfaceColor}aa 100%
  );
  color: ${(props) => props.theme.textColor};
  display: flex;
  /* Align text at bottom left of container */
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
`;

const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`;

export interface BannerProps {
  image: string;
  // title: string;
  playing: boolean;
  onTogglePlay: () => void;
  songName: string;
  artistName: string;
}

export const Banner = ({
  image,
  songName,
  artistName,
  playing,
  onTogglePlay,
}: BannerProps) => {
  return (
    <Container banner={image}>
      <BannerContent>
        <ControlContainer>
          <PlayButton playing={playing} onClick={onTogglePlay} />
        </ControlContainer>
        <Typography variant="h5">{songName}</Typography>
        <Typography variant="caption">{artistName}</Typography>
      </BannerContent>
    </Container>
  );
};
