import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import AvailablePlayers, { AvailablePlayersProps } from "../../../components/fixing/editCalls/availablePlayers";
import React from "react";
import { Formik } from "formik";
import { mockEventInstrument } from "../../../__mocks__/models/eventInstrument";
import { mockUser } from "../../../__mocks__/models/user";

const mockProps: AvailablePlayersProps = {
  instrumentName: mockEventInstrument.instrumentName,
  availablePlayers: [mockUser],
  appendPlayer: jest.fn(),
  contactedPlayers: []
}


describe("AvailablePlayers component", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props) => (
          <AvailablePlayers {...mockProps} />
        )}
      </Formik>
    )
  })
  it("Renders", () => {
    const availablePlayers = screen.getByTestId("available-players-div")
    expect(availablePlayers).toBeInTheDocument()
  })
  it("If no players to select, it states so", () => {
    if (mockProps.availablePlayers.length < 1) {
      const availablePlayers = screen.getByTestId("available-players-div")
      expect(availablePlayers.textContent).toMatch(/No players to select/)
    }
  })
  it("'Select from Directory' heading text or 'No players to select' is in the document", () => {
    const availablePlayers = screen.getByTestId("available-players-div")
    if(mockProps.availablePlayers.length > 0) {
      expect(availablePlayers.textContent).toMatch(/Select from directory/)
    } else {
      expect(availablePlayers.textContent).toMatch(/No players to select/)
    }
  })
  it("All players names are listed with profile image", () => {
    const availablePlayers = screen.getByTestId("available-players-div")
    for(let i = 0; i < mockProps.availablePlayers.length; i ++) {
      expect(availablePlayers.textContent).toMatch(mockProps.availablePlayers[i].name)
      let profileImg = screen.getByTestId(`${mockProps.availablePlayers[i].id}-img`)
      expect(profileImg).toBeInTheDocument()
    }
  })
  it("appendPlayer is called on click with expected arg", async () => {
    if(mockProps.availablePlayers.length > 0) {
      const randIndex = Math.floor(Math.random() * mockProps.availablePlayers.length)
      const randPlayer = screen.getByText(mockProps.availablePlayers[randIndex].name)
      expect(randPlayer).toBeInTheDocument()
      await act(async() => {
        await waitFor(() => {
          fireEvent.click(randPlayer)
        })
      })
      expect(mockProps.appendPlayer).toBeCalledWith(mockProps.availablePlayers[randIndex])
    }
  })
  //it("Player is removed on click", async () => {})
})