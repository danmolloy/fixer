import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import BookingTab from '../../components/fixing/bookingTab'


const mockData = {
  "instrumentalistsList":[],
  "eventId":42,
  "eventCalls":[{"id":60,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:00:34.880Z","startTime":"2023-01-26T10:00:00.000Z","endTime":"2023-01-26T13:00:00.000Z","venue":"Maida Vale","eventId":42,"fixerEmail":"danielmolloy_6@icloud.com"},{"id":59,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:00:34.880Z","startTime":"2023-01-26T14:00:00.000Z","endTime":"2023-01-26T17:00:00.000Z","venue":"Maida Vale","eventId":42,"fixerEmail":"danielmolloy_6@icloud.com"}],
  "keyId":365,
  "editList":false,
  "activeCalls":{"id":365,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:01:37.908Z","eventId":42,"instrumentName":"Violin","numToBook":1,"callOrder":"Ordered","musicians":[{"id":54,"createdAt":"2023-01-26T19:01:37.938Z","updatedAt":"2023-01-26T19:03:13.288Z","recieved":true,"accepted":false,"musicianEmail":"Catalina_Hermann@yahoo.com","eventInstrumentId":365,"bookingOrAvailability":"Booking","musician":{"name":"Tyler Hoppe"},"calls":[{"id":59},{"id":60}]},{"id":55,"createdAt":"2023-01-26T19:01:37.964Z","updatedAt":"2023-01-26T19:03:34.791Z","recieved":true,"accepted":false,"musicianEmail":"Abigail_Torp@gmail.com","eventInstrumentId":365,"bookingOrAvailability":"Booking","musician":{"name":"Benjamin Zieme"},"calls":[{"id":59},{"id":60}]},{"id":56,"createdAt":"2023-01-26T19:01:37.970Z","updatedAt":"2023-01-26T19:03:58.504Z","recieved":true,"accepted":true,"musicianEmail":"Ida_Wilderman90@yahoo.com","eventInstrumentId":365,"bookingOrAvailability":"Booking","musician":{"name":"Kara Rau"},"calls":[{"id":59},{"id":60}]}]},
  "instrumentFixed":true,
  "callsOutId":365,
  "instrumentName":"Violin"
}

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
    const editCallsDiv = screen.getByTestId(`${mockData.instrumentName}-edit`)
    expect(editCallsDiv).toBeInTheDocument()
  })
  
})