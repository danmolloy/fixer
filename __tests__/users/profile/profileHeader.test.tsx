import { render, screen, act, fireEvent } from "@testing-library/react"; 
import "@testing-library/jest-dom"
import ProfileHeader, { ProfileHeaderProps } from "../../../components/users/profile/profileHeader";
import React from "react";
import { mockUser } from "../../../__mocks__/models/user";

const mockProps: ProfileHeaderProps = {
  user: mockUser,
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
    const image = screen.getByTestId("profile-img")
    expect(image).toBeInTheDocument()
  })
  it("user name is in the document", () => {
    const profileHeader = screen.getByTestId("profile-header")
    expect(profileHeader.textContent).toMatch(`${mockProps.user.firstName} ${mockProps.user.lastName}`)
  })
  it("all user instruments are in the document", () => {
    const profileHeader = screen.getByTestId("profile-header")
    for (let i = 0; i < mockProps.user.instrumentsList.length; i ++) {
      expect(profileHeader.textContent).toMatch(mockProps.user.instrumentsList[i])

    }
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
})

describe("<ProfileHeader />", () => {
  const mockProps: ProfileHeaderProps = {
    user: {
      ...mockUser,
      instrumentsList: ["Trombone"]
    },
    setShowContactInfo: jest.fn()
  }
  beforeEach(() => {
    render(<ProfileHeader {...mockProps} />)
  })
  it("directory button is in the document and calls directory/?instrument=${userInstrument}", () => {
    const directoryBtn = screen.getByTestId("directory-btn")
    expect(directoryBtn).toBeInTheDocument()
    expect(directoryBtn.textContent).toMatch(/^Directory$/)
    expect(directoryBtn).toHaveAttribute("href", `/directory?instrument=${mockProps.user.instrumentsList[0].toLocaleLowerCase()}`) // is this right? /?
  })
})

describe("<ProfileHeader />", () => {
  const mockProps: ProfileHeaderProps = {
    user: {
      ...mockUser,
      instrumentsList: ["Trombone", "Bass Trombone"]
    },
    setShowContactInfo: jest.fn()
  }
  beforeEach(() => {
    render(<ProfileHeader {...mockProps} />)
  })
  it("if user plays one instrument, directory button is in the document and calls directory/?instrument=${userInstrument}", () => {
    const directoryBtn = screen.getByTestId("directory-btn")
    expect(directoryBtn).toBeInTheDocument()
    expect(directoryBtn.textContent).toMatch(/^Directory$/)
    expect(directoryBtn).toHaveAttribute("href", `/directory`) // is this right? /?

  })

})