import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import FixingTable, { FixingTableProps } from "../../../../components/fixing/instrument/table"
import { mockPlayerCallForTable } from "../../../../__mocks__/models/playerCall"
import { mockCall } from "../../../../__mocks__/models/call"

const mockProps: FixingTableProps = {
  playerCalls: [mockPlayerCallForTable],
  eventCalls: [mockCall]
}

describe("<FixingTable />", () => {
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

describe("<FixingTable playerCalls=[] />", () => {
  beforeEach(() => {
    render(<FixingTable eventCalls={mockProps.eventCalls} playerCalls={[]} />)
  })
  it("states that no calls made", () => {
    const message = screen.getByText("No calls made")
    expect(message).toBeInTheDocument()
  })
})