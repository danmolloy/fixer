import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import AppendedTable, { AppendedTableProps } from "../../../../../components/fixing/instrument/edit/appendedMusicians/appendedTable"
import { mockUser } from "../../../../../__mocks__/models/user"
import { mockMessage } from "../../../../../__mocks__/models/messages"
import { mockCall } from "../../../../../__mocks__/models/call"
import { Formik } from "formik"

const mockProps: AppendedTableProps = {
  musicians: [
    {
      user: mockUser,
      calls: [mockCall],
      addedMessage: mockMessage
    }
  ],
  allEventCalls: [mockCall],
  setMessage: jest.fn()
}


describe("<AppendedTable />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        {props => (
          <AppendedTable {...mockProps} />
        )}
      </Formik>)
  })
  it("appended-player-table is in the document", () => {
    const appendedTable = screen.getByTestId("appended-player-table")
    expect(appendedTable).toBeInTheDocument()
  })
  it("all appended musicians are in the document", () => {
    for (let i = 0; i < mockProps.musicians.length; i++) {
      let appendedMusician = screen.getByText(`${mockProps.musicians[i].user.firstName} ${mockProps.musicians[i].user.lastName}`)
      expect(appendedMusician).toBeInTheDocument()
    }
  })
})