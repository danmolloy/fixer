import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import AvailabilityTable, { AvailabilityTableProps } from "../../components/fixing/availabilityTable"
import { mockEventInstrumentWithMAndM } from "../../__mocks__/models/eventInstrument";
import { mockCall } from "../../__mocks__/models/call";



const mockProps: AvailabilityTableProps = {
  eventCalls: [mockCall], 
  instrumentSection: mockEventInstrumentWithMAndM,
  removePlayer: jest.fn(),
  offerOrDecline: jest.fn()
}

describe("AvailabilityTable component", () => {
  beforeEach(() => {
    render(<AvailabilityTable {...mockProps} />)
  })

  it("Renders", () => {
    const tableDiv = screen.getByTestId("availability-table-div")
    expect(tableDiv).toBeInTheDocument()
  })
})