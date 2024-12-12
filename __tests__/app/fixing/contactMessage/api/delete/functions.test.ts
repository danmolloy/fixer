import { mockContactMessage } from "../../../../../../__mocks__/models/contactMessage"
import { prismaMock } from "../../../../../../__mocks__/singleton"
import { deleteContactMessage } from "../../../../../../app/fixing/contactMessage/api/delete/functions";

describe("deleteContactMessage()", () => {
  it("calls prisma.contactMessage.delete with expected args", async () => {
    prismaMock.contactMessage.delete.mockResolvedValue(mockContactMessage);
    const mockID = 42;
    await deleteContactMessage(mockID);
    expect(prismaMock.contactMessage.delete).toHaveBeenCalledWith({
      where: {
        id: mockID,
      },
    })
  })
  it("returns data", async () => {
    prismaMock.contactMessage.delete.mockResolvedValue(mockContactMessage);
    const mockID = mockContactMessage.id;
    expect(await deleteContactMessage(mockID)).toEqual(mockContactMessage);
  })
})