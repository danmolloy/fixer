import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react";
import MusicianFeatures, { musicianFeatureList } from "../../../components/externalSite/landingPage/musicianFeatures";

describe("FixerFeatures component", () => {
  beforeEach(() => {
    render(<MusicianFeatures />)
  })
  it("musician-features is in the document", () => {
    const musicianFeatures = screen.getByTestId("musician-features")
    expect(musicianFeatures).toBeInTheDocument()
  })
  it("All musician features are in the document", () => {
    for (let i = 0; i < musicianFeatureList.length; i++) {
      let featureTitle = screen.getByText(musicianFeatureList[i].title)
      expect(featureTitle).toBeInTheDocument()
    }
  })
  it("Matches snapshot", () => {
    const musicianFeatures = screen.getByTestId("musician-features")
    expect(musicianFeatures).toMatchSnapshot()

  })
})