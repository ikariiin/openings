import { AuthResponseDto } from "common";
import React from "react";
import styled from "styled-components";
import useFetch from "use-http";
import config from "../../services/config/routes.json";
import { useAppState } from "../../services/context";
import { apiUrl } from "../../services/misc/generate-api-url";
import { getQueryParam } from "../../services/misc/url-query";
import { saveStore } from "../../services/store";

const Container = styled.main<{ bg: string }>`
  height: calc(100vh - 4rem);
  width: calc(100vw - 4rem);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
`;

export const AuthPage = () => {
  const { state } = useAppState();

  const [error, setError] = React.useState(false);

  const { loading, data = null } = useFetch<AuthResponseDto>(
    `${apiUrl(config["get-access-token"])}?code=${getQueryParam("code") ?? ""}`,
    {},
    [],
  );

  React.useEffect(() => {
    if (!data) {
      return;
    }

    if (!data.accessToken) {
      setError(true);
      return;
    }

    saveStore<AuthResponseDto>("auth", data);
    window.location.href = "/";
  }, [data]);

  return (
    <Container bg={state.background}>
      {loading && <h1>Signing you in with anilist, just a moment</h1>}
      {error && <h1>Something went wrong, please try again</h1>}
    </Container>
  );
};
