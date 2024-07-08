import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import ExternalHeader, { ExternalHeaderProps } from "../../../components/layout/external/externalHeader"
import { externalMenuLinks } from "../../../components/layout/external/externalMenu"

const mockProps: ExternalHeaderProps = {
  showMenu: false,
  setShowMenu: jest.fn(),
  setReducedHeader: jest.fn(),
  reducedHeader: false
}

describe("<ExternalHeader />", () => {
  beforeEach(() => {
    render(<ExternalHeader {...mockProps} />)
  })
  it("branding/home link is in the document", () => {
    const homeLink = screen.getByTestId("gigfix-link")
    expect(homeLink).toHaveAttribute("href", "/")
    expect(homeLink.textContent).toMatch("GigFix")
  })
  it("all menu items are in the document", () => {
    for (let i = 0; i < externalMenuLinks.length; i++) {
      let menuLink = screen.getByTestId(externalMenuLinks[i].id)
      expect(menuLink).toBeInTheDocument()
      expect(menuLink.textContent).toMatch(externalMenuLinks[i].name)
      expect(menuLink).toHaveAttribute("href", externalMenuLinks[i].link)
    }
  })
  it("showMenu btn is in the document and calls showMenu onClick", () => {
    const menuBtn = screen.getByTestId("menu-icon-btn")
    expect(menuBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(menuBtn)
    })
    expect(mockProps.setShowMenu).toBeCalledWith(true)
  })
  
})