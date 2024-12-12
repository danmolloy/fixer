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
import { ContactMessage } from '@prisma/client';

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
        autoAccepted: false,
      },
    ],
    eventSectionId: 'mockID',
    type: 'BOOKING',
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
  //it("autobook sets status & type correctly", () => {})
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
        status: 'NOTCONTACTED',
        playerMessage: mockContactMessages.contacts[0].playerMessage,
        indexNumber: mockContactMessage.indexNumber + 1,
        type: mockContactMessages.type,
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
      type: 'AVAILABILITY',
    });
    prismaMock.contactMessage.create.mockResolvedValueOnce(mockContactMessage);
    expect(emailAvailabilityChecks).toHaveBeenCalled();
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
        autoAccepted: true,
      },
    ],
    eventSectionId: 'mockID',
    type: 'BOOKING',
    strictlyTied: 'true',
    urgent: false,
  };

  
  it('if autobook, gives new contactMessages correct vals incl. status & type', async () => {
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
        status: 'AUTOBOOKED',
        playerMessage: mockContactMessages.contacts[0].playerMessage,
        indexNumber: mockContactMessage.indexNumber + 1,
        type: "AUTOBOOK",
        strictlyTied: mockContactMessages.strictlyTied === 'true',
        urgent: mockContactMessages.urgent,
      },
    });
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
          numToBook: 2,
          contacts: [
            {
              ...mockEnsembleContact,
              type: 'AUTOBOOK',
              status: "AUTOBOOKED",
              id: 42,
            },
            {
              ...mockEnsembleContact,
              type: 'BOOKING',
              status: "ACCEPTED",
              id: 4,
            },
            {
              ...mockEnsembleContact,
              id: 2,
              status: "DECLINED",

            },
            {
              ...mockEnsembleContact,
              type: 'AVAILABILITY',
              status: "MIXED",
            },
            {
              ...mockEnsembleContact,
              id: 3,
              status: "DECLINED",
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
              type: 'AUTOBOOKED',
              status: "FINDINGDEP",
              id: 3,
            },
            {
              ...mockContactMessage,
              type: 'BOOKING',
              status: "DECLINED",
              id: 3,
            },
            {
              ...mockContactMessage,
              type: 'AVAILABILITY',
              status: "AVAILABLE",
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
              type: 'BOOKING',
              status: "ACCEPTED",
              id: 4,
            },
            {
              ...mockContactMessage,
              id: 2,
              status: "DECLINED",
            },
            {
              ...mockContactMessage,
              type: 'AVAILABILITY',
              status: "MIXED",
            },
            {
              ...mockContactMessage,
              id: 3,
              status: "DECLINED",
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
    const contacts: ContactMessage[] = [
      {
        ...mockContactMessage,
        type: "AUTOBOOK",
        status: "AUTOBOOKED",
        id: 42,
      },
      {
        ...mockContactMessage,
        type: "BOOKING",
        status: "NOTCONTACTED",
        id: 4,
      },
      {
        ...mockContactMessage,
        id: 2,
        type: "BOOKING",
        status: "NOTCONTACTED",
      },
      {
        ...mockContactMessage,
        id: 2,
        status: 'FINDINGDEP',
        type: "BOOKING",
      },
      {
        ...mockContactMessage,
        id: 2,
        type: "BOOKING",
        status: "ACCEPTED",
      },
      {
        ...mockContactMessage,
        id: 2,
        type: "AUTOBOOK",
        status: "FINDINGDEP",
      },
      {
        ...mockContactMessage,
        type: 'AVAILABILITY',
        status: "NOTCONTACTED",
      },
      {
        ...mockContactMessage,
        id: 3,
        status: "NOTCONTACTED",
      },
    ];
    const numToBook = Math.ceil(Math.random() * 42) + 10;
    const numBooked = contacts.filter(i => i.status === "ACCEPTED" || i.status === "AUTOBOOKED").length
    const numThinking = contacts.filter(i => i.status === "AWAITINGREPLY" && (i.type === "BOOKING" || i.type ==="AUTOBOOK")).length
    expect(getNumToContact({ contactMessages: contacts, numToBook: numToBook })).toBe(
      numToBook - (numBooked + numThinking)
    );
  });
});
