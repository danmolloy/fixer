import { act, fireEvent, render, screen } from '@testing-library/react'
import EventTileMenu, { EventTileMenuProps } from '../../components/upcomingEvents/eventTileMenu'
import React from 'react'
import "@testing-library/jest-dom"

const mockProps: EventTileMenuProps = {
  setShowMenu: jest.fn(),
  eventId: 129,
  eventTitle: "Classical Spectacular"
}

describe("EventTile Component", () => {
  //it("Clicking Gig Link renders gig page", () => {})
  //it("Clicking Maps link renders google maps", () => {})
  //it("Click parts link renders confirmation to request parts", () => {})
  //it("Clicking fixer details renders fixer info", () => {})
  //it("Clicking Maps link renders google maps", () => {})
  //it("Click parts link renders confirmation to request parts", () => {})
  //it("Menu has Google Maps link", () => {})

  beforeEach(() => {
    render(<EventTileMenu {...mockProps}/>)
  })
  it("Renders", () => {
    const eventTileMenu = screen.getByTestId("event-tile-menu")
    expect(eventTileMenu).toBeInTheDocument()
  })
  
  it("Menu has View Gig link", () => {
    const gigLink = screen.getByTestId("gig-link")
    expect(gigLink).toBeInTheDocument()
  })
  it("Menu has Fixer Details link", () => {
    const fixerLink = screen.getByTestId('fixer-link')
    expect(fixerLink).toBeInTheDocument()
  })
  it("Menu has Request Parts link", () => {
    const partsLink = screen.getByTestId("parts-link")
    expect(partsLink).toBeInTheDocument()
  })
  it("Close menu button exists", () => {
    const closeBtn = screen.getByTestId("event-tile-menu")
    expect(closeBtn).toBeInTheDocument()
  })
  it("Close menu button calls setCloseMenu", () => {
    const closeBtn = screen.getByTestId("close-btn")
    act(() => {
      fireEvent.click(closeBtn)
    })
    expect(mockProps.setShowMenu).toBeCalled()
  })

})