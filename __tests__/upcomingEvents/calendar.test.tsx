import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import Calendar from "../../components/upcomingEvents/calendar";
import React from "react";
import moment from "moment";

const setSelectedDate = jest.fn()

const mockProps = {
  selectedDate: moment(new Date()).startOf('day'),
  setSelectedDate: setSelectedDate
}

describe("Calendar component", () => {
  beforeEach(() => {
    render(<Calendar {...mockProps} />)
  })
  it("Renders", () => {
    const calendar = screen.getByTestId("date-picker-div")
    expect(calendar).toBeInTheDocument()
  })
  it("Calls setSelectedDate with expected arg when date clicked", () => {
    const firstOfMonth = screen.getByText("1")
    act(() => {
      fireEvent.click(firstOfMonth)
    })
    expect(setSelectedDate).toBeCalledWith(mockProps.selectedDate.startOf('month'))
  })
})