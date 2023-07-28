import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import Fixing from "../../components/fixing/fixing"
import { mockUser } from "../../__mocks__/models/user"
import { FixingProps } from "../../components/fixing/fixing"
import { mockCall } from "../../__mocks__/models/call"
import { mockEventInstrumentWithMAndM } from "../../__mocks__/models/eventInstrument"
import moment from "moment"

const mockProps: FixingProps = {
  eventCalls: [mockCall],
  instrumentSections: [mockEventInstrumentWithMAndM],
  eventId: mockCall.eventId,
  refreshProps: jest.fn(),
  users: [mockUser],
  isLoading: false,
  lastUpdated: new Date()
}

const mockData = [mockUser]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(
      mockData
      )
  })
) as jest.Mock;

describe("Fixing component", () => {
  //it("View List button shows orchestra list on click", () => {})

  beforeEach(() => {
    render(<Fixing {...mockProps} />)
  })
  it("Renders", () => {
    const fixingDiv = screen.getByTestId("event-fixing")
    expect(fixingDiv).toBeInTheDocument()
  })
  it("Fixing header is in the document", () => {
    const fixingHeader = screen.getByTestId("fixing-header")
    expect(fixingHeader).toBeInTheDocument()
    expect(fixingHeader.textContent).toMatch(/Personnel/)
  })
  it("Date last updated is in the document", () => {
    const fixingDiv = screen.getByTestId("event-fixing")
    expect(fixingDiv.textContent).toMatch(`Last updated ${moment(mockProps.lastUpdated).format("HH:mm:ss D MMMM YYYY")}`);
  })
  it("View List button is in the document", () => {
    const viewListBtn = screen.getByTestId("view-list-btn")
    expect(viewListBtn).toBeInTheDocument()
    expect(viewListBtn.textContent).toMatch(/^View List$/)
  })
  it("Refresh button is in the document, and call refreshProps on click", () => {
    const refreshBtn = screen.getByTestId("refresh-btn")
    expect(refreshBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(refreshBtn)
    })
    expect(mockProps.refreshProps).toBeCalled()
  })
  it("All instrument sections are in the document", () => {
    for (let i = 0; i < mockProps.instrumentSections.length; i++) {
      let instrumentTile = screen.getByTestId(`${mockProps.instrumentSections[i].instrumentName}-instrument-tile`)
      expect(instrumentTile).toBeInTheDocument()
    }
  })
})