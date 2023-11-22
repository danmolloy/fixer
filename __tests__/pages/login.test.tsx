import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import SignInPage from "../../pages/login"


describe("<SignInPage />", () => {
  beforeEach(() => {
    require('next-auth/react').useSession = jest.fn(() => ({}));
    render(<SignInPage />)
  })
  it("<SignInIndex is in the document", () => {
    const signInIndex = screen.getByTestId("sign-in-index")
    expect(signInIndex).toBeInTheDocument()
  })
  it("<LayoutIndex is in the document", () => {
    const externalLayout = screen.getByTestId("external-layout")
    expect(externalLayout).toBeInTheDocument()
  })
})