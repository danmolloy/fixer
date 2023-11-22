import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import ExternalMenu, { externalMenuLinks, externalMenuProps } from "../../../components/layout/external/externalMenu"


const mockProps: externalMenuProps = {
  setShowMenu: jest.fn()
}

describe("<ExternalMenu />", () => {
  beforeEach(() => {
    render(<ExternalMenu {...mockProps} />)
  })
  it("external-menu is in the document", () => {
    const externalMenu = screen.getByTestId("external-menu")
    expect(externalMenu).toBeInTheDocument()
  })
  it("close btn is in the document and calls setShowMenu(false) onClick", () => {
    const closeBtn = screen.getByTestId("close-btn")
    expect(closeBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(closeBtn)
    })
    expect(mockProps.setShowMenu).toBeCalledWith(false)
  })
  it("all external menu items are in the document", () => {
    for (let i = 0; i < externalMenuLinks.length; i ++) {
      let menulink = screen.getByTestId(externalMenuLinks[i].id)
      expect(menulink).toBeInTheDocument()
      expect(menulink.textContent).toMatch(externalMenuLinks[i].name)
      const menuIcon = screen.getByTestId(`${externalMenuLinks[i].name}-icon`)
      expect(menuIcon).toBeInTheDocument()
    }
  })
  it("sign-in btn is in the document", () => {
    const signInBtn = screen.getByTestId('sign-in-btn')
    expect(signInBtn).toBeInTheDocument()
  })
})