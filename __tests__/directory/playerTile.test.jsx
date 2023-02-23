import { act, fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import PlayerTile from "../../components/directory/playerTile"
import { instrumentArr } from "../../components/fixing/fixing"

const mockPlayer = {"id":"cl5jltw9i0177t6u0at4zsqd3","name":"Darnell Graham","email":"Abelardo_Vandervort71@hotmail.com","emailVerified":null,"image":null,"instrument":"Trombone","profileInfo":null,"isFixer":null}

describe("PlayerTile component", () => {
  beforeEach(() => {
    render(<PlayerTile player={mockPlayer}/>)
  })
  it("Renders", () => {
    const playerTile = screen.getByTestId("player-tile-div")
    expect(playerTile).toBeInTheDocument()
  })


  it("Player tile has name", () => {
    const playerTile = screen.getByTestId("player-tile-div")
    expect(playerTile.textContent).toMatch(mockPlayer.name)
  })

  it("Player tile has instrument", () => {
    const playerTile = screen.getByTestId("player-tile-div")
    expect(playerTile.textContent).toMatch(mockPlayer.instrument)
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
