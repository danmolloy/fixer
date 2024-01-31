import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import NotificationPreview, { NotificationPreviewProps } from "../../components/notifications/notificationPreview"
import { mockPlayerCallNotification } from "../../__mocks__/models/playerCall"
import { DateTime } from "luxon"

const mockProps: NotificationPreviewProps = {
  playerCall: {
    ...mockPlayerCallNotification, 
    accepted: null
  }
}

describe("<NotificationPreview />", () => {
  beforeEach(() => {
    render(<NotificationPreview {...mockProps} />)
  })
  it("notification preview is in the document", () => {
    const preview = screen.getByTestId(`${mockProps.playerCall.id}-preview`)
    expect(preview).toBeInTheDocument()
  })
  it("indicates if action is required", () => {
    const actionIndication = screen.getByText("Action Required")
    expect(actionIndication).toBeInTheDocument()
  })
  it("states ensemble name", () => {
    const ensembleName = screen.getByText(mockProps.playerCall.eventSection.event.ensemble.name)
    expect(ensembleName).toBeInTheDocument()
  })
  it("states playerCall sent date", () => {
    const recievedDate = screen.getByText(DateTime.fromJSDate(mockProps.playerCall.recievedDate).toFormat("HH:mm DD"))
    expect(recievedDate).toBeInTheDocument()
  })
  it('states event title', () => {})
  it("states author of message", () => {})
  it("indicates whether notification is unread or not", () => {})
  it('states event dates', () => {})
})