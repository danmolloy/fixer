import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import EnsembleAdmin, { EnsembleAdminProps } from "../../../../components/users/settings/accountInfo/ensembleAdmin"
import { mockAdminWithEnsemble } from "../../../../__mocks__/models/ensembleAdmin"

const mockProps: EnsembleAdminProps = {
  ensembleAdminList: [mockAdminWithEnsemble]
}

describe("<EnsembleAdmin />", () => {
  beforeEach(() => {
    render(<EnsembleAdmin {...mockProps} />)
  })
  it("ensemble-admin is in the document", () => {
    const ensembleAdmin = screen.getByTestId("ensemble-admin")
    expect(ensembleAdmin).toBeInTheDocument()
  })
  it("header, fixer help and player help text is in the document", () => {
    const header = screen.getByText("Ensembles You Fix")
    expect(header).toBeInTheDocument()
    const fixerHelp = screen.getByText("Add ensembles you fix to save time and keep consistency in your bookings.")
    expect(fixerHelp).toBeInTheDocument()
    const playerHelp = screen.getByText("If you are a player only, leave this section blank.")
    expect(playerHelp).toBeInTheDocument()
  })

  it("current-ensembles div is in the document", () => {
    const currentEnsembles = screen.getByTestId("current-ensembles")
    expect(currentEnsembles).toBeInTheDocument()
  })
  it("current-ensembles has title 'Current Ensembles'", () => {
    const title = screen.getByText("Current Ensembles")
    expect(title).toBeInTheDocument()
  })
  it("current-ensembles has list of ensembles user fixes, with ensemble name and position title", () => {
    for (let i = 0; i < mockProps.ensembleAdminList.length; i++) {
      const ensemble = screen.getByTestId(`ensemble-${mockProps.ensembleAdminList[i].id}`)
      expect(ensemble).toBeInTheDocument()
      expect(ensemble.textContent).toMatch(mockProps.ensembleAdminList[i].positionTitle)
      expect(ensemble.textContent).toMatch(mockProps.ensembleAdminList[i].ensemble.name)
    }
  })
  it("if no current ensembles, there is a helpful message", () => {})
  it("add ensemble link is in the document with expected href and text", () => {
    const addEnsembleLink = screen.getByText("Add Ensemble")
    expect(addEnsembleLink).toBeInTheDocument()
    expect(addEnsembleLink).toHaveAttribute("href", "/ensembles/edit")
  })
})

describe("<EnsembleAdmin />", () => {
  beforeEach(() => {
    render(<EnsembleAdmin ensembleAdminList={[]} />)
  })

  it("if no current ensembles, there is a helpful message", () => {
    const noEnsembles = screen.getByText("You have no ensembles currently listed.")
    expect(noEnsembles).toBeInTheDocument()
  })
})