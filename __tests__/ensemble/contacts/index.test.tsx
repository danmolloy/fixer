import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import ContactsIndex, { ContactsIndexProps } from "../../../app/contacts/contactsList"
import { mockEnsembleContact } from "../../../__mocks__/models/ensembleContact"
import { mockEnsemble } from "../../../__mocks__/models/ensemble"
import { mockSection } from "../../../__mocks__/models/ensembleSection"


describe("<ContactsIndex />", () => {
  const mockProps: ContactsIndexProps = {
    contacts: [{...mockEnsembleContact, category: "Extra", section: mockSection}],
    sections: [{...mockSection, contacts: [{...mockEnsembleContact, category: "Extra"}]}],
    ensembleId: mockEnsemble.id,
    editContact: jest.fn(),
    sortContacts: "Alphabetical",
    filterContacts: ["Extra", "Member"]
  }
  beforeEach(() => {
    render(<ContactsIndex {...mockProps} />)
  })
  it("contacts-index is in the document", () => {
    const contactsIndex = screen.getByTestId("contacts-index")
    expect(contactsIndex).toBeInTheDocument()
  })
  it("all contacts are in the document", () => {
    const contactsIndex = screen.getByTestId("contacts-index")

    for (let i = 0; i < mockProps.contacts.length; i ++) {
      const contactName = `${mockProps.contacts[i].firstName} ${mockProps.contacts[i].lastName}`
      expect(contactsIndex.textContent).toMatch(contactName)
    }
  })

})

describe("<ContactsIndex />", () => {
  const mockProps: ContactsIndexProps = {
    contacts: [],
    sections: [{...mockSection, contacts: [mockEnsembleContact]}],
    ensembleId: mockEnsemble.id,
    editContact: jest.fn(),
    sortContacts: "Alphabetical",
    filterContacts: ["Extra", "Member"]
  }
  beforeEach(() => {
    render(<ContactsIndex {...mockProps} />)
  })
  it("helpful message if there are no contacts", () => {
    const contactsIndex = screen.getByTestId("contacts-index")
    expect(contactsIndex.textContent).toMatch("No contacts")
  })
})