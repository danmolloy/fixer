import { mockContactMessage } from '../../../../../../../__mocks__/models/contactMessage';
import { prismaMock } from '../../../../../../../__mocks__/singleton';
import { updateContactEventCalls } from '../../../../../../../app/fixing/contactMessage/api/update/eventCalls/functions';

describe('updateContactEventCalls()', () => {
  it('calls prisma.contactMessage.update with expected args', async () => {
    prismaMock.contactMessage.update.mockResolvedValue(mockContactMessage);
    const data = {
      calls: {
        connect: [{ id: 13 }],
        disconnect: [{ id: 14 }],
      },
      contactMessageId: 42,
    };
    await updateContactEventCalls(data);
    expect(prismaMock.contactMessage.update).toHaveBeenCalledWith({
      where: {
        id: data.contactMessageId,
      },
      data: {
        calls: data.calls,
      },
      include: {
        contact: true,
        calls: true,
        eventSection: {
          include: {
            event: true,
            ensembleSection: true,
          },
        },
      },
    });
  });
  it('returns data', async () => {
    prismaMock.contactMessage.update.mockResolvedValue(mockContactMessage);
    const data = {
      calls: {
        connect: [{ id: 12 }],
        disconnect: [{ id: 11 }],
      },
      contactMessageId: 42,
    };
    expect(await updateContactEventCalls(data)).toEqual(mockContactMessage);
  });
  //it('catches error', () => {})
});
