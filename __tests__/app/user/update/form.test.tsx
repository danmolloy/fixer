import "@testing-library/jest-dom";
import { render, screen, act, fireEvent } from "@testing-library/react";
import UpdateUserForm, { UpdateUserFormProps } from "../../../../app/user/update/form";
import { mockSession } from "../../../../__mocks__/session";
import axios from "../../../../__mocks__/axios";
import { useRouter } from "next/navigation";

jest.mock("axios")
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

jest.mock("next/navigation")

describe("<UpdateUserForm />", () => {
  const mockProps: UpdateUserFormProps = {
    session: mockSession
  }
  beforeEach(() => {
    render(<UpdateUserForm {...mockProps} />)
  })
  it("<UpdateUserForm /> is in the document with header", () => {
    const userForm = screen.getByTestId("user-form")
    expect(userForm).toBeInTheDocument()
    const header = screen.getByText("Update User")
    expect(header).toHaveRole("heading")
  })
  it("first name input is in the document with label, initialVal and name attr", () => {
    const firstName = screen.getByLabelText("First Name")
    expect(firstName).toBeInTheDocument()
    expect(firstName).toHaveAttribute("name", "firstName")
    expect(firstName).toHaveAttribute("type", "text")
    expect(firstName).toHaveValue(mockProps.session.user.firstName)
  })
  it("last name input is in the document with label, initialVal and name attr", () => {
    const lastName = screen.getByLabelText("Last Name")
    expect(lastName).toBeInTheDocument()
    expect(lastName).toHaveAttribute("name", "lastName")
    expect(lastName).toHaveAttribute("type", "text")
    expect(lastName).toHaveValue(mockProps.session.user.lastName)
  })
  it("mobile number input is in the document with label, initialVal, type and name attrs", () => {
    const mobileNumber = screen.getByLabelText("Mobile Number")
    expect(mobileNumber).toBeInTheDocument()
    expect(mobileNumber).toHaveAttribute("name", "mobileNumber")
    expect(mobileNumber).toHaveAttribute("type", "tel")
    expect(mobileNumber).toHaveValue(mockProps.session.user.mobileNumber)
  })
  it("email input is in the document with label, initialVal, type and name attrs", () => {
    const email = screen.getByLabelText("Email")
    expect(email).toBeInTheDocument()
    expect(email).toHaveAttribute("name", "email")
    expect(email).toHaveAttribute("type", "email")
    expect(email).toHaveValue(mockProps.session.user.email)
  })
  it("submit btn is in the document and calls axios.post & useRouter on click", async () => {
    const submitBtn = screen.getByText("Submit")
    expect(submitBtn).toHaveAttribute("type", "submit")
    expect(submitBtn).toHaveRole("button")

    await act(async() => {
      fireEvent.click(submitBtn)
    })
    expect(axios.post).toHaveBeenCalledWith("update/api", {
      email: mockProps.session.user.email,
      firstName: mockProps.session.user.firstName,
      lastName: mockProps.session.user.lastName,
      mobileNumber: mockProps.session.user.mobileNumber,
      id: mockProps.session.user.id
    })
    expect(useRouter).toHaveBeenCalled()
  })
})

describe("<UpdateUserForm />", () => {
  const mockProps: UpdateUserFormProps = {
    session: {
      ...mockSession,
      user: {
        ...mockSession.user,
        firstName: undefined,
        lastName: undefined,
        mobileNumber: undefined,
        email: undefined
      }
    }
  }
  beforeEach(() => {
    render(<UpdateUserForm {...mockProps} />)
  })
  it("err messages for first & last names, mobile and email render if submit btn clicked with details", async () => {
    const submitBtn = screen.getByText("Submit")
    await act(async() => {
      fireEvent.click(submitBtn)
    })
    expect(axios.post).not.toHaveBeenCalled()
    const userForm = screen.getByTestId("user-form")
    expect(userForm).toHaveTextContent("first name required")
    expect(userForm).toHaveTextContent("last name required")
    expect(userForm).toHaveTextContent("mobile number required")
    expect(userForm).toHaveTextContent("email address required")

  })
})