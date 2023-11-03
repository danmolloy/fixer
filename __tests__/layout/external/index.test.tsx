import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import ExternalLayout, { ExternalLayoutProps } from "../../../components/layout/external"

const mockProps: ExternalLayoutProps = {
  children: <div></div>
}

describe("<ExternalLayout />", () => {
  beforeEach(() => {
    render(<ExternalLayout {...mockProps} />)
  })
  it("external-layout is in the document", () => {
    const externalLayout = screen.getByTestId("external-layout")
    expect(externalLayout).toBeInTheDocument()
  })
  it("external-header is in the document", () => {
    const externalHeader = screen.getByTestId("external-header")
    expect(externalHeader).toBeInTheDocument()
  })
  it("external-footer is in the document", () => {
    const externalFooter = screen.getByTestId("external-footer")
    expect(externalFooter).toBeInTheDocument()
  })
  it("external-children is in the document", () => {
    const externalChildren = screen.getByTestId("external-children")
    expect(externalChildren).toBeInTheDocument()
  })
  it("menu renders on showMenu btn click", () => {
    const menuBtn = screen.getByTestId("menu-icon-btn")
    expect(menuBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(menuBtn)
    })
    const externalMenu = screen.getByTestId("external-menu")
    expect(externalMenu).toBeInTheDocument()
  })
})