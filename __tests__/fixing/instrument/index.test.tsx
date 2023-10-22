import { render, screen, act, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import FixingInstrument, { FixingInstrumentProps } from "../../../components/fixing/instrument"
import { mockCall } from "../../../__mocks__/models/call"
import { mockPlayerCall, mockPlayerCallForTable } from "../../../__mocks__/models/playerCall"
import { mockEventInstrument } from "../../../__mocks__/models/eventInstrument"
import { mockUser } from "../../../__mocks__/models/user"


const mockProps: FixingInstrumentProps = {
  directoryMusicians: [mockUser],
  refreshProps: jest.fn(),
  eventCalls: [mockCall],
  playerCalls: [{...mockPlayerCallForTable, bookingOrAvailability: "Booking"}],
  eventInstrument: mockEventInstrument
}

describe("<FixingInstrument />", () => {
  beforeEach(() => {
    render(<FixingInstrument {...mockProps} />)
  })
  it("[X]-fixing is in the document", () => {
    const fixingInstrument = screen.getByTestId(`${mockProps.eventInstrument.instrumentName}-fixing`)
    expect(fixingInstrument).toBeInTheDocument()
  })
  it("instrument-header is in the document", () => {
    const instrumentHeader = screen.getByTestId("instrument-header")
    expect(instrumentHeader).toBeInTheDocument()
  })
  it("tab-select is in the document", () => {
    const tabSelect = screen.getByTestId("tab-select")
    expect(tabSelect).toBeInTheDocument()
  })
  it("fixing-table is in the document", () => {
    const fixingTable = screen.getByTestId("fixing-table")
    expect(fixingTable).toBeInTheDocument()
  })
  //it("edit menu renders on click", () => {})
  //it("availability tab renders on toggle click", () => {})
})