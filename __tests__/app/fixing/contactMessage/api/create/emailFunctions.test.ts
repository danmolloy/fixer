import axios from '../../../../../../__mocks__/axios';
import {
  mockContactMessage,
  mockNotContactedContactMessage,
} from '../../../../../../__mocks__/models/contactMessage';
import { mockEnsembleContact } from '../../../../../../__mocks__/models/ensembleContact';
import { mockEvent } from '../../../../../../__mocks__/models/event';
import { mockEventSection } from '../../../../../../__mocks__/models/eventSection';
import { mockUser } from '../../../../../../__mocks__/models/user';
import { prismaMock } from '../../../../../../__mocks__/singleton';
import { emailAvailabilityChecks } from '../../../../../../app/fixing/contactMessage/api/create/emailFunctions';
import { SentEmailData } from '../../../../../../app/sendGrid/lib';
import {
  createOfferEmail,
  releaseDepperEmail,
} from '../../../../../../app/sendGrid/playerLib';
import {
  bookingCompleteEmail,
  listExhaustedEmail,
} from '../../../../../../app/sendGrid/adminEmailLib';
import {
  getDateRange,
  getNumToContact,
  gigIsFixed,
} from '../../../../../../app/fixing/contactMessage/api/create/functions';
import { mockCall } from '../../../../../../__mocks__/models/call';
import { mockSection } from '../../../../../../__mocks__/models/ensembleSection';
import {
  ContactMessage,
  EnsembleContact,
  Event,
  EventSection,
} from '@prisma/client';
import { mockContactEventCall } from '../../../../../../__mocks__/models/ContactEventCall';
import { mockOrchestration } from '../../../../../../__mocks__/models/orchestration';

jest.mock('axios');
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockEmail: SentEmailData = {
  templateID: 'fake-template',
  email: mockEnsembleContact.email!,
  bodyText: 'Email body',
  subject: 'mock subject',
};

jest.mock('../../../../../../app/sendGrid/playerLib', () => ({
  createOfferEmail: jest.fn(() => ({ ...mockEmail })),
  releaseDepperEmail: jest.fn(),
}));

jest.mock('../../../../../../app/sendGrid/adminEmailLib', () => ({
  bookingCompleteEmail: jest.fn(() => ({ ...mockEmail })),
  listExhaustedEmail: jest.fn(() => ({ ...mockEmail })),
}));

jest.mock(
  '../../../../../../app/fixing/contactMessage/api/create/functions',
  () => ({
    gigIsFixed: jest.fn().mockReturnValue(false),
    getDateRange: jest.fn().mockReturnValue('date range'),
    getNumToContact: jest.fn().mockReturnValue(1),
  })
);

