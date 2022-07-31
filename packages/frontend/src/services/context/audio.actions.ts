export const audioActions = {
  updateBannerImage: "updateBannerImage",
  playSong: "playSong",
  updateAudioProp: "updateAudioProp",
  changePlayerView: "changePlayerView",
} as const;

export type AudioActionKeys = keyof typeof audioActions;
export type AudioActionValues = typeof audioActions[keyof typeof audioActions];
