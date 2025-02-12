import "@testing-library/jest-dom"
import { render, screen, fireEvent, act } from "@testing-library/react"
import DiaryContacts, { DiaryContactsProps } from "../../../../../app/fixing/contactMessage/form/diaryContacts"
import { mockEnsembleContact } from "../../../../../__mocks__/models/ensembleContact"
import { mockCall } from "../../../../../__mocks__/models/call"
import { mockContactMessage } from "../../../../../__mocks__/models/contactMessage"
import { Formik } from "formik"

const mockSetSortContacts = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial: any) => [initial, mockSetSortContacts]
}));

const mockProps: DiaryContactsProps = {
  sectionContacts: [
    mockEnsembleContact,
    {
    ...mockEnsembleContact,
    id: "mockStringID",
    firstName: "Fiona",
    lastName: "Kelly",
    status: "ARCHIVED"
  }],
  eventCalls: [mockCall],
  currentContacts: [mockContactMessage],
  appendedContacts: [{
    contactId: mockEnsembleContact.id,
    contactMessageId: mockContactMessage.id,
    position: "Tutti-Fruity",
    name: "Nicholas Bayley",
    playerMessage: "Hi Nicholas",
    calls: [mockCall.id]
  }]
}

describe("<DiaryContacts />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <DiaryContacts {...mockProps} />
      </Formik>)
  })
  it("renders without crashing", () => {
    const diaryContacts = screen.getByTestId("diary-contacts")
    expect(diaryContacts).toBeInTheDocument();
  });
  it("diaryContacts table is in the document ", () => {
    const contactsTable = screen.getByTestId("diary-contacts-table")
    expect(contactsTable).toBeInTheDocument();
  })
  it("There is an empty <th/> element", () => {
    expect(screen.getByTestId('empty-th')).toBeInTheDocument();
  })
  it("all sectionContacts who aren't archived are in the document", () => {
    for (let i = 0; i < mockProps.sectionContacts.length; i ++) {
      const diaryContacts = screen.getByTestId("diary-contacts")

      if (mockProps.sectionContacts[i].status === "ARCHIVED") {
        expect(diaryContacts.textContent).not.toMatch(`${mockProps.sectionContacts[i].firstName} ${mockProps.sectionContacts[i].lastName}`)
      } else {
        expect(diaryContacts.textContent).toMatch(`${mockProps.sectionContacts[i].firstName} ${mockProps.sectionContacts[i].lastName}`)
      }
    }
  })
  it("Name <th /> calls setSortContacts on click", () => {
    const nameHeader = screen.getByText("Name");
    expect(nameHeader).toBeInTheDocument();
    act(() => {
      fireEvent.click(nameHeader)
    })
    expect(mockSetSortContacts).toHaveBeenCalledWith('alphabetical');
  })
  it("Role <th /> calls setSortContacts on click", () => {
    const roleHeader = screen.getByText("Role");
    expect(roleHeader).toBeInTheDocument();
    act(() => {
      fireEvent.click(roleHeader)
    })
    expect(mockSetSortContacts).toHaveBeenCalledWith('role');
  })
  it("Category <th /> calls setSortContacts on click", () => {
    const categoryHeader = screen.getByText("Category");
    expect(categoryHeader).toBeInTheDocument();
    act(() => {
      fireEvent.click(categoryHeader)
    })
    expect(mockSetSortContacts).toHaveBeenCalledWith('category');
  })
})

describe("<DiaryContacts />", () => {
  let localProps: DiaryContactsProps = {
    ...mockProps,
    sectionContacts: []
  }
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <DiaryContacts 
        {...localProps} />
      </Formik>)
  })
  it("if !sectionContacts, there is a help message", () => {
    const helpMsg = screen.getByTestId("help-message");
    expect(helpMsg).toBeInTheDocument();
    expect(helpMsg.textContent).toMatch("No diary contacts.");
    expect(helpMsg.textContent).toMatch("Remove your filters, or add new contacts to you Address Book.");

  })
})