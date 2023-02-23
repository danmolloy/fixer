import React from "react";
import { act, fireEvent, getByLabelText, getByTestId, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import UpcomingEvents from "../../components/upcomingEvents/upcomingEvents";
import moment from "moment";

const startTime = String(moment.utc( new Date("Tue, 21 Feb 2023 16:06:40 GMT")))
const endTime =  String(moment.utc(new Date("Tue, 21 Feb 2023 19:06:40 GMT")))

const pastStartTime = String(moment.utc( new Date("Mon, 20 Feb 2023 16:06:40 GMT")))
const pastEndTime =  String(moment.utc(new Date("Mon, 20 Feb 2023 19:06:40 GMT")))


const mockProps = {
  selectedDate: moment.utc(new Date("Tue, 21 Feb 2023 12:06:40 GMT")),
  upcomingCalls: Math.random() > 0.3 ? [] : [{
    id: 1,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    startTime: startTime,
    endTime: endTime,
    venue: "mock Venue",
    eventId: 2,
    fixerEmail: "email@email.com",
    event: {
      id: 2,
      createdAt: "eventCreated",
      updatedAt: "eventUpdated",
      ensembleName: "LSO",
      concertProgram: "Brahms",
      confirmedOrOnHold: "Confirmed",
      dressCode: "Blacks",
      fee: "400",
      additionalInfo: "additionalInfo",
      fixerEmail: "email@email.com",
    }
  },
  {
    id: 2,
    createdAt: "2createdAt",
    updatedAt: "2updatedAt",
    startTime: pastStartTime,
    endTime: pastEndTime,
    venue: "mock Venue",
    eventId: 3,
    fixerEmail: "email@email.com",
    event: {
      id: 3,
      createdAt: "eventCreated",
      updatedAt: "eventUpdated",
      ensembleName: "BBCSO",
      concertProgram: "Mozart",
      confirmedOrOnHold: "Confirmed",
      dressCode: "Blacks",
      fee: "400",
      additionalInfo: "additionalInfo",
      fixerEmail: "email@email.com",
    }
  }
  
],
  sessionEmail: "email@email.com"
}

describe("UpcomingEvents component", () => {
  beforeEach(() => {
    render(<UpcomingEvents {...mockProps} />)
  })
  it("Renders", () => {
    const upcomingEvents = screen.getByTestId("upcoming-events-div")
    expect(upcomingEvents).toBeInTheDocument()
  })
  it("All upcoming events render", () => {
    if (mockProps.upcomingCalls.length > 0) {
      const upcomingEvents = screen.getByTestId("upcoming-events-div")
      expect(upcomingEvents.textContent).not.toMatch(/^No upcoming events.$/)

      const eventTile = screen.getByTestId("event-tile-div")
      expect(eventTile).toBeInTheDocument()
      expect(eventTile.textContent).toMatch(mockProps.upcomingCalls[0].event.concertProgram)
    }
  })
  it("If no upcoming events, it states such", () => {
    if (mockProps.upcomingCalls.length < 1) {
      const upcomingEvents = screen.getByTestId("upcoming-events-div")
      expect(upcomingEvents.textContent).toMatch(/^No upcoming events.$/)
    }
  })
  it("Past events don't render", () => {
    if (mockProps.upcomingCalls.length > 0) {
      const upcomingEvents = screen.getByTestId("upcoming-events-div")
      expect(upcomingEvents.textContent).not.toMatch(/^No upcoming events.$/)

      const eventTile = screen.getByTestId("event-tile-div")
      expect(eventTile).toBeInTheDocument()
      expect(eventTile.textContent).toMatch(mockProps.upcomingCalls[0].event.concertProgram)
      expect(eventTile.textContent).not.toMatch(mockProps.upcomingCalls[1].event.concertProgram)
    }
  })
})