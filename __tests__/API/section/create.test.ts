import { mockSection } from "../../../__mocks__/models/ensembleSection";
import { prismaMock } from "../../../__mocks__/singleton";
import { createSection } from "../../../pages/api/section/create";

describe("createSection()", () => {
  it("resolves to create section", () => {
    prismaMock.ensembleSection.create.mockResolvedValue(mockSection)
    expect(createSection({
      ensembleId: mockSection.ensembleId, 
      name: mockSection.name
    })).resolves.toEqual(mockSection)

  })
})