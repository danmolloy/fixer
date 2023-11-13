import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import ContactInfo from "../../components/directory/contactInfo";
import React from "react";
import { mockUser } from "../../__mocks__/models/user";

const mockProps = {
  player: mockUser,
  setShowContactInfo: jest.fn()
}

describe("ContactInfo Component", () => {
  beforeEach(() => {
    render(<ContactInfo {...mockProps} />)
  })
  it("Renders", () => {
    const contactInfoDiv = screen.getByTestId("contact-info")
    expect(contactInfoDiv).toBeInTheDocument()
  })
  it("showMenu button calls setShowContactInfo", () => {
    const closeButton = screen.getByTestId("close-btn")
    expect(closeButton).toBeInTheDocument()
    act(() => {
      fireEvent.click(closeButton)
    })
    expect(mockProps.setShowContactInfo).toBeCalled()
  })
  it("Email is in the document", () => {
    const emailInfo = screen.getByTestId("email-info");
    expect(emailInfo).toBeInTheDocument()
    expect(emailInfo.textContent).toMatch(mockProps.player.email)
  })
  it("Phone number is in the document", () => {
    const phoneInfo = screen.getByTestId("phone-info")
    expect(phoneInfo).toBeInTheDocument()
    expect(phoneInfo.textContent).toMatch(mockProps.player.mobileNumber)
  })
  it("Preferred contact method is in the document", () => {
    const preferredInfo = screen.getByTestId("preferred-info")
    expect(preferredInfo).toBeInTheDocument()
    expect(preferredInfo.textContent).toMatch(mockProps.player.preferredMethod)
  })
})