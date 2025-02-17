import { mockContactMessage } from '../../../../../../__mocks__/models/contactMessage';
import { prismaMock } from '../../../../../../__mocks__/singleton';
import { emailBookingMusicians } from '../../../../../../app/fixing/contactMessage/api/create/emailFunctions';
import { releaseDeppers } from '../../../../../../app/fixing/contactMessage/api/update/depFunctions';
import { addMeterEvent } from '../../../../../../app/billing/api/meterEvent/lib';
import { updateContactMessage } from '../../../../../../app/fixing/contactMessage/api/update/functions';
import { mockEventSection } from '../../../../../../__mocks__/models/eventSection';
import { mockEvent } from '../../../../../../__mocks__/models/event';
import { mockEnsemble } from '../../../../../../__mocks__/models/ensemble';
import { ContactMessage, Ensemble, Event, EventSection } from '@prisma/client';

jest.mock(
  '../../../../../../app/fixing/contactMessage/api/create/emailFunctions',
  () => ({
    emailBookingMusicians: jest.fn(),
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
    eventSection: EventSection & {
      event: Event & {
        ensemble: Ensemble;
      };
    };
  };
  it('calls prisma.contactMessage.update with expected args', async () => {
    prismaMock.contactMessage.update.mockResolvedValueOnce(mockContactMessage);
    updateContactMessage({
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
    });
    expect(addMeterEvent).toHaveBeenCalledWith(
      mockData.eventSection.event.ensemble.stripeSubscriptionId
    );
    expect(releaseDeppers).toHaveBeenCalledWith(mockData.eventSectionId);
  });
  it('if a BOOKING booking is being accepted, addMeterEvent(subscriptionID) & releaseDeppers(args) are called', async () => {
    const mockData: FuncArg = {
      ...mockContactMessage,
      status: 'ACCEPTED',
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
    });
    expect(addMeterEvent).toHaveBeenCalledWith(
      mockData.eventSection.event.ensemble.stripeSubscriptionId
    );
    expect(releaseDeppers).toHaveBeenCalledWith(mockData.eventSectionId);
  });
  /* it('emailBookingMusicians is called', async () => {
    const mockData: FuncArg = {
      ...mockContactMessage,
      status: 'ACCEPTED',
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
        accepted: true,
      },
    });
    expect(emailBookingMusicians).toHaveBeenCalledWith(mockData.eventSectionId);
  }); */
  it('returns updated contactMessage', async () => {
    const mockData: FuncArg = {
      ...mockContactMessage,
      status: 'ACCEPTED',
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
      })
    ).toEqual({ ...mockData });
    //expect(emailBookingMusicians).toHaveBeenCalledWith(mockData.eventSectionId);
  });
  //it('catches errors', () => {});
});

//describe('updateContactIndex', () => {});
