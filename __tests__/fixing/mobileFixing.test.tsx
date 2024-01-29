import "@testing-library/jest-dom"
import MobileFixing, { MobileFixingProps } from "../../components/fixing/mobileFixing"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { mockEventWithCalls } from "../../__mocks__/models/event"
import { mockFixingSection, mockSectionWithMusicians } from "../../__mocks__/models/ensembleSection"
import { mockEventSection } from "../../__mocks__/models/eventSection"


const mockProps: MobileFixingProps = {
  fixingSections: [mockFixingSection],
  ensembleSections: [mockSectionWithMusicians],
  selectedInstrument: mockSectionWithMusicians.name,
  setSelectedInstrument: jest.fn(),
  eventCalls: mockEventWithCalls.calls,
  refreshProps: jest.fn(),
  event: mockEventWithCalls,
}

describe("MobileFixing component", () => {
  beforeEach(() => {
    render(<MobileFixing {...mockProps} />)
  })
  it("renders", () => {
    const mobileFixingDiv = screen.getByTestId("mobile-fixing-div")
    expect(mobileFixingDiv).toBeInTheDocument()
  })
  it("select menu is in the document", () => {
    const selectMenu = screen.getByTestId("event-instruments-select-menu")
    expect(selectMenu).toBeInTheDocument()
  })
  it("corresponding fixing instrument tile is in the document when selected from menu", () => {})
  it("corresponding ensemble tile if selected instrument has not been fixed", () => {})
  it("helpful message if no instrument selected", () => {})
})