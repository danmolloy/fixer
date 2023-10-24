import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import DaysRow from "../../../components/calendar/datepicker/daysRow"

describe("<DaysRow />", () => {
  beforeEach(() => {
    render(
      <table>
        <DaysRow />
      </table>)
  })
  it("All days are in the document and just show first letter i.e. M, T, W", () => {})
})