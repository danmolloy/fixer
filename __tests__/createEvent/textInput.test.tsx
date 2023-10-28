import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import TextInput from "../../components/event/createEvent/textInput";
import React from "react";
import { Formik } from "formik";

const mockProps = {
  multiline: Math.random() > .5 ? true : false,
  name: "mockName",
  title: "mockTitle",
  id: "mockId",
  label: "mockLabel"
}

describe("TextInput component", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props) => (
          <TextInput {...mockProps} />
        )}
      </Formik>)
  })
  it("Renders", () => {
    const textInput = screen.getByTestId(`${mockProps.id}-div`)
    expect(textInput).toBeInTheDocument()
  })
  //it("Matches snapshot", () => {})
})