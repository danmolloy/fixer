import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import FixingTable, { FixingTableProps } from "../../../../../components/fixing/instrument/update/table"
import { mockPlayerCallForTable } from "../../../../../__mocks__/models/playerCall"
import { mockCall } from "../../../../../__mocks__/models/call"



describe("<FixingTable />", () => {
  const mockProps: FixingTableProps = {
    playerCalls: [{
      ...mockPlayerCallForTable,
      bookingOrAvailability: "Booking",
    }],
    eventCalls: [mockCall],
    selectedTab: "Booking"
  }
  beforeEach(() => {
    render(<FixingTable {...mockProps} />)
  })
  it("fixing-table is in the document", () => {
    const fixingTable = screen.getByTestId("fixing-table")
    expect(fixingTable).toBeInTheDocument()
  })
  it("table-head is in the document", () => {
    const tableHead = screen.getByTestId("table-head")
    expect(tableHead).toBeInTheDocument()
  })
  it("all playerCalls are in the document", () => {
    for (let i = 0; i < mockProps.playerCalls.length; i++) {
      let playerRow = screen.getByTestId(`${mockProps.playerCalls[i].id}-row`)
      expect(playerRow).toBeInTheDocument()
    }
  })
})

describe("<FixingTable />", () => {
  const mockProps: FixingTableProps = {
    playerCalls: [{
      ...mockPlayerCallForTable,
      bookingOrAvailability: "Booking",
    }],
    eventCalls: [mockCall],
    selectedTab: "Availability"
  }
  beforeEach(() => {
    render(<FixingTable {...mockProps} />)
  })
  it("states that no offers made if all calls are availability", () => {
    const message = screen.getByText("No availability checks made")
    expect(message).toBeInTheDocument()
  })
})

describe("<FixingTable />", () => {
  const mockProps: FixingTableProps = {
    playerCalls: [{
      ...mockPlayerCallForTable,
      bookingOrAvailability: "Availability",
    }],
    eventCalls: [mockCall],
    selectedTab: "Booking"
  }
  beforeEach(() => {
    render(<FixingTable {...mockProps} />)
  })
  it("states that no calls made if Booking selected and all calls are Availability", () => {
    const message = screen.getByText("No offers made")
    expect(message).toBeInTheDocument()
  })
})