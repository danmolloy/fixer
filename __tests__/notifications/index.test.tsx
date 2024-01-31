import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Notifications, { NotificationsProps } from "../../components/notifications"
import { mockPlayerCallNotification } from "../../__mocks__/models/playerCall"

const mockProps: NotificationsProps = {
  playerCalls: [mockPlayerCallNotification],
  mutate: jest.fn()
}

describe("<NotificationsIndex />", () => {
  beforeEach(() => {
    render(<Notifications {...mockProps} />)
  })
  it("notifications-index is in the document", () => {
    const notificationsIndex = screen.getByTestId("notifications-index")
    expect(notificationsIndex).toBeInTheDocument()
  })
  it("<NotificationsDashboard /> is in the document", () => {
    const dashboard = screen.getByTestId("notifications-dashboard")
    expect(dashboard).toBeInTheDocument()
  })
  it("<NotificationsList /> is in the document", () => {
    const notificationsList = screen.getByTestId("notifications-list")
    expect(notificationsList).toBeInTheDocument()
  })
  //it("expected playerCalls are passed to <NotificationsList />", () => {})
 })

 
 /* 
 model Notification {
  id
  title
  body
  author
  ensemble
  to
  date
  action
 }
 */