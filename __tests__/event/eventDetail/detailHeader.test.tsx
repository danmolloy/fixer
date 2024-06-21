import { act, fireEvent, render, screen } from "@testing-library/react"
import DetailHeader, { DetailHeaderProps } from "../../../app/event/[id]/eventHeader"
import "@testing-library/jest-dom"

const mockProps: DetailHeaderProps = {
  setShowMenu: jest.fn(),
  showMenu: false,
  eventTitle: "Test Gig"
}

describe("<DetailHeader />", () => {
  beforeEach(() => {
    render(
      <table>
        <DetailHeader {...mockProps} />
      </table>)
  })
  it("detail-header is in the document", () => {
    const detailHeader = screen.getByTestId("detail-header")
    expect(detailHeader).toBeInTheDocument()
  })
  it("event title is in the document", () => {
    const eventTitle = screen.getByText(mockProps.eventTitle)
    expect(eventTitle).toBeInTheDocument()
  })
  it("Options btn is in the document and calls showMenu on click", () => {
    const optionsBtn = screen.getByTestId('options-btn')
    expect(optionsBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(optionsBtn)
    })
    expect(mockProps.setShowMenu).toHaveBeenCalledWith(!mockProps.showMenu)
  })
})