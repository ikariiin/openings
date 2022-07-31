import { UserListMedia } from "common";
import { Action, State } from ".";
import { actions } from "./actions";

export function appStateReducer(state: State, action: Action): State {
  switch (action.type) {
    case actions.updateBackground:
      return {
        ...state,
        background: action.payload as string,
      };
    case actions.selectMedia:
      return {
        ...state,
        selectedMedia: action.payload as UserListMedia,
      };
    default:
      return state;
  }
}
