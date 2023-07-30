import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react';
import EventTile from '../../components/upcomingEvents/eventTile';
import moment from 'moment';
import { mockCallWithEvent } from '../../__mocks__/models/call';

const mockProps = {
  call: mockCallWithEvent,
  sessionEmail: "sessionEmail",
}

describe("EventTile Component", () => {
  //const sessionEmail = mockProps.call.fixerEmail
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
  it("Call start time is in the document", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    expect(eventTile.textContent).toMatch(String(moment(new Date(mockProps.call.startTime)).format("h:mma ddd Do MMMM YYYY")))
  })
  it("Call venue is in the document", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    expect(eventTile.textContent).toMatch(mockProps.call.venue)
  })

})

