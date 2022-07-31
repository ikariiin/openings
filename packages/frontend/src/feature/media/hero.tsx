import { OpeningsDto, UserListMedia } from "common";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DotGap, Flex } from "../../components/common";
import { Icon } from "../../components/icon";
import { Typography } from "../../components/typography";

const Container = styled.section`
  padding: 2rem;
  display: flex;
  background-color: ${(props) => props.theme.surfaceColor};
  align-items: center;
  position: relative;
`;

const Poster = styled.div<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 275px;
  aspect-ratio: 0.75;
  border-radius: 22px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

const TextContainer = styled.div`
  flex-grow: 1;
`;

const BackIcon = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background-color: ${(props) => props.theme.primaryContainer};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Hero = ({
  media,
  openings,
}: {
  media: UserListMedia;
  openings?: OpeningsDto;
}) => {
  const navigate = useNavigate();

  function getSongCount() {
    if (!openings) {
      return 0;
    }
    return (
      openings.openings.length +
      openings.endings.length +
      openings.inserts.length
    );
  }

  function getOpenings() {
    if (!openings) return 0;

    return openings.openings.length;
  }

  function getEndings() {
    if (!openings) return 0;

    return openings.endings.length;
  }

  function getInserts() {
    if (!openings) return 0;

    return openings.inserts.length;
  }

  return (
    <Container>
      <BackIcon onClick={() => navigate(-1)}>
        <Icon className="material-symbols-outlined" opsz={48} weight={700}>
          arrow_back
        </Icon>
      </BackIcon>
      <TextContainer>
        <Typography variant="h1" gutterBottom>
          {media.title.romaji}
        </Typography>
        <Typography variant="h5" customGutterBottom={2}>
          {media.title.english}
        </Typography>
        <Flex center style={{ marginBottom: "0.5rem" }}>
          <Icon className="material-symbols-outlined">queue_music</Icon>
          <Typography variant="h6">{getSongCount()} songs</Typography>
        </Flex>
        <Flex center>
          {getOpenings() > 0 && (
            <>
              <Icon className="material-symbols-outlined">flag</Icon>
              {getOpenings()} openings
              <DotGap />
            </>
          )}
          {getEndings() > 0 && (
            <>
              <Icon className="material-symbols-outlined">agender</Icon>
              {getEndings()} endings
              {getInserts() > 0 && <DotGap />}
            </>
          )}
          {getInserts() > 0 && (
            <>
              <Icon className="material-symbols-outlined">music_note</Icon>
              {getInserts()} inserts
            </>
          )}
        </Flex>
      </TextContainer>
      <Poster image={media.coverImage.extraLarge} />
    </Container>
  );
};
