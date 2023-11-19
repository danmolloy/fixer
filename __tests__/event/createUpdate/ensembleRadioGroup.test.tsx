import "@testing-library/jest-dom"
import EnsembleRadioGroup, { EnsembleRadioProps } from "../../../components/event/createUpdate/ensembleRadioGroup"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Formik } from "formik"

const mockProps: EnsembleRadioProps = {
  isSubmitting: false,
  ensemble: "TechDeck",
  fixingEnsembles: ["BBC Concert", "London Symphony"]
}

describe("<EnsembleRadioGroup />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props) => (
          <EnsembleRadioGroup {...mockProps} />
        )}
      </Formik>)
  })
  it("ensemble radio group is in the document with label and ", () => {
    const ensembleGroup = screen.getByLabelText("Ensemble")
    expect(ensembleGroup).toBeInTheDocument()
    expect(ensembleGroup).toHaveAttribute("role", "group")
  })
  it("all ensembles are in the document with correct label, type, name and value", () => {
    for (let i = 0; i < mockProps.fixingEnsembles.length; i++) {
      let ensembleInput = screen.getByLabelText(mockProps.fixingEnsembles[i])
      expect(ensembleInput).toBeInTheDocument()
      expect(ensembleInput).toHaveAttribute("type", "radio")
      expect(ensembleInput).toHaveAttribute("name", "ensemble")
      expect(ensembleInput).toHaveAttribute("value", mockProps.fixingEnsembles[i])
    }
  })
  it("'other' radio option is in the document", () => {
      let otherInput = screen.getByLabelText("Other")
      expect(otherInput).toBeInTheDocument()
      expect(otherInput).toHaveAttribute("type", "radio")
      expect(otherInput).toHaveAttribute("name", "ensemble")
      expect(otherInput).toHaveAttribute("value","Other")

  })

  it("if no fixingEnsembles added, there is a helpful message", () => {})
  it("if no fixingEnsembles, it is just a text input", () => {})
})

describe("<EnsembleRadioGroup />", () => {
  beforeEach(() => {
    const mockProps: EnsembleRadioProps = {
      isSubmitting: false,
      ensemble: "Other",
      fixingEnsembles: ["BBC Concert", "London Symphony"]
    }
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props) => (
          <EnsembleRadioGroup {...mockProps} />
        )}
      </Formik>)
  })
  it("if other is selected, there is a corresponding text input which has expected ashtml, label, type and name", () => {
    const otherTextInput = screen.getByLabelText("Ensemble Name")
    expect(otherTextInput).toBeInTheDocument()
    expect(otherTextInput).toHaveAttribute("type", "text")
    expect(otherTextInput).toHaveAttribute("name", "ensembleName")
  })
})