import React from "react";
import { AudioActionValues } from "./audio.actions";
import { audioStateReducer } from "./audio.reducer";

export type AudioAction = { type: AudioActionValues; payload?: unknown };

// eslint-disable-next-line no-unused-vars
export type AudioDispatch = (action: AudioAction) => unknown;

export enum PlayerView {
  Floating,
  BottomFixed,
}

export type AudioState = {
  playing: boolean;
  volume: number;
  duration: number;
  src: string;
  bufferring: boolean;
  title: string;
  bannerImage: string;
  playerView: PlayerView;
};

export type AudioStateProviderProps = { children: React.ReactNode };

const defaultState: AudioState = {
  playing: false,
  volume: 0.5,
  duration: 0,
  src: "",
  bufferring: false,
  title: "",
  bannerImage: "https://i.imgur.com/91Vv2CH.jpg",
  playerView: PlayerView.Floating,
};

const AudioStateContext = React.createContext<{
  state: AudioState;
  dispatch: AudioDispatch;
} | null>(null);

export const AudioStateProvider = ({ children }: AudioStateProviderProps) => {
  const [state, dispatch] = React.useReducer(audioStateReducer, defaultState);

  const value = { state, dispatch };

  return (
    <AudioStateContext.Provider value={value}>
      {children}
    </AudioStateContext.Provider>
  );
};

export const useAudioState = () => {
  const context = React.useContext(AudioStateContext);

  if (context === null) {
    throw new Error("useAudioState must be used within a AudioStateProvider");
  }

  return context;
};
