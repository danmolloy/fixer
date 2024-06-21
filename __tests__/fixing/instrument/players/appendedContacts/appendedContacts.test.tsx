import { mockCall } from "../../../../../__mocks__/models/call";
import { mockEnsembleContact } from "../../../../../__mocks__/models/ensembleContact";
import AppendedContact, { AppendedContactProps } from "../../../../../components/fixing/instrument/players/appendedContacts/appendedContact";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import { Formik } from "formik";

const mockProps: AppendedContactProps = {
  musician: {
    contact: mockEnsembleContact,
    addedMessage: 'mockAddedMsg',
    calls: ["1", "2"],
    positionTitle: "Principal"
  },
  allEventCalls: [mockCall],
  index: 1,
  remove: jest.fn(),
  addedMessage: "theAddedMsg",
  setMessage: jest.fn(),
  move: jest.fn(),
  listLength: 4
}

const moveMock = jest.fn()


describe("<AppendedContact />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        {props => (
          <table>
            <tbody>
              <AppendedContact {...mockProps} move={moveMock}/>        
            </tbody>
          </table>
        )}
      </Formik>)
  })
  it("appended-contact is in the document", () => {
    const appendedContact = screen.getByTestId("appended-contact")
    expect(appendedContact).toBeInTheDocument()
  })
  it("contact name is in the document", () => {
    const contactName = screen.getByText(`${mockProps.musician.contact.firstName} ${mockProps.musician.contact.lastName}`)
    expect(contactName).toBeInTheDocument()
  })
  it("position select is in the document", () => {
    const positionSelect = screen.getByTestId(`${mockProps.musician.contact.id}-position-select`)
    expect(positionSelect).toBeInTheDocument()
    expect(positionSelect).toHaveAttribute("name", `musicians.${mockProps.index}.positionTitle`)
    const principalOption = screen.getByText("Principal")
    expect(principalOption).toBeInTheDocument()
    expect(principalOption).toHaveAttribute("value", "principal")
    const tuttiOption = screen.getByText("Tutti")
    expect(tuttiOption).toHaveAttribute("value", "tutti")
  })
  it("added message is in the document", () => {
    const msg = screen.getByText(mockProps.addedMessage)
    expect(msg).toBeInTheDocument()
  })
  it("all event calls are in the document, checked if relevant", () => {
    for (let i = 0; i < mockProps.allEventCalls.length; i ++) {
      let eventCall = screen.getByTestId(`${mockProps.musician.contact.id}-row-call-${mockProps.allEventCalls[i].id}`)
      expect(eventCall).toBeInTheDocument()
      expect(eventCall).toHaveAttribute("type", "checkbox")
    }
  })
  it('move up btn is in the document and calls move if clicked, disabled at zero', async () => {
    const moveUpBtn = screen.getByTestId("move-up-btn")
    expect(moveUpBtn).toBeInTheDocument()
    await act(async () => fireEvent.click(moveUpBtn))
    expect(moveMock).toHaveBeenCalledWith(mockProps.index, mockProps.index - 1)
  })
  it("move down btn is in the document and calls move on click, disabled at bottom", async () => {
    const moveDownBtn = screen.getByTestId("move-down-btn")
    expect(moveDownBtn).toBeInTheDocument()
    await act(async () => fireEvent.click(moveDownBtn))
    expect(moveMock).toHaveBeenCalledWith(mockProps.index, mockProps.index + 1)
  })
  it("menu btn is in the document and renders menu on click", async () => {
    const menuBtn = screen.getByTestId("menu-btn")
    expect(menuBtn).toBeInTheDocument()
    await waitFor(() => fireEvent.click(menuBtn))
    const contactMenu = screen.getByTestId("contact-menu")
    expect(contactMenu).toBeInTheDocument()
  })
})

describe("<AppendedContact />", () => {
  const mockProps: AppendedContactProps = {
    musician: {
      contact: mockEnsembleContact,
      addedMessage: 'mockAddedMsg',
      calls: ["1", "2"],
      positionTitle: "Principal"
    },
    allEventCalls: [mockCall],
    index: 0,
    remove: jest.fn(),
    addedMessage: "theAddedMsg",
    setMessage: jest.fn(),
    move: jest.fn(),
    listLength: 1
  }
  
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        {props => (
          <table>
            <tbody>
              <AppendedContact {...mockProps} move={moveMock}/>        
            </tbody>
          </table>
        )}
      </Formik>)
  })
  it("move up btn is disabled if index === 0", async () => {
    const moveUpBtn = screen.getByTestId("move-up-btn")
    expect(moveUpBtn).toBeInTheDocument()
    await act(async () => fireEvent.click(moveUpBtn))
    expect(moveMock).not.toHaveBeenCalled()
  })
})

describe("<AppendedContact />", () => {
  const mockProps: AppendedContactProps = {
    musician: {
      contact: mockEnsembleContact,
      addedMessage: 'mockAddedMsg',
      calls: ["1", "2"],
      positionTitle: "Principal"
    },
    allEventCalls: [mockCall],
    index: 1,
    remove: jest.fn(),
    addedMessage: "theAddedMsg",
    setMessage: jest.fn(),
    move: jest.fn(),
    listLength: 2
  }
  
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        {props => (
          <table>
            <tbody>
              <AppendedContact {...mockProps} move={moveMock}/>        
            </tbody>
          </table>
        )}
      </Formik>)
  })
  it("move up btn is disabled if bottom player", async () => {
    const moveDownBtn = screen.getByTestId("move-down-btn")
    expect(moveDownBtn).toBeInTheDocument()
    await act(async () => fireEvent.click(moveDownBtn))
    expect(moveMock).not.toHaveBeenCalled()
  })
})