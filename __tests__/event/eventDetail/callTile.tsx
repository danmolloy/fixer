import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import CallTile from "../../../app/event/[id]/callTile";
import React from "react";
import { mockCall } from "../../../__mocks__/models/call";
import { DateTime } from "luxon";

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
  //it("indicates what is instrumentation for each call", () => {})
})