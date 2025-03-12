import { randomBytes } from 'crypto';
import {
  CreateContactMessageProps,
  createContactMessages,
  FixingObj,
  FixingSection,
  generateToken,
  getCallsToOffer,
  getDateRange,
  getEventSections,
  getNumToContact,
  getUnfixedCalls,
  gigFixedNotification,
  gigIsFixed,
  handleFixing,
  isGigFixed,
  listExhaustedNotification,
  makeOffer,
  urgentNotification,
} from '../../../../../../app/fixing/contactMessage/api/create/functions';
import { prismaMock } from '../../../../../../__mocks__/singleton';
import { mockContactMessage } from '../../../../../../__mocks__/models/contactMessage';
import { mockEventSection } from '../../../../../../__mocks__/models/eventSection';
import { mockEnsembleContact } from '../../../../../../__mocks__/models/ensembleContact';
import { mockCall } from '../../../../../../__mocks__/models/call';
import { emailAvailabilityChecks } from '../../../../../../app/fixing/contactMessage/api/create/emailFunctions';
import { mockEvent } from '../../../../../../__mocks__/models/event';
import {
  Call,
  ContactEventCall,
  ContactEventCallStatus,
  ContactMessage,
  EnsembleContact,
  Event,
  User,
} from '@prisma/client';
import { mockOrchestration } from '../../../../../../__mocks__/models/orchestration';
import { mockContactEventCall } from '../../../../../../__mocks__/models/ContactEventCall';
import {
  bookingCompleteEmail,
  listExhaustedEmail,
} from '../../../../../../app/sendGrid/adminEmailLib';
import axios from '../../../../../../__mocks__/axios';
import { mockUser } from '../../../../../../__mocks__/models/user';
import { createOfferEmail } from '../../../../../../app/sendGrid/playerLib';
import prisma from '../../../../../../client';
import { mockSentEmail } from '../../../../../../__mocks__/models/sentEmail';

jest.mock('crypto', () => ({
  randomBytes: jest.fn(() => Buffer.from('mocked_random_bytes')),
}));

jest.mock(
  '../../../../../../app/fixing/contactMessage/api/create/emailFunctions',
  () => ({
    emailAvailabilityChecks: jest.fn(),
  })
);

jest.mock('../../../../../../app/sendGrid/adminEmailLib', () => ({
  bookingCompleteEmail: jest.fn(() => ({
    email: 'mocked_email',
    templateID: 'mocked_templateID',
    subject: 'mocked_subject',
    bodyText: 'mocked_bodyText',
  })),
  listExhaustedEmail: jest.fn(() => ({
    email: 'mocked_email',
    templateID: 'mocked_templateID',
    subject: 'mocked_subject',
    bodyText: 'mocked_bodyText',
  })),
}));

