import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom"
import EditCallsOptions from "../../../components/fixing/editCalls/options";
import React from "react";
import { Formik } from "formik";

const mockProps = {
  isSubmitting: false,
  instrumentName: "Gamba"
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
  it("NumToBook number input is in the document with label", () => {
    const numToBook = screen.getByLabelText("Num to Book")
    expect(numToBook).toBeInTheDocument()
    expect(numToBook).toHaveAttribute("type", "number")
  })
  it("Message to all instrument players text input is in the document with label", () => {
    const messagePlayers = screen.getByTestId("instrument-msg-input")
    expect(messagePlayers).toBeInTheDocument()
    expect(messagePlayers).toHaveAttribute("type", "text")
    expect(messagePlayers).toHaveAttribute("label", `Message to ${mockProps.instrumentName.toLowerCase()} players`)
  })
  it("Call Order is in the document with label with expected options", () => {
    const callOrder = screen.getByTestId("call-order-drop-down")
    expect(callOrder).toBeInTheDocument()
    expect(callOrder.textContent).toMatch("Ordered")
    expect(callOrder.textContent).toMatch("Random")
    expect(callOrder.textContent).toMatch("Simultaneous")
  })
})