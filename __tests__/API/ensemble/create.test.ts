import { mockEnsemble, mockEnsembleWithAdmin } from "../../../__mocks__/models/ensemble"
import { mockUser, mockUserId } from "../../../__mocks__/models/user"
import { prismaMock } from "../../../__mocks__/singleton"
import { createEnsembleAndAdmin } from "../../../pages/api/ensemble/create"

describe("createEnsembleAndAdmin()", () => {
  it("resolves to create ensemble and admin", async () => {
    prismaMock.ensemble.create.mockResolvedValue({
      id: mockEnsembleWithAdmin.id,
      name: mockEnsembleWithAdmin.name
    })
    await expect(createEnsembleAndAdmin({
      ensembleName: mockEnsembleWithAdmin.name,
      userPositionTitle: mockEnsembleWithAdmin.admin[0].positionTitle,
      userId: mockEnsembleWithAdmin.admin[0].userId
    })).resolves.toEqual({
      id: mockEnsembleWithAdmin.id,
      name: mockEnsembleWithAdmin.name
    })
  })
})