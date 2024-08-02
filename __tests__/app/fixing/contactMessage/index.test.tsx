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
  it("Booking radio option is in the document with expected label, type, value, checked status & not disabled", () => {
    const bookingRadio = screen.getByLabelText("Booking")
    expect(bookingRadio).toBeInTheDocument()
    expect(bookingRadio).toHaveAttribute("type", "radio")
    expect(bookingRadio).toHaveAttribute("value", "Booking")
    expect(bookingRadio).toBeChecked()
    expect(bookingRadio).not.toHaveAttribute("disabled")
    act(() => {
      fireEvent.click(bookingRadio)
    })
    expect(bookingRadio).toBeChecked()

  })
  it("Availability radio option is in the document with expected label, type, value, checked status & not disabled", () => {
    const availabilityRadio = screen.getByLabelText("Availability")
    expect(availabilityRadio).toBeInTheDocument()
    expect(availabilityRadio).toHaveAttribute("type", "radio")
    expect(availabilityRadio).toHaveAttribute("value", "Availability")
    expect(availabilityRadio).not.toBeChecked()
    expect(availabilityRadio).not.toHaveAttribute("disabled")

    act(() => {
      fireEvent.click(availabilityRadio)
    })
    expect(availabilityRadio).toBeChecked()

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
    act(() => {
      fireEvent.click(editBtn)
    })
    expect(form).not.toBeInTheDocument()
  })
  it("booking & availability radio btns are disabled on Edit btn click", () => {
    const editBtn = screen.getByText("Edit Contacts")
    expect(editBtn).toBeInTheDocument()
    expect(editBtn).toHaveRole("button")
    act(() => {
      fireEvent.click(editBtn)
    })
    const availabilityRadio = screen.getByLabelText("Availability")
    expect(availabilityRadio).toHaveAttribute("disabled")
    const bookingRadio = screen.getByLabelText("Booking")
    expect(bookingRadio).toHaveAttribute("disabled")

  })
})