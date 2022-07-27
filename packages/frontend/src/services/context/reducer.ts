import { Action, AudioState, State } from ".";
import { actions } from "./actions";

export function appStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case actions.updateBackground:
      return {
        ...state,
        background: action.payload as string,
      };
    case actions.playSong:
      return {
        ...state,
        audio: {
          duration: 0,
          playing: true,
          src: (action.payload as Record<string, string>).src,
          volume: 0.5,
          bufferring: false,
          title: (action.payload as Record<string, string>).title,
        },
      };
    case actions.updateAudioProp:
      return {
        ...state,
        audio: {
          ...state.audio,
          ...(action.payload as Partial<AudioState>),
        },
      };
    case actions.updateBannerImage:
      return {
        ...state,
        bannerImage: action.payload as string,
      };
    default:
      return state;
  }
}
