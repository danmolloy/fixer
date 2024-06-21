import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import ContactCard, { ContactCardProps } from "../../../app/contacts/contactCard"
import { mockEnsembleContact } from "../../../__mocks__/models/ensembleContact"
import { mockSection } from "../../../__mocks__/models/ensembleSection"

const mockProps: ContactCardProps = {
  contact: {
    ...mockEnsembleContact,
    section: mockSection
  },
  editContact: jest.fn()
}

describe("<ContactCard />", () => {
  beforeEach(() => {
    render(<ContactCard {...mockProps} />)
  })
  it("contact-card is in the document", () => {
    const contactCard = screen.getByTestId("contact-card")
    expect(contactCard).toBeInTheDocument()
  })
  it("contact name, role, category, section, phone and email are in the document", () => {
    const contactCard = screen.getByTestId("contact-card")
    expect(contactCard.textContent).toMatch(`${mockProps.contact.firstName} ${mockProps.contact.lastName}`)
    expect(contactCard.textContent).toMatch(mockProps.contact.role)
    expect(contactCard.textContent).toMatch(mockProps.contact.section.name)
    expect(contactCard.textContent).toMatch(mockProps.contact.category)
    expect(contactCard.textContent).toMatch(mockProps.contact.phoneNumber)
    expect(contactCard.textContent).toMatch(mockProps.contact.email)
  })
  it("options btn is in the document and renders/hides menu onClick", () => {
    const optionsBtn = screen.getByText("Contact Options")
    expect(optionsBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const menu = screen.getByTestId("contact-options")
    expect(menu).toBeInTheDocument()
    act(() => {
      fireEvent.click(optionsBtn)
    })
    expect(menu).not.toBeInTheDocument()

  })
})