import React from "react";
import { act, fireEvent, getByLabelText, getByTestId, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import UpcomingEvents from "../../components/upcomingEvents/upcomingEvents";

const mockProps = {
  selectedDate: any
  sessionEmail: string
  upcomingCalls: {
    id: number
    createdAt: string
    updatedAt: string
    startTime: string
    endTime: string
    venue: string
    eventId: number
    fixerEmail: string
    event: {
      id: number
      createdAt: string
      updatedAt: string
      ensembleName: string
      concertProgram: string
      confirmedOrOnHold: string
      dressCode: string
      fee: string
      additionalInfo: string
      fixerEmail: string
    }
  }[]
}

describe("UpcomingEvents component", () => {
  beforeEach(() => {
    render(<UpcomingEvents {...mockProps} />)
  })
  it("Renders", () => {
    const upcomingEvents = screen.getByTestId("upcoming-events-div")
    expect(upcomingEvents).toBeInTheDocument()
    expect(upcomingEvents.textContent).toMatch(/Upcoming Events/)
  })
  it("All upcoming events render", () => {

  })
  it("If no upcoming events, it states such", () => {})
})