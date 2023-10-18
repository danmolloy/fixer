import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import TabSelect, { TabSelectProps } from "../../../components/fixing/instrument/tabSelect"

const mockProps: TabSelectProps = {
  selectedTab: "Booking",
  setSelectedTab: jest.fn()
}

describe("<TabSelect />", () => {
  beforeEach(() => {
    render(<TabSelect {...mockProps} />)
  })
  it("booking btn is in the document", () => {
    const bookingTabToggle = screen.getByTestId("booking-tab-toggle");
    expect(bookingTabToggle).toBeInTheDocument()
  })
  it("booking btn calls setSelectTab onClick", () => {
    const bookingTabToggle = screen.getByTestId("booking-tab-toggle");
    act(() => {
      fireEvent.click(bookingTabToggle)
    })
    expect(mockProps.setSelectedTab).toBeCalledWith("Booking")
  })
  it("availability btn is in the document", () => {
    const availabilityTabToggle = screen.getByTestId("availability-tab-toggle");
    expect(availabilityTabToggle).toBeInTheDocument()
  })
  it("availability btn calls setSelectTab on Click", () => {
    const availabilityTabToggle = screen.getByTestId("availability-tab-toggle");
    act(() => {
      fireEvent.click(availabilityTabToggle)
    })
    expect(mockProps.setSelectedTab).toBeCalledWith("Availability")
  })
})