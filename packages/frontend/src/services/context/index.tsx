import { UserListMedia } from "common";
import * as React from "react";
import { ActionValues } from "./actions";
import { appStateReducer } from "./reducer";

export type Action = { type: ActionValues; payload?: unknown };
// eslint-disable-next-line no-unused-vars
export type Dispatch = (action: Action) => unknown;
export type State = {
  background: string;
  selectedMedia: UserListMedia | null;
};
export type AppStateProviderProps = { children: React.ReactNode };

const defaultState: State = {
  background: "https://i.imgur.com/13L2elC.jpg",
  selectedMedia: null,
};

const AppStateContext = React.createContext<{
  state: State;
  dispatch: Dispatch;
} | null>(null);

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [state, dispatch] = React.useReducer(appStateReducer, defaultState);

  const value = { state, dispatch };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = React.useContext(AppStateContext);

  if (context === null) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }

  return context;
};
