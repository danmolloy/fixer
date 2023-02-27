import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import EventOptions from "../../components/event/eventOptions"
import React from "react"

const isEqual = Math.random() > 0.5 ? true : false

const mockProps = {
  fixerEmail: isEqual ? "email@email.com" : "",
  sessionEmail: "email@email.com"
}

describe("EventOptions component", () => {
  beforeEach(() => {
    render(<EventOptions {...mockProps} />)
  })
  it("Renders", () => {
    const eventOptionsDiv = screen.getByTestId("event-options-div")
    expect(eventOptionsDiv).toBeInTheDocument()
  })
  it("If fixer, fixer options is in the document", () => {
    if(isEqual === true) {
      const fixerOptions = screen.getByTestId("fixer-options")
      expect(fixerOptions).toBeInTheDocument()
    }
  })
  it("Fixer options contains message players, edit event & export event", () => {
    if(isEqual === true) {
      const fixerOptions = screen.getByTestId("fixer-options")
      expect(fixerOptions.textContent).toMatch(/Message Players/)
      expect(fixerOptions.textContent).toMatch(/Edit Event/)
      expect(fixerOptions.textContent).toMatch(/Export Event/)
    }
  })
  it("If not fixer, player options are in the document", () => {
    if(isEqual === false) {
      const playerOptions = screen.getByTestId("player-options")
      expect(playerOptions).toBeInTheDocument()
    }
  })
  it("Player options contains contact fixer & request parts", () => {
    if(isEqual === false) {
      const playerOptions = screen.getByTestId("player-options")
      expect(playerOptions.textContent).toMatch(/Contact Fixer/)
      expect(playerOptions.textContent).toMatch(/Request Parts/)
    }
  })
})