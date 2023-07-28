import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import InstrumentTile, { InstrumentTileProps } from "../../components/fixing/instrumentTile"
import { mockCall } from "../../__mocks__/models/call"
import { mockUser } from "../../__mocks__/models/user"
import { mockEventInstrumentWithMAndM } from "../../__mocks__/models/eventInstrument"

const mockProps: InstrumentTileProps = {
  eventCalls: [mockCall],
  eventId: mockCall.eventId,
  instrumentalists: [mockUser],
  instrumentSection: mockEventInstrumentWithMAndM,
  refreshProps: jest.fn(),
  isLoading: false


}

describe("InstrumentTile component", () => {
  //it("handleSubmit calls axios with expected args", () => {})
  beforeEach(() => {
    render(<InstrumentTile {...mockProps} />)
  })
  it("Renders", () => {
    const tileDiv = screen.getByTestId(`${mockProps.instrumentSection.instrumentName}-instrument-tile`)
    expect(tileDiv).toBeInTheDocument()
  })
  it("Availability & Booking tabs button exists", () => {
    const availabilityTab = screen.getByTestId("availability-tab-toggle")
    expect(availabilityTab).toBeInTheDocument()
    const bookingTab = screen.getByTestId("booking-tab-toggle")
    expect(bookingTab).toBeInTheDocument()
  })
  it("TileHeader is in the document", () => {
    const tileHeader = screen.getByTestId("tile-header-div")
    expect(tileHeader).toBeInTheDocument()
  })
  it("TileTabBar is in the document", () => {
    const tileTabBar = screen.getByTestId("tile-tab-bar")
    expect(tileTabBar).toBeInTheDocument()
  })
})


