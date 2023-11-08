import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import FixingEnsembles, { FixingEnsembleProps } from "../../../../components/users/settings/accountInfo/fixingEnsembles"
import { Formik } from "formik"

const mockProps: FixingEnsembleProps = {
  ensemblesList: ["London Symphony Orchestra"]
}

describe("<FixingEnsembles />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <FixingEnsembles {...mockProps} />
        )}
      </Formik>
    )
  })
  it("fixing-ensembles is in the document", () => {
    const fixingEnsembles = screen.getByTestId("fixing-ensembles")
    expect(fixingEnsembles).toBeInTheDocument()
  })
  it("header, fixer help and player help text is in the document", () => {
    const header = screen.getByText("Ensembles You Fix")
    expect(header).toBeInTheDocument()
    const fixerHelp = screen.getByText("Add ensembles you fix to save time and keep consistency in your bookings.")
    expect(fixerHelp).toBeInTheDocument()
    const playerHelp = screen.getByText("If you are a player only, leave this section blank.")
    expect(playerHelp).toBeInTheDocument()
  })
  it("list of orchestras user fixes is in the document", () => {
    const currentEnsembles = screen.getByTestId("fixing-ensembles-list")
    expect(currentEnsembles).toBeInTheDocument()
    for (let i = 0; i < mockProps.ensemblesList.length; i ++) {
      expect(currentEnsembles.textContent).toMatch(mockProps.ensemblesList[i])
    }
  })
  it("text input with label is in the document", () => {
    const addEnsemble = screen.getByLabelText("Add Ensemble")
    expect(addEnsemble).toBeInTheDocument()
    expect(addEnsemble).toHaveAttribute("type", "text")
  })
  it("Add btn is in the document", () => {
    const addBtn = screen.getByTestId("add-btn")
    expect(addBtn).toBeInTheDocument()
    expect(addBtn.textContent).toMatch(/^Add$/)
  })
  //it("add btn appends orchestra name on click", () => {})
})

describe("<FixingEnsembles />", () => {
  const mockProps: FixingEnsembleProps = {
    ensemblesList: ["London Symphony Orchestra"]
  }
  beforeEach(() => {
    render( 
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => (
        <FixingEnsembles {...mockProps} />
      )}
    </Formik>)
  })
  it("if no ensembles listed, it states so", () => {
    if (mockProps.ensemblesList.length === 0) {
      const noEnsembles = screen.getByText("You have no ensembles currently listed.")
      expect(noEnsembles).toBeInTheDocument()
    }
  })
})