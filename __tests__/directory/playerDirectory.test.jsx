import { act, fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import PlayerDirectory from "../../components/directory/playerDirectory"
import { instrumentArr } from "../../components/fixing/fixing"
import { mockUser } from "../../__mocks__/models/user"



describe("PlayerDirectory component", () => {
  beforeEach(() => {
    render(<PlayerDirectory data={[mockUser]}/>)
  })
  it("Renders", () => {
    const PlayerDirectory = screen.getByTestId("player-directory-div")
    expect(PlayerDirectory).toBeInTheDocument()
  })
  it("All instruments are in the document", () => {
    const PlayerDirectory = screen.getByTestId("player-directory-div")
    for (let i = 0; i < instrumentArr.length; i ++) {
      expect(PlayerDirectory.textContent).toMatch(instrumentArr[i])
    }
  })
  it("Names are found under correct instrument", async () => {})
})
