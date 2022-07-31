import React from "react";
import styled from "styled-components";
import { useAppState } from "../../services/context";
import { PlayerView, useAudioState } from "../../services/context/audio";
import stylesConfig from "../../services/config/styles.config";

const Container = styled.main<{ image: string; bottomGutter?: boolean }>`
  width: calc(100% - 80px);
  margin-left: 80px;
  height: ${(props) =>
    props.bottomGutter
      ? `calc(100vh - ${stylesConfig.bottomFixedPlayerHeight})`
      : "100vh"};
  /* height: 100vh; */
  overflow-y: auto;
  background-color: ${(props) => props.theme.backgroundColor};
  background-size: cover;
  position: relative;
`;

export const Main = ({ children }: { children: React.ReactNode }) => {
  const {
    state: { background },
  } = useAppState();
  const {
    state: { playerView },
  } = useAudioState();
  return (
    <Container
      image={background}
      id="main-scroll-container"
      bottomGutter={playerView === PlayerView.BottomFixed}
    >
      {children}
    </Container>
  );
};
