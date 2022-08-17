import React from "react";
import styled from "styled-components";
import { PlayerView, useAudioState } from "../../services/context/audio";
import { audioActions } from "../../services/context/audio.actions";
import { BottomFixedPlayer } from "./player.bottom";
import { FloatingPlayer } from "./player.floating";

const AudioElement = styled.audio`
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: fixed;
  z-index: -9999;
  top: -9999px;
  left: -9999px;
`;

export interface PlayerProps {
  view: PlayerView;
  // eslint-disable-next-line no-unused-vars
  onViewChange: (view: PlayerView) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export const Player = () => {
  const { state: audioState, dispatch } = useAudioState();
  const audioRef = React.useRef<HTMLAudioElement>(null);

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
      audioState.src !== "" &&
      audioState.src !== audioRef.current.src
    ) {
      audioRef.current.src = audioState.src;
      audioRef.current.load();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [audioState.src, audioRef.current]);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioState.volume;
    }
  }, [audioState.volume, audioRef.current]);

  React.useEffect(() => {
    if (audioRef.current) {
      audioState.playing ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [audioState.playing, audioRef.current]);

  const changeView = (view: PlayerView) =>
    dispatch({
      type: audioActions.changePlayerView,
      payload: view,
    });

  const getPlayer = () => {
    switch (audioState.playerView) {
      case PlayerView.Floating:
        return (
          <FloatingPlayer
            view={audioState.playerView}
            onViewChange={changeView}
            audioRef={audioRef}
          />
        );
      case PlayerView.BottomFixed:
        return (
          <BottomFixedPlayer
            view={audioState.playerView}
            onViewChange={changeView}
            audioRef={audioRef}
          />
        );
    }
  };

  return (
    <>
      <AudioElement ref={audioRef} />
      {getPlayer()}
    </>
  );
};
