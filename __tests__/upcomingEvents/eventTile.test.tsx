import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react';
import EventTile from '../../components/upcomingEvents/eventTile';
import moment from 'moment';

const mockProps = {
  call: {
    id: 1,
    createdAt: "callCreated",
    updatedAt: "callUpdated",
    startTime: "Tue, 21 Feb 2023 12:06:40 GMT",
    endTime: "Tue, 21 Feb 2023 12:06:40 GMT",
    venue: "callVenue",
    eventId: 0,
    fixerEmail: "fixerEmail",
    event: {
      id: 0,
      createdAt: "eventCreated",
      updatedAt: "eventUpdated",
      ensembleName: "ensembleName",
      concertProgram: "eventProgram",
      confirmedOrOnHold: Math.random() < .5 ? "Confirmed" : "OnHold",
      dressCode: "dressCode",
      fee: "500",
      additionalInfo: "No Additional info",
      fixerEmail: "fixerEmail",
    }
  },
  sessionEmail: "sessionEmail"
}

describe("EventTile Component", () => {
  const sessionEmail = mockProps.call.fixerEmail
  beforeEach(() => {
    render(<EventTile {...mockProps}/>)
  })
  it("Renders", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    expect(eventTile).toBeInTheDocument()
  })
  it("Ensemble name is in the document", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    expect(eventTile.textContent).toMatch(mockProps.call.event.ensembleName)
  })
  it("Has menu icon", () => {
    const menuIcon = screen.getByTestId("event-menu-icon")
    expect(menuIcon).toBeInTheDocument()
  })
  it("Show menu button renders menu", () => {
    const menuIcon = screen.getByTestId("event-menu-icon")
    act(() => {
      fireEvent.click(menuIcon)
    })
    const eventTileMenu = screen.getByTestId("event-tile-menu")
    expect(eventTileMenu).toBeInTheDocument()
  })
  it("Concert Program is in the document", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    expect(eventTile.textContent).toMatch(mockProps.call.event.concertProgram)
  })
  it("Call start time is in the document", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    expect(eventTile.textContent).toMatch(String(moment.utc(new Date(mockProps.call.startTime)).format("HMm MMMM Do YYYY")))
  })
  it("Call venue is in the document", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    expect(eventTile.textContent).toMatch(mockProps.call.venue)
  })

})

