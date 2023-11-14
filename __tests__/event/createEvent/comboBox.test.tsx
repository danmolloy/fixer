import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import TextInput from "../../../components/event/createUpdate/textInput";
import React from "react";
import { Formik } from "formik";
import ComboBox, { ComboBoxProps } from "../../../components/event/createUpdate/comboBox";
import { venueOptions } from "../../../components/event/createUpdate/callInput";

const mockProps = {
  name: "Venue Name",
  id: "qwertyId",
  label: "Venue Label",
  options: venueOptions,
  setValue: jest.fn()
  
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
  it("options div is in the document with expected children", async () => {
    const optionsDiv = screen.getByTestId("combo-options-div")
    expect(optionsDiv).toBeInTheDocument()
    const textInput = screen.getByTestId(`${mockProps.id}-input`)
    expect(optionsDiv.textContent).toMatch(/^$/)
    await act(async () => {
      await waitFor(() => {
        fireEvent.change(textInput, {target: {value: "Maida"}})
        
      })
    })
   expect(optionsDiv.innerHTML).toMatch(/Maida Vale/)
  })
  it("clicking on option completes text entry and sets value", () => {})
  it("states if input is optional", () => {})
  it("error msg renders if neccessary", () => {})
  it("options render as expected", () => {})
  it("input box has name attr with expected value", () => {})
})