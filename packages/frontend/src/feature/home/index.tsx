import React from "react";
import useFetch from "use-http";
import { apiUrl } from "../../services/misc/generate-api-url";
import { loadStore } from "../../services/store";
import config from "../../services/config/routes.json";
import { AuthResponseDto, UserListDto } from "common";
import styled from "styled-components";
import { Typography } from "../../components/typography";
import { SectionBrowser } from "./section-browser";
import { Poster } from "./poster";
import { useAppState } from "../../services/context";
import { actions } from "../../services/context/actions";

const Container = styled.section`
  display: grid;
  grid-template-columns: 7fr 3fr;
`;

const Content = styled.div`
  margin: 1.5rem;
`;

const PosterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
  margin-bottom: 2.5rem;
`;

export const Home = () => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const { dispatch } = useAppState();

  const {
    loading,
    error,
    data = null,
  } = useFetch<Array<UserListDto>>(
    `${apiUrl(config["get-user-list"])}?access_token=${encodeURIComponent(
      loadStore<AuthResponseDto>("auth")?.accessToken ?? "",
    )}`,
    {},
    [],
  );

  if (loading) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h3">Error</Typography>;
  }

  if (!data) {
    return <Typography variant="h3">Data error</Typography>;
  }

  function changeBackground(imageUrl: string): void {
    dispatch({ type: actions.updateBackground, payload: imageUrl });
  }

  function scrollToSection(sectionId: string) {
    if (!contentRef.current) {
      return;
    }

    const element = contentRef.current.querySelector(sectionId);
    if (!element) {
      return;
    }
    const { top } = element.getBoundingClientRect();

    document.querySelector("#main-scroll-container")?.scrollTo({
      top: top - 100,
      behavior: "smooth",
    });
  }

  return (
    <Container>
      <Content ref={contentRef}>
        <div style={{ height: 275 }} />
        <Typography variant="h1" customGutterBottom={2}>
          Your shows
        </Typography>
        {data.map((group) => (
          <>
            <Typography
              variant="h2"
              customGutterBottom={1.5}
              id={`page-loc-${group.name.replace(/\s/g, "-")}`}
            >
              {group.name}
            </Typography>
            <PosterGrid>
              {group.entries.map((entry) => (
                <Poster
                  key={entry.id}
                  entry={entry}
                  onClick={(entry) => {
                    // Using extraLarge here as well because its probably already
                    // cached by the browser.
                    changeBackground(entry.media.coverImage.extraLarge);
                  }}
                />
              ))}
            </PosterGrid>
          </>
        ))}
      </Content>
      <SectionBrowser
        sectionMap={data
          .map((data) => ({
            [data.name]: `page-loc-${data.name.replace(/\s/g, "-")}`,
          }))
          .reduce((acc, curr) => ({ ...acc, ...curr }), {})}
        onClick={(sectionId) => scrollToSection(sectionId)}
      />
    </Container>
  );
};
