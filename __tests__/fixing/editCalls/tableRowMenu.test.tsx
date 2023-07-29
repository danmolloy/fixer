import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"
import TableRowMenu, { EditTableRowMenuProps } from "../../../components/fixing/editCalls/tableRowMenu";
import React from "react";
import { mockUserWithCalls } from "../../../__mocks__/models/user";
import { Formik } from "formik";

const menuProps: EditTableRowMenuProps = {
  menuOptions: [],
  setShowMenu: jest.fn(),
  appendedPlayers: [mockUserWithCalls],
  menuIndex: 0,
  makeAvailable: jest.fn()
}

describe("TableRowMenu component", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
      {(props) => (
        <TableRowMenu {...menuProps} />
      )}
    </Formik>)
  })
  it("Renders", () => {
    const menuDiv = screen.getByTestId("table-row-menu");
    expect(menuDiv).toBeInTheDocument()
  });
  it("'View Profile' button in the document, with expected attr", () => {
    const viewProfileLink = screen.getByTestId("profile-link")
    expect(viewProfileLink).toBeInTheDocument()
    expect(viewProfileLink).toHaveAttribute("href", `/user/${menuProps.appendedPlayers[menuProps.menuIndex].name}`)
  });
  it("'Remove from List' button is in the document", () => {
    const removeBtn = screen.getByText("Remove from List")
    expect(removeBtn).toBeInTheDocument()
  })
  it("'Remove from list' calls makeAvailable onClick with expected arg", () => {
    const removeBtn = screen.getByText("Remove from List")
    act(() => {
      fireEvent.click(removeBtn)
    })
    expect(menuProps.makeAvailable).toBeCalledWith(menuProps.appendedPlayers[menuProps.menuIndex])
  })
  it("'Add Message' text input is in the document with label", () => {
    const messageInput = screen.getByLabelText("Add Message")
    expect(messageInput).toBeInTheDocument()
  })
});