import EventInfo from "../../components/event/eventInfo"
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
  session: {},
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

describe("EventInfo component", () => {
  beforeEach(() => {
    render(<EventInfo {...mockProps} />)
  })
  it("Renders", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv).toBeInTheDocument()
  })
  it("Confirmed or On Hold is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(String(mockProps.confirmed).toUpperCase())
  })
  it("Ensemble name is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(mockProps.ensembleName)
  })
  it("Concert Program is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(mockProps.concertProgram)
  })
  it("Dress code is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Dress: ${mockProps.dressCode}`)
  })
  it("Fee is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Fee: ${mockProps.fee}`)
  })
  it("Additional info is in the document, even if empty string", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Additional Info: ${mockProps.additionalInfo}`)
  })
  it("Fixer email is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Fixer: ${mockProps.fixerEmail}`)
  })
  it("All calls are in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    for (let i = 0; i < mockProps.calls.length; i++) {
      expect(eventInfoDiv.textContent).toMatch(mockProps.calls[i].startTime)
      expect(eventInfoDiv.textContent).toMatch(mockProps.calls[i].venue)
    }
  })

  it("createdAt is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(mockProps.createdAt)
  })
  it("Last updated is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(mockProps.updatedAt)
  })
})