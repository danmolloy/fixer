import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react";
import LandingPage from "../../components/landingPage/landingPage";

describe("LandingPage component", () => {
  beforeEach(() => {
    render(<LandingPage />)
  })
  it("Renders", () => {
    const landingPage = screen.getByTestId("landing-page-div")
    expect(landingPage).toBeInTheDocument()
  })
  it("Hero is in the document", () => {
    const heroSection = screen.getByTestId("hero-div")
    expect(heroSection).toBeInTheDocument()
  })
  it("FixerFeatures is in the document", () => {
    const fixerFeatures = screen.getByTestId("fixer-features")
    expect(fixerFeatures).toBeInTheDocument()
  })
  it("MusicianFeatures is in the document", () => {
    const musicianFeatures = screen.getByTestId("musician-features")
    expect(musicianFeatures).toBeInTheDocument()
  })
  it("About section is in the document", () => {
    const aboutSection = screen.getByTestId("about-div")
    expect(aboutSection).toBeInTheDocument()
  })

})