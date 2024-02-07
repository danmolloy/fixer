import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Notifications, { NotificationsProps } from "../../components/notifications"
import { mockPlayerCallNotification } from "../../__mocks__/models/playerCall"

const mockProps: NotificationsProps = {
  playerCalls: [mockPlayerCallNotification],
  mutate: jest.fn()
}

/* 
states if accepted/declined work or indicated availability or action required
notifications sorted from most recent
notification tile is a link to notification detail
removed event title from notificaiton preview
pass ensembleFilter to dashboard
there is multiple of each ensemble in the dashboard. You can't make a set out of objects!
*/

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
  it("expected playerCalls are passed to <NotificationsList />", () => {
    for (let i = 0; i < mockProps.playerCalls.length; i ++) {
      const preview = screen.getByTestId(`${mockProps.playerCalls[i].id}-preview`)
      expect(preview).toBeInTheDocument()
    }
  })
 })