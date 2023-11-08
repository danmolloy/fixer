import { render, screen, act, fireEvent } from "@testing-library/react"; 
import "@testing-library/jest-dom"
import ProfileHeader, { ProfileHeaderProps } from "../../../components/users/profile/profileHeader";
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

  it("profile-header is in the document", () => {
    const profileHeader = screen.getByTestId("profile-header")
    expect(profileHeader).toBeInTheDocument()
  })
  it("profile image is in the document", () => {
    const image = screen.getByTestId("image")
    expect(image).toBeInTheDocument()
  })
  it("user name is in the document", () => {
    const profileHeader = screen.getByTestId("profile-header")
    expect(profileHeader.textContent).toMatch(mockProps.userName)
  })
  it("user instrument is in the document", () => {
    const profileHeader = screen.getByTestId("profile-header")
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
  it("directory button is in the document and calls directory/?instrument=${userInstrument}", () => {
    const directoryBtn = screen.getByTestId("directory-btn")
    expect(directoryBtn).toBeInTheDocument()
    expect(directoryBtn.textContent).toMatch(/^Directory$/)
    expect(directoryBtn).toHaveAttribute("href", `/directory?instrument=${mockProps.instrument.toLocaleLowerCase()}`) // is this right? /?
  })
})