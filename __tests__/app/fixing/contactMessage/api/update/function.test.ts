import { mockContactMessage } from '../../../../../../__mocks__/models/contactMessage';
import { prismaMock } from '../../../../../../__mocks__/singleton';
import { releaseDeppers } from '../../../../../../app/fixing/contactMessage/api/update/depFunctions';
import { addMeterEvent } from '../../../../../../app/billing/api/meterEvent/lib';
import { updateContactMessage } from '../../../../../../app/fixing/contactMessage/api/update/functions';
import { mockEventSection } from '../../../../../../__mocks__/models/eventSection';
import { mockEvent } from '../../../../../../__mocks__/models/event';
import { mockEnsemble } from '../../../../../../__mocks__/models/ensemble';
import {
  Call,
  ContactEventCall,
  ContactEventCallStatus,
  ContactMessage,
  Ensemble,
  Event,
  EventSection,
} from '@prisma/client';
import { mockContactEventCall } from '../../../../../../__mocks__/models/ContactEventCall';
import { mockCall } from '../../../../../../__mocks__/models/call';
import { handleFixing } from '../../../../../../app/fixing/contactMessage/api/create/functions';

jest.mock(
  '../../../../../../app/fixing/contactMessage/api/create/functions',
  () => ({
    handleFixing: jest.fn(),
  })
);

jest.mock(
  '../../../../../../app/fixing/contactMessage/api/update/depFunctions',
  () => ({
    releaseDeppers: jest.fn(),
  })
);

jest.mock('../../../../../../app/billing/api/meterEvent/lib', () => ({
  addMeterEvent: jest.fn(),
}));

describe('updateContactMessage', () => {
  type FuncArg = ContactMessage & {
    eventCalls: (ContactEventCall & { call: Call })[];
    eventSection: EventSection & {
      event: Event & {
        ensemble: Ensemble;
      };
    };
  };
  it('calls prisma.contactMessage.update with expected args', async () => {
    const mockData: FuncArg = {
      ...mockContactMessage,
      eventCalls: [{ ...mockContactEventCall, call: mockCall }],
      eventSection: {
        ...mockEventSection,
        event: {
          ...mockEvent,
          ensemble: mockEnsemble,
        },
      },
    };
    prismaMock.contactMessage.update.mockResolvedValueOnce(mockData);
    await updateContactMessage({
      id: 1,
      data: {
        status: 'DECLINED',
      },
    });
    expect(prismaMock.contactMessage.update).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
      data: {
        status: 'DECLINED',
      },
      include: {
        contact: true,
        eventCalls: {
          include: {
            call: true,
          },
        },
        eventSection: {
          include: {
            event: {
              include: {
                ensemble: true,
                fixer: true,
              },
            },
          },
        },
      },
    });
  });
  it('if an AUTOBOOKED booking is being accepted, addMeterEvent(subscriptionID) & releaseDeppers(args) are called', async () => {
    const mockData: FuncArg = {
      ...mockContactMessage,
      status: 'AUTOBOOKED',
      eventCalls: [{ ...mockContactEventCall, call: mockCall }],
      eventSection: {
        ...mockEventSection,
        event: {
          ...mockEvent,
          ensemble: mockEnsemble,
        },
      },
    };
    prismaMock.contactMessage.update.mockResolvedValueOnce(mockData);
    await updateContactMessage({
      id: 1,
      data: {
        status: 'AUTOBOOKED',
      },
      eventCalls: [
        {
          status: 'ACCEPTED' as ContactEventCallStatus,
          callId: 12,
        },
      ],
    });
    expect(addMeterEvent).toHaveBeenCalledWith(
      mockData.eventSection.event.ensemble.stripeSubscriptionId
    );
    expect(releaseDeppers).toHaveBeenCalledWith(mockData.eventSectionId);
  });
  it('if a BOOKING booking is being accepted, addMeterEvent(subscriptionID) & releaseDeppers(args) are called', async () => {
    const mockData: FuncArg = {
      ...mockContactMessage,
      eventCalls: [{ ...mockContactEventCall, call: mockCall }],
      eventSection: {
        ...mockEventSection,
        event: {
          ...mockEvent,
          ensemble: mockEnsemble,
        },
      },
    };
    prismaMock.contactMessage.update.mockResolvedValueOnce(mockData);
    await updateContactMessage({
      id: 1,
      data: {
        status: 'RESPONDED',
      },
      eventCalls: [
        {
          status: 'ACCEPTED' as ContactEventCallStatus,
          callId: 12,
        },
      ],
    });
    expect(addMeterEvent).toHaveBeenCalledWith(
      mockData.eventSection.event.ensemble.stripeSubscriptionId
    );
    expect(releaseDeppers).toHaveBeenCalledWith(mockData.eventSectionId);
  });

  it('returns updated contactMessage', async () => {
    const mockData: FuncArg = {
      ...mockContactMessage,
      eventCalls: [{ ...mockContactEventCall, call: mockCall }],
      eventSection: {
        ...mockEventSection,
        event: {
          ...mockEvent,
          ensemble: mockEnsemble,
        },
      },
    };
    prismaMock.contactMessage.update.mockResolvedValueOnce(mockData);
    expect(
      await updateContactMessage({
        id: 1,
        data: {
          status: 'ACCEPTED',
        },
        eventCalls: [
          {
            status: 'ACCEPTED' as ContactEventCallStatus,
            callId: 12,
          },
        ],
      })
    ).toEqual({ ...mockData });
  });
  it('calls handleFixing with expected args', async () => {
    const mockData: FuncArg = {
      ...mockContactMessage,
      eventCalls: [{ ...mockContactEventCall, call: mockCall }],
      eventSection: {
        ...mockEventSection,
        event: {
          ...mockEvent,
          ensemble: mockEnsemble,
        },
      },
    };
    prismaMock.contactMessage.update.mockResolvedValueOnce(mockData);

    await updateContactMessage({
      id: 1,
      data: {
        status: 'ACCEPTED',
      },
      eventCalls: [
        {
          status: 'ACCEPTED' as ContactEventCallStatus,
          callId: 12,
        },
      ],
    });
    expect(handleFixing).toHaveBeenCalledWith(mockData.eventSection.eventId);
  });
  //it('catches errors', () => {});
});

//describe('updateContactIndex', () => {});
