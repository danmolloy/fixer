import "@testing-library/jest-dom"
import EnsembleRadioGroup, { EnsembleRadioProps } from "../../../components/event/createUpdate/ensembleRadioGroup"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Formik } from "formik"
import { mockAdminWithEnsemble } from "../../../__mocks__/models/ensembleAdmin"

const mockProps: EnsembleRadioProps = {
  isSubmitting: false,
  fixingEnsembles: ["BBC Concert", "London Symphony"],
  adminEnsembleList: [mockAdminWithEnsemble]
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
    for (let i = 0; i < mockProps.adminEnsembleList.length; i++) {
      let ensembleInput = screen.getByLabelText(mockProps.adminEnsembleList[i].ensemble.name)
      expect(ensembleInput).toBeInTheDocument()
      expect(ensembleInput).toHaveAttribute("type", "radio")
      expect(ensembleInput).toHaveAttribute("name", "ensembleId")
      expect(ensembleInput).toHaveAttribute("value", mockProps.adminEnsembleList[i].ensembleId)
    }
  })
})


describe("<EnsembleRadioGroup />", () => {
  beforeEach(() => {
    const mockProps: EnsembleRadioProps = {
      isSubmitting: false,
      fixingEnsembles: ["BBC Concert", "London Symphony"],
      adminEnsembleList: []
    }
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props) => (
          <EnsembleRadioGroup {...mockProps} />
        )}
      </Formik>)
  })
  it("if no ensembles added, there is a helpful message and a link to create ensemble", () => {
    const noEnsembles = screen.getByText("No ensembles listed.")
    expect(noEnsembles).toBeInTheDocument()
    const helpText = screen.getByTestId("help-text")
    expect(helpText).toBeInTheDocument()
    expect(helpText.textContent).toMatch("To make an event, you first need to create an ensemble.")
    const ensembleLink = screen.getByTestId("create-ensemble-link")
    expect(ensembleLink).toBeInTheDocument()
    expect(ensembleLink.textContent).toMatch("create an ensemble")
    expect(ensembleLink).toHaveAttribute("href", "/ensembles/edit")
  })
})
