import "@testing-library/jest-dom"
import EnsembleRadioGroup, { EnsembleRadioProps } from "../../../components/event/createUpdate/ensembleRadioGroup"
import { render, screen } from "@testing-library/react"
import { Formik } from "formik"

const mockProps: EnsembleRadioProps = {
  isSubmitting: false,
  ensemble: "TechDeck",
  ensembleName: "Tony Hawk",
  handleChange: jest.fn(),
  handleBlur: jest.fn()
}

describe("EnsembleRadioGroup component", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props) => (
          <EnsembleRadioGroup {...mockProps} />
        )}
      </Formik>)
  })
  it("ensemble-radio is in the document with name attr", () => {
    const ensembleRadio = screen.getByTestId("ensemble-radio")
    expect(ensembleRadio).toBeInTheDocument()
    expect(ensembleRadio).toHaveAttribute("name", "")
  })
  it("all ensembles are in the document with correct label and value", () => {})
})