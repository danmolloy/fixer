import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import SessionMenu, { SessionMenuProps } from "../../../components/layout/session/sessionMenu"
import { menuItems } from "../../../components/layout/session/header"
import { mockAdminWithEnsemble, mockEnsembleAdmin } from "../../../__mocks__/models/ensembleAdmin"

const mockProps: SessionMenuProps = {
  setShowMenu: jest.fn(),
  ensembleAdminList: [mockAdminWithEnsemble]
}

describe("<SessionMenu />", () => {
  beforeEach(() => {
    render(<SessionMenu {...mockProps} />)
  })
  it("close menu btn is in the document and calls setShowMenu(false) onClick", () => {
    const closeBtn = screen.getByTestId("close-btn")
    expect(closeBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(closeBtn)
    })
    expect(mockProps.setShowMenu).toBeCalledWith(false)
  })
  it("Sign out btn is in the document", () => {
    const signOutBtn = screen.getByTestId("sign-out-btn")
    expect(signOutBtn).toBeInTheDocument()
  })
  it("all menuItems are in the document", () => {
    for (let i = 0; i < menuItems.length; i ++) {
      let menuItem = screen.getByTestId(menuItems[i].id)
      expect(menuItem.textContent).toMatch(menuItems[i].name)
      expect(menuItem).toHaveAttribute("href", menuItems[i].link)
      let menuIcon = screen.getByTestId(`${menuItems[i].name}-icon`)
      expect(menuIcon).toBeInTheDocument()
    }
  })
  it("if adminEnsembles > 0, ensembles-list is in the document with title", () => {
    const ensemblesList = screen.getByTestId("ensembles-list")
    expect(ensemblesList).toBeInTheDocument()
    expect(ensemblesList.textContent).toMatch("Your Ensembles")
  })
  it("if adminEnsembles > 0, all ensemble links are in the document with expected href", () => {
    for (let i = 0; i < mockProps.ensembleAdminList.length; i ++) {
      let ensembleLink = screen.getByText(mockProps.ensembleAdminList[i].ensemble.name)
      expect(ensembleLink).toBeInTheDocument()
      expect(ensembleLink).toHaveAttribute("href", `/ensembles/${mockProps.ensembleAdminList[i].ensembleId}`)
    }
  })
  
  //it("sign out btn call signOut and redirects home", () => {})
})

describe("<SessionMenu />", () => {
  beforeEach(() => {
    const mockProps: SessionMenuProps = {
      setShowMenu: jest.fn(),
      ensembleAdminList: []
    }
    render(<SessionMenu {...mockProps} />)
  })
  it("if adminEnsembles === 0, ensembles-list is not in the document", () => {
    const sessionMenu = screen.getByTestId("session-menu")
    expect(sessionMenu.textContent).not.toMatch("Your Ensembles")
  })
})