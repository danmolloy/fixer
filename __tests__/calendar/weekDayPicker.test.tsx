import "@testing-library/jest-dom"
import { screen, render, act, fireEvent } from "@testing-library/react"
import WeekDayPicker, { WeekDayPickerProps } from "../../app/calendar/weekDayPicker"
import { DateTime } from "luxon"
import { mockCall } from "../../__mocks__/models/call"

const mockProps: WeekDayPickerProps = {
  selectedDate: DateTime.now(),
  setSelectedDate: jest.fn(),
  eventCalls: [mockCall]
}

describe("<WeekDayPicker />", () => {
  beforeEach(() => {
    render(<WeekDayPicker {...mockProps} />)
  })
  it("weekday-picker is in the document", () => {
    const weekdayPicker = screen.getByTestId("weekday-picker")
    expect(weekdayPicker).toBeInTheDocument()
  })
  it("each weekday is in the document with expected text", () => {
    const weekNum = mockProps.selectedDate.weekNumber
    const selectedYear = mockProps.selectedDate.year
    const selectedWeek = DateTime.fromObject({weekNumber: weekNum}).set({year: selectedYear})

    for (let i = 1; i <= 7; i ++) {
      let dayValue = selectedWeek.set({weekday: i})
      let day = screen.getByTestId(`${dayValue.day}-weekday-tile`)
      expect(day).toBeInTheDocument()
      expect(day.textContent).toMatch(dayValue.toFormat("cccdd"))
    } 
  })
  it("each weekday calls setSelectedDate with expected arg", () => {
    const weekNum = mockProps.selectedDate.weekNumber
    const selectedYear = mockProps.selectedDate.year
    const selectedWeek = DateTime.fromObject({weekNumber: weekNum}).set({year: selectedYear})

    for (let i = 1; i <= 7; i ++) {
      let dayValue = selectedWeek.set({weekday: i})
      let day = screen.getByTestId(`${dayValue.day}-weekday-tile`)

      expect(day).toBeInTheDocument()
      act(() => {
        fireEvent.click(day)
      })
      expect(mockProps.setSelectedDate).toBeCalled()
    } 

  })
  it("indicates if there is an event on particular day", () => {})
})