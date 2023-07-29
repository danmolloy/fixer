import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import EditCalls, { EditCallsProps } from "../../../components/fixing/editCalls/editCalls"
import { mockEvent } from "../../../__mocks__/models/event"
import { mockEventInstrument } from "../../../__mocks__/models/eventInstrument"
import { mockUser } from "../../../__mocks__/models/user"
import { mockCall } from "../../../__mocks__/models/call"

const mockProps: EditCallsProps = {
  eventId: mockEventInstrument.eventId,
  handleSubmit: jest.fn(),
  instrumentName: mockEventInstrument.instrumentName,
  instrumentalists: [mockUser],
  eventCalls: [mockCall],
  eventInstrumentId: mockEventInstrument.id,
  bookingOrAvailability: Math.random() > .5 ? "Booking": "Availability",
  contactedPlayers: []
}

describe("EditCalls component", () => {
  beforeEach(() => {
    render(<EditCalls {...mockProps}/>)
  })
  it("Renders", () => {
    const editCallsDiv = screen.getByTestId(`edit-calls-div`)
    expect(editCallsDiv).toBeInTheDocument()
  })
  it("AppendPlayers component is in the document", () => {
    const appendedPlayers = screen.getByTestId("appended-players-div")
    expect(appendedPlayers).toBeInTheDocument()
  })
  it("AvailablePlayers component is in the document", () => {
    const availablePlayers = screen.getByTestId("available-players-div")
    expect(availablePlayers).toBeInTheDocument()
  })
  it("EditCallsOptions component is in the document", () => {
    const options = screen.getByTestId("edit-calls-options")
    expect(options).toBeInTheDocument()
  })
  it("Fix button is in the document", () => {
    const fixBtn = screen.getByTestId("fix-btn")
    expect(fixBtn).toBeInTheDocument()
  })
  it("Fix button calls handleSubmit with expected args when no players appended", async() => {})
  /* it("Fix button calls handleSubmit with expected appendedPlayer", async() => {
    const fixBtn = screen.getByTestId("fix-btn")

    const randIndex = Math.floor(Math.random() * mockProps.instrumentalists.length)
    const randPlayer = screen.getByText(mockProps.instrumentalists[randIndex].name)
    expect(randPlayer).toBeInTheDocument()
    await act(async() => {
      await waitFor(() => {
        fireEvent.click(randPlayer)
      })
    })
  await act(async() => {
    await waitFor(() => {
      fireEvent.click(fixBtn)
    })
  })
  expect(mockProps.handleSubmit).toHaveBeenCalledWith({
    callOrder: "Ordered",
    musicians: [],
    eventId: mockProps.eventId,
    eventInstrumentId: String(mockProps.eventId),
    numToBook: 1, 
    bookingOrAvailability: mockProps.bookingOrAvailability, 
    messageToAll: "",
    fixerNote: "", 
    bookingStatus: ""
  })
  })
  it("Pause Fixing button is in the document", () => {
    const pauseBtn = screen.getByTestId("pause-btn")
    expect(pauseBtn).toBeInTheDocument()
    expect(pauseBtn.textContent).toMatch("Pause fixing")
  })
})

describe("Fix button/Submit form", () => {
    it("Fix button calls handleSubmit with expected options", async() => {})
 */
})