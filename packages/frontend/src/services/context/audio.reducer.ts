import { AudioAction, AudioState, PlayerView } from "./audio";
import { audioActions } from "./audio.actions";

export function audioStateReducer(
  state: AudioState,
  action: AudioAction,
): AudioState {
  switch (action.type) {
    case audioActions.updateBannerImage:
      return {
        ...state,
        bannerImage: action.payload as string,
      };
    case audioActions.playSong:
      return {
        ...state,
        duration: 0,
        playing: true,
        src: (action.payload as Record<string, string>).src,
        volume: state.volume,
        bufferring: false,
        title: (action.payload as Record<string, string>).title,
      };
    case audioActions.updateAudioProp:
      return {
        ...state,
        ...(action.payload as Partial<AudioState>),
      };
    case audioActions.changePlayerView:
      return {
        ...state,
        playerView: action.payload as PlayerView,
      };
    default:
      return state;
  }
}
