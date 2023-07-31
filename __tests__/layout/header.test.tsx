import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import Header, { HeaderProps, menuItems } from "../../components/layout/header"
import React from "react"

jest.mock("next-auth/react");

const mockProps: HeaderProps = {
  showMenu: Math.random() < 0.4 ? true: false,
  setShowMenu: jest.fn(),
  notifications: Math.random() < 0.5 ? true: false
}

describe("Header component", () => {
  beforeEach(() => {
    render(<Header {...mockProps} />)
  })

  it("Renders", () => {
    const header = screen.getByTestId("layout-header")
    expect(header).toBeInTheDocument()
  })
  it("App title is in the document", () => {
    const header = screen.getByTestId("layout-header")
    expect(header.textContent).toMatch(/^GigFix/)
  })
  it("All menu items are in the document", () => {
    for(let i = 0; i < menuItems.length; i++) {
      let menuItem = screen.getByTestId(menuItems[i].id)
      expect(menuItem).toBeInTheDocument()
      expect(menuItem.textContent).toMatch(menuItems[i].name)
    }
  })
  it("Menu icon calls setShowMenu with True and renders close-menu-icon", () => {
    if(mockProps.showMenu === false) {
      const menuIcon = screen.getByTestId("menu-icon")
      expect(menuIcon).toBeInTheDocument()
      const menuIconBtn = screen.getByTestId("menu-icon-btn")
      act(() => {
        fireEvent.click(menuIconBtn)
      })
      expect(mockProps.setShowMenu).toBeCalledWith(true)
    }
  })
  it("Close-menu-icon calls setShowMenu and renders menu-icon", async () => {
    if(mockProps.showMenu === true) {
      const closeMenuIcon = screen.getByTestId("close-menu-icon")
      expect(closeMenuIcon).toBeInTheDocument()
      const menuIconBtn = screen.getByTestId("menu-icon-btn")
      act(() => {
        fireEvent.click(menuIconBtn)
      })
      expect(mockProps.setShowMenu).toBeCalledWith(false)
    }
  })
})