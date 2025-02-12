import "@testing-library/jest-dom"
import { render, screen, act, fireEvent } from "@testing-library/react"
import ContactMessageForm, { ContactMessageFormProps } from "../../../../../app/fixing/contactMessage/form"
import { mockCall } from "../../../../../__mocks__/models/call"
import { mockContactMessage } from "../../../../../__mocks__/models/contactMessage"
import { mockEnsembleContact } from "../../../../../__mocks__/models/ensembleContact"

const mockProps: ContactMessageFormProps = {
  cancelForm: jest.fn(),
  eventCalls: [mockCall],
  eventContacts: [{
    ...mockContactMessage,
    contact: mockEnsembleContact,
    calls: [1, 2, 3],
    contactMessageId: mockContactMessage.id
  }],
  eventSectionId: 23,
  type: "AVAILABILITY",
  sectionContacts: [mockEnsembleContact],
  currentContacts: [mockContactMessage]
}

describe("<ContactMessageForm />", () => {
  beforeEach(() => {
    render(<ContactMessageForm {...mockProps} />)
  })
  it("<ContactMessageForm /> renders without crashing", () => {
    const contactForm = screen.getByTestId("contact-message-form");
    expect(contactForm).toBeInTheDocument();
  });
  it("<AppendedContacts /> is in the document if contacts.length > 0", () => {
    const appendedContacts = screen.getByTestId("appended-contacts-index")
    expect(appendedContacts).toBeInTheDocument();
    for (let i = 0; i < mockProps.eventContacts.length; i++) {
      const contactName = `${mockProps.eventContacts[i].contact.firstName} ${mockProps.eventContacts[i].contact.lastName}`
      expect(appendedContacts.textContent).toMatch(contactName);
    }
  })
  it("Strictly Tied radio is in the document if type === 'Availability'", () => {
    const strictlyTied = screen.getByLabelText("Strictly Tied")
    expect(strictlyTied).toBeInTheDocument();
    expect(strictlyTied).toHaveAttribute("value", "true");
    expect(strictlyTied).toHaveAttribute("type", "radio");
    expect(strictlyTied).toHaveAttribute("name", "strictlyTied")
  })
  it("Not Tied radio is in the document if type === 'Availability'", () => {
    const notTied = screen.getByLabelText("Not Tied")
    expect(notTied).toBeInTheDocument();
    expect(notTied).toHaveAttribute("value", "false");
    expect(notTied).toHaveAttribute("type", "radio");
    expect(notTied).toHaveAttribute("name", "strictlyTied")
  })
  it("Urgent checkbox is in the document with label, name and type", () => {
    const urgentCheckbox = screen.getByLabelText("Mark as urgent")
    expect(urgentCheckbox).toBeInTheDocument();
    expect(urgentCheckbox).toHaveAttribute("name", "urgent");
    expect(urgentCheckbox).toHaveAttribute("type", "checkbox");

  })
  it("cancel btn is in the document and calls cancelForm() on click", () => {
    const cancelBtn = screen.getByText("Cancel");
    expect(cancelBtn).toBeInTheDocument();
    act(() => {
      fireEvent.click(cancelBtn)
    })
    expect(mockProps.cancelForm).toHaveBeenCalled()

  })
  //it("Submit btn is in the document and calls axios.post on click", () => {})
  //it("Diary contacts is in the document with header and help text", () => {})
  //it("err messages render on unsuccessful submission", () => {})

})