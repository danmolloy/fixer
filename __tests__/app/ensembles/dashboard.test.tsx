import EnsembleDashboard, { EnsembleDashboardProps } from "../../../app/ensembles/dashboard";
import "@testing-library/jest-dom";
import { fireEvent, act, screen, render } from "@testing-library/react";

global.focus = jest.fn();

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
  it("options btn is in the document and renders menu on click", () => {
    const optionsBtn = screen.getByText("Options")
    expect(optionsBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const optionsMenu = screen.getByTestId("options-menu")
    expect(optionsMenu).toBeInTheDocument()
  })
  it("option menu contains 'Create Contact', 'Import Contacts' & 'Edit Ensemble'", () => {
    const optionsBtn = screen.getByText("Options")
    expect(optionsBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const editLink = screen.getByText("Edit Ensemble")
    expect(editLink).toBeInTheDocument()
    expect(editLink).toHaveAttribute("href", `ensembles/update/${mockProps.ensembleId}`)

    const importContacts = screen.getByText("Import Contacts")
    expect(importContacts).toBeInTheDocument()
    expect(importContacts).toHaveAttribute("href", `/ensembles/${mockProps.ensembleId}/contacts/import`)

    const addContact = screen.getByText("Create Contact")
    expect(addContact).toBeInTheDocument()
    act(() => {
      fireEvent.click(addContact)
    })
    expect(mockProps.addContact).toHaveBeenCalled()

  })
  
  it("contact sorting select menu is in the document with options Alphabetical and Sections", () => {
     const contactSort = screen.getByTestId("contact-sort-select")
     expect(contactSort).toBeInTheDocument()
     expect(contactSort).toHaveValue("Alphabetical")
     expect(contactSort.textContent).toMatch("Alphabetical")
     expect(contactSort.textContent).toMatch("Sections")
    const alphabeticalOption = screen.getByTestId("alphabetical-option")
    expect(alphabeticalOption).toBeInTheDocument()
    expect(alphabeticalOption).toHaveTextContent("Alphabetical")
    expect(alphabeticalOption).toHaveValue("Alphabetical")
    const sectionsOption = screen.getByTestId("sections-option")
    expect(sectionsOption).toBeInTheDocument()
    expect(sectionsOption).toHaveTextContent("Sections")
    expect(sectionsOption).toHaveValue("Sections")

  })
  it("filters btn is in the document and renders filters menu on click", () => {
    const filtersBtn = screen.getByText("Filters")
    expect(filtersBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(filtersBtn)
    })
    const filtersMenu = screen.getByTestId("filters-menu")
    expect(filtersMenu).toBeInTheDocument()
  })
  it("filters menu contains members filters", () => {
    const filtersBtn = screen.getByText("Filters")
      expect(filtersBtn).toBeInTheDocument()
      act(() => {
        fireEvent.click(filtersBtn)
      })
      const memberFilter = screen.getByLabelText("Members")
      expect(memberFilter).toBeInTheDocument()
      expect(memberFilter).toHaveAttribute("type", "checkbox")
      act(() => {
        fireEvent.click(memberFilter)
      })
      expect(mockProps.setFilterContacts).toHaveBeenCalledWith("Member")
  
  })
  it("filters menu contains extras filter", () => {
    const filtersBtn = screen.getByText("Filters")
      expect(filtersBtn).toBeInTheDocument()
      act(() => {
        fireEvent.click(filtersBtn)
      })
      const memberFilter = screen.getByLabelText("Extras")
      expect(memberFilter).toBeInTheDocument()
      expect(memberFilter).toHaveAttribute("type", "checkbox")
      act(() => {
        fireEvent.click(memberFilter)
      })
      expect(mockProps.setFilterContacts).toHaveBeenCalledWith("Extra")
  
  })
})
