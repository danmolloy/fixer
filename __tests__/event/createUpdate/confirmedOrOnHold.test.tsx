import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import ConfirmedOrOnHold, { CoohProps } from "../../../components/event/createUpdate/confirmedOrOnHold"
import { Formik } from "formik"

const mockProps: CoohProps = {
  setConfirmedOrOnHold: jest.fn(),
  confirmedOrOnHold: Math.random() > .5 ? "Confirmed" : "On Hold"
}

describe("<ConfirmedOrOnHold />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props) => (
          <ConfirmedOrOnHold {...mockProps} />
        )}
      </Formik>)
  })
  it("confirmed-or-on-hold is in the document with expected name attr", () => {
    const confirmedOrOnHoldDiv = screen.getByLabelText("Gig Status")
    expect(confirmedOrOnHoldDiv).toBeInTheDocument()
  })
  it("confirmed option is in the document with label and value", () => {
    const confirmed = screen.getByTestId("confirmed-toggle")
    expect(confirmed).toBeInTheDocument()
    expect(confirmed).toHaveAttribute("value", "Confirmed")
    expect(confirmed).toHaveAttribute("name", "confirmedOrOnHold")

  })
  it("on hold option is in the document with label and value", () => {
    const onHold = screen.getByTestId("on-hold-toggle")
    expect(onHold).toBeInTheDocument()
    expect(onHold).toHaveAttribute("value", "On Hold")
    expect(onHold).toHaveAttribute("name", "confirmedOrOnHold")
  })
})

describe("", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({errors: {}}) => (
          <ConfirmedOrOnHold {...mockProps} />
        )}
      </Formik>)
  })
  it("expected error message is in the document", () => {
    const errorMsg = screen.getByTestId("confirmed-or-on-hold-div")
    expect(errorMsg).toBeInTheDocument()
  })
})