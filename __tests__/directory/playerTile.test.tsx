import { act, fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import PlayerTile from "../../components/directory/playerTile"
import { mockUser } from "../../__mocks__/models/user"


describe("PlayerTile component", () => {
  beforeEach(() => {
    render(<PlayerTile player={mockUser}/>)
  })
  it("player-tile is in the document", () => {
    const playerTile = screen.getByTestId("player-tile-div")
    expect(playerTile).toBeInTheDocument()
  })
  it("player name is in the document", () => {
    const playerTile = screen.getByTestId("player-tile-div")
    expect(playerTile.textContent).toMatch(mockUser.name)
  })

  it("player instrument is in the document", () => {
    const playerTile = screen.getByTestId("player-tile-div")
    expect(playerTile.textContent).toMatch(mockUser.instrument)
  })

  it("player profile picture is in the document", () => {
    const playerImg = screen.getByTestId("player-img")
    expect(playerImg).toBeInTheDocument()
  })
  it("contact btn is in the document", () => {
    const contactBtn = screen.getByTestId("player-contact-btn")
    expect(contactBtn).toBeInTheDocument()
  })
  it("profile link is in the document with expect href", () => {
    const profileBtn = screen.getByTestId("player-profile-link")
    expect(profileBtn).toBeInTheDocument()
    expect(profileBtn.textContent).toMatch("Profile")
    expect(profileBtn).toHaveAttribute("href", `/user/${mockUser.id}`)
  })
  it("contact btn shows contact info on click", () => {
    const contactBtn = screen.getByTestId("player-contact-btn")
    act(() => {
      fireEvent.click(contactBtn)
    })
    const contactInfo = screen.getByTestId("contact-info")
    expect(contactInfo).toBeInTheDocument()
  })

})
