import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import EventsIndex, { EventsIndexProps } from "../../components/upcomingEvents/eventsIndex";
import moment from "moment";
import { mockUser } from "../../__mocks__/models/user";
import { mockEventWithCalls } from "../../__mocks__/models/event";
import { mockCallWithEvent } from "../../__mocks__/models/call";


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(
      
      )
  })
) as jest.Mock;


describe("EventsIndex component", () => {
  beforeEach(() => {
    render(<EventsIndex />)
  })
  it("Renders", () => {
    const eventsIndex = screen.getByTestId("events-index-div")
    expect(eventsIndex).toBeInTheDocument()
  })
  it("Date picker Calendar is in the document", () => {
    const calendar = screen.getByTestId("date-picker-div")
    expect(calendar).toBeInTheDocument()
  })
  it("Events Dashboard is in the document", () => {
    const dashboard = screen.getByTestId('event-dashboard-div')
    expect(dashboard).toBeInTheDocument()
  })
  it("Default view is All Upcoming Events", () => {
    const viewAllUpcoming = screen.getByTestId("upcoming-events-div")
    expect(viewAllUpcoming).toBeInTheDocument()
  })
  it("On click, date picker calendar renders week view if dateRange is null (i.e. viewAll)", () => {
    const viewAllUpcoming = screen.getByTestId("upcoming-events-div")
    expect(viewAllUpcoming).toBeInTheDocument()
    const firstOfMonth = screen.getByText("1")
    act(() => {
      fireEvent.click(firstOfMonth)
    })
    const dateRangeView = screen.getByTestId("date-range-view")
    expect(dateRangeView).toBeInTheDocument()
    expect(viewAllUpcoming).not.toBeInTheDocument()
  })
  it("Week buttons render dateRanges", () => {
    const weekBtn = screen.getByTestId("week-btn")
    const viewAllUpcoming = screen.getByTestId("upcoming-events-div")
    expect(viewAllUpcoming).toBeInTheDocument()
    act(() => {
      fireEvent.click(weekBtn)
    })
    const dateRangeView = screen.getByTestId("date-range-view")
    expect(dateRangeView).toBeInTheDocument()
  })
  it("Fortnight Button renders dateRanges", () => {
    const fortnightBtn = screen.getByTestId("fortnight-btn")
    const viewAllUpcoming = screen.getByTestId("upcoming-events-div")
    expect(viewAllUpcoming).toBeInTheDocument()

    act(() => {
      fireEvent.click(fortnightBtn)
    })
    const dateRangeView = screen.getByTestId("date-range-view")

    expect(dateRangeView).toBeInTheDocument()

  })
  it("Four week button renders dateRanges", () => {
    const fourWeekBtn = screen.getByTestId("month-btn")
    const viewAllUpcoming = screen.getByTestId("upcoming-events-div")
    expect(viewAllUpcoming).toBeInTheDocument()

    act(() => {
      fireEvent.click(fourWeekBtn)
    })
    const dateRangeView = screen.getByTestId("date-range-view")

    expect(dateRangeView).toBeInTheDocument()
  })
  //it("Upcoming Events button renders upcoming component", async () => {})
  //it("It refreshes on load ie when Calendar menu item clicked", () => {})
})