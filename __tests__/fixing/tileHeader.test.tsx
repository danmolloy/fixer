import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import TileHeader, { TileHeaderProps } from "../../components/fixing/tileHeader"
import React from "react"

const mockProps: TileHeaderProps = {
  instrumentFixed: Math.random() < .5 ? true : false,
  instrumentName: "Viola",
  numToBook: 2,
  isLoading: false,
  numAvailablityConfirmed: 1,
  availablityChecksOut: true
}

describe("TileHeader component", () => {
  beforeEach(() => {
    render(<TileHeader {...mockProps} />);
  })
  it("Renders", () => {
    const tileHeader = screen.getByTestId("tile-header-div")
    expect(tileHeader).toBeInTheDocument()
  })
  it("Instrument name is in the document", () => {
    const tileHeader = screen.getByTestId("tile-header-div")
    expect(tileHeader.textContent).toMatch(mockProps.instrumentName)
  })
  it("Mock Custom notes input is in the document", () => {
    const mockNote = screen.getByTestId("mock-note")
    expect(mockNote).toBeInTheDocument()

  })
  it("Num to book is in the document and states if fixed", () => {
    const tileHeader = screen.getByTestId("tile-header-div")
    if (mockProps.instrumentFixed) {
      expect(tileHeader.textContent).toMatch(`Booked ${mockProps.numToBook} player(s)`)
    } else {
      expect(tileHeader.textContent).toMatch(`Booking ${mockProps.numToBook} player(s)`)
    }
  })
  it("Number of players confirmed available is in the document", () => {
    const tileHeader = screen.getByTestId("tile-header-div")
    if (mockProps.availablityChecksOut === true) {
      expect(tileHeader.textContent).toMatch(`${mockProps.numAvailablityConfirmed} player(s) confirmed available`)
    }
  })
})