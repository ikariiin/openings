const actions = {
  updateBackground: "updateBackground",
} as const;

export { actions };

export type UpdateBackground = typeof actions.updateBackground;

export type ActionKeys = keyof typeof actions;
export type ActionValues = typeof actions[keyof typeof actions];
