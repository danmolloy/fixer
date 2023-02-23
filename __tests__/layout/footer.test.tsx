import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import Footer from "../../components/layout/footer"
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
  it("LogIn/LogOut button is in the document", () => {
    const logInBtn = screen.getByTestId("login-btn")
    expect(logInBtn).toBeInTheDocument()
  })
  it("About link is in the document", () => {
    const aboutLink = screen.getByText(/^About$/)
    expect(aboutLink).toBeInTheDocument()
  })
  it("Contact Us link is in the document", () => {
    const contactLink = screen.getByText(/^Contact us$/)
    expect(contactLink).toBeInTheDocument()
  })
})