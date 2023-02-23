import { render, screen, act } from "@testing-library/react"; 
import "@testing-library/jest-dom"
import ProfileHeader from "../../components/users/profileHeader";
import React from "react";

const mockProps = {
  userName: "mockUser",
  instrument: "mockInstrument"
}

describe("ProfileHeader component", () => {
  beforeEach(() => {
    render(<ProfileHeader {...mockProps} />)
  })

  it("Renders", () => {
    const profileHeader = screen.getByTestId("profile-header-div")
    expect(profileHeader).toBeInTheDocument()
  })
  it("Profile image is in the document", () => {
    const profileImg = screen.getByTestId("profile-img")
    expect(profileImg).toBeInTheDocument()
  })
  it("User name is in the document", () => {
    const profileHeader = screen.getByTestId("profile-header-div")
    expect(profileHeader.textContent).toMatch(mockProps.userName)
  })
  it("User instrument is in the document", () => {
    const profileHeader = screen.getByTestId("profile-header-div")
    expect(profileHeader.textContent).toMatch(mockProps.instrument)
  })
  it("Contact button is in the document", () => {
    const contactBtn = screen.getByTestId("profile-contact-btn")
    expect(contactBtn).toBeInTheDocument()
    expect(contactBtn.textContent).toMatch(/^Contact$/)
  })
  it("Directory button is in the document", () => {
    const directoryBtn = screen.getByTestId("directory-btn")
    expect(directoryBtn).toBeInTheDocument()
    expect(directoryBtn.textContent).toMatch(/^Directory$/)
  })
})