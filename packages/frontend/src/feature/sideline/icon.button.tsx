import React from "react";
import styled, { css } from "styled-components";
import stylesConfig from "../../services/config/styles.config";

export interface SidelineIconButtonProps {
  icon: string;
  onClick: () => unknown;
  label: string;
  active?: boolean;
}

const Container = styled.button`
  height: 56px;
  width: 100px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;

const IconContainer = styled.div<{ active?: boolean }>`
  width: 56px;
  height: 32px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.active ? props.theme.secondaryContainer : "transparent"};
  border-radius: ${stylesConfig.sideline.iconContainer.borderRadius};
`;

const Icon = styled.span<{ filled: boolean }>`
  ${(props) => css`
    font-variation-settings: "FILL" ${props.filled ? 1 : 0},
      "wght" ${props.filled ? 600 : 300}, "GRAD" -25, "opsz" 24;
    color: ${props.filled ? props.theme.textColor : props.theme.textColorMuted};
  `}
`;

const Label = styled.div<{ active?: boolean }>`
  font-size: 0.75rem;
  font-family: ${stylesConfig.fontFamily};
  font-weight: 500;
  color: ${(props) =>
    props.active ? props.theme.textColor : props.theme.textColorMuted};
`;

export const IconButton = (props: SidelineIconButtonProps) => {
  return (
    <Container onClick={props.onClick}>
      <IconContainer active={Boolean(props.active)}>
        <Icon
          className="material-symbols-outlined"
          filled={Boolean(props.active)}
        >
          {props.icon}
        </Icon>
      </IconContainer>
      <Label active={Boolean(props.active)}>{props.label}</Label>
    </Container>
  );
};
