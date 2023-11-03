import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom"
import ProfileBody from "../../../components/users/profile/profileBody";
import React from "react";


describe("ProfileBody component", () => {
  beforeEach(() => {
    render(<ProfileBody />)
  })
  it("renders", () => {
    const profileBody = screen.getByTestId("profile-body")
    expect(profileBody).toBeInTheDocument()
  })
  it("mutual history is in the document", () => {
    const mutualHistory = screen.getByTestId("mutual-history")
    expect(mutualHistory).toBeInTheDocument()
    expect(mutualHistory.textContent).toMatch(/Your Mutual History/)
  })
  it("profile-blurb is in the document", () => {
    const profileBlurb = screen.getByTestId("profile-blurb")
    expect(profileBlurb).toBeInTheDocument()
  })
  it("user's blurb is in the document, otherwise there is a helpful message", () => {
    const profileBlurb = screen.getByTestId("profile-blurb")
    expect(profileBlurb.textContent).toMatch("This user has not yet added information about themselves.")
  })
})