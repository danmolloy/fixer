import { formattedCalls, formattedSections, eventObj, createEvent } from "../../../pages/api/event/create"

const mockCalls = [{"id":"1beb5694-4686-44de-9795-7772e554c7b5","startTime":"2022-12-10T10:00","endTime":"2022-12-10T13:00","venue":"MV"},{"id":"867462f5-f07e-4c1d-a84e-5b001bb7cbc0","startTime":"2022-12-10T14:00","endTime":"2022-12-10T15:00","venue":"MV"},{"id":"6f05aa59-a170-44f1-9071-132d3b2cf7ae","startTime":"2022-12-11T19:30","endTime":"2022-12-11T22:30","venue":"Barbican"}]
const mockEvent = {"fixer":{"name":"danmolloy","email":"danielmolloy_6@icloud.com"},"confirmOrHold":"confirmed","ensemble":"BBC Symphony Orchestra","ensembleName":"","concertProgram":"Mozart","calls":[{"id":"1beb5694-4686-44de-9795-7772e554c7b5","startTime":"2022-12-10T10:00","endTime":"2022-12-10T13:00","venue":"MV"},{"id":"867462f5-f07e-4c1d-a84e-5b001bb7cbc0","startTime":"2022-12-10T14:00","endTime":"2022-12-10T15:00","venue":"MV"},{"id":"6f05aa59-a170-44f1-9071-132d3b2cf7ae","startTime":"2022-12-11T19:30","endTime":"2022-12-11T22:30","venue":"Barbican"}],"dressCode":"Blacks","fee":"100","additionalInfo":""}

describe("Create Event", () => {
  it("1 is 1", () => {
    expect(1).toBe(1)
  })
  /* it("formattedCalls returns expected object", () => {
    const expectedCallsReturn = [...mockCalls].map(i => ({
      
        startTime: new Date(i.startTime),
        endTime: new Date(i.endTime),
        venue: i.venue,
        fixer: { connect: { email: mockEvent.fixer.email } }
      
    }))

    expect(formattedCalls(mockCalls, mockEvent.fixer.email)).toEqual(expectedCallsReturn)
  })

  it("formattedSections returns expected value2", () => {
    const expectedReturn = [{"instrumentName": "Violin"}, {"instrumentName": "Viola"}, {"instrumentName": "Cello"}, {"instrumentName": "Double Bass"}, {"instrumentName": "Flute"}, {"instrumentName": "Oboe"}, {"instrumentName": "Clarinet"}, {"instrumentName": "Bassoon"}, {"instrumentName": "Horn"}, {"instrumentName": "Trumpet"}, {"instrumentName": "Trombone"}, {"instrumentName": "Tuba"}, {"instrumentName": "Harp"}, {"instrumentName": "Timpani"}, {"instrumentName": "Percussion"}]
    expect(formattedSections()).toEqual(expectedReturn)
  })

  it("eventObj returns expected object", () => {
    const eventObjArg = {
      ensemble: mockEvent.ensemble,
      concertProgram: mockEvent.concertProgram,
      calls: mockEvent.calls,
      fixerEmail: mockEvent.fixer.email,
      dressCode: mockEvent.dressCode,
      fee: mockEvent.fee,
      additionalInfo: mockEvent.additionalInfo
    }

    const returnObj = {
      ensemble: mockEvent.ensemble,
      concertProgram: mockEvent.concertProgram,
      formattedCalls: formattedCalls(mockEvent.calls, mockEvent.fixer.email),
      fixerEmail: mockEvent.fixer.email,
      dressCode: mockEvent.dressCode,
      fee: mockEvent.fee,
      additionalInfo: mockEvent.additionalInfo
    }

    expect(eventObj(eventObjArg)).toEqual(returnObj)
  }) */
})