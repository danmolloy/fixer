import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import WeekRow, { WeekRowProps } from "../../../components/calendar/datepicker/weekRow"
import { mockCall } from "../../../__mocks__/models/call"
import { DateTime } from "luxon"



describe("<WeekRow />", () => {
  const mockProps: WeekRowProps = {
    weekNumber: Math.ceil(Math.random() * 52),
    year: Math.floor(Math.random() * 30) + 2000,
    eventCalls: [mockCall],
    selectedDate: DateTime.now(),
    setSelectedDate: jest.fn()
  }
  beforeEach(() => {
    
    render(<WeekRow {...mockProps} />)
  })
  it("[X]-row is in the document", () => {
    const weekRow = screen.getByTestId(`${mockProps.weekNumber}-row`)
    expect(weekRow).toBeInTheDocument()
  })
  it("All days of that week are in the document", () => {
    const weekStart: DateTime = DateTime.fromObject({weekNumber: mockProps.weekNumber}).set({year: mockProps.year}).startOf("week")
  
    for (let i = 0; i < 7; i ++) {

      let dayTile = screen.getByText(weekStart.plus({ days: i}).day)
      expect(dayTile).toBeInTheDocument()
    }
  })

})