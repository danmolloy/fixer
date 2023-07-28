import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import BookingTab, { BookingTabProps } from '../../components/fixing/bookingTab'
import { mockUser } from "../../__mocks__/models/user"
import { mockEventInstrumentWithMAndM } from "../../__mocks__/models/eventInstrument"
import { mockCall } from "../../__mocks__/models/call"

const mockData: BookingTabProps = {
  editList: false,
  setEditList: jest.fn(),
  instrumentalistsList: [mockUser],
  instrumentalists: [mockUser],
  refreshProps: jest.fn(),
  handleSubmit: jest.fn(),
  instrumentFixed: false,
  eventId: mockCall.eventId,
  eventCalls: [mockCall],
  instrumentSection: mockEventInstrumentWithMAndM
}

describe("BookingTab component", () => {
  beforeEach(() => {
    render(<BookingTab {...mockData} />)
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