describe('emailAvailabilityChecks', () => {
  it('calls prisma.contactMessage.findMany with expected args', async () => {
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([]);
    await emailAvailabilityChecks(1);
    expect(await prismaMock.contactMessage.findMany).toHaveBeenCalledWith({
      where: {
        eventSectionId: 1,
        status: 'NOTCONTACTED',
        type: 'AVAILABILITY',
      },
      include: {
        eventSection: {
          include: {
            event: {
              include: {
                fixer: true,
              },
            },
            ensembleSection: true,
          },
        },
        contact: true,
        eventCalls: {
          include: {
            call: true,
          },
        },
      },
      orderBy: [
        {
          indexNumber: 'asc',
        },
      ],
    });
  });
  it('returns [] if there are no unsent availability checks', async () => {
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([]);
    expect(await emailAvailabilityChecks(1)).toEqual([]);
  });
  it('for each unsent availability check, createOfferEmail(args) is called', async () => {
    const mockData = [
      {
        ...mockContactMessage,
        id: 1,
        contact: mockEnsembleContact,
        eventCalls: [
          {
            ...mockContactEventCall,
            call: mockCall,
          },
        ],
        eventSection: {
          ...mockEventSection,
          event: {
            ...mockEvent,
            fixer: mockUser,
          },
        },
      },
      {
        ...mockContactMessage,
        id: 2,
        contact: mockEnsembleContact,
        eventCalls: [
          {
            ...mockContactEventCall,
            call: mockCall,
          },
        ],
        eventSection: {
          ...mockEventSection,
          event: {
            ...mockEvent,
            fixer: mockUser,
          },
        },
      },
      {
        ...mockContactMessage,
        id: 3,
        contact: mockEnsembleContact,
        eventCalls: [
          {
            ...mockContactEventCall,
            call: mockCall,
          },
        ],
        eventSection: {
          ...mockEventSection,
          event: {
            ...mockEvent,
            fixer: mockUser,
          },
        },
      },
    ];
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockData);
    prismaMock.contactMessage.update.mockResolvedValueOnce(mockContactMessage);
    await emailAvailabilityChecks(1);
    expect(createOfferEmail).toHaveBeenCalledTimes(3);
    expect(createOfferEmail).toHaveBeenCalledWith({
      ...mockData[0],
      event: mockData[0].eventSection.event,
      calls: mockData[0].eventCalls.map((c) => c.call),
    });
    expect(createOfferEmail).toHaveBeenCalledWith({
      ...mockData[1],
      event: mockData[0].eventSection.event,
      calls: mockData[1].eventCalls.map((c) => c.call),
    });
    expect(createOfferEmail).toHaveBeenCalledWith({
      ...mockData[2],
      event: mockData[0].eventSection.event,
      calls: mockData[2].eventCalls.map((c) => c.call),
    });
  });
  it('for each unsent availability check, axios.post(args) is called', async () => {
    const mockData = [
      {
        ...mockContactMessage,
        id: 1,
        contact: mockEnsembleContact,
        eventCalls: [
          {
            ...mockContactEventCall,
            call: mockCall,
          },
        ],
        eventSection: {
          ...mockEventSection,
          event: {
            ...mockEvent,
            fixer: mockUser,
          },
        },
      },
    ];
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockData);
    prismaMock.contactMessage.update.mockResolvedValueOnce(mockContactMessage);
    await emailAvailabilityChecks(1);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/sendGrid', {
      body: {
        emailData: mockEmail,
        templateID: mockEmail.templateID,
        emailAddress: mockEmail.email,
      },
    });
  });
  it('calls prisma.contactMessage.update with expected args', async () => {
    const mockData = [
      {
        ...mockContactMessage,
        id: 1,
        contact: mockEnsembleContact,
        eventCalls: [
          {
            ...mockContactEventCall,
            call: mockCall,
          },
        ],
        eventSection: {
          ...mockEventSection,
          event: {
            ...mockEvent,
            fixer: mockUser,
          },
        },
      },
    ];
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockData);
    prismaMock.contactMessage.update.mockResolvedValueOnce(mockContactMessage);
    await emailAvailabilityChecks(1);
    expect(prismaMock.contactMessage.update).toHaveBeenCalledWith({
      where: {
        id: mockData[0].id,
      },
      data: {
        status: 'AWAITINGREPLY',
      },
    });
  });
  it('calls axios.post(twilio) for all urgent availability checks', async () => {
    const mockData = [
      {
        ...mockContactMessage,
        urgent: true,
        eventCalls: [
          {
            ...mockContactEventCall,
            call: mockCall,
          },
        ],
        id: 1,
        eventSection: {
          ...mockEventSection,
          event: {
            ...mockEvent,
            fixer: mockUser,
          },
        },
        contact: mockEnsembleContact,
      },
    ];
    prismaMock.contactMessage.findMany.mockResolvedValueOnce(mockData);
    prismaMock.contactMessage.update.mockResolvedValueOnce(mockContactMessage);
    await emailAvailabilityChecks(1);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/twilio', {
      body: {
        phoneNumber: mockData[0].contact.phoneNumber,
        message: `Hi ${mockData[0].contact.firstName}, we have just sent you an urgent email on behalf of ${mockData[0].eventSection.event.fixer.firstName} ${mockData[0].eventSection.event.fixer.lastName} (${mockData[0].eventSection.event.ensembleName}). GigFix`,
      },
    });
  });
});
