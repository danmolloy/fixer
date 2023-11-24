import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import ExtraPlayers, { ExtraPlayersProps } from "../../../../components/fixing/instrument/ensembleMembers/extraPlayers"
import { mockEnsembleMemberWithUser } from "../../../../__mocks__/models/ensembleMember"

describe("<ExtraPlayers />", () => {
  const mockProps: ExtraPlayersProps = {
    extras: [mockEnsembleMemberWithUser],
    setSelectExtra: jest.fn()
  }
  beforeEach(() => {
    render(<ExtraPlayers {...mockProps} />)
  })
  
  it("extra-players is in the document", () => {
    const extraPlayers = screen.getByTestId("extra-players")
    expect(extraPlayers).toBeInTheDocument()
  })
  it("'Extras' title is in the document", () => {
    const title = screen.getByText("Extra Players")
    expect(title).toBeInTheDocument()
  })
  it("all extras have tiles in the document", () => {
    for (let i = 0; i < mockProps.extras.length; i++) {
      let extraPlayer = screen.getByText(`${mockProps.extras[i].user.firstName} ${mockProps.extras[i].user.lastName}`)
      expect(extraPlayer).toBeInTheDocument()
    }
  })
})

describe("<ExtraPlayers />", () => {
  const mockProps: ExtraPlayersProps = {
    extras: [],
    setSelectExtra: jest.fn()
  }
  beforeEach(() => {
    render(<ExtraPlayers {...mockProps} />)
  })
  it("if there are no extraPlayers, it states so", () => {
    const extraPlayers = screen.getByTestId("extra-players")
    expect(extraPlayers.textContent).toMatch("No extra players on your list.")
    expect(extraPlayers.textContent).toMatch("Add them via Ensemble Page or find players in the directory.")

  })
})
