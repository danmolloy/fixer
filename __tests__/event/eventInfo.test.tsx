import EventInfo, { EventInfoProps } from "../../components/event/eventInfo"
import { act, fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"
import moment from "moment"
import { mockEventWithCalls } from "../../__mocks__/models/event"

const mockProps: EventInfoProps = {
  event: mockEventWithCalls,
  session: {},
  setShowOptions: jest.fn(),
  showOptions: true
}

describe("EventInfo component", () => {
  beforeEach(() => {
    render(<EventInfo {...mockProps} />)
  })
  it("Renders", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv).toBeInTheDocument()
  })
  it("showOptions are in the document (if true), and calls setShowOptions onClick", () => {
    if (mockProps.showOptions === true) {
      const optionsBtn = screen.getByTestId("options-btn");
      expect(optionsBtn).toBeInTheDocument()
      act(() => {
        fireEvent.click(optionsBtn)
      })
      expect(mockProps.setShowOptions).toBeCalled()
    }
  })
  it("Confirmed or On Hold is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`This event is ${mockProps.event.confirmedOrOnHold.toLowerCase()}`)
  })
  it("Ensemble name is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(mockProps.event.ensembleName)
  })
  it("Concert Program is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(mockProps.event.concertProgram)
  })
  it("Dress code is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Dress${mockProps.event.dressCode}`)
  })
  it("Fee is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Fee${mockProps.event.fee}`)
  })
  it("Additional info is in the document, even if empty string", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Additional Info${mockProps.event.additionalInfo}`)
  })
  it("Fixer name is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Fixer${mockProps.event.fixerName}`)
  })
  it("All calls are in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    for (let i = 0; i < mockProps.event.calls.length; i++) {
      expect(eventInfoDiv.textContent).toMatch(String(moment(new Date(mockProps.event.calls[i].startTime)).format("HH:mm D MMMM YYYY")))
      expect(eventInfoDiv.textContent).toMatch(mockProps.event.calls[i].venue)
    }
  })

  it("createdAt is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(String(moment(new Date(mockProps.event.createdAt)).format("HH:mm:ss D MMMM YYYY")))
  })
  it("Last updated is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(String(moment(new Date(mockProps.event.updatedAt)).format("HH:mm:ss D MMMM YYYY")))
  })
})