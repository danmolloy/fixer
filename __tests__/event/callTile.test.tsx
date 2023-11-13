import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import CallTile from "../../components/event/callTile";
import React from "react";
import { mockCall } from "../../__mocks__/models/call";
import { DateTime } from "luxon";

/* const mockProps = {
  id: "mockId",
  startTime: "Tue, 21 Feb 2023 12:06:40 GMT",
  endTime: "Tue, 21 Feb 2023 15:06:40 GMT",
  venue: "mockVenue",
} */

describe("CallTile component", () => {
  beforeEach(() => {
    render(<CallTile {...mockCall} />)
  })
  it("Renders", () => {
    const callTile = screen.getByTestId("call-tile-div")
    expect(callTile).toBeInTheDocument()
  })
  it("startTime is in the document", () => {
    const callTile = screen.getByTestId("call-tile-div")
    expect(callTile.textContent).toMatch(String(DateTime.fromJSDate(new Date(mockCall.startTime)).toFormat("HH:mm DD")))
  })
  it("endTime is in the document", () => {
    const callTile = screen.getByTestId("call-tile-div")
    expect(callTile.textContent).toMatch(String(DateTime.fromJSDate( new Date(mockCall.endTime)).toFormat("HH:mm DD")))
  })
  it("venue is in the document", () => {
    const callTile = screen.getByTestId("call-tile-div")
    expect(callTile.textContent).toMatch(mockCall.venue)
  })
})