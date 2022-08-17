import { OpeningsDto, UserListMedia } from "common";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Banner } from "../../components/banner";
import { useAppState } from "../../services/context";
import stylesConfig from "../../services/config/styles.config";
import { apiUrl } from "../../services/misc/generate-api-url";
import routes from "../../services/config/routes.json";
import { BarLoader } from "react-spinners";
import { Typography } from "../../components/typography";
import { List } from "../../components/openings/list";
import { Hero } from "./hero";

const Container = styled.section`
  padding-left: ${stylesConfig.bannerWidth};
`;

const ListContainer = styled.section`
  margin: 1rem;
`;

export const Media = () => {
  const { id } = useParams();
  const [media, setMedia] = React.useState<UserListMedia | null>(null);
  const [data, setData] = React.useState<OpeningsDto | null>(null);
  const [error, setError] = React.useState<unknown | null>(null);
  const [loading, setLoading] = React.useState(true);

  const {
    state: { selectedMedia },
  } = useAppState();

  React.useEffect(() => {
    console.log("id check> ", id, selectedMedia);
    if (selectedMedia && selectedMedia.id === Number(id)) {
      setMedia(selectedMedia);
    }
  }, [id]);

  React.useEffect(() => {
    if (!media) {
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl(routes["get-openings"])}/?title=${encodeURIComponent(
            media?.title.english ?? "",
          )}`,
        );
        const data = (await response.json()) as OpeningsDto;
        console.log("data> ", data);
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    })();
  }, [media?.id]);

  const generateView = () => {
    if (loading) {
      return (
        <>
          <BarLoader />
          Loading...
        </>
      );
    }

    if (error) {
      return (
        <>
          <Typography variant="h3">Error</Typography>
        </>
      );
    }

    if (!data) {
      return (
        <>
          <Typography variant="h3">Data error</Typography>
        </>
      );
    }

    return (
      <ListContainer>
        {data.openings.length > 0 && (
          <List
            title="Openings"
            songs={data.openings}
            banner={media?.bannerImage ?? ""}
            poster={media?.coverImage.extraLarge ?? ""}
          />
        )}
        {data.endings.length > 0 && (
          <List
            title="Endings"
            songs={data.endings}
            banner={media?.bannerImage ?? ""}
            poster={media?.coverImage.extraLarge ?? ""}
          />
        )}
        {data.inserts.length > 0 && (
          <List
            title="Inserts"
            songs={data.inserts}
            banner={media?.bannerImage ?? ""}
            poster={media?.coverImage.extraLarge ?? ""}
          />
        )}
      </ListContainer>
    );
  };

  if (!media) {
    return (
      <Container>
        <BarLoader />
        Loading...
      </Container>
    );
  }

  return (
    <Container>
      <Banner noTopOffset={true} />
      <Hero media={media} openings={data ?? undefined} />
      {generateView()}
    </Container>
  );
};
