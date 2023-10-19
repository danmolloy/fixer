import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { mockEventInstrumentWithMAndM } from "../../../../__mocks__/models/eventInstrument"
import { mockUser } from "../../../../__mocks__/models/user"
import { mockCall } from "../../../../__mocks__/models/call"
import EditInstrument, { EditInstrumentProps } from "../../../../components/fixing/instrument/edit"

const mockProps: EditInstrumentProps = {
  eventInstrument: mockEventInstrumentWithMAndM,
  bookingOrAvailability: "Booking",
  handleSubmit: jest.fn(),
  directoryMusicians: [mockUser],
  allEventCalls: [mockCall]
}

describe("<EditInstrument />", () => {
  beforeEach(() => {
    render(<EditInstrument {...mockProps} />)
  })
  it("edit-instrument is in the document", () => {
    const editInstrument = screen.getByTestId("edit-instrument-form")
    expect(editInstrument).toBeInTheDocument()
  })
  it("edit-options is in the document", () => {
    const editOptions = screen.getByTestId("edit-calls-options")
    expect(editOptions).toBeInTheDocument()
  })
  it("submit btn is in the document", () => {
    const submitBtn = screen.getByTestId("fix-btn")
    expect(submitBtn).toBeInTheDocument()
  })
  //it("submit btn calls handleSubmit with expected args onClick", () => {})
  
  //it("appended-players is in the document", () => {})
})
