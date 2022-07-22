import { AuthResponseDto } from "common";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "../../components/avatar";
import { IconButton } from "./icon.button";

const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  font-family: "ArchivoVariable", sans-serif;
`;
const Usernamne = styled.span`
  font-size: 0.75rem;
  margin-top: 4px;
  font-weight: 500;
`;
const Icons = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Sideline = ({ authData }: { authData: AuthResponseDto }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      <Avatar imageUrl={authData.profile.mediumAvatar} size={56} />
      <Usernamne>{authData.profile.name}</Usernamne>
      <Icons>
        <IconButton
          icon="home"
          label="Home"
          onClick={() => {
            navigate("/");
          }}
          active={location.pathname === "/"}
        />
        <IconButton
          icon="search"
          label="Search"
          onClick={() => {
            navigate("/search");
          }}
          active={location.pathname === "/search"}
        />
        <IconButton
          icon="list"
          label="Browse"
          onClick={() => {
            navigate("/browse");
          }}
          active={location.pathname === "/browse"}
        />
        <IconButton
          icon="logout"
          label="Logout"
          onClick={() => {
            //
          }}
        />
      </Icons>
    </Container>
  );
};
