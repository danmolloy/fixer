import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"
import { mockEventWithCalls } from "../../../__mocks__/models/event"
import { DateTime } from "luxon"
import EventInfo, { EventInfoProps } from "../../../components/event/eventDetail/eventInfo"
import { mockUserId } from "../../../__mocks__/models/user"
import { mockEnsemble } from "../../../__mocks__/models/ensemble"

const mockProps: EventInfoProps = {
  event: mockEventWithCalls,
  userId: mockUserId,
  ensemble: mockEnsemble
}

describe("<EventInfo />", () => {
  beforeEach(() => {
    render(
      <table>
        <EventInfo {...mockProps} />
      </table>)
  })
  it("event-info-div is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv).toBeInTheDocument()
  })
  it("confirmed or on hold is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Status${mockProps.event.confirmedOrOnHold.toLocaleUpperCase()}`)
  })
  it("ensemble name is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(mockProps.ensemble.name)
  })
  it("concert Program is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(mockProps.event.concertProgram)
  })
  it("dress code is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Dress${mockProps.event.dressCode}`)
  })
  it("fee is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Fee${mockProps.event.fee}`)
  })
  it("additional info is in the document, even if empty string", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Additional Info${mockProps.event.additionalInfo}`)
  })
  it("fixer name is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(`Fixer${mockProps.event.fixerName}`)
  })

  it("createdAt is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(String(DateTime.fromJSDate(new Date(mockProps.event.createdAt)).toFormat("HH:mm DD")))
  })
  it("last updated is in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    expect(eventInfoDiv.textContent).toMatch(String(DateTime.fromJSDate(new Date(mockProps.event.updatedAt)).toFormat("HH:mm DD")))
  })
})

describe("<EventInfo />", () => {

  beforeEach(() => {
    const mockEvent = mockEventWithCalls
    const mockProps: EventInfoProps = {
      event: mockEvent,
      userId: mockEvent.fixerId,
      ensemble: mockEnsemble
    }
    render(
      <table>
        <EventInfo {...mockProps} />
      </table>)
  })
  it("if user is fixer, all calls are in the document", () => {
    const eventInfoDiv = screen.getByTestId("event-info-div")
    for (let i = 0; i < mockProps.event.calls.length; i++) {
      expect(eventInfoDiv.textContent).toMatch(DateTime.fromJSDate(new Date(mockProps.event.calls[i].startTime)).toFormat("HH:mm DD"))
      expect(eventInfoDiv.textContent).toMatch(mockProps.event.calls[i].venue)
    }
  })
  //it("if user is player, all calls which player was asked for are in the document", () => {})
})

