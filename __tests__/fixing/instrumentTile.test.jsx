import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import InstrumentTile from "../../components/fixing/instrumentTile"

const mockProps = {
  "refreshProps": jest.fn(),
  "eventCalls":[
    {"id":60,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:00:34.880Z","startTime":"2023-01-26T10:00:00.000Z","endTime":"2023-01-26T13:00:00.000Z","venue":"Maida Vale","eventId":42,"fixerEmail":"danielmolloy_6@icloud.com"},{"id":59,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:00:34.880Z","startTime":"2023-01-26T14:00:00.000Z","endTime":"2023-01-26T17:00:00.000Z","venue":"Maida Vale","eventId":42,"fixerEmail":"danielmolloy_6@icloud.com"}
  ],
  "eventId":42,
  "instrumentSection":{
    "id":365,"createdAt":"2023-01-26T19:00:34.880Z","updatedAt":"2023-01-26T19:01:37.908Z","eventId":42,"instrumentName":"Violin","numToBook":1,"callOrder":"Ordered",
    "musicians":[{"id":54,"createdAt":"2023-01-26T19:01:37.938Z","updatedAt":"2023-01-26T19:03:13.288Z","recieved":true,"accepted":false,"musicianEmail":"Catalina_Hermann@yahoo.com","eventInstrumentId":365,"bookingOrAvailability":"Booking","musician":{"name":"Tyler Hoppe"},"calls":[{"id":59},{"id":60}
  ]},{"id":55,"createdAt":"2023-01-26T19:01:37.964Z","updatedAt":"2023-01-26T19:03:34.791Z","recieved":true,"accepted":false,"musicianEmail":"Abigail_Torp@gmail.com","eventInstrumentId":365,"bookingOrAvailability":"Booking","musician":{"name":"Benjamin Zieme"},"calls":[{"id":59},{"id":60}]},{"id":56,"createdAt":"2023-01-26T19:01:37.970Z","updatedAt":"2023-01-26T19:03:58.504Z","recieved":true,"accepted":true,"musicianEmail":"Ida_Wilderman90@yahoo.com","eventInstrumentId":365,"bookingOrAvailability":"Booking","musician":{"name":"Kara Rau"},"calls":[{"id":59},{"id":60}]}]},"instrumentalists":[{"id":"cl5jltcy10095t6u0v9e2qu91","name":"Kara Rau","email":"Ida_Wilderman90@yahoo.com","emailVerified":null,"image":null,"instrument":"Violin","profileInfo":null,"isFixer":null},{"id":"cl5jludze0231t6u0cfx5hcck","name":"Tyler Hoppe","email":"Catalina_Hermann@yahoo.com","emailVerified":null,"image":null,"instrument":"Violin","profileInfo":null,"isFixer":null},{"id":"cl5jlugru0245t6u0m5ovtl0v","name":"Benjamin Zieme","email":"Abigail_Torp@gmail.com","emailVerified":null,"image":null,"instrument":"Violin","profileInfo":null,"isFixer":null}]
  }

describe("InstrumentTile component", () => {
  beforeEach(() => {
    render(<InstrumentTile {...mockProps} />)
  })
  it("Renders", () => {
    const tileDiv = screen.getByTestId("instrument-tile")
    expect(tileDiv).toBeInTheDocument()
  })
  it("Availability & Booking tabs button exists", () => {
    const availabilityTab = screen.getByTestId("availability-tab-toggle")
    expect(availabilityTab).toBeInTheDocument()
    const bookingTab = screen.getByTestId("booking-tab-toggle")
    expect(bookingTab).toBeInTheDocument()
  })
  
})


