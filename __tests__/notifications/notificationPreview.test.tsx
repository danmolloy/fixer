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
  it('states event title', () => {
    const eventTitle = screen.getByText(mockProps.playerCall.eventSection.event.eventTitle)
    expect(eventTitle).toBeInTheDocument()
  })
  it("states author of message", () => {
    const fixerName = screen.getByText(`${mockProps.playerCall.eventSection.event.fixer.firstName} ${mockProps.playerCall.eventSection.event.fixer.lastName}`)
    expect(fixerName).toBeInTheDocument()
  })
  it('states event dates', () => {
      const sortedCalls = mockProps.playerCall.calls.sort((a, b) => Number(DateTime.fromJSDate(a.startTime)) - Number(DateTime.fromJSDate(b.startTime).toMillis))
      const startDate = sortedCalls[0]
      const endDate = sortedCalls[sortedCalls.length - 1]
    if (DateTime.fromJSDate(startDate.startTime).hasSame(DateTime.fromJSDate(endDate.endTime), "day")) {
      const dateString = DateTime.fromJSDate(startDate.startTime).toFormat("dd LLL yyyy")
      const dateRange = screen.getByText(dateString)
      expect(dateRange).toBeInTheDocument()
    } else {
      const dateString = `${DateTime.fromJSDate(startDate.startTime).toFormat("dd LLL yyyy")} - ${DateTime.fromJSDate(endDate.endTime).toFormat("dd LLL yyyy")}`
      const dateRange = screen.getByText(dateString)
      expect(dateRange).toBeInTheDocument()
    }
  })
  //it("indicates whether notification is unread or not", () => {})
})