import React from "react";
import styled from "styled-components";
import { PlayerProps } from "./player.controller";
import stylesConfig from "../../services/config/styles.config";
import { useAudioState } from "../../services/context/audio";
import { audioActions } from "../../services/context/audio.actions";

const Container = styled.footer`
  height: ${stylesConfig.bottomFixedPlayerHeight};
  width: calc(100% - 95px * 2);
  background-color: ${(props) => props.theme.surfaceColor}d6;
  border-radius: 22px 22px 0 0;
  display: flex;
  align-items: center;
  padding: 0 95px;
  z-index: 10;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const AudioElement = styled.audio`
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: fixed;
  z-index: -9999;
  top: -9999px;
  left: -9999px;
`;

export const BottomFixedPlayer = (props: PlayerProps) => {
  const { state, dispatch } = useAudioState();
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = React.useState(0);

  const [songName, setSongName] = React.useState("");
  const [songArtist, setSongArtist] = React.useState("");

  React.useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.addEventListener("ended", () => {
      dispatch({
        type: audioActions.updateAudioProp,
        payload: {
          playing: false,
        },
      });
    });

    audioRef.current.addEventListener("timeupdate", () => {
      if (!audioRef.current) {
        return;
      }

      setCurrentTime(audioRef.current.currentTime);
    });

    audioRef.current.addEventListener("loadedmetadata", () => {
      if (!audioRef.current) {
        return;
      }

      dispatch({
        type: audioActions.updateAudioProp,
        payload: {
          duration: audioRef.current.duration,
        },
      });
    });
  }, [audioRef.current]);

  React.useEffect(() => {
    if (
      audioRef.current &&
      state.src !== "" &&
      state.src !== audioRef.current.src
    ) {
      audioRef.current.src = state.src;
      audioRef.current.load();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [state.src, audioRef.current]);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume, audioRef.current]);

  React.useEffect(() => {
    if (audioRef.current) {
      state.playing ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [state.playing, audioRef.current]);

  React.useEffect(() => {
    setSongArtist(
      state.title
        .split("by")
        .pop()
        ?.trim()
        .replace(/\(.*?\)/gm, "") || "",
    );
    const songRegexp = /(?<=").*?(?=")/gm;
    setSongName(songRegexp.exec(state.title)?.[0] || "");
  }, [state.title]);

  const togglePlay = () => {
    dispatch({
      type: audioActions.updateAudioProp,
      payload: {
        playing: !state.playing,
      },
    });
  };

  return (
    <Container>
      <AudioElement ref={audioRef} />
      Bottom Fixed Player
    </Container>
  );
};
