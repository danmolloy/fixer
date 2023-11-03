import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react";
import LandingFooter, { landingMenu, sessionMenu, socialMedia } from "../../../components/externalSite/landingPage/landingFooter";

const landingPage = Math.random() < .5 ? true : false

describe("Landing Footer component", () => {
  beforeEach(() => {
    render(<LandingFooter />)
  })
  it("Renders", () => {
    const footerDiv = screen.getByTestId("landing-footer")
    expect(footerDiv).toBeInTheDocument()
  })
  it("Landing Menu items are in the document", () => {
    if(landingPage === true) {
      const footerDiv = screen.getByTestId("landing-footer")
      expect(footerDiv.textContent).toMatch(/AboutFAQContact2023 Gig Fix Limited/)
    }
  })
  it("Social media links in the document", () => {
    for (let i = 0; i < socialMedia.length; i++) {
      let socialIcon = screen.getByTestId(socialMedia[i].id)
      expect(socialIcon).toBeInTheDocument()
    }
  })
  it("Copyright info in the document", () => {
    const footerDiv = screen.getByTestId("landing-footer")
    expect(footerDiv.textContent).toMatch(/2023 Gig Fix Limited$/)
  })
})