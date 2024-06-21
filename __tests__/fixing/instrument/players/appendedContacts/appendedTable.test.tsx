import AppendedTable, { AppendedTableProps} from "../../../../../components/fixing/instrument/players/appendedContacts/appendedTable";
import { render, screen } from "@testing-library/react";
import { mockMessage } from "../../../../../__mocks__/models/messages"
import { mockCall } from "../../../../../__mocks__/models/call"
import { Formik } from "formik"
import { mockEnsembleContact } from "../../../../../__mocks__/models/ensembleContact";
import "@testing-library/jest-dom"

const mockProps: AppendedTableProps = {
  musicians: [
    {
      positionTitle: "tutti",
      contact: mockEnsembleContact,
      calls: [String(mockCall.id)],
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
      let appendedMusician = screen.getByText(`${mockProps.musicians[i].contact.firstName} ${mockProps.musicians[i].contact.lastName}`)
      expect(appendedMusician).toBeInTheDocument()
    }
  })
})