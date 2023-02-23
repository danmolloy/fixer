import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import UserProfile from "../../components/users/profile"
import React from "react"


const mockProps = {
  user: {
    name: "mockName",
    instrument: "mockInstrument"
  }
}

describe("Profile Page", () => {
  beforeEach(() => {
    render(<UserProfile {...mockProps} />)
  })
  

  it("Renders", () => {
    const profileComponent = screen.getByTestId("user-profile-div")
    expect(profileComponent).toBeInTheDocument()
  })

  it("ProfileHeader is in the document", () => {
    const profileHeader = screen.getByTestId("profile-header-div")
    expect(profileHeader).toBeInTheDocument()
  })
  it("ProfileBody is in the document", () => {
    const profileBody = screen.getByTestId("profile-body")
    expect(profileBody).toBeInTheDocument() 
  })
  it("User name is in the document", () => {
    const profileComponent = screen.getByTestId("user-profile-div")
    expect(profileComponent.textContent).toMatch(mockProps.user.name)
  })
  it("User instrument is in the document", () => {
    const profileComponent = screen.getByTestId("user-profile-div")
    expect(profileComponent.textContent).toMatch(mockProps.user.instrument)
  })

})