import React from "react";
import styled from "styled-components";
import { useAppState } from "../../services/context";
import { actions } from "../../services/context/actions";
import { Seekbar } from "../../components/player/seekbar";
import { Banner } from "../../components/player/banner";
import { Volume } from "../../components/player/volume";

const AudioElement = styled.audio`
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: fixed;
  z-index: -9999;
  top: -9999px;
  left: -9999px;
`;

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  border-radius: 22px;
  background-color: ${(props) => props.theme.surfaceColor};
  min-width: 300px;
  width: calc((100vw - 80px) * 0.275 - 2.5rem);
  z-index: 10;
`;

const Content = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
`;

export const Player = () => {
  const { state, dispatch } = useAppState();
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = React.useState(0);

  const [songName, setSongName] = React.useState("");
  const [songArtist, setSongArtist] = React.useState("");

  React.useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.addEventListener("ended", () => {
      dispatch({
        type: actions.updateAudioProp,
        payload: {
          playing: false,
        },
      });
    });

    audioRef.current.addEventListener("timeupdate", () => {
      if (!audioRef.current) {
        return;
      }

      setCurrentTime(audioRef.current.currentTime);
    });

    audioRef.current.addEventListener("loadedmetadata", () => {
      if (!audioRef.current) {
        return;
      }

      dispatch({
        type: actions.updateAudioProp,
        payload: {
          duration: audioRef.current.duration,
        },
      });
    });
  }, [audioRef.current]);

  React.useEffect(() => {
    if (
      audioRef.current &&
      state.audio.src !== "" &&
      state.audio.src !== audioRef.current.src
    ) {
      audioRef.current.src = state.audio.src;
      audioRef.current.load();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [state.audio.src, audioRef.current]);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.audio.volume;
    }
  }, [state.audio.volume, audioRef.current]);

  React.useEffect(() => {
    if (audioRef.current) {
      state.audio.playing ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [state.audio.playing, audioRef.current]);

  React.useEffect(() => {
    if (!state.audio) return;

    console.log(
      "artist> ",
      state.audio.title
        .split("by")
        .pop()
        ?.trim()
        .replace(/\(.*?\)/gm, ""),
    );

    setSongArtist(
      state.audio.title
        .split("by")
        .pop()
        ?.trim()
        .replace(/\(.*?\)/gm, "") || "",
    );
    const songRegexp = /(?<=").*?(?=")/gm;
    setSongName(songRegexp.exec(state.audio.title)?.[0] || "");
  }, [state.audio.title]);

  const togglePlay = () => {
    dispatch({
      type: actions.updateAudioProp,
      payload: {
        playing: !state.audio.playing,
      },
    });
  };

  return (
    <PlayerContainer>
      <AudioElement ref={audioRef} />
      <Banner
        image={state.bannerImage}
        onTogglePlay={togglePlay}
        playing={state.audio.playing}
        songName={songName}
        artistName={songArtist}
      />
      <Content>
        <Seekbar
          currentTime={currentTime}
          duration={state.audio.duration}
          onChange={(value) => {
            if (audioRef.current) {
              audioRef.current.currentTime = value;
            }
          }}
        />
        <Volume
          volume={state.audio.volume}
          onChange={(value) => {
            dispatch({
              type: actions.updateAudioProp,
              payload: {
                volume: value,
              },
            });
          }}
        />
      </Content>
    </PlayerContainer>
  );
};
