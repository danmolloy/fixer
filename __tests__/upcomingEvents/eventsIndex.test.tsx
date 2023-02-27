import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import EventsIndex from "../../components/upcomingEvents/eventsIndex";
import moment from "moment";

const mockProps = {
  session: {
    user: {
      name: "userName",
      email: "userEmail",
      image: "userImg",
    },
    expires: "mockExpires",
    userData: {
      id: "userId",
      name: "userName",
      email: "userEmail",
      emailVerified: null,
      image: "userImg",
      instrument: "userInstrument",
      profileInfo: null,
      isFixer: null,
      events: [{
        id: 1,
        createdAt: "eventCreated",
        updatedAt: "eventUpdated",
        ensembleName: "eventEnsemble",
        concertProgram: "eventProgram",
        confirmedOrOnHold: "Confirmed",
        dressCode: "dress",
        fee: "concertFee",
        additionalInfo: "additionalInfo",
        fixerEmail: "fixerEmail",
        calls: [{
          id: 1,
          createdAt: "callCreated",
          updatedAt: "callUpdated",
          startTime: "Tue, 26 Feb 2023 12:06:40 GMT",
          endTime: "Tue, 26 Feb 2023 15:06:40 GMT",
          venue: "HWH",
          eventId: 1,
          fixerEmail: "fixerEmail",
        }]
      }],
      calls: [{
        id: 1,
          createdAt: "callCreated",
          updatedAt: "callUpdated",
          startTime: "Tue, 26 Feb 2023 12:06:40 GMT",
          endTime: "Tue, 26 Feb 2023 15:06:40 GMT",
          venue: "HWH",
          eventId: 1,
          fixerEmail: "fixerEmail",
          event: {
            id: 1,
            createdAt: "eventCreated",
            updatedAt: "eventUpdated",
            ensembleName: "eventEnsemble",
            concertProgram: "eventProgram",
            confirmedOrOnHold: "Confirmed",
            dressCode: "dress",
            fee: "concertFee",
            additionalInfo: "additionalInfo",
            fixerEmail: "fixerEmail",
          }
      }]
    }
  }
}


describe("EventsIndex component", () => {
  beforeEach(() => {
    render(<EventsIndex {...mockProps} />)
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
  it("It refreshes on load ie when Calendar menu item clicked", () => {
    expect(1).toBe(2)
  })
})