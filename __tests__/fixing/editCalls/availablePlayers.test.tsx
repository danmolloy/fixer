import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import AvailablePlayers from "../../../components/fixing/editCalls/availablePlayers";
import React from "react";
import { Formik } from "formik";

const mockInstrument = "Oboe"

const mockPlayers = Math.random() < .5 ? [] : [{
  id: "1",
  name: "mockPlayer1",
  email: "mockEmail1",
  emailVerified: null,
  instrument: mockInstrument,
  profileInfo: null,
  isFixer: false,
}]

const mockProps = {
  instrumentName: mockInstrument,
  availablePlayers: mockPlayers,
  appendPlayer: jest.fn()
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
    if (mockPlayers.length < 1) {
      const availablePlayers = screen.getByTestId("available-players-div")
      expect(availablePlayers.textContent).toMatch(/No players to select/)
    }
  })
  it("Select Players text content is in the document, if there are players", () => {
    if(mockPlayers.length > 0) {
      const availablePlayers = screen.getByTestId("available-players-div")
      expect(availablePlayers.textContent).toMatch(/Select players/)
    }
  })
  it("All players names are listed", () => {
    const availablePlayers = screen.getByTestId("available-players-div")
    for(let i = 0; i < mockPlayers.length; i ++) {
      expect(availablePlayers.textContent).toMatch(mockPlayers[i].name)
    }
  })
  it("appendPlayer is called on click with expected arg", async () => {
    if(mockPlayers.length > 0) {
      const randIndex = Math.floor(Math.random() * mockPlayers.length)
      const randPlayer = screen.getByText(mockPlayers[randIndex].name)
      expect(randPlayer).toBeInTheDocument()
      await act(async() => {
        await waitFor(() => {
          fireEvent.click(randPlayer)
        })
      })
      expect(mockProps.appendPlayer).toBeCalledWith(mockPlayers[randIndex])
    }
  })
  //it("Player is removed on click", async () => {})
})