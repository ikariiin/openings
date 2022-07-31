import React from "react";
import { PlayerView, useAudioState } from "../../services/context/audio";
import { audioActions } from "../../services/context/audio.actions";
import { FloatingPlayer } from "./player";

export interface PlayerProps {
  view: PlayerView;
  // eslint-disable-next-line no-unused-vars
  onViewChange: (view: PlayerView) => void;
}

export const Player = () => {
  const { state, dispatch } = useAudioState();

  return (
    <>
      <FloatingPlayer
        view={state.playerView}
        onViewChange={(view) =>
          dispatch({
            type: audioActions.changePlayerView,
            payload: view,
          })
        }
      />
    </>
  );
};
