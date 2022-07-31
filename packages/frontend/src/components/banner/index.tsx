import React from "react";
import styled from "styled-components";
import { useAudioState } from "../../services/context/audio";
import stylesConfig from "../../services/config/styles.config";

const Container = styled.div<{ noTopOffset?: boolean }>`
  width: ${stylesConfig.bannerWidth};
  height: 100vh;
  position: fixed;
  top: ${(props) => (props.noTopOffset ? "0" : "82px")};
  left: 80px;
`;
const Image = styled.div<{ image: string }>`
  background-size: cover;
  transform: translateY(-100%) rotate(90deg);
  transform-origin: 0 ${stylesConfig.bannerWidth};
  width: calc(100vh);
  height: ${stylesConfig.bannerWidth};
  background-image: url(${(props) => props.image});
  background-position: center;
  /* border-radius: 22px; */
`;

export const Banner = ({ noTopOffset }: { noTopOffset?: boolean }) => {
  const {
    state: { bannerImage },
  } = useAudioState();
  return (
    <Container noTopOffset={noTopOffset}>
      <Image image={bannerImage} />
    </Container>
  );
};
