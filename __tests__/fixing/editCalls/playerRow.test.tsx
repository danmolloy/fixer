import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom"
import PlayerRow from "../../../components/fixing/editCalls/playerRow";
import React from "react";

const mockPlayer = {
  id: "1",
  name: "mockPlayer1",
  email: "mockEmail1",
  emailVerified: null,
  instrument: "Double Bass",
  profileInfo: null,
  isFixer: false,
};

const mockEventCalls = [{
  id: 1,
  createdAt: "mockCreatedAt",
  updatedAt: "mockUpdatedAt",
  startTime: "Tue, 21 Feb 2023 12:06:40 GMT",
  endTime: "Tue, 21 Feb 2023 15:06:40 GMT",
  venue: "Maida Vale",
  eventId: 2,
  fixerEmail: "mock@email.com"
}];

const mockProps = {
  appendedPlayer: mockPlayer,
  eventCalls: mockEventCalls
};



describe("PlayerRow component", () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <PlayerRow {...mockProps} />
        </tbody>
      </table>
    
    );
  });
  it("Player name is in the document", () => {
    const playerRow = screen.getByTestId("player-row");
    expect(playerRow.textContent).toMatch(mockPlayer.name);
  });
  it("All calls are in the document and are checkboxes", () => {
    for (let i = 0; i < mockEventCalls.length; i ++) {
      let callBox = screen.getByTestId(`call-${mockEventCalls[i].id}`);
      expect(callBox).toBeInTheDocument();
      expect(callBox).toHaveAttribute("type", "checkbox");
    }
  });
  it("Menu icon is in the document", () => {
    const menuIcon = screen.getByTestId("player-menu-icon");
    expect(menuIcon).toBeInTheDocument();
  });
  it("Menu icon renders options on click", () => {

  });

});