import React from "react";
import styled from "styled-components";

export const Flex = styled.div<{ center?: boolean }>`
  display: flex;
  ${(props) => props.center && "align-items: center;"}
`;

export const DotGap = () => {
  return (
    <span style={{ margin: "0 0.5rem", fontWeight: "900" }}>&middot;</span>
  );
};
