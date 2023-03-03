import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"
import TileTabBar from "../../components/fixing/tileTabBar";
import React from "react";

const mockProps = {
  selectedTab: Math.random() > .5 ? "Availability" : "Booking",
  setSelectedTab: jest.fn()
}

describe("TileTabBar component", () => {
  beforeEach(() => {
    render(<TileTabBar {...mockProps} />);
  })
  it("Renders", () => {
    const tileTabBar = screen.getByTestId("tile-tab-bar");
    expect(tileTabBar).toBeInTheDocument();
  })
  it("Booking tab is in the document", () => {
    const bookingTabToggle = screen.getByTestId("booking-tab-toggle");
    expect(bookingTabToggle).toBeInTheDocument()
  })
  it("Booking tab calls setSelectedTab with expected arg on click", () => {
    const bookingTabToggle = screen.getByTestId("booking-tab-toggle");
    act(() => {
      fireEvent.click(bookingTabToggle)
    })
    expect(mockProps.setSelectedTab).toBeCalledWith("Booking")
  })
  it("Availability tab is in the document", () => {
    const availabilityTabToggle = screen.getByTestId("availability-tab-toggle");
    expect(availabilityTabToggle).toBeInTheDocument()
  })
  it("Availability tab calls setSelectedTab with expected arg on click", () => {
    const availabilityTabToggle = screen.getByTestId("availability-tab-toggle");
    act(() => {
      fireEvent.click(availabilityTabToggle)
    })
    expect(mockProps.setSelectedTab).toBeCalledWith("Availability")
  })
  
})