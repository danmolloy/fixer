import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import About from "../../components/index/about";
import React from "react";

describe("About component", () => {
  beforeEach(() => {
    render(<About />)
  })
  it("Renders", () => {
    const aboutDiv = screen.getByTestId("about-div")
    expect(aboutDiv).toBeInTheDocument()
  })
  it("Matches snapshot", () => {
    const aboutDiv = screen.getByTestId("about-div")
    expect(aboutDiv).toMatchSnapshot()
  })
})