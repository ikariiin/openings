import React from "react";
import styled from "styled-components";
import { Seekbar } from "../../components/player/seekbar";
import { Banner } from "../../components/player/floating/banner";
import { Volume } from "../../components/player/volume";
import { useAudioState } from "../../services/context/audio";
import { PlayerProps } from "./player.controller";
import { ViewManager } from "../../components/player/view.manager";
import { audioActions } from "../../services/context/audio.actions";

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  border-radius: 22px;
  background-color: ${(props) => props.theme.surfaceColor};
  min-width: 300px;
  width: calc((100vw - 80px) * 0.275 - 2.5rem);
  z-index: 10;
  /* Material design drop shadow */
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

const Content = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
`;

export const FloatingPlayer = ({
  view,
  onViewChange,
  audioRef,
}: PlayerProps) => {
  const { state, dispatch } = useAudioState();

  const [currentTime, setCurrentTime] = React.useState(0);

  const [songName, setSongName] = React.useState("");
  const [songArtist, setSongArtist] = React.useState("");

  React.useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.addEventListener("timeupdate", () => {
      if (!audioRef.current) {
        return;
      }

      setCurrentTime(audioRef.current.currentTime);
    });
  }, [audioRef.current]);

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
    <PlayerContainer>
      <Banner
        image={state.bannerImage}
        onTogglePlay={togglePlay}
        playing={state.playing}
        songName={songName}
        artistName={songArtist}
      />
      <Content>
        <Seekbar
          currentTime={currentTime}
          duration={state.duration}
          onChange={(value) => {
            if (audioRef.current) {
              audioRef.current.currentTime = value;
            }
          }}
        />
        <Volume
          volume={state.volume}
          onChange={(value) => {
            dispatch({
              type: audioActions.updateAudioProp,
              payload: {
                volume: value,
              },
            });
          }}
        />
        <ViewManager onViewChange={onViewChange} view={view} />
      </Content>
    </PlayerContainer>
  );
};
