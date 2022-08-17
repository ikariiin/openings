import React from "react";
import useFetch from "use-http";
import { apiUrl } from "../../services/misc/generate-api-url";
import { loadStore } from "../../services/store";
import config from "../../services/config/routes.json";
import { AuthResponseDto, UserListDto, UserListEntry } from "common";
import styled from "styled-components";
import { Typography } from "../../components/typography";
import { SectionBrowser } from "./section-browser";
import { Poster } from "./poster";
import { useAppState } from "../../services/context";
import { actions } from "../../services/context/actions";
import { Banner } from "../../components/banner";
import stylesConfig from "../../services/config/styles.config";
import { useNavigate } from "react-router-dom";

const Container = styled.section`
  display: flex;
`;

const Content = styled.div`
  margin: 0 1.5rem 1.5rem 0;
  width: 100%;
`;

const PosterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  grid-gap: 1rem;
  margin-bottom: 2.5rem;
`;

const GridContainer = styled.section`
  margin: 1.5rem 1.5rem 1.5rem calc(${stylesConfig.bannerWidth} + 1.5rem);
`;

export const Home = () => {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const { dispatch } = useAppState();
  const navigate = useNavigate();

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

  function selectEntry(entry: UserListEntry): void {
    // Using extraLarge here as well because its probably already
    // cached by the browser.
    // dispatch({
    //   type: actions.updateBackground,
    //   payload: entry.media.coverImage.extraLarge,
    // });
    dispatch({
      type: actions.selectMedia,
      payload: entry.media,
    });
  }

  function scrollToSection(sectionId: string) {
    if (!contentRef.current) {
      return;
    }

    document.querySelector("#main-scroll-container")?.scrollTo({
      top:
        (contentRef.current.querySelector(sectionId) as HTMLElement)
          ?.offsetTop - 100,
      behavior: "smooth",
    });
  }

  return (
    <Container>
      <Content ref={contentRef}>
        <SectionBrowser
          sectionMap={data
            .map((data) => ({
              [data.name]: `page-loc-${data.name.replace(/\s/g, "-")}`,
            }))
            .reduce((acc, curr) => ({ ...acc, ...curr }), {})}
          onClick={(sectionId) => scrollToSection(sectionId)}
        />
        <Banner />
        <GridContainer>
          {data.map((group) => (
            <>
              <Typography
                variant="h3"
                customGutterBottom={1.5}
                id={`page-loc-${group.name.replace(/\s/g, "-")}`}
              >
                {group.name}
              </Typography>
              <PosterGrid>
                {group.entries.map((entry) => (
                  <>
                    <Poster
                      key={entry.id}
                      entry={entry}
                      onClick={(entry) => {
                        selectEntry(entry);
                        navigate(`/media/${entry.media.id}`);
                      }}
                    />
                  </>
                ))}
              </PosterGrid>
            </>
          ))}
        </GridContainer>
      </Content>
      {/* <Openings media={appState.selectedMedia ?? undefined} /> */}
    </Container>
  );
};
