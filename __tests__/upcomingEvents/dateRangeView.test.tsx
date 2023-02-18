import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import DateRangeView from "../../components/upcomingEvents/dateRangeView";
import moment from "moment";

const mockProps = {
  selectedDate: moment(),
  dateRange: 14
}

describe("DateRangeView component", () => {
  beforeEach(() => {
    render(<DateRangeView {...mockProps} />)
  })
  it("Renders", () => {
    const dateRangeView = screen.getByTestId("date-range-view")
    expect(dateRangeView).toBeInTheDocument()
  })
  
})