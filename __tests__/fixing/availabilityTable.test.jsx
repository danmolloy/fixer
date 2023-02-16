import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import AvailabilityTable, { dummyDates, dummyRows } from "../../components/fixing/availabilityTable"

describe("AvailabilityTable component", () => {
  beforeEach(() => {
    render(<AvailabilityTable />)
  })

  it("Renders", () => {
    const tableDiv = screen.getByTestId("availability-table-div")
    expect(tableDiv).toBeInTheDocument()
  })
  it("Table Head renders name cell and all dummyDates", () => {
    const tableHead = screen.getByTestId("availability-table-head")
    expect(tableHead).toBeInTheDocument()
    expect(tableHead.textContent).toMatch(/Name/)
    for(let i = 0; i < dummyDates.length; i++) {
      expect(tableHead.textContent).toMatch(dummyDates[i])
    }
  })
  it("Table Body matches all names in dummyRows", () => {
    const tableBody = screen.getByTestId("availability-table-body")
    expect(tableBody).toBeInTheDocument()
    
    for(let i = 0; i < dummyRows.length; i++) {
      expect(tableBody.textContent).toMatch(dummyRows[i].name)
    }
  })
})