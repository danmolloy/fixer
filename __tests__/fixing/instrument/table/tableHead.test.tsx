import { render, screen } from "@testing-library/react";
import { mockCall } from "../../../../__mocks__/models/call";
import TableHead, { TableHeadProps } from "../../../../components/fixing/instrument/table/tableHead";
import { DateTime } from "luxon";
import "@testing-library/jest-dom"

const mockProps: TableHeadProps = {
  eventCalls: [mockCall]
}

describe("<TableHead />", () => {
  beforeEach(() => {
    render(
      <table>
        <TableHead {...mockProps} />
      </table>)
  })
  it("table-head is in document", () => {
    const tableHead = screen.getByTestId("table-head")
    expect(tableHead).toBeInTheDocument()
  })
  it("name cell is in document", () => {
    const nameCell = screen.getByTestId("name-cell")
    expect(nameCell).toBeInTheDocument()
  })
  it("each event call has a cell and start time is format 'hh:mm a dd LLL'", () => {
    for (let i = 0; i < mockProps.eventCalls.length; i++) {
      let formattedStartTime = DateTime.fromJSDate(new Date(mockProps.eventCalls[i].startTime)).weekday
      let callCell = screen.getByTestId(`${mockProps.eventCalls[i].id}-cell`)
      expect(callCell.textContent).toMatch(formattedStartTime)
    }
  })
  it("action cell is in document", () => {
    const actionCell = screen.getByTestId("action-cell")
    expect(actionCell).toBeInTheDocument()
  })
})