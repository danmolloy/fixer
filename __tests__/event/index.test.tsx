import EventIndex from "../../components/event/index"
import { act, fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"
import { mockEventWithCalls } from "../../__mocks__/models/event"

const mockProps = {
  event: mockEventWithCalls,
  session: {},
}

describe("EventIndex component", () => {
  beforeEach(() => {
    render(<EventIndex {...mockProps} />)
  })
  it("Renders", () => {
    const eventIndexDiv = screen.getByTestId("event-index-div")
    expect(eventIndexDiv).toBeInTheDocument()
  })
  it("EventInfo is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv).toBeInTheDocument()
  })
  it("Menu is in the document if showOptions is true", () => {})
})