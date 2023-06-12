import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import AvailabilityRowMenu from "../../components/fixing/availabilityRowMenu"

const mockProps = {
  musician: {
    id: 1,
    email: "mock@email.com",
    name: "Greg Ievers",
    calls: [{
      id: "3B",
      startTime: "10:00"
    }],
    recieved: true,
    accepted: true
    },
  setShowMenu: jest.fn(),
  removePlayer: jest.fn(),
  sendMessage: jest.fn(),
  pokePlayer: jest.fn(),
  offerOrDecline: jest.fn(),
};

describe("AvailabilityRowMenu", () => {
  beforeEach(() => {
    render(<AvailabilityRowMenu {...mockProps} />)
  })
  it("Renders", () => {
    const menuDiv = screen.getByTestId('availability-row-menu')
    expect(menuDiv).toBeInTheDocument()
  })
})