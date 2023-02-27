import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import AppendedPlayers from "../../../components/fixing/editCalls/appendedPlayers";
import React from "react";
import { Formik } from "formik";

const mockInstrument = "Oboe"


const mockPlayers =  Math.random() < .5 ? [] : [{
  id: "1",
  name: "mockPlayer1",
  email: "mockEmail1",
  emailVerified: null,
  instrument: mockInstrument,
  profileInfo: null,
  isFixer: false,
}]

const mockProps = {
  appendedPlayers: mockPlayers
}

describe("AppendedPlayers component", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        {props => (
          <AppendedPlayers {...mockProps} />
        )}
      </Formik>)
  })
  it("Renders", () => {
    const appendedPlayers = screen.getByTestId("appended-players-div")
    expect(appendedPlayers).toBeInTheDocument()
  })
  it("If no appendePlayers, there is no text content", () => {
    if (mockPlayers.length < 1) {
      const appendedPlayers = screen.getByTestId("appended-players-div")
      expect(appendedPlayers.textContent).toMatch(/^$/)
    }
  })
  it("Lists all players names", () => {
    const appendedPlayers = screen.getByTestId("appended-players-div")
    for(let i = 0; i < mockPlayers.length; i ++) {
      expect(appendedPlayers.textContent).toMatch(mockPlayers[i].name)
    }
  })
})