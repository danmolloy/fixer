import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import EnsembleDashboard, { EnsembleDashboardProps } from "../../../app/ensembles/dashboard"

const mockProps: EnsembleDashboardProps = {
  addContact: jest.fn(),
  sortContacts: "Alphabetical",
  setSortContacts: jest.fn(),
  filterContacts: ["Extra"],
  setFilterContacts: jest.fn()
}

describe("<EnsembleDashboard />", () => {
  beforeEach(() => {
    render(<EnsembleDashboard {...mockProps} />)
  })
  it("ensemble-dashboard is in the document", () => {
    const ensembleDashboard = screen.getByTestId("ensemble-dashboard")
    expect(ensembleDashboard).toBeInTheDocument()
  })
  it("add contact btn is in the document", () => {
    const addBtn = screen.getByText("Add Contact")
    expect(addBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(addBtn)
    })
    expect(mockProps.addContact).toHaveBeenCalled()
  })
  it("<SelectMenu /> is in the document with expected vals", () => {})
  it("Members checkbox is in the document with label & calls setFilterContacts with expected arg", () => {
    const membersBox = screen.getByLabelText("Members")
    expect(membersBox).toBeInTheDocument()
    act(() => fireEvent.click(membersBox))
    expect(mockProps.setFilterContacts).toHaveBeenCalledWith("Member")
  })
  it("Extras checkbox is in the document with label & calls setFilterContacts with expected arg", () => {
    const extrasBox = screen.getByLabelText("Extras")
    expect(extrasBox).toBeInTheDocument()
    act(() => fireEvent.click(extrasBox))
    expect(mockProps.setFilterContacts).toHaveBeenCalledWith("Extra")
  })
})