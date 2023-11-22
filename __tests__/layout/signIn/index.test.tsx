import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import SignIn from "../../../components/layout/signIn"

describe("<SignIn />", () => {
  beforeEach(() => {
    render(<SignIn />)
  })
  it("sign-in-index is in the document", () => {
    const signInIndex = screen.getByTestId("sign-in-index")
    expect(signInIndex).toBeInTheDocument()
  })
})