import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"
import EventDashboard from "../../components/upcomingEvents/dashboard";
import React from "react";

const setDateRange = jest.fn()
const setSelectedDate = jest.fn()

const mockProps = {
  setDateRange: setDateRange,
  setSelectedDate: setSelectedDate,
  dateRange: null
}

describe("EventDashboard component", () => {
  beforeEach(() => {
    render(<EventDashboard {...mockProps} />)
  })
  it("Renders", () => {
    const eventDashboard = screen.getByTestId("event-dashboard-div")
    expect(eventDashboard).toBeInTheDocument()
  })
  it("Upcoming Events calls setDateRange & setSelectedDate with expected args on click", () => {
    const upcomingEvents = screen.getByTestId("view-all-btn")
    expect(upcomingEvents).toBeInTheDocument()
    act(() => {
      fireEvent.click(upcomingEvents)
    })
    expect(setDateRange).toBeCalledWith(null)
  })
  it("Week btn calls setDateRange with expected arg on click", () => {
    const weekBtn = screen.getByTestId("week-btn")
    expect(weekBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(weekBtn)
    })
    expect(setDateRange).toBeCalledWith(7)
  })
  it("Fortnight btn calls setDateRange with expected arg on click", () => {
    const fortnightBtn = screen.getByTestId("fortnight-btn")
    expect(fortnightBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(fortnightBtn)
    })
    expect(setDateRange).toBeCalledWith(14)
  })
  it("Four Weeks btn calls setDateRange with expected arg on click", () => {
    const fourWeekBtn = screen.getByTestId("month-btn")
    expect(fourWeekBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(fourWeekBtn)
    })
    expect(setDateRange).toBeCalledWith(28)
  })

})