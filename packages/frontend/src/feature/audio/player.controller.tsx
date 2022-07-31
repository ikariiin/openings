import React from "react";
import { PlayerView, useAudioState } from "../../services/context/audio";
import { audioActions } from "../../services/context/audio.actions";
import { BottomFixedPlayer } from "./player.bottom";
import { FloatingPlayer } from "./player.floating";

export interface PlayerProps {
  view: PlayerView;
  // eslint-disable-next-line no-unused-vars
  onViewChange: (view: PlayerView) => void;
}

export const Player = () => {
  const { state, dispatch } = useAudioState();

  const changeView = (view: PlayerView) =>
    dispatch({
      type: audioActions.changePlayerView,
      payload: view,
    });

  switch (state.playerView) {
    case PlayerView.Floating:
      return (
        <FloatingPlayer view={state.playerView} onViewChange={changeView} />
      );
    case PlayerView.Fullscreen:
      return (
        <FloatingPlayer view={state.playerView} onViewChange={changeView} />
      );
    case PlayerView.BottomFixed:
      return (
        <BottomFixedPlayer view={state.playerView} onViewChange={changeView} />
      );
  }
};
