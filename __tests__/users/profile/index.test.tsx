import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import UserProfile, { UserProfileProps } from "../../../components/users/profile"
import React from "react"
import { mockUser } from "../../../__mocks__/models/user"

const mockProps = {
  user: mockUser
}

describe("Profile Page", () => {
  beforeEach(() => {
    render(<UserProfile {...mockProps} />)
  })
  

  it("user-profile is in the document", () => {
    const profileComponent = screen.getByTestId("user-profile")
    expect(profileComponent).toBeInTheDocument()
  })

  it("profile-header is in the document", () => {
    const profileHeader = screen.getByTestId("profile-header")
    expect(profileHeader).toBeInTheDocument()
  })
  it("profile-body is in the document", () => {
    const profileBody = screen.getByTestId("profile-body")
    expect(profileBody).toBeInTheDocument() 
  })
  it("ContactInfo shown when button clicked", () => {
    const contactBtn = screen.getByTestId("profile-contact-btn")
    act(() => {
      fireEvent.click(contactBtn)
    })
    const contactInfo = screen.getByTestId("contact-info")
    expect(contactInfo).toBeInTheDocument()
  })

})