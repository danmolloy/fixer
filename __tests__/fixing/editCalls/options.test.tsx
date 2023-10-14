import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom"
import EditCallsOptions from "../../../components/fixing/editCalls/options";
import React from "react";
import { Formik } from "formik";

const mockProps = {
  isSubmitting: false,
  instrumentName: "Gamba",
  bookingOrAvailability: Math.random() > 0.5 ? "Booking" : "Availability"
}

describe("EditCallsOptions component", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
      {(props) => (
        <EditCallsOptions {...mockProps} />
      )}
    </Formik>)
  })
  it("Renders", () => {
    const options = screen.getByTestId("edit-calls-options")
    expect(options).toBeInTheDocument()
  })
  it("If booking, NumToBook number input is in the document with label", () => {
    if (mockProps.bookingOrAvailability === "Booking") {
      const numToBook = screen.getByLabelText("Num to Book")
      expect(numToBook).toBeInTheDocument()
      expect(numToBook).toHaveAttribute("type", "number")
    }
  })
  it("Message to all instrument players text input is in the document with label", () => {
    const messagePlayers = screen.getByTestId("instrument-msg-input")
    expect(messagePlayers).toBeInTheDocument()
    expect(messagePlayers).toHaveAttribute("type", "text")
    expect(messagePlayers).toHaveAttribute("label", `Message to all`)
  })
  it("If booking, Call Order is in the document with label with expected options", () => {
    mockProps.bookingOrAvailability = "Booking"
    if (mockProps.bookingOrAvailability === "Booking") {
      const callOrder = screen.getByTestId("call-order-drop-down")
      expect(callOrder).toBeInTheDocument()
      expect(callOrder.textContent).toMatch("Ordered")
      expect(callOrder.textContent).toMatch("Random")
      expect(callOrder.textContent).toMatch("Simultaneous")
    }
  })
  it("If availability, there is a checkbox for 'strictly tied'", () => {
      if (mockProps.bookingOrAvailability === "Availability") {
      const strictlyTiedToggle = screen.getByTestId("strictly-tied-toggle")
      expect(strictlyTiedToggle).toBeInTheDocument()
    }
  })
})