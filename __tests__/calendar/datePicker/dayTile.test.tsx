import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import DayTile, { DayTileProps } from "../../../components/calendar/datepicker/dayTile"
import { DateTime } from "luxon"
import { mockCall } from "../../../__mocks__/models/call"



describe("<DayTile />", () => {
  const mockProps: DayTileProps = {
    tileDate: DateTime.now(),
    eventCalls: [mockCall],
    selectedDate: DateTime.now(),
    setSelectedDate: jest.fn()
  }
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <tr>
            <DayTile {...mockProps} />
          </tr>
        </tbody>
      </table>)
  })
  it("[X]-tile is in the document", () => {
    const dayTile = screen.getByTestId(`${mockProps.tileDate}-tile`)
    expect(dayTile).toBeInTheDocument()
  })
  it("calls selectDay onClick", () => {
    const dayTile = screen.getByTestId(`${mockProps.tileDate}-tile`)
    act(() => {
      fireEvent.click(dayTile)
    })
    expect(mockProps.setSelectedDate).toBeCalledWith(mockProps.tileDate)
  })
  it("day text is in the document", () => {
    const dayText = screen.getByText(mockProps.tileDate.day)
    expect(dayText).toBeInTheDocument()
  })
  it("indicates if call(s) are on that day", () => {
    if (mockProps.eventCalls.length > 0) {
      let dotIndicator = screen.getByTestId('dot-indicator')
      expect(dotIndicator).toBeInTheDocument()
    }
  })
})

