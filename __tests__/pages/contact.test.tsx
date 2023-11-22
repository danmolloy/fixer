import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Contact from "../../pages/contact"

describe("<Contact />", () => {
  beforeEach(() => {
    render(<Contact />)
  })
  it("<ContactIndex is in the document", () => {
    const contactIndex = screen.getByTestId("contact-index")
    expect(contactIndex).toBeInTheDocument()
  })
  it("<LayoutIndex is in the document", () => {
    const externalLayout = screen.getByTestId("external-layout")
    expect(externalLayout).toBeInTheDocument()
  })
})