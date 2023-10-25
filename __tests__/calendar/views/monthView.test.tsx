import "@testing-library/jest-dom"
import { screen, render } from "@testing-library/react"
import MonthView, { MonthViewProps } from "../../../components/calendar/views/monthView"
import { DateTime } from "luxon"
import { mockCallWithEvent } from "../../../__mocks__/models/call"

const mockProps: MonthViewProps = {
  selectedDate: DateTime.now(),
  setSelectedDate: jest.fn(),
  eventCalls: [mockCallWithEvent]
}

describe("<MonthView />", () => {
  beforeEach(() => {
    render(<MonthView {...mockProps} />)
  })
  it("month-view is in the document", () => {
    const monthView = screen.getByTestId('month-view')
    expect(monthView).toBeInTheDocument()
  })
  it("month-calendar is in the document", () => {
    const monthCalendar = screen.getByTestId("month-calendar")
    expect(monthCalendar).toBeInTheDocument()
  })
  it("call-list is in the document", () => {
    const callList = screen.getByTestId("call-list")
    expect(callList).toBeInTheDocument()
  })
})