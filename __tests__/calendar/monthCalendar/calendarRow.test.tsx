import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { mockCallWithEventWithEnsemble } from "../../../__mocks__/models/call"
import { DateTime } from "luxon"
import CalendarRow, { CalendarRowProps } from "../../../components/calendar/monthCalendar/calendarRow"



describe("<CalendarRow />", () => {
  const mockProps: CalendarRowProps = {
    startOfWeekDate: DateTime.now().startOf("week"),
    eventCalls: [mockCallWithEventWithEnsemble],
    selectedDate: DateTime.now(),
    setSelectedDate: jest.fn()
  }
  beforeEach(() => {
    
    render(
      <table>
        <tbody>
          <CalendarRow {...mockProps} />
        </tbody>
      </table>)
  })
  it("[X]-row is in the document", () => {
    const weekRow = screen.getByTestId(`calendar-${mockProps.startOfWeekDate.weekNumber}-row`)
    expect(weekRow).toBeInTheDocument()
  })
  it("All days of that week are in the document", () => {
  
    for (let i = 0; i < 7; i ++) {

      let dayTile = screen.getByText(mockProps.startOfWeekDate.plus({ days: i}).day)
      expect(dayTile).toBeInTheDocument()
    }
  })

})