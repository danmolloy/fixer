import React from "react";

interface PlayerMenuProps {
  menuItems: {
    text: string
    id: string
  }[]
};

export default function PlayerMenu(props: PlayerMenuProps) {
  const { menuItems } = props;
  return (
    <div data-testid="player-menu">
      {menuItems.map(i => (
        <button key={i.id}>
          {i.text}
        </button>
      ))}
    </div>
  );
}