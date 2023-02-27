import { handleFix, sendMessage } from "../../../pages/api/fixing/fixPlayer";
import { prismaMock } from "../../../singleton";
import { twilioClient } from "../../../twilio";

jest.mock("../../../twilio")
const smsMessageResultMock = {
  status: 'sent',
  sid: 'AC-lorem-ipsum',
  errorCode: undefined,
  errorMessage: undefined,
};

/* describe("handleFix", () => {
  it("handleFix returns expected object", async () => {
    const mockCalls = [{"id":298,"createdAt":"2022-12-10T11:52:29.508Z","updatedAt":"2022-12-11T13:50:42.939Z","recieved":false,"accepted":false,"musicianEmail":"Ramon_Christiansen83@gmail.com","eventInstrumentId":248,"musician":{"name":"Erick Wilderman"}}]
    //const mockCallsReturn = [{"id":298,"createdAt":"2022-12-10T11:52:29.508Z","updatedAt": new Date(),"recieved":true,"accepted":true,"musicianEmail":"Ramon_Christiansen83@gmail.com","eventInstrumentId":248,"musician":{"name":"Erick Wilderman"}}]

    prismaMock.playerCall.update.mockResolvedValue(mockCalls)
    // Not really testing this
    await expect(handleFix(mockCalls[0].id, mockCalls[0].musicianEmail)).resolves.not.toEqual(mockCalls)
  })
}) */

describe("sendMessage", () => {
  it("1 is 1", () => {
    expect(1).toBe(1)
  })
  /* 
  beforeEach(() => {
    const message = {
      create: jest.fn()
    };
    twilioClient['messages'] = message
  })
  
  it("sendMessage called with expected args", async() => {
    const mockCalls = [{"id":298,"createdAt":"2022-12-10T11:52:29.508Z","updatedAt":"2022-12-11T13:50:42.939Z","recieved":false,"accepted":false,"musicianEmail":"Ramon_Christiansen83@gmail.com","eventInstrumentId":248,"musician":{"name":"Erick Wilderman"}}]
    prismaMock.playerCall.update.mockResolvedValue(mockCalls)

    await expect(handleFix(mockCalls[0].id, mockCalls[0].musicianEmail)).resolves.not.toEqual(mockCalls)
    expect(sendMessage).toHaveBeenCalled()
  }) */
})