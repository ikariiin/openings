import { UserListEntry } from "common";
import React from "react";
import styled from "styled-components";

export interface PosterProps {
  entry: UserListEntry;
  // eslint-disable-next-line no-unused-vars
  onClick: (entry: UserListEntry) => void;
}

const PosterElement = styled.div<{ imageUrl: string }>`
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  aspect-ratio: 0.75;
  border-radius: 18px 18px 0 0;
`;

const Container = styled.section`
  background-color: ${(props) => props.theme.surfaceColor};
  border-radius: 18px;
  cursor: pointer;
`;

const Label = styled.div`
  font-size: 0.85rem;
  margin-top: 4px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0.5rem 0.75rem;
`;

export const Poster = (props: PosterProps) => {
  return (
    <Container onClick={() => props.onClick(props.entry)}>
      <PosterElement
        imageUrl={props.entry.media.coverImage.extraLarge}
      ></PosterElement>
      <Label>{props.entry.media.title.romaji}</Label>
    </Container>
  );
};
