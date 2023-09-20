import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import TextInput from "../../components/createEvent/textInput";
import React from "react";
import { Formik } from "formik";
import ComboBox, { ComboBoxProps } from "../../components/createEvent/comboBox";
import { venueOptions } from "../../components/createEvent/callInput";

const mockProps = {
  name: "Venue Name",
  id: "qwertyId",
  label: "Venue Label",
  options: venueOptions,
  setVenue: jest.fn()
  
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
  it("Renders", () => {
    const comboBox = screen.getByTestId(`combobox-${mockProps.id}-div`)
    expect(comboBox).toBeInTheDocument()
  })
  it("Options div is in the document with expected children", async () => {
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
  it("Clicking on option completes text entry and sets value", () => {})

})