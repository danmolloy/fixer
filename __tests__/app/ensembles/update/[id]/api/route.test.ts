import { mockEnsemble } from "../../../../../../__mocks__/models/ensemble"
import { prismaMock } from "../../../../../../__mocks__/singleton"
import { updateEnsemble } from "../../../../../../app/ensembles/update/[id]/api/route"

describe("updateEnsemble()", () => {
  it("calls ensemble.update with expected args and returns obj", async () => {
    prismaMock.ensemble.update.mockResolvedValue(mockEnsemble)
    const result = await updateEnsemble({
      ensembleId: mockEnsemble.id,
      name: mockEnsemble.name,
    })
    expect(result).toBe(mockEnsemble)
    expect(prismaMock.ensemble.update).toHaveBeenCalledWith({
      where: {
        id: mockEnsemble.id
      },
      data: {
        name: mockEnsemble.name
      }
    })
  })
  it("throws err if prisma throws", async () => {
    const error = new Error("Not found")
    prismaMock.ensemble.update.mockRejectedValue(error)
    await expect(updateEnsemble({ensembleId: mockEnsemble.id, name: mockEnsemble.name})).rejects.toThrow(`Failed to update ensemble with ID ${mockEnsemble.id}: ${error.message}`)
    expect(prismaMock.ensemble.update).toHaveBeenCalledWith({
      where: {
        id: mockEnsemble.id
      },
      data: {
        name: mockEnsemble.name
      }
    })
  })
  it("throws err if data arg is undefined", async () => {
    await expect(updateEnsemble(undefined!)).rejects.toThrow(`Failed to update ensemble: ensemble is undefined`)
    expect(prismaMock.ensemble.update).not.toHaveBeenCalled()
  })
})