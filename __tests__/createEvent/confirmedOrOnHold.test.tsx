import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import ConfirmedOrOnHold, { CoohProps } from "../../components/event/createEvent/confirmedOrOnHold"
import { Formik } from "formik"

const mockProps: CoohProps = {
  setConfirmedOrOnHold: jest.fn(),
  confirmedOrOnHold: Math.random() > .5 ? "Confirmed" : "On Hold"
}

describe("ConfirmedOrOnHold component", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props) => (
          <ConfirmedOrOnHold {...mockProps} />
        )}
      </Formik>)
  })
  it("Renders", () => {
    const confirmedOrOnHoldDiv = screen.getByTestId("confirmed-or-on-hold-div")
    expect(confirmedOrOnHoldDiv).toBeInTheDocument()
  })
})