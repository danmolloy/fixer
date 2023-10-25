import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import ViewSelect, { ViewSelectProps, viewOptions } from "../../components/calendar/viewSelect"

const mockProps: ViewSelectProps = {
  selectedView: "Day",
  setSelectedView: jest.fn()
}

describe("<ViewSelect />", () => {
  beforeEach(() => {
    render(<ViewSelect {...mockProps} />)
  })
  it("view-select is in the document", () => {
    const viewSelect = screen.getByTestId("view-select")
    expect(viewSelect).toBeInTheDocument()
  })
  it("selectedView is in the document and renders other options on click", () => {
    const selectedView = screen.getByTestId("selected-view")
    expect(selectedView).toBeInTheDocument()
    expect(selectedView.textContent).toMatch(mockProps.selectedView)
    act(() => {
      fireEvent.click(selectedView)
    })
    for (let i = 0; i < viewOptions.length; i++) {
      let alternateOption = screen.getByTestId(`${viewOptions[i]}-option`)
      expect(alternateOption.textContent).toMatch(viewOptions[i])
    }
  })
  it("clicking alternative option calls setSelectedView with selected value", () => {
    const selectedView = screen.getByTestId("selected-view")
    expect(selectedView).toBeInTheDocument()
    expect(selectedView.textContent).toMatch(mockProps.selectedView)
    act(() => {
      fireEvent.click(selectedView)
    })
    let optionIndex = Math.floor(Math.random() * viewOptions.length)
    let alternateOption = screen.getByText(viewOptions[optionIndex])

    act(() => {
      fireEvent.click(alternateOption)
    })

    expect(mockProps.setSelectedView).toBeCalledWith(alternateOption.textContent)
    
  })
})