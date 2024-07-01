import "@testing-library/jest-dom";
import { render, screen, act, fireEvent } from "@testing-library/react";
import ContactsIndex, { ContactsIndexProps } from "../../../app/contacts/contactsList";
import { mockEnsembleContact } from "../../../__mocks__/models/ensembleContact";
import { mockSection } from "../../../__mocks__/models/ensembleSection";
import { mockEnsemble } from "../../../__mocks__/models/ensemble";

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
    contacts: [{...mockEnsembleContact, category: "Extra", section: mockSection}],
    sections: [{...mockSection, contacts: [{...mockEnsembleContact, category: "Extra"}]}],
    ensembleId: mockEnsemble.id,
    editContact: jest.fn(),
    sortContacts: "Sections",
    filterContacts: ["Extra", "Member"]
  }
  beforeEach(() => {
    render(<ContactsIndex {...mockProps} />)
  })

  it("all sections are in the document with relevant contacts", () => {

    for (let i = 0; i < mockProps.sections.length; i ++) {
      const section = screen.getByTestId(`${mockProps.sections[i].id}-section`)
      expect(section).toBeInTheDocument()
      for (let j = 0; j < mockProps.sections[i].contacts.length; j ++) {
        expect(section.textContent).toMatch(`${mockProps.sections[i].contacts[j].firstName} ${mockProps.sections[i].contacts[j].lastName}`)
      }
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