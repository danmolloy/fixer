import { mockEnsembleContact } from "../../../../../../__mocks__/models/ensembleContact";
import { mockSection } from "../../../../../../__mocks__/models/ensembleSection";
import { prismaMock } from "../../../../../../__mocks__/singleton";
import { updateContacts, updateSection } from "../../../../../../app/ensembles/section/api/edit/route";

describe("updateContacts()", () => {
  it("calls ensembleContact.update with expected args and returns obj", async () => {
    prismaMock.ensembleContact.update.mockResolvedValue(mockEnsembleContact)
    const result = await updateContacts(mockEnsembleContact)
    expect(result).toBe(mockEnsembleContact)
    expect(prismaMock.ensembleContact.update).toHaveBeenCalledWith({
      where: {
        id: mockEnsembleContact.id
      },
      data: {
        indexNumber: mockEnsembleContact.indexNumber
      }
    })
  })
  it("throws err if prisma throws", async () => {
    const error = new Error("Not found")
    prismaMock.ensembleContact.update.mockRejectedValue(error)
    await expect(updateContacts(mockEnsembleContact)).rejects.toThrow(`Failed to update contact with id ${mockEnsembleContact.id}: ${error.message}`)
    expect(prismaMock.ensembleContact.update).toHaveBeenCalledWith({
      where: {
        id: mockEnsembleContact.id
      },
      data: {
        indexNumber: mockEnsembleContact.indexNumber
      }
    })
  })
  it("throws err if contact arg is undefined", async () => {
    await expect(updateContacts(undefined!)).rejects.toThrow(`Failed to update contact: Contact is undefined`)
    expect(prismaMock.ensembleContact.update).not.toHaveBeenCalled()
  })
})

describe("updateSection()", () => {
  /* it("calls updateContacts expected number of times with expected args", async () => {
    const randInt = Math.ceil(Math.random() * 10)
    const dataContacts = new Array(randInt).map(() => mockEnsembleContact)
    prismaMock.ensembleContact.update.mockResolvedValue(mockEnsembleContact)
    prismaMock.ensembleSection.update.mockResolvedValue(mockSection)
    const result = await updateSection({
      id: mockSection.id,
      name: mockSection.name,
      contacts: dataContacts
    })
    expect(result).toBe(mockSection)
    expect(prismaMock.ensembleContact.update).toHaveBeenCalledTimes(randInt)
  }) */
  it("calls ensembleSection.update with expected args and returns obj", async () => {
    prismaMock.ensembleSection.update.mockResolvedValue(mockSection)
    const result = await updateSection({
      id: mockSection.id,
      name: mockSection.name,
      contacts: [mockEnsembleContact]
    })
    expect(result).toBe(mockSection)
    expect(prismaMock.ensembleSection.update).toHaveBeenCalledWith({
      where: {
        id: mockSection.id
      },
      data: {
        name: mockSection.name
      }
    })
  })
  it("throws err if prisma throws", async () => {
    const error = new Error("Not found")
    prismaMock.ensembleSection.update.mockRejectedValue(error)
    await expect(updateSection({contacts: [mockEnsembleContact], id: "mock-id", name: "mock-name"})).rejects.toThrow(`Failed to update section with ID ${"mock-id"}: ${error.message}`)
    expect(prismaMock.ensembleSection.update).toHaveBeenCalledWith({
      where: {
        id: "mock-id"
      },
      data: {
        name: "mock-name"
      }
    })
  })
  it("throws err if data arg is undefined", async () => {
    await expect(updateSection(undefined!)).rejects.toThrow(`Failed to update section: section is undefined`)
    expect(prismaMock.ensembleSection.update).not.toHaveBeenCalled()
  })
})