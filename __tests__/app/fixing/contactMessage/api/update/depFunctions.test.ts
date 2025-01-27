import { prismaMock } from '../../../../../../__mocks__/singleton';
import { releaseDeppers } from '../../../../../../app/fixing/contactMessage/api/update/depFunctions';
import { emailDeppingMusician } from '../../../../../../app/fixing/contactMessage/api/create/emailFunctions';
import { mockContactMessage } from '../../../../../../__mocks__/models/contactMessage';
import { mockEnsembleContact } from '../../../../../../__mocks__/models/ensembleContact';
import { SentEmailData } from '../../../../../../app/sendGrid/lib';
import { mockEventSection } from '../../../../../../__mocks__/models/eventSection';
import { mockEvent } from '../../../../../../__mocks__/models/event';

const mockEmail: SentEmailData = {
  templateID: 'fake-template',
  email: mockEnsembleContact.email!,
  bodyText: 'Email body',
  subject: 'mock subject',
};
jest.mock(
  '../../../../../../app/fixing/contactMessage/api/create/emailFunctions',
  () => ({
    emailDeppingMusician: jest.fn(() => ({ ...mockEmail })),
  })
);

describe('releaseDeppers', () => {
  it('calls prisma.contactMessage.findMany with expected args', async () => {
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([]);
    await releaseDeppers(12);
    expect(prismaMock.contactMessage.findMany).toHaveBeenCalledWith({
      where: {
        eventSectionId: 12,
        status: 'FINDINGDEP',
      },
      orderBy: [
        {
          indexNumber: 'asc',
        },
      ],
    });
  });
  it('if deppingContacts.length > 0, prisma.contactMessage.update(args) is called', async () => {
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([
      mockContactMessage,
    ]);
    const mockUpdateData = {
      ...mockContactMessage,
      eventSection: {
        ...mockEventSection,
        event: mockEvent,
      },
    };
    prismaMock.contactMessage.update.mockResolvedValue(mockUpdateData);
    await releaseDeppers(12);
    expect(prismaMock.contactMessage.update).toHaveBeenCalledWith({
      where: {
        id: mockContactMessage.id,
      },
      data: {
        status: 'DECLINED',
        accepted: false,
      },
      include: {
        contact: true,
        calls: true,
        eventSection: {
          include: {
            event: true,
          },
        },
      },
    });
  });
  it('if deppingContacts.length > 0, emailDeppingMusician(args) is called', async () => {
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([
      mockContactMessage,
    ]);
    const mockUpdateData = {
      ...mockContactMessage,
      eventSection: {
        ...mockEventSection,
        event: mockEvent,
      },
    };
    prismaMock.contactMessage.update.mockResolvedValue(mockUpdateData);
    await releaseDeppers(12);
    expect(emailDeppingMusician).toHaveBeenCalledWith({
      ...mockUpdateData,
      ensembleName: mockUpdateData.eventSection.event.ensembleName,
      eventId: mockUpdateData.eventSection.eventId,
    });
  });
  it('if deppingContacts.length === 0, emailDeppingMusicians and prisma.contactMessage.update are not called', async () => {
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([]);
    const mockUpdateData = {
      ...mockContactMessage,
      eventSection: {
        ...mockEventSection,
        event: mockEvent,
      },
    };
    prismaMock.contactMessage.update.mockResolvedValue(mockUpdateData);

    expect(await releaseDeppers(12)).toBe(undefined);
    expect(prismaMock.contactMessage.findMany).toHaveBeenCalled();
    expect(prismaMock.contactMessage.update).not.toHaveBeenCalled();
    expect(emailDeppingMusician).not.toHaveBeenCalled();
  });
  //it("catches err", () => {})
});
