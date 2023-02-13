import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import AvailabilityTable from "../../components/fixing/availabilityTable"

describe("AvailabilityTable component", () => {
  beforeEach(() => {
    render(<AvailabilityTable />)
  })

  it("Renders", () => {
    const tableDiv = screen.getByTestId("availability-table-div")
    expect(tableDiv).toBeInTheDocument()
  })
})