import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import SessionMenu, { SessionMenuProps } from "../../../components/layout/session/sessionMenu"
import { menuItems } from "../../../components/layout/session/header"

const mockProps: SessionMenuProps = {
  setShowMenu: jest.fn(),
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
  
  //it("sign out btn call signOut and redirects home", () => {})
})