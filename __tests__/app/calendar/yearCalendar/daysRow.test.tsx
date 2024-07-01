import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import DaysRow, { daysArr } from "../../../../app/calendar/yearCalendar/daysRow"

describe("<DaysRow />", () => {
  beforeEach(() => {
    render(
      <table>
        <DaysRow />
      </table>)
  })
  it("days-row is in the document", () => {
    const daysRow = screen.getByTestId("days-row")
    expect(daysRow).toBeInTheDocument()
  })
  it("first letter of each day is in the document", () => {
    for (let i = 0; i < daysArr.length; i++) {
      let dayCol = screen.getByTestId(`${daysArr[i].day}-col`)
      expect(dayCol).toBeInTheDocument()
      expect(dayCol.textContent).toMatch(daysArr[i].day.slice(0, 1))
    }
  })
})