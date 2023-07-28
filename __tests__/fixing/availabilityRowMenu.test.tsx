import { render, screen, act, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import AvailabilityRowMenu, { TableRowMenuProps } from "../../components/fixing/availabilityRowMenu"

const recieved = Math.random() > 0.4 ? true : false
const accepted = recieved === false ? null : Math.random() > 0.6 ? true : Math.random() > 0.3 ? false : null
const mockProps: TableRowMenuProps = {
  musician: {
    id: 1,
    email: "mock@email.com",
    name: "Greg Ievers",
    calls: [{
      id: "3B",
      startTime: "10:00"
    }],
    recieved: recieved,
    accepted: accepted
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
  it("Player's name is in the document", () => {
    const menuDiv = screen.getByTestId('availability-row-menu')
    expect(menuDiv.textContent).toMatch(mockProps.musician.name)
  })
  it("View Profile link is in the document", () => {
    const profileLink = screen.getByText("View Profile")
    expect(profileLink).toBeInTheDocument()
  })
  //it("View Profile link redirects to expected page", () => {})
  it("'Remove from list' button is in the document", () => {
    const menuDiv = screen.getByTestId('availability-row-menu')
    if (mockProps.musician.recieved === false || mockProps.musician.accepted === false) {
      expect(menuDiv.textContent).toMatch("Remove from list")
    } else {
      expect(menuDiv.textContent).not.toMatch("Remove from list")

    }
  })
  it("'Remove from list' button calls removePlayer with expected arg", () => {
    if (mockProps.musician.recieved === false || mockProps.musician.accepted === false) {
      const removeBtn = screen.getByText("Remove from list")
      act(() => {
        fireEvent.click(removeBtn)
      })
      expect(mockProps.removePlayer).toHaveBeenCalledWith(mockProps.musician.id)
    }
  })

  it("'Send message' button is in the document", () => {
    const msgBtn = screen.getByTestId('send-msg-btn')
    expect(msgBtn).toBeInTheDocument()
    expect(msgBtn.textContent).toMatch("Send Message")

  })
  it("'Send message' button calls sendMessage with expected arg", () => {
    const msgBtn = screen.getByTestId('send-msg-btn');
    act(() => {
      fireEvent.click(msgBtn);
    })
    expect(mockProps.sendMessage).toBeCalledWith(mockProps.musician.name)
  })

  it("Offer button is in the document", () => {
    const offerBtn = screen.getByTestId("offer-btn");
    expect(offerBtn).toBeInTheDocument();
  })
  it("Offer button calls offerOrDecline with expected arg", () => {
    const offerBtn = screen.getByTestId("offer-btn");
    act(() => {
      fireEvent.click(offerBtn);
    })
    expect(mockProps.offerOrDecline).toBeCalledWith(true, mockProps.musician.id, mockProps.musician.email)
  })

  it("Decline button is in the document", () => {
    const declineBtn = screen.getByTestId("decline-btn");
    expect(declineBtn).toBeInTheDocument();
  })
  it("Decline button calls offerOrDecline with expected arg", () => {
    const declineBtn = screen.getByTestId("decline-btn");
    act(() => {
      fireEvent.click(declineBtn)
    })
    expect(mockProps.offerOrDecline).toBeCalledWith(false, mockProps.musician.id, mockProps.musician.email)
  })

})