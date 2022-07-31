import React from "react";
import styled from "styled-components";
import { MenuItem, MenuItemProps } from "./item.menu";

const Container = styled.div`
  border-radius: 4px;
  margin: 8px 0;
  background-color: ${(props) => props.theme.surfaceColorVariant};
  /* Material design drop shadow */
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

export interface MenuProps {
  items: MenuItemProps[];
}

export const Menu = ({ items }: MenuProps) => {
  return (
    <Container>
      {items.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </Container>
  );
};
