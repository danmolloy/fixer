import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import WeekRow, { WeekRowProps } from "../../../components/calendar/datepicker/weekRow"
import { mockCall } from "../../../__mocks__/models/call"
import { DateTime } from "luxon"

describe("<WeekRow />", () => {
  const mockProps: WeekRowProps = {
    startOfWeekDate: DateTime.now().startOf("week"),
    eventCalls: [mockCall],
    selectedDate: DateTime.now(),
    setSelectedDate: jest.fn()
  }
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <WeekRow {...mockProps} />
        </tbody>
      </table>)
  })
  it("[X]-row is in the document", () => {
    const weekRow = screen.getByTestId(`${mockProps.startOfWeekDate.weekNumber}-row`)
    expect(weekRow).toBeInTheDocument()
  })
  it("All days of that week are in the document", () => {
    const weekStart: DateTime = DateTime.fromObject({weekNumber: mockProps.startOfWeekDate.weekNumber}).set({year: mockProps.startOfWeekDate.year}).startOf("week")
  
    for (let i = 0; i < 7; i ++) {

      let dayTile = screen.getByText(weekStart.plus({ days: i}).day)
      expect(dayTile).toBeInTheDocument()
    }
  })

  //it("Doesn't pass all events to each dayTile", () => {})

})