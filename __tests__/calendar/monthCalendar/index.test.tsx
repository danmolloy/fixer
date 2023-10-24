import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { DateTime } from "luxon"
import { mockCall, mockCallWithEvent } from "../../../__mocks__/models/call"
import MonthCalendar, { MonthCalendarProps } from "../../../components/calendar/monthCalendar"

const mockProps: MonthCalendarProps = {
  selectedDate: DateTime.now(),
  setSelectedDate: jest.fn(),
  eventCalls: [mockCallWithEvent]

}

describe("<MonthCalendar />", () => {
  beforeEach(() => {
    render(<MonthCalendar {...mockProps} />)
  })
  it("monthCalendar is in the document", () => {
    const monthCalendar = screen.getByTestId("month-calendar")
    expect(monthCalendar).toBeInTheDocument()
  })
  it("calendar-header is in the document", () => {
    const calendarHeader = screen.getByTestId("calendar-header")
    expect(calendarHeader).toBeInTheDocument()
  })
  it("all expected weeks are in the document", () => {
    const startOfMonth: number = mockProps.selectedDate.startOf("month").weekNumber
    const endOfMonth: number = mockProps.selectedDate.startOf("month").weekNumber
    let numWeeks: number = endOfMonth - startOfMonth

    for (let i = 0; i < numWeeks; i ++) {
      let weekNum = startOfMonth + i
      let weekRow = screen.getByTestId(`${weekNum[i]}-row`)
      expect(weekRow).toBeInTheDocument()
    }
  })
    //it("DaysRow is in the document", () => {})

})