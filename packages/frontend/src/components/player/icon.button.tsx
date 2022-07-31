import React from "react";
import styled from "styled-components";
import { Icon } from "../icon";

const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
`;

export interface IconButtonProps {
  icon: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = React.forwardRef(
  ({ icon, onClick }: IconButtonProps, ref) => {
    return (
      <Button onClick={onClick} ref={ref as any}>
        <Icon className="material-symbols-outlined">{icon}</Icon>
      </Button>
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton };
