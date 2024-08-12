import { mockEnsemble } from "../../../../__mocks__/models/ensemble";
import { prismaMock } from "../../../../__mocks__/singleton";
import { deleteEnsemble } from "../../../../app/ensembles/delete/route";

describe("deleteEnsemble", () => {
  it("calls ensemble.delete with expected args and returns obj", async () =>{
    prismaMock.ensemble.delete.mockResolvedValue(mockEnsemble)
    const result = await deleteEnsemble(mockEnsemble.id)
    expect(result).toBe(mockEnsemble)
    expect(prismaMock.ensemble.delete).toHaveBeenCalledWith({
      where: {
        id: mockEnsemble.id
      }
    })
  })
  it("throws err if prisma throws", async () => {
    const error = new Error("Not found")
    prismaMock.ensemble.delete.mockRejectedValue(error)
    await expect(deleteEnsemble(mockEnsemble.id)).rejects.toThrow(`Failed to delete ensemble with id ${mockEnsemble.id}: ${error.message}`)
    expect(prismaMock.ensemble.delete).toHaveBeenCalledWith({
      where: {
        id: mockEnsemble.id
      }
    })
  })
  it("throws if ensembleId not provided", async () => {
    await expect(deleteEnsemble("")).rejects.toThrow(`Failed to delete ensemble: Ensemble ID is required`)
    await expect(deleteEnsemble(undefined!)).rejects.toThrow(`Failed to delete ensemble: Ensemble ID is required`)
    expect(prismaMock.ensemble.delete).not.toHaveBeenCalled()

  })
})