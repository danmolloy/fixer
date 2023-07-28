import "@testing-library/jest-dom"
import MobileFixing, { MobileFixingProps } from "../../components/fixing/mobileFixing"
import { render, screen } from "@testing-library/react"
import { mockEventInstrumentWithMAndM } from "../../__mocks__/models/eventInstrument"
import { mockUser } from "../../__mocks__/models/user"

const mockProps: MobileFixingProps = {
  instrumentSections: [mockEventInstrumentWithMAndM],
  selectedInstrument: "Viola",
  setSelectedInstrument: jest.fn(),
  eventCalls: mockEventInstrumentWithMAndM.musicians[0].calls,
  refreshProps: jest.fn(),
  eventId: mockEventInstrumentWithMAndM.id,
  users: [mockUser],
  isLoading: false
}

describe("MobileFixing component", () => {
  beforeEach(() => {
    render(<MobileFixing {...mockProps} />)
  })
  it("Renders", () => {
    const mobileFixingDiv = screen.getByTestId("mobile-fixing-div")
    expect(mobileFixingDiv).toBeInTheDocument()
  })
  it("Select menu is in the document", () => {
    const selectMenu = screen.getByTestId("select-menu")
    expect(selectMenu).toBeInTheDocument()
  })
  //it("Corresponding instrument tile is in the document when selected from menu", () => {})
})