import "@testing-library/jest-dom"
import { render, screen, act, fireEvent } from "@testing-library/react"
import AppendedContacts, {AppendedContactsProps} from "../../../../../../app/fixing/contactMessage/form/appendedContacts"
import { mockCall } from "../../../../../../__mocks__/models/call"
import { mockContactMessage } from "../../../../../../__mocks__/models/contactMessage"
import { mockEnsembleContact } from "../../../../../../__mocks__/models/ensembleContact"
import { Formik } from "formik"
import { DateTime } from "luxon"

const mockProps: AppendedContactsProps = {
contacts: [{
  contactId: mockEnsembleContact.id,
  contactMessageId: mockContactMessage.id,
  name: `${mockEnsembleContact.firstName} ${mockEnsembleContact.lastName}`,
  playerMessage: "Hello, world.",
  calls: [mockCall.id],
  autoAccepted: false
}],
  eventCalls: [mockCall],
  type: 'BOOKING',
  addPlayerMessage: jest.fn(),
  currentCallCount: Math.ceil(Math.random() * 20)
}

describe("<AppendedContacts />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <AppendedContacts {...mockProps} />
      </Formik>)
  })
  it("renders without crashing", () => {
    const appendedContacts = screen.getByTestId("appended-contacts-index");
    expect(appendedContacts).toBeInTheDocument();
  })
  it("if type !== AVAILABILITY, there is a queue number", () => {
    const queueNum = screen.getByText("Queue Number");
    expect(queueNum).toBeInTheDocument();
  })
  it("if type !== AVAILABILITY, there is Auto Accept column", () => {
    const autoAccept = screen.getByText("Auto Accept");
    expect(autoAccept).toBeInTheDocument();
  })
  it("Name column is in the document", () => {
    expect(screen.getByText("Name")).toBeInTheDocument();
  })
  it("Position column is in the document", () => {
    expect(screen.getByText("Position")).toBeInTheDocument();
  })
  it("Options column is in the document", () => {
    expect(screen.getByTestId("options-th")).toBeInTheDocument();
  })
  it("all event calls have a column with formatted date label", () => {
    for (let i = 0; i < mockProps.eventCalls.length; i ++) {
      const callCol = screen.getByTestId(`${mockProps.eventCalls[i].id}-call`)
      expect(callCol.textContent).toMatch(DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).toFormat("HH:mm"));
      expect(callCol.textContent).toMatch(DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).toFormat("DD"));
    }
  })
  it("all contacts are in the document", () => {
    const appendedContacts = screen.getByTestId("appended-contacts-index");
    mockProps.contacts.forEach(i => {
      expect(appendedContacts.textContent).toMatch(i.name);
    })
  })
})

describe("<AppendedContacts />", () => {
  let localMockProps: AppendedContactsProps = {
    ...mockProps,
    type: "AVAILABILITY",
    contacts: []
  }

  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <AppendedContacts {...localMockProps} />
      </Formik>)
  })

  it("if type === AVAILABILITY, there is no queue number", () => {
    const appendedContacts = screen.getByTestId("appended-contacts-index");
    expect(appendedContacts.textContent).not.toMatch("Queue Number");
  })
  it("if type === AVAILABILITY, there not is Auto Accept column", () => {
    const appendedContacts = screen.getByTestId("appended-contacts-index");
    expect(appendedContacts.textContent).not.toMatch("Auto Accept");
  })
  
  it("if !contacts, there is a help message", () => {
    const appendedContacts = screen.getByTestId("appended-contacts-index");
    expect(appendedContacts.textContent).toMatch("No appended contacts.");
    expect(appendedContacts.textContent).toMatch("Select from your diary contacts below.");
  })
})