import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import UpdateHeader, { UpdateHeaderProps } from "../../../../components/fixing/instrument/update/updateHeader"
import { mockEventSection } from "../../../../__mocks__/models/eventSection"
import { mockSection } from "../../../../__mocks__/models/ensembleSection"
import { mockPlayerCall } from "../../../../__mocks__/models/playerCall"

const mockProps: UpdateHeaderProps = {
  eventSection: mockEventSection,
  sectionName: mockSection.name,
  playerCalls: [mockPlayerCall],
  setShowEdit: jest.fn(),
  showEdit: false
}

describe("<UpdateHeader />", () => {
  beforeEach(() => {
    render(<UpdateHeader {...mockProps} />)
  })
  it("update-header is in the document", () => {
    const updateHeader = screen.getByTestId("update-header")
    expect(updateHeader).toBeInTheDocument()
  })
  it("section name is in the document", () => {
    const sectionName = screen.getByText(mockProps.sectionName)
    expect(sectionName).toBeInTheDocument()
  })
  it("edit button is in the document", () => {
    const editBtn = screen.getByTestId(`${mockProps.sectionName}-edit-btn`)
    expect(editBtn).toBeInTheDocument()
    expect(editBtn.textContent).toMatch(/^Edit$/)
  })
  it("edit button calls setEdit on click with boolean", () => {
    const editBtn = screen.getByTestId(`${mockProps.sectionName}-edit-btn`)
    act(() => {
      fireEvent.click(editBtn)
    })
    expect(mockProps.setShowEdit).toBeCalledWith(true)
  })
  it("states booking progress, i.e. '0 of 1 booked'", () => {
    const bookingStatus = screen.getByTestId("booking-status")
    expect(bookingStatus).toBeInTheDocument()
    const numBooked = mockProps.playerCalls.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length
    expect(bookingStatus.textContent).toMatch(`${numBooked} of ${mockProps.eventSection.numToBook} booked`)
  })
})

describe("<UpdateHeader />", () => {
  beforeEach(() => {
    const mockProps: UpdateHeaderProps = {
      eventSection: mockEventSection,
      sectionName: mockSection.name,
      playerCalls: [{
        ...mockPlayerCall, 
        status: "DEP OUT", 
        bookingOrAvailability: "Booking", 
        accepted: true
      }],
      setShowEdit: jest.fn(),
      showEdit: false
    }
    render(<UpdateHeader {...mockProps} />)
  })

  it('if players looking to dep, it states how many', () => {
    const bookingStatus = screen.getByTestId("booking-status")
    expect(bookingStatus.textContent).toMatch("1 looking for dep")
  })
})

describe("<UpdateHeader />", () => {
  beforeEach(() => {
    const mockProps: UpdateHeaderProps = {
      eventSection: mockEventSection,
      sectionName: mockSection.name,
      playerCalls: [{
        ...mockPlayerCall, 
        status: "OK", 
        bookingOrAvailability: "Availability", 
        accepted: true
      }],
      setShowEdit: jest.fn(),
      showEdit: false
    }
    render(<UpdateHeader {...mockProps} />)
  })

  it('states how many players are available', () => {
    const bookingStatus = screen.getByTestId("booking-status")
    expect(bookingStatus.textContent).toMatch("1 available")
  })
})