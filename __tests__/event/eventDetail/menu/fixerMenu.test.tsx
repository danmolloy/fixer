import "@testing-library/jest-dom"
import { render, screen, act, fireEvent } from "@testing-library/react"
import FixerMenu, { FixerMenuProps } from "../../../../components/event/eventDetail/menu/fixerMenu"
import { mockEventWithCalls } from "../../../../__mocks__/models/event"
import axios from "axios"
import { mockMessage } from "../../../../__mocks__/models/messages"

const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: FixerMenuProps = {
  event: mockEventWithCalls
}

describe("<FixerMenu />", () => {
  const fixerMsg = mockMessage
  beforeEach(() => {
    window.prompt = jest.fn().mockReturnValue(fixerMsg)
    render(<FixerMenu {...mockProps} />)
  })

  it("fixer-menu is in the document", () => {
    const fixerMenu = screen.getByTestId("fixer-menu")
    expect(fixerMenu).toBeInTheDocument()
  })
  it("message all btn is in the document and calls axios with expected args", () => {
    const msgAll = screen.getByText("Message All")
    expect(msgAll).toBeInTheDocument()
    act(() => {
      fireEvent.click(msgAll)
    })
    expect(axios.post).toHaveBeenCalledWith("/api/event/msgAllPlayers", {
      eventId: mockProps.event.id,
      message: 
      `Dan Molloy sends the following message to all players of Event ${mockProps.event.id}: 
      "${fixerMsg}"`
    })
  })
  it("edit event link is in the document with expected href value", () => {
    const editEventLink = screen.getByTestId("edit-event-link")
    expect(editEventLink).toBeInTheDocument()
    expect(editEventLink).toHaveAttribute("href", `/event/edit/${mockProps.event.id}`)
    expect(editEventLink.textContent).toMatch(/^Edit Event$/)
  })
  it("export event to csv btn is in the document", () => {
    const exportBtn = screen.getByTestId("export-event-btn")
    expect(exportBtn).toBeInTheDocument()
    expect(exportBtn.textContent).toMatch(/^Export Event Details$/)
  })
  it("export orchestra list to csv btn is in the document", () => {
    const exportBtn = screen.getByTestId("export-orchestra-btn")
    expect(exportBtn).toBeInTheDocument()
    expect(exportBtn.textContent).toMatch(/^Export Orchestra List$/)
  })
  it("cancel event btn is in the document and calls axios with expected args", async () => {
    const cancelBtn = screen.getByTestId("cancel-event-btn")
    expect(cancelBtn).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(cancelBtn)
    })
    expect(axios.post).toHaveBeenCalledWith("/api/event/cancel", {
      message: 
      `Dan Molloy has cancelled event ${mockProps.event.id}. They send the following message to all players: 
      "${fixerMsg}"`,
      eventId: mockProps.event.id
    })
  })
  console.log("@fixerMenu: export event details & export orchestra list btns not operational or tested")

})