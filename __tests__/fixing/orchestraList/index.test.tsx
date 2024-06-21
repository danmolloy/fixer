import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import OrchestraList, { OrchestraListProps } from "../../../components/fixing/orchestraList"
import { mockEventSection, mockEventSectionWithMusicians } from "../../../__mocks__/models/eventSection"
import { mockSection } from "../../../__mocks__/models/ensembleSection"
import { mockContactMessageForTable } from "../../../__mocks__/models/contactMessage"

const mockProps: OrchestraListProps = {
  setViewList: jest.fn(),
  instrumentSections: [{...mockEventSection,
    ensembleSection: mockSection,
    contacts: [mockContactMessageForTable]
  }]
}

describe("<OrchestraList />", () => {
  beforeEach(() => {
    render(<OrchestraList {...mockProps} />)
  })
  it("orchestra-list-view is in the document", () => {
    const orchestraList = screen.getByTestId("orchestra-list-view")
    expect(orchestraList).toBeInTheDocument()
  })
  it("Each instrument which has numToBook > 0 is in the document with instrumentName & booked players", () => {
    const activeSections = mockProps.instrumentSections.filter(i => i.numToBook > 0)
    for (let i = 0; i < activeSections.length; i++) {
      const instrumentSection = screen.getByTestId(`${mockProps.instrumentSections[i].id}-section`)
      expect(instrumentSection).toBeInTheDocument()
      expect(instrumentSection.textContent).toMatch(mockProps.instrumentSections[i].ensembleSection.name)
      for (let j = 0; j < activeSections[i].contacts.length; j++) {
        if(activeSections[i].contacts[j].accepted === true) {
          const musician = screen.getByText(`${activeSections[i].contacts[j].contact.firstName} ${mockProps.instrumentSections[i].contacts[j].contact.lastName}`)
          expect(musician).toBeInTheDocument()
        }
      }
    }
  })
})

describe("<OrchestraList />", () => {
  const mockProps: OrchestraListProps = {
    setViewList: jest.fn(),
    instrumentSections: [{...mockEventSection,
      ensembleSection: mockSection,
      contacts: [mockContactMessageForTable],
      numToBook: 12
    }]
  }
  beforeEach(() => {
    render(<OrchestraList {...mockProps} />)
  })
  it("For each empty seat, TBC is in the document", () => {
    const unknownPlayer = screen.getAllByText("TBC")
    const bookedPlayers = mockProps.instrumentSections[0].contacts.filter(i => i.accepted === true).length
    expect(unknownPlayer.length).toEqual(mockProps.instrumentSections[0].numToBook - bookedPlayers)
})
})