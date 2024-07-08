import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom"
import React from "react";
import { Formik } from "formik";
import EditOptions, { EditOptionsProps } from "../../../../components/fixing/instrument/edit/editOptions";



describe("<EditOptions />", () => {
  const mockProps: EditOptionsProps = {
    bookingOrAvailability: "Booking"
  }
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
      {(props) => (
        <EditOptions {...mockProps} />
      )}
    </Formik>)
  })
  it("Renders", () => {
    const options = screen.getByTestId("edit-options")
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
  
  it("If availability, there is a checkbox for 'strictly tied'", () => {
      if (mockProps.bookingOrAvailability === "Availability") {
      const strictlyTiedToggle = screen.getByTestId("strictly-tied-toggle")
      expect(strictlyTiedToggle).toBeInTheDocument()
    }
  })
})

describe("<EditOptions />", () => {
  const mockProps: EditOptionsProps = {
    bookingOrAvailability: "Availability"
  }
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
      {(props) => (
        <EditOptions {...mockProps} />
      )}
    </Formik>)
  })

  it("If availability, there is a checkbox for 'strictly tied'", () => {
      if (mockProps.bookingOrAvailability === "Availability") {
      const strictlyTiedToggle = screen.getByTestId("strictly-tied-toggle")
      expect(strictlyTiedToggle).toBeInTheDocument()
    }
  })
})
