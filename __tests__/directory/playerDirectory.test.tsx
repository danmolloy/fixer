import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import PlayerDirectory, { PlayerDirectoryProps } from "../../components/directory/playerDirectory"
import { instrumentArr } from "../../components/fixing/fixing"
import { mockUser } from "../../__mocks__/models/user"
import { useRouter } from 'next/router'

jest.mock("next/router")

const mockProps: PlayerDirectoryProps = {
  data: [mockUser],
  setPageTitle: jest.fn()
}

describe("<PlayerDirectory />", () => {
  
  beforeEach(() => {
    render(<PlayerDirectory {...mockProps} />)
  })
  it("player-directory is in the document", () => {
    const playerDirectory = screen.getByTestId("player-directory")
    expect(playerDirectory).toBeInTheDocument()
  })

  it("if no instrument selected, 'please select instrument' text is in the document", () => {
    const helpBlurb = screen.getByText("Please select an instrument.")
    expect(helpBlurb).toBeInTheDocument()
  })
  it("select menu is in the document", async () => {
    const selectMenu = screen.getByTestId("directory-instrument-select-menu")
    expect(selectMenu).toBeInTheDocument()
  })

  it("router is updated to contain instrument name on instrument select", () => {})
  it("select menu has expect instrument list", () => {})
})

describe("<PlayerDirectory />", () => {
  const mockUserInstrument = mockUser.instrumentsList[Math.floor(Math.random() * mockUser.instrumentsList.length)]
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: {
        instrument: mockUserInstrument
      }
    })
    render(<PlayerDirectory {...mockProps} />)
  })
  it("selected instrument name is in the document", () => {
    const selectMenu = screen.getByTestId("directory-instrument-select-menu")
    expect(selectMenu.textContent).toMatch(mockUserInstrument)
  })
  it("corresponding musicians are found when instrument selected", async () => {
    for (let i = 0; i < mockProps.data.length; i++) {
      if (mockUser.instrumentsList.map(i => i.toLocaleLowerCase()).includes(instrumentArr[i].toLocaleLowerCase())) {
        let playerName = screen.getByText(`${mockProps.data[i].firstName} ${mockProps.data[i].lastName} `)
        expect(playerName).toBeInTheDocument()
      }
    }
  })
  it("toggle switch is in the document (when instrument selected) and toggles list to alphabetical/random", () => {
    const toggleSwitch = screen.getByTestId("toggle-switch")
    expect(toggleSwitch).toBeInTheDocument()
    expect(toggleSwitch.textContent).toMatch("Alphabetical")
  })
})

describe("<PlayerDirectory />", () => {
  const mockUserInstrument = mockUser.instrumentsList[Math.floor(Math.random() * mockUser.instrumentsList.length)]

  const mockProps: PlayerDirectoryProps = {
    data: undefined,
    setPageTitle: jest.fn()
  }
  beforeEach(() => {
    
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: {
        instrument: mockUserInstrument
      }
    })
    render(<PlayerDirectory {...mockProps} />)
  })
  it("if no data and instrument selected, loading tiles are in the document", () => {
    const loadingTiles = screen.getByTestId("loading-tiles")
    expect(loadingTiles).toBeInTheDocument()
  })

})