import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import DayTile, { DayTileProps } from "../../../app/calendar/yearCalendar/dayTile"
import { DateTime } from "luxon"
import { mockCall } from "../../../__mocks__/models/call"

const mockTileDate = DateTime.now()

const mockProps: DayTileProps = {
  month: mockTileDate.month,
  year: mockTileDate.year,
  tileDate:  mockTileDate,
  eventCalls: [mockCall],
  selectedDate: DateTime.now(),
  setSelectedDate: jest.fn(),
  setSelectedView: jest.fn(),
}

describe("<DayTile />", () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <tr>
            <DayTile {...mockProps} />
          </tr>
        </tbody>
      </table>)
  })
  it("day-tile is in the document", () => {
    const dayTile = screen.getByTestId("day-tile")
    expect(dayTile).toBeInTheDocument()
  })
  it("tileDate day is in the document", () => {
    const day = screen.getByText(`${mockProps.tileDate.day}`)
    expect(day).toBeInTheDocument()
  })
  it("dot-indicator is in the document if there are events", () => {
    if (mockProps.eventCalls.length > 0) {
      let dotIndicator = screen.getByTestId("dot-indicator")
      expect(dotIndicator).toBeInTheDocument()
    }
  })
})