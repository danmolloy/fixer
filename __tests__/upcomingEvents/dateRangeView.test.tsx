import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import DateRangeView, { daysArr, eventDateFilter } from "../../components/upcomingEvents/dateRangeView";
import moment from "moment";

const selectedDate = moment.utc(new Date("Tue, 21 Feb 2023 12:06:40 GMT"))
const startTime = String(moment.utc( new Date("Tue, 21 Feb 2023 16:06:40 GMT")))
const endTime =  String(moment.utc(new Date("Tue, 21 Feb 2023 19:06:40 GMT")))
const mockProps = {
  selectedDate: selectedDate,
  dateRange: 14,
  upcomingCalls: [{
    id: 1,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    startTime: startTime,
    endTime: endTime,
    venue: "mock Venue",
    eventId: 2,
    fixerEmail: "email@email.com",
    event: {
      id: 2,
      createdAt: "eventCreated",
      updatedAt: "eventUpdated",
      ensembleName: "LSO",
      concertProgram: "Brahms",
      confirmedOrOnHold: "Confirmed",
      dressCode: "Blacks",
      fee: "400",
      additionalInfo: "additionalInfo",
      fixerEmail: "email@email.com",
    }
  }],
  sessionEmail: "email@email.com"
}

describe("DateRangeView component", () => {
  beforeEach(() => {
    render(<DateRangeView {...mockProps} />)
  })
  
  it("Renders", () => {
    const dateRangeView = screen.getByTestId("date-range-view")
    expect(dateRangeView).toBeInTheDocument()
  })
  it("Renders expected event tiles", () => {
    const dateRangeView = screen.getByTestId("date-range-view")
    expect(dateRangeView.textContent).toMatch(mockProps.upcomingCalls[0].event.ensembleName)
    expect(dateRangeView.textContent).toMatch(/^Tuesday 21st February 2023      LSO•••Brahms1626 Tue 21st February 2023mock VenueWednesday 22nd February 2023No events/)
  })
})

describe("daysArr function", () => {
  it("Returns arr of expected length", () => {
    expect(daysArr(moment(), 7)).toHaveLength(7)
  })
  it("Returns objects of expected values", () => {
    const func = (daysArr(selectedDate, 7))
    const funcResult = [
      { day: 'Tue Feb 21 2023 12:06:40 GMT+0000' },
      { day: 'Wed Feb 22 2023 12:06:40 GMT+0000' },
      { day: 'Thu Feb 23 2023 12:06:40 GMT+0000' },
      { day: 'Fri Feb 24 2023 12:06:40 GMT+0000' },
      { day: 'Sat Feb 25 2023 12:06:40 GMT+0000' },
      { day: 'Sun Feb 26 2023 12:06:40 GMT+0000' },
      { day: 'Mon Feb 27 2023 12:06:40 GMT+0000' }
    ]
    for (let i = 0; i < func.length; i ++) {
      
      expect(func[i]).toStrictEqual(funcResult[i])
    }
  })
})

describe("eventDateFilter function", () => {
  it("Returns expected value", () => {
    // Starts and ends on day
    const start1 = "Tue, 21 Feb 2023 19:06:40 GMT"
    const end1 = "Tue, 21 Feb 2023 22:06:40 GMT"
    const day1 = "Tue, 21 Feb 2023 19:06:40 GMT"
    expect(eventDateFilter(start1, end1, day1)).toBe(true)

    // Ends on day only
    const start2 = "Tue, 21 Feb 2023 19:06:40 GMT"
    const end2 = "Tue, 22 Feb 2023 22:06:40 GMT"
    const day2 = "Tue, 22 Feb 2023 19:06:40 GMT"
    expect(eventDateFilter(start2, end2, day2)).toBe(true)

    // Starts on day only
    const start3 = "Tue, 21 Feb 2023 19:06:40 GMT"
    const end3 = "Tue, 22 Feb 2023 22:06:40 GMT"
    const day3 = "Tue, 21 Feb 2023 19:06:40 GMT"
    expect(eventDateFilter(start3, end3, day3)).toBe(true)

    //Doesn't start or end on day
    const start4 = "Tue, 21 Feb 2023 19:06:40 GMT"
    const end4 = "Tue, 22 Feb 2023 22:06:40 GMT"
    const day4 = "Tue, 20 Feb 2023 19:06:40 GMT"
    expect(eventDateFilter(start4, end4, day4)).toBe(false)
  })
})