import React from "react";
import styled from "styled-components";
import { PlayerProps } from "./player.controller";
import stylesConfig from "../../services/config/styles.config";
import { useAudioState } from "../../services/context/audio";
import { audioActions } from "../../services/context/audio.actions";
import { Typography } from "../../components/typography";
import { Seekbar } from "../../components/player/seekbar";
import { PlayButton } from "../../components/player/bottom/play-button";
import { ViewManager } from "../../components/player/view.manager";
import { Volume } from "../../components/player/volume";
import { useAppState } from "../../services/context";

const Container = styled.footer`
  height: ${stylesConfig.bottomFixedPlayerHeight};
  width: calc(100% - 95px * 2);
  background-color: ${(props) => props.theme.surfaceColor}d6;
  border-radius: 22px 22px 0 0;
  display: flex;
  align-items: center;
  padding: 0 95px;
  z-index: 10;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
`;

const SongDetails = styled.div`
  width: 20%;
  display: flex;
`;

const ControlsContainer = styled.div`
  width: 40%;
  margin: 0 auto;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Gap = styled.div`
  width: 1rem;
`;

const CoverArt = styled.div<{ src: string }>`
  width: ${stylesConfig.coverArtSize};
  height: ${stylesConfig.coverArtSize};
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 4px;
  margin-right: 1rem;
`;

export const BottomFixedPlayer = (props: PlayerProps) => {
  const { state: audioState, dispatch } = useAudioState();
  const { state: appState } = useAppState();

  const [currentTime, setCurrentTime] = React.useState(0);

  const [songName, setSongName] = React.useState("");
  const [songArtist, setSongArtist] = React.useState("");

  React.useEffect(() => {
    if (!props.audioRef.current) {
      return;
    }

    props.audioRef.current.addEventListener("timeupdate", () => {
      if (!props.audioRef.current) {
        return;
      }

      setCurrentTime(props.audioRef.current.currentTime);
    });
  }, [props.audioRef.current]);

  React.useEffect(() => {
    setSongArtist(
      audioState.title
        .split("by")
        .pop()
        ?.trim()
        .replace(/\(.*?\)/gm, "") || "",
    );
    const songRegexp = /(?<=").*?(?=")/gm;
    setSongName(songRegexp.exec(audioState.title)?.[0] || "");
  }, [audioState.title]);

  const togglePlay = () => {
    dispatch({
      type: audioActions.updateAudioProp,
      payload: {
        playing: !audioState.playing,
      },
    });
  };

  return (
    <Container>
      <Content>
        <SongDetails>
          <CoverArt src={appState.selectedMedia?.coverImage.large || ""} />
          <section>
            <Typography variant="h5">{songName}</Typography>
            <Typography variant="caption">
              {songArtist} - {appState.selectedMedia?.title.romaji}
            </Typography>
          </section>
        </SongDetails>
        <ControlsContainer>
          <Seekbar
            duration={audioState.duration}
            currentTime={currentTime}
            onChange={(time) => {
              if (!props.audioRef.current) {
                return;
              }

              props.audioRef.current.currentTime = time;
            }}
          />
          <Controls>
            <PlayButton playing={audioState.playing} onClick={togglePlay} />
          </Controls>
        </ControlsContainer>
        <Volume
          volume={audioState.volume}
          onChange={(value) => {
            dispatch({
              type: audioActions.updateAudioProp,
              payload: {
                volume: value,
              },
            });
          }}
          width={120}
        />
        <Gap />
        <ViewManager onViewChange={props.onViewChange} view={props.view} />
      </Content>
    </Container>
  );
};
