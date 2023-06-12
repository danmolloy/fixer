import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import AvailabilityTable from "../../components/fixing/availabilityTable"


const mockEventCalls = [{
  id: 1,
  createdAt: "mockEventCallCreatedAt",
  updatedAt: "mockEventCallUpdatedAt",
  startTime: "mockStartTime",
  endTime: "MockEndTime",
  venue: "Mock Venue",
  eventId: 2,
  fixerEmail: "fixerEmail",
}];

const mockMusicians = [{
  id: 5,
  createdAt: String(new Date()),
  updatedAt: String(new Date()),
  recieved: true,
  accepted: null,
  musicianEmail: "mock@email.com",
  eventInstrumentId: 3,
  bookingOrAvailability: "Availability",
  musician: {
    name: "Greg Ievers"
  },
  calls: [{
    id: mockEventCalls[0].id
  }]
}]

const mockInstrumentSection = {
  id: 3,
  createdAt: "mockEventCallCreatedAt",
  updatedAt: "mockEventCallUpdatedAt",
  eventId: mockEventCalls[0].eventId,
  instrumentName: "Viola",
  numToBook: 4, 
  callOrder: "Ordered",
  musicians: mockMusicians
};


const mockProps = {
  eventCalls: mockEventCalls, 
  instrumentSection: mockInstrumentSection,
  removePlayer: jest.fn(),
  offerOrDecline: jest.fn()
}

describe("AvailabilityTable component", () => {
  beforeEach(() => {
    render(<AvailabilityTable {...mockProps} />)
  })

  it("Renders", () => {
    const tableDiv = screen.getByTestId("availability-table-div")
    expect(tableDiv).toBeInTheDocument()
  })
})