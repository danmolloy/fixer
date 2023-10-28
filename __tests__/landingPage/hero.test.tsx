import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react";
import Hero from "../../components/externalSite/landingPage/hero";

describe("Hero component", () => {
  beforeEach(() => {
    render(<Hero />)
  })
  it("Renders", () => {
    const heroDiv = screen.getByTestId("hero-div")
    expect(heroDiv).toBeInTheDocument()
  })
  it("Matches snapshot", () => {
    const heroDiv = screen.getByTestId("hero-div")
    expect(heroDiv).toMatchSnapshot()
  })
})