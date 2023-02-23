import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import Header, { menuItems } from "../../components/layout/header"
import React from "react"

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {}
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
    }),
  };
});

const setShowMenu = jest.fn()

const mockProps = {
  showMenu: Math.random() < 0.4 ? true: false,
  setShowMenu: setShowMenu
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
      expect(setShowMenu).toBeCalledWith(true)
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
      expect(setShowMenu).toBeCalledWith(false)
    }
  })
})