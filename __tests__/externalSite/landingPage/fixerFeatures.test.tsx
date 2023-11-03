import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import FixerFeatures, { fixerFeatureList } from "../../../components/externalSite/landingPage/fixerFeatures"; 
import React from "react";

describe("FixerFeatures component", () => {
  beforeEach(() => {
    render(<FixerFeatures />)
  })
  it("Renders", () => {
    const fixerFeatures = screen.getByTestId("fixer-features")
    expect(fixerFeatures).toBeInTheDocument()
  })
  it("All fixer features are in the document", () => {
    const fixerFeatures = screen.getByTestId("fixer-features")

    for (let i = 0; i < fixerFeatureList.length; i++) {
      expect(fixerFeatures.textContent).toMatch(fixerFeatureList[i].title)
    }
  })
  it("Matches snapshot", () => {
    const fixerFeatures = screen.getByTestId("fixer-features")
    expect(fixerFeatures).toMatchSnapshot()
  })
})