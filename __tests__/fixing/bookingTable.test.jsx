import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import BookingTable from "../../components/fixing/bookingTable"

const mockProps = {"eventCalls":[{"id":60,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:00:34.880Z","startTime":"2023-01-26T10:00:00.000Z","endTime":"2023-01-26T13:00:00.000Z","venue":"Maida Vale","eventId":42,"fixerEmail":"danielmolloy_6@icloud.com"},{"id":59,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:00:34.880Z","startTime":"2023-01-26T14:00:00.000Z","endTime":"2023-01-26T17:00:00.000Z","venue":"Maida Vale","eventId":42,"fixerEmail":"danielmolloy_6@icloud.com"}],"instrumentSection":{"id":365,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:01:37.908Z","eventId":42,"instrumentName":"Violin","numToBook":1,"callOrder":"Ordered","musicians":[{"id":54,"createdAt":"2023-01-26T19:01:37.938Z","updatedAt":"2023-01-26T19:03:13.288Z","recieved":true,"accepted":false,"musicianEmail":"Catalina_Hermann@yahoo.com","eventInstrumentId":365,"bookingOrAvailability":"Booking","musician":{"name":"Tyler Hoppe"},"calls":[{"id":59},{"id":60}]},{"id":55,"createdAt":"2023-01-26T19:01:37.964Z","updatedAt":"2023-01-26T19:03:34.791Z","recieved":true,"accepted":false,"musicianEmail":"Abigail_Torp@gmail.com","eventInstrumentId":365,"bookingOrAvailability":"Booking","musician":{"name":"Benjamin Zieme"},"calls":[{"id":59},{"id":60}]},{"id":56,"createdAt":"2023-01-26T19:01:37.970Z","updatedAt":"2023-01-26T19:03:58.504Z","recieved":true,"accepted":true,"musicianEmail":"Ida_Wilderman90@yahoo.com","eventInstrumentId":365,"bookingOrAvailability":"Booking","musician":{"name":"Kara Rau"},"calls":[{"id":59},{"id":60}]}]}}

describe("BookingTable component", () => {
  beforeEach(() => {
    render(<BookingTable eventCalls={mockProps.eventCalls} instrumentSection={mockProps.instrumentSection}/>)
  })

  it("Renders", () => {
    const tableDiv = screen.getByTestId("booking-table-div")
    expect(tableDiv).toBeInTheDocument();
  })
  it("Indicates if player has accepted or declined", () => {
    const randCall = mockProps.instrumentSection.musicians[Math.floor(Math.random() * mockProps.instrumentSection.musicians.length)]
    //if(randCall.accepted === false) {}
    const element = screen.getByText(randCall.musician.name)
    if (randCall.accepted === false) {
      expect(element.outerHTML).toMatch(/text-slate-400/g)
    } else if (randCall.accepted === true) {
      expect(element.outerHTML).not.toMatch(/text-slate-400/g)
    } 
  })
  it("Indicates if player has been contacted", () => {
    const randCall = mockProps.instrumentSection.musicians[Math.floor(Math.random() * mockProps.instrumentSection.musicians.length)]
    //if(randCall.accepted === false) {}
    const element = screen.getByText(randCall.musician.name)
    if (randCall.recieved === false) {
      expect(element.outerHTML).toMatch(/text-slate-400/g)
    }
  })
})