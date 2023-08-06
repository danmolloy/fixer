import { mockCall } from '../../../../__mocks__/models/call'
import { mockEvent, mockEventWithCalls } from '../../../../__mocks__/models/event'
import { mockUser } from '../../../../__mocks__/models/user'
import { prismaMock } from '../../../../__mocks__/singleton'
import { instrumentArr } from '../../../../components/fixing/fixing'
import { formattedSections } from '../../../../pages/api/event/create'
import { eventObj, formattedCalls, updateEvent } from '../../../../pages/api/event/edit/update'


describe("formattedCalls function", () => {
  it("Returns expect value", () => {
    expect(formattedCalls([mockCall], mockUser.email)).toEqual([mockCall].map(i => ({
      startTime: new Date(i.startTime),
      endTime: new Date(i.endTime),
      venue: i.venue,
      fixer: {
        connect: {
          email: mockUser.email
        }
      }
    })))
  })
})

describe("formattedSections function", () => {
  it("returns expected value", () => {
    expect(formattedSections()).toEqual([...instrumentArr].map(i => ({
      instrumentName: i
    })))
  })
})

describe("eventObj function", () => {
  it("Returns expected value", () => {
    const eventObjArg = {
      ensemble: mockEventWithCalls.ensembleName,
      concertProgram: mockEventWithCalls.concertProgram,
      confirmedOrOnHold: mockEventWithCalls.confirmedOrOnHold,
      calls: mockEventWithCalls.calls,
      fixerEmail: mockUser.email,
      dressCode: mockEventWithCalls.dressCode,
      fee: mockEventWithCalls.fee,
      additionalInfo: mockEventWithCalls.additionalInfo,
      id: mockEventWithCalls.id
    }
    expect(eventObj(eventObjArg)).toEqual({
      eventId: eventObjArg.id,
      ensemble: eventObjArg.ensemble,
      concertProgram: eventObjArg.concertProgram,
      confirmedOrOnHold: eventObjArg.confirmedOrOnHold,
      formattedCalls: formattedCalls(eventObjArg.calls, eventObjArg.fixerEmail),
      formattedSections: formattedSections(),
      dressCode: eventObjArg.dressCode,
      fee: eventObjArg.fee,
      additionalInfo: eventObjArg.additionalInfo,
      fixerEmail: eventObjArg.fixerEmail,
    })
  })
})

describe("updateEvent function", () => {
  it("returns expect value", async () => {
    prismaMock.event.update.mockResolvedValue(mockEvent)
    await expect(updateEvent({})).resolves.toEqual(mockEvent)
  })
})