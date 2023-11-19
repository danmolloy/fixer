import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import TextInput from "../../../components/event/createUpdate/textInput";
import React from "react";
import { Formik } from "formik";
import ComboBox, { ComboBoxProps } from "../../../components/event/createUpdate/comboBox";
import { venueOptions } from "../../../components/event/createUpdate/callInput";

const mockProps = { // This obj isn't typed because I pass propsValue to the component directly.
  name: "venue",
  id: "qwertyId",
  label: "mockLabel",
  options: venueOptions,
  setValue: jest.fn(),
  optional: false
}

describe("<ComboBox />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{
        venue: ""
      }} onSubmit={() => {}}>
        {(props) => (
          <ComboBox propsValue={props.values.venue} {...mockProps} />
        )}
      </Formik>)
  })
  it("combobox-id-div is in the document", () => {
    const comboBox = screen.getByTestId(`combobox-${mockProps.id}-div`)
    expect(comboBox).toBeInTheDocument()
  })
  it("text input is in the document with label & type and name attrs", () => {
    const textInput = screen.getByLabelText(mockProps.label)
    expect(textInput).toBeInTheDocument()
    expect(textInput).toHaveAttribute("type", "text")
    expect(textInput).toHaveAttribute("name", mockProps.name)
  })
  it("if inputted text matched an option, options div is in the document with expected children", async () => {
    const textInput = screen.getByLabelText(mockProps.label)
    for (let i = 0; i < mockProps.options.length; i++) {
      await act(async () => {
        await fireEvent.change(textInput, {target: { value: mockProps.options[i].textPrimary.slice(0, 3)}})
      })
      const option = screen.getByText(mockProps.options[i].textPrimary)
      expect(option).toBeInTheDocument()
      await act(async () => {
        await fireEvent.click(option)
      })
      expect(mockProps.setValue).toHaveBeenCalledWith(mockProps.options[i].textPrimary)
    }
  })
  it("clicking on option completes text entry and sets value", async () => {
    const textInput = screen.getByLabelText(mockProps.label)
    for (let i = 0; i < mockProps.options.length; i++) {
      await act(async () => {
        await fireEvent.change(textInput, {target: { value: mockProps.options[i].textPrimary.slice(0, 3)}})
      })
      const optionsDiv = screen.getByTestId("combo-options-div")
      expect(optionsDiv).toBeInTheDocument()
      expect(optionsDiv.textContent).toMatch(mockProps.options[i].textPrimary)
      const randInd = Math.floor(Math.random() * (mockProps.options[i].textPrimary.length -3))
      await act(async () => {
        await fireEvent.change(textInput, {target: { value: mockProps.options[i].textPrimary.slice(randInd, randInd+3)}})
      })
      expect(optionsDiv).toBeInTheDocument()
      expect(optionsDiv.textContent).toMatch(mockProps.options[i].textPrimary)
    }
  })

})

describe("<ComboBox />", () => {
  const mockProps = {
    name: "venue",
    id: "qwertyId",
    label: "mockLabel",
    options: venueOptions,
    setValue: jest.fn(),
    optional: true
  }
  beforeEach(() => {
    render(
      <Formik initialValues={{
        venue: ""
      }} onSubmit={() => {}}>
        {(props) => (
          <ComboBox propsValue={props.values.venue} {...mockProps} />
        )}
      </Formik>)
  })
  it("states if input is optional", () => {
    const optionalInput = screen.getByText("Optional")
    expect(optionalInput).toBeInTheDocument()
  })
})