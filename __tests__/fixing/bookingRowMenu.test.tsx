import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import BookingRowMenu, { BookingTableRowMenuProps } from "../../components/fixing/bookingRowMenu"
import { mockPlayerCall } from "../../__mocks__/models/playerCall"
import { mockEventInstrumentWithMAndM } from "../../__mocks__/models/eventInstrument"

const mockProps: BookingTableRowMenuProps = {
  musician: {
    id: mockEventInstrumentWithMAndM.musicians[0].id,
    email: mockEventInstrumentWithMAndM.musicians[0].musician.email,
    name: mockEventInstrumentWithMAndM.musicians[0].musician.name,
    calls: [{
      id: String(mockEventInstrumentWithMAndM.musicians[0].calls[0].id),
      startTime: String(mockEventInstrumentWithMAndM.musicians[0].calls[0].startTime),
    }],
    recieved: mockEventInstrumentWithMAndM.musicians[0].recieved,
    accepted: mockEventInstrumentWithMAndM.musicians[0].accepted,
    },
  setShowMenu: jest.fn(),
  removePlayer: jest.fn(),
  sendMessage: jest.fn(),
  pokePlayer: jest.fn(),
  fixOrUnfix: jest.fn(),
  replace: jest.fn()
}

describe("BookingRowMenu component", () => {
  beforeEach(() => {
    render(<BookingRowMenu {...mockProps} />)
  })
  it("Renders", () => {
    const bookingRowMenu = screen.getByTestId("booking-row-menu")
    expect(bookingRowMenu).toBeInTheDocument()
  })
  it("'View Profile' link is in the document with expected href attr", () => {
    const viewProfileBtn = screen.getByTestId("profile-link")
    expect(viewProfileBtn).toBeInTheDocument()
    expect(viewProfileBtn).toHaveAttribute("href", `/user/${mockProps.musician.name}`)
  })
  it("'Remove from List' button is in document if !recieved and !accepted", () => { // Should this be accepted === null?
    if (mockProps.musician.recieved === false && mockProps.musician.accepted === null) {
      const removeBtn = screen.getByTestId("remove-btn")
      expect(removeBtn).toBeInTheDocument()
    }
  })
  it("'Remove from List' button calls removePlayer with expected arg on click", () => {
    if (mockProps.musician.recieved === false && mockProps.musician.accepted === false) {
      const removeBtn = screen.getByTestId("remove-btn")
      act(() => {
        fireEvent.click(removeBtn)
      })
      expect(mockProps.removePlayer).toBeCalledWith(mockProps.musician.id)
    }
  })
  it("'Send Message' button is in the document", () => {
    const messageBtn = screen.getByTestId("msg-btn")
    expect(messageBtn).toBeInTheDocument()
  })
  it("'Send Message' calls sendMessage with expected arg onClick", () => {
    const messageBtn = screen.getByTestId("msg-btn")
    act(() => {
      fireEvent.click(messageBtn)
    })
    expect(mockProps.sendMessage).toBeCalled()
  })
  it("'Fix Player' button is in the document if !accepted", () => {
    if (mockProps.musician.accepted === false) {
      const fixBtn = screen.getByTestId("fix-btn")
      expect(fixBtn).toBeInTheDocument()
    }
  })
  it("'Fix Player' calls fixOrUnfix with expected args", () => {
    if (mockProps.musician.accepted === false) {
      const fixBtn = screen.getByTestId("fix-btn")
      act(() => {
        fireEvent.click(fixBtn)
      })
      expect(mockProps.fixOrUnfix).toBeCalledWith(!mockProps.musician.accepted, mockProps.musician.id, mockProps.musician.email);
    }
  })
  it("'Unix Player' button is in the document if accepted === true", () => {
    if (mockProps.musician.accepted === true) {
      const unfixBtn = screen.getByTestId("unfix-btn")
      expect(unfixBtn).toBeInTheDocument()
    }
  })
  it("'Unix Player' calls fixOrUnfix with expected args", () => {
    if (mockProps.musician.accepted === true) {
      const unfixBtn = screen.getByTestId("unfix-btn")
      act(() => {
        fireEvent.click(unfixBtn)
      })
      expect(mockProps.fixOrUnfix).toBeCalledWith(!mockProps.musician.accepted, mockProps.musician.id, mockProps.musician.email);
    }
  })
  it("'Replace' button is in the document if accepted === true", () => {
    if (mockProps.musician.accepted === true) {
      const replaceBtn = screen.getByTestId("replace-btn")
      expect(replaceBtn).toBeInTheDocument();
    }
  })
  it("'Replace' calls replace() with expected args", () => {
    if (mockProps.musician.accepted === true) {
      const replaceBtn = screen.getByTestId("replace-btn")
      act(() => {
        fireEvent.click(replaceBtn)
      })
      expect(mockProps.replace).toBeCalledWith(mockProps.musician.id)
    }
  })
  it("'Poke' button is in the document if recieved === true && !accepted", () => {
    if (mockProps.musician.recieved && mockProps.musician.accepted === null) {
      const pokeBtn = screen.getByTestId("poke-btn")
      expect(pokeBtn).toBeInTheDocument()
    }
   })
  it("'Poke' calls pokePlayer with expected args", () => {
    if (mockProps.musician.recieved && mockProps.musician.accepted === null) {
      const pokeBtn = screen.getByTestId("poke-btn")
      act(() => {
        fireEvent.click(pokeBtn)
      })
      expect(mockProps.pokePlayer).toBeCalledWith(mockProps.musician.name)
    }
  })
})