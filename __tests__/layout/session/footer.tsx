import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import SessionFooter, { socialMedia } from "../../../components/layout/session/footer";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn()
}));

describe("<SessionFooter />", () => {
  beforeEach(() => {
    render(<SessionFooter />)
  })
  it("Renders", () => {
    const footer = screen.getByTestId("session-footer")
    expect(footer).toBeInTheDocument()
  })
  it("All social links are in the document", () => {
    for (let i = 0; i < socialMedia.length; i++) {
      let socialLink = screen.getByTestId(socialMedia[i].id)
      expect(socialLink).toBeInTheDocument()
    }
  })
  it("All session menu options are in the document", () => {})
  it("SignOut btn is in the document", () => {
    const signOutBtn = screen.getByText("Sign Out")
    expect(signOutBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(signOutBtn)
    })
  })
  it("Copyright info is in the document", () => {
    const copyright = screen.getByText("2023 Gig Fix Limited")
    expect(copyright).toBeInTheDocument()
  })
  //it("SignOut btn calls signOut", () => {})
})