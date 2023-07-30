import { act, fireEvent, render, screen } from "@testing-library/react"
import MobileDashboard from "../../components/upcomingEvents/mobileDashboard"
import { EventDashboardProps } from "../../components/upcomingEvents/dashboard"
import "@testing-library/jest-dom"

const mockProps: EventDashboardProps = {
  setDateRange: jest.fn(),
  setSelectedDate: jest.fn(),
  dateRange: undefined
}

describe("MobileDashboard component", () => {
  beforeEach(() => {
    render(<MobileDashboard {...mockProps} />)
  })
  it("Renders", () => {
    const dashboard = screen.getByTestId("mobile-dashboard")
    expect(dashboard).toBeInTheDocument()
  })
  it("All upcoming option is in the document, calls handleChange & setSelectedDate with expected value on select", () => {
    const allUpcoming = screen.getByText("All Upcoming")
    const selectMenu = screen.getByTestId("select-menu")
    expect(allUpcoming).toBeInTheDocument()
    act(() => {
      fireEvent.change(selectMenu, { target: { value: 0 }})
    })
    expect(mockProps.setDateRange).toBeCalledWith(undefined)

  })
  it("Week option is in the document, calls handleChange with expected value on select", () => {
    const week = screen.getByText("Week")
    const selectMenu = screen.getByTestId("select-menu")
    expect(week).toBeInTheDocument()
    act(() => {
      fireEvent.change(selectMenu, { target: { value: 7 }})
    })
    expect(mockProps.setDateRange).toBeCalledWith(7)

  })
  it("Fortnight option is in the document, calls handleChange with expected value on select", () => {
    const fortnight = screen.getByText("Fortnight")
    const selectMenu = screen.getByTestId("select-menu")
    expect(fortnight).toBeInTheDocument()
    act(() => {
      fireEvent.change(selectMenu, { target: { value: 14 }})
    })
    expect(mockProps.setDateRange).toBeCalledWith(14)

  })
  it("Four Weeks option is in the document, calls handleChange with expected value on select", () => {
    const fourWeeks = screen.getByText("Four Weeks")
    const selectMenu = screen.getByTestId("select-menu")
    expect(fourWeeks).toBeInTheDocument()
    act(() => {
      fireEvent.change(selectMenu, { target: { value: 28 }})
    })
    expect(mockProps.setDateRange).toBeCalledWith(28)

  })

})