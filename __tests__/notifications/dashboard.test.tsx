import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import NotificationsDashboard from "../../components/notifications/dashboard"

describe("<NotificationsDashboard />", () => {
  beforeEach(() => {
    render(<NotificationsDashboard />)
  })
  it("<NotificationsDashboard /> is in the document", () => {
    const dashboard = screen.getByTestId("notifications-dashboard")
    expect(dashboard).toBeInTheDocument()
  })
  it("show inbox tab is in the document", () => {})
  it("show inbox renders inbox", () => {})
  it("page loads with inbox view as default", () => {})
  it("show sent messages btn is in the document", () => {})
  it("show sent messages btn shows sent view on click", () => {})
  it("past messages btn is in the document", () => {})
  it("past messages btn shows past chains on click", () => {})

  it("filter by unread btn is in the document", () => {})
  it("unread filter filters expected messages on click", () => {})

  it("filter by 'action required' is in the document", () => {})
  it("'action required' filter filters expected messages on click", () => {})

  it("filter buttons for all linked ensembles is in the document", () => {})
  it("ensemble filter btns filter expected messages", () => {})
})