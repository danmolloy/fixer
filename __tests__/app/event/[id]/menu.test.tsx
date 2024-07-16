import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import EventMenu, { EventMenuProps } from "../../../../app/event/[id]/menu";
import { useRouter } from "next/navigation";
import axios from "../../../../__mocks__/axios";

global.confirm = jest.fn(() => true)
let mockConfirm = global.confirm;


jest.mock("next/navigation")

jest.mock("axios")
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: EventMenuProps = {
  eventId: "mock-id"
}

describe("<EventMenu />", () => {
  beforeEach(() => {
    render(<EventMenu {...mockProps} />)
  })
  it("<EventMenu /> renders", () => {
    const eventMenu = screen.getByTestId("event-menu")
    expect(eventMenu).toBeInTheDocument()
  })
  it("options-btn is in the document", () => {
    const optionsBtn = screen.getByTestId("options-btn")
    expect(optionsBtn).toBeInTheDocument()
  })
  it("menu options render/hide on options btn click", () => {
    const eventMenu = screen.getByTestId("event-menu")
    expect(eventMenu.textContent).not.toMatch("Message All")
    expect(eventMenu.textContent).not.toMatch("Export Event Details")
    expect(eventMenu.textContent).not.toMatch("Export Orchestra List")
    expect(eventMenu.textContent).not.toMatch("Cancel Event")
    const optionsBtn = screen.getByTestId("options-btn")
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const menuOptions = screen.getByTestId("menu-options")
    expect(menuOptions).toBeInTheDocument()
    expect(eventMenu.textContent && menuOptions.textContent).toMatch("Message All")
    expect(eventMenu.textContent && menuOptions.textContent).toMatch("Export Event Details")
    expect(eventMenu.textContent && menuOptions.textContent).toMatch("Export Orchestra List")
    expect(eventMenu.textContent && menuOptions.textContent).toMatch("Cancel Event")
    act(() => {
      fireEvent.click(optionsBtn)
    })
    expect(menuOptions).not.toBeInTheDocument()
  })
  it("Update Event link is in the document with expected href & role", () => {
    const optionsBtn = screen.getByTestId("options-btn")
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const updateEvent = screen.getByText("Update Event")
    expect(updateEvent).toBeInTheDocument()
    expect(updateEvent).toHaveAttribute("href", `update/${mockProps.eventId}`)
    expect(updateEvent).toHaveRole("link")
  })
  it("Message All button is in the document", () => {
    const optionsBtn = screen.getByTestId("options-btn")
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const messageAll = screen.getByText("Message All")
    expect(messageAll).toBeInTheDocument()
  })
  it("Export Event Details btn is in the document", () => {
    const optionsBtn = screen.getByTestId("options-btn")
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const exportDetails = screen.getByText("Export Event Details")
    expect(exportDetails).toBeInTheDocument()
  })
  it("Export Orchestra List btn is in the document", () => {
    const optionsBtn = screen.getByTestId("options-btn")
    act(() => {
      fireEvent.click(optionsBtn)
    })
    const exportList = screen.getByText("Export Orchestra List")
    expect(exportList).toBeInTheDocument()
  })
  it("Cancel Event btn is in the document and calls confirm, axios.post & useRouter on click", async () => {
    const optionsBtn = screen.getByTestId("options-btn")
    await act(async () => {
      fireEvent.click(optionsBtn)
    })
    const cancelEvent = screen.getByText("Cancel Event")
    expect(cancelEvent).toBeInTheDocument()

    act(() => {
      fireEvent.click(cancelEvent)
    })
    expect(mockConfirm).toHaveBeenCalled()
    expect(axios.post).toHaveBeenCalledWith("/event/delete", {eventId: mockProps.eventId})
    expect(useRouter).toHaveBeenCalled()
  })
})