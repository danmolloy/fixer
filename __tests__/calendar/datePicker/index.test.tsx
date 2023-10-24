import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import DatePicker, { DatePickerProps } from "../../../components/calendar/datepicker"
import { DateTime } from "luxon"
import { mockCall } from "../../../__mocks__/models/call"

const mockProps: DatePickerProps = {
  selectedDate: DateTime.now(),
  setSelectedDate: jest.fn(),
  eventCalls: [mockCall]

}

describe("<DatePicker />", () => {
  beforeEach(() => {
    render(<DatePicker {...mockProps} />)
  })
  it("monthCalendar is in the document", () => {
    const datePicker = screen.getByTestId("month-calendar")
    expect(datePicker).toBeInTheDocument()
  })
  it("dp-header is in the document", () => {
    const dpHeader = screen.getByTestId("date-picker-header")
    expect(dpHeader).toBeInTheDocument()
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
})