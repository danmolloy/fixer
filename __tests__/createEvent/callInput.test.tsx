import CallInput from "../../components/createEvent/callInput";
import "@testing-library/jest-dom"
import { render, screen, act, fireEvent } from "@testing-library/react";
import { Formik } from "formik";
import React from "react";

const mockProps = {
  index: 1,
  id: "mockId",
  remove: jest.fn()
}

describe("CallInput component", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props) => (
          <CallInput {...mockProps} />
        )}
      </Formik>
    )
  })
  it("Renders", () => {
    const callInput = screen.getByTestId("call-input-div")
    expect(callInput).toBeInTheDocument()
  })
  it("Call index number is in the document", () => {
    const callInput = screen.getByTestId("call-input-div")
    expect(callInput.textContent).toMatch(`Call ${mockProps.index + 1}`)
  })
  it("Remove button is in the document", () => {
    const removeBtn = screen.getByTestId(`calls-${mockProps.index}-delete`)
    expect(removeBtn).toBeInTheDocument()
  })
  it("Remove button calls remove with expected arg on click", () => {
    const removeBtn = screen.getByTestId(`calls-${mockProps.index}-delete`)
    act(() => {
      fireEvent.click(removeBtn)
    })
    expect(mockProps.remove).toBeCalledWith(mockProps.index)
  })
  it("Start Time datetime input is in the document with label", () => {
    const startTimeInput = screen.getByLabelText("Start Time")
    expect(startTimeInput).toBeInTheDocument()
    expect(startTimeInput).toHaveAttribute("type", "datetime-local")
  })
  it("End Time datetime input is in the document with label", () => {
    const endTimeInput = screen.getByLabelText("End Time")
    expect(endTimeInput).toBeInTheDocument()
    expect(endTimeInput).toHaveAttribute("type", "datetime-local")
  })
  it("Venue text input is in the document with label", () => {
    const venueInput = screen.getByLabelText("Venue")
    expect(venueInput).toBeInTheDocument()
    expect(venueInput).toHaveAttribute("type", "text")
  })
  it("Call Additional info is in the document with label", () => {
    const callInfo = screen.getByLabelText("Call Info")
    expect(callInfo).toBeInTheDocument()
    expect(callInfo).toHaveAttribute("type", "text")
  })
})