jest.mock('../../../../../../app/sendGrid/playerLib', () => ({
  createOfferEmail: jest.fn(() => ({
    email: 'mocked_email',
    templateID: 'mocked_templateID',
    subject: 'mocked_subject',
    bodyText: 'mocked_bodyText',
  })),
}));

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockFixingObj: FixingObj = {
  ...mockEvent,
  calls: [mockCall],
  fixer: mockUser,
  sections: [
    {
      ...mockEventSection,
      orchestration: [
        {
          ...mockOrchestration,
          call: mockCall,
        },
      ],
      contacts: [
        {
          ...mockContactMessage,
          contact: mockEnsembleContact,
          eventCalls: [
            {
              ...mockContactEventCall,
              call: mockCall,
            },
          ],
        },
      ],
    },
  ],
};

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
    eventId: '12',
  };

  it('fetches correct contactMessage data', async () => {
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([
      mockContactMessage,
    ]);
    prismaMock.contactEventCall.create.mockResolvedValueOnce(
      mockContactEventCall
    );
    prismaMock.contactMessage.create.mockResolvedValue({
      ...mockContactMessage,
      id: 42,
    });
    prismaMock.event.findUnique.mockResolvedValue(mockFixingObj);
    prismaMock.contactEventCall.updateManyAndReturn.mockResolvedValue([
      mockContactEventCall,
    ]);
    prismaMock.eventSection.findUnique.mockResolvedValue(
      mockFixingObj.sections[0]
    );

    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    await createContactMessages({
      ...mockContactMessages,
    });
    expect(prismaMock.contactMessage.findMany).toHaveBeenCalledWith({
      where: { eventSectionId: Number(mockContactMessages.eventSectionId) },
      orderBy: { indexNumber: 'asc' },
    });
    expect(prismaMock.contactEventCall.create).toHaveBeenCalledWith({
      data: {
        callId: Number(mockContactMessages.contacts[0].calls[0]),
        contactMessageId: 42,
        status: 'TOOFFER',
      },
    });
  });
  //it("autobook sets status & type correctly", () => {})
  it('gives new all contactMessages correct vals incl. index numbers', async () => {
    prismaMock.event.findUnique.mockResolvedValue(mockFixingObj);
    prismaMock.contactEventCall.updateManyAndReturn.mockResolvedValue([
      mockContactEventCall,
    ]);
    prismaMock.eventSection.findUnique.mockResolvedValue(
      mockFixingObj.sections[0]
    );
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([
      mockContactMessage,
    ]);

    prismaMock.contactEventCall.create.mockResolvedValueOnce(
      mockContactEventCall
    );
    prismaMock.contactMessage.create.mockResolvedValue({
      ...mockContactMessage,
      id: 42,
    });
    await createContactMessages(mockContactMessages);
    prismaMock.contactMessage.create.mockResolvedValueOnce(mockContactMessage);
    expect(prismaMock.contactMessage.create).toHaveBeenCalledWith({
      data: {
        eventSectionId: Number(mockContactMessages.eventSectionId),
        contactId: mockContactMessages.contacts[0].contactId,
        token: generateToken(),
        //position: data.contacts[i].position,
        status: 'NOTCONTACTED',
        playerMessage: mockContactMessages.contacts[0].playerMessage,
        indexNumber: mockContactMessage.indexNumber + 1,
        type: mockContactMessages.type,
        strictlyTied: mockContactMessages.strictlyTied === 'true',
        urgent: mockContactMessages.urgent,
      },
      include: {
        contact: true
      }
    });
    expect(prismaMock.contactEventCall.create).toHaveBeenCalledWith({
      data: {
        callId: Number(mockContactMessages.contacts[0].calls[0]),
        contactMessageId: 42,
        status: 'TOOFFER',
      },
    });
  });

  it('if availability check, emailAvailabilityChecks(eventSectionID) is called', async () => {
    prismaMock.event.findUnique.mockResolvedValue(mockFixingObj);
    prismaMock.contactEventCall.updateManyAndReturn.mockResolvedValue([
      mockContactEventCall,
    ]);
    prismaMock.eventSection.findUnique.mockResolvedValue(
      mockFixingObj.sections[0]
    );
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([
      mockContactMessage,
    ]);

    prismaMock.contactEventCall.create.mockResolvedValueOnce(
      mockContactEventCall
    );
    prismaMock.contactMessage.create.mockResolvedValue({
      ...mockContactMessage,
      id: 42,
    });

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
    eventId: '42',
  };

  it('if autobook, gives new contactMessages correct vals incl. status & type', async () => {
    prismaMock.event.findUnique.mockResolvedValue(mockFixingObj);
    prismaMock.contactEventCall.updateManyAndReturn.mockResolvedValue([
      mockContactEventCall,
    ]);
    prismaMock.eventSection.findUnique.mockResolvedValue(
      mockFixingObj.sections[0]
    );
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([
      mockContactMessage,
    ]);

    prismaMock.contactEventCall.create.mockResolvedValueOnce(
      mockContactEventCall
    );
    prismaMock.contactMessage.create.mockResolvedValue({
      ...mockContactMessage,
      id: 42,
    });

    await createContactMessages(mockContactMessages);
    prismaMock.contactMessage.create.mockResolvedValueOnce(mockContactMessage);
    expect(prismaMock.contactMessage.create).toHaveBeenCalledWith({
      data: {
        eventSectionId: Number(mockContactMessages.eventSectionId),
        contactId: mockContactMessages.contacts[0].contactId,

        token: generateToken(),
        //position: data.contacts[i].position,
        status: 'AUTOBOOKED',
        playerMessage: mockContactMessages.contacts[0].playerMessage,
        indexNumber: mockContactMessage.indexNumber + 1,
        type: 'AUTOBOOK',
        strictlyTied: mockContactMessages.strictlyTied === 'true',
        urgent: mockContactMessages.urgent,
      },
      include: {
        contact: true
      }
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
          orchestration: [
            {
              ...mockOrchestration,
              callId: mockCall.id,
              numRequired: 1,
            },
          ],
          contacts: [
            {
              ...mockEnsembleContact,
              type: 'AUTOBOOK',
              status: 'ACCEPTED',
              id: 42,
              eventCalls: [
                {
                  callId: mockCall.id,
                  status: 'ACCEPTED',
                },
              ],
            },
            {
              ...mockEnsembleContact,
              type: 'BOOKING',
              status: 'DECLINED',
              id: 4,
              eventCalls: [{ callId: 24 }],
            },
            {
              ...mockEnsembleContact,
              id: 2,
              status: 'DECLINED',
              eventCalls: [{ callId: 24 }],
            },
            {
              ...mockEnsembleContact,
              type: 'AVAILABILITY',
              status: 'MIXED',
              eventCalls: [{ callId: 24 }],
            },
            {
              ...mockEnsembleContact,
              id: 3,
              status: 'DECLINED',
              eventCalls: [{ callId: 24 }],
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
          orchestration: [
            {
              ...mockOrchestration,
              callId: mockCall.id,
              numRequired: 1,
            },
          ],
          contacts: [
            {
              ...mockContactMessage,
              type: 'AUTOBOOKED',
              status: 'FINDINGDEP',
              id: 3,
              eventCalls: [
                {
                  ...mockContactEventCall,
                  callId: mockCall.id,
                  status: 'ACCEPTED' as ContactEventCallStatus,
                },
              ],
            },
            {
              ...mockContactMessage,
              type: 'BOOKING',
              status: 'DECLINED',
              id: 3,
              eventCalls: [
                {
                  ...mockContactEventCall,
                  callId: mockCall.id,
                  status: 'DECLINED' as ContactEventCallStatus,
                },
              ],
            },
            {
              ...mockContactMessage,
              type: 'AVAILABILITY',
              status: 'AVAILABLE',
              id: 4,

              eventCalls: [
                {
                  ...mockContactEventCall,
                  callId: mockCall.id,
                  status: 'AVAILABLE' as ContactEventCallStatus,
                },
              ],
            },
          ],
        },
        {
          ...mockContactMessage,
          numToBook: 1,
          orchestration: [
            {
              ...mockOrchestration,
              callId: 12,
              numRequired: 1,
            },
          ],
          contacts: [
            {
              ...mockContactMessage,
              type: 'BOOKING',
              status: 'ACCEPTED',
              id: 4,
              eventCalls: [
                {
                  ...mockContactEventCall,
                  callId: 12,
                  status: 'DECLINED' as ContactEventCallStatus,
                },
              ],
            },
            {
              ...mockContactMessage,
              id: 2,
              status: 'DECLINED',
              eventCalls: [
                {
                  ...mockContactEventCall,
                  callId: 12,
                  status: 'DECLINED' as ContactEventCallStatus,
                },
              ],
            },
            {
              ...mockContactMessage,
              type: 'AVAILABILITY',
              status: 'MIXED',
              eventCalls: [
                {
                  ...mockContactEventCall,
                  callId: 12,
                  status: 'AVAILABLE' as ContactEventCallStatus,
                },
              ],
            },
            {
              ...mockContactMessage,
              id: 3,
              status: 'DECLINED',
              eventCalls: [
                {
                  ...mockContactEventCall,
                  callId: 12,
                  status: 'DECLINED' as ContactEventCallStatus,
                },
              ],
            },
          ],
        },
      ],
    };
    prismaMock.event.findUnique.mockResolvedValueOnce(mockEventNotFixed);
    expect(await gigIsFixed(1)).toBe(false);
  });
});

