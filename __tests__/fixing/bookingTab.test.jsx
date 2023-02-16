import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import BookingTab from '../../components/fixing/bookingTab'

let mockInstrumentName = "Cello"

const mockData = {
  editList: Math.random() < .5 ? true : false,
  setEditList: jest.fn(),
  instrumentalistsList: [{
    id: "mock instrumentalist id",
    name: "mock name",
    email: "mock email",
    emailVerified: null,
    instrument: mockInstrumentName,
    profileInfo: "profile info",
    isFixer: false
  }],
  refreshProps: jest.fn(),
  handleSubmit: jest.fn(),
  instrumentFixed: Math.random() < .5 ? true : false,
  eventCalls: [{
    id: "mockEventCallId",
    createdAt: "mockEventCallCreatedAt",
    updatedAt: "mockEventCallUpdatedAt",
    startTime: "mockStartTime",
    endTime: "MockEndTime",
    venue: "Mock Venue",
    eventId: "mockEventId",
    fixerEmail: "fixerEmail",
  }],
  instrumentSection: {
    id: "instrumentSectionId",
    createdAt: "instrumentSectionCreatedAt",
    updatedAt: "instrumentSectionUpdatedAt",
    eventId: "eventId",
    instrumentName: mockInstrumentName,
    numToBook: 1,
    callOrder: "Ordered",
    musicians: [{
      id: "mockMusicianId",
      createdAt: "mockMusicianCreatedAt",
      updatedAt: "mockMusicianUpdatedAt",
      recieved: Math.random() < 0.5 ? true : false,
      accepted: Math.random() < 0.5 ? true : false,
      musicianEmail: "mockMusicianEmail",
      eventInstrumentId: "mockMusicianEventId",
      bookingOrAvailability: "Booking",
      musician: {
        name: "Greg Ievers",
      },
      calls: [{
        id: [1, 2]
      }]
    }]
}}

describe("BookingTab component", () => {
  beforeEach(() => {
    render(<BookingTab setEditList={() => setEditList()} {...mockData} />)
  })
  it("Renders", () => {
    const tabDiv = screen.getByTestId("booking-tab")
    expect(tabDiv).toBeInTheDocument()
  })
  it("Edit button renders an editing component", async () => {
    const editBtn = screen.getByTestId("booking-edit-btn")
    fireEvent.click(editBtn)
    await waitFor(async () => {
      await new Promise(res => setTimeout(res, 100))
    })
    const editCallsDiv = screen.getByTestId(`booking-edit-btn`)
    expect(editCallsDiv).toBeInTheDocument()
  })
  
})