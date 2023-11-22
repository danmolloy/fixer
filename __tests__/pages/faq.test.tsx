import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import FaqPage from "../../pages/faq"


describe("<FaqPage />", () => {
  beforeEach(() => {
    require('next-auth/react').useSession = jest.fn(() => ({}));
    render(<FaqPage />)
  })
  it("<FaqIndex is in the document", () => {
    const faqIndex = screen.getByTestId("faq-index")
    expect(faqIndex).toBeInTheDocument()
  })
  it("<LayoutIndex is in the document", () => {
    const externalLayout = screen.getByTestId("external-layout")
    expect(externalLayout).toBeInTheDocument()
  })
})