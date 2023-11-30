import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import EnsembleSections, { EnsembleSectionsProps } from "../../../components/ensemble/sections"
import { mockSectionWithPlayersAndBulletins } from "../../../__mocks__/models/ensembleSection"

/* 

What is the purpose of this section of the ensemble page?
- To manage lists of members and extras.
- To contact the players. 
This functionality isn't yet there, it's currently just organised lists.

*/

const mockProps: EnsembleSectionsProps = {
  sections: [mockSectionWithPlayersAndBulletins]
}

describe("<EnsembleSections />", () => {
  beforeEach(() => {
    render(<EnsembleSections {...mockProps} />)
  })
  it("ensemble-sections is in the document", () => {
    const ensembleSections = screen.getByTestId("ensemble-sections")
    expect(ensembleSections).toBeInTheDocument()
  })
  it("all sections are in the document", () => {
    for (let i = 0; i < mockProps.sections.length; i++) {
      const section = screen.getByText(mockProps.sections[i].name)
      expect(section).toBeInTheDocument()
    }
  })
})