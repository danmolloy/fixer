import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { DateTime } from "luxon"
import CalendarHeader, { CalendarHeaderProps } from "../../components/calendar/header"



describe("<CalendarHeader />", () => {
  const mockProps: CalendarHeaderProps = {
    selectedDate: DateTime.now(),
    setSelectedDate: jest.fn(),
    setSelectedView: jest.fn(),
    selectedView: "Day",
  
  }
  beforeEach(() => {
    render(<CalendarHeader {...mockProps} />)
  })
  it("calendar-header is in the document", () => {
    const calendarHeader = screen.getByTestId("calendar-header")
    expect(calendarHeader).toBeInTheDocument()
  })
  it("view-select is in the document", () => {
    const viewSelect = screen.getByTestId("view-select")
    expect(viewSelect).toBeInTheDocument()
  })
  it("today button is in the document", () => {
    const todayBtn = screen.getByTestId("today-btn")
    expect(todayBtn).toBeInTheDocument()
  })
  it("today btn calls setSelectedDate with expected arg", () => {
    const todayBtn = screen.getByTestId("today-btn")
    act(() => {
      fireEvent.click(todayBtn)
    })
    expect(mockProps.setSelectedDate).toBeCalled()
  })
  it("selectedDate is in the document in expected format for day view", () => {
    // localized date with full month & Day
    const formattedDate = mockProps.selectedDate.toFormat("DDDcccc")
    const selectedDate = screen.getByTestId("selected-date")
    expect(selectedDate).toBeInTheDocument()
    expect(selectedDate.textContent).toMatch(formattedDate)
  })
})




describe("<CalendarHeader />", () => {
  const mockProps: CalendarHeaderProps = {
    selectedDate: DateTime.now(),
    setSelectedDate: jest.fn(),
    setSelectedView: jest.fn(),
    selectedView: "Month",
  
  }
  beforeEach(() => {
    render(<CalendarHeader {...mockProps} />)
  })
  it("selectedDate is in the document in expected format for month view", () => {
    const formattedDate = mockProps.selectedDate.toFormat("DDDcccc")
    const selectedDate = screen.getByTestId("selected-date")
    expect(selectedDate).toBeInTheDocument()
    expect(selectedDate.textContent).toMatch(formattedDate)
  })})
  

describe("<CalendarHeader />", () => {
  const mockProps: CalendarHeaderProps = {
    selectedDate: DateTime.now(),
    setSelectedDate: jest.fn(),
    setSelectedView: jest.fn(),
    selectedView: "Year",
  
  }
  beforeEach(() => {
    render(<CalendarHeader {...mockProps} />)
  })
  it("selectedDate is in the document in expected format for year view", () => {
    const formattedDate = mockProps.selectedDate.toFormat("yyyy")
    const selectedDate = screen.getByTestId("selected-date")
    expect(selectedDate).toBeInTheDocument()
    expect(selectedDate.textContent).toMatch(formattedDate)
  })
})
  
  