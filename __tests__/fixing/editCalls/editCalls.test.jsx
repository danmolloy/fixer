import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import EditCalls from "../../../components/fixing/editCalls/editCalls"

const mockInstrument = "Cello"

const mockPlayers =  [{
  id: "1",
  name: "mockPlayer1",
  email: "mockEmail1",
  emailVerified: null,
  instrument: mockInstrument,
  profileInfo: null,
  isFixer: false,
}]


const mockProps = {
  handleSubmit: jest.fn(),
  instrumentName: mockInstrument,
  instrumentalists: mockPlayers
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
  it("Fix button calls handleSubmit with expected args when no players appended", async() => {
    const fixBtn = screen.getByTestId("fix-btn")
    await act(async() => {
      await waitFor(() => {
        fireEvent.click(fixBtn)
      })
    })
    expect(mockProps.handleSubmit).toHaveBeenCalledWith({
      appendedPlayers: [],
      availablePlayers: mockPlayers,
      callOrder: "Ordered",
      checkBook: "book",
      numToBook: 1
    })
  })
  it("Fix button calls handleSubmit with expected appendedPlayer", async() => {
    const fixBtn = screen.getByTestId("fix-btn")

    const randIndex = Math.floor(Math.random() * mockPlayers.length)
    const randPlayer = screen.getByText(mockPlayers[randIndex].name)
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
    appendedPlayers: mockPlayers,
    availablePlayers: [],
    callOrder: "Ordered",
    checkBook: "book",
    numToBook: 1
  })
  })
  //it("Fix button calls handleSubmit with expected options", async() => {})
})