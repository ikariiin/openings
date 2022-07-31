import React from "react";
import styled from "styled-components";
import { actions } from "../../services/context/actions";
import { Seekbar } from "../../components/player/seekbar";
import { Banner } from "../../components/player/banner";
import { Volume } from "../../components/player/volume";
import { useAudioState } from "../../services/context/audio";
import { PlayerProps } from "./player.controller";
import { ViewManager } from "../../components/player/view.manager";

const AudioElement = styled.audio`
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: fixed;
  z-index: -9999;
  top: -9999px;
  left: -9999px;
`;

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

export const FloatingPlayer = ({ view, onViewChange }: PlayerProps) => {
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
        type: actions.updateAudioProp,
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
        type: actions.updateAudioProp,
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
      type: actions.updateAudioProp,
      payload: {
        playing: !state.playing,
      },
    });
  };

  return (
    <PlayerContainer>
      <AudioElement ref={audioRef} />
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
              type: actions.updateAudioProp,
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
