import { act, fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import PlayerDirectory from "../../components/directory/playerDirectory"
import { instrumentArr } from "../../components/fixing/fixing"

const mockData = [
  {
    name: "Eoghan Kelly",
    instrument: "Trombone",
    email: "firkin@gmail.com"
  }
]


describe("PlayerDirectory component", () => {
  beforeEach(() => {
    render(<PlayerDirectory data={mockData}/>)
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
  it("Names are found under correct instrument", async () => {
    for (let i = 0; i < mockData.length; i ++) {
      const instrumentDiv = screen.getByTestId(`${mockData[i].instrument}-directory`)
      const instrumentBtn = screen.getByTestId(`${mockData[i].instrument}-header-btn`)
      expect(instrumentBtn).toBeInTheDocument()
      act(() => {
        fireEvent.click(instrumentBtn)
      })
      expect(instrumentDiv.textContent).toMatch(mockData[i].name)
    }
  
  })

})
