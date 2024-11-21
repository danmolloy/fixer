import { randomBytes } from 'crypto';
import {
  CreateContactMessageProps,
  createContactMessages,
  generateToken,
  getDateRange,
  getNumToContact,
  gigIsFixed,
} from '../../../../../../app/fixing/contactMessage/api/create/functions';
import { prismaMock } from '../../../../../../__mocks__/singleton';
import { mockContactMessage } from '../../../../../../__mocks__/models/contactMessage';
import { mockEventSection } from '../../../../../../__mocks__/models/eventSection';
import { mockEnsembleContact } from '../../../../../../__mocks__/models/ensembleContact';
import { mockCall } from '../../../../../../__mocks__/models/call';
import {
  emailAvailabilityChecks,
  emailBookingMusicians,
} from '../../../../../../app/fixing/contactMessage/api/create/emailFunctions';
import { mockEvent } from '../../../../../../__mocks__/models/event';

jest.mock('crypto', () => ({
  randomBytes: jest.fn(() => Buffer.from('mocked_random_bytes')),
}));

jest.mock(
  '../../../../../../app/fixing/contactMessage/api/create/emailFunctions',
  () => ({
    emailAvailabilityChecks: jest.fn(),
    emailBookingMusicians: jest.fn(),
  })
);

describe('generateToken()', () => {
  it('calls cryptio.randomBytes', () => {
    generateToken();
    expect(randomBytes).toHaveBeenCalled();
  });
});

describe('createContactMessages', () => {
  const mockContactMessages: CreateContactMessageProps = {
    contacts: [
      {
        contactId: mockEnsembleContact.id,
        position: 'tutti',
        playerMessage: 'Hello, world.',
        calls: [String(mockCall.id)],
      },
    ],
    eventSectionId: 'mockID',
    bookingOrAvailability: 'booking',
    strictlyTied: 'true',
    urgent: false,
  };

  it('fetches correct contactMessage data', async () => {
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([
      mockContactMessage,
    ]);
    await createContactMessages(mockContactMessages);
    expect(prismaMock.contactMessage.findMany).toHaveBeenCalledWith({
      where: { eventSectionId: Number(mockContactMessages.eventSectionId) },
      orderBy: { indexNumber: 'asc' },
    });
  });
  it('gives new all contactMessages correct vals incl. index numbers', async () => {
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([
      mockContactMessage,
    ]);
    await createContactMessages(mockContactMessages);
    prismaMock.contactMessage.create.mockResolvedValueOnce(mockContactMessage);
    expect(prismaMock.contactMessage.create).toHaveBeenCalledWith({
      data: {
        eventSectionId: Number(mockContactMessages.eventSectionId),
        contactId: mockContactMessages.contacts[0].contactId,
        calls: {
          connect: mockContactMessages.contacts[0].calls.map((j) => ({
            id: Number(j),
          })),
        },
        token: generateToken(),
        //position: data.contacts[i].position,
        playerMessage: mockContactMessages.contacts[0].playerMessage,
        indexNumber: mockContactMessage.indexNumber + 1,
        bookingOrAvailability: mockContactMessages.bookingOrAvailability,
        strictlyTied: mockContactMessages.strictlyTied === 'true',
        urgent: mockContactMessages.urgent,
      },
    });
  });
  it('if booking, emailBookingMusicians(eventSectionID) is called', async () => {
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([
      mockContactMessage,
    ]);
    await createContactMessages(mockContactMessages);
    prismaMock.contactMessage.create.mockResolvedValueOnce(mockContactMessage);
    expect(emailBookingMusicians).toHaveBeenCalled();
  });
  it('if availability check, emailAvailabilityChecks(eventSectionID) is called', async () => {
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([
      mockContactMessage,
    ]);
    await createContactMessages({
      ...mockContactMessages,
      bookingOrAvailability: 'availability',
    });
    prismaMock.contactMessage.create.mockResolvedValueOnce(mockContactMessage);
    expect(emailAvailabilityChecks).toHaveBeenCalled();
  });
});

