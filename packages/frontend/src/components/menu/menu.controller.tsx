import React from "react";
import ClickAwayListener from "react-click-away-listener";
// import { Collapse } from "react-collapse";
import styled from "styled-components";

export type PositionAnchor = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};

const Container = styled.div<{ position: PositionAnchor }>`
  position: fixed;
  ${(props) => {
    const { top, left, bottom, right } = props.position;
    return `
      ${top !== undefined ? `top: ${top}px;` : ""}
      ${left !== undefined ? `left: ${left}px;` : ""}
      ${bottom !== undefined ? `bottom: ${bottom}px;` : ""}
      ${right !== undefined ? `right: ${right}px;` : ""}
    `;
  }}
`;

export interface MenuControllerProps {
  children: React.ReactElement;
  open: boolean;
  position: PositionAnchor | null;
  onClose: () => void;
}

export const MenuController = ({
  children,
  open,
  position,
  onClose,
}: MenuControllerProps) => {
  if (!open) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={() => open && position && onClose()}>
      <Container position={position ?? {}}>
        {/* <Collapse isOpened={open}> */}
        {children}
        {/* </Collapse> */}
      </Container>
    </ClickAwayListener>
  );
};
