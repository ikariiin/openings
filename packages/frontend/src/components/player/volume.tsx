import Slider from "rc-slider";
import React from "react";
import styled, { useTheme } from "styled-components";
import { Icon } from "../icon";

const Container = styled.div`
  margin: 0 0.5rem;
  display: flex;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: ${(props) => props.theme.primaryColor};
  margin-bottom: -4px;
`;

const VolumeTrackContainer = styled.div<{ width?: number }>`
  width: ${(props) => props.width || 80}px;
  display: flex;
  align-items: center;
`;

export interface VolumeProps {
  volume: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (volume: number) => unknown;
  width?: number;
}

export const Volume = ({ volume, onChange, width }: VolumeProps) => {
  const theme = useTheme();

  return (
    <Container>
      <IconButton
        onClick={() => {
          if (volume > 0) {
            onChange(0);
          } else {
            onChange(0.5);
          }
        }}
      >
        <Icon className="material-symbols-outlined" opsz={20}>
          {volume === 0 ? "volume_off" : "volume_up"}
        </Icon>
      </IconButton>
      <VolumeTrackContainer width={width}>
        <Slider
          handleStyle={{
            backgroundColor: theme.primaryColor,
            borderColor: theme.primaryColor,
            opacity: 1,
            boxShadow: "none",
            height: "12px",
            marginTop: "-4px",
          }}
          trackStyle={{
            backgroundColor: theme.primaryColor,
          }}
          railStyle={{
            backgroundColor: theme.textColorMuted,
          }}
          value={volume * 100}
          onChange={(value) => {
            if (Array.isArray(value)) return;
            onChange(value / 100);
          }}
        />
      </VolumeTrackContainer>
    </Container>
  );
};
