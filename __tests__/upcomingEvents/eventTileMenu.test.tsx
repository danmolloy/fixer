import { act, fireEvent, getByLabelText, getByTestId, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import EventTileMenu from '../../components/upcomingEvents/eventTileMenu'
import React from 'react'

const setShowMenu = jest.fn()

describe("EventTile Component", () => {
  beforeEach(() => {
    render(<EventTileMenu eventId={1} setShowMenu={setShowMenu()}/>)
  })
  it("Renders", () => {
    const eventTileMenu = screen.getByTestId("event-tile-menu")
    expect(eventTileMenu).toBeInTheDocument()
  })
  
  it("Menu has View Gig link", () => {
    const gigLink = screen.getByTestId("gig-link")
    expect(gigLink).toBeInTheDocument()
  })
  //it("Clicking Gig Link renders gig page", () => {})
  it("Menu has Fixer Details link", () => {
    const fixerLink = screen.getByTestId('fixer-link')
    expect(fixerLink).toBeInTheDocument()
  })
  //it("Clicking fixer details renders fixer info", () => {})
  it("Menu has Request Parts link", () => {
    const partsLink = screen.getByTestId("parts-link")
    expect(partsLink).toBeInTheDocument()
  })
  //it("Menu has Google Maps link", () => {})
  it("Close menu button exists", () => {
    const closeBtn = screen.getByTestId("event-tile-menu")
    expect(closeBtn).toBeInTheDocument()
  })
  it("Close menu button calls setCloseMenu", () => {
    const closeBtn = screen.getByTestId("event-tile-menu")
    act(() => {
      fireEvent.click(closeBtn)
    })
    expect(setShowMenu).toBeCalled()
  })
  //it("Clicking Maps link renders google maps", () => {})
  //it("Click parts link renders confirmation to request parts", () => {})


})