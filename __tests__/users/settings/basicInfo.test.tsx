import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import BasicInfo from "../../../components/users/settings/basicInfo"
import axios from "axios";
import { mockUser } from "../../../__mocks__/models/user";

jest.mock("axios")
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps = {
  user: mockUser
}

describe("<BasicInfo />", () => {
  beforeEach(() => {
    act(() => {
      render(<BasicInfo {...mockProps} />)
    })
  })
  it("if submitting, submit btn is disabled", () => {})

  it("basic-info is in the document", () => {
    const basicInfo = screen.getByTestId("basic-info")
    expect(basicInfo).toBeInTheDocument()
  })
  it("basic info header text", () => {
    const headerText = screen.getByText("About You")
    expect(headerText).toBeInTheDocument()
  })
  it("helpful message is in the document", () => {
    const helpText = screen.getByText("We just need a bit of info from you.")
    expect(helpText).toBeInTheDocument()
  })
  it("personal-info is in the document", () => {
    const personalInfo = screen.getByTestId("personal-info")
    expect(personalInfo).toBeInTheDocument()
  }) 
  it("instruments-list is in the document", () => {
    const userInstruments = screen.getByTestId("instruments-list")
    expect(userInstruments).toBeInTheDocument()
  })
  it("submit-btn is in the document", () => {
    const submitBtn = screen.getByText("Submit")
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toHaveAttribute("type", "submit")
  })
  //it("doesn't submit without required fields", () => {})
  //it("initialVals are user details", () => {})
})

describe("", () => {
  const mockProps = {
    user: mockUser
  }
  beforeEach(() => {
    render(<BasicInfo {...mockProps} />)
  })
  it("submit btn calls axios with expected args", async () => {

    const submitBtn = screen.getByText("Submit")
    await act(async () => {
      await fireEvent.click(submitBtn)
    })
    const basicInfo = screen.getByTestId("basic-info")

    expect(mockPost).toBeCalledWith("/api/user/update", {data: {
      firstName: mockProps.user.firstName,
      lastName: mockProps.user.lastName,
      instrumentsList: mockProps.user.instrumentsList,
      email: mockProps.user.email,
      mobileNumber: mockProps.user.mobileNumber,
      preferredMethod: mockProps.user.preferredMethod
    }, userId: mockProps.user.id})
  }) 
})