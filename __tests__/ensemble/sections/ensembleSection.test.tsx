import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import EnsembleSection, { EnsembleSectionProps } from "../../../components/ensemble/sections/ensembleSection"
import { mockSectionWithPlayers } from "../../../__mocks__/models/ensembleSection"

const mockProps: EnsembleSectionProps = {
  section: mockSectionWithPlayers
}

describe("<EnsembleSection />", () => {
  beforeEach(() => {
    render(<EnsembleSection {...mockProps} />)
  })
  it("ensemble-section is in the document", () => {
    const ensembleSection = screen.getByTestId("ensemble-section")
    expect(ensembleSection).toBeInTheDocument()
  })
  it("section name is in the document", () => {
    const sectionName = screen.getByText(mockProps.section.name)
    expect(sectionName).toBeInTheDocument()
  })
  it("lists all full members in section with title", () => {
    const sectionMembers = screen.getByTestId("section-members")
    expect(sectionMembers).toBeInTheDocument()
    for (let i = 0; i < mockProps.section.members.length; i ++) {
      let sectionMember = screen.getByText(`${mockProps.section.members[i].user.firstName} ${mockProps.section.members[i].user.lastName}`)
      expect(sectionMember).toBeInTheDocument()
    }
  })
  it("lists extras in sections with links to profile", () => {
    const extraPlayers = screen.getByTestId("section-extras")
    expect(extraPlayers).toBeInTheDocument()
    for (let i = 0; i < mockProps.section.extras.length; i ++) {
      let extraPlayer = screen.getByText(`${mockProps.section.extras[i].user.firstName} ${mockProps.section.extras[i].user.lastName}`)
      expect(extraPlayer).toBeInTheDocument()
    }
  })
  

  it("if admin or principal, ability to add more players to the section", () => {})

})