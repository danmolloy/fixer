import "@testing-library/jest-dom"
import EnsembleManagement from "../../../app/ensembles/admin"
import { render, screen } from "@testing-library/react"

describe("<EnsembleManagement />", () => {
  beforeEach(() => {
    render(<EnsembleManagement />)
  })
  it("ensemble-management is in the document", () => {
    const ensembleManagement = screen.getByTestId("ensemble-management")
    expect(ensembleManagement).toBeInTheDocument()
  })
})