import axios from '../../../../../../__mocks__/axios';
import { mockContactMessage } from '../../../../../../__mocks__/models/contactMessage';
import { mockEnsembleContact } from '../../../../../../__mocks__/models/ensembleContact';
import { mockEvent } from '../../../../../../__mocks__/models/event';
import { mockEventSection } from '../../../../../../__mocks__/models/eventSection';
import { mockUser } from '../../../../../../__mocks__/models/user';
import { prismaMock } from '../../../../../../__mocks__/singleton';
import { emailBookingMusicians } from '../../../../../../app/fixing/contactMessage/api/create/emailFunctions';
import { SentEmailData } from '../../../../../../app/sendGrid/lib';
import { bookingCompleteEmail } from '../../../../../../app/sendGrid/adminEmailLib';
import { getDateRange } from '../../../../../../app/fixing/contactMessage/api/create/functions';
import { mockCall } from '../../../../../../__mocks__/models/call';
import { mockSection } from '../../../../../../__mocks__/models/ensembleSection';

/* 
This is funcitonality in emailFunctions, however it requires a different mock for gigIsFixed.

*/

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
    gigIsFixed: jest.fn().mockReturnValue(true),
    getDateRange: jest.fn().mockReturnValue('date range'),
    getNumToContact: jest.fn().mockReturnValue(1),
  })
);

describe('emailBookingMusicians', () => {
  it('if gigIsFixed, bookingCompleteEmail and sendGrid are called with expected args', async () => {
    const mockReturn = {
      ...mockContactMessage,
      contact: mockUser,
      eventSection: {
        ...mockEventSection,
        ensembleSection: mockSection,
        numToBook: 1,
        event: {
          ...mockEvent,
          calls: [mockCall],
          fixer: mockUser,
        },
      },
    };
    prismaMock.contactMessage.findMany.mockResolvedValueOnce([
      {
        ...mockReturn,
        status: 'ACCEPTED',
      },
    ]);
    await emailBookingMusicians(42);
    expect(bookingCompleteEmail).toHaveBeenCalledWith({
      dateRange: getDateRange(mockReturn.eventSection.event.calls),
      fixerFirstName: mockReturn.eventSection.event.fixer.firstName,
      email: mockReturn.eventSection.event.fixer.email!,
      ensemble: mockReturn.eventSection.event.ensembleName,
    });
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/sendGrid', {
      body: {
        emailAddress: mockEmail.email,
        emailData: mockEmail,
        templateID: mockEmail.templateID,
      },
    });
  });
});
