import { OpeningsDto, UserListMedia } from "common";
import React from "react";
import styled from "styled-components";
import useFetch from "use-http";
import { Typography } from "../../components/typography";
import { apiUrl } from "../../services/misc/generate-api-url";
import routes from "../../services/config/routes.json";
import { BarLoader } from "react-spinners";
import { List } from "../../components/openings/list";
import Color from "color";

const Container = styled.section`
  position: fixed;
  width: calc((100vw - 80px) * 0.275 - 2rem);
  top: 0;
  right: 0;
  height: calc(100% - 2rem);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: rgba(
    ${(props) => {
      const color = Color(props.theme.primaryColor).lighten(0.1);
      return `${parseInt("" + color.red(), 10)}, ${parseInt(
        "" + color.green(),
        10,
      )}, ${parseInt("" + color.blue(), 10)}`;
    }},
    0.35
  );
`;

// const Banner = styled.div<{ banner: string }>`
//   height: 250px;
//   background-image: url(${(props) => props.banner});
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   margin-bottom: 2rem;
// `;

const Poster = styled.div<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 225px;
  aspect-ratio: 0.7;
  border-radius: 22px;
  margin: 0 auto 1rem auto;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
`;

const ListContainer = styled.section`
  margin: 0.75rem 0;
  flex-grow: 1;
  max-height: 100%;
  overflow-y: auto;
`;

export interface OpeningsProps {
  media?: UserListMedia;
}

export const Openings = (props: OpeningsProps) => {
  if (!props.media) {
    return null;
  }

  const {
    loading,
    error,
    data = null,
  } = useFetch<OpeningsDto>(
    `${apiUrl(routes["get-openings"])}/?title=${encodeURIComponent(
      props.media.title.english,
    )}`,
    {},
    [props.media.title.english],
  );

  function generateView() {
    if (loading) {
      return (
        <InfoContainer>
          <BarLoader />
          Loading...
        </InfoContainer>
      );
    }

    if (error) {
      return (
        <InfoContainer>
          <Typography variant="h3">Error</Typography>
        </InfoContainer>
      );
    }

    if (!data) {
      return (
        <InfoContainer>
          <Typography variant="h3">Data error</Typography>
        </InfoContainer>
      );
    }

    return (
      <ListContainer>
        {data.openings.length > 0 && (
          <List
            title="Openings"
            songs={data.openings}
            banner={props.media?.bannerImage ?? ""}
            poster={props.media?.coverImage.extraLarge ?? ""}
          />
        )}
        {data.endings.length > 0 && (
          <List
            title="Endings"
            songs={data.endings}
            banner={props.media?.bannerImage ?? ""}
            poster={props.media?.coverImage.extraLarge ?? ""}
          />
        )}
        {data.inserts.length > 0 && (
          <List
            title="Inserts"
            songs={data.inserts}
            banner={props.media?.bannerImage ?? ""}
            poster={props.media?.coverImage.extraLarge ?? ""}
          />
        )}
      </ListContainer>
    );
  }

  return (
    <Container>
      <Poster image={props.media.coverImage.extraLarge} />
      <Typography variant="h4" align="center">
        {props.media.title.romaji}
      </Typography>
      {generateView()}
    </Container>
  );
};
