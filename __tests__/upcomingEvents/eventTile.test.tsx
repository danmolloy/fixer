import { act, fireEvent, getByLabelText, getByTestId, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react';

import EventTile from '../../components/upcomingEvents/eventTile';

const dateTimeRegex = /[a-z]{3}\s[a-z]{3}\s[\d]{2}\s[\d]{4}\s[\d]{2}:[\d]{2}/i

const mockProps = {
  call: {"id":58,"createdAt":"2022-12-26T08:44:03.321Z","updatedAt":"2022-12-26T08:44:03.321Z","startTime":"2022-12-31T04:00:00.000Z","endTime":"2022-12-31T07:00:00.000Z","venue":"Cork City Hall","eventId":41,"fixerEmail":"danielmolloy_6@icloud.com","event":{"id":41,"createdAt":"2022-12-26T08:44:03.321Z","updatedAt":"2022-12-26T08:44:03.321Z","ensembleName":"Cork Pops ","concertProgram":"New Years Gig","confirmedOrOnHold":"confirmed","dressCode":"Blacks","fee":"Free dinner","additionalInfo":"","fixerEmail":"danielmolloy_6@icloud.com"}},
  sessionEmail: "danielmolloy_6@icloud.com"
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
  it("Displays Start date and time", () => {
     })
  it("Venue displayed", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    expect(eventTile.textContent).toMatch(mockProps.call.venue)
  })
  it("Indicates if you are the fixer of the event", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    if (sessionEmail === mockProps.call.fixerEmail) {
      expect(eventTile.textContent).toMatch(/You are the fixer of this event./gi)
    } else {
      expect(eventTile.textContent).not.toMatch(/You are the fixer of this event./gi)
    }
  })
  it("Clicking tile links to event page", () => {})
  it("Has menu icon", () => {
    const menuIcon = screen.getByTestId("event-menu-icon")
    expect(menuIcon).toBeInTheDocument()
  })
  it("Clicking menu icon renders menu", () => {
    const menuIcon = screen.getByTestId("event-menu-icon")
    act(() => {
      fireEvent.click(menuIcon)
    })
    const eventTileMenu = screen.getByTestId("event-tile-menu")
    expect(eventTileMenu).toBeInTheDocument()
  })
})

