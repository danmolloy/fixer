import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import SignIn from "../../../components/layout/signIn"
import { signIn } from "next-auth/react"

jest.mock("next-auth/react", () => ({
  signIn: jest.fn()
}))

describe("<SignIn />", () => {
  beforeEach(() => {
    render(<SignIn />)
  })
  it("sign-in-index is in the document", () => {
    const signInIndex = screen.getByTestId("sign-in-index")
    expect(signInIndex).toBeInTheDocument()
  })
  it("'Sign in' title is in the document", () => {
    const signInTitle = screen.getByText("Sign in to your account")
    expect(signInTitle).toBeInTheDocument()
  })
  it("GitHub button is in the document and calls signIn('github') on click", () => {
    const githubBtn = screen.getByTestId("github-btn")
    expect(githubBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(githubBtn)
    })
    expect(signIn).toHaveBeenCalledWith("github")
  })
  it("matches snapshot", () => {
    const signInIndex = screen.getByTestId("sign-in-index")
    expect(signInIndex).toMatchSnapshot()
  })
})