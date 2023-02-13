import { fireEvent, getByLabelText, getByTestId, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import EventTile from '../../components/upcomingEvents/eventTile';

const dateTimeRegex = /[a-z]{3}\s[a-z]{3}\s[\d]{2}\s[\d]{4}\s[\d]{2}:[\d]{2}/i

const callProps = {"id":60,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:00:34.880Z","startTime":"2023-01-26T10:00:00.000Z","endTime":"2023-01-26T13:00:00.000Z","venue":"Maida Vale","eventId":42,"fixerEmail":"danielmolloy_6@icloud.com","event":{"id":42,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:00:34.880Z","ensembleName":"London Symphony Orchestra","concertProgram":"Australia Day Concert","confirmedOrOnHold":"confirmed","dressCode":"Blacks","fee":"ABO Category 1","additionalInfo":"Free lunch","fixerEmail":"danielmolloy_6@icloud.com"}}

describe("EventTile Component", () => {
  const sessionEmail = callProps.event.fixerEmail
  beforeEach(() => {
    render(<EventTile 
      call={callProps} 
      sessionEmail={sessionEmail} 
      fixerEmail={callProps.event.fixerEmail}/>)
  })
  it("Renders", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    expect(eventTile).toBeInTheDocument()
  })
  it("Has button to contact fixer", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    expect(eventTile.textContent).toMatch(/Fixer Details/g)
  })
  it("Has link to event page", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    expect(eventTile.textContent).toMatch(/View Event/g)
  })
  it("Displays Start date and time", () => {
    const callStartTime = screen.getByTestId("call-start-time")
    expect(callStartTime.textContent).toMatch(dateTimeRegex)
    expect(String(new Date(callStartTime.textContent))).toMatch(String(new Date(callProps.startTime)))
  })
  it("Displays End Date/Time", () => {
    const callEndTime = screen.getByTestId("call-end-time")
    expect(callEndTime.textContent).toMatch(dateTimeRegex)
    expect(String(new Date(callEndTime.textContent))).toMatch(String(new Date(callProps.endTime)))
  })
  it("Program Displayed", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    expect(eventTile.textContent).toMatch(callProps.event.concertProgram)
  })
  it("Venue displayed", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    expect(eventTile.textContent).toMatch(callProps.venue)
  })
  
  it("Indicates if you are the fixer of the event", () => {
    const eventTile = screen.getByTestId("event-tile-div")
    if (sessionEmail === callProps.fixerEmail) {
      expect(eventTile.textContent).toMatch(/You are the fixer of this event./gi)
    } else {
      expect(eventTile.textContent).not.toMatch(/You are the fixer of this event./gi)
    }
  })
})

//it("Contact Fixer button renders contact info", () => {})
    //it("Displays Calls rather than Events", () => {})
    //it("Link to view venue in Google Maps", () => {})