import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import WeekRow, { WeekRowProps } from "../../../app/calendar/yearCalendar/weekRow"
import { DateTime } from "luxon"
import { mockCall } from "../../../__mocks__/models/call"

const mockDate = DateTime.now()

const mockProps: WeekRowProps = {
  startOfWeekDate: mockDate,
  month: mockDate.month,
  weekNumber: mockDate.weekNumber,
  eventCalls: [mockCall],
  selectedDate: mockDate,
  setSelectedDate: jest.fn(),
  setSelectedView: jest.fn(),
}

describe("<WeekRow />", () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <WeekRow {...mockProps} />
        </tbody>
      </table>)
  })
  it("[weekNumber]-row is in the document", () => {
    const weekRow = screen.getByTestId(`${mockProps.weekNumber}-row`)
    expect(weekRow).toBeInTheDocument()
  })
  it("All expected day tiles are in the document", () => {
    for (let i = 0; i < 7; i++) {
      let dayTile = screen.getByText(mockProps.startOfWeekDate.plus({days: i}).day)
      expect(dayTile).toBeInTheDocument()
    }
  })
})