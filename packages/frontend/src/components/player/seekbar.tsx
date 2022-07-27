import { Duration } from "luxon";
import Slider from "rc-slider";
import React from "react";
import styled, { useTheme } from "styled-components";
import { Typography } from "../typography";

const SeekbarContainer = styled.div`
  display: flex;
  flex-grow: 1;
  line-height: 1;
`;

const SliderContainer = styled.div`
  flex-grow: 1;
  margin: 0 1rem;
`;

const DurationContainer = styled.div`
  width: 38px;
  text-align: center;
`;

export interface SeekbarProps {
  currentTime: number;
  duration: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (time: number) => void;
}

export const Seekbar = ({ currentTime, duration, onChange }: SeekbarProps) => {
  const [formattedCurrentTime, setFormattedCurrentTime] =
    React.useState("00:00");
  const [formattedDuration, setFormattedDuration] = React.useState("00:00");

  const theme = useTheme();

  React.useEffect(() => {
    setFormattedCurrentTime(
      Duration.fromMillis(currentTime * 1000).toFormat("mm:ss"),
    );
  }, [currentTime]);

  React.useEffect(() => {
    setFormattedDuration(
      Duration.fromMillis(duration * 1000).toFormat("mm:ss"),
    );
  }, [duration]);

  return (
    <SeekbarContainer>
      <DurationContainer>
        <Typography variant="caption">{formattedCurrentTime}</Typography>
      </DurationContainer>
      <SliderContainer>
        <Slider
          handleStyle={{
            backgroundColor: theme.primaryColor,
            borderColor: theme.primaryColor,
            opacity: 1,
            boxShadow: "none",
          }}
          trackStyle={{
            backgroundColor: theme.primaryColor,
          }}
          railStyle={{
            backgroundColor: theme.textColorMuted,
          }}
          value={(currentTime / duration) * 100}
          onChange={(value) => {
            if (Array.isArray(value)) return;

            onChange((value / 100) * duration);
          }}
        />
      </SliderContainer>
      <DurationContainer>
        <Typography variant="caption">{formattedDuration}</Typography>
      </DurationContainer>
    </SeekbarContainer>
  );
};
