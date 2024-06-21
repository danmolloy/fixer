import { mockCall } from "../../../__mocks__/models/call"
import { mockEvent, mockEventWithCalls } from "../../../__mocks__/models/event"
import { mockUser } from "../../../__mocks__/models/user"
import { prismaMock } from "../../../__mocks__/singleton"
import { instrumentArr, sectionsArr } from "../../../components/fixing/fixing"
import { formattedCalls, formattedSections, eventObj, createEvent } from "../../../deprecatedPagesApi/api/event/create"

describe("formattedCalls function", () => {
  it("Returns expect value", () => {
    expect(formattedCalls([mockCall], mockUser.id)).toEqual([mockCall].map(i => ({
      startTime: new Date(i.startTime),
      endTime: new Date(i.endTime),
      venue: i.venue,
      fixer: {
        connect: {
          id: mockUser.id
        }
      }
    })))
  })
})

describe("formattedSections function", () => {
  it("returns expected value", () => {
    expect(formattedSections()).toEqual([...sectionsArr].map(i => ({
      instrumentName: i
    })))
  })
})

describe("eventObj function", () => {
  it("Returns expected value", () => {
    const eventObjArg = {
      ensembleId: mockEventWithCalls.ensembleId,
      eventTitle: mockEventWithCalls.eventTitle,
      concertProgram: mockEventWithCalls.concertProgram,
      confirmedOrOnHold: mockEventWithCalls.confirmedOrOnHold,
      calls: mockEventWithCalls.calls,
      fixerId: mockUser.id,
      fixerName: `${mockUser.firstName} ${mockUser.lastName}`,
      dressCode: mockEventWithCalls.dressCode,
      fee: mockEventWithCalls.fee,
      additionalInfo: mockEventWithCalls.additionalInfo,
      id: mockEventWithCalls.id
    }
    expect(eventObj(eventObjArg)).toEqual({
      eventTitle: eventObjArg.eventTitle,
      ensembleId: eventObjArg.ensembleId,
      concertProgram: eventObjArg.concertProgram,
      confirmedOrOnHold: eventObjArg.confirmedOrOnHold,
      formattedCalls: formattedCalls(eventObjArg.calls, eventObjArg.fixerId),
      //formattedSections: formattedSections(),
      dressCode: eventObjArg.dressCode,
      fee: eventObjArg.fee,
      additionalInfo: eventObjArg.additionalInfo,
      fixerId: eventObjArg.fixerId,
      fixerName: eventObjArg.fixerName
    })
  })
})


describe("createEvent function", () => {
  it("returns expected value", async () => {
    prismaMock.event.create.mockResolvedValue(mockEvent)
    await expect(createEvent({})).resolves.toEqual(mockEvent)
  })
})