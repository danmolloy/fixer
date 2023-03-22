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

const mockEventCall = [{
  id: 1,
  createdAt: "mockCreatedAt",
  updatedAt: "mockUpdatedAt",
  startTime: "Tue, 21 Feb 2023 12:06:40 GMT",
  endTime: "Tue, 21 Feb 2023 15:06:40 GMT",
  venue: "Maida Vale",
  eventId: 2,
  fixerEmail: "mock@email.com"
}]

const mockProps = {
  appendedPlayers: mockPlayers,
  eventCalls: mockEventCall
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
  it("Name and date columns are in the document", () => {
    if (mockPlayers.length < 1) {
      const appendedPlayers = screen.getByTestId("appended-players-div")
      expect(appendedPlayers.textContent).toMatch("Name")
      expect(appendedPlayers.textContent).toMatch(/12:06pm 21\/02/)
    }
  })
  it("Lists all players names", () => {
    const appendedPlayers = screen.getByTestId("appended-players-div")
    for(let i = 0; i < mockPlayers.length; i ++) {
      expect(appendedPlayers.textContent).toMatch(mockPlayers[i].name)
    }
  })
})