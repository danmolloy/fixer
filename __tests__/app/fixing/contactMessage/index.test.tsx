import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import EventSectionContacts, { EventSectionContactsProps } from "../../../../app/fixing/contactMessage"
import { mockEnsembleContact } from "../../../../__mocks__/models/ensembleContact"
import { mockCall } from "../../../../__mocks__/models/call"
import { mockContactMessage } from "../../../../__mocks__/models/contactMessage"

const mockProps: EventSectionContactsProps = {
  eventSectionId: 1,
  sectionContacts: [mockEnsembleContact],
  eventCalls: [mockCall],
  currentContacts: [{
    ...mockContactMessage,
    contact: mockEnsembleContact,
    calls: [mockCall]
  }]
};

describe("<EventSectionContacts />", () => {
  beforeEach(() => {
    render(<EventSectionContacts {...mockProps} />)
  })
  it("<EventSectionContacts /> renders", () => {
    const eventSectionContacts = screen.getByTestId("event-section-contacts")
    expect(eventSectionContacts).toBeInTheDocument()
  })
  it("booking/availability select menu is in the document with options", () => {
    const statusSelect = screen.getByTestId("status-select")
    expect(statusSelect).toBeInTheDocument()
    expect(statusSelect).toHaveRole("combobox")
    expect(statusSelect).toHaveValue("Booking")

    expect(statusSelect).toHaveTextContent("Booking")
    expect(statusSelect).toHaveTextContent("Availability")

    const bookingOption = screen.getByText("Booking")
    expect(bookingOption).toBeInTheDocument()
    expect(bookingOption).toHaveRole("option")
    expect(bookingOption).toHaveValue("Booking")

    const availabilityOption = screen.getByText("Availability")
    expect(availabilityOption).toBeInTheDocument()
    expect(availabilityOption).toHaveRole("option")
    expect(availabilityOption).toHaveValue("Availability")

  })
  
  it("Edit btn is in the document and renders <ContactMessageForm /> on click", () => {
    const editBtn = screen.getByText("Edit Contacts")
    expect(editBtn).toBeInTheDocument()
    expect(editBtn).toHaveRole("button")
    act(() => {
      fireEvent.click(editBtn)
    })
    const form = screen.getByTestId("contact-message-form")
    expect(form).toBeInTheDocument()
    
  })
  
  it("statusSelect is disabled on Edit btn click", () => {
    const editBtn = screen.getByText("Edit Contacts")
    expect(editBtn).toBeInTheDocument()
    expect(editBtn).toHaveRole("button")
    act(() => {
      fireEvent.click(editBtn)
    })
    const statusSelect = screen.getByTestId("status-select")
    expect(statusSelect).toHaveAttribute("disabled")
  })
})