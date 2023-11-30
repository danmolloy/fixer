import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import NotificationsIndex, { NotificationsIndexProps } from "../../../components/users/notifications"
import { mockPlayerCall } from "../../../__mocks__/models/playerCall"
import { mockEventInstrument } from "../../../__mocks__/models/eventInstrument"
import { mockEvent, mockEventWithEnsemble } from "../../../__mocks__/models/event"

describe("<NotificationsIndex />", () => {
  const mockProps: NotificationsIndexProps = {
    mutate: jest.fn(), 
    playerCalls: [{
      ...mockPlayerCall,
      accepted: null,
      eventInstrument: {
        ...mockEventInstrument,
        event: mockEventWithEnsemble
    }}]
  }
  beforeEach(() => {
    render(<NotificationsIndex {...mockProps} />)
  })
  it("notifications-index is in the document", () => {
    const notificationsIndex = screen.getByTestId("notifications-index")
    expect(notificationsIndex).toBeInTheDocument()
  })
  it("active-notifications (unresponded-to) is in the document with unresponded playerCalls only", () => {
    const activeNotifications = screen.getByTestId("active-notifications")
    expect(activeNotifications).toBeInTheDocument()
    for (let i = 0; i < mockProps.playerCalls.length; i++) {
      if (mockProps.playerCalls[i].accepted === null) {
        expect(activeNotifications.textContent).toMatch(mockProps.playerCalls[i].eventInstrument.event.eventTitle)
      }
    }
  })
})

describe("<NotificationsIndex />", () => {
  const mockProps: NotificationsIndexProps = {
    mutate: jest.fn(), 
    playerCalls: [{
      ...mockPlayerCall,
      accepted: false,
      eventInstrument: {
        ...mockEventInstrument,
        event: mockEventWithEnsemble
    }}]
  }
  beforeEach(() => {
    render(<NotificationsIndex {...mockProps} />)
  })
  it("past-notifications (responded-to) is in the document with responded-to messages only", () => {
    const pastNotifications = screen.getByTestId("past-notifications")
    expect(pastNotifications).toBeInTheDocument()
    for (let i = 0; i < mockProps.playerCalls.length; i ++) {
      if (mockProps.playerCalls[i].accepted !== null) {
        expect(pastNotifications.textContent).toMatch(mockProps.playerCalls[i].eventInstrument.event.eventTitle)
      }
    }
  })
})