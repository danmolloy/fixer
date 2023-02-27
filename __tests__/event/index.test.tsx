import EventIndex from "../../components/event/index"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"

const mockProps = {
  confirmed: "mockConfirmed",
  ensembleName: "Banana Symphony",
  concertProgram: "mockProgram",
  dressCode: "mockDress",
  fee: "mockFee",
  additionalInfo: Math.random() < .5 ? "": "mockAdditionalInfo",
  fixerEmail: "fixerEmail",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  id: "mockId",
  session: {
    user: {
      email: ""
    }
  },
  calls: [
    {
    id: "0",
    startTime: "mockStart0",
    endTime: "mockEnd0",
    venue: "mockVenue0"
  },
  {
    id: "1",
    startTime: "mockStart1",
    endTime: "mockEnd1",
    venue: "mockVenue1"
  }]
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
  it("EventOptions is in the document", () => {
    const eventOptions = screen.getByTestId("event-options-div")
    expect(eventOptions).toBeInTheDocument()
  })
})