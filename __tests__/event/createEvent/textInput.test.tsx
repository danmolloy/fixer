import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import TextInput from "../../../components/event/createUpdate/textInput";
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
  it("text-input is in the document with name attr and label", () => {})
})