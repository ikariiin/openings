import React from "react";
import styled from "styled-components";
import { Typography } from "../../components/typography";

export interface SectionBrowserProps {
  sectionMap: { [key: string]: string };
  // eslint-disable-next-line no-unused-vars
  onClick: (sectionId: string) => void;
}

const Container = styled.section`
  position: sticky;
  top: 0;
  display: flex;
  height: 80px;
  align-items: center;
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;
  background-color: ${(props) => props.theme.backgroundColor};
  border-bottom: 2px solid ${(props) => props.theme.textColorMuted};
`;

const Pill = styled.div`
  border-radius: 18px;
  padding: 0.5rem 0.75rem;
  background-color: ${(props) => props.theme.surfaceColor};
  text-align: center;
  cursor: pointer;
  margin: 0 0.25rem;
  flex-shrink: 0;
`;

export const SectionBrowser = (props: SectionBrowserProps) => {
  return (
    <Container>
      {Object.keys(props.sectionMap).map((key) => {
        return (
          <Pill
            onClick={() => props.onClick(`#${props.sectionMap[key]}`)}
            key={key}
          >
            <Typography variant="body2">{key}</Typography>
          </Pill>
        );
      })}
    </Container>
  );
};
