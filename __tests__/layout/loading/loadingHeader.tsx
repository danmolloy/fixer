import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import LoadingHeader from "../../../components/layout/loading/loadingHeader"

describe("<LoadingHeader />", () => {
  beforeEach(() => {
    render(<LoadingHeader />)
  })
  it("loading-header is in the document", () => {
    const loadingHeader = screen.getByTestId("loading-header")
    expect(loadingHeader).toBeInTheDocument()
  })
  it("gigFix branding is in the document", () => {
    const loadingHeader = screen.getByTestId("loading-header")
    expect(loadingHeader.textContent).toMatch(/^GigFix$/)
  })
})