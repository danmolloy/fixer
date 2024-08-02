import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import MenuButton, { MenuButtonProps } from "../../../app/layout/menuButton";
import { mockSession } from "../../../__mocks__/session";

describe("<MenuButton />", () => {
  const mockProps: MenuButtonProps = {
    session: mockSession
  }
  beforeEach(() => {
    render(<MenuButton {...mockProps} />)
  })
  it("<MenuButton /> renders", () => {
    const menuBtn = screen.getByTestId("menu-button")
    expect(menuBtn).toBeInTheDocument()
  })
  it("menu button is in the document and shows/hides <FlyOutMenu /> on click", () => {
    const icon = screen.getByTestId("menu-icon-btn")
    expect(icon).toBeInTheDocument()
    act(() => {
      fireEvent.click(icon)
    })
    const flyout = screen.getByTestId("external-menu")
    expect(flyout).toBeInTheDocument()
  })
})
