import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import SettingsIndex, { SettingsIndexProps } from "../../../components/users/settings"
import axios from "axios";
import { mockUser } from "../../../__mocks__/models/user";

jest.mock("axios")
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: SettingsIndexProps = {
  user: {
    ...mockUser,
    blockedUsers: []
  }
}

describe("<SettingsIndex />", () => {
  beforeEach(() => {
    render(<SettingsIndex {...mockProps} />)
  })
  it("text inputs are just text, with 'edit' btn which renders input box", () => {})
  it("if submitting, submit btn is disabled", () => {})
  it("after submission, msg confirms details have been updated", () => {})
  it("settings-index is in the document", () => {
    const settingsIndex = screen.getByTestId("settings-index")
    expect(settingsIndex).toBeInTheDocument()
  })
  it("header title is in the document", () => {
    const settingsTitle = screen.getByText("Your Settings")
    expect(settingsTitle).toBeInTheDocument()
  })
  it("personal-information is in the document", () => {
    const personalInfo = screen.getByTestId("personal-info")
    expect(personalInfo).toBeInTheDocument()
  })
  it("profile-information is in the document", () => {
    const profileInfo = screen.getByTestId("profile-info")
    expect(profileInfo).toBeInTheDocument()
  })
  it("account-information is in the document", () => {
    const accountInfo = screen.getByTestId("account-info")
    expect(accountInfo).toBeInTheDocument()
  })
  it("submit-btn is in the document", () => {
    const submitBtn = screen.getByText("Submit")
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toHaveAttribute("type", "submit")
  })
  it("submit btn calls axios with expected args", async () => {
    const mockData = {
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      instrumentsList: mockUser.instrumentsList,
      email: mockUser.email,
      mobileNumber: mockUser.mobileNumber,
      preferredMethod: mockUser.preferredMethod,
      profileText: mockUser.profileText,
      image: mockUser.image,
      fixingEnsembles: mockUser.fixingEnsembles
    }
    
    const submitBtn = screen.getByText("Submit")
    await act(async() => {
      await fireEvent.click(submitBtn)
    })
    expect(mockPost).toBeCalledWith("/api/user/update", {data: mockData, userId: mockProps.user.id})
  })
})

describe("<SettingsIndex />", () => {
  beforeEach(() => {
    const mockProps: SettingsIndexProps = {
      user: {
        ...mockUser,
        firstName: undefined,
        lastName: undefined,
        instrumentsList: [],
        email: undefined,
        mobileNumber: undefined,
        preferredMethod: undefined,
        blockedUsers: []
      }
    }
    render(<SettingsIndex {...mockProps} />)
  })
  it("if vals missing, handleSubmit is not called and errors messages are in the document", async () => {
    const submitBtn = screen.getByText("Submit")
    await act(async () => {
      await fireEvent.click(submitBtn)
    })
    expect(mockPost).not.toBeCalled()
    const settingsIndex = screen.getByTestId("settings-index")
    expect(settingsIndex.textContent).toMatch("first name required")
    expect(settingsIndex.textContent).toMatch("last name required")
    expect(settingsIndex.textContent).toMatch("email required")
    expect(settingsIndex.textContent).toMatch("contact number required")
    expect(settingsIndex.textContent).toMatch("please indicate your preferred contact method")

  }) 
})