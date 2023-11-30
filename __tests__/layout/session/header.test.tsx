import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import SessionHeader, { SessionHeaderProps, menuItems } from "../../../components/layout/session/header"
import { mockAdminWithEnsemble } from "../../../__mocks__/models/ensembleAdmin"

const mockProps: SessionHeaderProps = {
  showMenu: false,
  setShowMenu: jest.fn(),
  setReducedHeader: jest.fn(),
  reducedHeader: false,
  notifications: false,
  ensembleAdminList: [mockAdminWithEnsemble]

}

describe("<SessionHeader />", () => {
  beforeEach(() => {
    render(<SessionHeader {...mockProps} />)
  })
  it("session-header is in the document", () => {
    const sessionHeader = screen.getByTestId("session-header")
    expect(sessionHeader).toBeInTheDocument()
  })
  it("home-link is in the document", () => {
    const homeLink = screen.getByTestId("home-link")
    expect(homeLink).toBeInTheDocument()
    expect(homeLink.textContent).toMatch("GigFix")
  })
  it("all expected menu items are in the document", () => {
    for (let i = 0; i < menuItems.length; i ++) {
      let menuItem = screen.getByTestId(`${menuItems[i].id}`)
      expect(menuItem).toBeInTheDocument()
      expect(menuItem).toHaveAttribute("href", menuItems[i].link)
    }
  })
  it("menu-icon-btn is in the document and calls setShowMenu onClick", () => {
    const menuIconBtn = screen.getByTestId("menu-icon-btn")
    expect(menuIconBtn).toBeInTheDocument()
  })
  it("all ensemble links are in the document with expected href", () => {
    for (let i = 0; i < mockProps.ensembleAdminList.length; i ++) {
      let ensembleLink = screen.getByText(mockProps.ensembleAdminList[i].ensemble.name)
      expect(ensembleLink).toBeInTheDocument()
      expect(ensembleLink).toHaveAttribute("href", `/ensembles/${mockProps.ensembleAdminList[i].ensembleId}`)
    }
  })
})

describe("<SessionHeader />", () => {
  const mockProps: SessionHeaderProps = {
    showMenu: false,
    setShowMenu: jest.fn(),
    setReducedHeader: jest.fn(),
    reducedHeader: false,
    notifications: true,
    ensembleAdminList: [mockAdminWithEnsemble]

  }
  beforeEach(() => {
    render(<SessionHeader {...mockProps} />)
  })
  it("if notifications, pinging icon is in the document", () => {
    const ping = screen.getByTestId("notifications-ping")
    expect(ping).toBeInTheDocument()
  })

})