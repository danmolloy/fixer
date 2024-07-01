import CallTile, { CallTileProps } from "../../../../app/calendar/callList/callTile";
import "@testing-library/jest-dom"
import { screen, render } from "@testing-library/react";
import { mockCallWithEventWithEnsemble } from "../../../../__mocks__/models/call";
import { DateTime } from "luxon";

const mockProps: CallTileProps = {
  eventCall: mockCallWithEventWithEnsemble
}

describe("<CallTile />", () => {
  beforeEach(() => {
    render(<CallTile {...mockProps} />);
  })

  it("[X]-call-tile is in the document", () => {
    const callTile = screen.getByTestId(`${mockProps.eventCall.id}-call-tile`)
    expect(callTile).toBeInTheDocument()
  })
  it("ensemble name is in the document", () => {
    const ensembleName = screen.getByText(mockProps.eventCall.event.ensembleName)
    expect(ensembleName).toBeInTheDocument()
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
})