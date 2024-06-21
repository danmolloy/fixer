import { render, screen, act, fireEvent } from "@testing-library/react";
import AppendedContactMenu, { AppendedContactMenuProps } from "../../../../../components/fixing/instrument/players/appendedContacts/appendedContactMenu";
import { Formik } from "formik"
import { mockUserId } from "../../../../../__mocks__/models/user";
import { mockEnsembleContact } from "../../../../../__mocks__/models/ensembleContact";
import "@testing-library/jest-dom"

const mockProps: AppendedContactMenuProps = {
  remove: jest.fn(),
  index: Math.floor(Math.random()) * 10,
  contactId: mockUserId,
  setShowMenu: jest.fn(),
  setMessage: jest.fn(),
  musicianName: `${mockEnsembleContact.firstName} ${mockEnsembleContact.lastName}`
}

describe("<AppendedMusicianMenu />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props) => (
          <AppendedContactMenu {...mockProps}/>      
        )}
      </Formik>)
  })
  it("remove from list btn is in the document and calls remove", () => {
    const removeBtn = screen.getByText("Remove from List")
    expect(removeBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(removeBtn)
    })
    expect(mockProps.remove).toBeCalled()
  })
  it("add message btn is in the document", () => {
    const msgBtn = screen.getByText("Add Message")
    expect(msgBtn).toBeInTheDocument()

  })
  //it("add message btn calls sendmessage with expected args", () => {})
  //it("setShowMenu is called onBlur", () => {})
})