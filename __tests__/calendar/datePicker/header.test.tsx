import "@testing-library/jest-dom"
import DatePickerHeader, { DatePickerHeaderProps } from "../../../components/calendar/datepicker/header"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { DateTime } from "luxon"

const mockProps: DatePickerHeaderProps = {
  selectedDate: DateTime.now(),
  setSelectedDate: jest.fn()
}

describe("<DatePickerHeader />", () => {
  beforeEach(() => {
    render(<DatePickerHeader {...mockProps} />)
  })
  it("dp-header is in the document", () => {
    const dpHeader = screen.getByTestId("date-picker-header")
    expect(dpHeader).toBeInTheDocument()
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