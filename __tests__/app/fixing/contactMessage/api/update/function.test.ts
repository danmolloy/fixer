import { mockContactMessage } from '../../../../../../__mocks__/models/contactMessage';
import { prismaMock } from '../../../../../../__mocks__/singleton';
import { emailBookingMusicians } from '../../../../../../app/fixing/contactMessage/api/create/emailFunctions';
import { releaseDeppers } from '../../../../../../app/fixing/contactMessage/api/update/depFunctions';
import { addMeterEvent } from '../../../../../../app/billing/api/meterEvent/lib';
import { updateContactMessage } from '../../../../../../app/fixing/contactMessage/api/update/functions';
import { mockEventSection } from '../../../../../../__mocks__/models/eventSection';
import { mockEvent } from '../../../../../../__mocks__/models/event';
import { mockEnsemble } from '../../../../../../__mocks__/models/ensemble';

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
  it('calls prisma.contactMessage.update with expected args', async () => {
    prismaMock.contactMessage.update.mockResolvedValueOnce(mockContactMessage);
    updateContactMessage({
      id: 1,
      data: {
        accepted: true,
      },
    });
    expect(prismaMock.contactMessage.update).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
      data: { accepted: true },
      include: {
        eventSection: {
          include: {
            event: {
              include: {
                ensemble: true,
              },
            },
          },
        },
      },
    });
  });
  it('if a booking is being accepted, addMeterEvent(subscriptionID) & releaseDeppers(args) is called', async () => {
    const mockData = {
      ...mockContactMessage,
      bookingOrAvailability: 'Booking',
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
    expect(addMeterEvent).toHaveBeenCalledWith(
      mockData.eventSection.event.ensemble.stripeSubscriptionId
    );
    expect(releaseDeppers).toHaveBeenCalledWith(mockData.eventSectionId);
  });
  it('emailBookingMusicians is called', async () => {
    const mockData = {
      ...mockContactMessage,
      bookingOrAvailability: 'Booking',
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
  });
  it('returns updated contactMessage', () => {});
  it('catches errors', () => {});
});

describe('releaseDeppers', () => {
  it('updates first contactMessage in depping queue', () => {});
  it('calls emailDeppingMusician(args)', () => {});
  it('catches err', () => {});
});

describe('updateContactIndex', () => {});
