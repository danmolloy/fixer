import { render, screen, act, fireEvent } from "@testing-library/react"; 
import "@testing-library/jest-dom"
import ProfileHeader, { ProfileHeaderProps } from "../../components/users/profileHeader";
import React from "react";

const mockProps: ProfileHeaderProps = {
  userName: "mockUser",
  instrument: "mockInstrument",
  setShowContactInfo: jest.fn()
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
  it("Contact button calls setShowContactInfo onClick", () => {
    const contactBtn = screen.getByTestId("profile-contact-btn")
    act(() => {
      fireEvent.click(contactBtn)
    })
    expect(mockProps.setShowContactInfo).toHaveBeenCalled()
  })
  it("Directory button is in the document", () => {
    const directoryBtn = screen.getByTestId("directory-btn")
    expect(directoryBtn).toBeInTheDocument()
    expect(directoryBtn.textContent).toMatch(/^Directory$/)
  })
})