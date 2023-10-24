import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import DaysRow from "../../../components/calendar/monthCalendar/daysRow"

describe("<DaysRow />", () => {
  beforeEach(() => {
    render(<DaysRow />)
  })
  it("All days are in the document and just show first three letters i.e. Mon, Tue, Wed", () => {})
})