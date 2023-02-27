import { act, fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import ActiveCalls from "../../components/fixing/activeCalls"
import React from "react"

const recieved = Math.random() > .5 ? true : false
const accepted = Math.random() > .5 ? true : false
const eventInstrumentId = 1
const eventId = 4

const mockEventCall = {
  id: 1,
  createdAt: "callCreatedAt",
  updatedAt: "callUpdatedAt",
  startTime: "callStartTime",
  endTime: "callEndTime",
  venue: "callVenue",
  eventId: eventId,
  fixerEmail: "fixerEmail"
}

const mockMusician = {
  id: 0,
  createdAt: "musicianCreatedAt",
  updatedAt: "musicianUpdatedAt",
  recieved: recieved,
  accepted: recieved == true ? accepted : null,
  musicianEmail: "mockMusicianEmail",
  eventInstrumentId: eventInstrumentId,
  bookingOrAvailability: Math.random() < .5 ? "Booking" : "Availability",
  musician: {
    name: "Dan Molloy"
  },
  calls: [
    {
      id: mockEventCall.id
    }
  ]
}

const mockInstrumentSection = {
  id: eventInstrumentId,
  createdAt: 'instrumentCreatedAt',
  updatedAt: "instrumentUpdatedAt",
  eventId: eventId,
  instrumentName: "Double Bass",
  numToBook: Math.random() < .5 ? 1 : 2,
  callOrder: "Ordered",
  musicians: [mockMusician]
}



const mockActiveCallsProps = {
  eventCalls: [mockEventCall],
  instrumentName: mockInstrumentSection.instrumentName,
  instrumentSection: mockInstrumentSection,
  editList: Math.random() > .5 ? true : false,
  instrumentFixed: Math.random() > .5 ? true : false,
  refreshProps: jest.fn(),
  closeEdit: jest.fn(),
}

describe("ActiveCalls component", () => {
  beforeEach(() => {
    render(<ActiveCalls {...mockActiveCallsProps} />)
  })
  it("Renders", () => {
    const activeCalls = screen.getByTestId("active-calls-div")
    expect(activeCalls).toBeInTheDocument()
  })

})

//"Call Order is stated"
//"Indicates if player has declined"
//"Indicates if player has accepted"
//"Indicates if player has not been called"
//"Explictly says if no calls out for the instrument"
//"Displays Instruments in order"

  //it("Instrument tile states whether calling for availability or to book", () => {})
  //it("Fixer can add additional info for specific instruments", () => {})
  //it("Fixer can add additional message for particular player", () => {})
  //it("Fixer is able to accept gig on player's behalf", () => {})
  //it("Fixer is able to remove player from the gig", () => {})
  //it("Players are able to indicate their availablitly across all calls", () => {})
  //it("Fixers can compare players' availability across all calls", () => {})
  //it("Fixers can add MAS players to the list", () => {})
  //it("Fixers can add Bakers players to the list", () => {})
  //it("Fixers can add independent players mobile number to list", () => {})
  //it("Indicates if a player has accepted or the Fixer accepted on their behalf")
