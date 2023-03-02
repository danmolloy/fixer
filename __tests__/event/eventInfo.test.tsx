import EventInfo from "../../components/event/eventInfo"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"
import moment from "moment"

const mockProps = {
  confirmed: "Confirmed",
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
    startTime: "Tue, 21 Feb 2023 12:06:40 GMT",
    endTime: "Tue, 21 Feb 2023 15:06:40 GMT",
    venue: "mockVenue0"
  },
  {
    id: "1",
    startTime: "Tue, 21 Feb 2023 16:06:40 GMT",
    endTime: "Tue, 21 Feb 2023 17:06:40 GMT",
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
    expect(eventInfoDiv.textContent).toMatch(/^This event is confirmed/)
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
    expect(eventInfoDiv.textContent).toMatch(`Dress${mockProps.dressCode}`)
  })
  it("Fee is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Fee${mockProps.fee}`)
  })
  it("Additional info is in the document, even if empty string", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Additional Info${mockProps.additionalInfo}`)
  })
  it("Fixer email is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Fixer${mockProps.fixerEmail}`)
  })
  it("All calls are in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    for (let i = 0; i < mockProps.calls.length; i++) {
      expect(eventInfoDiv.textContent).toMatch(String(moment.utc(new Date(mockProps.calls[i].startTime)).format("HMm Do MMMM YYYY")))
      expect(eventInfoDiv.textContent).toMatch(mockProps.calls[i].venue)
    }
  })

  it("createdAt is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(String(moment.utc(new Date(mockProps.createdAt)).format("h:ma Do MMMM YYYY")))
  })
  it("Last updated is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(String(moment.utc(new Date(mockProps.updatedAt)).format("h:ma Do MMMM YYYY")))
  })
})