describe('getDateRange', () => {
  it('if calls.length == 1, it returns a single formatted date', () => {
    const dateRange = getDateRange([
      {
        ...mockCall,
        startTime: new Date('1986-10-13T03:24:00'),
        endTime: new Date('1986-10-13T04:24:00'),
      },
    ]);
    expect(dateRange).toBe('13 Oct 1986');
  });
  it('it returns formatted date range from earliest to latest dates', () => {
    const dateRange = getDateRange([
      {
        ...mockCall,
        id: 10,
        startTime: new Date('1986-10-14T03:24:00'),
        endTime: new Date('1986-10-14T04:24:00'),
      },
      {
        ...mockCall,
        startTime: new Date('1986-10-12T03:24:00'),
        endTime: new Date('1986-10-12T04:24:00'),
      },
    ]);
    expect(dateRange).toBe('12-14 Oct 1986');

    const dateRangeMonths = getDateRange([
      {
        ...mockCall,
        id: 10,
        startTime: new Date('1986-10-14T03:24:00'),
        endTime: new Date('1986-10-14T04:24:00'),
      },
      {
        ...mockCall,
        startTime: new Date('1986-10-12T03:24:00'),
        endTime: new Date('1986-10-12T04:24:00'),
      },
      {
        ...mockCall,
        id: 9,
        startTime: new Date('1986-09-12T03:24:00'),
        endTime: new Date('1986-09-12T04:24:00'),
      },
    ]);
    expect(dateRangeMonths).toBe('12 Sep-14 Oct 1986');
  });
  it('specifies years if spanning more than one calendar year', () => {
    const dateRange = getDateRange([
      {
        ...mockCall,
        id: 10,
        startTime: new Date('1985-10-14T03:24:00'),
        endTime: new Date('1985-10-14T04:24:00'),
      },
      {
        ...mockCall,
        startTime: new Date('1986-10-12T03:24:00'),
        endTime: new Date('1986-10-12T04:24:00'),
      },
    ]);
    expect(dateRange).toBe('14 Oct 1985-12 Oct 1986'); //NB diff years
  });
});

describe('gigIsFixed', () => {
  it('returns true if there are no sections', async () => {
    const mockEventNoSections = {
      ...mockEvent,
      sections: [],
    };
    prismaMock.event.findUnique.mockResolvedValueOnce(mockEventNoSections);
    expect(await gigIsFixed(1)).toBe(true);
  });
  it('returns true if all sections have correct number of booked players', async () => {
    const mockEventFixed = {
      ...mockEvent,
      sections: [
        {
          ...mockEventSection,
          numToBook: 1,
          contacts: [
            {
              ...mockEnsembleContact,
              bookingOrAvailability: 'Booking',
              accepted: true,
              id: 4,
            },
            {
              ...mockEnsembleContact,
              id: 2,
              accepted: false,
            },
            {
              ...mockEnsembleContact,
              bookingOrAvailability: 'Availability',
              accepted: true,
            },
            {
              ...mockEnsembleContact,
              id: 3,
              accepted: false,
            },
          ],
        },
      ],
    };
    prismaMock.event.findUnique.mockResolvedValueOnce(mockEventFixed);
    expect(await gigIsFixed(1)).toBe(true);
  });
  it('returns false if gig is not fixed', async () => {
    const mockEventNotFixed = {
      ...mockEvent,
      sections: [
        {
          ...mockEventSection,
          numToBook: 1,
          contacts: [
            {
              ...mockContactMessage,
              bookingOrAvailability: 'Booking',
              accepted: false,
              id: 3,
            },
            {
              ...mockContactMessage,
              bookingOrAvailability: 'Availability',
              accepted: true,
              id: 4,
            },
          ],
        },
        {
          ...mockContactMessage,
          numToBook: 1,
          contacts: [
            {
              ...mockContactMessage,
              bookingOrAvailability: 'Booking',
              accepted: true,
              id: 4,
            },
            {
              ...mockContactMessage,
              id: 2,
              accepted: false,
            },
            {
              ...mockContactMessage,
              bookingOrAvailability: 'Availability',
              accepted: true,
            },
            {
              ...mockContactMessage,
              id: 3,
              accepted: false,
            },
          ],
        },
      ],
    };
    prismaMock.event.findUnique.mockResolvedValueOnce(mockEventNotFixed);
    expect(await gigIsFixed(1)).toBe(false);
  });
});

describe('numToContact', () => {
  it('returns correct number of musicians to contact', () => {
    const contacts = [
      {
        ...mockContactMessage,
        bookingOrAvailability: 'Booking',
        accepted: true,
        received: true,
        id: 4,
      },
      {
        ...mockContactMessage,
        id: 2,
        accepted: null,
        received: true,
        bookingOrAvailability: 'Booking',
      },
      {
        ...mockContactMessage,
        id: 2,
        accepted: true,
        status: 'DEP OUT',
        received: true,
        bookingOrAvailability: 'Booking',
      },
      {
        ...mockContactMessage,
        id: 2,
        accepted: false,
        received: true,
      },
      {
        ...mockContactMessage,
        bookingOrAvailability: 'Availability',
        accepted: true,
        received: true,
      },
      {
        ...mockContactMessage,
        id: 3,
        accepted: false,
        received: true,
      },
    ];

    expect(getNumToContact({ contactMessages: contacts, numToBook: 12 })).toBe(
      9
    );
  });
});
