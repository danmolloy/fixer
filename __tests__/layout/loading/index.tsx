import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import LoadingLayout from "../../../components/layout/loading"

describe("<LoadingLayout />", () => {
  beforeEach(() => {
    render(<LoadingLayout />)
  })
  it("loading-layout is in the document", () => {
    const loadingLayout = screen.getByTestId("loading-layout")
    expect(loadingLayout).toBeInTheDocument()
  })
  it("loading-header is in the document", () => {
    const loadingHeader = screen.getByTestId("loading-header")
    expect(loadingHeader).toBeInTheDocument()
  })
  it("loading-body is in the document", () => {
    const loadingBody = screen.getByTestId("loading-body")
    expect(loadingBody).toBeInTheDocument()
  })
})