import { mockAdminInvite } from "../../../../../../__mocks__/models/adminInvite";
import { prismaMock } from "../../../../../../__mocks__/singleton";
import { createAdminInvite } from "../../../../../../app/ensembles/admin/api/invite/route";

describe("createAdminInvite()", () => {
  const data = {
    firstName: mockAdminInvite.firstName, 
    lastName: mockAdminInvite.lastName,
    email: mockAdminInvite.email, 
    ensembleId: mockAdminInvite.ensembleId,
    positionTitle: mockAdminInvite.positionTitle,
    accessType: mockAdminInvite.accessType
  }
  it("calls prisma create method with expected args & returns expected obj", async () => {
    prismaMock.adminInvite.create.mockResolvedValue(mockAdminInvite)
    const result = await createAdminInvite(data)
    expect(result).toBe(mockAdminInvite)
    expect(prismaMock.adminInvite.create).toHaveBeenCalledWith({
      data: {
        firstName: mockAdminInvite.firstName, 
        lastName: mockAdminInvite.lastName,
        email: mockAdminInvite.email, 
        ensemble:{
          connect: {
            id: mockAdminInvite.ensembleId
          }
        },
        positionTitle: mockAdminInvite.positionTitle,
        accessType: mockAdminInvite.accessType
      }
    })
  })
  it("throws error if data undefined", async () => {
    await expect(createAdminInvite(undefined!)).rejects.toThrow("Failed to create invite: invite data is undefined.")
    expect(prismaMock.adminInvite.create).not.toHaveBeenCalled()
  })
  it("throws error if prisma throws", async () => {
    const error = new Error("Error!!")
    prismaMock.adminInvite.create.mockRejectedValue(error)
    await expect(createAdminInvite(data)).rejects.toThrow(`Failed to create invite: ${error.message}`)
    expect(prismaMock.adminInvite.create).toHaveBeenCalledWith({
      data: {
        firstName: mockAdminInvite.firstName, 
        lastName: mockAdminInvite.lastName,
        email: mockAdminInvite.email, 
        ensemble:{
          connect: {
            id: mockAdminInvite.ensembleId
          }
        },
        positionTitle: mockAdminInvite.positionTitle,
        accessType: mockAdminInvite.accessType
      }
    })
  })
})