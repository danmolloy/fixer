import "@testing-library/jest-dom"
import { render, screen, act, fireEvent } from "@testing-library/react"
import PlayerMenu, { PlayerMenuProps } from "../../../../components/event/eventDetail/menu/playerMenu"
import { mockEventWithCalls } from "../../../../__mocks__/models/event"

const mockProps: PlayerMenuProps = {
  event: mockEventWithCalls
}

describe("<PlayerMenu />", () => {
  beforeEach(() => {
    render(<PlayerMenu {...mockProps} />)
  })
  it("player-menu is in the document", () => {
    const playerMenu = screen.getByTestId("player-menu")
    expect(playerMenu).toBeInTheDocument()
  })
  it("request parts btn is in the document", () => {
    const partsBtn = screen.getByTestId("request-parts-btn")
    expect(partsBtn).toBeInTheDocument()
    expect(partsBtn.textContent).toMatch(/^Request Practice Parts$/)

  })
  it("contact fixer btn is in the document", () => {
    const contactFixerBtn = screen.getByTestId("contact-fixer-btn")
    expect(contactFixerBtn).toBeInTheDocument()
    expect(contactFixerBtn.textContent).toMatch(/^Contact Fixer$/)

  })
  it("export to calendar btn is in the document", () => {
    const addToCalendarBtn = screen.getByTestId("add-to-calendar-btn")
    expect(addToCalendarBtn).toBeInTheDocument()
    expect(addToCalendarBtn.textContent).toMatch(/^Export to Calendar$/)

  })
  it("request to dep btn is in the document", () => {
    const depRequestBtn = screen.getByTestId("dep-request-btn")
    expect(depRequestBtn).toBeInTheDocument()
    expect(depRequestBtn.textContent).toMatch(/^Request to Dep$/)
  })
  console.log("<playerMenu /> has no functionality!")
})