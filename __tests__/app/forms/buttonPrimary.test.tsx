import "@testing-library/jest-dom"
import ButtonPrimary, { ButtonPrimaryProps} from "../../../app/forms/buttonPrimary"
import { act, fireEvent, render, screen } from "@testing-library/react"


describe("<ButtonPrimary />", () => {
  const mockProps: ButtonPrimaryProps = {
    isSubmitting: false,
    handleClick: jest.fn(),
    id: "mock-id",
    text: "mock-text",
    className: "",
    type: "submit"
  }
  beforeEach(() => {
    render(<ButtonPrimary {...mockProps} />)
  })
  it("<ButtonPrimary /> renders with text & type attr", () => {
    const buttonPrimary = screen.getByTestId(mockProps.id)
    expect(buttonPrimary).toBeInTheDocument()
  })
  it("handleClick is called on click", () => {
    const buttonPrimary = screen.getByTestId(mockProps.id)
    act(() => {
      fireEvent.click(buttonPrimary)
    })
    expect(mockProps.handleClick).toHaveBeenCalled()
  })
})



describe("<ButtonPrimary />", () => {
  const mockProps: ButtonPrimaryProps = {
    isSubmitting: true,
    handleClick: jest.fn(),
    id: "mock-id",
    text: "mock-text",
    className: "",
    type: "button"
  }
  beforeEach(() => {
    render(<ButtonPrimary {...mockProps} />)
  })
  it("'Submitting' text & btn disabled if submitting", () => {
    const buttonPrimary = screen.getByTestId(mockProps.id)
    expect(buttonPrimary.textContent).toMatch(/^Submitting$/)
    expect(buttonPrimary).toHaveAttribute("disabled")
  })
})