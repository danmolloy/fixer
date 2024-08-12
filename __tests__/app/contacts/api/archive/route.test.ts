import { mockEnsembleContact } from "../../../../../__mocks__/models/ensembleContact";
import { prismaMock } from "../../../../../__mocks__/singleton";
import { archiveContact, POST } from "../../../../../app/contacts/api/archive/route";

describe("archiveContact()", () => {
  it("archives contact successfully & returns expected obj", async () => {
    const mockResponse = {
      ...mockEnsembleContact,
      phoneNumber: null,
      email: null,
      status: "ARCHIVED"
    }
    prismaMock.ensembleContact.update.mockResolvedValue(mockResponse)
    const result = await archiveContact({id: mockResponse.id})
    expect(prismaMock.ensembleContact.update).toHaveBeenCalledWith({
      where: {
        id: mockResponse.id
      },
      data: {
        status: "ARCHIVED",
        phoneNumber: null,
        email: null
      }
    })
    expect(result).toEqual(mockResponse)
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('id', mockResponse.id);
    expect(result).toHaveProperty('status', 'ARCHIVED');
    expect(result).toHaveProperty('phoneNumber', null);
    expect(result).toHaveProperty('email', null);
  })
  it("throws err if contact doesn't exist", async () => {
    const invalidContactId = 'non-existent-id';

    prismaMock.ensembleContact.update.mockRejectedValue(
      new Error('Contact not found')
    );
    await expect(archiveContact({ id: invalidContactId })).rejects.toThrow(
      'Contact not found'
    );
    expect(prismaMock.ensembleContact.update).toHaveBeenCalledWith({
      where: { id: invalidContactId },
      data: { status: 'ARCHIVED', phoneNumber: null, email: null },
    });
  })
  it("handles error if provided ID invalid", async () => {
    const invalidContactId = '';
    await expect(archiveContact({ id: invalidContactId })).resolves.toEqual(undefined)
    expect(prismaMock.ensembleContact.update).not.toHaveBeenCalled();
  })
})