import { mockEnsembleAdmin } from "../../../../../../__mocks__/models/ensembleAdmin";
import { prismaMock } from "../../../../../../__mocks__/singleton";
import { deleteAdmin } from "../../../../../../app/ensembles/admin/api/delete/route";

describe("deleteAdmin", () => {
  it("calls prisma delete method with correct args & returns expected obj", async () => {
    prismaMock.ensembleAdmin.delete.mockResolvedValue(mockEnsembleAdmin)
    const result = await deleteAdmin({adminId: mockEnsembleAdmin.id})
    expect(result).toBe(mockEnsembleAdmin)
    expect(prismaMock.ensembleAdmin.delete).toHaveBeenCalledWith({
      where: {
        id: mockEnsembleAdmin.id
      }
    })
  })
  it("returns err if throws", async () => {
    const error = new Error("Not found")
    prismaMock.ensembleAdmin.delete.mockRejectedValue(error)
    await expect(deleteAdmin({adminId: mockEnsembleAdmin.id})).rejects.toThrow(`Failed to delete admin with id ${mockEnsembleAdmin.id}: ${error.message}`)
    expect(prismaMock.ensembleAdmin.delete).toHaveBeenCalledWith({
      where: {
        id: mockEnsembleAdmin.id
      }
    })
  })
  it("throws if adminId not provided", async () => {
    await expect(deleteAdmin({adminId: ""})).rejects.toThrow(`Failed to delete admin: adminId is required`)
    await expect(deleteAdmin({adminId: undefined!})).rejects.toThrow(`Failed to delete admin: adminId is required`)
    expect(prismaMock.ensembleAdmin.delete).not.toHaveBeenCalled()
  })
})