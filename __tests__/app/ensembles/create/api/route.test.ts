import { mockEnsemble } from "../../../../../__mocks__/models/ensemble";
import { mockUserId } from "../../../../../__mocks__/models/user";
import { prismaMock } from "../../../../../__mocks__/singleton";
import { createEnsemble } from "../../../../../app/ensembles/create/api/route";

describe("createEnsemble()", () => {
  const data = {
    name: mockEnsemble.name,
    userId: mockUserId,
    ensembleNames: mockEnsemble.ensembleNames
  }
  it("returns ensemble obj and calls ensemble.create with expected args if successful", async () => {
    prismaMock.ensemble.create.mockResolvedValueOnce(mockEnsemble)
    expect(await createEnsemble(data)).toBe(mockEnsemble)
    expect(prismaMock.ensemble.create).toHaveBeenCalledWith({
      data: {
        name: data.name,
        ensembleNames: data.ensembleNames,
        admin: {
          create: {
            positionTitle: "Manager",
            user: {
              connect: {
                id: data.userId
              }
            }
          }
        }
      }
    })
  })
  it("if !data, throws error", async () => {
    await expect(createEnsemble(undefined!)).rejects.toThrow("Failed to create ensemble: data not defined.")
    expect(prismaMock.ensemble.create).not.toHaveBeenCalled()
  })
  it("throws error if prisma throws", async () => {
    const error = new Error("mock error")
    prismaMock.ensemble.create.mockRejectedValue(error)
    await expect(createEnsemble(data)).rejects.toThrow(`Failed to create ensemble: ${error.message}`)
  })
})