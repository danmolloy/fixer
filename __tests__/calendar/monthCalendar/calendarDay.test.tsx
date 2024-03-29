import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { DateTime } from "luxon"
import { mockCall, mockCallWithEventWithEnsemble } from "../../../__mocks__/models/call"
import CalendarDay, { CalendarDayProps } from "../../../components/calendar/monthCalendar/calendarDay"


describe("<CalendarDay />", () => {
  const mockProps: CalendarDayProps = {
    calendarDayDate: DateTime.now(),
    eventCalls: [mockCallWithEventWithEnsemble],
    selectedDate: DateTime.now(),
    setSelectedDate: jest.fn()
  }
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <tr>
            <CalendarDay {...mockProps} />
          </tr>
        </tbody>
      </table>)
  })
  it("[X]-day is in the document", () => {
    const dayTile = screen.getByTestId(`${mockProps.calendarDayDate}-day`)
    expect(dayTile).toBeInTheDocument()
  })
  it("calls selectDay onClick", () => {
    const dayTile = screen.getByTestId(`${mockProps.calendarDayDate}-day`)
    act(() => {
      fireEvent.click(dayTile)
    })
    expect(mockProps.setSelectedDate).toBeCalledWith(mockProps.calendarDayDate)
  })
  it("day text is in the document", () => {
    const dayText = screen.getByText(mockProps.calendarDayDate.day)
    expect(dayText).toBeInTheDocument()
  })
  it("all eventCall start times and ensemble names are in the document", () => {
    for (let i = 0; i < mockProps.eventCalls.length; i++) {
      let event = screen.getByTestId(`${mockProps.eventCalls[i].id}-preview`)
      expect(event).toBeInTheDocument()
      expect(event.textContent).toMatch(mockProps.eventCalls[i].event.ensemble.name)
      let startTime = DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).toFormat("ha") //hour in 12-hour time, no padding & meridiem
      expect(event.textContent).toMatch(String(startTime))
    }
  })
    //it("Doesnt pass all events to each day", () => {})

})

