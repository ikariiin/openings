import React from "react";
import { PlayerView } from "../../services/context/audio";
import { Menu } from "../menu";
import { MenuController, PositionAnchor } from "../menu/menu.controller";
import { IconButton } from "./icon.button";

export interface ViewManagerProps {
  view: PlayerView;
  // eslint-disable-next-line no-unused-vars
  onViewChange: (view: PlayerView) => void;
}

export const ViewManager = ({ view, onViewChange }: ViewManagerProps) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [menuAnchorPos, setMenuAnchorPos] =
    React.useState<PositionAnchor | null>(null);

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      console.log("rect> ", rect);
      setMenuAnchorPos({
        bottom: window.innerHeight - rect.top,
        right: window.innerWidth - rect.left,
      });
    }
  }, [buttonRef.current]);

  function getIcon() {
    switch (view) {
      case PlayerView.Floating:
        return "picture_in_picture_alt";
      case PlayerView.Fullscreen:
        return "fullscreen";
      case PlayerView.BottomFixed:
        return "vertical_align_bottom";
    }
  }

  return (
    <>
      <MenuController
        open={showMenu}
        position={menuAnchorPos}
        onClose={() => {
          console.log("onClose");
          setShowMenu(false);
        }}
      >
        <Menu
          items={[
            {
              label: "Floating",
              icon: "picture_in_picture_alt",
              selected: view === PlayerView.Floating,
              onClick: () => {
                onViewChange(PlayerView.Floating);
                setShowMenu(false);
              },
            },
            {
              label: "Fullscreen",
              onClick: () => {
                onViewChange(PlayerView.Fullscreen);
                setShowMenu(false);
              },
              icon: "fullscreen",
              selected: view === PlayerView.Fullscreen,
            },
            {
              label: "Bottom Fixed",
              icon: "vertical_align_bottom",
              selected: view === PlayerView.BottomFixed,
              onClick: () => {
                onViewChange(PlayerView.BottomFixed);
                setShowMenu(false);
              },
            },
          ]}
        />
      </MenuController>
      <IconButton
        icon={getIcon()}
        onClick={() => {
          setShowMenu(true);
        }}
        ref={buttonRef}
      />
    </>
  );
};
