import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { mockCallWithEvent } from "../../../__mocks__/models/call"
import { DateTime } from "luxon"
import CalendarRow, { CalendarRowProps } from "../../../components/calendar/monthCalendar/calendarRow"



describe("<CalendarRow />", () => {
  const mockProps: CalendarRowProps = {
    weekNumber: Math.ceil(Math.random() * 52),
    year: Math.floor(Math.random() * 30) + 2000,
    eventCalls: [mockCallWithEvent],
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
    const weekRow = screen.getByTestId(`calendar-${mockProps.weekNumber}-row`)
    expect(weekRow).toBeInTheDocument()
  })
  it("All days of that week are in the document", () => {
    const weekStart: DateTime = DateTime.fromObject({weekNumber: mockProps.weekNumber}).set({year: mockProps.year}).startOf("week")
  
    for (let i = 0; i < 7; i ++) {

      let dayTile = screen.getByText(weekStart.plus({ days: i}).day)
      expect(dayTile).toBeInTheDocument()
    }
  })

})