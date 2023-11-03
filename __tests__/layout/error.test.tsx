import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import ErrorLayout from "../../components/layout/error"

describe("<ErrorLayout />", () => {
  beforeEach(() => {
    render(<ErrorLayout />)
  })
  it("header is in the document", () => {
    const header = screen.getByTestId("loading-header")
    expect(header).toBeInTheDocument()
  })
  it("error message is in the document", () => {
    const errorBody = screen.getByTestId("error-body")
    expect(errorBody).toBeInTheDocument()
    expect(errorBody.textContent).toMatch("Sorry, we've encountered an error.")
    expect(errorBody.textContent).toMatch("We have been alerted of this and will fix it as soon as possible.")

  })
  //it("footer is in the document", () => {})
})