import { mockAdminInvite } from "../../../../../../__mocks__/models/adminInvite";
import { mockEnsembleAdmin } from "../../../../../../__mocks__/models/ensembleAdmin";
import { mockUserId } from "../../../../../../__mocks__/models/user";
import { prismaMock } from "../../../../../../__mocks__/singleton";
import { joinEnsemble } from "../../../../../../app/ensembles/admin/api/join/route";

describe("joinEnsemble()", () => {
  const data = {
    accessCode: mockAdminInvite.id,
    userId: mockUserId
  }
  it("if valid invite ID, adminInvite.findUnique, ensembleAdmin.create & adminInvite.delete are called & ensembleAdmin obj returned", async () => {
    prismaMock.adminInvite.findUnique.mockResolvedValueOnce(mockAdminInvite)
    prismaMock.ensembleAdmin.create.mockResolvedValueOnce(mockEnsembleAdmin)
    prismaMock.adminInvite.delete.mockResolvedValueOnce(mockAdminInvite)
    expect(await joinEnsemble(data)).toBe(mockAdminInvite)
    expect(prismaMock.adminInvite.findUnique).toHaveBeenCalledWith({
      where: {
        id: data.accessCode
      }
    })
    expect(prismaMock.ensembleAdmin.create).toHaveBeenCalledWith({
      data: {
        positionTitle: mockAdminInvite.positionTitle,
        accessType: mockAdminInvite.accessType,
        user: {
          connect: {
            id: data.userId
          }
        },
        ensemble: {
          connect: {
            id: mockAdminInvite.ensembleId
          }
        }
      }
    })
    expect(prismaMock.adminInvite.delete).toHaveBeenCalledWith({
      where: {
        id: data.accessCode
      }
    })
  })
  it("throws err if data undefined", async () => {
    expect(joinEnsemble(undefined!)).rejects.toThrow("Failed to join ensemble: data is undefined.")
    expect(prismaMock.adminInvite.findUnique).not.toHaveBeenCalled()
  })
  it("throws err if invalid access code", async () => {
    prismaMock.adminInvite.findUnique.mockResolvedValueOnce(null)
    await expect(joinEnsemble(data)).rejects.toThrow("Failed to join ensemble: Invalid access code.")
    prismaMock.adminInvite.findUnique.mockResolvedValueOnce(mockAdminInvite)
  })
  it("throws err if prisma throws", async () => {
    const error = new Error("Mock Error!")
    prismaMock.adminInvite.findUnique.mockResolvedValueOnce(mockAdminInvite)
    prismaMock.ensembleAdmin.create.mockRejectedValueOnce(error)
    await expect(joinEnsemble(data)).rejects.toThrow(`Failed to join ensemble: ${error.message}`)
    
    const error2 = new Error("Mock Error 2!")
    prismaMock.adminInvite.findUnique.mockResolvedValueOnce(mockAdminInvite)
    prismaMock.ensembleAdmin.create.mockResolvedValue(mockEnsembleAdmin)
    prismaMock.adminInvite.delete.mockRejectedValue(error2)
    await expect(joinEnsemble(data)).rejects.toThrow(`Failed to join ensemble: ${error2.message}`)

  })
})