import { AuthResponseDto } from "common";
import React from "react";
import styled from "styled-components";
import { Avatar } from "../../components/avatar";

const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  font-family: "ArchivoVariable", sans-serif;
`;
const Usernamne = styled.span`
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;
const Icons = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.span`
  font-variation-settings: "FILL" 1, "wght" 100, "GRAD" -25, "opsz" 24;
`;

export const Sideline = ({ authData }: { authData: AuthResponseDto }) => {
  return (
    <Container>
      <Avatar imageUrl={authData.profile.mediumAvatar} size={56} />
      <Usernamne>{authData.profile.name}</Usernamne>
      <Icons>
        <Icon className="material-symbols-outlined">search</Icon>
        <Icon className="material-symbols-outlined">list</Icon>
        <Icon className="material-symbols-outlined">logout</Icon>
      </Icons>
    </Container>
  );
};
