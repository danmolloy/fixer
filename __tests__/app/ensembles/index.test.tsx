import EnsembleIndex, { EnsembleIndexProps } from "../../../app/ensembles";
import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockSection } from "../../../__mocks__/models/ensembleSection";
import { mockEnsembleContact } from "../../../__mocks__/models/ensembleContact";
import { mockEnsemble } from "../../../__mocks__/models/ensemble";
import { mockEnsembleAdmin } from "../../../__mocks__/models/ensembleAdmin";
import { mockUser } from "../../../__mocks__/models/user";

const mockProps: EnsembleIndexProps = {
  sections: [{
    ...mockSection, 
    contacts: [mockEnsembleContact]
  }],
  ensemble: mockEnsemble,
  contacts: [{
    ...mockEnsembleContact,
    id: '1',
    firstName: "Greg",
    lastName: "Ievers",
    category: "Member",
    section: mockSection
  },
  {
    ...mockEnsembleContact,
    id: '2',
    firstName: "Elliot",
    lastName: "Gannon",
    category: "Extra",
    section: mockSection
  }],
  admins: [{
    ...mockEnsembleAdmin,
    user: mockUser
  }]
}

describe("<EnsembleIndex />", () => {
  beforeEach(() => {
    render(<EnsembleIndex {...mockProps}/>)
  })
  it("ensemble-index is in the document", () => {
    const ensembleIndex = screen.getByTestId("ensemble-index")
    expect(ensembleIndex).toBeInTheDocument()
  })
  it("ensemble name is in the document", () => {
    const ensembleName = screen.getByText(mockProps.ensemble.name)
    expect(ensembleName).toBeInTheDocument()
  })
  it("<EnsembleDashboard /> is in the document", () => {
    const ensembleDash = screen.getByTestId("ensemble-dashboard")
    expect(ensembleDash).toBeInTheDocument()
  })
  it("Member filter filters contacts list", async () => {
    const memFilter = screen.getByTestId("member-filter")
    const contactsList = screen.getByTestId("contacts-index")
    await act(async () => {
      fireEvent.click(memFilter)
    })
    for (let i = 0; i < mockProps.contacts.length; i ++) {
      if (mockProps.contacts[i].category === "Member") {
        expect(contactsList.textContent).not.toMatch(`${mockProps.contacts[i].firstName} ${mockProps.contacts[i].lastName}`)
      } else {
        expect(contactsList.textContent).toMatch(`${mockProps.contacts[i].firstName} ${mockProps.contacts[i].lastName}`)
      }
    }
  })
  it("Extra filter filters contacts list", async() => {
    const memFilter = screen.getByTestId("extra-filter")
    const contactsList = screen.getByTestId("contacts-index")
    await act(async () => {
      fireEvent.click(memFilter)
    })
    for (let i = 0; i < mockProps.contacts.length; i ++) {
      if (mockProps.contacts[i].category === "Extra") {
        expect(contactsList.textContent).not.toMatch(`${mockProps.contacts[i].firstName} ${mockProps.contacts[i].lastName}`)
      } else {
        expect(contactsList.textContent).toMatch(`${mockProps.contacts[i].firstName} ${mockProps.contacts[i].lastName}`)
      }
    }
  })
  it("Alphabetical sort select sorts contact list", () => {
    const alphabeticalSort = screen.getByTestId("alphabetical-sort")
    act(() => {
      fireEvent.change(alphabeticalSort)
    })
    const alphabeticalList = screen.getByTestId("alphabetical-list")
    expect(alphabeticalList).toBeInTheDocument()
    for (let i = 0; i < mockProps.contacts.length; i++) {
      expect(alphabeticalList.textContent).toMatch(`${mockProps.contacts[i].firstName} ${mockProps.contacts[i].lastName}`)
    }
    
  })
  it("Section sort select sorts contact list", async () => {
    const sectionsSort = screen.getByTestId("sections-sort")
    await act(async () => {
      fireEvent.click(sectionsSort)
    })
    for (let i = 0; i < mockProps.sections.length; i ++) {
      const section = screen.getByTestId(`${mockProps.sections[i].id}-section`)
      expect(section).toBeInTheDocument()
    }
  })
  it("<EnsembleManagement /> is in the document with all admins listed", () => {
    const ensembleManagement = screen.getByTestId("ensemble-management")
    expect(ensembleManagement).toBeInTheDocument()
  })
  it("<ContactsIndex /> is in the document with all contacts", () => {
    const contactsIndex = screen.getByTestId("contacts-index")
    expect(contactsIndex).toBeInTheDocument()
    for (let i = 0; i < mockProps.contacts.length; i ++) {
      expect(contactsIndex.textContent).toMatch(`${mockProps.contacts[i].firstName} ${mockProps.contacts[i].lastName}`)
    }
  })
})