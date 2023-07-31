import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Footer from "../../components/layout/footer"

jest.mock("next-auth/react");

describe("Footer component", () => {
  beforeEach(() => {
    render(<Footer />)
  })
  it("Renders", () => {
    const footer = screen.getByTestId("layout-footer")
    expect(footer).toBeInTheDocument()
  })
  it("Twitter link is in the document", () => {
    const twitterLink = screen.getByTestId("twitter-link")
    expect(twitterLink).toBeInTheDocument()
  })
  it("LoginBtn is in the document", () => {
    const loginBtn = screen.getByTestId("login-btn")
    expect(loginBtn).toBeInTheDocument()
  })
})