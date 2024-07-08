/**
 * @jest-environment jsdom
 */
import { createContact, CreateEnsembleContact, POST } from "../../../../../app/contacts/api/create/route";
import { prismaMock } from "../../../../../__mocks__/singleton";
import { mockEnsembleContact } from "../../../../../__mocks__/models/ensembleContact";
import { mockSection } from "../../../../../__mocks__/models/ensembleSection";

//describe("POST handler", () => {})

describe("createContact()", () => {
  it("creates contact and connects section succesfully", async () => {
    const mockContact: CreateEnsembleContact = {
      ...mockEnsembleContact,
      email: "adsfkl@cf.com",
      category: "mockCategory",
      section: mockSection,
      phone: "123455"
    }
    prismaMock.ensembleContact.create.mockResolvedValue(mockEnsembleContact)
    await expect(createContact(mockContact)).resolves.toEqual(mockEnsembleContact)
  })
  it("creates contact and creates section successfully", async () => {
    const mockContact: CreateEnsembleContact = {
      ...mockEnsembleContact,
      email: "adsfkl@cf.com",
      category: "mockCategory",
      section: {
        ...mockSection, 
        id: undefined
      },
      phone: "123455"
    }
    prismaMock.ensembleContact.create.mockResolvedValue(mockEnsembleContact)
    await expect(createContact(mockContact)).resolves.toEqual(mockEnsembleContact)
  })
  it("handles error", async () => {
    const mockContact = {
      ...mockEnsembleContact,
      email: "adsfkl@cf.com",
      category: "mockCategory",
      section: {
        ...mockSection, 
        id: undefined
      },
      phone: "123456"
    }
    const mockError = new Error("Error creating contact");
    prismaMock.ensembleContact.create.mockRejectedValue(mockError);
    await expect(createContact(mockContact)).rejects.toEqual(mockError)

  })
})