import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import PlayerTile from "../../components/directory/playerTile"
import { mockUser } from "../../__mocks__/models/user"


describe("PlayerTile component", () => {
  beforeEach(() => {
    render(<PlayerTile player={mockUser}/>)
  })
  it("Renders", () => {
    const playerTile = screen.getByTestId("player-tile-div")
    expect(playerTile).toBeInTheDocument()
  })


  it("Player tile has name", () => {
    const playerTile = screen.getByTestId("player-tile-div")
    expect(playerTile.textContent).toMatch(mockUser.name)
  })

  it("Player tile has instrument", () => {
    const playerTile = screen.getByTestId("player-tile-div")
    expect(playerTile.textContent).toMatch(mockUser.instrument)
  })

  it("Player tile has profile picture", () => {
    const playerImg = screen.getByTestId("player-img")
    expect(playerImg).toBeInTheDocument()
  })


  it("Contact button exists", () => {
    const contactBtn = screen.getByTestId("player-contact-btn")
    expect(contactBtn).toBeInTheDocument()
  })
  it("Profile button exists", () => {
    const profileBtn = screen.getByTestId("view-profile-btn")
    expect(profileBtn).toBeInTheDocument()
  })

})
