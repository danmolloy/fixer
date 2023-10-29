import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import YearCalendar, { YearCalendarProps } from "../../../components/calendar/yearCalendar"
import { DateTime } from "luxon"
import { mockCall } from "../../../__mocks__/models/call"

const mockDate =  DateTime.now()


const mockProps: YearCalendarProps = {
  month: mockDate.month,
  year: mockDate.year,
  eventCalls: [mockCall],
  selectedDate: mockDate,
  setSelectedDate: jest.fn(),
  setSelectedView: jest.fn(),
}

describe("<YearCalendar />", () => {
  beforeEach(() => {
    render(<YearCalendar {...mockProps} />)
  })
  it("", () => {})
})