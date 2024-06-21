import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import YearView, { YearViewProps } from "../../../app/calendar/views/yearView"
import { DateTime } from "luxon"
import { mockCall } from "../../../__mocks__/models/call"

const mockProps: YearViewProps = {
  setSelectedView: jest.fn(),
  selectedDate: DateTime.now(),
  setSelectedDate: jest.fn(),
  eventCalls: [mockCall]
} 

describe("<YearView />", () => {
  beforeEach(() => {
    render(<YearView {...mockProps} />)
  })
  it("datePicker for all months of selected year are in the document", () => {})
})