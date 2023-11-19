import { render, screen } from "@testing-library/react"
import MobileMenuPanel from "../../components/layout/components/mobileMenuPanel"
import "@testing-library/jest-dom"

describe("Mobile Dashboard component", () => {
  beforeEach(() => {
    render(<MobileMenuPanel />)
  })
  it("renders", () => {
    const menuPanel = screen.getByTestId("mobile-menu-panel")
    expect(menuPanel).toBeInTheDocument()
  })
  it("Calendar link is in the document", () => {
    const calendarLink = screen.getByTestId("calendar-link")
    expect(calendarLink).toBeInTheDocument()
  })
  it("Directory link is in the document", () => {
    const directoryLink = screen.getByTestId("directory-link")
    expect(directoryLink).toBeInTheDocument()
  })
  it("Create Event link is in the document", () => {
    const createEventLink = screen.getByTestId("create-event-link")
    expect(createEventLink).toBeInTheDocument()
  })
  it("User account link is in the document", () => {
    const userAccountLink = screen.getByTestId("user-account-link")
    expect(userAccountLink).toBeInTheDocument()
  })
})