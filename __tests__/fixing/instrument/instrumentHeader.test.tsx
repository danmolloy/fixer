import { render, screen, act, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import InstrumentHeader, { InstrumentHeaderProps } from "../../../components/fixing/instrument/instrumentHeader"
import { mockEventInstrument } from "../../../__mocks__/models/eventInstrument"
import { mockPlayerCall } from "../../../__mocks__/models/playerCall"

const mockProps: InstrumentHeaderProps = {
  eventInstrument: mockEventInstrument,
  playerCalls: [mockPlayerCall],
  setShowEdit: jest.fn(),
  showEdit: false
}

describe("<InstrumentHeader />", () => {
  beforeEach(() => {
    render(<InstrumentHeader {...mockProps} />)
  })
  it("instrument-header is in the document", () => {
    const instrumentHeader = screen.getByTestId("instrument-header")
    expect(instrumentHeader).toBeInTheDocument()
  })
  it("instrument name is in the document", () => {
    const instrumentName = screen.getByText(mockProps.eventInstrument.instrumentName)
    expect(instrumentName).toBeInTheDocument()
  })
  it("edit btn is in the document", () => {
    const editBtn = screen.getByTestId("edit-btn")
    expect(editBtn).toBeInTheDocument()
    expect(editBtn.textContent).toMatch(/^Edit$/)
  })
  it("edit btn calls showMenu on click", () => {
    const editBtn = screen.getByTestId("edit-btn")
    act(() => {
      fireEvent.click(editBtn)
    })
    expect(mockProps.setShowEdit).toBeCalledWith(true)
  })
})

describe("<InstrumentHeader />", () => {
  let mockProps: InstrumentHeaderProps = {
    showEdit: false,
    setShowEdit: jest.fn(),
    eventInstrument: {
      ...mockEventInstrument,
      numToBook: 1
    },
    playerCalls: [
      {
        ...mockPlayerCall,
        bookingOrAvailability: "Booking",
        accepted: false,
        status: "OK"
      }
    ]
  }
  beforeEach(() => {
    render(<InstrumentHeader {...mockProps} />)
  })
  it("states if instrument not yet booked", () => {
    const bookingStatus = screen.getByText("0 of 1 booked")
    expect(bookingStatus).toBeInTheDocument()
  })

})

describe("<InstrumentHeader />", () => {
  let mockProps: InstrumentHeaderProps = {
    showEdit: false,
    setShowEdit: jest.fn(),
    eventInstrument:{
      ...mockEventInstrument,
      numToBook: 1
    },
    playerCalls: [
      {
        ...mockPlayerCall,
        bookingOrAvailability: "Booking",
        accepted: true,
        status: "OK"
      }
    ]
  }
  beforeEach(() => {
    render(<InstrumentHeader {...mockProps} />)
  })
  it("states if instrument booked", () => {
    const bookingStatus = screen.getByText("1 of 1 booked")
    expect(bookingStatus).toBeInTheDocument()
  })
})

describe("<InstrumentHeader />", () => {
  let mockProps: InstrumentHeaderProps = {
    showEdit: false,
    setShowEdit: jest.fn(),
    eventInstrument:{
      ...mockEventInstrument,
      numToBook: 0
    },
    playerCalls: [
      {
        ...mockPlayerCall,
        bookingOrAvailability: "Booking",
        accepted: true,
        status: "OK"
      }
    ]
  }
  beforeEach(() => {
    render(<InstrumentHeader {...mockProps} />)
  })
  it("states if instrument overbooked", () => {
    const bookingStatus = screen.getByText("1 of 0 booked")
    expect(bookingStatus).toBeInTheDocument()
  })
})

describe("<InstrumentHeader />", () => {
  let mockProps: InstrumentHeaderProps = {
    showEdit: false,
    setShowEdit: jest.fn(),
    eventInstrument:{
      ...mockEventInstrument,
      numToBook: 1
    },
    playerCalls: [
      {
        ...mockPlayerCall,
        bookingOrAvailability: "Booking",
        accepted: true,
        status: "DEP OUT"
      }
    ]
  }
  beforeEach(() => {
    render(<InstrumentHeader {...mockProps} />)
  })
  it("states if player looking for dep", () => {
    const bookingStatus = screen.getByText("1 of 1 booked")
    expect(bookingStatus).toBeInTheDocument()
    const deppingStatus = screen.getByText("1 looking for dep")
    expect(deppingStatus).toBeInTheDocument()
  })

})

describe("<InstrumentHeader />", () => {
  let mockProps: InstrumentHeaderProps = {
    showEdit: false,
    setShowEdit: jest.fn(),
    eventInstrument:{
      ...mockEventInstrument,
      numToBook: 1
    },
    playerCalls: [
      {
        ...mockPlayerCall,
        bookingOrAvailability: "Availability",
        accepted: true,
        status: "OK"
      }
    ]
  }
  beforeEach(() => {
    render(<InstrumentHeader {...mockProps} />)
  })
  it("states if instrument overbooked", () => {
    const bookingStatus = screen.getByText("0 of 1 booked")
    expect(bookingStatus).toBeInTheDocument()
    const availabilityStatus = screen.getByText("1 available")
    expect(availabilityStatus).toBeInTheDocument()
  })
})