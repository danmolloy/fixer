import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import OrchestraList, { OrchestraListProps } from "../../../components/fixing/orchestraList"
import { mockEventInstrumentWithMAndM } from "../../../__mocks__/models/eventInstrument"

const mockProps: OrchestraListProps = {
  setViewList: jest.fn(),
  instrumentSections: [mockEventInstrumentWithMAndM]
}

describe("<OrchestraList />", () => {
  beforeEach(() => {
    render(<OrchestraList {...mockProps} />)
  })
  it("Each instrument which has numToBook > 0 is in the document with instrumentName & booked players", () => {
    const activeSections = mockProps.instrumentSections.filter(i => i.numToBook > 0)
    for (let i = 0; i < activeSections.length; i++) {
      const instrumentSection = screen.getByTestId(`${activeSections[i].instrumentName}-section`)
      expect(instrumentSection).toBeInTheDocument()
      expect(instrumentSection.textContent).toMatch(activeSections[i].instrumentName)
      for (let j = 0; j < activeSections[i].musicians.length; j++) {
        if(activeSections[i].musicians[j].accepted === true) {
          const musician = screen.getByText(`${activeSections[i].musicians[j].musician.firstName} ${activeSections[i].musicians[j].musician.lastName}`)
          expect(musician).toBeInTheDocument()
        }
      }
    }
  })
})

describe("<OrchestraList />", () => {
  const mockProps: OrchestraListProps = {
    setViewList: jest.fn(),
    instrumentSections: [{
      ...mockEventInstrumentWithMAndM,
      numToBook: 12
    }]
  }
  beforeEach(() => {
    render(<OrchestraList {...mockProps} />)
  })
  it("For each empty seat, TBC is in the document", () => {
    const unknownPlayer = screen.getAllByText("TBC")
    const bookedPlayers = mockProps.instrumentSections[0].musicians.filter(i => i.accepted === true).length
    expect(unknownPlayer.length).toEqual(mockProps.instrumentSections[0].numToBook - bookedPlayers)
})
})