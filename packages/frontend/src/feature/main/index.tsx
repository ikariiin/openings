import React from "react";
import styled from "styled-components";
import { useAppState } from "../../services/context";

const Container = styled.main<{ image: string }>`
  width: calc(100% - 80px);
  margin-left: 80px;
  height: 100vh;
  overflow-y: auto;
  background-color: ${(props) => props.theme.backgroundColor};
  background-size: cover;
`;

export const Main = ({ children }: { children: React.ReactNode }) => {
  const {
    state: { background },
  } = useAppState();
  return (
    <Container image={background} id="main-scroll-container">
      {children}
    </Container>
  );
};
