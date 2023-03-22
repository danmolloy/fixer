import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import PlayerMenu from "../../components/fixing/playerMenu";
import React from "react";

const mockProps = {
  menuItems: [
    {text: "contact",
      id: "2"
    }
  ]
};

describe("PlayerMenu component", () => {
  beforeEach(() => {
    render(<PlayerMenu {...mockProps} />);
  });
  it("Renders", () => {
    const playerMenu = screen.getByTestId("player-menu");
    expect(playerMenu).toBeInTheDocument();
  });
  it("All props are in the document", () => {
    const playerMenu = screen.getByTestId("player-menu");
    for (let i = 0; i < mockProps.menuItems.length; i ++) {
      expect(playerMenu.textContent).toMatch(mockProps.menuItems[i].text)
    }
  });
});