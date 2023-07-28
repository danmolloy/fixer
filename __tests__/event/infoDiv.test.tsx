import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"
import InfoDiv, { InfoDivProps } from "../../components/event/infoDiv"

const mockProps: InfoDivProps = {
  id: "skjlfdn20",
  className: "",
  title: "Mock Title",
  value: "Mock Value"
}



describe("EventOptions component", () => {
  beforeEach(() => {
    render(<InfoDiv {...mockProps} />)
  })
  it("Renders", () => {
    const infoDiv = screen.getByTestId(mockProps.id)
    expect(infoDiv).toBeInTheDocument()
  })
  it("Title is in the document", () => {
    const infoDiv = screen.getByTestId(mockProps.id)
    expect(infoDiv.textContent).toMatch(mockProps.title)
  })
  it("Value is in the document", () => {
    const infoDiv = screen.getByTestId(mockProps.id)
    expect(infoDiv.textContent).toMatch(mockProps.value)
  })
})