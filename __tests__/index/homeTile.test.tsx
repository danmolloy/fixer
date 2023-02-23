import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import React from "react";
import HomeTile from "../../components/index/homeTile";

const mockProps = {
  children: <div data-testid="mock-div"></div>,
  link: "mockLink",
  title: "mockTitle"
}

describe("", () => {
  beforeEach(() => {
    render(<HomeTile {...mockProps} />)
  })
  it("Renders", () => {
    const homeTile = screen.getByTestId('home-tile')
    expect(homeTile).toBeInTheDocument()
  })
  it("Children is in the document", () => {
    const children = screen.getByTestId("mock-div")
    expect(children).toBeInTheDocument()
  })
  it("Title is in the document", () => {
    const homeTile = screen.getByTestId('home-tile')
    expect(homeTile.textContent).toMatch(mockProps.title)
  })
})