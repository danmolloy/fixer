import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import ExternalFooter from "../../../components/layout/external/externalFooter"
import { socialMedia } from "../../../components/layout/session/footer"
import { externalMenuLinks } from "../../../components/layout/external/externalMenu"

describe("<ExternalFooter />", () => {
  beforeEach(() => {
    render(<ExternalFooter />)
  })
  it("external-footer is in the document", () => {
    const externalFooter = screen.getByTestId("external-footer")
    expect(externalFooter).toBeInTheDocument()
  })
  it("social links are in the document", () => {
    for (let i = 0; i < socialMedia.length; i++) {
      let socialLink = screen.getByTestId(socialMedia[i].id)
      expect(socialLink).toBeInTheDocument()
    }
  })
  it("all external menu options are in the document", () => {
    for (let i = 0; i < externalMenuLinks.length; i ++) {
      let menuLink = screen.getByTestId(externalMenuLinks[i].id)
      expect(menuLink).toBeInTheDocument()
      expect(menuLink.textContent).toMatch(externalMenuLinks[i].name)
    }
  })
  it("sign-in btn is in the document", () => {
    const signInBtn = screen.getByTestId("sign-in-btn")
    expect(signInBtn).toBeInTheDocument()
  })
  it("copyright info is in the document", () => {
    const copyright = screen.getByText("2023 Gig Fix Limited")
    expect(copyright).toBeInTheDocument()
  })
})