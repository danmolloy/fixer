import "@testing-library/jest-dom"
import { render, act, screen } from "@testing-library/react"
import CalendarEventLink, { CalendarEventLinkProps, createICSEvent, downloadICS, getDateArr } from "../../../../components/event/eventDetail/menu/calendarEventLink"
import { mockEventWithCalls } from "../../../../__mocks__/models/event"
import "ics"
import { mockCall } from "../../../../__mocks__/models/call"

jest.mock("ics")
jest.mock('url')

const mockProps: CalendarEventLinkProps = {
  data: mockEventWithCalls
}

describe("<CalendarEventLink />", () => {
  beforeEach(() => {
    render(<CalendarEventLink {...mockProps} />)
  })
  it("calendar-link is in the document", () => {
    const calendarLink = screen.getByTestId("calendar-link")
    expect(calendarLink).toBeInTheDocument()
  })
  it("createEvent is called with expected args", () => {

  })
})

describe("getDateArr()", () => {
  it("returns expected array with new Date()", () => {
    const mockDate = new Date()
    const year = mockDate.getUTCFullYear();
    const month = mockDate.getUTCMonth(); // Months are zero-based (0 = January, 1 = February, ...)
    const day = mockDate.getUTCDate();
    const hour = mockDate.getUTCHours();
    const minute = mockDate.getUTCMinutes();
    const returnArr = [year, month, day, hour, minute]
    expect(getDateArr(mockDate)).toEqual(returnArr)
  })
  it("returns expected array with prescribed date", () => {
    const mockDate = new Date("2009-07-31T01:41:43.602Z")
    expect(getDateArr(mockDate)).toEqual([2009, 6, 31, 1, 41])
  })
})

describe("createICSEvent()", () => {
  it("returns expected obj", () => {
    expect(createICSEvent(mockCall, mockEventWithCalls)).toEqual({
      start: getDateArr(new Date(mockCall.startTime)),
      end: getDateArr(new Date(mockCall.endTime)),
      title: mockEventWithCalls.eventTitle, 
      description: `${mockEventWithCalls.ensembleName} (${mockEventWithCalls.confirmedOrOnHold})`,
      location: mockCall.venue
    })
  })
})

describe("downloadICS()", () => {
  it("", async () => {
    console.log(`downloadICS() in eventDetail/menu is not currently tested!`)
  })
})