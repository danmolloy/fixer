import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import EnsembleIndex, { EnsembleIndexProps } from "../../app/ensembles"
import { mockSection } from "../../__mocks__/models/ensembleSection"
import { mockEnsemble } from "../../__mocks__/models/ensemble"
import { mockEnsembleContact } from "../../__mocks__/models/ensembleContact"

const mockProps: EnsembleIndexProps = {
  contacts: [{
    ...mockEnsembleContact, 
    section: mockSection
  }],
  sections: [{...mockSection, contacts: [mockEnsembleContact]}],
  ensemble: mockEnsemble
}

describe("<EnsembleIndex />", () => {
  beforeEach(() => {
    render(<EnsembleIndex {...mockProps} />)
  })
  it("ensemble-index is in the document", () => {
    const ensembleIndex = screen.getByTestId("ensemble-index")
    expect(ensembleIndex).toBeInTheDocument()
  })
  it("ensemble name is in the document", () => {
    const ensembleName = screen.getByText(mockProps.ensemble.name)
    expect(ensembleName).toBeInTheDocument()
  })
  it("create contact form renders on Add Contact btn click", () => {
    const addContact = screen.getByText("Add Contact")
    act(() => {
      fireEvent.click(addContact)
    })
    const contactForm = screen.getByTestId("create-contact-form")
    expect(contactForm).toBeInTheDocument()
  })
  it("ensemble-dashboard is in the document", () => {
    const ensembleDashboard = screen.getByTestId("ensemble-dashboard")
    expect(ensembleDashboard).toBeInTheDocument()
  })
  it("ensemble-management is in the document", () => {
    const ensembleManagement = screen.getByTestId("ensemble-management")
    expect(ensembleManagement).toBeInTheDocument()
  })
  it("<ContactsIndex /> is in the document", () => {
    const contactsIndex = screen.getByTestId("contacts-index")
    expect(contactsIndex).toBeInTheDocument()
  })
  it("add contact button which renders add contact form", () => {
    const addContactBtn = screen.getByText("Add Contact")
    expect(addContactBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(addContactBtn)
    })
    const createContactForm = screen.getByTestId("create-contact-form")
    expect(createContactForm).toBeInTheDocument()
  })
})