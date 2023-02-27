import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import CallTile from "../../components/event/callTile";
import React from "react";

const mockProps = {
  id: "mockId",
  startTime: "mockStart",
  endTime: "mockEnd",
  venue: "mockVenue",
}

describe("CallTile component", () => {
  beforeEach(() => {
    render(<CallTile {...mockProps} />)
  })
  it("Renders", () => {
    const callTile = screen.getByTestId("call-tile-div")
    expect(callTile).toBeInTheDocument()
  })
  it("startTime is in the document", () => {
    const callTile = screen.getByTestId("call-tile-div")
    expect(callTile.textContent).toMatch(mockProps.startTime)
  })
  it("endTime is in the document", () => {
    const callTile = screen.getByTestId("call-tile-div")
    expect(callTile.textContent).toMatch(mockProps.endTime)
  })
  it("venue is in the document", () => {
    const callTile = screen.getByTestId("call-tile-div")
    expect(callTile.textContent).toMatch(mockProps.venue)
  })
})