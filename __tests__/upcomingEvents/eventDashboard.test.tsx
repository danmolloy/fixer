import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EventDashboard from '../../components/upcomingEvents/dashboard'
import React from 'react'

const setEventView = jest.fn()

describe("EventDashboard component", () => {
  beforeEach(() => {
    render(<EventDashboard setEventView={setEventView}/>)
  })
  it("Renders", () => {
    const eventDashboard = screen.getByTestId("event-dashboard-div")
    expect(eventDashboard).toBeInTheDocument()
  })
  it("View All Upcoming calls setEventView onClick with arg 'viewAll'", () => {
    const viewAllBtn = screen.getByTestId("view-all-btn")
    expect(viewAllBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(viewAllBtn)
    })
    expect(setEventView).toBeCalledWith("viewAll")
  })
  it("Week button setEventView onClick with arg 'week'", () => {
    const weekBtn = screen.getByTestId("week-btn")
    expect(weekBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(weekBtn)
    })
    expect(setEventView).toBeCalledWith("week")
  })
  it("Fortnight button calls setEventView onClick with arg 'fortnight'", () => {
    const fortnightBtn = screen.getByTestId("fortnight-btn")
    expect(fortnightBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(fortnightBtn)
    })
    expect(setEventView).toBeCalledWith("fortnight")
  })
  it("Month button calls setEventView onClick with arg 'month'", () => {
    const monthBtn = screen.getByTestId("month-btn")
    expect(monthBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(monthBtn)
    })
    expect(setEventView).toBeCalledWith("month")
  })
})