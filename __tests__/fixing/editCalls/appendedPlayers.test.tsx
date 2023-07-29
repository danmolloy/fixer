import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import AppendedPlayers, { AppendedPlayersProps } from "../../../components/fixing/editCalls/appendedPlayers";
import React from "react";
import { Formik } from "formik";
import { mockUserWithCalls } from "../../../__mocks__/models/user";
import { mockCall } from "../../../__mocks__/models/call";


const mockProps: AppendedPlayersProps = {
  appendedPlayers: [mockUserWithCalls],
  eventCalls: [mockCall],
  makeAvailable: jest.fn()
}

describe("AppendedPlayers component", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        {props => (
          <AppendedPlayers {...mockProps} />
        )}
      </Formik>)
  });
  it("Renders", () => {
    const appendedPlayers = screen.getByTestId("appended-players-div")
    expect(appendedPlayers).toBeInTheDocument()
  });
  it("Name and date columns are in the document", () => {
    if (mockProps.appendedPlayers.length < 1) {
      const appendedPlayers = screen.getByTestId("appended-players-div")
      expect(appendedPlayers.textContent).toMatch("Name")
      expect(appendedPlayers.textContent).toMatch(/12:06pm 21\/02/)
    }
  });
  it("Lists all players names", () => {
    const appendedPlayers = screen.getByTestId("appended-players-div")
    for(let i = 0; i < mockProps.appendedPlayers.length; i ++) {
      expect(appendedPlayers.textContent).toMatch(mockProps.appendedPlayers[i].name)
    }
  });
  it("Player rows have names and all calls which are checkboxes", () => {
    let playerRow: undefined|HTMLElement;
    let eventCall: undefined|HTMLElement;
    for (let i = 0; i < mockProps.appendedPlayers.length; i ++) {
      playerRow = screen.getByTestId(`${mockProps.appendedPlayers[i].id}-row`);
      expect(playerRow).toBeInTheDocument();
      expect(playerRow.textContent).toMatch(mockProps.appendedPlayers[i].name);
      for (let j = 0; j < mockProps.eventCalls.length; j ++) {
        eventCall = screen.getByTestId(`${mockProps.appendedPlayers[i].id}-row-call-${mockProps.eventCalls[i].id}`);
        expect(eventCall).toBeInTheDocument()
        expect(eventCall).toHaveAttribute("type", "checkbox")
      }
    }
  });
  it("Each player has a menu icon, which renders menu on click", () => {
    let playerMenuIcon: undefined|HTMLElement;
    let tableRowMenu: undefined|HTMLElement;
    for (let i = 0; i < mockProps.appendedPlayers.length; i ++) {
      playerMenuIcon = screen.getByTestId(`${mockProps.appendedPlayers[i].id}-player-menu-icon`);
      expect(playerMenuIcon).toBeInTheDocument();
      act(() => {
        fireEvent.click(playerMenuIcon)
      })
      tableRowMenu = screen.getByTestId("table-row-menu")
      expect(tableRowMenu).toBeInTheDocument()
      expect(tableRowMenu.textContent).toMatch(mockProps.appendedPlayers[i].name)
    }
  });
});