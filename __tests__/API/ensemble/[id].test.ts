import { prismaMock } from "../../../__mocks__/singleton";
import { mockUser } from "../../../__mocks__/models/user";
import { mockEnsemble } from "../../../__mocks__/models/ensemble";
import { findEnsemble } from "../../../pages/api/ensemble/[id]";


describe("findEnsemble function", () => {
  it("returns unique user when passed ensembleId", async() => {
    
    prismaMock.ensemble.findUnique.mockResolvedValue(mockEnsemble)
    expect(await findEnsemble(mockEnsemble.id)).toEqual({...mockEnsemble})
  })
})