import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import CalendarIndex, { CalendarIndexProps } from "../../components/calendar"
import { mockUserWithCallsAndEvents } from "../../__mocks__/models/user"

const mockProps: CalendarIndexProps = {
  data: mockUserWithCallsAndEvents
}

describe("<CalendarIndex />", () => {
  beforeEach(() => {
    render(<CalendarIndex {...mockProps} />)
  })
  it("calendar-index is in the document", () => {})
  it("date-picker is in the document", () => {})
})