import DayView, { DayViewProps } from "../../../../app/calendar/views/dayView";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { DateTime } from "luxon";
import { mockCallWithEventWithEnsemble } from "../../../../__mocks__/models/call";

const mockProps: DayViewProps = {
  selectedDate: DateTime.now(),
  setSelectedDate: jest.fn(),
  eventCalls: [mockCallWithEventWithEnsemble]
}

describe("<DayView />", () => {
  beforeEach(() => {
    render(<DayView {...mockProps} />)
  })
  it("day-view is in the document", () => {
    const dayView = screen.getByTestId('day-view')
    expect(dayView).toBeInTheDocument()
  })
  it("datePicker is in the document", () => {
    const datePicker = screen.getByTestId("date-picker")
    expect(datePicker).toBeInTheDocument()
  })
  it("call-list is in the document", () => {
    const callList = screen.getByTestId("call-list")
    expect(callList).toBeInTheDocument()
  })
})