describe('getEventSections()', () => {
  it('calls prisma.event with expected arg & returns result', async () => {
    prismaMock.event.findUnique.mockResolvedValue(mockEvent);
    expect(await getEventSections(mockEvent.id)).toBe(mockEvent);
    expect(prismaMock.event.findUnique).toHaveBeenCalledWith({
      where: {
        id: mockEvent.id,
      },
      include: {
        calls: true,
        fixer: true,
        sections: {
          include: {
            orchestration: {
              include: {
                call: true,
              },
            },
            contacts: {
              include: {
                contact: true,
                eventCalls: {
                  include: {
                    call: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  });
});

describe('getUnfixedCalls()', () => {
  it('returns empty array if all calls fixed', () => {
    const mockSection: FixingSection = {
      ...mockEventSection,
      orchestration: [
        {
          ...mockOrchestration,
          numRequired: 1,
          callId: 2424,
          call: mockCall,
        },
      ],
      contacts: [
        {
          ...mockContactMessage,
          contact: mockEnsembleContact,

          eventCalls: [
            {
              ...mockContactEventCall,
              call: mockCall,
              status: 'ACCEPTED',
              callId: 2424,
            },
          ],
        },
      ],
    };
    expect(getUnfixedCalls(mockSection)).toEqual([]);
  });
  it('returns array of unfixed callIDs', () => {
    const mockSection: FixingSection = {
      ...mockEventSection,
      orchestration: [
        {
          ...mockOrchestration,
          numRequired: 2,
          callId: 4242,
          call: mockCall,
        },
        {
          ...mockOrchestration,
          numRequired: 0,
          callId: 4217,
          call: mockCall,
        },
      ],
      contacts: [
        {
          ...mockContactMessage,
          contact: mockEnsembleContact,

          eventCalls: [
            {
              ...mockContactEventCall,
              call: mockCall,
              status: 'ACCEPTED',
              callId: 4242,
            },
          ],
        },
      ],
    };
    expect(getUnfixedCalls(mockSection)).toEqual([4242]);
  });
});

describe('isGigFixed()', () => {
  it('returns true if all sections are fixed', () => {
    const mockGig: FixingObj = {
      ...mockEvent,
      calls: [mockCall],
      fixer: mockUser,
      sections: [
        {
          ...mockEventSection,
          orchestration: [
            {
              ...mockOrchestration,
              numRequired: 1,
              callId: 2424,
              call: mockCall,
            },
          ],
          contacts: [
            {
              ...mockContactMessage,
              contact: mockEnsembleContact,
              eventCalls: [
                {
                  ...mockContactEventCall,
                  call: mockCall,
                  status: 'ACCEPTED',
                  callId: 2424,
                },
              ],
            },
          ],
        },
      ],
    };
    expect(isGigFixed(mockGig)).toBe(true);
  });
  it('returns false if any sections not fixed', () => {
    const mockGig: FixingObj = {
      ...mockEvent,
      calls: [mockCall],
      fixer: mockUser,
      sections: [
        {
          ...mockEventSection,
          orchestration: [
            {
              ...mockOrchestration,
              numRequired: 1,
              callId: 2424,
              call: mockCall,
            },
          ],
          contacts: [
            {
              ...mockContactMessage,
              contact: mockEnsembleContact,

              eventCalls: [
                {
                  ...mockContactEventCall,
                  call: mockCall,

                  status: 'OFFERING',
                  callId: 2424,
                },
              ],
            },
          ],
        },
      ],
    };
    expect(isGigFixed(mockGig)).toBe(false);
  });
});

describe('gigFixedNotification', () => {
  it('calls bookingCompleteEmail and axios.post with expected args', async () => {
    await gigFixedNotification(mockFixingObj);
    expect(bookingCompleteEmail).toHaveBeenCalledWith({
      dateRange: getDateRange([mockCall]),
      email: mockUser.email,
      ensemble: mockEvent.ensembleName,
      fixerFirstName: mockUser.firstName,
    });

    expect(axios.post).toHaveBeenCalledWith(`${process.env.URL}/sendGrid`, {
      body: {
        templateID: 'mocked_templateID',
        emailAddress: 'mocked_email',

        emailData: {
          email: 'mocked_email',
          subject: 'mocked_subject',

          templateID: 'mocked_templateID',
          bodyText: 'mocked_bodyText',
        },
      },
    });
  });
});
describe('makeOffer()', () => {
  const mockContact: ContactMessage & {
    contact: EnsembleContact;

    event: Event & {
      fixer: User;
    };
    eventCalls: (ContactEventCall & {
      call: Call;
    })[];
  } = {
    ...mockContactMessage,
    contact: mockEnsembleContact,
    event: {
      ...mockEvent,
      fixer: mockUser,
    },
    eventCalls: [
      {
        ...mockContactEventCall,
        call: mockCall,
      },
    ],
  };

  it('calls offerEmail, axios.post and prisma.update with expected args', async () => {
    prismaMock.contactMessage.update.mockResolvedValue(mockContactMessage);
    prismaMock.contactEventCall.updateManyAndReturn.mockResolvedValue([
      mockContactEventCall,
    ]);

    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    await makeOffer({ ...mockContact });
    expect(prismaMock.contactMessage.update).toHaveBeenCalledWith({
      where: {
        id: mockContact.id,
      },
      data: {
        status: 'AWAITINGREPLY',
      },
    });
    expect(
      prismaMock.contactEventCall.updateManyAndReturn
    ).toHaveBeenCalledWith({
      where: {
        id: {
          in: mockContact.eventCalls.map((c) => c.id),
        },
      },
      data: {
        status: 'OFFERING',
      },
    });
    expect(createOfferEmail).toHaveBeenCalledWith({
      ...mockContact,
      calls: mockContact.eventCalls.map((c) => c.call),
    });
    expect(axios.post).toHaveBeenCalledWith(`${process.env.URL}/sendGrid`, {
      body: {
        templateID: 'mocked_templateID',
        emailAddress: 'mocked_email',

        emailData: {
          email: 'mocked_email',
          subject: 'mocked_subject',

          templateID: 'mocked_templateID',
          bodyText: 'mocked_bodyText',
        },
      },
    });
  });
});

describe('listExhaustedNotification', () => {
  it('calls exhausted email and axios.post with expected args', async () => {
    await listExhaustedNotification({
      event: mockFixingObj,
      instrumentName: 'Viola',
    });
    expect(listExhaustedEmail).toHaveBeenCalledWith({
      dateRange: getDateRange(mockFixingObj.calls),
      fixerFirstName: mockFixingObj.fixer.firstName!,
      email: mockFixingObj.fixer.email!,
      ensemble: mockFixingObj.ensembleName,
      instrument: 'Viola',
    });
    expect(axios.post).toHaveBeenCalledWith(`${process.env.URL}/sendGrid`, {
      body: {
        templateID: 'mocked_templateID',
        emailAddress: 'mocked_email',

        emailData: {
          email: 'mocked_email',
          subject: 'mocked_subject',

          templateID: 'mocked_templateID',
          bodyText: 'mocked_bodyText',
        },
      },
    });
  });
});

describe('urgentNotification', () => {
  it('calls axios.post with expected arg', async () => {
    await urgentNotification({
      event: mockFixingObj,
      contact: mockEnsembleContact,
    });
    expect(axios.post).toHaveBeenCalledWith(`${process.env.URL}/twilio`, {
      body: {
        phoneNumber: mockEnsembleContact.phoneNumber,
        message: `Hi ${mockEnsembleContact.firstName}, we have just sent you an urgent email on behalf of ${mockFixingObj.fixer.firstName} ${mockFixingObj.fixer.lastName} (${mockFixingObj.ensembleName}). GigFix`,
      },
    });
  });
});

describe('handleFixing()', () => {
  it('returns undefined if event not found', async () => {
    prismaMock.event.findUnique.mockResolvedValue(null);
    expect(await handleFixing(11)).toBe(undefined);
  });
});

describe('getCallsToOffer', () => {
  const mockSection: FixingSection = {
    ...mockEventSection,
    orchestration: [
      {
        ...mockOrchestration,
        id: 9873,
        call: mockCall,
        callId: 9898,
        numRequired: 2,
      },
      {
        ...mockOrchestration,
        id: 1234,
        call: mockCall,
        callId: 2424,
        numRequired: 3,
      },
      {
        ...mockOrchestration,
        id: 2345,
        call: mockCall,
        callId: 4242,
        numRequired: 3,
      },
    ],
    contacts: [
      {
        ...mockContactMessage,
        eventCalls: [
          {
            ...mockContactEventCall,
            id: 're',
            call: mockCall,
            callId: 9898,
            status: 'ACCEPTED',
          },
          {
            ...mockContactEventCall,
            id: 'as',
            call: mockCall,
            callId: 2424,
            status: 'OFFERING',
          },
          {
            ...mockContactEventCall,
            id: 'rerwqe',
            call: mockCall,
            callId: 4242,
            status: 'OFFERING',
          },
        ],
        contact: mockEnsembleContact,
        indexNumber: 1,
      },
      {
        ...mockContactMessage,
        eventCalls: [
          {
            ...mockContactEventCall,
            id: 'afdsas',
            call: mockCall,
            callId: 9898,
            status: 'TOOFFER',
          },
          {
            ...mockContactEventCall,
            id: 'adfasdf',
            call: mockCall,
            callId: 2424,
            status: 'TOOFFER',
          },
          {
            ...mockContactEventCall,
            id: 'asdfasf',
            call: mockCall,
            callId: 4242,
            status: 'TOOFFER',
          },
        ],
        contact: mockEnsembleContact,
        indexNumber: 2,
      },
      {
        ...mockContactMessage,
        eventCalls: [
          {
            ...mockContactEventCall,
            id: 'lfdp',
            call: mockCall,
            callId: 9898,
            status: 'TOOFFER',
          },
          {
            ...mockContactEventCall,
            id: 'gfc',
            call: mockCall,
            callId: 2424,
            status: 'TOOFFER',
          },
          {
            ...mockContactEventCall,
            id: 'weq',
            call: mockCall,
            callId: 4242,
            status: 'TOOFFER',
          },
        ],
        contact: mockEnsembleContact,
        indexNumber: 3,
        id: 42,
      },
    ],
  };
  it('calls prisma.eventSection with expected args', async () => {
    prismaMock.eventSection.findUnique.mockResolvedValue(mockSection);
    expect(await getCallsToOffer({ sectionID: 12, contactMessageID: 42 }));
    expect(prismaMock.eventSection.findUnique).toHaveBeenCalledWith({
      where: {
        id: 12,
      },
      include: {
        orchestration: {
          include: {
            call: true,
          },
        },
        contacts: {
          include: {
            contact: true,
            eventCalls: {
              include: {
                call: true,
              },
            },
          },
        },
      },
    });
  });

  const mockSectionTwo: FixingSection = {
    ...mockEventSection,
    orchestration: [
      {
        ...mockOrchestration,
        id: 9873,
        call: mockCall,
        callId: 9898,
        numRequired: 2,
      },
      {
        ...mockOrchestration,
        id: 1234,
        call: mockCall,
        callId: 2424,
        numRequired: 3,
      },
    ],
    contacts: [
      {
        ...mockContactMessage,
        eventCalls: [
          {
            ...mockContactEventCall,
            id: 're',
            call: mockCall,
            callId: 9898,
            status: 'ACCEPTED',
          },
          {
            ...mockContactEventCall,
            id: 'as',
            call: mockCall,
            callId: 2424,
            status: 'ACCEPTED',
          },
        ],
        contact: mockEnsembleContact,
        indexNumber: 1,
      },
      {
        ...mockContactMessage,
        eventCalls: [
          {
            ...mockContactEventCall,
            id: 'afdsas',
            call: mockCall,
            callId: 9898,
            status: 'TOOFFER',
          },
          {
            ...mockContactEventCall,
            id: 'adfasdf',
            call: mockCall,
            callId: 2424,
            status: 'TOOFFER',
          },
        ],
        contact: mockEnsembleContact,
        indexNumber: 2,
        id: 204,
      },
      {
        ...mockContactMessage,
        eventCalls: [
          {
            ...mockContactEventCall,
            id: 'lfdp',
            call: mockCall,
            callId: 9898,
            status: 'TOOFFER',
          },
          {
            ...mockContactEventCall,
            id: 'gfc',
            call: mockCall,
            callId: 2424,
            status: 'TOOFFER',
          },
        ],
        contact: mockEnsembleContact,
        indexNumber: 3,
        id: 42,
      },
    ],
  };

  it('returns expected array', async () => {
    prismaMock.eventSection.findUnique.mockResolvedValueOnce(mockSection);
    expect(
      await getCallsToOffer({ sectionID: 12, contactMessageID: 42 })
    ).toEqual([2424, 4242]);

    prismaMock.eventSection.findUnique.mockResolvedValueOnce(mockSectionTwo);
    expect(
      await getCallsToOffer({ sectionID: 12, contactMessageID: 204 })
    ).toEqual([9898, 2424]);
  });
});
