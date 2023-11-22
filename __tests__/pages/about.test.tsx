import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import AboutPage from "../../pages/about"


describe("<AboutPage />", () => {
  beforeEach(() => {
    require('next-auth/react').useSession = jest.fn(() => ({}));
    render(<AboutPage />)
  })
  it("<AboutIndex is in the document", () => {
    const aboutIndex = screen.getByTestId("about-index")
    expect(aboutIndex).toBeInTheDocument()
  })
  it("<LayoutIndex is in the document", () => {
    const externalLayout = screen.getByTestId("external-layout")
    expect(externalLayout).toBeInTheDocument()
  })
})