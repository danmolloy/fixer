import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import YearCalendar, { YearCalendarProps } from "../../../app/calendar/yearCalendar"
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
  it("year-calendar is in the documnet", () => {
    const yearCalendar = screen.getByTestId("year-calendar")
    expect(yearCalendar).toBeInTheDocument()
  })
  it("year-header is in the document", () => {
    const yearHeader = screen.getByTestId("year-header")
    expect(yearHeader).toBeInTheDocument()
  })
  it("days-row is in the document", () => {
    const daysRow = screen.getByTestId("days-row")
    expect(daysRow).toBeInTheDocument()
  })
  it("all expected week rows are in the document", () => {
    const startOfMonth = DateTime.fromObject({month: mockProps.month, year: mockProps.year}).startOf('month').weekNumber
    const endOfMonth = DateTime.fromObject({month: mockProps.month, year: mockProps.year}).endOf('month').weekNumber
    
    for (let i = startOfMonth; i <= endOfMonth; i++) {
      let weekRow = screen.getByTestId(`${i}-row`)
      expect(weekRow).toBeInTheDocument()
    }
  })
})