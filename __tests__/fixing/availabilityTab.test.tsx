import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import AvailabilityTab, { AvailabilityTabProps } from '../../components/fixing/availabilityTab'
import { mockEventInstrumentWithMAndM } from "../../__mocks__/models/eventInstrument"
import { mockUser } from "../../__mocks__/models/user"
import { mockCall } from "../../__mocks__/models/call"

const editList = Math.random() > .5 ? true : false

const mockData: AvailabilityTabProps = {
  setSelectedTab: jest.fn(),
  editList: editList,
  setEditList: jest.fn(),
  instrumentalistsList: [mockUser],
  refreshProps: jest.fn(),
  handleSubmit: jest.fn(), 
  instrumentFixed: Math.random() > .5 ? true : false,
  eventId: mockEventInstrumentWithMAndM.eventId, 
  eventCalls: [mockCall],
  instrumentSection: mockEventInstrumentWithMAndM,
}

describe("AvailabilityTab component", () => {
  beforeEach(() => {
    render(<AvailabilityTab {...mockData}/>)
  })
  it("Renders", () => {
    const tabDiv = screen.getByTestId("availability-tab")
    expect(tabDiv).toBeInTheDocument()
  })
  it("if editList is false, Edit button is in the document with text content 'Edit'", async () => {
    if(editList === false) {
      const editBtn = screen.getByTestId(`availability-edit-btn`)
      expect(editBtn).toBeInTheDocument()
      expect(editBtn.textContent).toMatch("Edit")
    }
  })
  //it("if editList is false, calls setEditList(true) on click", async () => {})
  it("if editList is true, Close button in the document with text content 'Close'", () => {
    if(editList === true) {
      const editBtn = screen.getByTestId(`availability-edit-btn`)
      expect(editBtn).toBeInTheDocument()
      expect(editBtn.textContent).toMatch("Close")
      act(() => {
        fireEvent.click(editBtn)
      })
      expect(mockData.setEditList).toBeCalledWith(false)
    }
  })
  //it("if editList is true, Close button in the document and calls setEditList(false) on click", () => {})
  it("AvailabilityTable is in the document if calls are out", () => {
    const availabilityCalls = mockEventInstrumentWithMAndM.musicians.filter(i => i.bookingOrAvailability === "Availability")
    const tabDiv = screen.getByTestId("availability-tab")
    if (availabilityCalls.length > 0) {
      const availabilityTable = screen.getByTestId("availability-table-div")
      expect(availabilityTable).toBeInTheDocument()
      expect(tabDiv.textContent).not.toMatch(/No availability checks have been made./)
    } else {
      const tabDiv = screen.getByTestId("availability-tab")
      expect(tabDiv.textContent).toMatch(/No availability checks have been made./)
    }
  })
  it("if editList is true, EditCalls is in the document", () => {
    if (editList === true) {
      const editCalls = screen.getByTestId(`edit-calls-div`)
      expect(editCalls).toBeInTheDocument()
    }
  })
})