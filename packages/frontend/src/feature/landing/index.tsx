import React from "react";
import styled from "styled-components";
import { Typography } from "../../components/typography";
import { useAppState } from "../../services/context";

const Container = styled.main<{ bg: string }>`
  height: calc(100vh - 4rem);
  width: calc(100vw - 4rem);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
`;

const SignInButton = styled.a`
  background-color: ${(props) => props.theme.secondaryContainer};
  color: ${(props) => props.theme.textColor};
  text-decoration: none;
  padding: 1.2rem 2rem;
  border-radius: 40px;
  transition: all 0.15s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const CenterContainer = styled.main`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Landing = () => {
  const { state } = useAppState();

  return (
    <Container bg={state.background}>
      <Typography variant="h1" customGutterBottom={1}>
        Openings
      </Typography>
      <Typography variant="body1">
        Listen to weeb music from your Anilist profile.
      </Typography>
      <CenterContainer>
        <SignInButton href="https://anilist.co/api/v2/oauth/authorize?client_id=8772&redirect_uri=http://localhost:9000/auth&response_type=code">
          Sign in with Anilist
        </SignInButton>
      </CenterContainer>
    </Container>
  );
};
