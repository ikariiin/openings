import React from "react";
import styled from "styled-components";
import { Icon } from "../icon";

const Container = styled.div<{ selected?: boolean }>`
  display: flex;
  padding: 0 12px;
  align-items: center;
  cursor: pointer;
  height: 48px;
  transition: all 125ms ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.textColor}14;
  }

  ${(props) =>
    props.selected &&
    `
    background-color: ${props.theme.textColor}1f;
  `}

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const IconContainer = styled.div`
  margin-right: 12px;
  margin-bottom: -5px;
`;

const Label = styled.div`
  font-size: 0.95rem;
  letter-spacing: -0.2px;
`;

export interface MenuItemProps {
  label: string;
  onClick: () => void;
  icon?: string;
  selected?: boolean;
}

export const MenuItem = ({ label, onClick, icon, selected }: MenuItemProps) => {
  return (
    <Container onClick={onClick} selected={selected}>
      {icon && (
        <IconContainer>
          <Icon className="material-symbols-outlined">{icon}</Icon>
        </IconContainer>
      )}
      <Label>{label}</Label>
    </Container>
  );
};
