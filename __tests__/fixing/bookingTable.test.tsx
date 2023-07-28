import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import BookingTable, { BookingTableProps } from "../../components/fixing/bookingTable"
import { mockCall } from "../../__mocks__/models/call"
import { mockEventInstrumentWithMAndM } from "../../__mocks__/models/eventInstrument"

const mockProps: BookingTableProps = {
  eventCalls: [mockCall],
  instrumentSection: mockEventInstrumentWithMAndM,
  removePlayer: jest.fn(),
  fixOrUnfixPlayer: jest.fn()
}

describe("BookingTable component", () => {
  beforeEach(() => {
    render(<BookingTable {...mockProps}/>)
  })

  it("Renders", () => {
    const tableDiv = screen.getByTestId("booking-table-div")
    expect(tableDiv).toBeInTheDocument();
  })
})