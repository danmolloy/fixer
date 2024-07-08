import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import SessionLayout, { SessionLayoutProps } from "../../../components/layout/session"
import { mockUserWithCallsAndEvents } from "../../../__mocks__/models/user";
import { mockAdminWithEnsemble } from "../../../__mocks__/models/ensembleAdmin";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      playerCalls: []
    })
  })
) as jest.Mock;

const mockProps: SessionLayoutProps = {
  ensembleAdminList: [mockAdminWithEnsemble],
  children: <div></div>
}

describe("<SessionLayout /> ", () => {
  beforeEach(async() => {
    await act(async () => {
      render(<SessionLayout {...mockProps} />)
    })
  })
  it("session-layout is in the document", () => {
    const sessionLayout = screen.getByTestId("session-layout")
    expect(sessionLayout).toBeInTheDocument()
  })
  it("session-header is in the document", () => {
    const sessionHeader = screen.getByTestId("session-header")
    expect(sessionHeader).toBeInTheDocument()
  })
  it("session-children is in the document", () => {
    const sessionChildren = screen.getByTestId("session-children")
    expect(sessionChildren).toBeInTheDocument()
  })
  it("session-footer is in the document", () => {
    const sessionFooter = screen.getByTestId("session-footer")
    expect(sessionFooter).toBeInTheDocument()
  })
  it("session-menu renders on showMenu click", () => {
    const menuIconBtn = screen.getByTestId("menu-icon-btn")
    expect(menuIconBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(menuIconBtn)
    })
    const sessionMenu = screen.getByTestId("session-menu")
    expect(sessionMenu).toBeInTheDocument()
  })
  it("if loading, <LoadingLayout /> is in the document", () => {})
  it("if error, <ErrorLayout /> is in the document", () => {})
  it("if profileIncomplete, children are replaced with settingsIndex", () => {})
})