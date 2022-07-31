import { SongEntry } from "common";
import React from "react";
import styled from "styled-components";
import { actions } from "../../services/context/actions";
import { apiUrl } from "../../services/misc/generate-api-url";
import { Typography } from "../typography";
import routes from "../../services/config/routes.json";
import { useAudioState } from "../../services/context/audio";
import { useAppState } from "../../services/context";

const Container = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
`;

const ListItem = styled.li`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0.25rem 0.5rem;
  padding: 0.65rem 1.15rem;
  background-color: ${(props) => props.theme.secondaryContainerVariant};
  font-size: 0.875rem;
  line-height: 1.45;
  font-weight: 500;
  border-radius: 18px;
  cursor: pointer;
`;

export interface ListProps {
  songs: Array<SongEntry>;
  banner: string;
  title: string;
  poster: string;
}

export const List = (props: ListProps) => {
  const { dispatch: audioStateDispatch } = useAudioState();
  const { dispatch: appStateDispatch } = useAppState();

  return (
    <>
      <Typography variant="h5">{props.title}</Typography>
      <Container>
        {props.songs.map((song) => (
          <ListItem
            key={song.gid}
            role="button"
            onClick={() => {
              audioStateDispatch({
                type: actions.playSong,
                payload: {
                  src: `${apiUrl(
                    routes["get-audio"],
                  )}?title=${encodeURIComponent(song.title)}`,
                  title: song.title,
                },
              });
              appStateDispatch({
                type: actions.updateBackground,
                payload: props.poster,
              });
              audioStateDispatch({
                type: actions.updateBannerImage,
                payload: props.banner,
              });
            }}
          >
            {song.title}
          </ListItem>
        ))}
      </Container>
    </>
  );
};
