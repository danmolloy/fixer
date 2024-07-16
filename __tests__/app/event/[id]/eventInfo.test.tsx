import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EventInfo, { EventInfoProps } from "../../../../app/event/[id]/eventInfo";
import { mockEvent } from "../../../../__mocks__/models/event";
import { mockCall } from "../../../../__mocks__/models/call";
import { mockEnsemble } from "../../../../__mocks__/models/ensemble";
import { DateTime } from "luxon";

const mockProps: EventInfoProps = {
  event: mockEvent,
  calls: [mockCall],
  ensemble: mockEnsemble
}

describe("<EventInfo />", () => {
  beforeEach(() => {
    render(
      <table>
        <EventInfo {...mockProps} />
      </table>
    )
  })
  it("<EventInfo /> renders", () => {
    const eventInfo = screen.getByTestId("event-info-body")
    expect(eventInfo).toBeInTheDocument()
  })
  it("event status is in the document with label", () => {
    const status = screen.getByTestId("event-status")
    expect(status).toBeInTheDocument()
    expect(status.textContent).toMatch(/^Status/)
    expect(status.textContent).toMatch(mockProps.event.confirmedOrOnHold.toLocaleUpperCase())
  })
  it("ensemble name is in the document with label", () => {
    const ensembleName = screen.getByTestId("ensemble-name")
    expect(ensembleName).toBeInTheDocument()
    expect(ensembleName.textContent).toMatch(/^Ensemble/)
    expect(ensembleName.textContent).toMatch(mockProps.event.ensembleName)
  })
  it("all calls are in the document with calls count", () => {
    const callsRow = screen.getByTestId("calls-row")
    expect(callsRow).toBeInTheDocument()
    expect(callsRow.textContent).toMatch(`${mockProps.calls.length} Call(s)`)
    const callTiles = screen.getAllByTestId("calls-row")
    for (let i = 0; i < mockProps.calls.length; i ++) {
      const call = mockProps.calls.sort((a, b) => Number(DateTime.fromJSDate(new Date(a.startTime))) - Number(DateTime.fromJSDate(new Date(b.startTime))))[i];
      expect(callTiles[i].textContent).toMatch(String(DateTime.fromJSDate(new Date(call.startTime)).toFormat("HH:mm DD")))
      expect(callTiles[i].textContent).toMatch(String(DateTime.fromJSDate(new Date(call.endTime)).toFormat("HH:mm DD")))
    }
  })
  it("program is in the document with label", () => {
    const program = screen.getByTestId("event-program")
    expect(program).toBeInTheDocument()
    expect(program.textContent).toMatch(/^Program/)
    expect(program.textContent).toMatch(mockProps.event.concertProgram)
  })
  it("dress code is in the document with label", () => {
    const dressCode = screen.getByTestId("event-dress")
    expect(dressCode).toBeInTheDocument()
    expect(dressCode.textContent).toMatch(/^Dress/)
    expect(dressCode.textContent).toMatch(mockProps.event.dressCode)
  })
  it("fee is in the document with label", () => {
    const fee = screen.getByTestId("event-fee")
    expect(fee).toBeInTheDocument()
    expect(fee.textContent).toMatch(/^Fee/)
    expect(fee.textContent).toMatch(mockProps.event.fee)
  })
  it("additional info is in the document with label", () => {
    const additionalInfo = screen.getByTestId("event-additional-info")
    expect(additionalInfo).toBeInTheDocument()
    expect(additionalInfo.textContent).toMatch(/^Additional Info/)
    expect(additionalInfo.textContent).toMatch(mockProps.event.additionalInfo!)
  })
  it("fixer name is in the document with label", () => {
    const fixerName = screen.getByTestId("event-fixer-name")
    expect(fixerName).toBeInTheDocument()
    expect(fixerName.textContent).toMatch(/^Fixer/)
    expect(fixerName.textContent).toMatch(mockProps.event.fixerName!)

  })
  it("created datetime is in the document with label", () => { const fixerName = screen.getByTestId("event-fixer-name")
    const createdAt = screen.getByTestId("created-datetime")
    expect(createdAt).toBeInTheDocument()
    expect(createdAt.textContent).toMatch(/^Event created/)
    expect(createdAt.textContent).toMatch(String(DateTime.fromJSDate(new Date(mockProps.event.createdAt)).toFormat("HH:mm DD")))
})
  it("updated datetime is in the document with label", () => {
    const updatedAt = screen.getByTestId("updated-datetime")
    expect(updatedAt).toBeInTheDocument()
    expect(updatedAt.textContent).toMatch(/^Last updated/)
    expect(updatedAt.textContent).toMatch(String(DateTime.fromJSDate(new Date(mockProps.event.updatedAt)).toFormat("HH:mm DD")))

  })
})