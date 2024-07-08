import EnsembleDashboard, { EnsembleDashboardProps } from "../../../app/ensembles/dashboard";
import "@testing-library/jest-dom";
import { fireEvent, act, screen, render } from "@testing-library/react";


describe("<EnsembleDashboard />", () => {
  const mockProps: EnsembleDashboardProps = {
    addContact: jest.fn(),
    sortContacts: "Alphabetical",
    setSortContacts: jest.fn(),
    filterContacts: ["Member"],
    setFilterContacts: jest.fn(),
    ensembleId: 'mockId'
  }
  beforeEach(() => {
    render(<EnsembleDashboard {...mockProps} />)
  })

  it("<EnsembleDashboard /> is in the document", () => {
    const ensembleDash = screen.getByTestId("ensemble-dashboard")
    expect(ensembleDash).toBeInTheDocument()
  })
  it("'Sort Contacts' label is in the document", () => {
    const sortContacts = screen.getByText("Sort Contacts")
    expect(sortContacts).toBeInTheDocument()
  })
  it("'Alphabetical' sort input is in the document with expected type, value, label and checked status", () => {
    const alphabeticalCheckbox = screen.getByLabelText("Alphabetical")
    expect(alphabeticalCheckbox).toBeInTheDocument()
    expect(alphabeticalCheckbox).toHaveAttribute("type", "radio")
    expect(alphabeticalCheckbox).toHaveAttribute("checked")
  })
  it("'Alphabetical sort checkbox calls sortContacts('Alphabetical') on click'", () => {
    const alphabeticalCheckbox = screen.getByLabelText("Alphabetical")
    act(() => {
      fireEvent.click(alphabeticalCheckbox)
    })
    expect(mockProps.setSortContacts).not.toHaveBeenCalledWith("Alphabetical")
  })
  it("'Sections' sort is in the document with expected type, value, label and checked status", () => {
    const sectionsCheckbox = screen.getByLabelText("Sections")
    expect(sectionsCheckbox).toBeInTheDocument()
    expect(sectionsCheckbox).toHaveAttribute("type", "radio")
    expect(sectionsCheckbox).not.toHaveAttribute("checked")
  })
  it("'Sections sort checkbox calls sortContacts('Sections') on click'", () => {
    const sectionsCheckbox = screen.getByLabelText("Sections")
    act(() => {
      fireEvent.click(sectionsCheckbox)
    })
    expect(mockProps.setSortContacts).toHaveBeenCalledWith("Sections")
  })
  it("'Filter Contacts' label is in the document", () => {
    const filterContacts = screen.getByText("Filter:")
    expect(filterContacts).toBeInTheDocument()
  })
  it("'Members' filter is in the document with label, type and correct checked status", () => {
    const memberFilter = screen.getByLabelText("Members")
    expect(memberFilter).toBeInTheDocument()
    expect(memberFilter).toHaveAttribute("type", "checkbox")
  })
  it("'Members' radiobox calls setFilterContacts('Member') on click", () => {
    const memberFilter = screen.getByLabelText("Members")
    act(() => {
      fireEvent.click(memberFilter)
    })
    expect(mockProps.setFilterContacts).toHaveBeenCalledWith("Member")
  })
  it("'Extras' filter is in the document with label, type and correct checked status", () => {
    const extraFilter = screen.getByLabelText("Extras")
    expect(extraFilter).toBeInTheDocument()
    expect(extraFilter).toHaveAttribute("type", "checkbox")
  })
  it("'Extras' radiobox calls setFilterContacts('Extra') on click", () => {
    const extraFilter = screen.getByLabelText("Extras")
    act(() => {
      fireEvent.click(extraFilter)
    })
    expect(mockProps.setFilterContacts).toHaveBeenCalledWith("Extra")
  })
  it("'Import from CSV' link is in the document with expected href", () => {
    const importContacts = screen.getByText("Import from CSV")
    expect(importContacts).toBeInTheDocument()
    expect(importContacts).toHaveAttribute("href", `/ensembles/${mockProps.ensembleId}/contacts/import`)
  })
  it("'Add Contact' btn is in the document and calls addContact() on click", () => {
    const addContact = screen.getByText("Add Contact")
    expect(addContact).toBeInTheDocument()
    act(() => {
      fireEvent.click(addContact)
    })
    expect(mockProps.addContact).toHaveBeenCalled()
  })
  it("'Invite Admin' link is in the document with expect href", () => {
    const invite = screen.getByText("Invite Admin")
    expect(invite).toBeInTheDocument()
    expect(invite).toHaveAttribute("href", `/ensembles/${mockProps.ensembleId}/admin/invite`)
  })
})

describe("<EnsembleDashboard />", () => {
  const mockProps: EnsembleDashboardProps = {
    addContact: jest.fn(),
    sortContacts: "Sections",
    setSortContacts: jest.fn(),
    filterContacts: ["Member"],
    setFilterContacts: jest.fn(),
    ensembleId: 'mockId'
  }
  beforeEach(() => {
    render(<EnsembleDashboard {...mockProps} />)
  })
  it("'Alphabetical' sort input is in the document with expected type, value, label and checked status", () => {
    const alphabeticalCheckbox = screen.getByLabelText("Alphabetical")
    expect(alphabeticalCheckbox).toBeInTheDocument()
    expect(alphabeticalCheckbox).toHaveAttribute("type", "radio")
    expect(alphabeticalCheckbox).not.toHaveAttribute("checked")
  })
  it("'Alphabetical sort checkbox calls sortContacts('Alphabetical') on click'", () => {
    const alphabeticalCheckbox = screen.getByLabelText("Alphabetical")
    act(() => {
      fireEvent.click(alphabeticalCheckbox)
    })
    expect(mockProps.setSortContacts).toHaveBeenCalledWith("Alphabetical")
  })
  it("'Sections' sort is in the document with expected type, value, label and checked status", () => {
    const sectionsCheckbox = screen.getByLabelText("Sections")
    expect(sectionsCheckbox).toBeInTheDocument()
    expect(sectionsCheckbox).toHaveAttribute("type", "radio")
    expect(sectionsCheckbox).toHaveAttribute("checked")
  })
  it("'Sections sort checkbox calls sortContacts('Sections') on click'", () => {
    const sectionsCheckbox = screen.getByLabelText("Sections")
    act(() => {
      fireEvent.click(sectionsCheckbox)
    })
    expect(mockProps.setSortContacts).not.toHaveBeenCalledWith("Sections")
  })
}) 