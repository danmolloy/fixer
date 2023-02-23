import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react";
import LandingPage from "../../components/landingPage/landingPage";

describe("LandingPage component", () => {
  beforeEach(() => {
    render(<LandingPage />)
  })
  it("Renders", () => {})
  it("LandingHeader is in the document", () => {})
  it("Hero is in the document", () => {})
  it("FixerFeatures is in the document", () => {})
  it("MusicianFeatures is in the document", () => {})
  it("LandingFooter is in the document with expected values", () => {})
})