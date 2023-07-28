import { act, fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import ActiveCalls, { ActiveCallsProps } from "../../components/fixing/activeCalls"
import React from "react"
import { mockCall } from "../../__mocks__/models/call"
import { mockEventInstrumentWithMAndM } from "../../__mocks__/models/eventInstrument"

const mockActiveCallsProps: ActiveCallsProps = {
  eventCalls: [mockCall],
  instrumentName: mockEventInstrumentWithMAndM.instrumentName,
  instrumentSection: mockEventInstrumentWithMAndM,
  editList: false,
  instrumentFixed: false,
  refreshProps: jest.fn(),
  closeEdit: jest.fn(),
  bookingOrAvailability: "Booking",
}

describe("ActiveCalls component", () => {
  beforeEach(() => {
    render(<ActiveCalls {...mockActiveCallsProps} />)
  })
  it("Renders", () => {
    const activeCalls = screen.getByTestId("active-calls-div")
    expect(activeCalls).toBeInTheDocument()
  })

})

