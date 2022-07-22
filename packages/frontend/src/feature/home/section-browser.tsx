import React from "react";
import styled from "styled-components";

export interface SectionBrowserProps {
  sectionMap: { [key: string]: string };
  // eslint-disable-next-line no-unused-vars
  onClick: (sectionId: string) => void;
}

const Container = styled.section``;

export const SectionBrowser = (props: SectionBrowserProps) => {
  return (
    <Container>
      {Object.keys(props.sectionMap).map((key) => {
        return (
          <div
            onClick={() => props.onClick(`#${props.sectionMap[key]}`)}
            key={key}
          >
            {key}
          </div>
        );
      })}
    </Container>
  );
};
