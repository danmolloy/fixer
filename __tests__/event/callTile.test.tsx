import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import CallTile from "../../components/event/callTile";
import React from "react";
import moment from "moment";

const mockProps = {
  id: "mockId",
  startTime: "Tue, 21 Feb 2023 12:06:40 GMT",
  endTime: "Tue, 21 Feb 2023 15:06:40 GMT",
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
    expect(callTile.textContent).toMatch(String(moment.utc(new Date(mockProps.startTime)).format("HMm Do MMMM YYYY")))
  })
  it("endTime is in the document", () => {
    const callTile = screen.getByTestId("call-tile-div")
    expect(callTile.textContent).toMatch(String(moment.utc( new Date(mockProps.endTime)).format("HMm Do MMMM YYYY")))
  })
  it("venue is in the document", () => {
    const callTile = screen.getByTestId("call-tile-div")
    expect(callTile.textContent).toMatch(mockProps.venue)
  })
})