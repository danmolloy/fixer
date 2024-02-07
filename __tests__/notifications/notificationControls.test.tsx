import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import NotificationControls, { NotificationControlsProps } from "../../components/notifications/notificationControls"

const mockProps: NotificationControlsProps = {
  handleResponse: jest.fn()
}

describe("<NotificationControls />", () => {
  beforeEach(() => {
    render(<NotificationControls {...mockProps} />)
  })
  it("notification-controls is in the document", () => {
    const notificationControls = screen.getByTestId("notification-controls")
    expect(notificationControls).toBeInTheDocument()
  })
  it("accept btn is in the document and calls accept()", () => {
    const acceptBtn = screen.getByText("Accept")
    expect(acceptBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(acceptBtn)
    })
    expect(mockProps.handleResponse).toHaveBeenCalledWith(true)
  })
  it("decline btn is in the document", () => {
    const declineBtn = screen.getByText("Decline")
    expect(declineBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(declineBtn)
    })
    expect(mockProps.handleResponse).toHaveBeenCalledWith(false)
  })
  //it("indicate availability across all calls", () => {})
})