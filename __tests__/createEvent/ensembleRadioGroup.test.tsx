import "@testing-library/jest-dom"
import EnsembleRadioGroup, { EnsembleRadioProps } from "../../components/event/createEvent/ensembleRadioGroup"
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
  it("Renders", () => {
    const ensembleRadio = screen.getByTestId("ensemble-radio")
    expect(ensembleRadio).toBeInTheDocument()
  })
})