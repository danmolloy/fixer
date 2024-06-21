import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"
import InfoDiv, { InfoDivProps } from "../../../app/event/[id]/infoDiv"

const mockProps: InfoDivProps = {
  id: "skjlfdn20",
  className: "",
  title: "Mock Title",
  value: "Mock Value"
}



describe("EventOptions component", () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <InfoDiv {...mockProps} />
        </tbody>
      </table>)
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