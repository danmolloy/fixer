import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import Menu, { MenuProps } from "../../components/layout/menu"
import React from "react"
import { menuItems } from "../../components/layout/header"

jest.mock('next/router');

const mockProps: MenuProps = {
  setShowMenu: jest.fn(),
  menuItems: menuItems,
  signedIn: Math.random() > .5 ? true : false,

}

describe("Menu component", () => {
  beforeEach(() => {
    render(<Menu {...mockProps} />)
  })
  it("Renders", () => {
    const menuDiv = screen.getByTestId("menu-div")
    expect(menuDiv).toBeInTheDocument()
  })
  it("All menu items are in the document", () => {
    for (let i = 0; i < menuItems.length; i++) {
      let menuItem = screen.getByTestId(menuItems[i].id)
      expect(menuItem).toBeInTheDocument()
      expect(menuItem.textContent).toMatch(menuItems[i].name)
    }
  })
})