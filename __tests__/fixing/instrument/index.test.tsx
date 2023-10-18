import { render, screen, act, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import FixingInstrument, { FixingInstrumentProps } from "../../../components/fixing/instrument"
import { mockCall } from "../../../__mocks__/models/call"
import { mockPlayerCall, mockPlayerCallForTable } from "../../../__mocks__/models/playerCall"
import { mockEventInstrument } from "../../../__mocks__/models/eventInstrument"

const mockProps: FixingInstrumentProps = {
  eventCalls: [mockCall],
  playerCalls: [mockPlayerCallForTable],
  eventInstrument: mockEventInstrument
}

describe("<FixingInstrument />", () => {
  beforeEach(() => {
    render(<FixingInstrument {...mockProps} />)
  })
  it("fixing-instrument is in the document", () => {
    const fixingInstrument = screen.getByTestId("fixing-instrument")
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