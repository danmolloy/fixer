import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom"
import ProfileBody from "../../components/users/profileBody";
import React from "react";

describe("ProfileBody component", () => {
  beforeEach(() => {
    render(<ProfileBody />)
  })
  it("Renders", () => {
    const profileBody = screen.getByTestId("profile-body")
    expect(profileBody).toBeInTheDocument()
  })
  it("Your Mutual History is in the document", () => {
    const mutualHistory = screen.getByTestId("mutual-history-div")
    expect(mutualHistory).toBeInTheDocument()
    expect(mutualHistory.textContent).toMatch(/Your Mutual History/)
  })
})