import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import CallTile, { CallTileProps } from "../../../components/calendar/callList/callTile"
import { mockCallWithEvent } from "../../../__mocks__/models/call"
import { DateTime } from "luxon"

const mockProps: CallTileProps = {
  eventCall: mockCallWithEvent
}

describe("<EventCallTile />", () => {
  beforeEach(() => {
    render(<CallTile {...mockProps} />)
  })
  it("[X]-call-tile is in the document", () => {
    const callTile = screen.getByTestId(`${mockProps.eventCall.id}-call-tile`)
    expect(callTile).toBeInTheDocument()
  })
  it("ensemble name is in the document", () => {
    const ensembleName = screen.getByText(mockProps.eventCall.event.ensembleName)
    expect(ensembleName).toBeInTheDocument()
  })
  it("menu icon is in the document and renders menu on click", () => {
    const menuIcon = screen.getByTestId("menu-icon")
    expect(menuIcon).toBeInTheDocument() 
  })
  it("call start time is in the document", () => {
    const formattedTime = DateTime.fromJSDate(new Date(mockProps.eventCall.startTime)).toFormat("hh:mm a") //hour in 12-hour time, padded to 2:minute, padded to 2 meridiem
    const startTime = screen.getByText(formattedTime)
    expect(startTime).toBeInTheDocument()
  })
  it("call venue is in the document", () => {
    const venue = screen.getByText(mockProps.eventCall.venue)
    expect(venue).toBeInTheDocument()
  })
  
  //it("menu renders on menu icon click", () => {})
})