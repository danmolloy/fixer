import { act, fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import ActiveCalls from "../../components/fixing/activeCalls"
import React from "react"

const mockProps = {
  "eventCalls":[{"id":60,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:00:34.880Z","startTime":"2023-01-26T10:00:00.000Z","endTime":"2023-01-26T13:00:00.000Z","venue":"Maida Vale","eventId":42,"fixerEmail":"danielmolloy_6@icloud.com"},{"id":59,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:00:34.880Z","startTime":"2023-01-26T14:00:00.000Z","endTime":"2023-01-26T17:00:00.000Z","venue":"Maida Vale","eventId":42,"fixerEmail":"danielmolloy_6@icloud.com"}],"instrumentName":"Violin","instrumentSection":{"id":365,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:01:37.908Z","eventId":42,"instrumentName":"Violin","numToBook":1,"callOrder":"Ordered","musicians":[{"id":54,"createdAt":"2023-01-26T19:01:37.938Z","updatedAt":"2023-01-26T19:03:13.288Z","recieved":true,"accepted":false,"musicianEmail":"Catalina_Hermann@yahoo.com","eventInstrumentId":365,"bookingOrAvailability":"Booking","musician":{"name":"Tyler Hoppe"},"calls":[{"id":59},{"id":60}]},{"id":55,"createdAt":"2023-01-26T19:01:37.964Z","updatedAt":"2023-01-26T19:03:34.791Z","recieved":true,"accepted":false,"musicianEmail":"Abigail_Torp@gmail.com","eventInstrumentId":365,"bookingOrAvailability":"Booking","musician":{"name":"Benjamin Zieme"},"calls":[{"id":59},{"id":60}]},{"id":56,"createdAt":"2023-01-26T19:01:37.970Z","updatedAt":"2023-01-26T19:03:58.504Z","recieved":true,"accepted":true,"musicianEmail":"Ida_Wilderman90@yahoo.com","eventInstrumentId":365,"bookingOrAvailability":"Booking","musician":{"name":"Kara Rau"},"calls":[{"id":59},{"id":60}]}]},
  "editList":false,
  "instrumentFixed":true
}

describe("ActiveCalls component", () => {
  beforeEach(() => {
    render(<ActiveCalls {...mockProps} />)
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
