import { mockEnsembleAdmin } from "../../../../../../__mocks__/models/ensembleAdmin";
import { prismaMock } from "../../../../../../__mocks__/singleton";
import { updateAdmin } from "../../../../../../app/ensembles/admin/api/update/route";

describe("updateAdmin()", () => {
  const data = {
    adminId: mockEnsembleAdmin.id,
    positionTitle: mockEnsembleAdmin.positionTitle,
    accessType: mockEnsembleAdmin.accessType
  }
  it("prisma.ensembleAdmin.update is called with expected args and returns expected obj if successful", async () => {
    prismaMock.ensembleAdmin.update.mockResolvedValueOnce(mockEnsembleAdmin)
    const result = await updateAdmin(data)
    expect(result).toBe(mockEnsembleAdmin)
    expect(prismaMock.ensembleAdmin.update).toHaveBeenCalledWith({
      where: {
        id: data.adminId
      },
      data: {
        accessType: data.accessType,
        positionTitle: data.positionTitle
      }
    })
  })
  it("throws error if prisma throws", async () => {
    const error = new Error("Error!!!")
    prismaMock.ensembleAdmin.update.mockRejectedValueOnce(error)
    await expect(updateAdmin(data)).rejects.toThrow(`Failed to update ensemble admin: ${error.message}`)
    expect(prismaMock.ensembleAdmin.update).toHaveBeenCalledWith({
      where: {
        id: data.adminId
      },
      data: {
        accessType: data.accessType,
        positionTitle: data.positionTitle
      }
    })
  })
  it("if ID undefined, error is thrown", async () => {
    await expect(updateAdmin(undefined!)).rejects.toThrow("Failed to update ensemble admin: data is undefined")
    expect(prismaMock.ensembleAdmin.update).not.toHaveBeenCalled()
  })
})