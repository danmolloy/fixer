import "@testing-library/jest-dom"
import CalendarHeader, { CalendarHeaderProps } from "../../../components/calendar/monthCalendar/calendarHeader"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { DateTime } from "luxon"

const mockProps: CalendarHeaderProps = {
  selectedDate: DateTime.now(),
  setSelectedDate: jest.fn()
}

describe("<DatePickerHeader />", () => {
  beforeEach(() => {
    render(
      <table>
        <CalendarHeader {...mockProps} />
      </table>)
  })
  it("calendar-header is in the document", () => {
    const calendarHeader = screen.getByTestId("calendar-header")
    expect(calendarHeader).toBeInTheDocument()
  })
  it("name of month is in the document", () => {
    const monthName = screen.getByText(mockProps.selectedDate.toFormat("LLLL"))
    expect(monthName).toBeInTheDocument()
  })
  it("back toggle is in the document and calls setSelectedDate with arg", () => {
    const backToggle = screen.getByTestId("back-toggle")
    expect(backToggle).toBeInTheDocument()
    act(() => {
      fireEvent.click(backToggle)
    })
    expect(mockProps.setSelectedDate).toBeCalledWith(mockProps.selectedDate.minus({months: 1}).startOf("month"))
  })
  it("forward toggle is in the document and calls setSelectedDate with arg", () => {
    const forwardToggle = screen.getByTestId("forward-toggle")
    expect(forwardToggle).toBeInTheDocument()
    act(() => {
      fireEvent.click(forwardToggle)
    })
    expect(mockProps.setSelectedDate).toBeCalledWith(mockProps.selectedDate.plus({months: 1}).startOf("month"))
  })
})