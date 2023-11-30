import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import CallList, { CallListProps } from "../../../components/calendar/CallList"
import { DateTime } from "luxon"
import { mockCallWithEventWithEnsemble } from "../../../__mocks__/models/call"



describe("<CallList />", () => {
  const mockProps: CallListProps = {
    selectedDate: DateTime.now().plus({days: 1}),
    eventCalls: [mockCallWithEventWithEnsemble]
  }
  beforeEach(() => {
    render(<CallList {...mockProps} />)
  })
  it("call-list is in the document", () => {
    const callList = screen.getByTestId("call-list")
    expect(callList).toBeInTheDocument()
  })
  it("date-header with selected date is in the document", () => {
    const formattedDate = mockProps.selectedDate.toFormat("DD") // localized date with full month
    const dateHeader = screen.getByText(`Events on ${formattedDate}`)
    expect(dateHeader).toBeInTheDocument()
  })
  it("it states if no calls are on the date", () => {
    const message = screen.getByText("No events on this day.")
    expect(message).toBeInTheDocument()
  })
})

describe("<CallList />", () => {
  const mockEvent = mockCallWithEventWithEnsemble
  const mockProps: CallListProps = {
    selectedDate: DateTime.fromJSDate(new Date(mockEvent.startTime)),
    eventCalls: [mockEvent]
  }
  beforeEach(() => {
    render(<CallList {...mockProps} />)
  })
  it("all calls on selectedDate are in the document", () => {
    for (let i = 0; i < mockProps.eventCalls.length; i++) {
      let mockCall = screen.getByTestId(`${mockProps.eventCalls[i].id}-call-tile`)
      expect(mockCall).toBeInTheDocument()
    }
  })
})
