import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react";
import LandingHeader, { menu } from "../../components/landingPage/header";


describe("Header component", () => {
  beforeEach(() => {
    render(<LandingHeader />)
  })
  it("Renders", () => {
    const headerDiv = screen.getByTestId("landing-header")
    expect(headerDiv).toBeInTheDocument()
  })
  it("App title is in the document", () => {
    const headerDiv = screen.getByTestId("landing-header")
    expect(headerDiv.textContent).toMatch(/^GigFix/)
  })
  it("Menu items are in the document", () => {
    const headerDiv = screen.getByTestId("landing-header")
    for (let i = 0; i < menu.length; i++) {
      expect(headerDiv.textContent).toMatch(menu[i])
    }
  })
  it("Sign in button is in the document", () => {
    const signInBtn = screen.getByText("Sign in")
    expect(signInBtn).toBeInTheDocument()
  })
  //it("Sign in button calls signIn", () => {})
  it("Get Started button is in the document", () => {
    const getStarted = screen.getByText("Get started")
    expect(getStarted).toBeInTheDocument()
  })
  it("Menu icon is in the document", () => {
    const menuIcon = screen.getByTestId("menu-icon")
    expect(menuIcon).toBeInTheDocument()
  })
  //it("Menu icon calls showMenu", () => {})
})