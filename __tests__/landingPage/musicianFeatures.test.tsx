import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react";
import MusicianFeatures from "../../components/externalSite/landingPage/musicianFeatures"

describe("FixerFeatures component", () => {
  beforeEach(() => {
    render(<MusicianFeatures />)
  })
  it("Renders", () => {})
  it("All musician features are in the document", () => {})
  it("Matches snapshot", () => {})
})